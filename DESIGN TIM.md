---
name: Dayos-inspired enterprise AI marketing site
source: Full-page screenshot of dayos.com landing page (visual reference only)
status: Inferred from a static screenshot. Values are approximate and should be tuned against the live site.
colors:
  canvas: "#E8E8E8"        # hero background, light grey stage for 3D renders
  canvas-soft: "#F2F2F2"   # secondary light sections ("Run a better business")
  surface: "#FFFFFF"       # white sections, cards, CTA tiles
  ink: "#0A0A0A"           # primary text on light, dark section background
  ink-raised: "#1A1A1A"    # logo tiles, raised surfaces on dark
  ink-soft: "#3A3A3A"      # secondary button on dark
  on-ink: "#FFFFFF"        # text on dark surfaces
  muted: "#6E6E6E"         # body copy on light, captions
  muted-on-ink: "#A6A6A6"  # secondary text on dark
  hairline: "#DADADA"      # dividers, outlined buttons, card borders
  mint: "#C9F5C4"          # feature card panel (use case library)
  signal: "#E6FF3D"        # neon yellow, footer email link and 3D render highlights
  render-magenta: "#E04BD6"
  render-orange: "#FF7A2F"
  render-cyan: "#2EC5E8"
  render-green: "#5BE07A"
typography:
  display:
    family: "Condensed grotesk, bold (e.g. Druk Condensed, Monument Grotesk Condensed)"
    fallback: "'Barlow Condensed', 'Archivo Narrow', 'Arial Narrow', sans-serif"
    weight: 700
    case: uppercase
    line-height: 0.88
    letter-spacing: "-0.01em"
  text:
    family: "Neo-grotesk (e.g. Suisse Int'l, Neue Haas Grotesk)"
    fallback: "Inter, 'Helvetica Neue', Arial, sans-serif"
    weights: [400, 500, 600]
  mono:
    family: "Monospace (footer metadata, addresses, legal)"
    fallback: "'JetBrains Mono', 'IBM Plex Mono', ui-monospace, monospace"
  scale:
    display-xl: "clamp(56px, 9vw, 128px)"   # hero headline
    display-l: "clamp(44px, 6vw, 88px)"     # section statements
    display-m: "clamp(32px, 3.6vw, 48px)"   # card and column titles, CTA tiles
    heading: "clamp(24px, 2.4vw, 34px)"     # sentence-case section headings
    lead: "clamp(18px, 1.8vw, 24px)"        # large intro paragraphs
    body: "16px"
    small: "14px"
    micro: "12px"                           # mono footer, legal
radius:
  section: "48px"   # top corners of stacked full-width sections
  card: "20px"      # feature cards, carousel slides
  tile: "12px"      # logo tiles, product cards
  button: "6px"
  pill: "999px"     # nav container, pagination dots
spacing:
  unit: 8
  scale: [4, 8, 12, 16, 24, 32, 48, 64, 96, 128, 160]
  container: "1280px"
  gutter: "clamp(20px, 4vw, 64px)"
  section-y: "clamp(96px, 12vw, 160px)"
---

# DESIGN.md

## 1. Overview

This is an enterprise AI marketing site that borrows the confidence of editorial poster design. The voice comes from **huge condensed uppercase headlines**, **strict black and white surfaces**, and **tactile 3D renders** that carry all of the color. The UI itself is almost colorless; color lives inside the illustrations.

Three ideas define the system:

1. **Poster typography.** Headlines are short, uppercase, condensed, set tight, and usually end with a period ("AI." "GAP." "CLOSED."). They read like statements, not labels.
2. **Stacked sheets.** The page is a sequence of full-width sections that slide over each other. Each new section has large rounded top corners (about 48px), so the page feels like layered paper or cards dealt onto a table.
3. **Monochrome UI, colorful objects.** Buttons, text, and tiles stay black, white, and grey. Saturated color (neon yellow, magenta, orange, cyan, green) appears only in 3D product renders and in one or two signal moments.

The result should feel bold, physical, and enterprise-credible. Avoid anything that looks like a generic SaaS template: no gradients, no soft pastel cards everywhere, no centered hero with a glowing mockup.

## 2. Color

### Roles

