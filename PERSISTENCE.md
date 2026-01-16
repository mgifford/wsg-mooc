# WSG MOOC - Persistent Storage & Accessibility Enhancements

## Overview

This document explains:
1. **CSS styling overrides** for LiaScript accessibility and formatting
2. **JavaScript localStorage integration** for persistent quiz/reflection storage
3. **How data flows** from LiaScript to browser storage to badge issuance

---

## Architecture

### Three-Layer Solution

```
┌─────────────────────────────────────────────────┐
│  LiaScript Markdown (Front-end_Developer.md)    │
│  - Interactive quizzes [x] [ ]                  │
│  - Text inputs [[___]]                          │
│  - Rubric checkboxes                            │
└────────────────┬────────────────────────────────┘
                 │ injects
                 ▼
┌─────────────────────────────────────────────────┐
│  wsg-liascript-integration.js                   │
│  - Hooks quiz/reflection/rubric elements        │
│  - Auto-saves via localStorage API              │
│  - Restores persisted values on page load       │
└────────────────┬────────────────────────────────┘
                 │ calls
                 ▼
┌─────────────────────────────────────────────────┐
│  wsg-learning-journal.js                        │
│  - Central localStorage manager                 │
│  - Structured data: { lessons: {...} }          │
│  - Export to JSON for badge verification        │
└─────────────────────────────────────────────────┘
```

---

## Files Added/Modified

### New Files

1. **`liascript_courses/liascript-overrides.css`**
   - Fixes centering issues (removes blockquote styling)
   - Left-aligns text and lists
   - Adds color-blind accessibility to quiz feedback
   - Adds WCAG 2.2 AA support for reduced motion and high contrast

2. **`liascript_courses/wsg-learning-journal.js`**
   - Main localStorage manager
   - Core class: `WSGLearningJournal`
   - Methods for saving/loading quiz answers, reflections, rubric checks, diagnostics
   - Export methods for badge evidence packs

3. **`liascript_courses/wsg-liascript-integration.js`**
   - Injected into each LiaScript course
   - Auto-detects and hooks quiz, reflection, and rubric elements
   - Syncs state with wsg-learning-journal
   - Shows optional floating panel with progress stats
   - Downloads evidence packs as JSON files

### Modified Files

1. **`scripts/convert_to_liascript.js`**
   - Updated header template to include `<script>` and `<style>` tags
   - Removed blockquote styling from role focus intro
   - Scripts loaded from local paths (must be in same directory as .md files)
   - CSS injected via `style:` metadata

---

## How Storage Works

### 1. Data Structure (localStorage)

```javascript
{
  "version": "1.0",
  "lastUpdated": "2026-01-15T12:34:56.789Z",
  "lessons": {
    "FED-01": {
      "quiz": [
        {
          "questionIndex": 0,
          "selectedAnswer": "Request changes. Ask them to use semantic tags...",
          "isCorrect": true,
          "scenario": "You are reviewing a Pull Request...",
          "timestamp": "2026-01-15T12:30:00Z"
        }
      ],
      "reflections": {
        "0": {
          "reflectionIndex": 0,
          "text": "I think Div Soup is common because...",
          "prompt": "Why do you think 'Div Soup' is so common?",
          "wordCount": 42,
          "timestamp": "2026-01-15T12:35:00Z"
        }
      },
      "rubric": {
        "rubric_1": {
          "itemId": "rubric_1",
          "checked": true,
          "itemText": "I have confirmed that my build process outputs minified files...",
          "timestamp": "2026-01-15T12:40:00Z"
        }
      },
      "diagnostic": {
        "diag_1": {
          "questionId": "diag_1",
          "response": true,
          "question": "Do you currently run a HTML validator as part of your CI/CD pipeline?",
          "timestamp": "2026-01-15T12:25:00Z"
        }
      }
    }
  }
}
```

**Storage Key:** `wsg-mooc-journal`  
**Capacity:** ~5-10 MB per browser (varies by browser)  
**Persistence:** Until user clears localStorage

