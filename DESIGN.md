---
# gstack: design-md-format=spec
name: Phucking Cards
description: A risograph party zine you can play. Crude jokes, flat ink, printed with obvious care.
colors:
  table: "#1B2B6B"
  table-raised: "#24387F"
  table-line: "#33479A"
  primary: "#FF48B0"
  primary-press: "#E8349B"
  on-primary: "#14183A"
  paper: "#F5F2EA"
  paper-shade: "#E6E1D4"
  ink: "#14183A"
  ink-muted: "#4A4F6E"
  text-muted: "#A9B4DA"
  focus: "#0078BF"
  link-on-paper: "#005A9C"
  accent: "#FFE800"
  success: "#3DDC84"
  warning: "#FFE800"
  error: "#FF6B5A"
typography:
  display:
    fontFamily: Bricolage Grotesque
    fontWeight: 800
    fontSize: clamp(3rem, 9vw, 5.75rem)
    fontStretch: 75%
    lineHeight: 0.92
    letterSpacing: -0.02em
  heading:
    fontFamily: Bricolage Grotesque
    fontWeight: 800
    fontSize: clamp(2rem, 5vw, 3rem)
    fontStretch: 80%
    lineHeight: 1
    letterSpacing: -0.015em
  card:
    fontFamily: Bricolage Grotesque
    fontWeight: 700
    fontSize: 1.25rem
    fontVariation: "'opsz' 18"
    lineHeight: 1.18
  card-small:
    fontFamily: Bricolage Grotesque
    fontWeight: 700
    fontSize: 1.0625rem
    fontVariation: "'opsz' 18"
    lineHeight: 1.15
  body:
    fontFamily: Atkinson Hyperlegible Next
    fontWeight: 400
    fontSize: 1rem
    lineHeight: 1.5
  label:
    fontFamily: Atkinson Hyperlegible Next
    fontWeight: 700
    fontSize: 0.875rem
  mono:
    fontFamily: Atkinson Hyperlegible Mono
    fontWeight: 700
    letterSpacing: 0.14em
    fontFeature: tnum
rounded:
  sm: 4px
  md: 8px
  lg: 12px
  full: 9999px
spacing:
  xs: 4px
  sm: 8px
  md: 16px
  lg: 24px
  xl: 32px
  2xl: 48px
  3xl: 64px
components:
  button-primary:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.on-primary}"
    rounded: "{rounded.md}"
    minHeight: 52px
    shadow: "0 3px 0 {colors.primary-press}"
  button-primary-hover:
    backgroundColor: "#FF5CBA"
  button-secondary:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.ink}"
    rounded: "{rounded.md}"
  button-ghost:
    backgroundColor: transparent
    borderColor: "{colors.table-line}"
    textColor: "{colors.paper}"
    rounded: "{rounded.md}"
  input:
    backgroundColor: "{colors.table-raised}"
    borderColor: "{colors.table-line}"
    rounded: "{rounded.md}"
  card-prompt:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.ink}"
    rounded: "{rounded.md}"
    size: 200x275
    sizeSmall: 144x198
  card-answer:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.ink}"
    rounded: "{rounded.md}"
  card-selected:
    outline: "3px solid {colors.primary}"
    outlineOffset: 3px
    translateY: -14px
  panel:
    backgroundColor: "{colors.table-raised}"
    borderColor: "{colors.table-line}"
    rounded: "{rounded.md}"
  nav-link:
    textColor: "{colors.paper}"
---

# Phucking Cards

## Overview

**Creative North Star:** Gleefully filthy, but well made. A risograph party zine: the medium is cheap and the jokes are cheaper, but every ink, margin and tap target is placed with care.
**Product context:** Free, no-login, real-time fill-in-the-blank party card game for 3-20 adults, played mostly on phones in the evening (couch, bar, or a Discord call). Fan-made tribute to Cards Against Humanity, not affiliated. Peers: Cards Against Formality, Bad Cards, Pretend You're Xyzzy, Jackbox, Gartic Phone.
**Mode per surface:**
- Home / marketing: Persuade. A poster, not a document.
- Live game (join, lobby, hand, judging, scoreboard): Operate. Clean, thumb-first, no texture.
- Docs (how to play, rules, policies): Read. Paper surface, 65-character column.
- Moderator dashboard and community voting: Operate. Dense, explicit statuses, card previews.
**Reference sites:** https://www.cardsagainsthumanity.com (observed: black/white grotesk, bursts of flat color), https://cardsagainstformality.io (observed: a direct copy of the black/white Helvetica cards). garticphone.com, allbad.cards and jackbox.tv could not be observed headlessly.
**Key characteristics:**
- A deep blue table instead of black. Nobody else in the niche owns a color.
- Pink prompt cards, paper answer cards. The cards are the brand, and they cannot be mistaken for the original game's black and white.
- Huge condensed headlines, left-aligned. Real card jokes are the hero artwork.
- Calm, legible game screens with plain-language status ("Waiting for Jess to judge").
- One authored moment: the winning card prints in slightly out-of-register ink, then snaps into place.

