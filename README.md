# Web Sustainability MOOC (wsg-mooc)

A role-based MOOC teaching the W3C Web Sustainability Guidelines (WSG) through practical, job-relevant lessons.

## Quick Start

### 1. Generate LiaScript courses

```bash
npm run convert
```

This generates `liascript_courses/*.md` from structured content in `content/`.

### 2. Preview locally

```bash
npm run preview
```

Opens the LiaScript devserver at `http://localhost:9000/liascript/index.html?http://localhost:9000/Home.md`.

Then click "Launch Track" buttons to navigate to each role-based course.

### 3. Run tests

```bash
npm test
```

Validates course structure (headers, quizzes, reflections, assignments).

## Project Structure

```
.
├── content/
│   ├── lessons/        # FED-01.md, UX-01.md, etc. (Markdown + YAML frontmatter)
│   ├── quizzes/        # FED-01.yaml (multiple-choice questions)
│   ├── assignments/    # FED-01.yaml (practice activities)
│   ├── reflections/    # FED-01.yaml (reflection prompts)
│   └── BADGES.yaml     # Badge definitions
├── liascript_courses/  # Generated output
│   ├── Home.md         # Landing page with track links
│   ├── Front-end_Developer.md
│   ├── UX_Designer.md
│   └── ... (one per track)
├── scripts/
│   └── convert_to_liascript.js  # Build script (YAML → LiaScript Markdown)
├── .github/workflows/
│   └── deploy.yml      # GitHub Actions deploy to gh-pages
├── viewer/
│   ├── index.html      # Redirect to official LiaScript viewer
│   └── local-test.html # Local test page
└── AGENTS.md           # Role-based agent model (Who does what?)
```

## How It Works (AGENTS Model)

This MOOC uses the **agent model** defined in [AGENTS.md](AGENTS.md):

- **Pedagogy Steward**: Owns lesson design and ensures behavior change.
- **Role Steward**: Owns scope for each track (Front-end, UX, Visual, Content).
- **Automated Agents**: Convert YAML → LiaScript, detect drift, propose fixes.

**Key principle**: WSG is the source of truth, not the learning surface. Lessons teach role-based decision-making with traceable references back to WSG.

## Authoring New Lessons

1. Create a lesson in `content/lessons/MODULE-ID.md`:
   ```markdown
   ---
   module: FED-01
   title: "Establishing Code Hygiene"
   ---
   
   ## The Decision
   "Will I ship this code as is, or strip it down first?"
   
   ## Why It Matters
   ...
   ```

2. Add a quiz in `content/quizzes/FED-01.yaml`:
   ```yaml
   questions:
     - scenario: "You're reviewing a PR with div soup..."
       options:
         - text: "Approve it."
           correct: false
         - text: "Request semantic tags."
           correct: true
       remedy: "Semantic tags save code and improve accessibility."
   ```

3. Add an assignment in `content/assignments/FED-01.yaml` and reflection in `content/reflections/FED-01.yaml`.

4. Add the module to `MODULES.yaml` and the track will auto-regenerate on next `npm run convert`.

## Deployment

### GitHub Pages (Automatic)

- Push to `main` and the `.github/workflows/deploy.yml` action will:
  1. Generate courses
  2. Run tests
  3. Deploy to `gh-pages`
  4. Publish at https://mgifford.github.io/wsg-mooc/

### Local HTTPS Testing

To test with HTTPS (avoid mixed-content warnings):

```bash
npx http-server ./liascript_courses -p 8443 --ssl --cors
```

Then open https://liascript.github.io/course/?https://127.0.0.1:8443/Home.md (and accept the self-signed cert warning).

## Tech Stack

- **LiaScript**: Markdown-based interactive course format
- **Node.js**: Build scripts + devserver
- **GitHub Pages**: Static hosting
- **GitHub Actions**: CI/CD

## Resources

- [LiaScript Documentation](https://liascript.github.io/)
- [W3C Web Sustainability Guidelines](https://w3c.github.io/sustyweb/)
- [AGENTS.md](AGENTS.md) - Operational model
- [MODULES.yaml](MODULES.yaml) - Course structure
