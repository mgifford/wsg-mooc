---
id: FED-02
title: Managing Dependencies
track: Front-end Developer
module_id: FED-02
---

# Managing Dependencies

## The Decision
"Do I actually need this library, or can I write a 10-line utility function instead?"

## Why It Matters
Modern web development often feels like assembling LEGO bricks, but each brick (npm package) comes with a cost. Dependencies can bring transitive bloat, security vulnerabilities, and maintenance debt. A 20kB library might not seem like much on fiber, but on a flaky 3G connection, the parse and compile time alone can block the main thread for hundreds of milliseconds. Sustainable development means treating every external dependency as a liability, not just an asset.

## Common Failure Modes
*   **"Component Garden"**: Importing entire UI frameworks just to use a single button or modal component.
*   **"Lodash mainly for one function"**: Importing a massive utility library when modern ES6+ JavaScript can handle the task natively.
*   **"Zombie Dependencies"**: Leaving packages in `package.json` that are no longer referenced in the codebase.
*   **"Version Drift"**: Failing to update dependencies, leaving the site vulnerable and potentially less performant over time.

## "Do This Now" Checklist
1.  **Bundle Analysis**: Run a visualization tool (like `webpack-bundle-analyzer` or `source-map-explorer`) to see exactly what is taking up space in your final build.
2.  **Native Replacement**: Identify one utility library (e.g., date formatting, array manipulation) and check if native browser APIs (Intl.DateTimeFormat, Array.prototype) can replace it.
3.  **Tree-Shaking Check**: Verify that your build pipeline effectively discards unused exports from the libraries you do keep.
4.  **Audit Scripts**: Move tracking pixels and non-essential third-party scripts to be deferred or loaded only on interaction, not on initial page load.

## Measurement Options
*   **JS Bundle Size**: Track the total KB of JavaScript downloaded on the home page.
*   **Coverage**: Use Chrome [DevTools](https://developer.chrome.com/docs/devtools/) "Coverage" tab to identify the percentage of loaded JS/CSS that is actually used on the current page.

## Reflection Prompt
"If this third-party service went offline or introduced a breaking change tomorrow, how much of my application would stop working?"

## References
*   [WSG-3.4](https://w3c.github.io/sustyweb/#WSG-3.4)
*   [WSG-3.14](https://w3c.github.io/sustyweb/#WSG-3.14)
*   [WSG-3.16](https://w3c.github.io/sustyweb/#WSG-3.16)
*   [STAR-WD04-1](https://w3c.github.io/sustyweb/#STAR-WD04-1)
*   [STAR-WD16-3](https://w3c.github.io/sustyweb/#STAR-WD16-3)
*   [STAR-WD14-2](https://w3c.github.io/sustyweb/#STAR-WD14-2)


## Feedback
[Open an issue](https://github.com/mgifford/wsg-mooc/issues/new?title=Feedback%20on%20FED-02) to suggest improvements.