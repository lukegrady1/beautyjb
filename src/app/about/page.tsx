import type { Metadata } from "next";
import { Check, Palette, RefreshCw, Scissors } from "lucide-react";
import { ArchFrame } from "@/components/ArchFrame";
import { BookButton, TextLink } from "@/components/Button";
import { CTABand } from "@/components/CTABand";
import { FAQ } from "@/components/FAQ";
import { FeatureCard } from "@/components/FeatureCard";
import { JsonLd } from "@/components/JsonLd";
import { OutlineNumeral } from "@/components/OutlineNumeral";
import { PageHero } from "@/components/PageHero";
import { Photo } from "@/components/Photo";
import { steps } from "@/components/ProcessSteps";
import { PullQuote } from "@/components/PullQuote";
import { StatBand } from "@/components/StatBand";
import { delay } from "@/lib/reveal";
import { experienceFaq, published } from "@/content/faq";
import { photos, work } from "@/content/photos";
import { site } from "@/content/site.config";
import { faqSchema, personSchema } from "@/lib/schema";
import { pageMetadata } from "@/lib/seo";
import { inCity } from "@/lib/site";

/* About + The Experience, combined (the old /experience/ page now lives at #experience). */
export const metadata: Metadata = pageMetadata({
  title: `About ${site.owner} | ${site.title}${inCity}`,
  description: `Meet ${site.owner}: ${site.yearsExperience} years behind the chair, a love of color and dry cuts designed for your face shape. See how every appointment works, start to finish.`,
  path: "/about/",
});

const faq = published(experienceFaq);