---

### 2. How Data Flows

#### On Page Load
1. `wsg-learning-journal.js` initializes
2. Loads existing journal from `localStorage['wsg-mooc-journal']`
3. `wsg-liascript-integration.js` attaches event listeners to all input elements
4. Restores any persisted text from previous sessions
5. Floating panel shows current progress

#### On User Interaction
1. User selects quiz answer, types reflection, checks rubric item
2. Integration script detects change event
3. Calls `wsgJournal.saveQuizAnswer()` or `saveReflection()`, etc.
4. `WSGLearningJournal` updates in-memory data structure
5. Calls `.save()` to serialize and write to localStorage
6. Floating panel updates stats (every 2 seconds)

#### On Browser Navigation
1. User clicks back/forward, or closes tab
2. Window beforeunload event fires
3. `wsgJournal.save()` is called automatically
4. Data persists in localStorage
5. When user returns, data is restored on page load

#### On Export
1. User clicks "Download Evidence" button
2. `wsgJournal.exportEvidencePack(lessonId)` returns JSON
3. Browser triggers file download: `wsg-mooc-evidence-[LESSON-ID].json`
4. User submits this JSON + email to badge issuance workflow
5. System hashes the evidence and verifies it matches the badge

---

## Accessibility Improvements

### 1. CSS Fixes

#### Blockquote Removal
**Problem:** The ">" markdown syntax rendered the role focus intro as a centered blockquote, making it hard to read.

**Solution:** CSS rule removes blockquote styling:
```css
blockquote {
  background: transparent !important;
  border-left: 0 !important;
  padding: 0 !important;
  text-align: left !important;
}
```

#### Left-Align All Text
**Problem:** LiaScript centers some content by default.

**Solution:**
```css
p, li, span {
  text-align: left !important;
}

ul, ol {
  margin-left: 2em !important;
}
```

#### Color-Blind Quiz Feedback
**Problem:** Quiz answers only use color (green/red) to indicate correct/incorrect.

**Solution:** Add text labels and border indicators:
```css
.lia-quiz-option.lia-correct::after {
  content: "✓ CORRECT";
  font-weight: bold;
  color: #28a745;
}

.lia-quiz-option.lia-correct {
  border-left: 5px solid #28a745 !important;
}
```

#### Reduced Motion Support
**Problem:** Animations can cause issues for users with vestibular disorders.

**Solution:**
```css
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
```

---

### 2. Interactive Element Accessibility

#### Reflection Text Input
- Placeholder: "Your response here..."
- Can be focused and typed into
- Auto-saves on blur (when user leaves field)
- Persisted value restored on page load
- Word count tracked for analytics

#### Quiz Options
- Standard radio buttons with labels
- ✓ CORRECT text label + green left border (correct answers)
- ✗ INCORRECT text label + red left border (wrong answers)
- High contrast mode support

---

## Integration with LiaScript

### Why localStorage + Custom JS?

**LiaScript Limitations:**
- Has built-in quiz functionality but **does not persist to localStorage** by default
- Quiz state is lost on back/forward navigation
- No mechanism for exporting evidence
- Text inputs (`[[___]]`) are ephemeral
- No native support for stateless badge verification

**Our Solution:**
- Wrap LiaScript functionality with custom JavaScript hooks
- Intercept all user interactions before LiaScript processes them
- Manually save to localStorage
- Restore persisted values on page load
- Export structured evidence JSON

This approach is **LiaScript-compatible** because we're not modifying LiaScript itself—we're just adding a layer on top.

---

## Usage for Content Authors

### No Changes Required

Content authors **do not need to change** their LiaScript markdown. The system:
1. Auto-detects all quiz, reflection, and rubric elements
2. Automatically hooks them for storage
3. Works transparently in the background

### To Enable on a Lesson

