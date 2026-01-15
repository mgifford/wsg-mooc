---
id: VIS-05
title: Responsible Animation
track: Visual Designer
module_id: VIS-05
---

# Responsible Animation

## The Decision
"Does this motion convey meaning, or is it just decoration?"

## Why It Matters
Animation is computationally expensive. It triggers the CPU and GPU to repaint the screen 60 (or 120) times per second. Continuous, loops animations (like background ambient videos or auto-playing carousels) prevent the device from going into low-power idle states. They keep the processor revving. Sustainable design treats motion as a spice, not a main course—used sparingly to guide the eye or provide feedback, then stopping immediately.

## Common Failure Modes
*   **"Auto-Play Everything"**: Videos that start playing (and downloading) without user consent.
*   **"Infinite Loops"**: Lottie files or CSS animations that loop forever, burning battery even when the user isn't interacting.
*   **"Parallax Overload"**: JavaScript-heavy scroll effects that cause "jank" and heat up phones.

## "Do This Now" Checklist
1.  **Toggle Switch**: Does the design allow for a "Pause" button on any auto-moving content? (Crucial for accessibility too).
2.  **Interaction Trigger**: Change animations to run *only* on interaction (hover/click) rather than continuously.
3.  **The 5-Second Rule**: If it must auto-play, ensure it stops after 5 seconds.
4.  **Hardware Acceleration**: Ensure developers implement animations using CSS Transform/Opacity (cheap) rather than Top/Left/Width (expensive).

## Measurement Options
*   **CPU Usage**: Monitor Chrome Task Manager during the animation.
*   **Frame Rate**: Does the animation maintain 60fps on a low-end device?

## Reflection Prompt
"If I removed this animation, would the interface still make sense? If yes, should it be there?"

## References
*   [WSG-2.12](https://w3c.github.io/sustyweb/#WSG-2.12)
*   [STAR-UX11-1](https://w3c.github.io/sustyweb/#STAR-UX11-1)


## Feedback
[Open an issue](https://github.com/mgifford/wsg-mooc/issues/new?title=Feedback%20on%20VIS-05) to suggest improvements.