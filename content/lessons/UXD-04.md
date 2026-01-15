---
id: UXD-04
title: Designing Efficient Forms
track: UX Designer
module_id: UXD-04
---

# Designing Efficient Forms

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