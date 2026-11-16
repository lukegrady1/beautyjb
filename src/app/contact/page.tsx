import type { Metadata } from "next";
import { Button } from "@/components/Button";
import { ContactForm } from "@/components/ContactForm";
import { PageHero } from "@/components/PageHero";
import { StudioDetails } from "@/components/StudioDetails";
import { site } from "@/content/site.config";
import { pageMetadata } from "@/lib/seo";
import { bookingIsExternal, inCity } from "@/lib/site";

export const metadata: Metadata = pageMetadata({
  title: `Book an Appointment | ${site.name} Hair Designer${inCity}`,
  description: `Request a consultation with hair designer Jennifer Bauduin for color, highlights, cuts, Brazilian straightening or wedding hair${inCity}.`,
  path: "/contact/",
  absolute: true,
});

export default function ContactPage() {
  return (
    <>
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
              <ContactForm />
            </div>
          </div>
          <aside aria-labelledby="details-heading" className="lg:col-span-5">
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
