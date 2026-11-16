import type { Metadata } from "next";
import { Palette, RefreshCw, Scissors } from "lucide-react";
import { ArchFrame } from "@/components/ArchFrame";
import { TextLink } from "@/components/Button";
import { CTABand } from "@/components/CTABand";
import { FeatureCard } from "@/components/FeatureCard";
import { JsonLd } from "@/components/JsonLd";
import { OutlineNumeral } from "@/components/OutlineNumeral";
import { PageHero } from "@/components/PageHero";
import { Photo } from "@/components/Photo";
import { PullQuote } from "@/components/PullQuote";
import { delay } from "@/lib/reveal";
import { photos } from "@/content/photos";
import { site } from "@/content/site.config";
import { personSchema } from "@/lib/schema";
import { pageMetadata } from "@/lib/seo";
import { inCity } from "@/lib/site";

export const metadata: Metadata = pageMetadata({
  title: `About ${site.owner} | ${site.title}${inCity}`,
  description: `Meet ${site.owner}: ${site.yearsExperience} years behind the chair, a love of color and cuts designed for your face shape. The artist behind Beauty JB.`,
  path: "/about/",
});

export default function AboutPage() {
  return (
    <>
      <JsonLd data={personSchema()} />
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
          <div className="lg:col-span-5" data-reveal>
            <OutlineNumeral />
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

      {/* Meet David */}
      <section aria-labelledby="david-heading" className="section">
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
      <section aria-labelledby="studio-heading" className="section bg-bg-alt">
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

      <CTABand />
    </>
  );
}
