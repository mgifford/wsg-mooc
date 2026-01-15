---
id: VIS-03
title: Optimizing Image Assets
track: Visual Designer
module_id: VIS-03
---

# Optimizing Image Assets

## The Decision
"Is this image serving the right format for its content, or is it a PNG trying to do a JPEG's job?"

## Why It Matters
Images are often the heaviest single elements on a page. The wrong format choice can balloon file size by 10x without any perceptible quality difference. A photograph saved as a PNG is wasteful. A vector icon saved as a JPEG is blurry and heavy. Sustainable visual design involves understanding the technical strengths of each format: AVIF/WebP for photos, SVG for icons and illustrations.

## Common Failure Modes
*   **"PNG Photos"**: Using PNG for photographs, resulting in massive files. Use JPG or WebP/AVIF.
*   **"Rasterized Icons"**: Saving logos or icons as pixel bitmaps instead of crisp, tiny SVGs.
*   **"Oversized Dimensions"**: Uploading a 4000px wide image for a slot that is only ever 800px wide.

## "Do This Now" Checklist
1.  **Format Audit**: Check your last 5 designs. Photos -> AVIF/WebP. Icons/Logos -> SVG.
2.  **SVG Clean**: Open an SVG file in a text editor. If you see mountains of metadata code, use a tool like SVGO (SVGOMG) to strip the junk.
3.  **Modern Formats**: Instruct developers to implementation `<picture>` tags that serve AVIF to modern browsers and fallback to JPG.
4.  **Blur Test**: Compress a hero image to 80% quality, then 60%. Can you actually tell the difference at normal viewing distance? Lower the setting until it breaks, then step back one.

## Measurement Options
*   **Image Weight**: Total KB of images on the page.
*   **[Lighthouse](https://developer.chrome.com/docs/lighthouse/overview/) Audit**: check the "Properly size images" and "Serve images in next-gen formats" warnings.

## Reflection Prompt
"Could this 1MB photograph be replaced by a 5KB SVG illustration and tell the same story?"

## References
*   [WSG-2.11](https://w3c.github.io/sustyweb/#WSG-2.11)
*   [WSG-2.14](https://w3c.github.io/sustyweb/#WSG-2.14)
*   [STAR-UX14-3](https://w3c.github.io/sustyweb/#STAR-UX14-3)


## Feedback
[Open an issue](https://github.com/mgifford/wsg-mooc/issues/new?title=Feedback%20on%20VIS-03) to suggest improvements.