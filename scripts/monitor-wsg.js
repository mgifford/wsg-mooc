#!/usr/bin/env node
/**
 * WSG Monitor - Automated Drift Detection
 * Fetches latest WSG snapshot and compares with baseline.
 * Designed to run via cron for daily monitoring.
 * 
 * Usage: node scripts/monitor-wsg.js
 * 
 * Exit codes:
 *   0 - No changes detected
 *   1 - Changes detected (creates drift report)
 *   2 - Error during execution
 */

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const SNAPSHOTS_DIR = path.join(__dirname, '../snapshots');
const BASELINE_FILE = path.join(SNAPSHOTS_DIR, 'baseline.json');
const LATEST_FILE = path.join(SNAPSHOTS_DIR, 'latest.json');
const DRIFT_REPORT = path.join(__dirname, '../drift-report.json');

// ANSI colors
const RED = '\x1b[31m';
const GREEN = '\x1b[32m';
const YELLOW = '\x1b[33m';
const BLUE = '\x1b[34m';
const RESET = '\x1b[0m';

function log(msg, color = RESET) {
  console.log(`${color}${msg}${RESET}`);
}

function ensureBaseline() {
  if (!fs.existsSync(BASELINE_FILE)) {
    log('No baseline snapshot found. Creating initial baseline...', YELLOW);
    
    // Create snapshots directory
    if (!fs.existsSync(SNAPSHOTS_DIR)) {
      fs.mkdirSync(SNAPSHOTS_DIR, { recursive: true });
    }
    
    // Fetch initial snapshot
    execSync(`node ${path.join(__dirname, 'fetch-wsg-snapshot.js')} ${BASELINE_FILE}`, {
      stdio: 'inherit'
    });
    
    log('Baseline created. Run monitor again to check for changes.', GREEN);
    return false;
  }
  return true;
}

function fetchLatest() {
  log('Fetching latest WSG snapshot...', BLUE);
  try {
    execSync(`node ${path.join(__dirname, 'fetch-wsg-snapshot.js')} ${LATEST_FILE}`, {
      stdio: 'inherit'
    });
    return true;
  } catch (error) {
    log(`Failed to fetch latest snapshot: ${error.message}`, RED);
    return false;
  }
}

function detectDrift() {
  log('\nComparing snapshots...', BLUE);
  try {
    const output = execSync(
      `node ${path.join(__dirname, 'drift-detector.js')} ${BASELINE_FILE} ${LATEST_FILE}`,
      { encoding: 'utf8' }
    );
    
    return output;
  } catch (error) {
    log(`Drift detection failed: ${error.message}`, RED);
    return null;
  }
}

function parseDriftOutput(output) {
  // Parse the YAML-ish output from drift-detector
  const lines = output.split('\n');
  const result = {
    severity: 'UNKNOWN',
    hasChanges: false,
    changes: {
      guidelines: { added: [], removed: [], modified: [] },
      star: { added: [], removed: [], modified: [] },
      narratives: [],
      assets: []
    }
  };

  lines.forEach(line => {
    if (line.includes('severity:')) {
      result.severity = line.split(':')[1].trim();
    }
    
    // Check for non-empty change arrays
    if (line.includes('added:') || line.includes('removed:') || line.includes('modified:')) {
      const content = line.split('[')[1]?.split(']')[0] || '';
      if (content.trim().length > 0) {
        result.hasChanges = true;
      }
    }
  });

  return result;
}

function createDriftReport(rawOutput, parsedData) {
  const report = {
    analysis_date: new Date().toISOString(),
    severity: parsedData.severity,
    baseline_snapshot: BASELINE_FILE,
    latest_snapshot: LATEST_FILE,
    raw_analysis: rawOutput,
    recommended_actions: []
  };

  // Add recommended actions based on severity
  if (parsedData.severity === 'HIGH') {
    report.recommended_actions.push('URGENT: Review removed guidelines/techniques');
    report.recommended_actions.push('Update affected lessons and quizzes');
    report.recommended_actions.push('Check for broken links in content');
  } else if (parsedData.severity === 'MEDIUM') {
    report.recommended_actions.push('Review modified content');
    report.recommended_actions.push('Consider adding new lessons for new techniques');
    report.recommended_actions.push('Update WSG_REFERENCES.yaml if needed');
  } else {
    report.recommended_actions.push('Review changes for minor updates');
  }

  fs.writeFileSync(DRIFT_REPORT, JSON.stringify(report, null, 2));
  log(`\nDrift report saved to: ${DRIFT_REPORT}`, GREEN);
  
  return report;
}

// Main execution
(async () => {
  log('=== WSG Monitor - Drift Detection ===\n', BLUE);
  log(`Timestamp: ${new Date().toISOString()}\n`);

  // Step 1: Ensure baseline exists
  if (!ensureBaseline()) {
    process.exit(0);
  }

  // Step 2: Fetch latest snapshot
  if (!fetchLatest()) {
    log('\nMonitoring failed.', RED);
    process.exit(2);
  }

  // Step 3: Detect drift
  const driftOutput = detectDrift();
  if (!driftOutput) {
    log('\nMonitoring failed.', RED);
    process.exit(2);
  }

  // Step 4: Parse results
  const parsed = parseDriftOutput(driftOutput);
  
  // Step 5: Report results
  log('\n=== Results ===', BLUE);
  log(`Severity: ${parsed.severity}`, 
    parsed.severity === 'HIGH' ? RED : 
    parsed.severity === 'MEDIUM' ? YELLOW : GREEN);

  if (parsed.hasChanges) {
    log('\n⚠️  CHANGES DETECTED', YELLOW);
    log('\nFull analysis:\n');
    console.log(driftOutput);
    
    const report = createDriftReport(driftOutput, parsed);
    
    log('\nRecommended actions:', YELLOW);
    report.recommended_actions.forEach(action => {
      log(`  • ${action}`, YELLOW);
    });
    
    log('\nNext steps:', BLUE);
    log('  1. Review the drift report', RESET);
    log('  2. Update affected content files', RESET);
    log('  3. Run: node scripts/content-mapper.js (if available)', RESET);
    log('  4. Update baseline: cp snapshots/latest.json snapshots/baseline.json', RESET);
    
    process.exit(1); // Exit with code 1 to signal changes detected
  } else {
    log('✓ No changes detected', GREEN);
    log('\nWSG content is up to date with baseline.', GREEN);
    process.exit(0);
  }
})();
