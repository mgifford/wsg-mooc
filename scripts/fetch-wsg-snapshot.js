#!/usr/bin/env node
/**
 * WSG Snapshot Fetcher
 * Fetches current state of WSG sources and creates a normalized snapshot.
 * 
 * Usage: node scripts/fetch-wsg-snapshot.js [output-file]
 * Default output: snapshots/wsg-snapshot-{timestamp}.json
 */

const https = require('https');
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

// WSG Source URLs (from DATA_CONTRACT.md)
const SOURCES = {
  guidelines: 'https://raw.githubusercontent.com/w3c/sustainableweb-wsg/main/guidelines.json',
  star: 'https://raw.githubusercontent.com/w3c/sustainableweb-wsg/main/star.json',
  // Note: HTML sources would need parsing - skipping for MVP
};

function fetchURL(url) {
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        if (res.statusCode === 200) {
          resolve(data);
        } else {
          reject(new Error(`HTTP ${res.statusCode} for ${url}`));
        }
      });
    }).on('error', reject);
  });
}

async function fetchSnapshot() {
  console.log('Fetching WSG sources...');
  
  const snapshot = {
    timestamp: new Date().toISOString(),
    sources: {},
    guidelines: [],
    star: [],
    narratives: {},
    hashes: {}
  };

  try {
    // Fetch Guidelines
    console.log('  - Fetching guidelines.json...');
    const guidelinesRaw = await fetchURL(SOURCES.guidelines);
    const guidelinesData = JSON.parse(guidelinesRaw);
    snapshot.sources.guidelines = SOURCES.guidelines;
    snapshot.hashes.guidelines = crypto.createHash('sha256').update(guidelinesRaw).digest('hex');
    
    // Normalize guidelines structure
    // Note: WSG data has a root object with 'category' array, not a direct array
    const categories = guidelinesData.category || guidelinesData;
    if (Array.isArray(categories)) {
      snapshot.guidelines = categories.map(category => ({
        id: category.id,
        name: category.name,
        guidelines: (category.guidelines || []).map(guide => ({
          id: guide.id,
          guideline: guide.guideline,
          url: guide.url || '',
          criteria: (guide.criteria || []).map(crit => ({
            title: crit.title,
            description: crit.description,
            tags: crit.tags || [],
            benefits: crit.benefits || {},
            resources: crit.resources || []
          }))
        }))
      }));
    }

    // Fetch STAR
    console.log('  - Fetching star.json...');
    const starRaw = await fetchURL(SOURCES.star);
    const starData = JSON.parse(starRaw);
    snapshot.sources.star = SOURCES.star;
    snapshot.hashes.star = crypto.createHash('sha256').update(starRaw).digest('hex');
    
    // Normalize STAR structure
    // Note: STAR data has a root object with 'category' array, not a direct array
    const starCategories = starData.category || starData;
    if (Array.isArray(starCategories)) {
      snapshot.star = starCategories.map(category => ({
        id: category.id,
        name: category.name,
        techniques: (category.techniques || []).map(tech => ({
          id: tech.id,
          title: tech.title,
          applicability: tech.applicability || '',
          description: tech.description || [],
          tests: (tech.tests || []).map(test => ({
            procedure: test.procedure || '',
            expectedResults: test.expectedResults || ''
          })),
          examples: tech.examples || []
        }))
      }));
    }

    console.log('Snapshot created successfully.');
    console.log(`  Guidelines: ${snapshot.guidelines.length} categories`);
    console.log(`  STAR: ${snapshot.star.length} categories`);
    
    return snapshot;

  } catch (error) {
    console.error(`Error fetching sources: ${error.message}`);
    throw error;
  }
}

// Main execution
(async () => {
  const outputFile = process.argv[2] || 
    path.join(__dirname, '../snapshots', `wsg-snapshot-${Date.now()}.json`);
  
  // Ensure snapshots directory exists
  const dir = path.dirname(outputFile);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }

  try {
    const snapshot = await fetchSnapshot();
    fs.writeFileSync(outputFile, JSON.stringify(snapshot, null, 2));
    console.log(`\nSnapshot saved to: ${outputFile}`);
    console.log(`Timestamp: ${snapshot.timestamp}`);
  } catch (error) {
    console.error(`Failed to create snapshot: ${error.message}`);
    process.exit(1);
  }
})();
