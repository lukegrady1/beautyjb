# Beauty JB — Website Design & Build Spec

> **For Claude Code.** Build a multi-page, SEO-optimized marketing site for **Beauty JB** (beautyjb.com), hair designer Jennifer Bauduin. This is a sister site to steviecainhaircare.com (same agency, same build quality, same structural DNA), but it has its own personality: **bold, modern, editorial. White, deep wine red, and gold. Not tacky.**
>
> Agency: Grady Digital · Target launch: **before Nov 26, 2026** · Several content items are still pending, so **everything client-specific lives in one config file** (see §3).

---

## 0. Ground rules

1. **No invented facts.** Do not make up prices, reviews, testimonials, addresses, phone numbers, hours, awards or press. Anything unknown is a `TODO` placeholder in `site.config.ts`. A section whose data is empty (reviews, press, pricing) **hides itself** rather than showing fake content.
2. **Palette must be swappable in one place.** The logo and final colors are still being chosen. All colors are CSS custom properties; no hex codes inside components.
3. **Mobile first.** Jennifer only uses her phone, and so do most of her clients. Design and QA at 390px first, then scale up.
4. **"Bold and modern, not tacky."** Gold is used as a *hairline accent*, never as a big fill, gradient, glitter or texture. Red is trim and emphasis, not wallpaper. White does most of the work.
5. Don't call wedding packages a "collection" anywhere (client request).

---

## 1. Tech stack (match the Stevie build)

- **Next.js (App Router) + TypeScript**, static generation for every page (`output: 'export'`-compatible unless a form route needs a server action; prefer a third-party form endpoint so it stays fully static).
- **Tailwind CSS** with theme tokens mapped to CSS variables.
- `next/font` for self-hosted Google Fonts (no layout shift).
- `next/image` for every image (AVIF/WebP, `sizes` set correctly, `priority` only on the hero image).
- `lucide-react` for icons (1.5px stroke).
- `framer-motion` *optional*, used only for subtle reveals; respect `prefers-reduced-motion`.
- Deploy: Vercel. Domain: beautyjb.com (GoDaddy DNS). Canonical host: `https://beautyjb.com` (redirect `www` → apex).

---

## 2. Relationship to the Stevie site: what to keep vs. change

Reference: steviecainhaircare.com. It uses Manrope throughout, a warm cream background (`#F2EDE4` / `#FAF8F3`), sage green accents (`#6B7A5E` / `#55634A`), 24px rounded cards with a soft shadow, pill-shaped buttons, 12px tracked uppercase eyebrows, 96px section padding, a two-column hero (text left, rounded photo right) with a star-rating chip, phone and "Book Now" pills in the header, and a sage footer.

**Keep (shared agency DNA):**
- Overall page architecture and section rhythm: eyebrow → big headline → short paragraph → content → text link with arrow.
- Sticky translucent header: logo left, nav center, phone pill + primary pill CTA right.
- Two-column hero with a framed photo on the right.
- Small uppercase tracked eyebrows above every H2.
- Feature cards in a row of three under the About intro.
- 96px desktop / 64px mobile vertical section padding; ~1200px content width.
- Same JSON-LD/SEO approach and the same page-per-topic structure.