1. Ensure `convert_to_liascript.js` is run (it adds the script/CSS tags automatically)
2. Verify the generated `.md` file contains:
   ```markdown
   script:   https://cdn.jsdelivr.net/npm/crypto-js@4.1.1/crypto-js.min.js
   style:    ./liascript-overrides.css
   
   <script src="./wsg-learning-journal.js"></script>
   <script src="./wsg-liascript-integration.js"></script>
   ```
3. Ensure all three JS/CSS files are in the same directory as the `.md` file

### Accessing Storage Programmatically

If custom code needs to access the journal:

```javascript
// Global object wsgJournal is available after page load

// Save a quiz answer
wsgJournal.saveQuizAnswer('FED-01', 0, 'Selected option text', true, 'Question text');

// Get reflection text
const reflection = wsgJournal.getReflection('FED-01', 0);

// Check if rubric is complete
if (wsgJournal.isRubricComplete('FED-01')) {
  // Show "Complete Lesson" button
}

// Export evidence
const evidence = wsgJournal.exportEvidencePack('FED-01');
console.log(evidence);

// Download evidence file
wsgJournal.downloadEvidencePack('FED-01');
```

---

## Debugging

### View localStorage Contents

In browser DevTools console:
```javascript
// View entire journal
JSON.parse(localStorage.getItem('wsg-mooc-journal'))

// View specific lesson
wsgJournal.getLesson('FED-01')

// View summary
wsgJournal.getSummary()

// Export to clipboard
copy(JSON.stringify(wsgJournal.exportAllEvidence(), null, 2))
```

### Clear localStorage

```javascript
// Clear only WSG MOOC journal
localStorage.removeItem('wsg-mooc-journal');

// Or use the method
wsgJournal.clear(); // Prompts user first
```

### Check Integration Status

The integration script logs to console:
```
WSG Learning Journal initialized
WSG MOOC Integration: Lesson ID = FED-01
WSG MOOC: Saved quiz answer for Q1
WSG MOOC: Saved reflection 1 { length: 45 }
```

---

## Limitations & Future Improvements

### Current Limitations

1. **No offline indicator** - Users don't know when storage fails (quota exceeded, private browsing, etc.)
2. **No sync across devices** - Data is browser-local only (by design for privacy)
3. **No automatic cloud backup** - Users must manually download evidence
4. **Quiz state visible immediately** - No "submit" step to prevent cheating
5. **LiaScript still shows color-only feedback** - Our CSS adds text labels but LiaScript may render it differently

### Potential Improvements

1. Add "Storage Status" indicator in floating panel
2. Implement IndexedDB for larger capacity (>5MB)
3. Add optional cloud sync with encryption
4. Create "submit quiz" confirmation button
5. Build admin dashboard to aggregate anonymized statistics
6. Add spellcheck and writing quality feedback to reflections

---

## Security & Privacy

### Data Storage
- **Location:** Browser's localStorage (not sent to server)
- **Scope:** Single origin (per domain/protocol/port)
- **Access:** Only via JavaScript (no HTTP headers)
- **Encryption:** Optional (users can encrypt before download)

### Evidence Hashing (for Badges)
- User's email + random salt is hashed with SHA-256
- Hash is embedded in public badge JSON
- Users never submit email to server—only hash is verified
- Evidence JSON (with salt) is kept private by learner

### Consent
- Floating panel informs user that tracking is active
- Download button is explicit—users must choose to submit
- Data never sent without user action

---

## Related Documents

- [AGENTS.md](../AGENTS.md) - Mentions "Progress tracking - stored in browser local storage"
- [INTERACTION.md](../INTERACTION.md) - Defines input opportunities and evidence pack model
- [VERIFICATION_MODEL.md](../VERIFICATION_MODEL.md) - Explains badge verification and hashing
- [DESIGN.md](../DESIGN.md) - System architecture including local storage strategy

---

## Questions?

For issues or suggestions, open an issue on [GitHub](https://github.com/mgifford/wsg-mooc/issues).
