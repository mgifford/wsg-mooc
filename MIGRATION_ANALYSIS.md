# Impact Analysis: Migration to LiaScript / MDX

**Date:** 2026-01-14
**Context:** The current architecture uses specific YAML files for structured data (Quizzes, Assignments, Measurements) linked to Markdown lessons. The proposal is to consolidate this into a "Rich Markdown" format (LiaScript or MDX).

## 1. Architectural Shift

| Feature | Current State (Split Model) | LiaScript Mode (Consolidated) | MDX Mode (Component) |
| :--- | :--- | :--- | :--- |
| **File Structure** | `lessons/*.md`, `quizzes/*.yaml` | `course.md` (Self-contained) | `lesson.mdx` (Imports components) |
| **Drift Detection** | Checks existence of separate files. | ⚠️ Must parse Markdown for sections. | ⚠️ Must parse JSX/Imports. |
| **Rendering** | Static Build (Jekyll/Hugo) | Client-side (LiaScript.js) | Static Build (Next/Vite) |
| **Interactivity** | Limited (Static HTML) | **High** (Native Quizzes, Code) | **High** (React Components) |

## 2. Benefits of Migration

*   **Unified Authoring**: Content authors write one file per module, not five. Context switching is reduced.
*   **Immediate Feedback**: LiaScript has built-in quiz rendering and code execution. Use of `[[ ]]` syntax is standard and human-readable.
*   **Simplified Build**: If using LiaScript/Vanilla, no complex Node.js build chain is required for the content itself; it runs in-browser.

## 3. Risks & Mitigation

### Risk A: Drift Detection Complexity
*   **Issue**: `content-mapper.js` currently looks for `quizzes/UXD-01.yaml`. If that file is gone, the script breaks.
*   **Mitigation**: Rewrite `drift-detector.js` to parse the LiaScript/MDX AST (Abstract Syntax Tree) to verify that a "Quiz" section exists for every module ID.

### Risk B: Verification & Badging
*   **Issue**: Our `VERIFICATION_MODEL.md` relies on hashing structured inputs.
*   **Mitigation**: 
    *   **LiaScript**: Use the `window.LIA.on('quiz', ...)` JavaScript API to capture results and feed them to our hashing logic.
    *   **MDX**: Wrap quizzes in a `<Quiz onComplete={hashResult} />` component.

### Risk C: Accessibility (WCAG 2.2)
*   **Issue**: Ensuring the interactive runtime (LiaScript or Custom React Components) meets the strict AA standard we promised.
*   **Mitigation**: LiaScript is generally good, but we must audit the specific version. MDX allows full control, but requires us to *build* the accessible components ourselves.

## 4. Recommendation

**Adopt LiaScript (Pure Markdown approach)** for this specific project.

**Why?**
1.  **Alignment with "Low Tech"**: It runs on GitHub Pages without a build step (unlike MDX/Next.js).
2.  **Human Readability**: The quiz syntax `[[Option]]` is readable as plain text, fitting our "Auditability" principle.
3.  **Sustainability**: Less server-side processing, highly cacheable text files.

## 5. Migration Steps

1.  **Refactor**: Write a script to merge `lessons/*.md` + `quizzes/*.yaml` + `assignments/*.yaml` -> `course/track.md` (LiaScript format).
2.  **Update Drift Logic**: Change the monitor to check for Section Headers in the single file instead of file existence.
3.  **Deprecate**: Remove `prototypes/` (The course file becomes the prototype).

---
**Decision Required**: Proceed with converting the existing 4 tracks into 4 LiaScript course files?
