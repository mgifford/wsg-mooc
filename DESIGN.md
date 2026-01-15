# DESIGN.md - System Architecture & Design Philosophy

## Purpose

This document describes how the WSG MOOC is designed, built, and maintained. It connects three foundational documents:

- **PEDAGOGY.md** - *Learning principles and the pedagogical contract*
- **AGENTS.md** - *Who (human or automated) does what and how responsibilities are separated*
- **DESIGN.md** (this file) - *How technical structure, content organization, and consistency standards implement pedagogy through agent collaboration*

## Design Principle: Pedagogy Drives Structure

The MOOC's technical architecture exists exclusively to enforce the pedagogical contract defined in PEDAGOGY.md. Every design decision—from file organization to build processes to visual formatting—serves one of these core principles:

1. **Role-Specific Relevance** → Content is filtered by ARRM roles; structure allows parallel track management
2. **Action Over Theory** → Content includes required action, measurement, reflection; structure supports this loop
3. **The Pedagogical Loop** → Structure captures context → action → measure → reflect; agents enforce this pattern
4. **Evidence-Based Progress** → Local-first; structure avoids accounts/backends; agents verify completion locally
5. **Sustainability as Quality** → Structure integrates WSG source truth; agents detect drift automatically
6. **Source-Truth Alignment** → Normalized snapshots of WSG; agents monitor and propose updates

---

## Content Structure & Pedagogy Alignment

### Role-Based Organization

```
courses/
├── Front-end Developer track
├── UX Designer track  
├── Visual Designer track
└── Content Author track
```

**Pedagogy Link**: Principle #1 (Role-Specific Relevance)  
**Agent Owner**: Role Steward (per track) - makes scope decisions  
**Why This Structure**: Learners engage only with decisions they can influence in their job

### Module-Lesson-Section Hierarchy

```yaml
MODULES.yaml
├── Module ID (e.g., FED-01)
│   ├── Learning Objective
│   ├── Why It Matters (context)
│   └── Lessons (1-3 per module)
│       ├── Lesson content (Markdown)
│       ├── Quiz (YAML)
│       ├── Assignment (YAML)
│       └── Reflection (YAML)
```

