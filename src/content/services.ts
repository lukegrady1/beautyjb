/*
  Hair services. Each entry powers a row on /services/, a card on Home and a
  full SEO landing page at /services/[slug]/.

  Copy tokens: "{inCity}" renders as " in <City>" once the city is set in
  site.config.ts, and disappears until then.

  Images: leave `src` empty to show a labelled grey placeholder. When the
  photos arrive, drop them in /public/images/before-after/ and fill in src.

  FAQ items with `draft: true` are hidden from the page and the schema until
  the answer is confirmed with Jennifer.
*/

import { ig } from "./instagram";

export type Photo = { src: string; label: string; alt: string; width?: number; height?: number };
export type FaqItem = { q: string; a: string; draft?: boolean };

export type Service = {
  slug: string;
  name: string; // card / row name
  h1: string; // detail page H1, city is appended automatically
  metaTitle: string; // city is appended automatically
  metaDescription: string;
  short: string;
  body: string[]; // intro paragraphs (first one carries the local keyword)
  expect: string[]; // "What to expect"
  forWho: string[]; // "Who it's for" bullets
  duration?: string; // shown only if site.showPrices
  price?: string; // shown only if site.showPrices
  image: Photo;
  beforeAfter?: { before: Photo; after: Photo; alt: string }[];
  faq?: FaqItem[];
  related: string[]; // slugs
};

const ph = (label: string, alt: string): Photo => ({ src: "", label, alt, width: 800, height: 1000 });