**Change (Beauty JB's own personality):**

| | Stevie | Beauty JB |
|---|---|---|
| Mood | Warm, friendly, laid-back ("Good Hair for All Y'all!") | Confident, editorial, refined: "an artist with 35 years in the chair" |
| Base | Warm cream | **Crisp white** with a cool off-white alternate |
| Accent | Sage green | **Deep wine red** + **gold** hairlines (silver as a secondary metallic) |
| Type | One sans (Manrope) | **High-contrast display serif** for headlines + clean sans for body |
| Corners | Soft 24px everywhere | **Sharper**: 4px on cards/images, plus one signature arched image frame. Buttons stay pills |
| Shadows | Soft drop shadows | **Almost none.** Separation comes from hairline borders and whitespace |
| Dark moments | Sage footer only | **Near-black "ink" sections** (the Experience band and the footer) for drama |
| Signature details | Star chip, icon circles | **The "red trim" line**, gold hairline rules, an oversized **"35"** numeral, numbered process steps |

---

## 3. Content config: single source of truth

Create `src/content/site.config.ts`. Every page reads from it. Fill in what's known and leave the rest as `TODO` strings or empty arrays. Components must handle empty values gracefully.

```ts
export const site = {
  name: "Beauty JB",                      // TODO: confirm "Beauty JB" vs "Beauty by JB"
  legalName: "Beauty JB",
  owner: "Jennifer Bauduin",
  title: "Hair Designer",
  yearsExperience: 35,
  domain: "https://beautyjb.com",
  email: "TODO",                           // public booking email (don't use her personal Gmail without approval)
  phone: "TODO",                           // display + tel: link
  address: { street: "TODO", city: "TODO", region: "TODO", postal: "TODO", country: "US" },
  serviceArea: ["TODO city", "TODO nearby town"],  // used for local SEO copy + schema areaServed
  geo: { lat: null, lng: null },
  hours: [],                               // [{ day: "Tuesday", open: "09:00", close: "17:00" }]; hidden if empty
  booking: { type: "form", url: "" },      // "form" | "external" (Vagaro/Square/etc.); TODO: booking method
  social: { instagram: "", facebook: "", googleBusiness: "", theKnot: "" },
  partner: { name: "David", note: "Flies in every two weeks to work in the studio" },
  reviews: [],                             // real reviews only; section hidden when empty
  press: [],                               // e.g. The Knot feature, added if/when it happens
  showPrices: false,                       // TODO: confirm with Keegan before showing any prices
};
```

Also create `src/content/services.ts`, `src/content/weddings.ts`, and `src/content/faq.ts` (structures in §7).

---

## 4. Visual system

### 4.1 Color tokens (`globals.css`)

```css
:root {
  /* Base */
  --bg:            #FFFFFF;   /* primary background */
  --bg-alt:        #F7F6F4;   /* alternate section bg, cool off-white */
  --ink:           #141214;   /* text + dark sections */
  --ink-soft:      #5A5558;   /* body copy, secondary text */
  --line:          #E7E3E0;   /* hairline borders */

  /* Accent: deep wine (Keegan's preferred direction) */
  --accent:        #6E1423;   /* primary buttons, trim line, links */
  --accent-hover:  #561019;
  --accent-tint:   #F6ECEE;   /* very light wine wash for chips/badges */

  /* Metallics: hairlines, small icons, numerals only */
  --gold:          #B8975A;
  --gold-soft:     #D9C49A;
  --silver:        #A7A9AC;

  --on-accent:     #FFFFFF;
  --on-ink:        #F4F1EE;
}

/* Backup palette (client's 2nd option). Enable by adding data-theme="blue" on <html> */
[data-theme="blue"] {
  --accent:       #1B2A4A;
  --accent-hover: #121D36;
  --accent-tint:  #ECEFF5;
}
```

Usage rules:
- Body text `--ink-soft` on white; headings `--ink`.
- `--accent` is for: primary buttons, the trim line, active nav underline, link hover, italic emphasis words in headlines, step numbers.
- `--gold` is for: 1px hairline rules, the "35" numeral outline, small icons on dark sections, the thin border on the arched hero frame. **Never** for body text on white (fails contrast) or large fills.
- `--silver` is only a secondary hairline on dark sections, so both metallics she likes appear without competing.
- All text/background combos must pass **WCAG AA**.

### 4.2 Typography

- **Display / headings:** `Bodoni Moda` (Google Fonts, variable). High-contrast editorial serif that reads "fashion/salon," clearly different from Stevie's all-sans look. Weights 500–700. Use italic for one or two emphasis words per headline, colored `--accent`.
- **Body / UI:** `Manrope` (keeps the agency family resemblance with Stevie). 400 / 500 / 600.
- **Eyebrows:** Manrope 600, 12px, `letter-spacing: 0.2em`, uppercase, color `--accent`, preceded by a 24px gold hairline (`—— ABOUT JENNIFER`).

| Token | Desktop | Mobile | Font |
|---|---|---|---|
| H1 | 72px / 1.02, -0.02em | 44px | Bodoni Moda 600 |
| H2 | 52px / 1.08 | 34px | Bodoni Moda 500 |
| H3 | 24px / 1.25 | 20px | Bodoni Moda 600 |
| Lead | 20px / 1.6 | 18px | Manrope 400 |
| Body | 17px / 1.7 | 16px | Manrope 400 |
| Small / meta | 14px | 14px | Manrope 500 |
| Button | 15px, 600, 0.02em | same | Manrope |

If Bodoni Moda looks too thin at small sizes on phones, fall back to `Playfair Display` for H3 only. Test on a real phone.

### 4.3 Shape, spacing, depth

- Radius: `--r-sm: 4px` (cards, images, inputs), `--r-pill: 999px` (buttons, chips). One **arch** frame (`border-radius: 999px 999px 4px 4px`) used for the hero portrait and the Weddings hero. This is Beauty JB's signature shape.
- Shadows: none by default. Cards use `1px solid var(--line)`. On hover, the border turns `--gold` and the card lifts 2px. That's the only motion.
- Container: `max-width: 1200px`, padding-x 24px (mobile) / 32px (desktop).
- Section padding: 112px desktop / 72px mobile, slightly more air than Stevie for a more luxurious feel.
- Grid: 12 columns, 24px gutters.

### 4.4 Signature elements (these give it personality)

1. **The Red Trim.** A 4px `--accent` bar fixed to the very top of every page, above the header. It's a direct nod to "red trim" in the brief. Repeat it as a short 64px bar under section H2s on dark sections.
2. **Gold hairlines.** 1px `--gold` rules used as section dividers (a short centered 80px rule between sections) and in eyebrows.
3. **The "35."** On the About section and the About page: an oversized outlined numeral "35" (Bodoni Moda, ~220px, `-webkit-text-stroke: 1px var(--gold)`, transparent fill) sitting behind/next to the copy, with the caption "years behind the chair."
4. **Numbered experience steps.** 01 / 02 / 03 / 04 in Bodoni italic, `--accent`, on an ink background.
5. **Before / after slider** on Services (draggable divider, keyboard accessible, with a gold handle).
6. **Pull quote** of her brand line in large italic Bodoni, with oversized gold quotation marks.

### 4.5 Buttons & links

- **Primary:** pill, `--accent` bg, white text, 14px 28px padding. Hover → `--accent-hover`, arrow nudges 3px right.
- **Secondary:** pill, transparent, 1px `--ink` border, ink text. On dark sections: 1px `--gold` border, `--on-ink` text.
- **Text link:** Manrope 600, ink, with an arrow icon. Underline grows from the left in `--accent` on hover.
- Focus state: 2px `--gold` outline, 3px offset. Must be visible everywhere.

### 4.6 Imagery

- Photos come from Jennifer's Google Drive (studio, Jennifer, before/afters, updos, curls). Until they arrive, use neutral grey placeholder blocks with the intended subject written on them (e.g. "PHOTO: Jennifer portrait"). **No stock photos of models.**
- Put all images in `/public/images/{hero,about,studio,before-after,weddings}/`, named descriptively (`jennifer-bauduin-hair-designer.jpg`, `bridal-updo-curls-01.jpg`). File names help SEO.
- Treatment: true color, no filters. Optional: a slight warm grade so studio shots and client photos feel consistent.
- Every image gets real, descriptive alt text (see §8).

### 4.7 Motion

Subtle and quick: fade-up 12px over 400ms on scroll-into-view (once), staggered 60ms for card rows. No parallax, no autoplaying carousels. Disable all of it under `prefers-reduced-motion`.

---

## 5. Global layout

### Header (sticky)
- 4px red trim bar at the very top.
- White at 92% opacity with backdrop blur; 1px `--line` bottom border appears after scrolling 8px.
- Left: logo (placeholder: "Beauty JB" wordmark in Bodoni Moda 600 with "JB" in `--accent`. The logo is a swappable SVG component `<Logo />`).
- Center nav: **About · Experience · Services · Weddings · Gallery · Contact**. Active page gets a 2px `--accent` underline.
- Right: phone pill (hidden if `phone` is TODO) + **Book a Consultation** primary pill.
- Mobile: logo + hamburger. Full-screen white menu with Bodoni nav items at 32px, gold hairline dividers, Book CTA pinned at the bottom.
- **Mobile sticky bottom bar** (≤768px, appears after scrolling past the hero): two equal buttons, "Call" and "Book". This matters because her clients are on phones.

### Footer (ink background `--ink`)
- Red trim bar on top.
- Four columns (stacks on mobile): (1) logo + one-line brand statement, (2) Visit: address, hours, map link, (3) Explore: page links, (4) Connect: phone, email, Instagram/Facebook, Google review link.
- Gold hairline, then a bottom row: `© 2026 Beauty JB · Privacy · Terms · Site by Grady Digital` (link to gradydigital.com).
- Above the footer on every page except Contact: a **CTA band**: white bg, centered Bodoni H2 "Your chair is waiting.", one sentence, Book + Weddings buttons.

---

## 6. Sitemap & page specs

```
/                     Home
/about/               About Jennifer
/experience/          The Beauty JB Experience
/services/            Hair Services (index)
/services/hair-color/         ← service detail pages (SEO landing pages)
/services/highlights-lowlights/
/services/haircuts/           (razor & texture cuts, dry cutting)
/services/brazilian-straightening/
/weddings/            Bridal & Wedding Hair
/gallery/             Gallery (filterable)
/contact/             Book & Contact
/privacy/  /terms/
404
```

The service detail pages exist for local SEO: each targets one search intent ("hair color [city]", etc.). They share one template.

---

### 6.1 Home `/`

**SEO title:** `Beauty JB | Hair Color, Cuts & Bridal Hair in {City}, {State}`
**Meta description:** `Hair designer Jennifer Bauduin brings 35 years of artistry to color, highlights, razor and texture cuts, and wedding hair in {City}. Book your consultation.`

Sections in order:

1. **Hero** (white). Two columns, 7/5 split.
   - Left: eyebrow `HAIR DESIGNER · {CITY}` → **H1:** "Hair color, cuts & bridal hair in {City}" (keeps the city keyword in the H1 like Stevie's). Below the H1, in large Bodoni italic `--accent`: *"We choose our clients as much as they choose us."* → lead: "35 years of artistry, a studio that runs on your time, and an experience you'll want to come back to." → buttons: **Book a Consultation** (primary) + **Wedding Hair** (secondary) → meta line in small text: "Color, highlights & cut in about 1 hr 45 min · Dry cutting specialist".
   - Right: **arched** photo frame (studio or Jennifer) with a 1px gold border offset 12px behind it (a double-frame effect). Small floating chip on the image's lower-left: "35 years behind the chair."
   - Mobile: image first (shorter, 4:5), then text.
2. **Brand statement band** (`--bg-alt`). Centered pull quote, large italic Bodoni: *"In a sea of salons, why do they pick us?"* Below it, three short answers in a row, separated by gold vertical hairlines: **35 years of artistry** · **Cuts designed for your face** · **Your time, respected**.
3. **About teaser** (white). Left: Jennifer portrait (4px radius, 4:5). Right: eyebrow `MEET JENNIFER` → H2 "Hair is my *artistry* and my passion." → 2 short paragraphs (about §3 of the brief) → the outlined **"35"** numeral sits behind the copy → three feature cards (Stevie-style row of three, restyled with hairline borders and gold icons): *Color is my favorite* / *Cut for your face shape* / *Natural beauty, enhanced* → text link "More about Jennifer →".
4. **Experience preview** (**ink** background, the dramatic moment). Eyebrow (gold) `THE EXPERIENCE` → H2 (on-ink) "Four steps. *No* wasted time." → four numbered columns 01–04 (Consultation, Plan, Dry Cut, Finish) with one line each → a highlighted stat: "**~1 hr 45 min** for color, highlights & cut" in Bodoni with a gold rule above → text link "See how it works →".
5. **Services preview** (white). Eyebrow `SERVICES` → H2 "Color, cuts & everything in between." → 4 service cards in a 2×2 grid (desktop 4-across): Hair Color (tag: "Her favorite"), Highlights & Lowlights, Razor & Texture Cuts, Brazilian Straightening. Each card: image (before/after crop), H3, one line, "Learn more →". Below: "Don't see it? Ask during your consultation." + link to /services/.
6. **Weddings feature** (`--accent-tint` bg, or a full-bleed updo photo with a dark overlay). Split layout: big arched updo photo + eyebrow `WEDDINGS` → H2 "Bridal hair for the *whole* party." → "Updos, blowouts and makeup, in the studio or at your venue." → **Plan Your Wedding Hair** button.
7. **Gallery strip** (white). Eyebrow `RECENT WORK` → H2 "From the chair." → 6-image grid (2 rows of 3 desktop, horizontal scroll-snap on mobile) → "See the full gallery →".
8. **Reviews** (`--bg-alt`), **rendered only if `site.reviews.length > 0`**. Large single-quote layout with gold quotation marks, name, star row in gold. Link to leave a Google review.
9. **Visit / location** (white). Address, hours, map embed (lazy-loaded via facade: static image that loads the iframe on click), "Get Directions" button. Hidden pieces if data is TODO.
10. Global CTA band → Footer.

---

### 6.2 About `/about/`

**Title:** `About Jennifer Bauduin | Hair Designer in {City} | Beauty JB`

1. Page hero: eyebrow `ABOUT` → H1 "Meet Jennifer Bauduin, hair designer." → lead → arched portrait.
2. **Story** (two columns): the giant outlined "35" + caption on the left; story copy on the right, written in first person, warm and confident. Content points: 35 years in the industry; calls it artistry and passion; loves color: highlights, lowlights, enhancing natural hair; customizes cuts to face shape and personality; loves changing looks and making people feel good.
3. **Philosophy pull quote**: "We choose our clients as much as they choose us. In a sea of salons, why do they pick us?" Then a short paragraph: she wants new clients to feel like they know her before they sit in the chair; their time is theirs, and the whole experience is what they take away.
4. **What she loves** (3 cards): Color · Face-shape cuts · Transformations.
5. **Meet David**: small section with a photo placeholder: "Jennifer's partner David flies in every two weeks to work alongside her in the studio." Ask how to book with David → Contact.
6. **The studio**: 2–3 studio photos in an asymmetric grid. "Bold and modern, like the work."
7. CTA band.

Schema: `Person` (Jennifer, jobTitle "Hair Designer", worksFor → the salon `@id`) + `BreadcrumbList`.

---

### 6.3 Experience `/experience/`

**Title:** `The Beauty JB Experience | Dry Cutting & Efficient Color in {City}`

1. Hero (ink bg, red trim): H1 "The Beauty JB experience." Lead: "Your time is yours. Here's how we spend it."
2. **The four steps**: vertical timeline on mobile, alternating left/right image rows on desktop. Big Bodoni italic numerals in `--accent` (on white) with gold connector hairlines:
   - **01 Consultation**: what you do for work, your morning routine, what you love and don't love about your hair, future goals, any photo or event you're working toward.
   - **02 The Plan**: how we'll get there, or how close we can get to your reference photo.
   - **03 The Dry Cut**: Jennifer cuts hair dry, so she sees how your hair actually falls, moves and lives day to day. (Call this out as a differentiator; give it a highlighted card with a gold border.)
   - **04 The Finish**: shampoo and blow-dry, and you're on your way.
3. **Speed stat band**: "About **1 hr 45 min** for color, highlights and a cut." Supporting line: "That's 35 years of experience at work. No wasted time, no shortcuts."
4. **Why dry cutting?** A short explainer (3 bullet benefits). Good for long-tail SEO ("dry haircut {city}").
5. FAQ accordion (5–6 questions, from `faq.ts`, with `FAQPage` schema).
6. CTA band.

---

### 6.4 Services `/services/`

**Title:** `Hair Services in {City}: Color, Highlights, Razor Cuts | Beauty JB`

1. Hero: eyebrow `SERVICES` → H1 "Hair services" → lead: "A focused menu of what Jennifer does best. Anything else, we'll talk about in your consultation."
2. **Service list**: editorial rows (not price-table cards). Each row: H3, 1–2 lines, optional duration, price **only if `showPrices`** (otherwise "Pricing at consultation"), "Learn more →" to the detail page, gold hairline between rows.
   - **Hair Color**, with a "Jennifer's favorite" chip (`--accent-tint` bg, `--accent` text)
   - **Highlights & Lowlights**
   - **Haircuts**, featuring **razor cuts** and **texture cuts**, all cut dry
   - **Brazilian Straightening**
   - *Perms: do not list* (offered but rare; it can come up in consultation).
3. **Before & after**: interactive slider component, 3–4 pairs, tabbed by service.
4. "Not sure what you need?" band → Book a Consultation.
5. FAQ (service-related) + CTA band.

**Service detail template** (`/services/[slug]/`): hero with the service name + city in the H1 ("Hair Color in {City}"), intro, "What to expect" (ties into the 4-step process), who it's for, before/after pair, related services, FAQ (2–4 Qs), Book CTA. Schema: `Service` with `provider` → salon `@id`, `areaServed`, plus `BreadcrumbList`. 300–600 words of real, specific copy per page; no keyword stuffing.

---

### 6.5 Weddings `/weddings/`

**Title:** `Bridal & Wedding Hair in {City}: Updos, Makeup, On-Site | Beauty JB`

This page can feel a touch softer and more romantic, while staying in the same system: more white space, more photography, the arch shape used more.

1. **Hero**: full-width arched updo photo, H1 "Wedding hair & makeup in {City}", lead "Updos, blowouts and makeup for the bride and her party, in the studio or at your venue." → **Start Planning** (scrolls to the inquiry form).
2. **Services**: three cards: **Updos** · **Blowouts** · **Makeup**. "Priced per service." Prices from `weddings.ts`, hidden until provided.
3. **Where**: two side-by-side panels: **In the Studio** / **At Your Venue** ("We come to the church or venue; travel fee applies").
4. **Packages**: 2–3 package cards, built now with placeholder content. **Do not use the word "collection."** Use the section label **"Wedding Day Packages"** and these placeholder tier names (all editable in `weddings.ts`): **"The Bride"**, **"The Bridal Party"** (e.g. bride + 6 bridesmaids in one day), **"The Full Day"** (party + on-site + refreshments). Each card shows: what's included, party size, location, an optional "refreshments included" badge, and price-or-"Inquire".
5. **Updo & curl gallery**: masonry grid with a lightbox. All updo and curl photos go here.
6. **Press slot**: renders only if `site.press` has entries (reserved for a possible The Knot feature, with a "As featured in The Knot" badge row).
7. **Wedding inquiry form** (§6.7 fields + wedding date, venue/location, in-studio vs on-site, party size, services wanted [checkboxes], notes).
8. Wedding FAQ (booking lead time, trials, travel, deposits: placeholders) with `FAQPage` schema.

---

### 6.6 Gallery `/gallery/`

- H1 "Gallery" + filter chips: All · Color · Cuts · Before & After · Weddings.
- Masonry/grid with a lightbox (keyboard + swipe, focus trapped, Esc closes).
- Images lazy-loaded, data from `src/content/gallery.ts` (`{ src, alt, category, width, height }`).

---

### 6.7 Contact / Book `/contact/`

**Title:** `Book an Appointment | Beauty JB Hair Designer in {City}`

- Two columns: **form** left, **studio details** right (address, map facade, hours, phone, email, "New clients start with a consultation").
- If `booking.type === "external"`, the primary CTA site-wide links to the external booking URL and this page also embeds/links it. Otherwise, use the form.
- **Form fields:** name, phone (preferred, since she texts), email, "I'm interested in" (select: Color, Highlights/Lowlights, Cut, Brazilian Straightening, Wedding, Other), new or returning client, preferred days/times, message, an optional "photo link or inspiration" field. Honeypot field for spam; no CAPTCHA.
- Submission: post to a form endpoint set in env (`NEXT_PUBLIC_FORM_ENDPOINT`, e.g. Formspree or a GoHighLevel webhook). Show inline success/error states. Labels always visible (not placeholder-only).
- Success message: "Thank you! Jennifer will reach out soon to set up your consultation."

### 6.8 Privacy, Terms, 404
- Simple text pages in the same type system.
- 404: Bodoni "Oops, this page got a little *too* much off the top." + links home and to Book.

---

## 7. Content data shapes

```ts
// services.ts
export type Service = {
  slug: string; name: string; short: string; body: string[];
  highlight?: string;            // "Jennifer's favorite"
  duration?: string; price?: string;   // shown only if site.showPrices
  beforeAfter?: { before: string; after: string; alt: string }[];
  faq?: { q: string; a: string }[];
};

// weddings.ts
export const weddings = {
  packagesLabel: "Wedding Day Packages",   // never "collection"
  services: [{ name: "Updo", price: "" }, { name: "Blowout", price: "" }, { name: "Makeup", price: "" }],
  packages: [
    { name: "The Bride", includes: ["TODO"], partySize: "1", location: "Studio or on-site", price: "", refreshments: false },
    { name: "The Bridal Party", includes: ["TODO"], partySize: "Bride + up to 6", location: "Studio or on-site", price: "", refreshments: true },
    { name: "The Full Day", includes: ["TODO"], partySize: "TODO", location: "On-site", price: "", refreshments: true },
  ],
  travelNote: "Travel fee applies for venue visits.",   // TODO confirm
};
```

---

## 8. SEO requirements (do all of these)

**Technical**
- `generateMetadata` on every page: unique `title` (≤60 chars) and `description` (≤155 chars), `alternates.canonical`, Open Graph + Twitter cards. Title template: `%s | Beauty JB`.
- Auto-generated OG images per page (`opengraph-image.tsx`): white background, red trim bar, Bodoni page title, gold hairline, "beautyjb.com".
- `app/sitemap.ts` (all routes incl. service detail pages) and `app/robots.ts` (allow all, link the sitemap).
- Trailing slashes consistent (`trailingSlash: true` like Stevie).
- Exactly one H1 per page; logical H2/H3 order.
- Semantic HTML: `header`, `nav`, `main`, `section` with `aria-labelledby`, `footer`, `address`.
- Breadcrumbs (visual + `BreadcrumbList` schema) on all inner pages.
- Internal linking: every service page links to the 4-step Experience page, related services, and Contact; Home links to every top-level page.
- Favicon set + `manifest.webmanifest` (theme color = `--accent`).

**Structured data (JSON-LD)**, built from `site.config.ts` so it updates automatically:
- Site-wide in the layout: `HairSalon` (`@id: https://beautyjb.com/#salon`) with name, url, logo, image, telephone, email, address, geo, `openingHoursSpecification`, `areaServed`, `priceRange` (omit until known), `sameAs` (socials), `founder` → Person. Omit any field that's still TODO; never output placeholder values into schema.
- `WebSite` on Home.
- `Person` on About.
- `Service` on each service detail page and Weddings (`serviceType: "Bridal hair and makeup"`).
- `FAQPage` on Experience, Services, Weddings, and service detail pages.
- `AggregateRating`/`Review` **only** when real reviews exist.

**On-page / local**
- City + service in H1s, titles and the first paragraph of key pages (Home, each service, Weddings), written naturally.
- Primary keyword targets (swap in the city once known): hair colorist {city}, highlights {city}, razor cut {city}, texture cut {city}, dry haircut {city}, Brazilian straightening {city}, bridal hair {city}, wedding updo {city}, on-site wedding hair and makeup {city}, hair salon near {nearby towns}.
- NAP (name, address, phone) identical in footer, Contact page and schema, matching the Google Business Profile exactly.
- Descriptive alt text: "Bridal updo with soft curls by Beauty JB in {City}", not "image1".

**Performance (Core Web Vitals targets: Lighthouse ≥ 95 on all four categories, mobile)**
- LCP < 2.0s: hero image `priority`, properly sized, AVIF/WebP.
- CLS < 0.05: explicit width/height on all images; fonts via `next/font` with `display: swap`.
- Ship minimal JS: server components by default; client components only for the menu, slider, lightbox, accordion and form.
- Map and any booking widget load behind a click/facade.

**Accessibility**
- WCAG 2.2 AA. Full keyboard support, visible focus, skip-to-content link, `aria-expanded` on menu/accordion, reduced-motion support, form errors announced with `aria-live`.

---

## 9. Copy voice

- **Beauty JB voice:** confident, warm, polished. Short sentences. First person from Jennifer on About; "we" elsewhere (she works with David). Elegant without being stiff. It should feel like a 35-year master, not a trendy startup.
- Lean on her own words: *artistry*, *passion*, *natural beauty*, *your time is yours*, *we choose our clients as much as they choose us*.
- Avoid: "elevate," "unleash," "luxurious experience," excessive exclamation points, emoji, and anything that sounds like a template.
- Contrast with Stevie: Stevie's site is casual and Southern-friendly ("Good Hair for All Y'all!", "Folks leave the chair happy"). Beauty JB is more editorial and assured.

Sample headlines to use:
- "Hair is my artistry and my passion."
- "Four steps. No wasted time."
- "Cut dry, so it falls right."
- "Color is where I come alive."
- "Bridal hair for the whole party."
- "Your chair is waiting."

---

## 10. Component checklist

`<TrimBar/>` · `<Header/>` · `<MobileMenu/>` · `<MobileActionBar/>` · `<Logo/>` · `<Eyebrow/>` · `<SectionHeading/>` · `<Button variant="primary|secondary|ghost"/>` · `<ArchFrame/>` · `<OutlineNumeral/>` · `<PullQuote/>` · `<FeatureCard/>` · `<ProcessSteps/>` · `<StatBand/>` · `<ServiceRow/>` · `<ServiceCard/>` · `<BeforeAfterSlider/>` · `<PackageCard/>` · `<GalleryGrid/>` · `<Lightbox/>` · `<Reviews/>` (null when empty) · `<PressRow/>` (null when empty) · `<FAQ/>` (+ schema) · `<MapFacade/>` · `<ContactForm/>` · `<WeddingInquiryForm/>` · `<CTABand/>` · `<Footer/>` · `<Breadcrumbs/>` · `<JsonLd/>` · `<PhotoPlaceholder label=""/>`

---

## 11. Build order

1. Scaffold Next.js + Tailwind + fonts + tokens + `site.config.ts`.
2. Global layout: TrimBar, Header, MobileMenu, MobileActionBar, Footer, CTABand.
3. Home page (all sections, placeholders for photos).
4. About, Experience, Services + service detail template, Weddings, Gallery, Contact, legal, 404.
5. SEO layer: metadata, JSON-LD, sitemap, robots, OG images, breadcrumbs.
6. Forms wired to env endpoint.
7. QA pass (below), then a **mobile screenshot set** of each page at 390px for texting to Jennifer (she reviews by phone screenshots, not staging links).

## 12. QA / definition of done

- [ ] Looks right at 360, 390, 768, 1024, 1440px.
- [ ] Lighthouse mobile ≥ 95 in Performance, Accessibility, Best Practices, SEO on Home, Services and Weddings.
- [ ] Schema validates in Google's Rich Results Test, with no placeholder/TODO values in the output.
- [ ] No fake reviews, prices, press or contact details anywhere.
- [ ] The word "collection" appears nowhere.
- [ ] Switching `data-theme="blue"` re-themes the whole site with no stray wine red.
- [ ] Empty-data sections (reviews, press, hours, prices) disappear cleanly.
- [ ] All forms submit, validate, and show success/error states.
- [ ] `grep -r TODO src/content` lists exactly the open items: business name, address/city, phone, public email, hours, booking method, prices, wedding package details, logo, final palette.

---

## 13. Open items (from the onboarding brief)

- Final business name: **Beauty JB** vs **Beauty by JB** (domain is beautyjb.com either way).
- Logo + final palette (Keegan sending options Mon 11/16). Wine red is the default; deep blue is the backup theme.
- Studio address, city and service area (needed for all local SEO). **Highest priority.**
- Service pricing (confirm with Keegan before showing any) and booking method.
- Wedding package details, pricing and the final package label.
- Real client reviews, and a Google Business Profile link.
- Photos from the Drive folder: studio, Jennifer, before/afters, updos/curls.