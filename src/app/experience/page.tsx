import type { Metadata } from "next";
import { Check } from "lucide-react";
import { BookButton, TextLink } from "@/components/Button";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { CTABand } from "@/components/CTABand";
import { FAQ } from "@/components/FAQ";
import { JsonLd } from "@/components/JsonLd";
import { Photo } from "@/components/Photo";
import { steps } from "@/components/ProcessSteps";
import { StatBand } from "@/components/StatBand";
import { experienceFaq, published } from "@/content/faq";
import { photos } from "@/content/photos";
import { site } from "@/content/site.config";
import { faqSchema } from "@/lib/schema";
import { pageMetadata } from "@/lib/seo";
import { inCity } from "@/lib/site";

export const metadata: Metadata = pageMetadata({
  title: `The ${site.name} Experience | Dry Cutting & Efficient Color${inCity}`,
  description: `Consultation, plan, dry cut, finish. How ${site.owner} delivers color, highlights and a cut in about 1 hr 45 min, without cutting corners.`,
  path: "/experience/",
  absolute: true,
});

const faq = published(experienceFaq);

export default function ExperiencePage() {
  return (
    <>
      <JsonLd data={faqSchema(faq)} />

      {/* Hero (ink) */}
      <section className="on-ink pt-8 pb-20 lg:pt-12 lg:pb-28">
        <div className="container-x">
          <Breadcrumbs items={[{ name: "Experience", path: "/experience/" }]} onInk />
          <div className="mt-12 max-w-[820px] lg:mt-16">
            <p className="eyebrow">The Experience</p>
            <h1 className="h1 mt-5">
              The {site.name} <em>experience.</em>
            </h1>
            <span className="trim-short mt-8" aria-hidden />
            <p className="lead mt-8 max-w-[560px]">Your time is yours. Here&rsquo;s how we spend it.</p>
          </div>
        </div>
      </section>

      {/* Four steps */}
      <section aria-labelledby="steps-heading" className="section">
        <div className="container-x">
          <h2 id="steps-heading" className="sr-only">
            The four steps
          </h2>
          <div className="relative">
          {/* gold connector hairline */}
          <span aria-hidden className="absolute top-4 bottom-4 left-[27px] w-px bg-gold/60 lg:left-1/2" />
          <ol className="relative space-y-16 lg:space-y-28">
            {steps.map((s, i) => {
              const flip = i % 2 === 1;
              return (
                <li key={s.n} className="relative grid gap-8 pl-20 lg:grid-cols-2 lg:gap-24 lg:pl-0">
                  <span
                    aria-hidden
                    className="absolute top-6 left-[21px] h-3 w-3 rounded-full border border-gold bg-bg lg:left-1/2 lg:-translate-x-1/2"
                  />
                  <div className={`${flip ? "lg:order-2 lg:pl-4" : "lg:pr-4 lg:text-right"}`} data-reveal>
                    <p className="font-display text-[64px] italic leading-none text-accent lg:text-[96px]">{s.n}</p>
                    <h3 className="h3 mt-3 !text-[28px] lg:!text-[34px]">{s.title}</h3>
                    {s.feature ? (
                      <div className={`card mt-5 border-gold p-6 text-left ${flip ? "" : "lg:ml-auto"} max-w-[480px]`}>
                        <p className="chip">The difference</p>
                        <p className="mt-3">{s.long}</p>
                      </div>
                    ) : (
                      <p className={`mt-4 max-w-[480px] ${flip ? "" : "lg:ml-auto"}`}>{s.long}</p>
                    )}
                  </div>
                  <div className={flip ? "lg:order-1" : ""} data-reveal>
                    <Photo photo={photos.experience[i]} className="aspect-[4/3] rounded-sm" sizes="(min-width: 1024px) 520px, 100vw" />
                  </div>
                </li>
              );
            })}
          </ol>
          </div>
        </div>
      </section>

      {/* Speed stat */}
      <section aria-label="Appointment time" className="section on-ink">
        <div className="container-x">
          <StatBand stat="About 1 hr 45 min" sub={`That's ${site.yearsExperience} years of experience at work. No wasted time, no shortcuts.`} onInk>
            for color, highlights and a cut.
          </StatBand>
        </div>
      </section>

      {/* Why dry cutting */}
      <section aria-labelledby="dry-heading" className="section">
        <div className="container-x grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5" data-reveal>
            <p className="eyebrow">Why dry cutting?</p>
            <h2 id="dry-heading" className="h2 mt-4">
              Cut dry, so it <em>falls right.</em>
            </h2>
            <p className="lead mt-6">
              Wet hair stretches and hides its habits. Dry hair tells the truth, so that&rsquo;s how Jennifer cuts{inCity}.
            </p>
          </div>
          <ul className="space-y-6 lg:col-span-7 lg:pt-10" data-reveal>
            {[
              ["See how it really falls", "Cowlicks, waves, curl and natural part are all visible, so the cut works with them instead of against them."],
              ["No surprises when it dries", "What you see in the chair is the shape you take home. Nothing shrinks or springs up later."],
              ["Easier to style at home", "A cut designed around how your hair actually lives day to day means less fighting with it every morning."],
            ].map(([t, d]) => (
              <li key={t} className="flex gap-4 border-b border-line pb-6">
                <Check aria-hidden size={22} strokeWidth={1.5} className="mt-1 shrink-0 text-accent" />
                <div>
                  <h3 className="h3">{t}</h3>
                  <p className="mt-2">{d}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* FAQ */}
      <section aria-labelledby="faq-heading" className="section bg-bg-alt">
        <div className="container-x grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-4" data-reveal>
            <p className="eyebrow">Questions</p>
            <h2 id="faq-heading" className="h2 mt-4">
              Good to <em>know.</em>
            </h2>
            <div className="mt-8 flex flex-col items-start gap-5">
              <BookButton />
              <TextLink href="/services/">Explore services</TextLink>
            </div>
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
