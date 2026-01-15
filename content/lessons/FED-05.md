---
id: FED-05
title: Network & Transfer Efficiency
track: Front-end Developer
module_id: FED-05
---

# Network & Transfer Efficiency

## The Decision
"How can I ensure that data travels the shortest distance and is packed as tightly as possible?"

## Why It Matters
The journey of a byte from a server to a user's device involves routers, switches, cell towers, and massive energy expenditure. Compression and caching are your primary tools to shorten this journey. If a file is compressed, it travels faster and cheaper. If it is cached correctly, it doesn't travel at all after the first visit. This is the "infrastructure" side of front-end development that yields the highest sustainability ROI.

## Common Failure Modes
*   **"Text as Image"**: Sending pictures of text instead of actual text, preventing compression.
*   **"Missing Gzip/Brotli"**: Serving plain text (HTML, CSS, JS) without server-side compression enabled.
*   **"Cache Busting Everything"**: Aggressively expiring cache for assets that haven't changed.
*   **"Chatty Protocols"**: Making dozens of small API calls where one aggregated call would suffice.

## "Do This Now" Checklist
1.  **Compression Check**: Verify that your web server (Nginx, Apache, Netlify, Vercel) is serving text assets with Brotli (`br`) or Gzip compression.
2.  **Immutable Caching**: Configure your build system to hash filenames (e.g., `main.a1b2c.js`) so you can set `Cache-Control: max-age=31536000, immutable`.
3.  **Service Worker**: (Advanced) Implement a basic Service Worker to cache the application shell and critical assets for offline-first access.
4.  **JSON Trimming**: Audit your API responses. If you only use "name" and "id", ensure the server isn't sending a 50-field user object.

## Measurement Options
*   **Transfer Size vs. Resource Size**: In browser [DevTools](https://developer.chrome.com/docs/devtools/) Network tab, compare the "Transferred" size (compressed) vs "Resource" size (uncompressed).
*   **Cache Hit Rate**: Monitor your CDN or server logs to see how many requests are being served from the edge vs. origin.

## Reflection Prompt
"When a user returns to my site tomorrow, how many bytes will they have to download again?"

## References
*   [WSG-4.2](https://w3c.github.io/sustyweb/#WSG-4.2)
*   [WSG-4.3](https://w3c.github.io/sustyweb/#WSG-4.3)
*   [STAR-HIS02-1](https://w3c.github.io/sustyweb/#STAR-HIS02-1)
*   [STAR-HIS03-1](https://w3c.github.io/sustyweb/#STAR-HIS03-1)


## Feedback
[Open an issue](https://github.com/mgifford/wsg-mooc/issues/new?title=Feedback%20on%20FED-05) to suggest improvements.