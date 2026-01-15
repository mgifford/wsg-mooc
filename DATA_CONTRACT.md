# Internal Data Contracts

## Purpose
This document defines the schema obligations for the MOOC’s data ingestion pipeline. It specifies how volatile upstream sources (WSG repo) are normalized into the MOOC’s static learning content.

## Input Sources

| Source | Description | Update Frequency | Criticality |
| :--- | :--- | :--- | :--- |
| `guidelines.json` | Core WSG Success Criteria and metadata | Monthly | **High** |
| `star.json` | Actionable techniques and test procedures | Monthly | **High** |
| `policies.html` | Regulatory landscape tables | Quarterly | Medium |
| `benefits.html` | Benefit mapping for motivation | Monthly | Medium |
| `summary.html` | Narrative context and definitions | Quarterly | Low |
| `checklist.pdf` | Printable reference (Content extraction only) | Ad-hoc | Low |

---

## 1. Guidelines Contract (`guidelines.json`)

**Source URL**: `https://github.com/w3c/sustainableweb-wsg/blob/main/guidelines.json`
**Entity**: `Guideline` (and child `SuccessCriterion`)

### Required Fields
*   `category[].id`: (e.g., "2")
*   `category[].name`: (e.g., "User Experience Design")
*   `category[].guidelines[].id`: (e.g., "1")
*   `category[].guidelines[].guideline`: The primary rule text.
*   `category[].guidelines[].criteria[].title`: The specific success criterion name.
*   `category[].guidelines[].criteria[].description`: The instructional text.
*   `category[].guidelines[].criteria[].tags`: Array of strings for taxonomy.

### Optional Fields
*   `category[].shortName`
*   `category[].guidelines[].url` (We generate our own canonical URLs)
*   `category[].guidelines[].criteria[].resources`: External links (monitor for 404s but do not block).
*   `category[].guidelines[].criteria[].benefits`: Mapping of benefit type to text (e.g., "Accessibility": "...")
*   `category[].guidelines[].criteria[].GRI`: Global Reporting Initiative mappings.
*   `category[].guidelines[].criteria[].example`: Code snippet or text example.

### Ignored Fields
*   `edition`, `lastModified` (Root level metadata is tracked via git commit hash, not file content).
*   `subheading` (Often redundant with description).

### Stable Internal Identifier
**`WSG-{Category.ID}.{Guideline.ID}`**
Example: `WSG-2.1` (User Experience Design > Guideline 1)
*Note: This ID must remain stable across imports. If `guidelines.json` renumbers, the Drift Analysis Agent must flag a critical breaking change.*

---

## 2. STAR Contract (`star.json`)

**Source URL**: `https://github.com/w3c/sustainableweb-wsg/blob/main/star.json`
**Entity**: `Technique` (Mapped to `Lesson` in MOOC)

### Required Fields
*   `category[].techniques[].id`: (e.g., "UX01-1") **CRITICAL PRIMARY KEY**
*   `category[].techniques[].title`: The lesson title.
*   `category[].techniques[].applicability`: Logic for when this applies.
*   `category[].techniques[].description`: Array of instructional steps/paragraphs.
*   `category[].techniques[].tests[].procedure`: The "Measure" step instructions.
*   `category[].techniques[].tests[].expectedResults`: The definition of "Pass".

### Optional Fields
*   `testSuite`: URL to automated test (if available).
*   `examples`: Contextual examples.

### Ignored Fields
*   `edition`

### Stable Internal Identifier
**`{STAR_ID}`**
Example: `UX01-1`
*   This maps 1:1 to a MOOC **Lesson**.
*   This maps M:1 to a WSG **Guideline**. (Multiple techniques can support one guideline).

---

## 3. Narrative Content Contract (HTML Sources)

**Sources**: `policies.html`, `benefits.html`, `summary.html`
**Entity**: `ReferenceMaterial`

### Policies (`policies.html`)
*   **Extraction Method**: HTML Table Parser.
*   **Required Columns**: `Geography`, `Name`, `Year`, `Type`, `Status`.
*   **Internal Struct**: List of Policy objects.
*   **Failure Condition**: Table structure change (column count mismatch).

### Benefits (`benefits.html`)
*   **Extraction Method**: Header/List Parser.
*   **Mapping**: `Guideline ID` -> `Benefit Category` -> `Benefit Text`.
*   **Verification**: Content must match the schema of `guidelines.json` benefits array (they should theoretically be identical, but HTML often has more prose).

---

## Failure Conditions (Build Breakers)

The `Normalization Agent` must **fail the build** and **block ingestion** if:

1.  **ID Collision**: Duplicate `UXxx-x` IDs found in `star.json`.
2.  **Orphaned Techniques**: A STAR technique references a Guideline ID (via `applicability` text parsing or manual map) that does not exist in `guidelines.json`.
3.  **Schema Violation**: Missing `description` or `title` in any Guideline or Technique.
4.  **Zero-Length Content**: Any required field is empty string.
5.  **Role Mismatch**: A Technique cannot be mapped to at least one ARRM role (UX, Visual, Content, Dev). *Note: This requires a heuristic or manual map file.*

---

## Role Mapping Strategy

Since upstream source does not explicitly tag ARRM roles, the **Content Mapping Agent** uses the following heuristic during ingestion:

1.  **Prefix Mapping**:
    *   `UX` -> **UX Designer**
    *   `WD` -> **Front-End Developer**
    *   `HIS` -> **DevOps / Back-end** (Often falls to FE in small teams, or separate track)
    *   `BSPM` -> **Product Owner / Strategy** (Potential outlier for current scope)
2.  **Tag Overrides**:
    *   If `tags[]` contains "CSS" or "HTML" -> **Front-End Developer**.
    *   If `tags[]` contains "Design" or "UI" -> **Visual Designer**.
    *   If `tags[]` contains "Content" or "Writing" -> **Content Author**.

*Manual overrides are stored in `internal/role-overrides.yml` to correct automation errors.*
