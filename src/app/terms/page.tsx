import type { Metadata } from "next";
import Link from "next/link";
import { LegalPage } from "@/components/LegalPage";
import { site } from "@/content/site.config";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Terms of Use",
  description: `Terms for using the ${site.name} website.`,
  path: "/terms/",
});

export default function TermsPage() {
  return (
    <LegalPage title="Terms of Use" path="/terms/" updated="November 2026">
      <p>By using this website you agree to these terms.</p>
      <h2>Information on this site</h2>
      <p>
        We keep service descriptions and details as accurate as we can, but they may change. Sending a request through
        this site does not confirm an appointment; your booking is confirmed once {site.owner} reaches out to you.
      </p>
      <h2>Photos and content</h2>
      <p>
        Photos, text and design on this site belong to {site.name} or are used with permission. Please don&rsquo;t reuse
        them without asking.
      </p>
      <h2>Questions</h2>
      <p>
        Questions about these terms? <Link href="/contact/">Get in touch</Link>.
      </p>
    </LegalPage>
  );
}
