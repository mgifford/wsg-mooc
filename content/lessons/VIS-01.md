---
id: VIS-01
title: Setting the Weight Budget
track: Visual Designer
module_id: VIS-01
---

# Setting the Weight Budget

## The Decision
"How much 'data cost' can we afford to spend on this page before it becomes too slow or expensive for the user?"

## Why It Matters
Visual assets (images, fonts, videos, Lottie files) account for the vast majority of page weight. Without a budget, these assets tend to grow indefinitely until the site becomes unusable on non-fiber connections. A defined "Page Weight Budget" is a collaborative contract between design and engineering. It forces creative constraints that foster innovation—"If I want this full-screen video background, I have to cut the carousels."

## Common Failure Modes
*   **"Infinity Scroll"**: Designing long pages with dozens of high-res images without considering total load size.
*   **"Retina Everything"**: Exporting all assets at @3x resolution assuming everyone is on a high-end MacBook.
*   **"It looks fine on my machine"**: Testing designs only on studio Wi-Fi and powerful workstation desktops.

## "Do This Now" Checklist
1.  **Baseline Target**: Set a hard limit for initial load (e.g., 1.5MB total).
2.  **Asset Allocation**: Break that budget down: 300KB for JS, 100KB for CSS, 100KB for Fonts, leaving ~1MB for Images/Media.
3.  **Export Review**: check the file size of your design exports *before* handing them off. If a hero image is 800KB, it's already broken the budget.
4.  **Device Testing**: Open your current production site on a phone, switch to 4G (or throttle in [DevTools](https://developer.chrome.com/docs/devtools/)), and feel the weight.

## Measurement Options
*   **Total Page Weight**: Measure in KB/MB via tools like [SpeedCurve](https://speedcurve.com/) or [Lighthouse](https://developer.chrome.com/docs/lighthouse/overview/).
*   **Speed Index**: How quickly is the content visually populated?

## Reflection Prompt
"Is this graphic worth the 3 seconds of load time it will cost the user on the train?"

## References
*   [STAR-WD01-1](https://w3c.github.io/sustyweb/#STAR-WD01-1)


## Feedback
[Open an issue](https://github.com/mgifford/wsg-mooc/issues/new?title=Feedback%20on%20VIS-01) to suggest improvements.