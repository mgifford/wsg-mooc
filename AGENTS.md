# AGENTS.md

## Purpose

This file defines the **agent model** for building, maintaining, and evolving the Web Sustainability Guidelines (WSG) role-based MOOC. It explains *who (or what) does what*, how responsibilities are separated, and how automated and human agents collaborate to keep the MOOC accurate, accessible, and pedagogically sound as upstream standards evolve.

This document is intentionally high-level. It is the shared mental model for contributors, reviewers, and automation.

---

## Core Principles

1. **WSG is the source of truth, not the learning surface**
   The MOOC never teaches standards prose directly. It teaches role-based decision-making, with traceable references back to WSG.

2. **Learning is behavior change, not content consumption**
   Every lesson must require an action, a measurement, and a reflection.

3. **Role-based over comprehensive**
   Learners start with what they can act on in their job. Full coverage is optional and cumulative.

4. **Automation detects drift; humans decide intent**
   Agents surface changes and propose fixes. Humans approve meaning.

5. **Accessibility and sustainability are first-class requirements**
   The MOOC itself must meet WCAG 2.2 AA and follow WSG-aligned best practices.

6. **Static-first, auditable, privacy-preserving**
   GitHub Pages, no backend, no accounts. Credentials are verifiable but minimal.

7. **LiaScript as the delivery platform**
   The MOOC leverages LiaScript's built-in features and defaults wherever possible. Where LiaScript capabilities are insufficient (e.g., section pagination, progress tracking, local storage for evidence packs), custom enhancements are built as minimal, standards-compliant additions. Accessibility improvements beyond LiaScript's baseline are implemented when needed to meet WCAG 2.2 AA.

---

## Agent Overview

The system is composed of **human agents** and **automated agents**. Each has a clear scope and explicit limits.

### Human Agents

* **Pedagogy Steward**
  Owns learning design principles, ensures lessons drive real-world behavior change, and prevents the MOOC from becoming a standards dump.

* **Role Steward (per role track)**
  Owns scope decisions for a role (UX, Visual Design, Content, Front-end). Decides what is in or out when WSG evolves.

* **Accessibility Steward**
  Ensures WCAG 2.2 AA compliance of learner-facing content and interactions. Reviews edge cases automation cannot judge.

* **Sustainability Steward**
  Ensures the MOOC itself follows WSG-aligned practices (performance budgets, minimal JS, resilience).

* **Release Steward**
  Decides when upstream changes warrant a MOOC release, partial update, or deferral.

### Automated / LLM-Assisted Agents

These agents do not make final decisions. They prepare evidence, proposals, and diffs.

* **Source Monitor Agent**
  Tracks upstream WSG sources and detects change.

* **Normalization Agent**
  Converts volatile upstream data into a stable internal model.

* **Drift Analysis Agent**
  Compares snapshots and classifies change impact.

* **Content Mapping Agent**
  Maps upstream changes to affected lessons, quizzes, and tracks.

* **Fix Proposal Agent**
  Suggests minimal YAML/Markdown updates to restore correctness.

* **Quality Gate Agent**
  Runs accessibility, link, and consistency checks and reports failures.

* **Certification Issuance Agent**
  Issues Open Badge assertions and publishes verification artifacts.

---

## Source Data Domains (Inputs)

The following sources are monitored and ingested. They are treated as volatile.

* WSG structured data (guidelines, STAR techniques)
* WSG narrative pages (summary, benefits, policies, resources)
* Checklist PDF

Only explicitly declared dependencies are monitored. No implicit coupling.

---

## Internal Content Domains (Owned by the MOOC)

These are authoritative within the MOOC and should not be overwritten automatically.

* Role track definitions (YAML)
* Module sequencing (YAML)
* Learner-facing lessons (Markdown)
* Assignments and quizzes (YAML)
* Translation strings (YAML)
* Badge definitions and criteria

Automation may propose changes, but humans approve them.

---

## Monthly Drift Detection Model

### What Happens Automatically

