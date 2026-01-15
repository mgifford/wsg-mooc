<!--
author: Web Sustainability Guidelines MOOC
email:  info@wsg-mooc.org
version: 1.0.0
language: en
narrator: US English Female

comment:  This course is auto-generated from the WSG MOOC repository.
-->

# UX Designer Curriculum

> **Role Focus**: UX Designer
>
> Learn to apply the W3C Web Sustainability Guidelines (WSG) in your daily work. 


---

## UXD-01: Validating User Intent

## The Decision
"Does this feature solve a real problem, or are we building it because we *can*?"

## Why It Matters
The most sustainable product is the one you don't build. Countless development hours, server cycles, and storage bytes are wasted on features that users ignore. As a UX Designer, you are the first line of defense against "feature bloat." By ruthlessly validating intent before a single line of code is written, you prevent the creation of digital waste. This isn't just about business ROI; it's about respecting the planetary resources required to build and host software.

## Common Failure Modes
*   **"Solution Looking for a Problem"**: Designing a cool interaction or feature and then trying to justify why users need it.
*   **"Hippo Design"**: Implementing features solely because the Highest Paid Person's Opinion demanded it, without data.
*   **"Feature Parity"**: Copying a competitor's feature without understanding if *your* users actually need it.

## "Do This Now" Checklist
1.  **The "5 Whys"**: For the current feature request, ask "Why?" five times until you reach the root user need. If you can't find one, flag it.
2.  **Paper Prototype**: Test the concept with a sketch or wireframe before any high-fidelity design work begins. Kill the idea cheap.
3.  **Data Audit**: Look at analytics for existing features. Identify one rarely used section and purpose a plan to "sunset" (remove) it.
4.  **User Interviews**: Talk to 3 real users. Ask them about their biggest pain points. If the new feature doesn't address one of them, pause.

## Measurement Options
*   **Adoption Rate**: If the feature is built, what percentage of users actually engage with it?
*   **Feedback Loops**: How quickly can you invalidate a hypothesis? (Days vs. Weeks).

## Reflection Prompt
"If we cancelled this feature today, would any user actually complain?"