export default function AboutPage() {
  return (
    <>
      <JsonLd data={[personSchema(), faqSchema(faq)]} />
      <PageHero
        crumbs={[{ name: "About", path: "/about/" }]}
        eyebrow="About"
        title={
          <>
            Meet {site.owner}, <em>hair designer.</em>
          </>
        }
        lead={`${site.yearsExperience} years in the chair, and still in love with the work. Color, cuts designed for your face, and an experience built around your time.`}
        media={<ArchFrame photo={photos.portrait} priority />}
      />

      {/* Story */}
      <section aria-labelledby="story-heading" className="section bg-bg-alt">
        <div className="container-x grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="relative lg:col-span-5" data-reveal>
            <Photo
              photo={work.braidedCrown}
              className="placeholder-tile mx-auto aspect-[4/5] w-full max-w-sm rounded-[2rem] border border-line shadow-lift lg:max-w-none"
              sizes="(min-width: 1024px) 40vw, 24rem"
            />
            <OutlineNumeral className="absolute -bottom-6 left-4 sm:left-8 lg:-left-6" />
          </div>
          <div className="lg:col-span-7" data-reveal>
            <p className="eyebrow">My story</p>
            <h2 id="story-heading" className="h2 mt-4">
              Hair is my <em>artistry</em> and my passion.
            </h2>
            <div className="mt-8 max-w-[620px] space-y-5">
              <p>
                I&rsquo;ve been doing hair for {site.yearsExperience} years. To me it has never been just a job. It&rsquo;s
                artistry, and it&rsquo;s the thing I&rsquo;m most passionate about.
              </p>
              <p>
                Color is where I come alive. Highlights, lowlights, richer tones, softer greys: I love finding the color that
                enhances your natural hair instead of covering it up.
              </p>
              <p>
                Every cut I do is customized to your face shape and your personality. No two clients get the same haircut,
                because no two clients are the same.
              </p>
              <p>
                What I love most is the change: a new look, a fresh start, and the moment someone sees themselves in the mirror
                and feels good. That never gets old.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Philosophy */}
      <section aria-labelledby="philosophy-heading" className="section">
        <div className="container-x">
          <h2 id="philosophy-heading" className="sr-only">
            Philosophy
          </h2>
          <PullQuote cite={site.owner}>
            We choose our clients as much as they choose us. In a sea of salons, why do they pick us?
          </PullQuote>
          <div className="mx-auto mt-12 max-w-[640px] text-center" data-reveal>
            <span className="gold-rule" aria-hidden />
            <p className="lead mt-10">
              I want new clients to feel like they know me before they sit in the chair. Your time is yours, and I respect it.
              The haircut matters, but the whole experience is what you take away.
            </p>
          </div>
        </div>
      </section>

      {/* What she loves */}
      <section aria-labelledby="loves-heading" className="section bg-bg-alt">
        <div className="container-x">
          <div className="max-w-[760px]" data-reveal>
            <p className="eyebrow">What I love</p>
            <h2 id="loves-heading" className="h2 mt-4">
              The work that <em>never</em> gets old.
            </h2>
          </div>
          <div className="mt-12 grid gap-5 md:grid-cols-3">
            <FeatureCard icon={Palette} title="Color" style={delay(0)}>
              Highlights, lowlights and custom color that brings out the best of your natural hair.
            </FeatureCard>
            <FeatureCard icon={Scissors} title="Face-shape cuts" style={delay(1)}>
              Razor and texture cuts, designed for your features and cut dry so they fall right.
            </FeatureCard>
            <FeatureCard icon={RefreshCw} title="Transformations" style={delay(2)}>
              Changing a look completely, and watching someone walk out feeling like themselves again.
            </FeatureCard>
          </div>
          <div className="mt-10">
            <TextLink href="/services/">Explore services</TextLink>
          </div>
        </div>
      </section>

      {/* The experience: four steps */}
      <section id="experience" aria-labelledby="steps-heading" className="section scroll-mt-24">
        <div className="container-x">
          <div className="max-w-[760px]" data-reveal>
            <p className="eyebrow">The experience</p>
            <h2 id="steps-heading" className="h2 mt-4">
              Your time is yours. Here&rsquo;s <em>how we spend it.</em>
            </h2>
          </div>
          <div className="relative mt-14 lg:mt-20">
            {/* connector line */}
            <span aria-hidden className="absolute top-4 bottom-4 left-[27px] w-px bg-line lg:left-1/2" />
            <ol className="relative space-y-16 lg:space-y-28">
              {steps.map((s, i) => {
                const flip = i % 2 === 1;
                return (
                  <li key={s.n} className="relative grid gap-8 pl-20 lg:grid-cols-2 lg:gap-24 lg:pl-0">
                    <span
                      aria-hidden
                      className="absolute top-6 left-[20px] h-4 w-4 rounded-full border-4 border-bg bg-accent lg:left-1/2 lg:-translate-x-1/2"
                    />
                    <div className={`${flip ? "lg:order-2 lg:pl-4" : "lg:pr-4 lg:text-right"}`} data-reveal>
                      <p className="text-[56px] font-bold leading-none tracking-[-0.04em] text-accent-light lg:text-[80px]">{s.n}</p>
                      <h3 className="h3 mt-3 !text-[28px] lg:!text-[34px]">{s.title}</h3>
                      <p className={`mt-4 max-w-[480px] ${flip ? "" : "lg:ml-auto"}`}>{s.long}</p>
                    </div>
                    <div className={flip ? "lg:order-1" : ""} data-reveal>
                      <Photo
                        photo={photos.experience[i]}
                        className="placeholder-tile aspect-[4/3] rounded-[1.5rem] border border-line [&_img]:object-top"
                        sizes="(min-width: 1024px) 520px, 100vw"
                      />
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

      {/* Meet David */}
      <section aria-labelledby="david-heading" className="section bg-bg-alt">
        <div className="container-x grid items-center gap-10 md:grid-cols-12 md:gap-16">
          <div className="md:col-span-4" data-reveal>
            <Photo photo={photos.david} className="aspect-square rounded-sm" sizes="(min-width: 768px) 360px, 100vw" />
          </div>
          <div className="md:col-span-8" data-reveal>
            <p className="eyebrow">Meet {site.partner.name}</p>
            <h2 id="david-heading" className="h2 mt-4">
              Two artists, <em>one</em> studio.
            </h2>
            <p className="lead mt-6 max-w-[560px]">
              Jennifer&rsquo;s partner {site.partner.name} flies in every two weeks to work alongside her in the studio.
            </p>
            <div className="mt-8">
              <TextLink href="/contact/">Ask how to book with {site.partner.name}</TextLink>
            </div>
          </div>
        </div>
      </section>

      {/* Studio */}
      <section aria-labelledby="studio-heading" className="section">
        <div className="container-x">
          <div className="max-w-[760px]" data-reveal>
            <p className="eyebrow">The studio</p>
            <h2 id="studio-heading" className="h2 mt-4">
              Bold and modern, <em>like the work.</em>
            </h2>
          </div>
          <div className="mt-12 grid gap-4 md:grid-cols-12">
            <div className="md:col-span-7 md:row-span-2" data-reveal>
              <Photo photo={photos.studio[0]} className="aspect-[4/3] h-full rounded-sm" sizes="(min-width: 768px) 60vw, 100vw" />
            </div>
            <div className="md:col-span-5" data-reveal style={delay(1)}>
              <Photo photo={photos.studio[1]} className="aspect-[4/3] rounded-sm" sizes="(min-width: 768px) 40vw, 100vw" />
            </div>
            <div className="md:col-span-5" data-reveal style={delay(2)}>
              <Photo photo={photos.studio[2]} className="aspect-[4/3] rounded-sm" sizes="(min-width: 768px) 40vw, 100vw" />
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      {faq.length > 0 && (
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
      )}

      <CTABand />
    </>
  );
}
