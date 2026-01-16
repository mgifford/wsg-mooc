# WSG Monitoring Automation Guide

## Overview

This MOOC includes automated monitoring tools to detect changes in upstream Web Sustainability Guidelines (WSG) sources. The system can run daily via cron to alert you when WSG content changes, ensuring the MOOC stays synchronized with the latest standards.

## Architecture

```
┌─────────────────┐
│  WSG Repository │  (w3c/sustainableweb-wsg)
└────────┬────────┘
         │
         │ Daily fetch
         ▼
┌─────────────────┐
│ Snapshot Fetcher│  (fetch-wsg-snapshot.js)
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│ Drift Detector  │  (drift-detector.js)
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│  Drift Report   │  (drift-report.json)
└─────────────────┘
```

## Tools

### 1. `fetch-wsg-snapshot.js`
Fetches current WSG content and creates a normalized JSON snapshot.

**Usage:**
```bash
node scripts/fetch-wsg-snapshot.js [output-file]
```

**Output:** 
- Default: `snapshots/wsg-snapshot-{timestamp}.json`
- Contains: guidelines.json, star.json, metadata, and content hashes

### 2. `drift-detector.js`
Compares two snapshots and reports differences.

**Usage:**
```bash
node scripts/drift-detector.js snapshots/baseline.json snapshots/latest.json
```

**Output:**
- YAML-formatted report to stdout
- Categorizes changes: added, removed, modified
- Assigns severity: LOW, MEDIUM, HIGH

### 3. `monitor-wsg.js`
Orchestrates the full monitoring workflow (recommended for automation).

**Usage:**
```bash
node scripts/monitor-wsg.js
```

**Behavior:**
1. Creates baseline snapshot if none exists
2. Fetches latest WSG content
3. Compares with baseline
4. Generates drift report if changes detected
5. Exits with status code (0=no changes, 1=changes detected, 2=error)

## Setting Up Automated Monitoring

### Option 1: Daily Cron Job (macOS/Linux)

1. **Make scripts executable:**
   ```bash
   chmod +x scripts/monitor-wsg.js
   chmod +x scripts/fetch-wsg-snapshot.js
   chmod +x scripts/drift-detector.js
   ```

2. **Create initial baseline:**
   ```bash
   node scripts/monitor-wsg.js
   ```
   This creates `snapshots/baseline.json` on first run.

3. **Set up cron job:**
   ```bash
   crontab -e
   ```

4. **Add daily monitoring (runs at 2 AM):**
   ```cron
   0 2 * * * cd /Users/mgifford/wsg-mooc && /usr/local/bin/node scripts/monitor-wsg.js >> logs/wsg-monitor.log 2>&1
   ```

5. **Create logs directory:**
   ```bash
   mkdir -p logs
   ```

6. **Test the cron job:**
   ```bash
   # Run manually to verify
   node scripts/monitor-wsg.js
   ```

### Option 2: GitHub Actions (Recommended for Teams)

Create `.github/workflows/wsg-monitor.yml`:

```yaml
name: WSG Drift Detection
on:
  schedule:
    # Run daily at 2 AM UTC
    - cron: '0 2 * * *'
  workflow_dispatch: # Allow manual trigger

jobs:
  monitor:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      
      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '18'
      
      - name: Run WSG Monitor
        id: monitor
        run: |
          node scripts/monitor-wsg.js
        continue-on-error: true
      
      - name: Upload drift report
        if: steps.monitor.outcome == 'failure'
        uses: actions/upload-artifact@v4
        with:
          name: drift-report
          path: drift-report.json
      
      - name: Create issue on changes
        if: steps.monitor.outcome == 'failure'
        uses: actions/github-script@v7
        with:
          script: |
            const fs = require('fs');
            const report = JSON.parse(fs.readFileSync('drift-report.json', 'utf8'));
            
            github.rest.issues.create({
              owner: context.repo.owner,
              repo: context.repo.repo,
              title: `WSG Drift Detected - ${report.severity}`,
              body: `## WSG Content Changes Detected
              