## Colors

**Strategy:** Drenched. Riso blue (`table`) owns every surface people play on, and the neutrals (`table-raised`, `table-line`, `text-muted`) are lightened steps of that same blue, not grays.
**Light or dark:** Dark-leaning blue, from the use scene: adults on phones in dim evening rooms. Docs flip to `paper`, because people read rules in daylight and long text reads better dark-on-light.

- `primary` (fluorescent pink) is the loudest ink and is rationed: prompt cards, the one primary action per screen, and the selected-card outline. Nothing else.
- `accent` (riso yellow) means a person: the winner stamp, the judge badge, the countdown. Never decoration.
- `paper` is card stock for answer cards and the docs surface. It is not a page background on marketing or game screens.
- `focus` (riso blue) is the focus ring everywhere. On paper, links use `link-on-paper`, because `focus` reaches only 4.23:1 against paper.
- `success`, `warning`, `error` appear as small filled tags with `ink` text plus a word ("JOINED", "HEADS UP", "NOPE"), never as color alone.

**Contrast (computed in the preview):**

| Pair | Ratio | Allowed use |
|---|---|---|
| paper on table | 11.70:1 | any text |
| text-muted on table | 6.37:1 | any text |
| ink on primary | 5.57:1 | any text |
| ink on paper | 15.37:1 | any text |
| accent on table | 10.47:1 | any text |
| link-on-paper on paper | 6.38:1 | any text |
| primary on table | 4.24:1 | **surfaces and text 24px+ only. Never small pink text on blue.** |
| focus on paper | 4.23:1 | focus rings and non-text only |
| success on table | 7.34:1 | tags, icons |
| error on table | 4.68:1 | tags, icons, text |

## Typography

- **Bricolage Grotesque** (Google Fonts, OFL, variable `opsz` 12-96, `wdth` 75-100, `wght` 200-800): the voice. Display and headings at 800 with `font-stretch: 75-80%` for the condensed poster feel. Card text at 700 with `opsz` 18, the small-size optical cut that keeps it legible at 17px on a 144px card.
- **Atkinson Hyperlegible Next** (Google Fonts, OFL, `wght` 200-800): body, UI, buttons, status lines, docs. Chosen for people reading half-distracted in low light. All three independent design proposals converged on this family.
- **Atkinson Hyperlegible Mono** (Google Fonts, OFL): party codes, scores, timers, card numbers. It separates `I/1/l` and `O/0`, which matters when someone reads a code out loud.
- **Loading:** self-hosted through Fontsource (`@fontsource-variable/bricolage-grotesque/standard.css` for all three axes, plus `@fontsource-variable/atkinson-hyperlegible-next` and `-mono`), imported in `client/src/index.tsx`. Family names carry a ` Variable` suffix. Never load fonts from a third-party CDN: the privacy policy promises no sharing with third parties.
- **Scale:** display 48-92px, h2 32-48px, h3 22px, card 20px (17px small), body 16-19px, label 14px, fine print 13px. Each level is at least one clear step apart. Display never goes past 92px.
- Inter is removed. It was declared but never loaded, so production has been rendering system fallbacks.

## Layout

- Mobile-first. Side gutter is 16px under 720px and 32px above. Max content width is 1180px. Docs column is at most 65ch.
- Home: a two-column poster on desktop (headline, lede, Start + party-code field on the left; overlapping real cards on the right), stacked on phones with the entry actions above the cards. Joining with a code is never below the fold.
- Game: a vertical stack. Status line, then prompt, then the hand as a horizontal scroll-snap row, then the primary action pinned near the bottom. All tap targets are at least 48px.
- Left-aligned by default. Center only single objects (the prompt card on the play screen).
- No 3-column icon grids. "How it works" is one round told in sequence: prompt, answer, verdict.

## Elevation & Depth

- Cards are the only things that lift. They use an offset ink shadow plus a soft blur: `0 3px 0 rgba(10,14,40,.35), 0 10px 24px -8px rgba(10,14,40,.5)`.
- The primary button has a 3px solid offset in `primary-press`, which collapses on press (`translateY(2px)`).
- Panels separate by tint (`table-raised`) and a 1px `table-line` border, not shadows.
- No zero-offset glows, no frosted glass. Hero grain is an SVG noise overlay at 14% opacity, on the marketing hero only.

