const fs = require('fs');
const path = require('path');

// Configuration
const OUTPUT_DIR = path.join(__dirname, '../prototypes');
const CONTENT_DIR = path.join(__dirname, '../content');
const MODULES_PATH = path.join(__dirname, '../MODULES.yaml');

// Helper to safely read file
function readFile(filePath) {
    if (fs.existsSync(filePath)) {
        return fs.readFileSync(filePath, 'utf8');
    }
    return "*[File not found: " + path.basename(filePath) + "]*";
}

// Main Logic
try {
    const modulesContent = fs.readFileSync(MODULES_PATH, 'utf8');
    
    // Split by track definition to handle multiple tracks
    // This assumes the format containing '- track: "Name"'
    // We utilize a regex that finds the track name and looks ahead for the next track or end of file
    const trackRegex = /- track: "([^"]+)"([\s\S]*?)(?=(- track:|$))/g;
    
    let match;
    while ((match = trackRegex.exec(modulesContent)) !== null) {
        const trackName = match[1];
        const trackContent = match[2];
        
        console.log(`Processing track: ${trackName}`);
        
        const safeTrackName = trackName.replace(/\s+/g, '_');
        const outputFile = path.join(OUTPUT_DIR, `${safeTrackName}_Track_Full.md`);
        
        // Extract IDs for this track
        // Matches id: "ABC-12"
        const idRegex = /id: "([A-Z]{3}-\d+)"/g;
        let idMatch;
        const ids = [];
        while ((idMatch = idRegex.exec(trackContent)) !== null) {
            ids.push(idMatch[1]);
        }
        
        if (ids.length === 0) {
            console.log(`No modules found for ${trackName}, skipping.`);
            continue;
        }

        console.log(`  Found IDs: ${ids.join(', ')}`);

        let fullMarkdown = `# Course Prototype: ${trackName}\n\n`;
        fullMarkdown += `> Generated on ${new Date().toISOString().split('T')[0]}\n\n`;

        ids.forEach(id => {
            fullMarkdown += `\n---\n\n# MODULE: ${id}\n\n`;

            // 1. LESSON
            fullMarkdown += `## 📖 LESSON CONTENT\n\n`;
            const lessonPath = path.join(CONTENT_DIR, 'lessons', `${id}.md`);
            let lessonContent = readFile(lessonPath);
            // Remove frontmatter for cleaner view
            lessonContent = lessonContent.replace(/---[\s\S]*?---/, '').trim();
            fullMarkdown += lessonContent + "\n\n";

            // 2. QUIZ
            fullMarkdown += `## ❓ QUIZ\n\n`;
            const quizPath = path.join(CONTENT_DIR, 'quizzes', `${id}.yaml`);
            fullMarkdown += readFile(quizPath) + "\n\n";

            // 3. ASSIGNMENT
            fullMarkdown += `## 🛠 ASSIGNMENT\n\n`;
            const assignPath = path.join(CONTENT_DIR, 'assignments', `${id}.yaml`);
            fullMarkdown += readFile(assignPath) + "\n\n";

            // 4. MEASUREMENT
            fullMarkdown += `## 📏 MEASUREMENT\n\n`;
            const measurePath = path.join(CONTENT_DIR, 'measurement', `${id}.yaml`);
            fullMarkdown += readFile(measurePath) + "\n\n";

            // 5. REFLECTION
            fullMarkdown += `## 💭 REFLECTION\n\n`;
            const reflectPath = path.join(CONTENT_DIR, 'reflections', `${id}.yaml`);
            fullMarkdown += readFile(reflectPath) + "\n\n";
        });

        // Ensure output dir exists
        if (!fs.existsSync(OUTPUT_DIR)) {
            fs.mkdirSync(OUTPUT_DIR, { recursive: true });
        }

        fs.writeFileSync(outputFile, fullMarkdown);
        console.log(`  Prototype generated at: ${outputFile}`);
    }

} catch (err) {
    console.error("Error:", err);
}
