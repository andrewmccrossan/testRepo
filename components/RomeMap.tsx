"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type * as LeafletNS from "leaflet";
import { mapPoints, rioniWithPoints, type MapPoint } from "@/lib/mapPoints";
import "leaflet/dist/leaflet.css";

const ROME_CENTER: [number, number] = [41.8967, 12.4822];
const PALETTE = {
  crimson: "#7C1F1F",
  gold: "#B08D3A",
  ink: "#1F1812",
  parchmentLight: "#FBF6E8",
};

// Leaflet's default marker icon is loaded from image files by relative
// path, which bundlers rewrite and break. Drawing our own divIcon avoids
// that entirely and lets the pins carry the site's palette.
function pinIcon(L: typeof LeafletNS, active: boolean) {
  const size = active ? 22 : 15;
  return L.divIcon({
    className: "",
    html: `<span style="
      display:block;width:${size}px;height:${size}px;border-radius:9999px;
      background:${active ? PALETTE.crimson : PALETTE.gold};
      border:2.5px solid ${PALETTE.parchmentLight};
      box-shadow:0 1px 6px rgba(31,24,18,.55);"></span>`,
    iconSize: [size, size],
    iconAnchor: [size / 2, size / 2],
  });
}

export function RomeMap() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<LeafletNS.Map | null>(null);
  const LRef = useRef<typeof LeafletNS | null>(null);
  const markersRef = useRef<globalThis.Map<string, LeafletNS.Marker>>(
    new globalThis.Map(),
  );
  const rioniLayerRef = useRef<LeafletNS.GeoJSON | null>(null);
  const userLayerRef = useRef<LeafletNS.LayerGroup | null>(null);

  const [ready, setReady] = useState(false);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [activeRione, setActiveRione] = useState<string | null>(null);
  const [locating, setLocating] = useState(false);
  const [locationNote, setLocationNote] = useState<string | null>(null);

  const selected = mapPoints.find((p) => p.id === selectedId) ?? null;
  const visiblePoints = activeRione
    ? mapPoints.filter((p) => p.rione === activeRione)
    : mapPoints;

  // Leaflet event handlers are bound once, on mount, so they would capture
  // the first render's `activeRione` forever. Mirroring it into a ref lets
  // restyleRioni() stay stable while still reading the current value.
  const activeRioneRef = useRef<string | null>(null);
  activeRioneRef.current = activeRione;

  const restyleRioni = useCallback(() => {
    const layer = rioniLayerRef.current;
    if (!layer) return;
    const current = activeRioneRef.current;
    layer.eachLayer((lyr) => {
      const name = (lyr as { feature?: { properties?: { name?: string } } })
        .feature?.properties?.name;
      const on = current != null && name === current;
      (lyr as LeafletNS.Path).setStyle({
        color: on ? PALETTE.crimson : PALETTE.gold,
        weight: on ? 2.5 : 1,
        opacity: on ? 0.9 : 0.75,
        fillOpacity: on ? 0.18 : 0.05,
      });
    });
  }, []);

  // Build the map once on mount. Leaflet touches `window` as soon as it is
  // imported, so it is pulled in dynamically here rather than at module
  // scope — this page is prerendered to static HTML at build time.
  useEffect(() => {
    let cancelled = false;

    (async () => {
      const L = (await import("leaflet")).default;
      if (cancelled || !containerRef.current || mapRef.current) return;
      LRef.current = L;

      const map = L.map(containerRef.current, {
        center: ROME_CENTER,
        zoom: 14,
        zoomControl: true,
        scrollWheelZoom: false, // don't hijack page scrolling
      });
      mapRef.current = map;

      L.tileLayer(
        "https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png",
        {
          maxZoom: 19,
          attribution:
            '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
        },
      ).addTo(map);

      userLayerRef.current = L.layerGroup().addTo(map);

      // Rioni outlines. Loaded from /public so the page stays static; if
      // the file is ever missing the map still works without them.
      try {
        const res = await fetch("/map/rioni.geojson");
        if (res.ok && !cancelled) {
          const data = await res.json();
          const layer = L.geoJSON(data, {
            style: () => ({
              color: PALETTE.gold,
              weight: 1,
              opacity: 0.75,
              fillColor: PALETTE.crimson,
              fillOpacity: 0.05,
            }),
            onEachFeature: (feature, lyr) => {
              const name = feature?.properties?.name as string | undefined;
              if (!name) return;
              lyr.bindTooltip(name, { sticky: true, direction: "top" });
              lyr.on("click", () =>
                setActiveRione((cur) => (cur === name ? null : name)),
              );
              lyr.on("mouseover", () =>
                (lyr as LeafletNS.Path).setStyle({ fillOpacity: 0.14 }),
              );
              lyr.on("mouseout", () => restyleRioni());
            },
          }).addTo(map);
          rioniLayerRef.current = layer;
          layer.bringToBack();
        }
      } catch {
        /* boundaries are decorative — never block the map on them */
      }

      for (const p of mapPoints) {
        const marker = L.marker([p.lat, p.lng], {
          icon: pinIcon(L, false),
          title: p.name,
        })
          .addTo(map)
          .on("click", () => setSelectedId(p.id));
        markersRef.current.set(p.id, marker);
      }

      if (!cancelled) setReady(true);
    })();

    return () => {
      cancelled = true;
      mapRef.current?.remove();
      mapRef.current = null;
      markersRef.current.clear();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Filter pins to the chosen rione and highlight its outline.
  useEffect(() => {
    const map = mapRef.current;
    const L = LRef.current;
    if (!map || !L || !ready) return;

    for (const p of mapPoints) {
      const marker = markersRef.current.get(p.id);
      if (!marker) continue;
      const show = !activeRione || p.rione === activeRione;
      if (show && !map.hasLayer(marker)) marker.addTo(map);
      if (!show && map.hasLayer(marker)) marker.remove();
    }
    restyleRioni();

    if (activeRione) {
      const pts = mapPoints
        .filter((p) => p.rione === activeRione)
        .map((p) => [p.lat, p.lng] as [number, number]);
      if (pts.length) {
        map.flyToBounds(L.latLngBounds(pts).pad(0.6), { maxZoom: 16 });
      }
    }
  }, [activeRione, ready, restyleRioni]);

  // Emphasise the selected pin and bring it into view.
  useEffect(() => {
    const map = mapRef.current;
    const L = LRef.current;
    if (!map || !L || !ready) return;
    for (const [id, marker] of markersRef.current) {
      marker.setIcon(pinIcon(L, id === selectedId));
      if (id === selectedId) marker.setZIndexOffset(1000);
      else marker.setZIndexOffset(0);
    }
    const point = mapPoints.find((p) => p.id === selectedId);
    if (point) map.flyTo([point.lat, point.lng], Math.max(map.getZoom(), 16));
  }, [selectedId, ready]);

  const locate = () => {
    const map = mapRef.current;
    const L = LRef.current;
    if (!map || !L) return;
    if (!("geolocation" in navigator)) {
      setLocationNote("This browser can't share a location.");
      return;
    }
    setLocating(true);
    setLocationNote(null);
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setLocating(false);
        const { latitude, longitude, accuracy } = pos.coords;
        const group = userLayerRef.current;
        if (!group) return;
        group.clearLayers();
        L.circle([latitude, longitude], {
          radius: Math.max(accuracy, 12),
          color: "#2563EB",
          weight: 1,
          fillColor: "#2563EB",
          fillOpacity: 0.12,
        }).addTo(group);
        L.circleMarker([latitude, longitude], {
          radius: 6,
          color: PALETTE.parchmentLight,
          weight: 2.5,
          fillColor: "#2563EB",
          fillOpacity: 1,
        }).addTo(group);
        map.flyTo([latitude, longitude], 16);

        // Rome sits roughly within these bounds — a location far outside
        // it is almost certainly someone browsing from home.
        const inRome =
          latitude > 41.7 && latitude < 42.1 && longitude > 12.2 && longitude < 12.7;
        if (!inRome) {
          setLocationNote(
            "You don't appear to be in Rome — showing your location anyway.",
          );
        }
      },
      (err) => {
        setLocating(false);
        setLocationNote(
          err.code === err.PERMISSION_DENIED
            ? "Location permission was denied."
            : err.code === err.TIMEOUT
              ? "Timed out looking for your location."
              : "Your location isn't available right now.",
        );
      },
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 30000 },
    );
  };

  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1fr,22rem]">
      {/* isolate keeps Leaflet's internal z-indexes from riding over the
          site header */}
      <div className="relative isolate">
        <div
          ref={containerRef}
          className="h-[55vh] min-h-[360px] w-full border border-stone/60 bg-stone/20 lg:h-[70vh]"
          aria-label="Map of points of interest in Rome"
        />
        <button
          type="button"
          onClick={locate}
          disabled={locating}
          className="absolute right-3 top-3 z-[500] border border-stone/60 bg-parchment-light/95 px-3 py-2 font-display text-[11px] uppercase tracking-[0.18em] text-ink shadow transition hover:text-crimson disabled:opacity-60"
        >
          {locating ? "Locating…" : "Where am I?"}
        </button>
        {locationNote && (
          <p className="mt-2 font-serif text-sm italic text-crimson">
            {locationNote}
          </p>
        )}
      </div>

      <div className="lg:max-h-[70vh] lg:overflow-y-auto">
        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => setActiveRione(null)}
            className={`border px-3 py-1 font-display text-[10px] uppercase tracking-[0.18em] transition ${
              activeRione === null
                ? "border-crimson bg-crimson text-parchment-light"
                : "border-stone/60 text-ink-soft hover:border-gold"
            }`}
          >
            All rioni
          </button>
          {rioniWithPoints.map((r) => (
            <button
              key={r}
              type="button"
              onClick={() => setActiveRione((cur) => (cur === r ? null : r))}
              className={`border px-3 py-1 font-display text-[10px] uppercase tracking-[0.18em] transition ${
                activeRione === r
                  ? "border-crimson bg-crimson text-parchment-light"
                  : "border-stone/60 text-ink-soft hover:border-gold"
              }`}
            >
              {r}
            </button>
          ))}
        </div>

        {selected ? (
          <article className="mt-6 border-l-2 border-gold/60 pl-5">
            <p className="eyebrow">{selected.rione}</p>
            <h2 className="mt-2 font-display text-xl uppercase leading-snug tracking-wide text-ink">
              {selected.name}
            </h2>
            <p className="mt-3 font-serif text-base leading-relaxed text-ink/85">
              {selected.blurb}
            </p>
            <div className="mt-4 flex flex-wrap gap-4">
              <a
                href={`https://www.google.com/maps/dir/?api=1&destination=${selected.lat},${selected.lng}`}
                target="_blank"
                rel="noreferrer"
                className="font-display text-[11px] uppercase tracking-[0.18em] text-crimson hover:text-crimson-dark"
              >
                Directions &rarr;
              </a>
              <button
                type="button"
                onClick={() => setSelectedId(null)}
                className="font-display text-[11px] uppercase tracking-[0.18em] text-ink-soft hover:text-crimson"
              >
                Close
              </button>
            </div>
          </article>
        ) : (
          <p className="mt-6 font-serif italic text-ink-soft">
            Choose a place on the map, or from the list below.
          </p>
        )}

        <ul className="mt-6 space-y-1 border-t border-stone/40 pt-4">
          {visiblePoints.map((p: MapPoint) => (
            <li key={p.id}>
              <button
                type="button"
                onClick={() => setSelectedId(p.id)}
                className={`w-full border-l-2 py-2 pl-3 text-left transition ${
                  p.id === selectedId
                    ? "border-crimson bg-parchment-light/70"
                    : "border-transparent hover:border-gold/60"
                }`}
              >
                <span className="block font-display text-[12px] uppercase tracking-[0.14em] text-ink">
                  {p.name}
                </span>
                <span className="block font-serif text-sm italic text-ink-soft">
                  {p.rione}
                </span>
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
