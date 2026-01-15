---
id: CON-03
title: Accessible Media
track: Content Author
module_id: CON-03
---

# Accessible Media

## The Decision
"If I couldn't see this image or listen to this video, would I still understand the content?"

## Why It Matters
Images and videos are often the primary storytelling elements, but for users with visual or auditory impairments (or those in loud cafes, or with slow data), they are invisible. Text alternatives (Alt Text, Transcripts, Captions) are redundant safeguards. They ensure the message survives even if the media fails to load or cannot be perceived. This redundancy is the core of robust, sustainable content.

## Common Failure Modes
*   **"Image of Text"**: Important announcements locked inside a JPG banner with no Alt text.
*   **"Missing Captions"**: Video content with no subtitles, excluding deaf users and those with sound off.
*   **"Lazy Alt"**: "image123.jpg" or "Logo" as the alt text.

## "Do This Now" Checklist
1.  **Alt Text**: Describe the *function* of the image, not just the appearance. If it's decorative, mark it as such (alt="").
2.  **Transcripts**: Provide a full text transcript for any audio/video content. This is also great for SEO and low-bandwidth users.
3.  **Captions**: Verify that auto-generated captions are accurate (they often fail on names and technical terms).
4.  **No Auto-Play Audio**: Ensure audio never plays automatically—it disrupts screen readers and annoys everyone.

## Measurement Options
*   **Accessibility Audit**: Tools like [WAVE](https://wave.webaim.org/) or [Axe](https://www.deque.com/axe/) can valid the presence (but not quality) of Alt text.
*   **Transcript Downloads**: Track how often users access the text version of media.

## Reflection Prompt
"Am I assuming everyone accesses the web exactly like I do?"

## References
*   [WSG-2.14](https://w3c.github.io/sustyweb/#WSG-2.14)
*   [STAR-UX14-3](https://w3c.github.io/sustyweb/#STAR-UX14-3)
*   [STAR-UX14-4](https://w3c.github.io/sustyweb/#STAR-UX14-4)


## Feedback
[Open an issue](https://github.com/mgifford/wsg-mooc/issues/new?title=Feedback%20on%20CON-03) to suggest improvements.