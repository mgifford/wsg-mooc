# Testing the Persistence & Accessibility Fixes

## Quick Start

### 1. Open a LiaScript Course
Navigate to one of the generated courses in the `liascript_courses/` directory:
- `Front-end_Developer.md`
- `UX_Designer.md`
- `Visual_Designer.md`
- `Content_Author.md`

Or view online (if deployed): Open in a LiaScript viewer or GitHub Pages.

### 2. Check the Floating Journal Panel
Look for a panel in the **bottom-right corner** that says "Learning Journal Active". This shows:
- Quiz answers (correct count)
- Reflection count
- Rubric items checked
- Download button

### 3. Test Each Feature

#### Quiz Answers (Persistent)
1. Answer a quiz question
2. You'll see: "✓ CORRECT" or "✗ INCORRECT" (text label + color)
3. Click browser back/forward
4. **Expected:** Your answer is still selected
5. Open DevTools Console and run:
   ```javascript
   wsgJournal.getQuizAnswers('FED-01')
   ```
6. **Expected:** See your answers with timestamps

#### Reflection Text (Persistent)
1. Find a "💭 Reflection" section
2. Type something in the text input
3. Click away (blur event)
4. Check floating panel: "Reflections: 1"
5. Click browser back/forward
6. **Expected:** Your text is still there
7. Open DevTools Console:
   ```javascript
   wsgJournal.getReflection('FED-01', 0)
   ```
8. **Expected:** See your reflection text

#### Rubric Checks (Persistent)
1. Find a "🛠 Assignment" section
2. Look for the rubric checklist
3. Check a few items
4. Floating panel updates: "Rubric: 2/3"
5. Reload page
6. **Expected:** Checks are still there

#### Formatting Fixes
1. **No centered blockquote** - Role focus intro should be normal text (not indented)
2. **Bullets left-aligned** - Lists should not be centered
3. **References left-aligned** - Reference list should be a proper bullet list
4. **Text is left-aligned** - All paragraphs should be flush left

#### Color-Blind Accessibility
1. Answer a quiz question correctly
2. **See:** Green background + "✓ CORRECT" text label
3. **Even in grayscale:** The left border (5px thick) and text label should be clear
4. Answer incorrectly
5. **See:** Red background + "✗ INCORRECT" text label

---

## Advanced Testing

### Check Storage Directly
Open browser DevTools Console (F12) and run:

```javascript
// View entire journal
JSON.parse(localStorage.getItem('wsg-mooc-journal'))

// View just this lesson's data
wsgJournal.getLesson('FED-01')

// Get summary stats
wsgJournal.getSummary()

// Check if all rubric items are done
wsgJournal.isRubricComplete('FED-01')
```

### Download Evidence Pack
1. Click "Download Evidence" button in floating panel
2. **Expected:** File downloads: `wsg-mooc-evidence-FED-01.json`
3. Open the JSON file
4. **See:** All your quiz answers, reflections, rubric checks with timestamps

### Verify Data Persistence Across Tabs
1. Complete a quiz in one tab
2. Open the same lesson in a new tab
3. **Expected:** Your answer is already there (shared localStorage)
4. Edit your reflection in the new tab
5. Switch back to first tab and reload
6. **Expected:** The updated reflection is there

### Test Reduced Motion
If your browser/OS supports reduced motion:
1. Set OS to "Reduce Motion" mode
2. Open lesson
3. **Expected:** No animations/transitions
4. DevTools Console confirms media query is respected

---

## Troubleshooting

### Floating Panel Not Showing
- **Check:** DevTools Console for errors
- **Check:** `wsgJournal` is defined: `typeof wsgJournal` should be `'object'`
- **Check:** `wsg-learning-journal.js` is in same directory as `.md` file
- **Check:** Browser allows localStorage (not private/incognito mode)

### Data Not Persisting
- **Check:** localStorage is enabled in browser settings
- **Check:** Browser not in private/incognito mode
- **Check:** Storage quota not exceeded (unlikely for this amount of data)
- **Check:** DevTools Console for errors from integration script
- **Check:** Event listeners attached: Open DevTools → Elements → Find input field → Event Listeners

### Quiz Styling Issues
- **Check:** `liascript-overrides.css` is being loaded (Network tab)
- **Check:** CSS not being overridden by other styles
- **Check:** Browser zoom is 100%

### Files Missing
All three files must be in `liascript_courses/`:
- `liascript-overrides.css` ✓
- `wsg-learning-journal.js` ✓
- `wsg-liascript-integration.js` ✓

---

## What's New vs. Old

### Before (Previous LiaScript)
- ✗ Quiz answers lost on back/forward
- ✗ Text inputs not saved
- ✗ No rubric persistence
- ✗ Color-only feedback (fails WCAG)
- ✗ Blockquote centering was confusing
- ✗ No evidence export

### After (With Fixes)
- ✓ All answers persist in localStorage
- ✓ Reflection text saved automatically
- ✓ Rubric checks persistent
- ✓ Text label + color feedback (WCAG 2.2 AA)
- ✓ Clean left-aligned formatting
- ✓ Evidence JSON export for badges
- ✓ Floating panel shows progress
- ✓ Optional evidence pack download

---

## Next Steps

### For Learners
1. Use the "Download Evidence" button to save your progress
2. Submit the JSON file + your email to get a badge

### For Developers
1. Review [PERSISTENCE.md](../PERSISTENCE.md) for architecture details
2. Add more hooks if new question types are added
3. Monitor browser console for storage quota warnings
4. Consider IndexedDB migration if data grows large

### For Admins
1. Aggregate anonymized quiz results from learners
2. Track reflection word counts for engagement
3. Monitor storage quota issues across learner base
4. Generate statistics on rubric completion rates

---

## Files Changed

### Created
- `liascript_courses/liascript-overrides.css` - CSS fixes
- `liascript_courses/wsg-learning-journal.js` - Storage manager
- `liascript_courses/wsg-liascript-integration.js` - LiaScript hooks
- `PERSISTENCE.md` - Full documentation
- `TESTING.md` - This file

### Modified
- `scripts/convert_to_liascript.js` - Updated to inject scripts/CSS
- `liascript_courses/Front-end_Developer.md` - Regenerated
- `liascript_courses/UX_Designer.md` - Regenerated
- `liascript_courses/Visual_Designer.md` - Regenerated
- `liascript_courses/Content_Author.md` - Regenerated
- `liascript_courses/Home.md` - Regenerated

---

## Questions?

Open an issue: https://github.com/mgifford/wsg-mooc/issues
