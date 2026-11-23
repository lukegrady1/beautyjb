import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Check } from "lucide-react";
import { ArchFrame } from "@/components/ArchFrame";
import { BeforeAfterSlider } from "@/components/BeforeAfterSlider";
import { BookButton, TextLink } from "@/components/Button";
import { CTABand } from "@/components/CTABand";
import { FAQ } from "@/components/FAQ";
import { JsonLd } from "@/components/JsonLd";
import { PageHero } from "@/components/PageHero";
import { ServiceCard } from "@/components/ServiceCard";
import { published } from "@/content/faq";
import { getService, services } from "@/content/services";
import { faqSchema, serviceSchema } from "@/lib/schema";
import { pageMetadata } from "@/lib/seo";
import { inCity } from "@/lib/site";

type Params = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const s = getService((await params).slug);
  if (!s) return {};
  return pageMetadata({
    title: `${s.metaTitle}${inCity}`,
    description: s.metaDescription,
    path: `/services/${s.slug}/`,
  });
}

/** "{inCity}" token → " in City" (or nothing until the city is known). */
const fill = (t: string) => t.replaceAll("{inCity}", inCity);

export default async function ServiceDetail({ params }: Params) {
  const s = getService((await params).slug);
  if (!s) notFound();

  const path = `/services/${s.slug}/`;
  const faq = published(s.faq);
  const related = s.related.map(getService).filter((x) => x !== undefined);
  const pair = s.beforeAfter?.[0];

  return (
    <>
      <JsonLd
        data={[
          serviceSchema({ name: s.name, serviceType: s.name, description: s.metaDescription, path }),
          faqSchema(faq),
        ]}
      />
      <PageHero
        crumbs={[
          { name: "Services", path: "/services/" },
          { name: s.name, path },
        ]}
        eyebrow="Services"
        title={
          <>
            {s.h1}
            {inCity && <em>{inCity}</em>}
          </>
        }
        lead={fill(s.body[0])}
        media={<ArchFrame photo={s.image} priority />}
      >
        <div className="mt-9">
          <BookButton />
        </div>
      </PageHero>

      <section aria-labelledby="intro-heading" className="section bg-bg-alt">
        <div className="container-x grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5" data-reveal>
            <p className="eyebrow">{s.name}</p>
            <h2 id="intro-heading" className="h2 mt-4">
              Made for <em>you,</em> not a template.
            </h2>
          </div>
          <div className="max-w-[640px] space-y-5 lg:col-span-7" data-reveal>
            {s.body.slice(1).map((p) => (
              <p key={p} className="lead">
                {fill(p)}
              </p>
            ))}
          </div>
        </div>
      </section>

      <section aria-labelledby="expect-heading" className="section">
        <div className="container-x grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5" data-reveal>
            <p className="eyebrow">What to expect</p>
            <h2 id="expect-heading" className="h2 mt-4">
              Four steps. <em>No</em> wasted time.
            </h2>
            <div className="mt-8">
              <TextLink href="/about/#experience">How the Beauty JB experience works</TextLink>
            </div>
          </div>
          <div className="max-w-[640px] space-y-5 lg:col-span-7" data-reveal>
            {s.expect.map((p) => (
              <p key={p}>{fill(p)}</p>
            ))}
          </div>
        </div>
      </section>

      <section aria-labelledby="who-heading" className="section bg-bg-alt">
        <div className="container-x grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5" data-reveal>
            <p className="eyebrow">Who it&rsquo;s for</p>
            <h2 id="who-heading" className="h2 mt-4">
              A good fit <em>if</em> you want&hellip;
            </h2>
            <ul className="mt-8 space-y-4">
              {s.forWho.map((w) => (
                <li key={w} className="flex gap-3 border-b border-line pb-4 text-ink">
                  <Check aria-hidden size={20} strokeWidth={1.5} className="mt-1 shrink-0 text-accent" />
                  {w}
                </li>
              ))}
            </ul>
          </div>
          {pair && (
            <div className="lg:col-span-7" data-reveal>
              <BeforeAfterSlider before={pair.before} after={pair.after} label={pair.alt} className="aspect-[4/5] sm:aspect-[3/2]" />
              <p className="mt-3 text-[14px]">Drag the gold handle to compare before and after.</p>
            </div>
          )}
        </div>
      </section>

      {faq.length > 0 && (
        <section aria-labelledby="faq-heading" className="section">
          <div className="container-x grid gap-12 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-4" data-reveal>
              <p className="eyebrow">Questions</p>
              <h2 id="faq-heading" className="h2 mt-4">
                {s.name} <em>FAQ</em>
              </h2>
              <div className="mt-8 flex flex-col items-start gap-5">
                <BookButton />
                <TextLink href="/contact/">Contact the studio</TextLink>
              </div>
            </div>
            <div className="lg:col-span-8">
              <FAQ items={faq} />
            </div>
          </div>
        </section>
      )}

      {related.length > 0 && (
        <section aria-labelledby="related-heading" className="section bg-bg-alt">
          <div className="container-x">
            <p className="eyebrow">Related services</p>
            <h2 id="related-heading" className="h2 mt-4">
              Pairs <em>well</em> with
            </h2>
            <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:max-w-[760px]">
              {related.map((r) => (
                <ServiceCard key={r.slug} service={r} />
              ))}
            </div>
          </div>
        </section>
      )}

      <CTABand />
    </>
  );
}
