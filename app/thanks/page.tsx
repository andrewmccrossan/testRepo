import Link from "next/link";
import { OrnamentDivider } from "@/components/Ornament";
import { ClearCardSelection } from "@/components/ClearCardSelection";

// Stripe payment links redirect here after a successful checkout.
export const metadata = {
  title: "Thank You",
  robots: { index: false, follow: false },
};

export default function ThanksPage() {
  return (
    <section className="container-prose pt-24 pb-32 text-center">
      <ClearCardSelection />
      <h1 className="font-display text-5xl uppercase tracking-wide text-ink md:text-6xl">
        Thank you!
      </h1>
      <OrnamentDivider className="mt-10" />
      <div className="mt-10 flex flex-wrap justify-center gap-4">
        <Link href="/" className="btn-primary">
          Back to the Home page
        </Link>
        <Link href="/blog" className="btn-ghost">
          Read the Blog
        </Link>
      </div>
    </section>
  );
}
