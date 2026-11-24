import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/Button";
import { GhlForm } from "@/components/GhlForm";
import { JsonLd } from "@/components/JsonLd";
import { PageHero } from "@/components/PageHero";
import { StudioDetails } from "@/components/StudioDetails";
import { site } from "@/content/site.config";
import { webPageSchema } from "@/lib/schema";
import { pageMetadata } from "@/lib/seo";
import { bookingIsExternal, inCity } from "@/lib/site";

const metaDescription = `Request a consultation with hair designer Jennifer Bauduin for color, highlights, cuts, Brazilian straightening or wedding hair${inCity}.`;

export const metadata: Metadata = pageMetadata({
  title: `Book an Appointment | ${site.name} Hair Designer${inCity}`,
  description: metaDescription,
  path: "/contact/",
  absolute: true,
});

export default function ContactPage() {
  return (
    <>
      <JsonLd data={webPageSchema({ type: "ContactPage", name: `Contact ${site.name}`, description: metaDescription, path: "/contact/" })} />
      <PageHero
        crumbs={[{ name: "Contact", path: "/contact/" }]}
        eyebrow="Book & contact"
        title={
          <>
            Your chair is <em>waiting.</em>
          </>
        }
        lead="New clients start with a consultation. Tell us a little about your hair and Jennifer will reach out to set it up."
      />
      <section id="book" aria-labelledby="form-heading" className="pb-20 lg:pb-28">
        <div className="container-x grid gap-12 lg:grid-cols-12 lg:gap-16">
          {/* Phones: the wedding card sits below the form, so point brides to their form up front. */}
          <p className="-mb-8 text-[15px] lg:hidden">
            Planning a wedding?{" "}
            <Link href="/weddings/#inquire" className="text-link">
              Use the wedding inquiry form
              <ArrowRight aria-hidden size={16} strokeWidth={2} />
            </Link>
          </p>
          <div className="card p-6 sm:p-10 lg:col-span-7">
            <h2 id="form-heading" className="h3 !text-[28px]">
              Request a consultation
            </h2>
            {bookingIsExternal && (
              <div className="mt-5 flex flex-col items-start gap-3 border-b border-line pb-8">
                <p>Prefer to pick a time yourself? Book online.</p>
                <Button href={site.booking.url} arrow>
                  Book Online
                </Button>
              </div>
            )}
            <div className="mt-8">
              <GhlForm form="contact" />
            </div>
          </div>
          <aside aria-labelledby="details-heading" className="lg:col-span-5">
            {/* Wedding inquiries go to the dedicated form at the bottom of /weddings/. */}
            <div className="mb-10 hidden rounded-2xl border border-line bg-accent-tint p-6 sm:p-7 lg:block">
              <h2 className="h3 !text-[24px]">Planning a wedding?</h2>
              <p className="mt-2">
                Interested in a wedding hair consultation for you or your bridal party? Tell us about your day on the wedding
                inquiry form.
              </p>
              <Button href="/weddings/#inquire" variant="secondary" arrow className="mt-5">
                Wedding Inquiry
              </Button>
            </div>
            <p className="eyebrow">The studio</p>
            <h2 id="details-heading" className="h2 mt-4 !text-[34px]">
              Visit <em>us.</em>
            </h2>
            <p className="mt-5 font-medium text-ink">New clients start with a consultation.</p>
            <div className="mt-8">
              <StudioDetails />
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}
