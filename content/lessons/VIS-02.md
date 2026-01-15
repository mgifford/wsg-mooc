---
id: VIS-02
title: Typography Strategy
track: Visual Designer
module_id: VIS-02
---

# Typography Strategy

## The Decision
"Do we need five different weights of this custom font, or can we express hierarchy with size and color?"

## Why It Matters
Custom web fonts are expensive assets. A single font file (e.g., Roboto-Bold-Italic) can be 40-100KB. Loading a font family with Regular, Bold, Semibold, Light, and Italics for each can easily add half a megabyte to the critical rendering path, causing "Flash of Invisible Text" (FOIT) where the user stares at a blank screen waiting for letters to download. Sustainable typography balances brand identity with performance.

## Common Failure Modes
*   **"All the Weights"**: Importing the entire font family "just in case" we need a specific weight later.
*   **"System Font Phobia"**: Refusing to use performant system fonts (San Francisco, Segoe UI, Roboto) for UI text/body copy.
*   **"Unoptimized Formats"**: Serving legacy `.ttf` files instead of modern compressed `.woff2`.

## "Do This Now" Checklist
1.  **System UI**: Switch body copy or administrative UI text to use System Fonts stack. It loads instantly (0KB).
2.  **Subset**: Reduce custom font usage to 2-3 variants max (e.g., Regular, Bold).
3.  **Variable Fonts**: Investigate if your chosen typeface has a "Variable Font" version. This bundles all weights into a single, often smaller, file.
4.  **Display Only**: Reserve heavy custom fonts only for headings (H1, H2) where they have the most visual impact.

## Measurement Options
*   **Font Payload**: Total KB of all font files loaded.
*   **FOIT/FOUT**: Observation of how text renders on slow connections (does it blink in or swap styles?).

## Reflection Prompt
"Does the user's reading experience actually improve with this custom font, or is it just brand vanity?"

## References
*   [WSG-2.13](https://w3c.github.io/sustyweb/#WSG-2.13)
*   [STAR-UX13-1](https://w3c.github.io/sustyweb/#STAR-UX13-1)
*   [STAR-UX13-2](https://w3c.github.io/sustyweb/#STAR-UX13-2)


## Feedback
[Open an issue](https://github.com/mgifford/wsg-mooc/issues/new?title=Feedback%20on%20VIS-02) to suggest improvements.