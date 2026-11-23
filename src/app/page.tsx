import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Clock, Heart, Palette, Scissors, Sparkles } from "lucide-react";
import { ArchFrame } from "@/components/ArchFrame";
import { BookButton, Button } from "@/components/Button";
import { CTABand } from "@/components/CTABand";
import { FeatureCard } from "@/components/FeatureCard";
import { GallerySlider } from "@/components/GallerySlider";
import { JsonLd } from "@/components/JsonLd";
import { Photo } from "@/components/Photo";
import { ProcessStepsCompact } from "@/components/ProcessSteps";
import { Reviews } from "@/components/Reviews";
import { delay } from "@/lib/reveal";
import { ServiceCard } from "@/components/ServiceCard";
import { StudioDetails, hasStudioDetails } from "@/components/StudioDetails";
import { featuredGallery } from "@/content/gallery";
import { ig } from "@/content/instagram";
import { photos } from "@/content/photos";
import { services } from "@/content/services";
import { site } from "@/content/site.config";
import { websiteSchema } from "@/lib/schema";
import { pageMetadata } from "@/lib/seo";
import { inCity, inCityState } from "@/lib/site";

export const metadata: Metadata = pageMetadata({
  title: `${site.name} | Hair Color, Cuts & Bridal Hair${inCityState}`,
  description: `Hair designer ${site.owner} brings ${site.yearsExperience} years of artistry to color, highlights, razor and texture cuts, and wedding hair${inCity}. Book your consultation.`,
  path: "/",
  absolute: true,
});

/* Section heading + optional link on the right: the shared Stevie rhythm. */
function SectionHead({
  id,
  eyebrow,
  title,
  link,
}: {
  id: string;
  eyebrow: string;
  title: React.ReactNode;
  link?: { href: string; label: string };
}) {
  return (
    <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between" data-reveal>
      <div className="max-w-2xl">
        <p className="eyebrow">{eyebrow}</p>
        <h2 id={id} className="h2 mt-3">
          {title}
        </h2>
      </div>
      {link && (
        <Link href={link.href} className="text-link shrink-0">
          {link.label}
          <ArrowRight aria-hidden size={18} strokeWidth={2} />
        </Link>
      )}
    </div>
  );
}

