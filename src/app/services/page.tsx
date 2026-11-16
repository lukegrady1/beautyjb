import type { Metadata } from "next";
import { BeforeAfterTabs } from "@/components/BeforeAfterTabs";
import { BookButton, TextLink } from "@/components/Button";
import { CTABand } from "@/components/CTABand";
import { FAQ } from "@/components/FAQ";
import { JsonLd } from "@/components/JsonLd";
import { PageHero } from "@/components/PageHero";
import { ServiceRow } from "@/components/ServiceRow";
import { published, servicesFaq } from "@/content/faq";
import { services } from "@/content/services";
import { faqSchema } from "@/lib/schema";
import { pageMetadata } from "@/lib/seo";
import { inCity } from "@/lib/site";

export const metadata: Metadata = pageMetadata({
  title: `Hair Services${inCity}: Color, Highlights, Razor Cuts`,
  description: `Hair color, highlights and lowlights, razor and texture cuts and Brazilian straightening${inCity}, by hair designer Jennifer Bauduin. Every cut done dry.`,
  path: "/services/",
});

const faq = published(servicesFaq);

export default function ServicesPage() {
  return (
    <>
      <JsonLd data={faqSchema(faq)} />
      <PageHero
        crumbs={[{ name: "Services", path: "/services/" }]}
        eyebrow="Services"
        title={<>Hair services{inCity}</>}
        lead="A focused menu of what Jennifer does best. Anything else, we'll talk about in your consultation."
      />

      <section aria-labelledby="menu-heading" className="pb-16 lg:pb-24">
        <div className="container-x">
          <h2 id="menu-heading" className="sr-only">
            Service menu
          </h2>
          <ul className="border-t border-gold/60">
            {services.map((s, i) => (
              <ServiceRow key={s.slug} service={s} index={i} />
            ))}
          </ul>
          <p className="mt-8 text-[15px]">
            Every service follows the same four steps.{" "}
            <TextLink href="/experience/">See the experience</TextLink>
          </p>
        </div>
      </section>

      <section aria-labelledby="ba-heading" className="section bg-bg-alt">
        <div className="container-x grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-4" data-reveal>
            <p className="eyebrow">Before &amp; after</p>
            <h2 id="ba-heading" className="h2 mt-4">
              See the <em>difference.</em>
            </h2>
            <p className="lead mt-6">Drag the gold handle to compare.</p>
          </div>
          <div className="lg:col-span-8">
            <BeforeAfterTabs
              tabs={services.flatMap((s) => (s.beforeAfter?.[0] ? [{ slug: s.slug, name: s.name, ...s.beforeAfter[0] }] : []))}
            />
          </div>
        </div>
      </section>

      <section aria-labelledby="unsure-heading" className="section on-ink">
        <div className="container-x flex flex-col items-start gap-8 lg:flex-row lg:items-end lg:justify-between" data-reveal>
          <div className="max-w-[640px]">
            <p className="eyebrow">Not sure what you need?</p>
            <h2 id="unsure-heading" className="h2 mt-4">
              That&rsquo;s what the <em>consultation</em> is for.
            </h2>
            <span className="trim-short mt-6" aria-hidden />
          </div>
          <BookButton />
        </div>
      </section>

      <section aria-labelledby="faq-heading" className="section">
        <div className="container-x grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-4" data-reveal>
            <p className="eyebrow">Questions</p>
            <h2 id="faq-heading" className="h2 mt-4">
              Service <em>FAQ</em>
            </h2>
          </div>
          <div className="lg:col-span-8">
            <FAQ items={faq} />
          </div>
        </div>
      </section>

      <CTABand />
    </>
  );
}
