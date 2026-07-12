"use client";

import { useEffect } from "react";

// The customer lands here after paying, so their saved pack selection is
// no longer a work in progress — clear it so the cards page starts fresh.
const STORAGE_KEY = "domus-aurea:card-pack";

export function ClearCardSelection() {
  useEffect(() => {
    try {
      window.localStorage.removeItem(STORAGE_KEY);
    } catch {
      /* storage may be disabled */
    }
  }, []);
  return null;
}
