/**
 * Content Mapper Agent (LiaScript Integrated)
 * Maps upstream drift to specific MOOC LiaScript course files and sections.
 *
 * Checks: MODULES.yaml, TRACKS.yaml, liascript_courses/*.md
 * Input: drift_report.json (via argument)
 * Output: impact_analysis (YAML to stdout)
 */

const fs = require('fs');
const path = require('path');

// Regex to find IDs: WSG-X.X, STAR-XXXX-X, etc.
const ID_REGEX = /(WSG-\d+\.\d+|STAR-[A-Z0-9]+-\d+|[A-Z]{2,}\d{2}-\d+)/g;

// Regex to find Module Headers in LiaScript: "## FED-01: Title"
const MODULE_HEADER_REGEX = /^##\s+([A-Z]{3}-\d+):/gm;

function scanDirectory(dir, extension) {
  let results = [];
  if (!fs.existsSync(dir)) return results;
  
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    if (stat.isDirectory()) {
      results = results.concat(scanDirectory(fullPath, extension));
    } else if (file.endsWith(extension)) {
      results.push(fullPath);
    }
  }
  return results;
}

/**
 * Returns a Map of { ID -> [ { file: string, context: string } ] }
 */
function mapIdsInFile(filePath) {
  const content = fs.readFileSync(filePath, 'utf8');
  const fileMap = new Map(); // ID -> Set of Contexts
  
  // 1. Identify Sections boundaries
  // We want to know: "WSG-1.1 found at line 50. Line 50 is inside Module FED-01"
  
  // Find all module headers and their positions
  const sections = [];
  let headerMatch;
  // Reset regex index
  MODULE_HEADER_REGEX.lastIndex = 0;
  
  while ((headerMatch = MODULE_HEADER_REGEX.exec(content)) !== null) {
    sections.push({
      id: headerMatch[1],
      index: headerMatch.index
    });
  }
  
  // Find all Tag occurrences
  let idMatch;
  ID_REGEX.lastIndex = 0;
  
  while ((idMatch = ID_REGEX.exec(content)) !== null) {
    const tag = idMatch[0];
    const tagIndex = idMatch.index;
    
    // Determine context (which section includes this index?)
    // Find the last section that started before this tag
    let context = "Global/Intro";
    for (let i = 0; i < sections.length; i++) {
        if (sections[i].index < tagIndex) {
            context = sections[i].id;
        } else {
            break; // Gone past the tag
        }
    }
    
    if (!fileMap.has(tag)) {
        fileMap.set(tag, new Set());
    }
    fileMap.get(tag).add(context);
  }

  return fileMap;
}

function generateImpactReport(driftReportPath) {
  let drift;
  try {
    const driftContent = fs.readFileSync(driftReportPath, 'utf8');
    drift = JSON.parse(driftContent); 
  } catch (e) {
    console.error("Error: Input must be a JSON format Drift Report.");
    process.exit(1);
  }

  const removedIds = new Set([
    ...(drift.changes.guidelines.removed || []),
    ...(drift.changes.star.removed || [])
  ]);
  
  const modifiedIds = new Set([
    ...(drift.changes.guidelines.modified || []),
    ...(drift.changes.star.modified || [])
  ]);

  // Master Index: ID -> Array of { file, contexts }
  const index = {};
  
  // Check if liascript_courses exists, else fallback to standard content just in case
  // but strictly speaking user said "Tooling Impact: to parse Markdown sections"
  const liascriptDir = 'liascript_courses';
  
  const filesToScan = [
    'MODULES.yaml',
    'TRACKS.yaml',
    ...scanDirectory(liascriptDir, '.md')
  ];

  filesToScan.forEach(f => {
    // skip non-existent root files if any
    if (!fs.existsSync(f)) return;

    // Use our context-aware mapper
    const fileMap = mapIdsInFile(f);
    
    fileMap.forEach((contexts, tagId) => {
        if (!index[tagId]) index[tagId] = [];
        
        // Flatten contexts: "FED-01, FED-03"
        const contextStr = Array.from(contexts).join(', ');
        
        index[tagId].push({
            file: f,
            context: contextStr
        });
    });
  });

  const impact = {
    broken_references: [],
    semantic_drift: [],
    no_impact_changes: [],
    affected_components: new Set()
  };

  // Helper to format output object
  const formatHit = (id, hits) => {
      const entry = { id: id, locations: [] };
      hits.forEach(h => {
          entry.locations.push(`${h.file} [${h.context}]`);
          impact.affected_components.add(h.file);
      });
      return entry;
  };

  removedIds.forEach(id => {
    if (index[id]) {
      impact.broken_references.push(formatHit(id, index[id]));
    } else {
      impact.no_impact_changes.push(id);
    }
  });

  modifiedIds.forEach(id => {
    if (index[id]) {
      impact.semantic_drift.push(formatHit(id, index[id]));
    } else {
      impact.no_impact_changes.push(id);
    }
  });

  // Output Report (YAML-ish)
  console.log("impact_analysis:");
  console.log("  broken_references: # CRITICAL: ID removed but used in content");
  impact.broken_references.forEach(item => {
    console.log(`    - id: "${item.id}"`);
    console.log(`      locations:`);
    item.locations.forEach(loc => console.log(`        - "${loc}"`));
  });

  console.log("  semantic_drift: # WARN: Logic changed upstream, review content");
  impact.semantic_drift.forEach(item => {
    console.log(`    - id: "${item.id}"`);
    console.log(`      locations:`);
    item.locations.forEach(loc => console.log(`        - "${loc}"`));
  });

  console.log("  no_impact_changes:");
  console.log(`    count: ${impact.no_impact_changes.length}`);

  console.log("  summary:");
  console.log(`    total_affected_files: ${impact.affected_components.size}`);
}

// Run
const inputFile = process.argv[2];
if (!inputFile) {
  console.log("Usage: node content-mapper.js <drift_report.json>");
} else {
  generateImpactReport(inputFile);
}
