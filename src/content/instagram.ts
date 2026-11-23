/*
  Client work from @jenniferbauduinsalon on Instagram (pulled Nov 2026).
  Hair results only: posts of Jennifer herself, flyers and lash/brow shots were left out.
  Files live in /public/images/work/.
*/
import type { Photo } from "./services";

export type WorkCategory = "color" | "cuts" | "weddings";
export type WorkPhoto = Photo & { width: number; height: number; category: WorkCategory };

const w = (slug: string, category: WorkCategory, alt: string, width: number, height: number): WorkPhoto => ({
  src: `/images/work/${slug}.webp`,
  label: alt,
  alt,
  width,
  height,
  category,
});

export const ig = {
  blondeFaceFramingColor: w("blonde-face-framing-color", "color", "Blonde face framing color by Beauty JB", 1200, 1500),
  brightBlondeCurls: w("bright-blonde-curls", "color", "Bright blonde curls by Beauty JB", 1200, 1500),
  auburnDimensionalColorBob: w("auburn-dimensional-color-bob", "color", "Auburn dimensional color bob by Beauty JB", 1200, 1200),
  blondeFaceFramingHighlights: w("blonde-face-framing-highlights", "color", "Blonde face framing highlights by Beauty JB", 1200, 1200),
  icyBlondeHighlights: w("icy-blonde-highlights", "color", "Icy blonde highlights by Beauty JB", 1200, 1200),
  goldenBlondeColor: w("golden-blonde-color", "color", "Golden blonde color by Beauty JB", 1200, 1200),
  ashHighlightsOnBob: w("ash-highlights-on-bob", "color", "Ash highlights on bob by Beauty JB", 1200, 1200),
  softBlondeHighlights: w("soft-blonde-highlights", "color", "Soft blonde highlights by Beauty JB", 1200, 1200),
  brightBlondeLongHair: w("bright-blonde-long-hair", "color", "Bright blonde long hair by Beauty JB", 1200, 1200),
  honeyBlondeLayers: w("honey-blonde-layers", "color", "Honey blonde layers by Beauty JB", 1200, 1200),
  brunetteToBlondeBalayage: w("brunette-to-blonde-balayage", "color", "Brunette to blonde balayage by Beauty JB", 1200, 1200),
  multiToneBlondeHighlights: w("multi-tone-blonde-highlights", "color", "Multi tone blonde highlights by Beauty JB", 1200, 1200),
  ashBlondeLongLayers: w("ash-blonde-long-layers", "color", "Ash blonde long layers by Beauty JB", 1200, 1200),
  creamyBlondeHighlights: w("creamy-blonde-highlights", "color", "Creamy blonde highlights by Beauty JB", 1200, 1200),
  blendedBlondeHighlights: w("blended-blonde-highlights", "color", "Blended blonde highlights by Beauty JB", 1200, 1200),
  blondeBlowout: w("blonde-blowout", "color", "Blonde blowout by Beauty JB", 1200, 1200),
  copperRedColor: w("copper-red-color", "color", "Copper red color by Beauty JB", 1200, 1200),
  pinkPeekabooColor: w("pink-peekaboo-color", "color", "Pink peekaboo color by Beauty JB", 720, 720),
  sleekBlondeStraight: w("sleek-blonde-straight", "color", "Sleek blonde straight by Beauty JB", 1200, 1200),
  sleekLongBlondeOmbre: w("sleek-long-blonde-ombre", "color", "Sleek long blonde ombre by Beauty JB", 1200, 1500),
  classicBobBackView: w("classic-bob-back-view", "cuts", "Classic bob back view by Beauty JB", 1200, 1200),
  chinLengthBob: w("chin-length-bob", "cuts", "Chin length bob by Beauty JB", 1200, 1200),
  layeredBobAshBlonde: w("layered-bob-ash-blonde", "cuts", "Layered bob ash blonde by Beauty JB", 1200, 1200),
  blondeBobCut: w("blonde-bob-cut", "cuts", "Blonde bob cut by Beauty JB", 1200, 1200),
  texturedLayeredCut: w("textured-layered-cut", "cuts", "Textured layered cut by Beauty JB", 1200, 1200),
  shoulderLengthLayeredCut: w("shoulder-length-layered-cut", "cuts", "Shoulder length layered cut by Beauty JB", 1200, 1200),
  shortLayeredCut: w("short-layered-cut", "cuts", "Short layered cut by Beauty JB", 1200, 1200),
  angledBob: w("angled-bob", "cuts", "Angled bob by Beauty JB", 1200, 1200),
  bluntBob: w("blunt-bob", "cuts", "Blunt bob by Beauty JB", 1200, 1200),
  longLayeredCut: w("long-layered-cut", "cuts", "Long layered cut by Beauty JB", 1200, 1200),
  stackedBob: w("stacked-bob", "cuts", "Stacked bob by Beauty JB", 1200, 1200),
  shortTexturedPixie: w("short-textured-pixie", "cuts", "Short textured pixie by Beauty JB", 1200, 1200),
  brunetteLayeredCut: w("brunette-layered-cut", "cuts", "Brunette layered cut by Beauty JB", 1200, 1200),
  bluntBobBackView: w("blunt-bob-back-view", "cuts", "Blunt bob back view by Beauty JB", 1200, 1200),
  cascadingAuburnCurls: w("cascading-auburn-curls", "weddings", "Cascading auburn curls by Beauty JB", 733, 916),
  brunetteSpiralCurls: w("brunette-spiral-curls", "weddings", "Brunette spiral curls by Beauty JB", 1200, 1500),
  balayageSoftCurls: w("balayage-soft-curls", "weddings", "Balayage soft curls by Beauty JB", 1200, 1500),
  halfUpCurlsPearlPins: w("half-up-curls-pearl-pins", "weddings", "Half up curls pearl pins by Beauty JB", 1200, 1500),
  blueBlackCurls: w("blue-black-curls", "weddings", "Blue black curls by Beauty JB", 1200, 1500),
  longBlondeCurls: w("long-blonde-curls", "weddings", "Long blonde curls by Beauty JB", 1200, 1500),
  blondeCurlSet: w("blonde-curl-set", "weddings", "Blonde curl set by Beauty JB", 1200, 1500),
  halfUpAuburnCurlsPins: w("half-up-auburn-curls-pins", "weddings", "Half up auburn curls pins by Beauty JB", 1200, 1500),
  halfUpBlondeWaves: w("half-up-blonde-waves", "weddings", "Half up blonde waves by Beauty JB", 1200, 1200),
  braidedUpdo: w("braided-updo", "weddings", "Braided updo by Beauty JB", 1200, 1200),
  curledLowUpdo: w("curled-low-updo", "weddings", "Curled low updo by Beauty JB", 1200, 1200),
  sideSweptCurls: w("side-swept-curls", "weddings", "Side swept curls by Beauty JB", 1200, 1200),
  updoJeweledPins: w("updo-jeweled-pins", "weddings", "Updo jeweled pins by Beauty JB", 1200, 1200),
  sideBraidCurls: w("side-braid-curls", "weddings", "Side braid curls by Beauty JB", 1200, 1200),
  bridalBunWithVeil: w("bridal-bun-with-veil", "weddings", "Bridal bun with veil by Beauty JB", 1200, 1200),
  curledUpdoSideView: w("curled-updo-side-view", "weddings", "Curled updo side view by Beauty JB", 1200, 1200),
  texturedCurledPonytail: w("textured-curled-ponytail", "weddings", "Textured curled ponytail by Beauty JB", 1200, 1200),
};

export const igWork: WorkPhoto[] = Object.values(ig);