| Token | Value | Use |
|---|---|---|
| `canvas` | `#E8E8E8` | Hero background. A neutral grey stage so 3D renders look photographed. |
| `canvas-soft` | `#F2F2F2` | Secondary light sections between white and dark sections. |
| `surface` | `#FFFFFF` | White sections, cards, CTA tiles. |
| `ink` | `#0A0A0A` | Primary text on light surfaces. Also the background of dark sections and the footer. |
| `ink-raised` | `#1A1A1A` | Logo tiles and raised elements on dark or light. |
| `ink-soft` | `#3A3A3A` | Secondary button fill on dark sections. |
| `on-ink` | `#FFFFFF` | Text and icons on dark. |
| `muted` | `#6E6E6E` | Body copy and captions on light surfaces. |
| `muted-on-ink` | `#A6A6A6` | Secondary text on dark. |
| `hairline` | `#DADADA` | Dividers, outlined buttons, card edges on light. |
| `mint` | `#C9F5C4` | Panel color for featured use case slides. |
| `signal` | `#E6FF3D` | Neon yellow. Footer email link, small highlights. |

### Policy

- **The interface is monochrome.** Primary actions are black on light and white on dark. Do not introduce a brand blue or any colored primary button.
- **Color belongs to objects.** Magenta, orange, cyan, green, and neon yellow appear in 3D renders, illustration ground planes, and product imagery. They are not used for text, borders, or UI chrome.
- **One soft accent panel at a time.** `mint` is used as the left half of a featured carousel slide. Do not spread pastel panels across the page.
- **Alternate surfaces to create rhythm:** light grey hero, then black, then white, then light grey, then white CTA band, then black footer. Each change is a new rounded-top section.
- Contrast: body text on `canvas` uses `ink` or `muted` (never lighter than `#6E6E6E`). On `ink`, secondary text never goes below `muted-on-ink`.

## 3. Typography

### Families

- **Display:** condensed grotesk, bold, uppercase. Used for every headline that is a statement. If the brand face is unavailable, use Barlow Condensed 700 or Archivo Narrow 700 and tighten line-height.
- **Text:** a neutral neo-grotesk for body, navigation, buttons, and sentence-case headings.
- **Mono:** a small monospace face only in the footer (addresses, copyright, legal links). It adds a technical, enterprise detail.

### Scale and usage

| Style | Size (desktop) | Weight | Line-height | Usage |
|---|---|---|---|---|
| `display-xl` | about 120 to 128px | 700, uppercase, condensed | 0.88 | Hero headline, max 3 to 4 short lines |
| `display-l` | about 80 to 88px | 700, uppercase, condensed | 0.9 | Section statements ("WE'RE REVOLUTIONIZING THE WAY GOOD WORK GETS DONE.") |
| `display-m` | about 40 to 48px | 700, uppercase, condensed | 0.92 | Column titles (ANSWERS, ACTIONS, EXPERTS), card headlines, CTA tiles |
| `heading` | about 28 to 34px | 500, sentence case | 1.2 | Softer section intros ("Explore our Use Case Library.") |
| `lead` | about 22 to 24px | 400 to 500 | 1.35 | Large paragraphs under statements. Can mix `ink` and `muted` in one paragraph for emphasis. |
| `body` | 16px | 400 | 1.5 | Default copy |
| `small` | 14px | 400 to 500 | 1.45 | Card text, nav links, buttons |
| `micro` | 12px | 400, mono | 1.4 | Footer metadata |

### Rules

- Display headlines are **left aligned**, never centered.
- Keep display lines short; break them manually so each line is a strong word group.
- End statement headlines with a period. It is part of the voice.
- Body copy under a display headline stays narrow (about 420 to 520px) so the contrast between huge headline and small text is obvious.
- Do not use display type in sentence case, and do not use the text family in uppercase for headlines.

## 4. Layout and spacing

- **Container:** about 1280px max, with generous side gutters (about 64px on desktop).
- **Section rhythm:** very tall vertical spacing (about 128 to 160px) between blocks. The page breathes; each statement gets its own moment.
- **Stacked sections:** each major section is full width with `radius.section` on its top-left and top-right corners and overlaps the previous section slightly. Bottom corners stay square.
- **Grids:**
  - Three equal columns for value statements (AI. / GAP. / CLOSED.) and capability blocks (ANSWERS / ACTIONS / EXPERTS).
  - Two columns, text left and image right, for product intro blocks; the image may bleed off the right edge.
  - Four-column tile grid for partner logos (two rows).
  - Horizontal carousels for use cases and solution cards, with the next card partially visible at the right edge.
- **Hero:** text occupies the left half; the 3D render sits on the right, oversized and cropped by the viewport edge. Short supporting copy sits under the headline. No hero buttons are required.
- **Bottom CTA band:** two equal tiles separated by a vertical hairline, each with a condensed headline, a short line of copy at the bottom, and a square arrow icon in the top-right corner.

## 5. Components