**Severity:** ${report.severity}
**Analysis Date:** ${report.analysis_date}

See the uploaded drift-report artifact for full details.

### Recommended Actions
${report.recommended_actions.map(a => `- ${a}`).join('\n')}

### Next Steps
1. Review the drift report
2. Update affected lessons and quizzes
3. Update WSG_REFERENCES.yaml
4. Update baseline snapshot
              `,
              labels: ['wsg-drift', report.severity.toLowerCase()]
            });
```

### Option 3: Manual Monitoring

Run the monitor whenever you want to check for updates:

```bash
node scripts/monitor-wsg.js
```

## Understanding Drift Reports

When changes are detected, `drift-report.json` is created with:

```json
{
  "analysis_date": "2026-01-16T12:00:00Z",
  "severity": "MEDIUM",
  "baseline_snapshot": "snapshots/baseline.json",
  "latest_snapshot": "snapshots/latest.json",
  "raw_analysis": "...",
  "recommended_actions": [
    "Review modified content",
    "Update WSG_REFERENCES.yaml if needed"
  ]
}
```

### Severity Levels

- **HIGH**: Guidelines/techniques removed (breaks existing links)
  - Action: Urgent review required
  - Update: Affected lessons must be revised or removed

- **MEDIUM**: Content added or modified
  - Action: Review and integrate new content
  - Update: Consider adding new lessons, update references

- **LOW**: Asset changes only (e.g., checklist PDF updated)
  - Action: Review for informational purposes
  - Update: Optional, unless critical

## Workflow After Detecting Changes

1. **Review the drift report:**
   ```bash
   cat drift-report.json
   ```

2. **Compare snapshots manually (optional):**
   ```bash
   diff snapshots/baseline.json snapshots/latest.json
   ```

3. **Map changes to MOOC content:**
   ```bash
   node scripts/content-mapper.js
   ```
   (If this script exists - creates a mapping of which lessons need updates)

4. **Update affected files:**
   - Lessons in `content/lessons/`
   - Quizzes in `content/quizzes/`
   - References in `WSG_REFERENCES.yaml`

5. **Regenerate LiaScript courses:**
   ```bash
   npm run convert
   ```

6. **Test changes:**
   ```bash
   npm test
   ```

7. **Update the baseline:**
   ```bash
   cp snapshots/latest.json snapshots/baseline.json
   git add snapshots/baseline.json
   git commit -m "Update WSG baseline after integrating changes"
   ```

## Troubleshooting

### Cron job not running

Check cron logs:
```bash
# macOS
log show --predicate 'process == "cron"' --last 1d

# Linux
grep CRON /var/log/syslog
```

### Node.js path issues in cron

Use full paths in crontab:
```bash
which node  # Get full path to node
```

Then use that path in cron:
```cron
0 2 * * * cd /Users/mgifford/wsg-mooc && /usr/local/bin/node scripts/monitor-wsg.js
```

### Network errors

The fetcher uses HTTPS to access GitHub raw content. Ensure:
- Network connectivity
- No firewall blocking HTTPS
- GitHub is accessible

## Monitoring Best Practices

1. **Keep baseline in version control**
   - Commit `snapshots/baseline.json`
   - Track changes over time

2. **Set up notifications**
   - Use GitHub Actions to create issues
   - Or configure cron to email on exit code 1

3. **Review changes promptly**
   - WSG changes may affect course accuracy
   - HIGH severity changes should be addressed within days

4. **Test automation regularly**
   - Run manual checks monthly
   - Verify cron job execution

## Integration with AGENTS.md Model

This monitoring system implements the automated agents described in [AGENTS.md](AGENTS.md):

- **Source Monitor Agent**: `fetch-wsg-snapshot.js`
- **Normalization Agent**: Built into fetcher (creates normalized JSON)
- **Drift Analysis Agent**: `drift-detector.js`
- **Content Mapping Agent**: `content-mapper.js` (if implemented)

Human stewards review drift reports and make final decisions about content updates, preserving the pedagogical integrity defined in [PEDAGOGY.md](PEDAGOGY.md).