export const services: Service[] = [
  {
    slug: "hair-color",
    name: "Hair Color",
    h1: "Hair Color",
    metaTitle: "Hair Colorist",
    metaDescription:
      "Custom hair color by Jennifer Bauduin, a hair designer with 35 years of experience. Grey coverage, shade changes and color that grows out beautifully.",
    short: "Custom color built around your skin tone, your natural shade and the way you actually live.",
    body: [
      "Color is where Jennifer comes alive. After 35 years behind the chair, it is still her favorite part of the job: finding the shade that brightens your skin, clears up your eyes and looks like your hair grew that way. Every color service at Beauty JB{inCity} starts with your natural hair, not a swatch book.",
      "Whether you want to cover grey, warm up, cool down, go richer or go bolder, the formula is built for you and only you. The goal is color that looks deliberate on day one and still looks good weeks later, as it grows out.",
    ],
    expect: [
      "Color follows the same four-step Beauty JB experience as every appointment. It starts with a real conversation: what you do for work, how much time you spend on your hair in the morning, what you love and don't love about your current color, and anything you're working toward.",
      "From there, Jennifer lays out the plan, including how close you can get to a reference photo and how many visits it might take to get there. If you're adding a cut, it's done dry so she can see how the new color and shape work together. Then a shampoo and blow-dry, and you're on your way.",
      "Color, highlights and a cut together take about 1 hour 45 minutes. That's 35 years of experience at work, not shortcuts.",
    ],
    forWho: [
      "Grey coverage that looks soft, not flat",
      "A change of shade, subtle or dramatic",
      "Refreshing color that has faded or turned brassy",
      "Anyone who wants color that grows out gracefully",
    ],
    image: ig.copperRedColor,
    beforeAfter: [
      {
        before: ph("BEFORE: Color client", "Client hair before a custom color service"),
        after: ph("AFTER: Color client", "Client hair after a custom color service by Beauty JB"),
        alt: "Hair color before and after",
      },
    ],
    faq: [
      {
        q: "How long does a color appointment take?",
        a: "Color, highlights and a cut together take about 1 hour 45 minutes. We'll give you a time estimate for your exact service at your consultation.",
      },
      {
        q: "Do I need a consultation first?",
        a: "New clients start with a consultation, so we can talk about your hair history, your routine and your goals before anything is mixed.",
      },
      {
        q: "Can you match a photo I found?",
        a: "Bring it. We'll talk honestly about how close we can get with your hair, and what it will take to get there.",
      },
    ],
    related: ["highlights-lowlights", "haircuts"],
  },
  {
    slug: "highlights-lowlights",
    name: "Highlights & Lowlights",
    h1: "Highlights & Lowlights",
    metaTitle: "Highlights & Lowlights",
    metaDescription:
      "Natural-looking highlights and lowlights placed for your face, part and routine. Dimension, brightness and soft grey blending from Beauty JB.",
    short: "Dimension that looks natural: brightness where the light hits, depth where you want it.",
    body: [
      "Highlights and lowlights are how Jennifer brings natural hair to life{inCity}. Placed well, they add movement and brightness that make a cut look better and color look richer, without ever looking overdone.",
      "Highlights lift pieces lighter to catch the light around your face and through the ends. Lowlights do the opposite, weaving deeper tones back in so blonde doesn't go flat and grey blends softly. Most people look best with a little of both.",
    ],
    expect: [
      "Placement is everything, and it's personal. At your consultation, Jennifer looks at your part, how you wear your hair most days, your face shape and your natural color before deciding where each piece goes.",
      "You'll leave knowing the plan: how much contrast to aim for, how it will grow out and when it makes sense to come back. Highlights pair naturally with a dry cut, so the shape and the dimension are designed together, and every visit finishes with a shampoo and blow-dry.",
      "Color, highlights and a cut together take about 1 hour 45 minutes.",
    ],
    forWho: [
      "Blending grey without a hard line of regrowth",
      "Adding brightness around the face",
      "Bringing depth back to over-lightened hair",
      "Low-maintenance dimension between visits",
    ],
    image: ig.brunetteToBlondeBalayage,
    beforeAfter: [
      {
        before: ph("BEFORE: Highlights client", "Client hair before highlights and lowlights"),
        after: ph("AFTER: Highlights client", "Client hair after highlights and lowlights by Beauty JB"),
        alt: "Highlights and lowlights before and after",
      },
    ],
    faq: [
      {
        q: "Highlights or lowlights: which do I need?",
        a: "It depends on where you're starting and where you want to go. Highlights brighten, lowlights add depth, and most clients get a blend of both. We'll decide together at your consultation.",
      },
      {
        q: "How often will I need to come back?",
        a: "That depends on your natural color, how much contrast you want and how fast your hair grows. We'll plan a schedule that fits your life.",
      },
      {
        q: "How long do color, highlights and a cut take?",
        a: "About 1 hour 45 minutes. Your time is yours, so we don't waste any of it.",
      },
    ],
    related: ["hair-color", "haircuts"],
  },
  {
    slug: "haircuts",
    name: "Razor & Texture Cuts",
    h1: "Razor & Texture Haircuts",
    metaTitle: "Razor & Texture Cuts",
    metaDescription:
      "Dry haircuts designed for your face shape. Razor and texture cutting by Jennifer Bauduin, so your hair falls right every day, not just the day you leave.",
    short: "Razor and texture cuts designed for your face shape, cut dry so they fall right.",
    body: [
      "Cut dry, so it falls right. Jennifer cuts hair dry, which means she sees exactly how your hair falls, moves and lives day to day, including cowlicks, curl pattern and the way it sits after you style it yourself. It's the core of every haircut at Beauty JB{inCity}.",
      "Every cut is designed around your face shape and your personality. Razor cutting softens edges and builds movement through the lengths; texture cutting removes bulk and shapes how your hair wants to sit. Most cuts use a blend of both.",
    ],
    expect: [
      "Your cut starts with the consultation: how you wear your hair, how long you spend styling it and what you'd change if you could. Then the plan, so you know what you're getting before the first snip.",
      "The cut itself is done dry, section by section, so nothing is a surprise once your hair dries. Then a shampoo and blow-dry to finish. If you're adding color or highlights, the whole visit takes about 1 hour 45 minutes.",
    ],
    forWho: [
      "Thick hair that needs bulk taken out",
      "Fine hair that needs movement and shape",
      "Wavy and curly hair that should be cut the way it actually lives",
      "Anyone ready for a change, or a better version of what they have",
    ],
    image: ig.angledBob,
    beforeAfter: [
      {
        before: ph("BEFORE: Cut client", "Client hair before a razor and texture cut"),
        after: ph("AFTER: Cut client", "Client hair after a dry razor and texture cut by Beauty JB"),
        alt: "Razor cut before and after",
      },
    ],
    faq: [
      {
        q: "Why do you cut hair dry?",
        a: "Because that's how you wear it. Cutting dry shows exactly how your hair falls and moves, so the shape you see in the chair is the shape you get at home.",
      },
      {
        q: "Do I still get a shampoo?",
        a: "Yes. After the cut, every appointment finishes with a shampoo and blow-dry.",
      },
      {
        q: "How should I wear my hair to the appointment?",
        a: "TODO: confirm with Jennifer (clean and dry? styled as usual?).",
        draft: true,
      },
    ],
    related: ["hair-color", "highlights-lowlights"],
  },
  {
    slug: "brazilian-straightening",
    name: "Brazilian Straightening",
    h1: "Brazilian Straightening",
    metaTitle: "Brazilian Straightening",
    metaDescription:
      "Brazilian straightening for smoother, shinier, more manageable hair. Less frizz and faster styling, tailored to your hair by Jennifer Bauduin.",
    short: "Smoother, shinier, more manageable hair, with less frizz and less time with a blow-dryer.",
    body: [
      "A Brazilian straightening treatment smooths your hair so it frizzes less, shines more and styles faster. For clients of Beauty JB{inCity} who spend their mornings fighting their hair, it can give that time back.",
      "It isn't about making everyone's hair poker-straight. Depending on your hair and your goals, it can soften curl, tame frizz or simply make your hair easier to manage every day.",
    ],
    expect: [
      "As always, it starts with a consultation. Jennifer looks at your hair's condition, your color history and how you style it, and tells you honestly what the treatment can do for you.",
      "If it's the right fit, you'll get a plan and a clear picture of the result before you commit. Aftercare matters with any smoothing treatment, so you'll leave knowing exactly how to look after it at home.",
    ],
    forWho: [
      "Frizzy hair that won't stay smooth",
      "Thick hair that takes forever to blow-dry",
      "Curls you'd like to soften, not erase",
      "Anyone who wants an easier morning routine",
    ],
    image: ig.sleekBlondeStraight,
    beforeAfter: [
      {
        before: ph("BEFORE: Straightening client", "Frizzy hair before Brazilian straightening"),
        after: ph("AFTER: Straightening client", "Smooth hair after Brazilian straightening by Beauty JB"),
        alt: "Brazilian straightening before and after",
      },
    ],
    faq: [
      {
        q: "Will it make my hair completely straight?",
        a: "Not necessarily, and it doesn't have to. We'll talk about the result you want and what your hair can realistically do.",
      },
      {
        q: "How long do the results last?",
        a: "TODO: confirm typical longevity with Jennifer.",
        draft: true,
      },
      {
        q: "Can I color my hair as well?",
        a: "TODO: confirm color + straightening timing with Jennifer.",
        draft: true,
      },
    ],
    related: ["haircuts", "hair-color"],
  },
];

export function getService(slug: string) {
  return services.find((s) => s.slug === slug);
}
