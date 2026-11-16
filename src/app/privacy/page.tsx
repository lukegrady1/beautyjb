import type { Metadata } from "next";
import Link from "next/link";
import { LegalPage } from "@/components/LegalPage";
import { site } from "@/content/site.config";
import { pageMetadata } from "@/lib/seo";
import { email } from "@/lib/site";

export const metadata: Metadata = pageMetadata({
  title: "Privacy Policy",
  description: `How ${site.name} collects and uses the information you share through this website.`,
  path: "/privacy/",
});

export default function PrivacyPage() {
  return (
    <LegalPage title="Privacy Policy" path="/privacy/" updated="November 2026">
      <p>
        {site.name} respects your privacy. This page explains what information this website collects and how it is used.
      </p>
      <h2>What we collect</h2>
      <p>
        When you send a consultation request or wedding inquiry, we receive the details you enter: typically your name,
        phone number, email address and anything you write in the message fields. We use this only to respond to you and
        to arrange your appointment.
      </p>
      <h2>How it is handled</h2>
      <ul>
        <li>Form submissions are delivered through a third-party form service so they can reach us securely.</li>
        <li>We never sell or rent your information, and we don&rsquo;t add you to marketing lists without asking.</li>
        <li>If you choose to load the map on the Contact page, Google may set cookies under its own privacy policy.</li>
      </ul>
      <h2>Your choices</h2>
      <p>
        You can ask us to update or delete the information you&rsquo;ve sent at any time.{" "}
        {email ? (
          <>
            Email <a href={`mailto:${email}`}>{email}</a>.
          </>
        ) : (
          <>
            Reach out through the <Link href="/contact/">contact page</Link>.
          </>
        )}
      </p>
    </LegalPage>
  );
}
