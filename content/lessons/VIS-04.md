---
id: VIS-04
title: Designing for Energy Saving
track: Visual Designer
module_id: VIS-04
---

# Designing for Energy Saving

## The Decision
"Am I designing a screen that drains battery, or one that sips it?"

## Why It Matters
On OLED screens (most modern phones and high-end laptops), black pixels turn off completely. White pixels run at full power. A predominantly bright white interface consumes significantly more energy than a dark one. Designing with energy in mind means offering Dark Mode not just as an aesthetic choice, but as an environmental one.

## Common Failure Modes
*   **"Brand Lock"**: "Our brand color is bright orange, so the background must be bright orange."
*   **"Ignored States"**: Designing the "Light Mode" perfectly but leaving "Dark Mode" to an automated (and often ugly) inversion algorithm.
*   **"Blue Light"**: Excessive use of bright blue light content which can disrupt circadian rhythms (though this is more health than energy).

## "Do This Now" Checklist
1.  **Dark Mode Palette**: Define a specific dark-theme palette. Don't use pure black (#000000) for backgrounds (which can cause smearing); use very dark gray (#121212).
2.  **Asset Handling**: Ensure your icons and logos have transparent backgrounds so they work on dark themes.
3.  **Contrast Check**: Verify that your text contrast ratios meet WCAG AA limitations in *both* Light and Dark modes.
4.  **OLED Optimization**: Consider using true blacks for video borders or inactive areas to maximize pixel-off states.

## Measurement Options
*   **Color Analysis**: Tools exist to estimate the energy consumption of a specific color palette on OLED screens.

## Reflection Prompt
"Is my design forcing the user's phone to act as a flashlight?"

## References
*   [WSG-3.12](https://w3c.github.io/sustyweb/#WSG-3.12)
*   [STAR-WD12-1](https://w3c.github.io/sustyweb/#STAR-WD12-1)


## Feedback
[Open an issue](https://github.com/mgifford/wsg-mooc/issues/new?title=Feedback%20on%20VIS-04) to suggest improvements.