### Navigation
- Left: logo mark plus wordmark.
- Center: links inside a single light pill container (`surface` at slight transparency, `radius.pill`), `small` text, regular weight.
- Right: a black "Get Started" button (`ink` fill, `on-ink` text, `radius.button`, compact padding about 8px 16px).
- Sits on top of the hero canvas without a visible bar.

### Buttons
- **Primary on light:** `ink` fill, `on-ink` text, 14px medium, `radius.button`, padding about 10px 18px.
- **Primary on dark:** `surface` fill, `ink` text, same shape.
- **Secondary on dark:** `ink-soft` fill, `on-ink` text, optional trailing arrow (→).
- **Outlined (in cards):** transparent, 1px `hairline` border, `ink` text, small size.
- **Icon buttons:** small squares or circles with a 1px border holding an arrow; used for carousel controls, CTA tiles, and "Back to top".
- Buttons are small relative to headlines. Never make buttons the loudest element on screen.

### Statement block
- `display-l` or `display-m` headline, then one to three short `body` or `lead` paragraphs.
- On dark sections, text is `on-ink`; secondary lines use `muted-on-ink`.

### Capability column
- 3D isometric illustration on top (no frame, no background card).
- `display-m` uppercase title.
- 2 to 4 lines of `small` body text.

### Featured carousel slide
- `radius.card`, split 50/50.
- Left: `mint` panel with `display-m` headline, `small` description, black primary button.
- Right: photographic 3D render on a light grey background.
- Below: pagination with a small circular icon button and pill-shaped dots, the active dot elongated.

### Logo tile
- `ink-raised` tile, `radius.tile`, partner logo in white, centered.
- One tile may use a deep tinted dark (e.g. a dark plum) to break the grid slightly.

### Solution card
- `surface`, `radius.tile`, subtle 1px `hairline` or no border on `canvas-soft`.
- Top: image area with a 3D object on a saturated ground color (green, magenta, cyan).
- Body: `small` semibold title, `small` muted description, outlined "More details" button at the bottom.

### CTA tile
- White, square-cornered inside a full-width band, divided by a vertical hairline.
- `display-m` headline top-left, outlined square arrow icon top-right, `small` copy anchored to the bottom.

### Footer
- `ink` background, large white logo, four columns of `small` links (`on-ink` headings, `muted-on-ink` items).
- Contact line uses `signal` for the email link.
- Bottom row in `micro` mono: addresses, copyright, social icons, legal links.

## 6. Imagery and illustration

- **3D renders are the brand's color system.** Use stacked blocks, cubes, and abstract isometric objects with matte, slightly textured materials (stone, plaster, felt) plus glossy saturated pieces.
- Lighting is soft studio light with real shadows on a light grey ground.
- Objects are often cropped by the viewport or card edge to feel large and physical.
- Product UI screenshots appear inside a realistic laptop mockup, dark UI on dark section.
- No flat vector icons in hero or feature areas, no stock photography of people, no gradients or glows.

## 7. Responsive behavior

- **Below about 1024px:** three-column grids become a single column; capability blocks stack with illustration above text. Logo grid goes to 2 columns.
- **Below about 768px:**
  - Navigation pill collapses into a menu button; "Get Started" stays visible.
  - Hero stacks: headline first, render below, still cropped at the right.
  - Display sizes scale down with `clamp()` but stay condensed and uppercase; keep line-height tight.
  - Featured slide stacks: mint panel on top, image below.
  - CTA band tiles stack vertically; the vertical hairline becomes horizontal.
  - Section top radius reduces to about 28px.
  - Carousels stay horizontal with swipe and a peeking next card.
- Touch targets at least 44px, including carousel arrows and the "Back to top" button.

## 8. Do and do not

**Do**
- Let one huge condensed headline own each section.
- Keep UI chrome black, white, and grey.
- Use 3D objects to introduce color.
- Stack sections with large rounded top corners.

**Do not**
- Center display headlines or use them in sentence case.
- Add colored primary buttons, gradients, or drop shadows on cards.
- Put saturated color in text, borders, or backgrounds outside the mint feature panel and the footer signal link.
- Fill the page with many small cards; prefer few large, confident blocks.

## 9. Known gaps

The following are not visible in a single static screenshot and are not defined here:

- Motion: scroll animations, section overlap transitions, carousel timing, hover states.
- Exact font families and licensed weights.
- Form inputs, validation, and error states.
- Dark mode (the site alternates light and dark sections, but no full dark theme is documented).
- Dropdown menus from the navigation.
- Data visualization or chart colors.
- Exact hex values; all colors were sampled visually and should be verified.

## Disclaimer

This file is an educational reference inferred from public visual patterns. It is not an official brand system. Brand names and trademarks belong to their owners. Adapt the patterns rather than copying the brand.
