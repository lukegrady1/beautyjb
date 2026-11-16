import type { Metadata } from "next";
import { Building2, Car } from "lucide-react";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { CTABand } from "@/components/CTABand";
import { FAQ } from "@/components/FAQ";
import { GalleryGrid } from "@/components/GalleryGrid";
import { JsonLd } from "@/components/JsonLd";
import { PackageCard } from "@/components/PackageCard";
import { Photo } from "@/components/Photo";
import { PressRow } from "@/components/PressRow";
import { delay } from "@/lib/reveal";
import { WeddingInquiryForm } from "@/components/WeddingInquiryForm";
import { published, weddingFaq } from "@/content/faq";
import { photos } from "@/content/photos";
import { site } from "@/content/site.config";
import { weddings } from "@/content/weddings";
import { faqSchema, serviceSchema } from "@/lib/schema";
import { pageMetadata } from "@/lib/seo";
import { inCity, isSet } from "@/lib/site";

const description = `Wedding hair and makeup${inCity}: updos, blowouts and makeup for the bride and her party, in the studio or at your venue. By hair designer Jennifer Bauduin.`;

export const metadata: Metadata = pageMetadata({
  title: `Bridal & Wedding Hair${inCity}: Updos, Makeup, On-Site`,
  description,
  path: "/weddings/",
});

const faq = published(weddingFaq);

export default function WeddingsPage() {
  return (
    <>
      <JsonLd
        data={[
          serviceSchema({ name: "Bridal & Wedding Hair", serviceType: "Bridal hair and makeup", description, path: "/weddings/" }),
          faqSchema(faq),
        ]}
      />

      {/* Hero */}
      <section className="pt-8 pb-16 lg:pt-12 lg:pb-24">
        <div className="container-x">
          <Breadcrumbs items={[{ name: "Weddings", path: "/weddings/" }]} />
          <div className="mx-auto mt-10 max-w-[860px] text-center lg:mt-14">
            <p className="eyebrow justify-center">Weddings</p>
            <h1 className="h1 mt-5">
              Wedding hair &amp; makeup<em>{inCity}</em>
            </h1>
            <p className="lead mx-auto mt-6 max-w-[600px]">
              Updos, blowouts and makeup for the bride and her party, in the studio or at your venue.
            </p>
            <a href="#inquire" className="btn btn-primary mt-9">
              Start Planning
            </a>
          </div>
          <div className="relative mx-auto mt-14 max-w-[960px]">
            <div aria-hidden className="arch absolute inset-0 translate-x-3 translate-y-3 border border-gold" />
            <Photo photo={weddings.heroImage} priority className="arch relative aspect-[4/5] sm:aspect-[16/10]" sizes="(min-width: 1024px) 960px, 100vw" />
          </div>
        </div>
      </section>

      {/* Services */}
      <section aria-labelledby="w-services-heading" className="section bg-bg-alt">
        <div className="container-x">
          <div className="mx-auto max-w-[760px] text-center" data-reveal>
            <p className="eyebrow justify-center">The services</p>
            <h2 id="w-services-heading" className="h2 mt-4">
              Bridal hair for the <em>whole</em> party.
            </h2>
            <p className="lead mt-5">{weddings.pricingNote}</p>
          </div>
          <div className="mt-12 grid gap-5 md:grid-cols-3">
            {weddings.services.map((s, i) => {
              const price = site.showPrices && isSet(s.price) ? s.price : null;
              return (
                <div key={s.name} className="card card-hover p-7 text-center" data-reveal style={delay(i)}>
                  <h3 className="h3 !text-[28px]">{s.title}</h3>
                  <span className="gold-rule mt-5" aria-hidden />
                  <p className="mt-5">{s.blurb}</p>
                  {price && <p className="mt-5 font-display text-[22px] text-ink">{price}</p>}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Where */}
      <section aria-labelledby="where-heading" className="section">
        <div className="container-x">
          <div className="max-w-[760px]" data-reveal>
            <p className="eyebrow">Where</p>
            <h2 id="where-heading" className="h2 mt-4">
              The studio, or <em>your</em> venue.
            </h2>
          </div>
          <div className="mt-12 grid gap-5 md:grid-cols-2">
            {[
              { icon: Building2, title: "In the Studio", text: "Get ready together in the studio: calm, unhurried and set up for the whole party.", photo: photos.inStudio },
              { icon: Car, title: "At Your Venue", text: `We come to the church or venue. ${weddings.travelNote}`, photo: photos.atVenue },
            ].map((p, i) => (
              <div key={p.title} className="card overflow-hidden" data-reveal style={delay(i)}>
                <Photo photo={p.photo} className="aspect-[16/10]" sizes="(min-width: 768px) 50vw, 100vw" />
                <div className="p-7">
                  <p.icon aria-hidden size={26} strokeWidth={1.5} className="text-gold" />
                  <h3 className="h3 mt-4 !text-[26px]">{p.title}</h3>
                  <p className="mt-2">{p.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Packages */}
      <section aria-labelledby="packages-heading" className="section bg-accent-tint">
        <div className="container-x">
          <div className="mx-auto max-w-[760px] text-center" data-reveal>
            <p className="eyebrow justify-center">{weddings.packagesLabel}</p>
            <h2 id="packages-heading" className="h2 mt-4">
              One day, <em>everyone</em> ready.
            </h2>
          </div>
          <div className="mt-12 grid gap-5 lg:grid-cols-3">
            {weddings.packages.map((p, i) => (
              <PackageCard key={p.name} pkg={p} featured={i === 1} style={delay(i)} />
            ))}
          </div>
        </div>
      </section>

      {/* Updo & curl gallery */}
      <section aria-labelledby="w-gallery-heading" className="section">
        <div className="container-x">
          <div className="max-w-[760px]" data-reveal>
            <p className="eyebrow">Updos &amp; curls</p>
            <h2 id="w-gallery-heading" className="h2 mt-4">
              Wedding <em>work.</em>
            </h2>
          </div>
          <div className="mt-12">
            <GalleryGrid items={weddings.gallery} />
          </div>
        </div>
      </section>

      <PressRow />

      {/* Inquiry form */}
      <section id="inquire" aria-labelledby="inquire-heading" className="section bg-bg-alt">
        <div className="container-x grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-4" data-reveal>
            <p className="eyebrow">Inquire</p>
            <h2 id="inquire-heading" className="h2 mt-4">
              Tell us about <em>your</em> day.
            </h2>
            <p className="lead mt-6">Share the details and Jennifer will reach out to talk through availability and plans.</p>
          </div>
          <div className="card p-6 sm:p-10 lg:col-span-8">
            <WeddingInquiryForm />
          </div>
        </div>
      </section>

      {/* FAQ */}
      {faq.length > 0 && (
        <section aria-labelledby="w-faq-heading" className="section">
          <div className="container-x grid gap-12 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-4" data-reveal>
              <p className="eyebrow">Questions</p>
              <h2 id="w-faq-heading" className="h2 mt-4">
                Wedding <em>FAQ</em>
              </h2>
            </div>
            <div className="lg:col-span-8">
              <FAQ items={faq} />
            </div>
          </div>
        </section>
      )}

      <CTABand />
    </>
  );
}