1. Source Monitor Agent checks upstream sources on a fixed monthly schedule.
2. Normalization Agent produces a deterministic snapshot of required fields.
3. Drift Analysis Agent compares current and previous snapshots.
4. A change report is generated with:

   * Added, removed, modified IDs
   * Semantic drift risks
   * Policy and checklist changes
5. Content Mapping Agent identifies impacted lessons and tracks.

### What Does *Not* Happen Automatically

* Learner-facing prose is not rewritten without review.
* Scope decisions are not changed silently.
* Badges are not reissued retroactively.

---

## Update and Fix Workflow

1. Drift report is published (issue or PR).
2. Fix Proposal Agent suggests YAML/Markdown changes.
3. Role Steward reviews scope and intent.
4. Pedagogy Steward reviews learning impact.
5. Accessibility Steward reviews content changes.
6. Release Steward approves merge.

This ensures accuracy without eroding learning quality.

---

## Pedagogical Loop (Enforced by Agents)

Every lesson must include:

* A **decision context** (job-relevant)
* A **required action** (do something real)
* A **measurement hook** (tool or observation)
* A **reflection prompt** (short, written)

Quality Gate Agent fails builds where any element is missing.

---

## Measurement Philosophy

* Carbon and sustainability tools provide **directional feedback**, not proof.
* Accessibility is validated through a mix of automated checks and human review.
* Progress is learner-owned (local storage, exportable evidence packs).

The system avoids false precision and overstated claims.

---

## Certification Model

* Credentials follow an Open Badges-compatible model.
* Issuance is performed by automation, not learners.
* Verification is public and static.
* Personal data is minimized and protected (hashed identifiers only).

Badges attest to **completion of practical learning**, not compliance or expertise.

---

## Accessibility and Sustainability Obligations

The MOOC itself must:

* Meet WCAG 2.2 AA at all times
* Be usable with keyboard and assistive technologies
* Respect reduced motion and cognitive load
* Minimize page weight and third-party dependencies
* Be resilient and readable on low-end devices

LiaScript provides baseline accessibility support, but additional enhancements may be required:

* **Keyboard navigation** - LiaScript supports keyboard navigation by default; custom components must maintain parity
* **Screen reader compatibility** - Quiz interactions, progress indicators, and navigation breadcrumbs require explicit ARIA labels and role attributes
* **Section pagination** - Custom enhancement to enable sequential navigation through lesson sections (not a LiaScript default)
* **Progress tracking** - Visual progress indicators and completion state stored in browser local storage (built as a LiaScript extension)
* **Reduced motion** - Animations and transitions must respect `prefers-reduced-motion` media queries

Failure to meet these obligations blocks release.

---

## Non-Goals (Explicitly Out of Scope)

* LMS-style user accounts
* Proctored assessments
* Claims of regulatory compliance
* Exhaustive coverage of WSG in a single track
* Server-side data storage

---

## Related Documents

The following documents support and extend this agent model:

### NORMATIVE (Binding)

* **[PEDAGOGY.md](PEDAGOGY.md)** - Learning contract and pedagogical principles that drive all content and assessment decisions. Every agent decision must preserve the pedagogical loop and learning principles defined here.

* **[DESIGN.md](DESIGN.md)** - System architecture and consistency standards. Defines how technical structure, content organization, and build processes implement the pedagogy through agent collaboration. Binding reference for infrastructure decisions.

### INFORMATIVE (Background)

* **[FORMATTING_IMPROVEMENTS.md](FORMATTING_IMPROVEMENTS.md)** - Summary of visual design improvements to quiz pagination and reflection formatting. Documents the rationale for slide design decisions.

* **[SLIDE_DESIGN_FINAL_REPORT.md](SLIDE_DESIGN_FINAL_REPORT.md)** - Detailed analysis of slide design implementation. Reference for understanding current visual standards and quality metrics.

---

## How to Use This File

* Read this before authoring content.
* Reference it when reviewing drift reports.
* Update it only when the operating model changes.

If this file and the system behavior diverge, the file is wrong and must be updated.
