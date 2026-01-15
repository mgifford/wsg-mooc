---
id: FED-04
title: Adaptive User Interfaces
track: Front-end Developer
module_id: FED-04
---

# Adaptive User Interfaces

## The Decision
"Will I force my design choices on the user, or will I listen to what their device is telling me they need?"

## Why It Matters
Users configure their devices to suit their health, environment, and battery needs. Some prefer "Dark Mode" to reduce eye strain and OLED power consumption. Others enable "Reduced Motion" to avoid vestibular disorders. Ignoring these signals isn't just an accessibility failing; it's wasteful. An animation that makes a user dizzy or a bright white background that drains their battery against their wishes is a failure of empathy and efficiency.

## Common Failure Modes
*   **"Flashbang"**: Ignoring system dark mode preferences, blasting a user with a bright screen in a dark room.
*   **"Motion Sickness"**: Implementing parallax or swooping transitions that cannot be turned off.
*   **"Data Indifference"**: Auto-playing high-res video even when the user has `prefers-reduced-data` active.

## "Do This Now" Checklist
1.  **Dark Mode Query**: Implement a rudimentary `prefers-color-scheme: dark` media query that inverts your background and text colors.
2.  **Stop the Motion**: Use `prefers-reduced-motion: reduce` to essentially turn off all non-essential CSS transitions and JavaScript animations.
3.  **Respect Data Saver**: Check the `Save-Data` header or `prefers-reduced-data` query (if supported) to serve lower-res images or disable auto-play features.
4.  **Meta Theme**: Ensure your `<meta name="theme-color">` matches your CSS background to blend the UI with the browser chrome.

## Measurement Options
*   **Power Consumption**: While hard to measure directly, testing screen brightness impact on an OLED device provides a proxy.
*   **Manual Testing**: Toggle system settings (Dark Mode, Reduced Motion) and verify the UI adapts instantly without a refresh.

## Reflection Prompt
"Is my site fighting against the user's operating system settings, or working in harmony with them?"

## References
*   [WSG-3.12](https://w3c.github.io/sustyweb/#WSG-3.12)
*   [STAR-WD12-1](https://w3c.github.io/sustyweb/#STAR-WD12-1)


## Feedback
[Open an issue](https://github.com/mgifford/wsg-mooc/issues/new?title=Feedback%20on%20FED-04) to suggest improvements.