export default function Home() {
  return (
    <>
      <JsonLd data={websiteSchema()} />

      {/* 1. Hero: text left, rounded photo right */}
      <section className="relative overflow-hidden">
        <div className="container-x grid gap-10 pt-10 pb-16 sm:pt-16 lg:grid-cols-[1.15fr_0.85fr] lg:items-center lg:gap-14 lg:pt-20 lg:pb-24">
          <div>
            <h1 className="h1">
              Hair Color, Cuts &amp; Bridal Hair{inCityState && <em>{inCityState}</em>}
            </h1>
            <p className="lead mt-5 max-w-lg">
              Custom color, face-shaped cuts and wedding-day hair with {site.owner}, a hair designer who still loves every day
              behind the chair.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
              <BookButton className="w-full sm:w-auto sm:min-w-[15rem]" />
            </div>
            <p className="mt-5 flex items-center gap-2 text-sm">
              <Clock aria-hidden size={16} className="shrink-0 text-accent" />
              Color, highlights &amp; cut in about 1 hr 45 min · Dry cutting specialist
            </p>
          </div>
          <div className="mx-auto w-full max-w-[17.5rem] sm:max-w-md lg:max-w-none">
            <ArchFrame photo={photos.hero} priority />
          </div>
        </div>
      </section>

      {/* 2. Services */}
      <section aria-labelledby="services-heading" className="section">
        <div className="container-x">
          <SectionHead
            id="services-heading"
            eyebrow="Services"
            title="Color, cuts, and everything in between."
            link={{ href: "/services/", label: "All services" }}
          />
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {services.map((s, i) => (
              <ServiceCard key={s.slug} service={s} withPhoto={false} style={delay(i)} />
            ))}
          </div>
        </div>
      </section>

      {/* 3. Weddings (surface band) */}
      <section aria-labelledby="weddings-heading" className="section bg-bg-alt">
        <div className="container-x grid gap-10 lg:grid-cols-2 lg:items-center lg:gap-16">
          <div className="grid grid-cols-2 gap-3 sm:gap-4" data-reveal>
            <Photo
              photo={ig.bridalBunWithVeil}
              className="placeholder-tile aspect-[3/4] rounded-[1.5rem] border border-line shadow-lift"
              sizes="(min-width: 1024px) 280px, 45vw"
            />
            <Photo
              photo={ig.halfUpCurlsPearlPins}
              className="placeholder-tile mt-10 aspect-[3/4] rounded-[1.5rem] border border-line shadow-lift"
              sizes="(min-width: 1024px) 280px, 45vw"
            />
          </div>
          <div data-reveal>
            <p className="eyebrow">Weddings</p>
            <h2 id="weddings-heading" className="h2 mt-3">
              Bridal hair for the whole party.
            </h2>
            <p className="lead mt-5 max-w-lg">Updos, blowouts and makeup, in the studio or at your venue.</p>
            <ul className="mt-6 space-y-2 text-ink">
              {["Bride, bridesmaids and moms", "Trials before the big day", "Everyone ready on time"].map((t) => (
                <li key={t} className="flex items-center gap-3">
                  <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-accent-light text-accent">
                    <Heart aria-hidden size={13} fill="currentColor" />
                  </span>
                  {t}
                </li>
              ))}
            </ul>
            <div className="mt-8">
              <Button href="/weddings/" arrow>
                Plan Your Wedding Hair
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* 4. About teaser: portrait left, quote + values right */}
      <section aria-labelledby="about-heading" className="section">
        <div className="container-x grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-x-16 lg:gap-y-0">
          <div className="lg:col-start-2 lg:row-start-1 lg:self-end" data-reveal>
            <p className="eyebrow">Meet Jennifer</p>
            <h2 id="about-heading" className="h2 mt-3">
              &ldquo;We choose our clients as much as they choose us.&rdquo;
            </h2>
          </div>

          <div className="order-2 lg:order-none lg:col-start-1 lg:row-span-2 lg:row-start-1" data-reveal>
            <Photo
              photo={photos.portrait}
              className="placeholder-tile mx-auto aspect-[4/5] w-full max-w-sm rounded-[2rem] border border-line shadow-lift lg:max-w-none"
              sizes="(min-width: 1024px) 40vw, 24rem"
            />
          </div>

          <div className="order-3 lg:order-none lg:col-start-2 lg:row-start-2 lg:self-start" data-reveal>
            <div className="space-y-4 text-[1.05rem] leading-relaxed lg:mt-6">
              <p>
                I&rsquo;ve spent {site.yearsExperience} years in this industry, and I still love every day of it. Color is my
                favorite: highlights, lowlights and enhancing the natural beauty you already have. Every cut is customized to your
                face shape and personality.
              </p>
            </div>
            <p className="mt-6 text-lg font-semibold text-ink">— {site.owner}</p>

            <ul className="mt-10 grid gap-4 sm:grid-cols-3">
              <li>
                <FeatureCard icon={Palette} title="Color is my favorite" surface="bg-bg-alt" style={delay(0)}>
                  Highlights, lowlights and custom color that enhances what you were born with.
                </FeatureCard>
              </li>
              <li>
                <FeatureCard icon={Scissors} title="Cut for your face" surface="bg-bg-alt" style={delay(1)}>
                  Razor and texture cuts, cut dry so they fall right.
                </FeatureCard>
              </li>
              <li>
                <FeatureCard icon={Sparkles} title="Your time, respected" surface="bg-bg-alt" style={delay(2)}>
                  A clear plan and no wasted time in the chair.
                </FeatureCard>
              </li>
            </ul>

            <Link href="/about/" className="text-link mt-8">
              More about Jennifer
              <ArrowRight aria-hidden size={18} strokeWidth={2} />
            </Link>
          </div>
        </div>
      </section>

      {/* 5. The experience (part of About) */}
      <section aria-labelledby="exp-heading" className="section bg-accent-tint">
        <div className="container-x">
          <SectionHead
            id="exp-heading"
            eyebrow="The Experience"
            title="Four steps. No wasted time."
            link={{ href: "/about/#experience", label: "See how it works" }}
          />
          <div className="mt-10">
            <ProcessStepsCompact />
          </div>
          <p className="mt-8 inline-flex items-center gap-3 rounded-2xl border border-line bg-bg-alt px-5 py-4 text-ink" data-reveal>
            <Clock aria-hidden size={22} className="shrink-0 text-accent" />
            <span>
              <strong className="font-bold">About 1 hr 45 min</strong> for color, highlights &amp; cut.
            </span>
          </p>
        </div>
      </section>

      {/* 6. Reviews (renders only with real reviews) */}
      <Reviews />

      {/* 7. Gallery slider */}
      <section aria-labelledby="gallery-heading" className="section">
        <div className="container-x">
          <SectionHead
            id="gallery-heading"
            eyebrow="Gallery"
            title="Recent work from the chair."
            link={{ href: "/gallery/", label: "See the gallery" }}
          />
          <GallerySlider items={featuredGallery} />
        </div>
      </section>

      {/* 8. Visit (renders only once address/hours exist) */}
      {hasStudioDetails() && (
        <section aria-labelledby="visit-heading" className="section bg-bg-alt">
          <div className="container-x">
            <SectionHead id="visit-heading" eyebrow="Visit" title="Come see the studio." link={{ href: "/contact/", label: "Directions & contact" }} />
            <div className="mt-10">
              <StudioDetails />
            </div>
          </div>
        </section>
      )}

      <CTABand />
    </>
  );
}
