<!--
author: Web Sustainability Guidelines MOOC
email:  info@wsg-mooc.org
version: 1.0.0
language: en
narrator: US English Female

comment:  This course is auto-generated from the WSG MOOC repository.
-->

# Visual Designer Curriculum

> **Role Focus**: Visual Designer
>
> Learn to apply the W3C Web Sustainability Guidelines (WSG) in your daily work. 


---

## VIS-01: Setting the Weight Budget

### The Decision
"How much 'data cost' can we afford to spend on this page before it becomes too slow or expensive for the user?"




---

### Why It Matters
Visual assets (images, fonts, videos, Lottie files) account for the vast majority of page weight. Without a budget, these assets tend to grow indefinitely until the site becomes unusable on non-fiber connections. A defined "Page Weight Budget" is a collaborative contract between design and engineering. It forces creative constraints that foster innovation—"If I want this full-screen video background, I have to cut the carousels."




---

### Common Failure Modes
*   **"Infinity Scroll"**: Designing long pages with dozens of high-res images without considering total load size.
*   **"Retina Everything"**: Exporting all assets at @3x resolution assuming everyone is on a high-end MacBook.
*   **"It looks fine on my machine"**: Testing designs only on studio Wi-Fi and powerful workstation desktops.




---

### "Do This Now" Checklist
1.  **Baseline Target**: Set a hard limit for initial load (e.g., 1.5MB total).
2.  **Asset Allocation**: Break that budget down: 300KB for JS, 100KB for CSS, 100KB for Fonts, leaving ~1MB for Images/Media.
3.  **Export Review**: check the file size of your design exports *before* handing them off. If a hero image is 800KB, it's already broken the budget.
4.  **Device Testing**: Open your current production site on a phone, switch to 4G (or throttle in [DevTools](https://developer.chrome.com/docs/devtools/)), and feel the weight.




---

### Measurement Options
*   **Total Page Weight**: Measure in KB/MB via tools like [SpeedCurve](https://speedcurve.com/) or [Lighthouse](https://developer.chrome.com/docs/lighthouse/overview/).
*   **Speed Index**: How quickly is the content visually populated?




---

### Reflection Prompt
"Is this graphic worth the 3 seconds of load time it will cost the user on the train?"




---

### References
*   **[STAR-WD01-1: Code Minification Techniques](https://w3c.github.io/sustyweb/#STAR-WD01-1)** - Remove whitespace, comments, and unnecessary characters from code





---

### Feedback
[Open an issue](https://github.com/mgifford/wsg-mooc/issues/new?title=Feedback%20on%20VIS-01) to suggest improvements.


---

### ✓ Question 1

What is a 'Performance Budget'?

[ ] The money spent on hosting.
[x] A limit on valid page size (e.g., < 1MB) defined before design begins.

**Why?**

Budgets prevent 'bloat creep' during the project.

---

### ✓ Question 2

Who is responsible for the weight budget?

[ ] Only the developers.
[x] Designers sets the constraints, developers implement them.

**Why?**

Design decisions (like full-screen video) dictate the technical floor.

---

### 🛠 Assignment

**Goal**: Calculate a realistic performance budget for your next project based on a target 3G network speed (1.6 Mbps) and a 3-second load time goal. Break it down by asset type (HTML, CSS, JS, Images, Fonts).

#### Steps

1. Use a budget calculator (e.g., [performancebudget.io](https://performancebudget.io)).
1. Set the total limit (e.g. 600KB).
1. Allocate slices to each asset type.
1. Compare against your current portfolio site.

#### Deliverable

A spreadsheet or table showing your performance budget breakdown by asset type (HTML, CSS, JS, Images, Fonts) with specific byte limits for each category.


---

### 💭 Reflection 1

Do you personally check the total file size of your designs before handoff?

[[___]]

---

### 💭 Reflection 2

I have established a maximum weight (e.g., 1.5MB) for this page.

[[___]]

---

### 💭 Reflection 3

I removed visual elements that exceeded the budget.

[[___]]

---

### 💭 Reflection 4

Why is 'high resolution' often prioritized over 'fast loading' in design portfolios?

[[___]]

---

### 💭 Reflection 5

How does a heavy page affect a user on a metered connection in a rural area?

[[___]]

---

### 💭 Reflection 6

Can a design be 'beautiful' if it is unusable due to slowness?

[[___]]

---

### 💭 Your Commitment

I will define a performance budget (KB limit) before adding the first pixel to the canvas.

[[I Commit]]

---

## VIS-02: Typography Strategy

### The Decision
"Do we need five different weights of this custom font, or can we express hierarchy with size and color?"




---

### Why It Matters
Custom web fonts are expensive assets. A single font file (e.g., Roboto-Bold-Italic) can be 40-100KB. Loading a font family with Regular, Bold, Semibold, Light, and Italics for each can easily add half a megabyte to the critical rendering path, causing "Flash of Invisible Text" (FOIT) where the user stares at a blank screen waiting for letters to download. Sustainable typography balances brand identity with performance.




---

### Common Failure Modes
*   **"All the Weights"**: Importing the entire font family "just in case" we need a specific weight later.
*   **"System Font Phobia"**: Refusing to use performant system fonts (San Francisco, Segoe UI, Roboto) for UI text/body copy.
*   **"Unoptimized Formats"**: Serving legacy `.ttf` files instead of modern compressed `.woff2`.




---

### "Do This Now" Checklist
1.  **System UI**: Switch body copy or administrative UI text to use System Fonts stack. It loads instantly (0KB).
2.  **Subset**: Reduce custom font usage to 2-3 variants max (e.g., Regular, Bold).
3.  **Variable Fonts**: Investigate if your chosen typeface has a "Variable Font" version. This bundles all weights into a single, often smaller, file.
4.  **Display Only**: Reserve heavy custom fonts only for headings (H1, H2) where they have the most visual impact.




---

### Measurement Options
*   **Font Payload**: Total KB of all font files loaded.
*   **FOIT/FOUT**: Observation of how text renders on slow connections (does it blink in or swap styles?).




---

### Reflection Prompt
"Does the user's reading experience actually improve with this custom font, or is it just brand vanity?"




---

### References
*   **[WSG-2.13: Ensure Your Solutions Are Accessible](https://w3c.github.io/sustyweb/#WSG-2.13)** - Design and build for accessibility to improve usability and efficiency for all users
*   **[STAR-UX13-1: Mobile-First Design Approach](https://w3c.github.io/sustyweb/#STAR-UX13-1)** - Start with mobile constraints to ensure efficiency across devices
*   **[STAR-UX13-2: Progressive Enhancement Strategy](https://w3c.github.io/sustyweb/#STAR-UX13-2)** - Build core functionality first, enhance for capable devices





---

### Feedback
[Open an issue](https://github.com/mgifford/wsg-mooc/issues/new?title=Feedback%20on%20VIS-02) to suggest improvements.


---

### ✓ Question 1

Which font format typically offers the best compression for modern browsers?

[ ] TTF
[x] WOFF2
[ ] EOT

**Why?**

WOFF2 compresses ~30% better than WOFF.

---

### ✓ Question 2

What is the primary benefit of Variable Fonts?

[ ] They look better.
[x] They allow multiple weights/styles in a single file request.

**Why?**

One file request reduces latency overhead.

---

### 🛠 Assignment

**Goal**: Analyze a live website. List every font file downloaded. Calculate the total size. Propose a reduction plan involving subsetting, removing weights, or switching to system fonts.

#### Steps

1. Open Network Tab -> Fonts.
1. Sum the transfer sizes.
1. Identify unused characters or styles.
1. Redesign the typography stack to save 50%.

#### Deliverable

Before/After weight calculation.


---

### 💭 Reflection 1

Can you list every font file and weight currently loading on your homepage?

[[___]]

---

### 💭 Reflection 2

I have removed unused weights (e.g., Bold Italic) from the load list.

[[___]]

---

### 💭 Reflection 3

I have considered using system fonts for UI elements.

[[___]]

---

### 💭 Reflection 4

Does the user really notice the difference between 'Lato' and 'Open Sans' in body text?

[[___]]

---

### 💭 Reflection 5

What is the environmental cost of loading 5 different font files on every page view?

[[___]]

---

### 💭 Reflection 6

How does variable font technology change the trade-off?

[[___]]

---

### 💭 Your Commitment

I will limit my design to 2 font families and maximum 3 weights per page.

[[I Commit]]

---

## VIS-03: Optimizing Image Assets

### The Decision
"Is this image serving the right format for its content, or is it a PNG trying to do a JPEG's job?"




---

### Why It Matters
Images are often the heaviest single elements on a page. The wrong format choice can balloon file size by 10x without any perceptible quality difference. A photograph saved as a PNG is wasteful. A vector icon saved as a JPEG is blurry and heavy. Sustainable visual design involves understanding the technical strengths of each format: AVIF/WebP for photos, SVG for icons and illustrations.




---

### Common Failure Modes
*   **"PNG Photos"**: Using PNG for photographs, resulting in massive files. Use JPG or WebP/AVIF.
*   **"Rasterized Icons"**: Saving logos or icons as pixel bitmaps instead of crisp, tiny SVGs.
*   **"Oversized Dimensions"**: Uploading a 4000px wide image for a slot that is only ever 800px wide.




---

### "Do This Now" Checklist
1.  **Format Audit**: Check your last 5 designs. Photos -> AVIF/WebP. Icons/Logos -> SVG.
2.  **SVG Clean**: Open an SVG file in a text editor. If you see mountains of metadata code, use a tool like SVGO (SVGOMG) to strip the junk.
3.  **Modern Formats**: Instruct developers to implementation `<picture>` tags that serve AVIF to modern browsers and fallback to JPG.
4.  **Blur Test**: Compress a hero image to 80% quality, then 60%. Can you actually tell the difference at normal viewing distance? Lower the setting until it breaks, then step back one.




---

### Measurement Options
*   **Image Weight**: Total KB of images on the page.
*   **[Lighthouse](https://developer.chrome.com/docs/lighthouse/overview/) Audit**: check the "Properly size images" and "Serve images in next-gen formats" warnings.




---

### Reflection Prompt
"Could this 1MB photograph be replaced by a 5KB SVG illustration and tell the same story?"




---

### References
*   **[WSG-2.11: Avoid Unnecessary or an Overabundance of Assets](https://w3c.github.io/sustyweb/#WSG-2.11)** - Only include images, fonts, and scripts that directly serve user needs
*   **[WSG-2.14: Create a Lightweight Experience by Default](https://w3c.github.io/sustyweb/#WSG-2.14)** - Design with performance budgets and minimal asset loading from the start
*   **[STAR-UX14-3: Navigation Clarity Testing](https://w3c.github.io/sustyweb/#STAR-UX14-3)** - Validate that users can find what they need efficiently





---

### Feedback
[Open an issue](https://github.com/mgifford/wsg-mooc/issues/new?title=Feedback%20on%20VIS-03) to suggest improvements.


---

### ✓ Question 1

Which format is best for a flat icon or logo?

[ ] JPG
[ ] PNG
[x] SVG

**Why?**

Vectors (SVG) are resolution-independent and usually tiny.

---

### ✓ Question 2

True or False: You should upload the highest quality image possible and let the browser resize it.

[ ] True
[x] False

**Why?**

Browsers still download the full file. Resize on the server or build time.

---

### 🛠 Assignment

**Goal**: Take 3 unoptimized images (a photo, a transparent logo, a screenshot). Optimize them using modern formats (WebP/AVIF) and tools ([Squoosh](https://squoosh.app/) / [ImageOptim](https://imageoptim.com/)). Aim for visual purity but minimal size.

#### Steps

1. Gather source assets.
1. Record starting file sizes.
1. Process them.
1. Record ending file sizes.

#### Deliverable

Table showing % reduction achieved (aim for >60%).


---

### 💭 Reflection 1

Do you export images at 2x/3x retina resolution by default?

[[___]]

---

### 💭 Reflection 2

I have chosen the correct format (SVG for vectors, JPG/WebP for photos).

[[___]]

---

### 💭 Reflection 3

I have run all assets through a compression tool (tinypng, imageoptim) before handoff.

[[___]]

---

### 💭 Reflection 4

Why do we keep full-resolution master files on the live web server?

[[___]]

---

### 💭 Reflection 5

Is a transparent PNG always clearer than a JPG with a matching background color?

[[___]]

---

### 💭 Reflection 6

How does image weight interact with CO2 emissions?

[[___]]

---

### 💭 Your Commitment

I will compress every single image asset and choose next-gen formats (WebP/AVIF) where possible.

[[I Commit]]

---

## VIS-04: Designing for Energy Saving

### The Decision
"Am I designing a screen that drains battery, or one that sips it?"




---

### Why It Matters
On OLED screens (most modern phones and high-end laptops), black pixels turn off completely. White pixels run at full power. A predominantly bright white interface consumes significantly more energy than a dark one. Designing with energy in mind means offering Dark Mode not just as an aesthetic choice, but as an environmental one.




---

### Common Failure Modes
*   **"Brand Lock"**: "Our brand color is bright orange, so the background must be bright orange."
*   **"Ignored States"**: Designing the "Light Mode" perfectly but leaving "Dark Mode" to an automated (and often ugly) inversion algorithm.
*   **"Blue Light"**: Excessive use of bright blue light content which can disrupt circadian rhythms (though this is more health than energy).




---

### "Do This Now" Checklist
1.  **Dark Mode Palette**: Define a specific dark-theme palette. Don't use pure black (#000000) for backgrounds (which can cause smearing); use very dark gray (#121212).
2.  **Asset Handling**: Ensure your icons and logos have transparent backgrounds so they work on dark themes.
3.  **Contrast Check**: Verify that your text contrast ratios meet WCAG AA limitations in *both* Light and Dark modes.
4.  **OLED Optimization**: Consider using true blacks for video borders or inactive areas to maximize pixel-off states.




---

### Measurement Options
*   **Color Analysis**: Tools exist to estimate the energy consumption of a specific color palette on OLED screens.




---

### Reflection Prompt
"Is my design forcing the user's phone to act as a flashlight?"




---

### References
*   **[WSG-3.12: Ensure Your Solutions Are Accessible](https://w3c.github.io/sustyweb/#WSG-3.12)** - Design and build for accessibility to improve usability and efficiency for all users
*   **[STAR-WD12-1: Accessibility Testing Integration](https://w3c.github.io/sustyweb/#STAR-WD12-1)** - Embed accessibility validation throughout development





---

### Feedback
[Open an issue](https://github.com/mgifford/wsg-mooc/issues/new?title=Feedback%20on%20VIS-04) to suggest improvements.


---

### ✓ Question 1

Which screen technology benefits most from Dark Mode energy savings?

[ ] LCD
[x] OLED
[ ] CRT

**Why?**

OLED pixels turn off completely for true black, saving energy.

---

### ✓ Question 2

Why is pure blue (#0000FF) problematic for energy efficiency?

[x] Blue pixels consume significantly more power than red or green.
[ ] It isn't.

**Why?**

Blue light generation is less efficient in current display tech.

---

### 🛠 Assignment

**Goal**: Take a bright, high-key interface design. Create a dark mode variant that ensures accessible contrast ratios. ensure it uses true blacks or very dark greys.

#### Steps

1. Select a light mode screen.
1. Invert the palette sensibly.
1. Check WCAG contrast for text.
1. Test on a mobile device if possible.

#### Deliverable

Side-by-side Light vs Dark comparison.


---

### 💭 Reflection 1

Does your design include a true dark mode (not just inverted colors)?

[[___]]

---

### 💭 Reflection 2

I have provided a 'Dark Mode' option that respects system preferences.

[[___]]

---

### 💭 Reflection 3

I have avoided pure white (#FFFFFF) backgrounds on large areas where possible.

[[___]]

---

### 💭 Reflection 4

How much battery life can a dark theme save on an OLED screen?

[[___]]

---

### 💭 Reflection 5

Is 'Dark Mode' just an aesthetic trend or an accessibility/sustainability necessity?

[[___]]

---

### 💭 Reflection 6

Does your color palette rely on brightness levels that force screens to max power?

[[___]]

---

### 💭 Your Commitment

I will design a dark mode variant for every interface to support energy saving and eye health.

[[I Commit]]

---

## VIS-05: Responsible Animation

### The Decision
"Does this motion convey meaning, or is it just decoration?"




---

### Why It Matters
Animation is computationally expensive. It triggers the CPU and GPU to repaint the screen 60 (or 120) times per second. Continuous, loops animations (like background ambient videos or auto-playing carousels) prevent the device from going into low-power idle states. They keep the processor revving. Sustainable design treats motion as a spice, not a main course—used sparingly to guide the eye or provide feedback, then stopping immediately.




---

### Common Failure Modes
*   **"Auto-Play Everything"**: Videos that start playing (and downloading) without user consent.
*   **"Infinite Loops"**: Lottie files or CSS animations that loop forever, burning battery even when the user isn't interacting.
*   **"Parallax Overload"**: JavaScript-heavy scroll effects that cause "jank" and heat up phones.




---

### "Do This Now" Checklist
1.  **Toggle Switch**: Does the design allow for a "Pause" button on any auto-moving content? (Crucial for accessibility too).
2.  **Interaction Trigger**: Change animations to run *only* on interaction (hover/click) rather than continuously.
3.  **The 5-Second Rule**: If it must auto-play, ensure it stops after 5 seconds.
4.  **Hardware Acceleration**: Ensure developers implement animations using CSS Transform/Opacity (cheap) rather than Top/Left/Width (expensive).




---

### Measurement Options
*   **CPU Usage**: Monitor Chrome Task Manager during the animation.
*   **Frame Rate**: Does the animation maintain 60fps on a low-end device?




---

### Reflection Prompt
"If I removed this animation, would the interface still make sense? If yes, should it be there?"




---

### References
*   **[WSG-2.12: Ensure Navigation and Way-finding Is Clear](https://w3c.github.io/sustyweb/#WSG-2.12)** - Help users find what they need quickly to reduce wasted page loads
*   **[STAR-UX11-1: Motion Reduction Best Practices](https://w3c.github.io/sustyweb/#STAR-UX11-1)** - Respect user preferences and minimize unnecessary animations





---

### Feedback
[Open an issue](https://github.com/mgifford/wsg-mooc/issues/new?title=Feedback%20on%20VIS-05) to suggest improvements.


---

### ✓ Question 1

What is the CPU impact of continuous Javascript-based animation?

[ ] Negligible.
[x] High; it prevents the processor from idling.

**Why?**

It keeps the CPU awake, draining battery.

---

### ✓ Question 2

Who needs a 'Stop Animation' button?

[x] People with vestibular disorders.
[ ] People with slow internet.

**Why?**

Motion triggers nausea for some users.

---

### 🛠 Assignment

**Goal**: Identify every moving element on your homepage. Classify them as 'Essential' (conveys data) or 'Decor' (delight). Create a plan to pause or remove the 'Decor' items.

#### Steps

1. Watch the page load.
1. List all animations.
1. Check for 'prefers-reduced-motion' support.
1. Code a patch to disable decor if that flag is true.

#### Deliverable

Motion audit list.


---

### 💭 Reflection 1

Does the animation play automatically without user interaction?

[[___]]

---

### 💭 Reflection 2

I have ensured all animation stops after 5 seconds or has a pause button.

[[___]]

---

### 💭 Reflection 3

I have designed a static state for 'prefers-reduced-motion'.

[[___]]

---

### 💭 Reflection 4

Is this animation conveying information, or just 'delight'?

[[___]]

---

### 💭 Reflection 5

How does continuous WebGL or CSS animation affect CPU usage and battery?

[[___]]

---

### 💭 Reflection 6

Who is excluded when we rely on motion to signal state changes?

[[___]]

---

### 💭 Your Commitment

I will use motion only for user feedback, never for decoration, and always respect reduced-motion settings.

[[I Commit]]
