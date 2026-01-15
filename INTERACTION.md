# Interaction Strategy & Input Locality

## Privacy-First Data Model
Since the MOOC operates without a backend database (Static-First), all user-generated input is ephemeral or stored in the browser's `localStorage` / `IndexedDB`. 

## Input Opportunities (The "Where")

### 1. Pre-Assessment (The Diagnostic)
**Location:** Before the Lesson content.
**Purpose:** Establish a baseline and generate immediate relevance.
**Input Type:** Boolean / Likert Scale.
- *Example:* "Do you currently require email confirmation for new accounts?" [Yes/No]
- *Feedback:* If "Yes", the lesson dynamically highlights the friction cost.

### 2. The Practical Assignment (The "Do" Phase)
**Location:** `content/assignments/*.yaml`
**Purpose:** Structure the "Do" phase.
**Input Type:** Numeric / Text.
- *Example:* "Enter valid clicks count: [ 5 ]" -> "Enter optimized clicks count: [ 3 ]" -> "Reduction: 40%".
- *Value:* This calculates the "Metric" automatically for the user.

### 3. Self-Graded Rubric (Post-Assignment)
**Location:** Immediately following the assignment.
**Purpose:** Validate the quality of the work (since we can't grade it).
**Input Type:** Checklist.
- *Example:* "Did you verify the unsubscribe link works without login?" [Check]
- *Mechanism:* Completion Unlock. The "Complete Lesson" button is disabled until the rubric is self-verified.

### 4. Guided Reflection (The "Reflect" Phase)
**Location:** End of Lesson.
**Purpose:** Internalize the lesson and plan for future application.
**Input Type:** Free Text (Short).
- *Example:* "What was the biggest organizational blocker to removing this pattern?"
- *Storage:* Saved to "Learner Journal" (Local JSON).

## The Evidence Pack (Certification Payload)
To issue a certificate without storing PII, we use a "Stateless Verification" flow.

1.  **Collection**: The browser aggregates all local inputs (Rubric checks + Reflection text + Assignment metrics) into a `evidence.json`.
2.  **Hashing**: The browser generates a SHA-256 hash of this evidence.
3.  **Submission**:
    - User enters Name + Email (Client-side only).
    - Browser sends `Name`, `Email`, `Track_ID`, `Completion_Date`, and `Evidence_Hash` to the Issuance Agent.
4.  **Issuance**:
    - The Agent signs a PDF/OpenBadge with this data.
    - The Agent **does not store** the data. It returns the signed artifact immediately.
    - The `Evidence_Hash` is embedded in the certificate metadata.
5.  **Verification**:
    - If a user wants to prove their work, they provide the Certificate AND their local `evidence.json`.
    - A verifier hashes the JSON and checks if it matches the hash inside the signed Certificate.

## Implementation: Measurement Hooks
We will define "Input Hooks" in a new `schema` compatible with the lessons.

```yaml
# Example: content/reflections/UXD-03.yaml
interaction:
  diagnostic:
    question: "How many clicks does it take to unsubscribe from your service?"
    type: number
  rubric:
    - "I have verified the exit path handles errors gracefully."
    - "I have removed at least one confirm-shaming pattern."
  journal_prompt: "If you had to monetize this service without trapping users, how would you do it?"
```