## Shapes

- `md` 8px is the default for cards, buttons, inputs and panels. `sm` 4px is for tags and badges. `lg` 12px is for the docs sheet. `full` is only for status dots and the selection counter.
- Inner radius = outer radius - gap. A segmented party-code field squares off its inner joins.
- Hero cards rotate between -4° and 3°. Game cards never rotate.

## Components

- **Prompt card:** `primary` fill, `ink` text, a `PHUCKING CARDS` wordmark and a mono `Nº` card number in the footer at 70% opacity. Multi-answer prompts show an `ink` badge with "PICK 2" in `accent`.
- **Answer card:** `paper` fill, the same footer. Selected state: `primary` outline, a 3px offset, a 14px lift and a numbered pink counter, so selection reads without color. Hover lifts 4px (pointer devices only). Disabled cards drop to 45% opacity with `cursor: not-allowed`.
- **Long text:** card copy never truncates. If text overflows at 144px, step down to 15px; if it still overflows, open an expanded reading view on tap.
- **Buttons:** primary / secondary (paper) / ghost (bordered). Every button has a `focus-visible` 3px `focus` ring at a 2px offset, a 2px press translate, and a 45% disabled state. Labels name the outcome: "Start a party", "Play this card", "Copy invite link". Never "Submit" or "Get started".
- **Party-code field:** mono, uppercase, 0.18em tracking, four characters, with an attached "Join" button. The error state shows a "NOPE" tag with a plain sentence.
- **Player list:** a status dot (`success` = connected, `text-muted` = away) plus the word "(away)", a yellow "JUDGE" badge, and the mono score right-aligned.
- **Status line:** always says whose move it is, in words, with the mono countdown in `accent`.
- **Content warning:** a full "Warnings & side effects" insert in the game's voice, with a 2px `ink` border on paper. Never a yellow alert box.
- **Empty, loading and error states:** "Waiting for 2 more people" with the invite link; "Reconnecting. Your hand is safe."; never a spinner without words.

## Do's and Don'ts

- Do: use pink only on prompt cards, the single primary action and the selection outline.
- Do: put real card text in hero art, empty states and examples. The jokes are the illustration.
- Do: keep the party-code join visible in the first viewport on every screen size.
- Do: state every game state in words, not only color or motion.
- Do: test the longest card in the deck at 144x198 before shipping card changes.
- Don't: use black prompt cards, white-on-black cards or Helvetica. That is the original game's trade dress.
- Don't: use emoji as icons or section decoration (the current home page does; replace them).
- Don't: set pink text smaller than 24px on the blue table (4.24:1).
- Don't: add grain, overprint or rotation to game screens. Texture belongs to the marketing hero.
- Don't: use the 3-column icon + title + blurb grid, centered body copy, or pill buttons.

## Motion

- **Approach:** intentional.
- **Easing:** enter `cubic-bezier(.22, 1, .36, 1)` (ease-out); exit ease-out; move ease-in-out.
- **Duration:** micro 100ms (press), short 180ms (card select/lift), medium 300ms (stamp), long 620ms (winner reveal).
- **The one authored moment:** the winner reveal. The card fades up 10px while pink and blue text shadows start offset by 5px and converge to zero, like a two-drum riso print coming into register. Then the yellow "WINNER" stamp drops in at 420ms.
- **Reduced motion:** with `prefers-reduced-motion: reduce`, every animation and transition is removed and the final state shows immediately.

## Decisions Log
| Date | Decision | Rationale |
|------|----------|-----------|
| 2026-11-26 | Initial design system created: Riso Zine | Created by /design-consultation from product context, observed competitor research (cardsagainsthumanity.com, cardsagainstformality.io) and three independent proposals (own draft, Codex "After Hours Print Shop", Claude subagent "Dirty Pharmacy"). North star: "gleefully filthy, but well made." |
| 2026-11-26 | Move away from black/white Helvetica cards | Every clone wears the original game's trade dress. Owning a color and material differentiates and avoids imitation. |
| 2026-11-26 | Atkinson Hyperlegible for body/UI/mono | All three independent proposals converged on it. Low-light, distracted reading. General Sans dropped because of inconsistent license reporting. |
| 2026-11-26 | Adopted from outside voices | Codex: party-code join in the first viewport, real jokes as hero art, thumb-anchored play action. Subagent: card print numbers, content warning as a voiced "side effects" insert. |
