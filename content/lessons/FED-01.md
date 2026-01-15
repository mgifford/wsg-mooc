---
id: FED-01
title: Establishing Code Hygiene
track: Front-end Developer
module_id: FED-01
---

# Establishing Code Hygiene

## The Decision
"Will I ship this code 'as is', or will I strip it down to its bare essentials first?"

## Why It Matters
In a busy sprint, "it works" is often the bar for merging code. But implementation details that are helpful for you (indented whitespace, descriptive comments, verbose wrapper elements) are dead weight to the browser. 

Every extra byte costs electricity to transmit, parse, and render. "Cruft" doesn't just increase bandwidth bills; it forces the user's device to work harder, draining battery and delaying time-to-interactive. Clean, semantic code is not just about philosophy—it is the most fundamental performance optimization you can make.

## Common Failure Modes
*   **"Div Soup"**: Using generic `<div>` tags for everything, resulting in a deeply nested DOM that is hard to style, hard to read, and slower to render.
*   **Dev Artifacts in Prod**: Shipping `console.log` statements, commented-out legacy code, or TODO notes to the end user.
*   **Raw Delivery**: Serving files with all their human-readable formatting (newlines, tabs) intact, ballooning file sizes by 30-40%.

## "Do This Now" Checklist
1.  **Configure Minification**: Ensure your build process (Webpack, Vite, etc.) is set to aggressively strip whitespace and comments for production builds.
2.  **Validate Markup**: Run your templates through an HTML validator. Fix every unclosed tag and invalid nesting issue—browsers waste CPU cycles "guessing" how to fix broken HTML.
3.  **Semantic Swap**: Identify 3 instances of generic `<div>` wrappers in your current component and replace them with semantic alternatives (`<article>`, `<nav>`, `<aside>`, `<section>`).
4.  **Dead Code Sweep**: Search for and delete any CSS rules or JS functions that are commented out. If you need them later, that's what Git history is for.

## Measurement Options
*   **Payload Size**: Compare the `kB` size of your CSS/JS bundles before and after turning on minification.
*   **DOM Depth**: Use browser dev tools to count the depth of your HTML tree. Shallower is faster.

## Reflection Prompt
"If a new developer joined the team tomorrow and had to maintain this component, would the semantic tags explain *what* the content is, or would they have to decipher a maze of generic divs?"

## References
*   [WSG-3.2](https://w3c.github.io/sustyweb/#WSG-3.2)
*   [WSG-3.7](https://w3c.github.io/sustyweb/#WSG-3.7)
*   [STAR-WD02-1](https://w3c.github.io/sustyweb/#STAR-WD02-1)
*   [STAR-WD07-1](https://w3c.github.io/sustyweb/#STAR-WD07-1)


## Feedback
[Open an issue](https://github.com/mgifford/wsg-mooc/issues/new?title=Feedback%20on%20FED-01) to suggest improvements.