**Pedagogy Link**: The Pedagogical Loop (principles #2, #3, #4)
- **Context** → Why It Matters section
- **Action** → Assignment with steps
- **Measurement** → Quiz (diagnostic) + Assignment deliverable
- **Reflection** → Reflection prompts with commitment

**Agent Owners**:
- Pedagogy Steward - ensures loop integrity
- Role Steward - decides scope within role
- Content Mapping Agent - tracks which source changes affect which lessons

### Page-Level Design (Slide Format)

```
Page = One "learning moment" (typically 400-600 words)
├── Lesson content (principles, context)
├── Interactive assessment (quiz question OR reflection prompt)
└── Clear call-to-action (next page)
```

**Pedagogy Link**: Reduced cognitive load, one idea per page  
**Technical Implementation**: Page breaks (`---`) in LiaScript markdown  
**Why**: Mobile-friendly, maintains focus, prevents scrolling within a decision point  
**Agent Owners**:
- Pedagogy Steward - ensures one idea per page
- Quality Gate Agent - fails builds with too-long pages

---

## Assessment Structure & Pedagogy Alignment

### Quiz (Knowledge Check)
- **Format**: Multiple-choice; select the most professional choice
- **Pedagogy Link**: Principle #2 (Action Over Theory)
- **Pattern**: Present a real decision scenario → learner chooses professional path → explanation reinforces WSG alignment
- **NOT Allowed**: Recall-based questions ("What does WSG say...?")
- **Measurement**: Each question is a diagnostic tool; multiple attempts encouraged

**Build Implementation** (scripts/convert_to_liascript.js):
- Extracts questions from `content/quizzes/[ID].yaml`
- Generates one page per question with page break
- Question format: `### ✓ Question N` (checkmark emoji for visual distinction)
- Explanation under bold "Why?" header

### Assignment (Do This Now)
- **Format**: Structured task with steps, deliverable, and measurement
- **Pedagogy Link**: Principles #2, #3, #4 (Action Loop)
- **Pattern**: Goal → Steps → Deliverable (evidence of completion)
- **Examples**: Audit a page, compress an image, rewrite a policy, run a tool
- **Measurement**: Learner records "Before" and "After" evidence

**Build Implementation**:
- Extracts from `content/assignments/[ID].yaml`
- Sections: Goal, Steps, Deliverable
- Steps are numbered for clear sequence
- Success criteria are explicit

### Reflection (Internalization)
- **Format**: Open-ended prompt with optional commitment
- **Pedagogy Link**: Principle #3 (The Pedagogical Loop - Reflect phase)
- **Pattern**: Prompt → Text input → Optional commitment to future action
- **Examples**: "What friction did you encounter?", "How will you apply this in your next project?"
- **Measurement**: Local storage (no backend); learner self-verifies completion

**Build Implementation**:
- Extracts from `content/reflections/[ID].yaml`
- Generates one page per prompt with page break
- Reflection format: `### 💭 Reflection N` (thinking emoji for distinction)
- Input field: `[[___]]` (LiaScript text input)

---

## Data Model & Consistency Standards

### File Organization

```
content/
├── lessons/
│   ├── FED-01.md (primary lesson markdown)
│   ├── FED-02.md
│   └── ...
├── quizzes/
│   ├── FED-01.yaml (structured quiz questions)
│   └── ...
├── assignments/
│   ├── FED-01.yaml (structured tasks)
│   └── ...
└── reflections/
    ├── FED-01.yaml (structured prompts)
    └── ...

MODULES.yaml (master index of all modules and lessons)
TRACKS.yaml (role-based track definitions)
GLOSSARY.yaml (just-in-time learning support)
```

**Consistency Standards**:
1. **File Naming**: ID must match MODULES.yaml exactly
2. **Metadata**: Each lesson has clear learning objective
3. **Completeness**: Every module has quiz + assignment + reflection
4. **Pagination**: Lesson breaks into pages at H2 headers (one section = one page)
5. **YAML Structure**: Strict schema for quizzes, assignments, reflections

**Agent Owners**:
- Quality Gate Agent - validates file naming, completeness, structure
- Content Mapping Agent - tracks source-to-lesson relationships

### Glossary for Just-In-Time Support

```yaml
GLOSSARY.yaml
└── Terms (18+)
    ├── Plain-language definition
    ├── Learn more link (to WSG)
    └── Examples (optional)
```

**Pedagogy Link**: Principle #1 (Role-Specific Relevance)  
**Why**: Novices need quick term lookups without leaving the lesson  
**Agent Owners**: Accessibility Steward (ensures clarity)

---

## Build Pipeline & Agent Automation

### Build Process (scripts/convert_to_liascript.js)

```
MODULES.yaml → TRACKS.yaml → Content files (lessons, quizzes, assignments, reflections)
                                    ↓
                        [Normalization Agent]
                                    ↓
                    Structured YAML/Markdown → extractValue()
                                    ↓
                        [Content Mapping Agent]
                                    ↓
        LiaScript-formatted markdown with page breaks
                                    ↓
                    liascript_courses/[Track].md
                                    ↓
                        [Quality Gate Agent]
                                    ↓
                    npm test → 324 tests (build-validation, content-quality)
```

### Consistency Enforced by Agents

**During Build**:
- Normalization Agent: Cleans whitespace, normalizes text extraction
- Content Mapping Agent: Validates ID references, ensures lesson ↔ quiz ↔ assignment ↔ reflection alignment
- Quality Gate Agent: Runs automated tests for completeness, link validity, accessibility

**Monthly**:
- Source Monitor Agent: Detects changes in upstream WSG sources
- Drift Analysis Agent: Compares snapshots, identifies impact
- Fix Proposal Agent: Suggests minimal changes to restore correctness
- Role Stewards (humans): Review and approve updates

**On Release**:
- Release Steward (human): Decides whether to update, defer, or create new track

---

## Visual Design & Pedagogy Implementation

### Design Patterns (as of latest commit)

**Quiz Question Page**:
```
### ✓ Question N
[Real-world scenario]

[ ] Option 1 (distractor)
[x] Option 2 (correct - professional path)
[ ] Option 3 (distractor)
[ ] Option 4 (distractor)

**Why?**
[Explanation tied to WSG principle]
```

**Reflection Page**:
```
### 💭 Reflection N
[Open-ended prompt about decision, friction, or application]

[[___]]

[Optional: Commitment section]
```

**Assignment Page**:
```
### 🛠 Assignment
**Goal**: [Specific, measurable outcome]

#### Steps
1. [Clear action]
2. [Clear action]
3. [Clear action]

#### Deliverable
[Evidence type expected]
```

**Pedagogy Alignment**:
- Emoji headers reduce cognitive load and create visual landmarks
- One page per assessment prevents overwhelming learners
- Clear structure (Goal → Steps → Deliverable) mirrors the Pedagogical Loop
- Explanations under "Why?" reinforce WSG alignment

**Agent Owner**: Accessibility Steward (ensures WCAG 2.2 AA compliance)

### Responsive Design

- **Mobile-first**: Pages fit single mobile screen without scrolling
- **Progressive enhancement**: Desktop experience is richer (wider viewport) but content is identical
- **Accessibility**: Keyboard navigation, ARIA labels, color contrast, reduced motion support

---

## Change Management & Drift Detection

### Source of Truth: Web Sustainability Guidelines (WSG)

The MOOC is *never* the source of truth. WSG is.

**Workflow**:
1. Source Monitor Agent detects changes in WSG
2. Drift Analysis Agent flags affected modules
3. Fix Proposal Agent suggests updates to lessons, quizzes, assignments
4. **Human Decision**: Role Steward reviews scope impact; Pedagogy Steward reviews learning impact
5. Content is updated (or deferred) through pull request
6. Quality Gate Agent re-validates

**Agent Owner Roles**:
- Pedagogy Steward: Does this change break the learning loop?
- Role Steward: Is this in scope for this role?
- Accessibility Steward: Is the updated content still accessible?
- Release Steward: Do we release now or defer?

---

## Consistency Checklist for Contributors

When creating or updating content, ensure:

- [ ] **Role Alignment**: Content is relevant to one of the four ARRM roles
- [ ] **Pedagogical Loop**: Lesson includes context → action → measurement → reflection
- [ ] **Action Clarity**: Assignment has clear steps and measurable deliverable
- [ ] **WSG Reference**: Quiz explanations and lesson context cite WSG sections
- [ ] **Glossary Check**: Terms are defined in GLOSSARY.yaml or lesson text
- [ ] **Page Length**: Each page is 400-600 words (one learning moment)
- [ ] **Assessment Variety**: Mix of quiz, assignment, reflection across module
- [ ] **Mobile Test**: Pages fit single mobile screen without scrolling
- [ ] **Accessibility**: Headings are semantic (H2, H3); color is not sole indicator; contrast is sufficient
- [ ] **No Accounts**: No email signup, no tracking, no backend dependencies
- [ ] **Build Success**: `npm run convert && npm test` passes with exit code 0

---

## Technology Stack

| Layer | Technology | Pedagogy Link |
|-------|-----------|---------------|
| **Content** | YAML + Markdown | Source-truth alignment, maintainability |
| **Build** | Node.js + Jest | Automated consistency checks (Quality Gate Agent) |
| **Format** | LiaScript | Lightweight, privacy-preserving, offline-capable |
| **Delivery** | GitHub Pages + Static HTML | No backend, no tracking, full accessibility control |
| **Glossary** | Client-side search | Just-in-time support without backend calls |
| **Assessment** | Local storage (IndexedDB) | Privacy-preserving progress tracking (learner owns data) |

---

## Decision Log: Why These Choices?

### Why LiaScript?
- Open format; no vendor lock-in
- Lightweight; works offline
- Supports interactive elements (quizzes, text inputs) natively
- Markdown-based; human-readable and version-controllable

### Why YAML for Quiz/Assignment/Reflection?
- Structured but readable
- Easy to extract and validate programmatically
- Separation of content (YAML) from presentation (Markdown)
- Supports future automation (e.g., translation, tool integration)

### Why 400-600 words per page?
- Balances depth with cognitive load
- Fits single mobile screen without scroll
- Typical reading time: 2-3 minutes (matches attention span research)

### Why Role-Based Tracks?
- Respects "principle of least astonishment" (learners see only relevant content)
- Allows independent updates per role
- Mirrors real job responsibilities (UX designer ≠ Front-end developer)

### Why No Backend?
- **Privacy**: No data collection, no accounts, learner owns progress
- **Resilience**: Works offline; no server to maintain
- **Simplicity**: Fewer failure modes; clearer accountability
- **Accessibility**: Static content is inherently more accessible

---

## Roadmap Implications

Design decisions enable these future features:

1. **Certification**: Open Badges issued by Certification Issuance Agent (Commitment inputs create proof)
2. **Multi-Language**: YAML structure supports translation automation
3. **Interactivity**: LiaScript supports code execution and data visualization
4. **Progress Export**: Local data can be exported as "Sustainability Impact Report"
5. **Tool Integration**: Assignments can link to Lighthouse, EcoGrader, etc.

All without requiring accounts, backends, or tracking pixels.

---

## Document Relationships

```
PEDAGOGY.md (Learning contract & principles)
    ↓
DESIGN.md (Technical implementation)
    ↓
AGENTS.md (Roles & automation)

MODULES.yaml (Content index)
TRACKS.yaml (Role definitions)
GLOSSARY.yaml (Terminology)

scripts/convert_to_liascript.js (Build automation)
tests/*.test.js (Quality gates)
liascript_courses/*.md (Generated course files)
```

**How They Connect**:
1. PEDAGOGY.md defines *what* learning should happen
2. AGENTS.md defines *who* makes decisions and *when*
3. DESIGN.md defines *how* technical choices implement pedagogy through agent collaboration
4. MODULES.yaml, TRACKS.yaml, content files are *what* learners see
5. Build pipeline & agents *ensure* consistency between all layers

---

## Summary

The WSG MOOC is designed as a **consistency system**: every technical choice enforces the pedagogical contract. Humans (Role Stewards, Pedagogy Steward, etc.) make scope and intent decisions. Agents (automated and LLM-assisted) propose changes, validate completeness, and surface drift. This separation ensures that pedagogy remains human-driven while execution becomes auditable and resilient.

**Status**: Living document. Update this file when design principles change or new agent responsibilities are added.
