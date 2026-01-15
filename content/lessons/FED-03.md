---
id: FED-03
title: Optimizing Asset Loading
track: Front-end Developer
module_id: FED-03
---

# Optimizing Asset Loading

## The Decision
"Does the user need this resource *right now*, or can it wait until they ask for it?"

## Why It Matters
The most sustainable data is data that is never transferred. Browsers are aggressive by default—they try to fetch everything linked in the document. As a developer, you know the user's journey better than the browser does. By controlling the loading priority, you ensure that critical content (what the user actually came for) arrives instantly, while secondary content (below-the-fold images, heavy interactive widgets) steps aside, saving bandwidth and energy.

## Common Failure Modes
*   **"Eager Everything"**: Loading all images, videos, and scripts immediately on page load, even if they are at the bottom of a long scroll.
*   **"Chain Reactions"**: Loading a script that loads a stylesheet that loads an image—causing a waterfall effect that delays rendering.
*   **"Invisible Heaviness"**: Loading high-res images for mobile users or requesting data for hidden UI tabs "just in case."

## "Do This Now" Checklist
1.  **Lazy by Default**: Add `loading="lazy"` to every image and iframe that is not in the initial viewport (above the fold).
2.  **Explicit Priority**: Use `<link rel="preload">` for the single most important asset (hero image or main font) and `rel="prefetch"` for the next likely page navigation.
3.  **Facade Pattern**: Replace heavy third-party widgets (chats, maps, YouTube embeds) with a static "facade" image that only loads the real widget when the user clicks/hovers.
4.  **Async/Defer**: Ensure no script tags in the `<head>` are blocking rendering unless absolutely critical; use `defer` or `async` attributes.

## Measurement Options
*   **LCP (Largest Contentful Paint)**: Measure the time it takes for the main content to appear.
*   **Network Requests**: Count the number of requests fired on initial load versus after scrolling to the bottom.

## Reflection Prompt
"Am I using the user's data plan to download content they effectively never see?"

## References
*   [WSG-3.8](https://w3c.github.io/sustyweb/#WSG-3.8)
*   [STAR-WD08-1](https://w3c.github.io/sustyweb/#STAR-WD08-1)
*   [STAR-WD08-2](https://w3c.github.io/sustyweb/#STAR-WD08-2)


## Feedback
[Open an issue](https://github.com/mgifford/wsg-mooc/issues/new?title=Feedback%20on%20FED-03) to suggest improvements.