## References
*   [WSG-2.2](https://w3c.github.io/sustyweb/#WSG-2.2)
*   [STAR-UX02-1](https://w3c.github.io/sustyweb/#STAR-UX02-1)


## Feedback
[Open an issue](https://github.com/mgifford/wsg-mooc/issues/new?title=Feedback%20on%20UXD-01) to suggest improvements.


---

### ✓ Knowledge Check

Review what you've learned. Multiple attempts encouraged!

**Question 1:** Which of the following is the most sustainable valid reason to build a new feature?

[ ] Competitors have it.
[ ] Stakeholders asked for it.
[x] User research proves it solves a critical problem.
[ ] It utilizes a new technology we want to try.

> **Explanation**: Review 'The Greenest Feature is the One You Don't Build'.

**Question 2:** True or False: A feature that is built efficiently but never used is sustainable.

[ ] True
[x] False

> **Explanation**: Unused code and data squander resources regardless of code quality.


---

### 🛠 Assignment

**Goal**: Select one feature currently in your backlog or product roadmap. Apply the '5 Whys' technique to drill down to the root user need. If you cannot find a documented user need by the 5th 'Why', propose removing or deprioritizing the feature.

#### Steps

1. Identify a feature.
1. Ask 'Why do we need this?' five times.
1. Document the root cause.
1. Recommendation: Verify, Pivot, or Kill.

#### Deliverable

A one-page decision memo.


---

### 💭 Reflection

Take a moment to reflect on what you learned.

**Do you require data/evidence before starting a high-fidelity design?**

[[___]]

**I have identified the primary user problem this feature solves.**

[[___]]

**I have prototyped the solution in low-fidelity first to save resources.**

[[___]]

**Who are the 'stakeholders' that push for features users don't need, and what are their incentives?**

[[___]]

**How much design time do you spend on 'nice-to-haves' versus core tasks?**

[[___]]

**If you could delete one feature from your product today to save energy, what would it be?**

[[___]]

#### Your Commitment

"I will ask 'What is the user evidence for this?' at the start of every new design ticket."

[[I Commit]]


---

## UXD-02: Streamlining Navigation

## The Decision
"How fast can I get the user to their goal, so they can stop using my product?"

## Why It Matters
A user spending 10 minutes confusedly clicking through menus isn't "high engagement"—it's frustration and energy waste. Every page load involves data transfer and device processing. Efficient navigation minimizes the "interaction cost" (mental effort + clicks) required to complete a task. Your goal is to be a helpful concierge, not a labyrinth. The faster users succeed, the less energy they consume.

## Common Failure Modes
*   **"Mystery Meat Navigation"**: Icons or labels that require hovering or clicking to understand what they do.
*   **"Deep Hierarchies"**: Burying critical content 4+ levels deep in a menu structure.
*   **"Broken Search"**: A search bar that returns irrelevant results, forcing the user to manually browse.
*   **"Pogo-sticking"**: Users clicking into a category, realizing it's wrong, going back, and trying another.

## "Do This Now" Checklist
1.  **Card Sort**: Run a quick card sorting exercise (even with colleagues) to verify your menu categories match mental models.
2.  **Breadcrumbs**: Ensure clear "You are here" trails (Breadcrumbs) on deep pages so users can jump back up one level instantly.
3.  **Label Audit**: Rename vague menu items like "Solutions" or "Resources" to be descriptive (e.g., "Developer API", "Case Studies").
4.  **Search Check**: Test your site search with the 5 most common user queries. Do the right pages come up first?

## Measurement Options
*   **Task Time**: Measure the time (seconds) it takes a user to find a specific piece of information.
*   **Click Depth**: What is the average number of clicks to reach content pages from the home page?

## Reflection Prompt
"Am I designing for 'time on site' metrics, or for user success?"

## References
*   [WSG-2.4](https://w3c.github.io/sustyweb/#WSG-2.4)
*   [WSG-2.5](https://w3c.github.io/sustyweb/#WSG-2.5)
*   [STAR-UX04-1](https://w3c.github.io/sustyweb/#STAR-UX04-1)
*   [STAR-UX05-1](https://w3c.github.io/sustyweb/#STAR-UX05-1)
*   [STAR-UX05-2](https://w3c.github.io/sustyweb/#STAR-UX05-2)


## Feedback
[Open an issue](https://github.com/mgifford/wsg-mooc/issues/new?title=Feedback%20on%20UXD-02) to suggest improvements.


---

### ✓ Knowledge Check

Review what you've learned. Multiple attempts encouraged!

**Question 1:** What is 'Interaction Cost'?

[ ] The money users pay to use the site.
[x] The mental and physical effort required to reach a goal.
[ ] The bandwidth cost of loading the menu.

> **Explanation**: Review the Nielsen Norman Group definition of Interaction Cost.

**Question 2:** Which navigation pattern is generally more sustainable?

[x] Broad and shallow (many items, few clicks).
[ ] Deep and narrow (few items, many clicks).

> **Explanation**: Shallow structures reduce page reloads and round-trips.


---

### 🛠 Assignment

**Goal**: Choose a top user task (e.g., 'Contact Support' or 'Buy Product'). Map the current flow path. Count the number of clicks and page loads. Redesign the path to reduce the steps by at least 20%.

#### Steps

1. Select a core user task.
1. Walk the current flow, counting clicks/screens.
1. Sketch a streamlined version.
1. Calculate the theoretical savings.

#### Deliverable

Before/After flow diagram.


---

### 💭 Reflection

Take a moment to reflect on what you learned.

**Can a user reach their goal in 3 clicks or less?**

[[___]]

**I have audited the menu structure for clear, descriptive labels.**

[[___]]

**I have ensured search results are relevant and fast.**

[[___]]

**Is your navigation structured around how *you* view the company, or how the *user* views their problem?**

[[___]]

**What is the 'time cost' of a user getting lost on your site?**

[[___]]

**How does deep nesting affect mobile users on slow connections?**

[[___]]

#### Your Commitment

"I will perform a card-sorting test once a year to verify our IA matches mental models."

[[I Commit]]


---

## UXD-03: Removing Toxic Patterns

## The Decision
"Am I helping the user make a choice, or am I tricking them into making *my* choice?"

## Why It Matters
"Dark Patterns" (or Deceptive Design) exploit cognitive biases to force users into actions they didn't intend—like subscribing to newsletters, buying insurance, or sharing contacts. Beyond the ethical failure, these patterns create waste. They generate unwanted emails (spam), trigger accidental downloads, and force users to spend time (energy) undoing mistakes. Honest design is sustainable design because it respects the user's intent and resources.

## Common Failure Modes
*   **"Roach Motel"**: Easy to sign up, impossible to cancel.
*   **"Confirmshaming"**: "No, I don't want to save money" button text to guilt users.
*   **"Sneak into Basket"**: Automatically adding items or insurance to a cart.
*   **"Privacy Deception"**: Confusing toggle switches where "On" means "Opt-out" (or vice versa).

## "Do This Now" Checklist
1.  **Unsubscribe Test**: Try to delete an account or unsubscribe on your own platform. If it takes more than 3 clicks, redesign it.
2.  **Toggle Clarity**: Review all settings. Ensure "On" implies a positive action or addition, and labels are unambiguous.
3.  **Neutral Language**: Rewrite CTA (Call to Action) / Cancel buttons to be neutral and descriptive ("Subscribe" / "No Thanks"), not manipulative.
4.  **Cart Audit**: verify that the cart total only reflects items the user explicitly clicked "Add" on.

## Measurement Options
*   **Support Tickets**: Monitor complaints related to "I didn't mean to buy this" or "How do I cancel?".
*   **Retention vs. Resentment**: High retention forced by difficult cancellation is not loyalty; it's captivity.

## Reflection Prompt
"Would I be comfortable explaining this interaction flow to my grandmother?"

## References
*   [WSG-2.6](https://w3c.github.io/sustyweb/#WSG-2.6)
*   [WSG-2.7](https://w3c.github.io/sustyweb/#WSG-2.7)
*   [STAR-UX07-1](https://w3c.github.io/sustyweb/#STAR-UX07-1)
*   [STAR-UX04-5](https://w3c.github.io/sustyweb/#STAR-UX04-5)


## Feedback
[Open an issue](https://github.com/mgifford/wsg-mooc/issues/new?title=Feedback%20on%20UXD-03) to suggest improvements.


---

### ✓ Knowledge Check

Review what you've learned. Multiple attempts encouraged!

**Question 1:** You are designing the "Delete Account" flow. A stakeholder argues that making it easy will increase churn.  They suggest adding a requirement to call customer support to finalize the deletion.

[ ] Agree, as reducing churn is the primary business metric.
[ ] Compromise by offering a 'Pause Account' option but keeping the 'Call Support' requirement for deletion.
[x] Push back, arguing that forcing a digital-only user to use an analog channel (phone) creates unnecessary friction and keeps unwanted data on servers.
[ ] Implement the phone requirement but add a tool tip explaining why.

> **Explanation**: This is a "Roach Motel" pattern. It artificially increases the energy and time cost to leave.  Sustainable design allows users to manage their data lifecycle autonomously without arbitrary barriers.

**Question 2:** You are auditing a newsletter signup modal. The subtle text below the "Sign Up" button says "No thanks, I prefer to stay uninformed."  The marketing team says this increased conversion by 2%.

[ ] Keep it. A 2% increase in conversion justifies the tone.
[x] Change the text to a neutral 'No thanks' or 'Close'.
[ ] Make the text smaller so it's less offensive but still works.
[ ] Remove the close option entirely and force a click outside the modal.

> **Explanation**: This is "Confirmshaming". While it may boost short-term metrics, it manipulates users through guilt.  Sustainable UX respects the user's emotional state and intent, building long-term trust over short-term "hacks".

**Question 3:** An e-commerce checkout flow automatically adds "Shipping Insurance" to the cart (checked by default).  Users must uncheck it to opt out.

[ ] Leave it. It protects the user's package and increases average order value.
[x] Change it to 'Opt-in' (unchecked by default), requiring the user to actively select it if they want it.
[ ] Move the checkbox to the end of the page so they see it right before paying.
[ ] Add a second popup asking 'Are you sure?' if they uncheck it.

> **Explanation**: This is the "Sneak into Basket" or "Default Effect" pattern. Pre-checking inputs generates distinct waste—users  buying things they don't want, leading to potential refunds, customer service cycles, and financial waste. Intent should always be explicit.

**Question 4:** You notice a high number of users are accidentally enabling "Share my data with partners" because the toggle switch label  says "Opt-out of data sharing" but the switch is "On".

[ ] Add a second switch to confirm the choice.
[x] Rewrite the label to be positive and direct: 'Allow data sharing', set the switch to 'Off' by default.
[ ] Change the color of the switch to red to indicate danger.
[ ] Leave it, as data sharing is valuable for the business model.

> **Explanation**: This is "Privacy Deception" or confusing logic. Sustainable design minimizes cognitive load and unintentional data transfer.  Ambiguous controls lead to "data pollution"—collecting data users never meant to give.

**Question 5:** You observe that after "simplifying" the unsubscribe flow to a single click, the "Retention Rate" metric dropped by 5%.  The Head of Product wants to revert to the old 4-step process.

[ ] Revert immediately. Retention is the key indicator of product health.
[x] Analyze the 5% who left. If they were inactive/unhappy, argue that their departure is 'healthy pruning' that saves resources.
[ ] Compliment the 4-step process with a 10% discount offer to keep them.
[ ] Hide the unsubscribe button in the footer to reduce visibility.

> **Explanation**: High retention forced by friction is a false signal ("Captivity", not loyalty). Sustainable product management values an active,  engaged user base over a bloated database of users who are only there because they couldn't find the exit.

**Question 6:** A stakeholder asks why the team should invest 2 days in fixing a "Exit Path" (cancellation flow) that generates zero revenue.

[ ] 'It provides feature parity with our competitors.'
[ ] 'It is required by law in some regions, so it is just a compliance task.'
[x] 'Respecting the user's right to leave reduces 'revenge' costs (spam reports, negative reviews) and clears dead data from our systems.'
[ ] 'It will make our designers feel better about their work.'

> **Explanation**: Reframing the exit path as a sustainability and reputation shield is effective. A user trapped in a system generates negative value  (support tickets, spam complaints) and wasted storage cost (dead accounts).


---

### 🛠 Assignment

**Goal**: Select a live digital service (your own or a public one) and map the "Exit Path" for a user trying to unsubscribe, downgrade, or delete their account.  Document every distinct interaction required to achieve the goal.

#### Steps

1. Target URL (e.g., Use a real newsletter unsubscribe link or account settings page)
1. Screen capture tool or Flow mapping tool
1. Screenshots of every modal, confirm dialog, and email verification step.
1. Final Count: Total Clicks + Total Key Presses + Total Page Loads.
1. Assessment: Is this >3x the effort of the Sign-Up process?
1. Estimated Monthly Active Users (use a hypothetical 10,000 if data unavailable)
1. Frequency of unwanted artifact (e.g., 4 emails/month)
1. Size of unwanted artifact (e.g., 50KB per email)
1. Formula: (Users x 10% x Frequency x Size x 12 months) = Total Data Waste (GB).
1. Carbon Equivalent: Convert Total Data Waste to kgCO2e using 0.81 kWh/GB (standard estimate).

---

### 💭 Reflection

Take a moment to reflect on what you learned.

**Have you ever audited your product's cancellation flow yourself?**

[[___]]

**Does your defined 'Happy Path' include users leaving the service?**

[[___]]

**I have confirmed that the 'Exit' action is visible without scrolling.**

[[___]]

**I have ensured the language used is neutral (e.g., 'Cancel Subscription' instead of 'Lose My Benefits').**

[[___]]

**I have removed any step that requires contacting support for a purely digital transaction.**

[[___]]

**What internal pressure (revenue goals, retention metrics) motivates the specific dark patterns you found?**

[[___]]

**How can you reframe 'easy exit' as a brand value to your stakeholders?**

[[___]]


---

## UXD-04: Designing Efficient Forms

## The Decision
"Do we absolutely need this piece of data, or are we just hoarding it 'in case'?"

## Why It Matters
Forms are friction. Every extra field increases the cognitive load on the user and the likelihood of abandonment. On a technical level, data collection has a tail: it must be validated, transmitted, processed, stored, backed up, and secured—forever. Collecting data you don't use is a liability. Sustainable forms ask for the minimum necessary information to complete the transaction.

## Common Failure Modes
*   **"Nice to Have"**: Asking for phone numbers or birthdays when they aren't needed for the service.
*   **"Strict Formatting"**: Forcing users to manually format phone numbers or dates instead of handling it in code.
*   **"Reset Rage"**: Clearing the entire form if one field has a validation error.
*   **"Dropdown Fatigue"**: Using massive select lists for things (like Country) that could be auto-detected or predictive.

## "Do This Now" Checklist
1.  **Field Audit**: Review your longest form. Remove any field that isn't strictly required for the immediate task.
2.  **Smart Defaults**: Pre-fill known information (city/state based on ZIP, user name if logged in).
3.  **Inline Validation**: Show errors immediately after the field loses focus, not after the "Submit" button is clicked.
4.  **Autofill Support**: Ensure every input has the correct `autocomplete` attribute so browsers can fill it instantly.

## Measurement Options
*   **Completion Rate**: What percentage of users who start the form actually finish it?
*   **Time to Completion**: Average time spent filling out the form.

## Reflection Prompt
"If I had to pay $1.00 for every field I asked the user to fill out, which ones would I keep?"

## References
*   [WSG-2.15](https://w3c.github.io/sustyweb/#WSG-2.15)
*   [STAR-UX15-1](https://w3c.github.io/sustyweb/#STAR-UX15-1)


## Feedback
[Open an issue](https://github.com/mgifford/wsg-mooc/issues/new?title=Feedback%20on%20UXD-04) to suggest improvements.


---

### ✓ Knowledge Check

Review what you've learned. Multiple attempts encouraged!

**Question 1:** Why is asking for a phone number when it's not needed an issue?

[ ] It creates privacy risk.
[ ] It increases friction and dropout rates.
[x] Both of the above.

> **Explanation**: Data minimization protects users and improves conversion.

**Question 2:** Which input type is best for entering a credit card expiry date?

[ ] Three separate dropdowns (Day/Month/Year).
[x] A single text input with automatic formatting.

> **Explanation**: Native inputs usually perform better than custom dropdowns for data entry speed.


---

### 🛠 Assignment

**Goal**: Take an existing form on your site. For every field, write down who uses the data and what happens if it is deleted. Remove any field that lacks a clear downstream consumer.

#### Steps

1. Inventory all fields.
1. Identify the data consumer for each.
1. Remove 'nice to have' fields.
1. Prototype the shortened form.

#### Deliverable

Annotated screenshot and rationalization table.


---

### 💭 Reflection

Take a moment to reflect on what you learned.

**Do you know exactly why you collect every field in your sign-up form?**

[[___]]

**I have removed at least one optional field.**

[[___]]

**I have enabled autocomplete on all inputs.**

[[___]]

**What 'legacy data' are you collecting that no one looks at anymore?**

[[___]]

**How does a long form impact a user with anxiety or a motor impairment?**

[[___]]

**Does marketing actually use the demographic data you force users to provide?**

[[___]]

#### Your Commitment

"I will challenge every new input field request with: 'How will this improve the user's immediate experience?'"

[[I Commit]]


---

## UXD-05: Scaling Consistency

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


---

### ✓ Knowledge Check

Review what you've learned. Multiple attempts encouraged!

**Question 1:** How does a design system reduce carbon emissions?

[ ] It uses greener colors.
[x] It reduces code duplication and development churn.
[ ] It forces users to upgrade their devices.

> **Explanation**: Reusability is the core sustainability benefit.

**Question 2:** When should you break from the design system?

[ ] Whenever you feel creative.
[x] When user research proves the standard component fails the specific need.

> **Explanation**: Consistency builds trust; deviation requires justification.


---

### 🛠 Assignment

**Goal**: Audit your product for *one* common element (e.g., primary buttons, date pickers, or headers). Screenshot every variation you find. Group them by similarity. Propose a single standard.

#### Steps

1. Choose a component.
1. Hunt for inconsistencies across the site.
1. Collage them onto one canvas.
1. Define the single source of truth.

#### Deliverable

The 'Wall of Shame' collage and the proposed fix.


---

### 💭 Reflection

Take a moment to reflect on what you learned.

**Do you have a shared component library with developers?**

[[___]]

**I have consolidated button styles to a core set.**

[[___]]

**I have defined a spacing system to reduce random pixel values.**

[[___]]

**Why do designers feel the urge to reinvent common patterns (like inputs) for every project?**

[[___]]

**How much CSS bloat is caused by 'detached' design components that act like one-offs?**

[[___]]

**Can a strict design system actually liberate you to focus on bigger UX problems?**

[[___]]

#### Your Commitment

"I will use standard components for 90% of the UI and only break the system for high-impact innovation."

[[I Commit]]

