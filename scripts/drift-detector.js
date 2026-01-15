/**
 * Drift Detector (Node.js version)
 * Compares two normalized WSG snapshots to detect upstream changes.
 * 
 * Usage: node scripts/drift-detector.js <path-to-old.json> <path-to-new.json>
 */

const fs = require('fs');
const path = require('path');

// Colors for console output
const RED = '\x1b[31m';
const GREEN = '\x1b[32m';
const YELLOW = '\x1b[33m';
const RESET = '\x1b[0m';

function loadJSON(filepath) {
  try {
    return JSON.parse(fs.readFileSync(filepath, 'utf8'));
  } catch (e) {
    console.error(`${RED}Error loading file ${filepath}: ${e.message}${RESET}`);
    process.exit(1);
  }
}

// Flatten WSG structure to Map<ID, Content>
// ID Format: WSG-{Category.ID}.{Guideline.ID}
function flattenWSG(data) {
  const map = new Map();
  if (!Array.isArray(data)) return map;

  data.forEach(cat => {
    const catId = cat.id;
    if (cat.guidelines) {
      cat.guidelines.forEach(guide => {
        const fullId = `WSG-${catId}.${guide.id}`;
        map.set(fullId, JSON.stringify(guide)); // hashing content for diff
      });
    }
  });
  return map;
}

// Flatten STAR structure to Map<ID, Content>
// ID Format: {Technique.ID} e.g., UX01-1
function flattenSTAR(data) {
  const map = new Map();
  if (!Array.isArray(data)) return map;

  data.forEach(cat => {
    if (cat.techniques) {
      cat.techniques.forEach(tech => {
        map.set(tech.id, JSON.stringify(tech));
      });
    }
  });
  return map;
}

function compareMaps(oldMap, newMap, type) {
  const added = [];
  const removed = [];
  const modified = [];

  const allIds = new Set([...oldMap.keys(), ...newMap.keys()]);

  allIds.forEach(id => {
    if (!oldMap.has(id)) {
      added.push(id);
    } else if (!newMap.has(id)) {
      removed.push(id);
    } else if (oldMap.get(id) !== newMap.get(id)) {
      modified.push(id);
    }
  });

  return { type, added, removed, modified };
}

function detectDrift(oldPath, newPath) {
  const oldData = loadJSON(oldPath);
  const newData = loadJSON(newPath);

  const report = {
    date: new Date().toISOString(),
    snapshots: {
      from: oldData.timestamp || 'unknown',
      to: newData.timestamp || 'unknown'
    },
    changes: {
      guidelines: null,
      star: null,
      narratives: [],
      assets: []
    },
    severity: 'LOW'
  };

  // 1. Compare Guidelines
  report.changes.guidelines = compareMaps(
    flattenWSG(oldData.guidelines),
    flattenWSG(newData.guidelines),
    'guidelines'
  );

  // 2. Compare STAR
  report.changes.star = compareMaps(
    flattenSTAR(oldData.star),
    flattenSTAR(newData.star),
    'star'
  );

  // 3. Compare Narratives (Policies, Benefits, etc)
  const sections = ['policy', 'benefits', 'summary', 'resources'];
  const oldNarr = oldData.narratives || {};
  const newNarr = newData.narratives || {};
  
  sections.forEach(sec => {
    // Simple string comparison equivalent
    if (JSON.stringify(oldNarr[sec]) !== JSON.stringify(newNarr[sec])) {
      report.changes.narratives.push(sec);
    }
  });

  // 4. Compare Asset Hashes (e.g. checklist.pdf)
  const oldHashes = oldData.hashes || {};
  const newHashes = newData.hashes || {};
  const allFiles = new Set([...Object.keys(oldHashes), ...Object.keys(newHashes)]);
  
  allFiles.forEach(file => {
    const oldH = oldHashes[file];
    const newH = newHashes[file];
    if (oldH !== newH) {
      report.changes.assets.push({ file, old: oldH, new: newH });
    }
  });

  // 5. Impact Assessment
  let severity = 'LOW';
  const g = report.changes.guidelines;
  const s = report.changes.star;

  // Removal = High (Breaks links)
  if (g.removed.length > 0 || s.removed.length > 0) severity = 'HIGH';
  // Addition = Medium (New curriculum needed)
  else if (g.added.length > 0 || s.added.length > 0) severity = 'MEDIUM';
  // Modification = Medium (Needs review)
  else if (g.modified.length > 0 || s.modified.length > 0) severity = 'MEDIUM';
  // Asset change only = Low
  else if (report.changes.assets.length > 0) severity = 'LOW';

  report.severity = severity;
  return report;
}

// Execution
const [,, oldFile, newFile] = process.argv;

if (!oldFile || !newFile) {
  console.log("Usage: node drift-detector.js <old-snapshot.json> <new-snapshot.json>");
  process.exit(1);
}

const result = detectDrift(oldFile, newFile);

// Output YAML-ish format to stdout
console.log(`analysis_date: "${result.date}"`);
console.log(`severity: ${result.severity}`);
console.log(`comparison:`);
console.log(`  from_snapshot: "${result.snapshots.from}"`);
console.log(`  to_snapshot: "${result.snapshots.to}"`);

console.log(`changes:`);
console.log(`  guidelines:`);
console.log(`    added: [${result.changes.guidelines.added.join(', ')}]`);
console.log(`    removed: [${result.changes.guidelines.removed.join(', ')}]`);
console.log(`    modified: [${result.changes.guidelines.modified.join(', ')}]`);

console.log(`  star_techniques:`);
console.log(`    added: [${result.changes.star.added.join(', ')}]`);
console.log(`    removed: [${result.changes.star.removed.join(', ')}]`);
console.log(`    modified: [${result.changes.star.modified.join(', ')}]`);

console.log(`  narratives:`);
console.log(`    modified_sections: [${result.changes.narratives.join(', ')}]`);

console.log(`  assets:`);
if (result.changes.assets.length === 0) {
  console.log(`    []`);
} else {
  result.changes.assets.forEach(a => {
    console.log(`    - file: "${a.file}"`);
    console.log(`      change: hash_mismatch`);
  });
}
