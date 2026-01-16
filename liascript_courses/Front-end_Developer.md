<!--
author: Web Sustainability Guidelines MOOC
email:  info@wsg-mooc.org
version: 1.0.0
language: en
narrator: US English Female

comment:  This course is auto-generated from the WSG MOOC repository.
script:   https://cdn.jsdelivr.net/npm/crypto-js@4.1.1/crypto-js.min.js
style:    ./liascript-overrides.css
-->

<script src="./wsg-learning-journal.js"></script>
<script src="./wsg-liascript-integration.js"></script>

# Front-end Developer Curriculum

**Role Focus**: Front-end Developer

Learn to apply the W3C Web Sustainability Guidelines (WSG) in your daily work.

---


---

## FED-01: Establishing Code Hygiene

### The Decision
"Will I ship this code 'as is', or will I strip it down to its bare essentials first?"




---

### Why It Matters
In a busy sprint, "it works" is often the bar for merging code. But implementation details that are helpful for you (indented whitespace, descriptive comments, verbose wrapper elements) are dead weight to the browser. 

Every extra byte costs electricity to transmit, parse, and render. "Cruft" doesn't just increase bandwidth bills; it forces the user's device to work harder, draining battery and delaying time-to-interactive. Clean, semantic code is not just about philosophy—it is the most fundamental performance optimization you can make.




---

### Common Failure Modes
*   **"Div Soup"**: Using generic `<div>` tags for everything, resulting in a deeply nested DOM that is hard to style, hard to read, and slower to render.
*   **Dev Artifacts in Prod**: Shipping `console.log` statements, commented-out legacy code, or TODO notes to the end user.
*   **Raw Delivery**: Serving files with all their human-readable formatting (newlines, tabs) intact, ballooning file sizes by 30-40%.




---

### "Do This Now" Checklist
1.  **Configure Minification**: Ensure your build process (Webpack, Vite, etc.) is set to aggressively strip whitespace and comments for production builds.
2.  **Validate Markup**: Run your templates through an HTML validator. Fix every unclosed tag and invalid nesting issue—browsers waste CPU cycles "guessing" how to fix broken HTML.
3.  **Semantic Swap**: Identify 3 instances of generic `<div>` wrappers in your current component and replace them with semantic alternatives (`<article>`, `<nav>`, `<aside>`, `<section>`).
4.  **Dead Code Sweep**: Search for and delete any CSS rules or JS functions that are commented out. If you need them later, that's what Git history is for.




---

### Measurement Options
*   **Payload Size**: Compare the `kB` size of your CSS/JS bundles before and after turning on minification.
*   **DOM Depth**: Use browser dev tools to count the depth of your HTML tree. Shallower is faster.




---

### Reflection Prompt
"If a new developer joined the team tomorrow and had to maintain this component, would the semantic tags explain *what* the content is, or would they have to decipher a maze of generic divs?"




---

