import type { Metadata } from "next";
import { Clock, Heart, Palette, Scissors, Sparkles } from "lucide-react";
import { ArchFrame } from "@/components/ArchFrame";
import { BookButton, Button, TextLink } from "@/components/Button";
import { CTABand } from "@/components/CTABand";
import { FeatureCard } from "@/components/FeatureCard";
import { JsonLd } from "@/components/JsonLd";
import { OutlineNumeral } from "@/components/OutlineNumeral";
import { Photo } from "@/components/Photo";
import { ProcessStepsCompact } from "@/components/ProcessSteps";
import { PullQuote } from "@/components/PullQuote";
import { Reviews } from "@/components/Reviews";
import { delay } from "@/lib/reveal";
import { ServiceCard } from "@/components/ServiceCard";
import { StatBand } from "@/components/StatBand";
import { StudioDetails, hasStudioDetails } from "@/components/StudioDetails";
import { gallery } from "@/content/gallery";
import { photos } from "@/content/photos";
import { services } from "@/content/services";
import { site } from "@/content/site.config";
import { websiteSchema } from "@/lib/schema";
import { pageMetadata } from "@/lib/seo";
import { city, inCity, inCityState } from "@/lib/site";

export const metadata: Metadata = pageMetadata({
  title: `${site.name} | Hair Color, Cuts & Bridal Hair${inCityState}`,
  description: `Hair designer ${site.owner} brings ${site.yearsExperience} years of artistry to color, highlights, razor and texture cuts, and wedding hair${inCity}. Book your consultation.`,
  path: "/",
  absolute: true,
});

