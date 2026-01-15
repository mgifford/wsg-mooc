---
id: UXD-05
title: Scaling Consistency
track: UX Designer
module_id: UXD-05
---

# Scaling Consistency

## The Decision
"Should I design a new button style for this campaign, or reuse the one we already have?"

## Why It Matters
Inconsistency breeds bloat. If every landing page has slightly different button styles, typography sizes, and spacing rules, the codebase grows exponentially. CSS files swell with overrides and special cases. Users have to "re-learn" the interface on every page. A robust Design System is a sustainability tool—it enforces reuse, allowing developers to ship features with zero new CSS, keeping page weight low and usability high.

## Common Failure Modes
*   **"Snowflakes"**: Special UI components created for one-off marketing pages that never get cleaned up.
*   **"Fifty Shades of Grey"**: Having 20 slightly different hex codes for gray text across the site.
*   **"Detached Components"**: Design files (Figma/Sketch) that don't match the live code defaults.

## "Do This Now" Checklist
1.  **Token Inventory**: Audit your colors and spacing. Define a strict set of "Design Tokens" (e.g., `space-sm`, `space-md`, `color-primary`).
2.  **Button Audit**: Find all variations of buttons on the site. Deprecate non-standard ones and map them to the core system.
3.  **Component Library**: If you don't have one, start simple. Document the usage rules for the top 5 components (Button, Input, Card, Modal, Nav).
4.  **No-Code Pact**: Agree with developers that "If it's in the system, we use the system code. If it's a snowflake, we discuss why."

## Measurement Options
*   **CSS File Size**: A maturing design system should lead to a plateau or decrease in CSS bundle size even as features grow.
*   **Visual Regression**: Fewer unintended layout shifts or style breaks during releases.

## Reflection Prompt
"Are we inventing new patterns because the user needs them, or because we're bored with the old ones?"

## References
*   [WSG-2.9](https://w3c.github.io/sustyweb/#WSG-2.9)
*   [STAR-UX09-1](https://w3c.github.io/sustyweb/#STAR-UX09-1)


## Feedback
[Open an issue](https://github.com/mgifford/wsg-mooc/issues/new?title=Feedback%20on%20UXD-05) to suggest improvements.