### References
*   **[WSG-3.2: Minify Your HTML, CSS, and JavaScript](https://w3c.github.io/sustyweb/#WSG-3.2)** - Reduce file sizes by removing unnecessary characters like whitespace and comments
*   **[WSG-3.7: Use HTML Elements Correctly](https://w3c.github.io/sustyweb/#WSG-3.7)** - Employ semantic HTML tags to improve rendering efficiency and accessibility
*   **[STAR-WD02-1: Advanced Minification Strategy](https://w3c.github.io/sustyweb/#STAR-WD02-1)** - Technical guidance for implementing effective code minification
*   **[STAR-WD07-1: Semantic HTML Best Practices](https://w3c.github.io/sustyweb/#STAR-WD07-1)** - Use appropriate HTML elements to improve efficiency and accessibility





---

### Feedback
[Open an issue](https://github.com/mgifford/wsg-mooc/issues/new?title=Feedback%20on%20FED-01) to suggest improvements.


---

### ✓ Question 1

You are reviewing a Pull Request for a blog post component. The developer has used `div` tags for the article title, date, and content  wrapping them in classes like `.article-title`, `.date`. They argue this is faster to style.

[ ] Approve it. As long as it looks right, the tag doesn't matter.
[x] Request changes. Ask them to use `<article>`, `<h1>`, and `<time>` tags to improve rendering efficiency and accessibility.
[ ] Ask them to add `aria-label` to every div to fix the semantics.
[ ] Suggest using a JavaScript framework to render the HTML dynamically.

**Why?**

Generic `div` tags force the browser (and assistive technology) to guess the content structure. Semantic tags provide  "free" meaning and often come with native browser behaviors that save code.

---

### ✓ Question 2

You notice your production CSS file is 400KB. It contains thousands of lines of whitespace, comments, and meaningful variable names (e.g., `--color-primary: blue`).

[ ] Leave it. Identifying variables in production is helpful for debugging.
[x] Minify the file. Removing whitespace and comments is the single easiest way to reduce transfer size without changing behavior.
[ ] Split the file into 10 smaller files so they load in parallel.
[ ] Delete the CSS and use inline styles for everything.

**Why?**

Minification strips "human-readable" characters that the browser doesn't need. It is a standard "Code Hygiene" practice  that directly reduces energy use in transmission and parsing.

---

### 🛠 Assignment

**Goal**: Identify and remove 3 instances of non-semantic markup in your codebase.

#### Steps

1. Scan your latest Pull Request or feature branch.
1. Find `div` or `span` tags acting as buttons, headings, or lists.
1. Refactor them to `<button>`, `<h1>-<h6>`, or `<ul>`.

#### Deliverable

Diff or screenshot of the refactored code.


---

### 💭 Reflection 1

Do you currently run a HTML validator as part of your CI/CD pipeline?

[[___]]

---

### 💭 Reflection 2

Can you distinguish between 'semantic' and 'presentation' markup in your current project?

[[___]]

---

### 💭 Reflection 3

I have confirmed that my build process outputs minified files for production.

[[___]]

---

### 💭 Reflection 4

I have replaced at least 3 generic `<div>` tags with semantic alternatives.

[[___]]

---

### 💭 Reflection 5

I have verified the page contains zero validation errors in the W3C validator.

[[___]]

---

### 💭 Reflection 6

Why do you think 'Div Soup' (nested generic containers) is so common in modern frameworks?

[[___]]

---

## FED-02: Managing Dependencies

### The Decision
"Do I actually need this library, or can I write a 10-line utility function instead?"




---

### Why It Matters
Modern web development often feels like assembling LEGO bricks, but each brick (npm package) comes with a cost. Dependencies can bring transitive bloat, security vulnerabilities, and maintenance debt. A 20kB library might not seem like much on fiber, but on a flaky 3G connection, the parse and compile time alone can block the main thread for hundreds of milliseconds. Sustainable development means treating every external dependency as a liability, not just an asset.




---

### Common Failure Modes
*   **"Component Garden"**: Importing entire UI frameworks just to use a single button or modal component.
*   **"Lodash mainly for one function"**: Importing a massive utility library when modern ES6+ JavaScript can handle the task natively.
*   **"Zombie Dependencies"**: Leaving packages in `package.json` that are no longer referenced in the codebase.
*   **"Version Drift"**: Failing to update dependencies, leaving the site vulnerable and potentially less performant over time.




---

### "Do This Now" Checklist
1.  **Bundle Analysis**: Run a visualization tool (like `webpack-bundle-analyzer` or `source-map-explorer`) to see exactly what is taking up space in your final build.
2.  **Native Replacement**: Identify one utility library (e.g., date formatting, array manipulation) and check if native browser APIs (Intl.DateTimeFormat, Array.prototype) can replace it.
3.  **Tree-Shaking Check**: Verify that your build pipeline effectively discards unused exports from the libraries you do keep.
4.  **Audit Scripts**: Move tracking pixels and non-essential third-party scripts to be deferred or loaded only on interaction, not on initial page load.




---

### Measurement Options
*   **JS Bundle Size**: Track the total KB of JavaScript downloaded on the home page.
*   **Coverage**: Use Chrome [DevTools](https://developer.chrome.com/docs/devtools/) "Coverage" tab to identify the percentage of loaded JS/CSS that is actually used on the current page.




---

### Reflection Prompt
"If this third-party service went offline or introduced a breaking change tomorrow, how much of my application would stop working?"




---

### References
*   **[WSG-3.4: Use Code-Splitting Within Projects](https://w3c.github.io/sustyweb/#WSG-3.4)** - Load only the code needed for each page to reduce initial payload
*   **[WSG-3.14: Develop a Mobile-First Layout](https://w3c.github.io/sustyweb/#WSG-3.14)** - Start with mobile constraints to ensure lightweight experiences across all devices
*   **[WSG-3.16: Ensure Navigation and Way-finding Is Clear](https://w3c.github.io/sustyweb/#WSG-3.16)** - Help users find what they need quickly to reduce wasted page loads
*   **[STAR-WD04-1: Code Splitting Implementation](https://w3c.github.io/sustyweb/#STAR-WD04-1)** - Divide code into chunks that load only when needed
*   **[STAR-WD16-3: Navigation Implementation Best Practices](https://w3c.github.io/sustyweb/#STAR-WD16-3)** - Code efficient, clear navigation systems
*   **[STAR-WD14-2: Mobile-First Development](https://w3c.github.io/sustyweb/#STAR-WD14-2)** - Build for mobile constraints first, enhance for larger screens





---

### Feedback
[Open an issue](https://github.com/mgifford/wsg-mooc/issues/new?title=Feedback%20on%20FED-02) to suggest improvements.


---

### ✓ Question 1

A team member wants to install a 30KB library called `left-pad-super` just to add padding to a string in one component.

[ ] Install it. Developer productivity is more important than file size.
[x] Reject the installation. Write a simple 3-line utility function to handle the padding natively.
[ ] Install it, but use a CDN link instead of bundling it.
[ ] Install a larger library that includes padding plus 50 other features, just in case.

**Why?**

Importing an entire library for a trivial task is "Dependency Bloat". Sustainable development prefers native language features  or small custom functions over heavy external code liabilities.

---

### ✓ Question 2

Your bundle analyzer shows that you are including the entire `lodash` library (70KB), but you are only using the `debounce` function.

[ ] Keep it. Caching handles the file size problem.
[x] Switch to importing only the specific function (e.g., `import debounce from 'lodash/debounce'`) or use a lighter alternative.
[ ] Rewrite the entire application to avoid using debounce.
[ ] Wrap the library in a lazy-load promise so it loads later.

**Why?**

"Tree-shaking" or specific imports ensure you only ship the code you actually use. Shipping dead code wastes bandwidth  and CPU time on parsing bytes that never run.

---

### 💭 Reflection 1

Do you verify the file size of an npm package before installing it?

[[___]]

---

### 💭 Reflection 2

Do you know exactly how many unique JavaScript libraries are loaded on your home page?

[[___]]

---

### 💭 Reflection 3

I have visualized the bundle and identified the largest contributor.

[[___]]

---

### 💭 Reflection 4

I have successfully removed or replaced at least one redundant dependency.

[[___]]

---

### 💭 Reflection 5

I have verified that the application functionality remains unchanged.

[[___]]

---

### 💭 Reflection 6

Is there a library in your stack that you use out of habit rather than necessity?

[[___]]

---

## FED-03: Optimizing Asset Loading

### The Decision
"Does the user need this resource *right now*, or can it wait until they ask for it?"




---

### Why It Matters
The most sustainable data is data that is never transferred. Browsers are aggressive by default—they try to fetch everything linked in the document. As a developer, you know the user's journey better than the browser does. By controlling the loading priority, you ensure that critical content (what the user actually came for) arrives instantly, while secondary content (below-the-fold images, heavy interactive widgets) steps aside, saving bandwidth and energy.




---

### Common Failure Modes
*   **"Eager Everything"**: Loading all images, videos, and scripts immediately on page load, even if they are at the bottom of a long scroll.
*   **"Chain Reactions"**: Loading a script that loads a stylesheet that loads an image—causing a waterfall effect that delays rendering.
*   **"Invisible Heaviness"**: Loading high-res images for mobile users or requesting data for hidden UI tabs "just in case."




---

### "Do This Now" Checklist
1.  **Lazy by Default**: Add `loading="lazy"` to every image and iframe that is not in the initial viewport (above the fold).
2.  **Explicit Priority**: Use `<link rel="preload">` for the single most important asset (hero image or main font) and `rel="prefetch"` for the next likely page navigation.
3.  **Facade Pattern**: Replace heavy third-party widgets (chats, maps, YouTube embeds) with a static "facade" image that only loads the real widget when the user clicks/hovers.
4.  **Async/Defer**: Ensure no script tags in the `<head>` are blocking rendering unless absolutely critical; use `defer` or `async` attributes.




---

### Measurement Options
*   **LCP (Largest Contentful Paint)**: Measure the time it takes for the main content to appear.
*   **Network Requests**: Count the number of requests fired on initial load versus after scrolling to the bottom.




---

### Reflection Prompt
"Am I using the user's data plan to download content they effectively never see?"




---

### References
*   **[WSG-3.8: Use a Design System To Prioritize Interface Consistency](https://w3c.github.io/sustyweb/#WSG-3.8)** - Standardize UI components to reduce code duplication and improve efficiency
*   **[STAR-WD08-1: Design System Architecture](https://w3c.github.io/sustyweb/#STAR-WD08-1)** - Build reusable component libraries for consistency and efficiency
*   **[STAR-WD08-2: Component Reusability Patterns](https://w3c.github.io/sustyweb/#STAR-WD08-2)** - Maximize code reuse through shared UI components





---

### Feedback
[Open an issue](https://github.com/mgifford/wsg-mooc/issues/new?title=Feedback%20on%20FED-03) to suggest improvements.


---

### ✓ Question 1

A stakeholder wants the footer "Partner Logos" carousel to load immediately so users see it, even though it lies 2000px down the page.

[ ] Agree. Stakeholder visibility requirements override performance.
[x] Push back. Implementing `loading='lazy'` ensures the browser prioritizes the critical hero content first. The logos will load when the user scrolls near them.
[ ] Preload the footer images using `<link rel='preload'>` to make them load even faster.
[ ] Make the footer sticky so it is always visible.

**Why?**

Loading invisible resources competes for bandwidth with visible ones. Sustainable loading prioritizes user need (what they see now)  over theoretical need.

---

### ✓ Question 2

You are loading a heavy 3D interactive widget on the homepage. It blocks the main thread for 500ms, making the site freeze during load.

[ ] Leave it. Code is heavy, that's just how the web is.
[x] Replace the widget with a static image (Facade). Only load the real 3D code if the user clicks 'Start 3D Experience'.
[ ] Move the 3D widget to the top of the page so it loads first.
[ ] Hide the page with a white screen until the widget is ready.

**Why?**

The "Facade Pattern" saves massive amounts of data and processing power by assuming the user *might not* want to interact  with the heavy element. It effectively makes the cost "opt-in".

---

### 💭 Reflection 1

Is your 'Above the Fold' content fully visible within 2 seconds on a 3G connection?

[[___]]

---

### 💭 Reflection 2

Do you use the native `loading='lazy'` attribute on images today?

[[___]]

---

### 💭 Reflection 3

I have added `loading='lazy'` to all off-screen images.

[[___]]

---

### 💭 Reflection 4

I have identified the LCP element and ensured it is NOT lazy loaded.

[[___]]

---

### 💭 Reflection 5

I have deferred at least one non-critical script.

[[___]]

---

### 💭 Reflection 6

How does 'perceived performance' (what the user sees) differ from 'actual performance' (when the loading spinner stops)?

[[___]]

---

## FED-04: Adaptive User Interfaces

### The Decision
"Will I force my design choices on the user, or will I listen to what their device is telling me they need?"




---

### Why It Matters
Users configure their devices to suit their health, environment, and battery needs. Some prefer "Dark Mode" to reduce eye strain and OLED power consumption. Others enable "Reduced Motion" to avoid vestibular disorders. Ignoring these signals isn't just an accessibility failing; it's wasteful. An animation that makes a user dizzy or a bright white background that drains their battery against their wishes is a failure of empathy and efficiency.




---

### Common Failure Modes
*   **"Flashbang"**: Ignoring system dark mode preferences, blasting a user with a bright screen in a dark room.
*   **"Motion Sickness"**: Implementing parallax or swooping transitions that cannot be turned off.
*   **"Data Indifference"**: Auto-playing high-res video even when the user has `prefers-reduced-data` active.




---

### "Do This Now" Checklist
1.  **Dark Mode Query**: Implement a rudimentary `prefers-color-scheme: dark` media query that inverts your background and text colors.
2.  **Stop the Motion**: Use `prefers-reduced-motion: reduce` to essentially turn off all non-essential CSS transitions and JavaScript animations.
3.  **Respect Data Saver**: Check the `Save-Data` header or `prefers-reduced-data` query (if supported) to serve lower-res images or disable auto-play features.
4.  **Meta Theme**: Ensure your `<meta name="theme-color">` matches your CSS background to blend the UI with the browser chrome.




---

### Measurement Options
*   **Power Consumption**: While hard to measure directly, testing screen brightness impact on an OLED device provides a proxy.
*   **Manual Testing**: Toggle system settings (Dark Mode, Reduced Motion) and verify the UI adapts instantly without a refresh.




---

### Reflection Prompt
"Is my site fighting against the user's operating system settings, or working in harmony with them?"




---

### References
*   **[WSG-3.12: Ensure Your Solutions Are Accessible](https://w3c.github.io/sustyweb/#WSG-3.12)** - Design and build for accessibility to improve usability and efficiency for all users
*   **[STAR-WD12-1: Accessibility Testing Integration](https://w3c.github.io/sustyweb/#STAR-WD12-1)** - Embed accessibility validation throughout development





---

### Feedback
[Open an issue](https://github.com/mgifford/wsg-mooc/issues/new?title=Feedback%20on%20FED-04) to suggest improvements.


---

### ✓ Question 1

A user visits your site with their OS set to "Dark Mode". Your site currently has a bright white background.

[ ] Do nothing. The brand guidelines clearly state the website background must be white.
[x] Use a CSS media query to invert the colors (dark background, light text), respecting the user's choice and saving energy on OLED screens.
[ ] Show a popup asking them to turn off Dark Mode.
[ ] Invert only the images, but keep the background white.

**Why?**

Respecting `prefers-color-scheme: dark` is a direct energy-saving intervention for OLED devices. It also reduces  eye strain, aligning user health with device health.

---

### ✓ Question 2

Your homepage features a large, looping video background. A user arrives with `prefers-reduced-motion: reduce` enabled.

[ ] Play the video anyway. It's the core emotional hook of the page.
[x] Pause the video automatically. Show a static poster image instead.
[ ] Slow the video down to 50% speed.
[ ] Play the video but blur it slightly.

**Why?**

Reduced motion isn't just about vestibular disorders; it's a signal that the user wants a calmer, less processor-intensive experience.  Stopping auto-play saves significant battery life.

---

### 💭 Reflection 1

Have you ever tested your site with the OS set to 'Dark Mode'?

[[___]]

---

### 💭 Reflection 2

Does your site respect 'Reduce Motion' preferences?

[[___]]

---

### 💭 Reflection 3

I have implemented a basic dark theme using CSS variables.

[[___]]

---

### 💭 Reflection 4

I have verified that text contrast ratios are sufficient in both modes.

[[___]]

---

### 💭 Reflection 5

I have wrapped heavy animations in a `prefers-reduced-motion: no-preference` query.

[[___]]

---

### 💭 Reflection 6

Why is 'Reduced Motion' considered both an accessibility feature AND a sustainability feature?

[[___]]

---

## FED-05: Network & Transfer Efficiency

### The Decision
"How can I ensure that data travels the shortest distance and is packed as tightly as possible?"




---

### Why It Matters
The journey of a byte from a server to a user's device involves routers, switches, cell towers, and massive energy expenditure. Compression and caching are your primary tools to shorten this journey. If a file is compressed, it travels faster and cheaper. If it is cached correctly, it doesn't travel at all after the first visit. This is the "infrastructure" side of front-end development that yields the highest sustainability ROI.




---

### Common Failure Modes
*   **"Text as Image"**: Sending pictures of text instead of actual text, preventing compression.
*   **"Missing Gzip/Brotli"**: Serving plain text (HTML, CSS, JS) without server-side compression enabled.
*   **"Cache Busting Everything"**: Aggressively expiring cache for assets that haven't changed.
*   **"Chatty Protocols"**: Making dozens of small API calls where one aggregated call would suffice.




---

### "Do This Now" Checklist
1.  **Compression Check**: Verify that your web server (Nginx, Apache, Netlify, Vercel) is serving text assets with Brotli (`br`) or Gzip compression.
2.  **Immutable Caching**: Configure your build system to hash filenames (e.g., `main.a1b2c.js`) so you can set `Cache-Control: max-age=31536000, immutable`.
3.  **Service Worker**: (Advanced) Implement a basic Service Worker to cache the application shell and critical assets for offline-first access.
4.  **JSON Trimming**: Audit your API responses. If you only use "name" and "id", ensure the server isn't sending a 50-field user object.




---

### Measurement Options
*   **Transfer Size vs. Resource Size**: In browser [DevTools](https://developer.chrome.com/docs/devtools/) Network tab, compare the "Transferred" size (compressed) vs "Resource" size (uncompressed).
*   **Cache Hit Rate**: Monitor your CDN or server logs to see how many requests are being served from the edge vs. origin.




---

### Reflection Prompt
"When a user returns to my site tomorrow, how many bytes will they have to download again?"




---

### References
*   **[WSG-4.2: Define Clear Organizational Sustainability Goals and Metrics](https://w3c.github.io/sustyweb/#WSG-4.2)** - Establish measurable targets for environmental performance
*   **[WSG-4.3: Assign a Sustainability Representative](https://w3c.github.io/sustyweb/#WSG-4.3)** - Designate someone responsible for driving and tracking sustainability efforts
*   **[STAR-HIS02-1: Identify Sustainability Improvements](https://w3c.github.io/sustyweb/#STAR-HIS02-1)** - Systematically evaluate and prioritize environmental optimization opportunities
*   **[STAR-HIS03-1: Early Sustainability Integration](https://w3c.github.io/sustyweb/#STAR-HIS03-1)** - Incorporate environmental considerations from project inception





---

### Feedback
[Open an issue](https://github.com/mgifford/wsg-mooc/issues/new?title=Feedback%20on%20FED-05) to suggest improvements.


---

### ✓ Question 1

You inspect the HTTP headers for your main JavaScript bundle and see `Content-Encoding` is missing. The file is 500KB.

[ ] This is fine. Broadband connections are fast enough.
[x] Enable Gzip or Brotli compression on the server. This could reduce the transfer size by 60-70%.
[ ] Split the file into two 250KB files.
[ ] Rename the file to .txt so it transfers faster.

**Why?**

Text-based assets (HTML, CSS, JS) are highly compressible. Serving them "raw" is negligent waste of bandwidth.  Compression is the single most effective infrastructure-level optimization.

---

### ✓ Question 2

You update your site logo (an image) once every 3 years. Currently, the browser re-downloads it on every single visit.

[ ] Leave it. Images are cached by default.
[x] Configure `Cache-Control` headers (e.g., `max-age=31536000`) so returning users load it from their disk, not the network.
[ ] Embed the image as base64 in the HTML.
[ ] Make the image smaller so the download creates less impact.

**Why?**

The most sustainable request is the one that never hits the network. Proper caching strategies ensure that unchanging assets  are stored locally (zero carbon cost) rather than fetched repeatedly.

---

### 💭 Reflection 1

Do you know if your server uses Gzip or Brotli compression?

[[___]]

---

### 💭 Reflection 2

Have you configured 'Immutable' caching for your static assets?

[[___]]

---

### 💭 Reflection 3

I have verified the 'Content-Encoding' header in the network tab.

[[___]]

---

### 💭 Reflection 4

I have set long-term cache headers for hashed assets.

[[___]]

---

### 💭 Reflection 5

I have audited the compression ratio of textual assets.

[[___]]

---

### 💭 Reflection 6

Why is caching the 'greenest' form of data transfer?

[[___]]