export default function Home() {
  return (
    <>
      <JsonLd data={websiteSchema()} />

      {/* 1. Hero */}
      <section className="pt-8 pb-16 lg:pt-16 lg:pb-28">
        <div className="container-x grid items-center gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-7">
            <p className="eyebrow">Hair Designer{city ? ` · ${city}` : ""}</p>
            <h1 className="h1 mt-5">Hair color, cuts &amp; bridal hair{inCity}</h1>
            <p className="mt-6 font-display text-[24px] italic leading-[1.3] text-accent lg:text-[30px]">
              &ldquo;We choose our clients as much as they choose us.&rdquo;
            </p>
            <p className="lead mt-6 max-w-[560px]">
              {site.yearsExperience} years of artistry, a studio that runs on your time, and an experience you&rsquo;ll want to come back to.
            </p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <BookButton />
              <Button href="/weddings/" variant="secondary">
                Wedding Hair
              </Button>
            </div>
            <p className="mt-7 flex items-center gap-2 text-[14px] font-medium">
              <Clock aria-hidden size={16} strokeWidth={1.5} className="shrink-0 text-gold" />
              Color, highlights &amp; cut in about 1 hr 45 min · Dry cutting specialist
            </p>
          </div>
          <div className="order-first mx-auto w-full max-w-[290px] sm:max-w-[400px] lg:order-none lg:col-span-5 lg:max-w-none">
            <ArchFrame
              photo={photos.hero}
              priority
              chip={
                <>
                  <span className="font-display text-[22px] font-semibold text-accent">{site.yearsExperience}</span> years behind the chair
                </>
              }
            />
          </div>
        </div>
      </section>

      {/* 2. Brand statement */}
      <section aria-labelledby="why-heading" className="section bg-bg-alt">
        <div className="container-x">
          <h2 id="why-heading" className="sr-only">
            Why clients choose Beauty JB
          </h2>
          <PullQuote>In a sea of salons, why do they pick us?</PullQuote>
          <ul className="mx-auto mt-14 grid max-w-[960px] gap-8 text-center sm:grid-cols-3 sm:gap-0">
            {[`${site.yearsExperience} years of artistry`, "Cuts designed for your face", "Your time, respected"].map((t, i) => (
              <li
                key={t}
                className="font-display text-[22px] font-semibold text-ink sm:border-l sm:border-gold sm:px-6 sm:first:border-l-0"
                data-reveal
                style={delay(i)}
              >
                {t}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* 3. About teaser */}
      <section aria-labelledby="about-heading" className="section">
        <div className="container-x grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5" data-reveal>
            <Photo photo={photos.portrait} className="aspect-[4/5] rounded-sm" sizes="(min-width: 1024px) 460px, 100vw" />
          </div>
          <div className="relative lg:col-span-7">
            <OutlineNumeral caption={false} className="pointer-events-none -mt-4 mb-2 flex justify-end opacity-80 sm:absolute sm:-top-24 sm:right-0 sm:m-0 sm:block sm:opacity-60 lg:-top-28" />
            <div className="relative">
              <p className="eyebrow" data-reveal>
                Meet Jennifer
              </p>
              <h2 id="about-heading" className="h2 mt-4 max-w-[560px]" data-reveal>
                Hair is my <em>artistry</em> and my passion.
              </h2>
              <div className="mt-6 max-w-[580px] space-y-4" data-reveal>
                <p>
                  I&rsquo;ve spent {site.yearsExperience} years in this industry, and I still love every day of it. Color is my
                  favorite: highlights, lowlights and enhancing the natural beauty you already have.
                </p>
                <p>
                  Every cut is customized to your face shape and personality. I love changing someone&rsquo;s look and watching
                  them walk out feeling good, and I want you to feel like you know me before you ever sit in my chair.
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="container-x mt-14 grid gap-5 md:grid-cols-3">
          <FeatureCard icon={Palette} title="Color is my favorite" style={delay(0)}>
            Highlights, lowlights and custom color that enhances what you were born with.
          </FeatureCard>
          <FeatureCard icon={Scissors} title="Cut for your face shape" style={delay(1)}>
            Razor and texture cuts, designed around you and cut dry so they fall right.
          </FeatureCard>
          <FeatureCard icon={Sparkles} title="Natural beauty, enhanced" style={delay(2)}>
            Hair that looks like you on your best day, not like everyone else.
          </FeatureCard>
        </div>
        <div className="container-x mt-10">
          <TextLink href="/about/">More about Jennifer</TextLink>
        </div>
      </section>

      {/* 4. Experience preview (ink) */}
      <section aria-labelledby="exp-heading" className="section on-ink">
        <div className="container-x">
          <div className="max-w-[760px]" data-reveal>
            <p className="eyebrow">The Experience</p>
            <h2 id="exp-heading" className="h2 mt-4">
              Four steps. <em>No</em> wasted time.
            </h2>
            <span className="trim-short mt-6" aria-hidden />
          </div>
          <div className="mt-14">
            <ProcessStepsCompact />
          </div>
          <div className="mt-14 flex flex-col gap-10 lg:flex-row lg:items-end lg:justify-between">
            <StatBand stat="~1 hr 45 min" onInk>
              for color, highlights &amp; cut
            </StatBand>
            <TextLink href="/experience/">See how it works</TextLink>
          </div>
        </div>
      </section>

      {/* 5. Services preview */}
      <section aria-labelledby="services-heading" className="section">
        <div className="container-x">
          <div className="max-w-[760px]" data-reveal>
            <p className="eyebrow">Services</p>
            <h2 id="services-heading" className="h2 mt-4">
              Color, cuts &amp; <em>everything</em> in between.
            </h2>
          </div>
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {services.map((s, i) => (
              <ServiceCard key={s.slug} service={s} style={delay(i)} />
            ))}
          </div>
          <p className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-6">
            <span>Don&rsquo;t see it? Ask during your consultation.</span>
            <TextLink href="/services/">All services</TextLink>
          </p>
        </div>
      </section>

      {/* 6. Weddings feature */}
      <section aria-labelledby="weddings-heading" className="section bg-accent-tint">
        <div className="container-x grid items-center gap-12 lg:grid-cols-12 lg:gap-20">
          <div className="mx-auto w-full max-w-[380px] lg:col-span-5 lg:max-w-none">
            <ArchFrame photo={photos.weddingFeature} sizes="(min-width: 1024px) 420px, 80vw" />
          </div>
          <div className="lg:col-span-7" data-reveal>
            <p className="eyebrow">Weddings</p>
            <h2 id="weddings-heading" className="h2 mt-4">
              Bridal hair for the <em>whole</em> party.
            </h2>
            <p className="lead mt-6 max-w-[520px]">Updos, blowouts and makeup, in the studio or at your venue.</p>
            <div className="mt-9">
              <Button href="/weddings/" arrow>
                Plan Your Wedding Hair
              </Button>
            </div>
            <p className="mt-8 flex items-center gap-2 text-[14px] font-medium">
              <Heart aria-hidden size={16} strokeWidth={1.5} className="text-accent" />
              Bride, bridesmaids, moms: everyone ready on time.
            </p>
          </div>
        </div>
      </section>

      {/* 7. Gallery strip */}
      <section aria-labelledby="gallery-heading" className="section">
        <div className="container-x">
          <div className="max-w-[760px]" data-reveal>
            <p className="eyebrow">Recent Work</p>
            <h2 id="gallery-heading" className="h2 mt-4">
              From the <em>chair.</em>
            </h2>
          </div>
          <ul className="no-scrollbar -mx-6 mt-12 flex snap-x snap-mandatory gap-3 overflow-x-auto px-6 sm:mx-0 sm:grid sm:grid-cols-3 sm:gap-4 sm:overflow-visible sm:px-0">
            {gallery.slice(0, 6).map((g, i) => (
              <li key={g.label} className="w-[72%] shrink-0 snap-start sm:w-auto" data-reveal style={delay(i % 3)}>
                <Photo photo={g} className="aspect-[4/5] rounded-sm" sizes="(min-width: 640px) 33vw, 72vw" />
              </li>
            ))}
          </ul>
          <div className="mt-10">
            <TextLink href="/gallery/">See the full gallery</TextLink>
          </div>
        </div>
      </section>

      {/* 8. Reviews (renders only with real reviews) */}
      <Reviews />

      {/* 9. Visit (renders only once address/hours exist) */}
      {hasStudioDetails() && (
        <section aria-labelledby="visit-heading" className="section">
          <div className="container-x grid gap-12 lg:grid-cols-2">
            <div data-reveal>
              <p className="eyebrow">Visit</p>
              <h2 id="visit-heading" className="h2 mt-4">
                Come see the <em>studio.</em>
              </h2>
              <p className="lead mt-6">Bold and modern, like the work.</p>
            </div>
            <StudioDetails />
          </div>
        </section>
      )}

      <CTABand />
    </>
  );
}
