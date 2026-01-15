const fs = require('fs');
const path = require('path');

const OUTPUT_DIR = path.join(__dirname, '../liascript_courses');
const CONTENT_DIR = path.join(__dirname, '../content');
const MODULES_PATH = path.join(__dirname, '../MODULES.yaml');
const TRACKS_PATH = path.join(__dirname, '../TRACKS.yaml');

// Helper: Safely read file
function readFile(filePath) {
    if (fs.existsSync(filePath)) {
        return fs.readFileSync(filePath, 'utf8');
    }
    return null;
}

// Helper: Robust text Extractor from YAML-ish strings
function extractValue(block, keys) {
    if (!Array.isArray(keys)) keys = [keys];
    for (const key of keys) {
        // Look for 'key: "Value"'
        const simpleRegex = new RegExp(`${key}: "(.*?)"`);
        const simpleMatch = block.match(simpleRegex);
        if (simpleMatch) return simpleMatch[1];
        
        // Look for multiline 'key: >'
        const multiStart = block.indexOf(`${key}: >`);
        if (multiStart !== -1) {
            const firstLineBreak = block.indexOf('\n', multiStart);
            if (firstLineBreak === -1) return "";
            const contentStart = firstLineBreak + 1;
            const rest = block.slice(contentStart);
            
            // Stop at multiple newlines OR next key-like line
            // keys in our files look like "    key:" or "key:"
            // We'll look for the next line that looks like a property definition
            // i.e. start of line, optional spaces, word characters, colon.
            const nextKeyMatch = rest.match(/^\s*[\w-]+:/m);
            
            if (nextKeyMatch) {
                return rest.slice(0, nextKeyMatch.index).trim().replace(/\n\s+/g, ' '); 
            } else {
                return rest.trim().replace(/\n\s+/g, ' ');
            }
        }
    }
    return null;
}

function parseQuizYaml(content) {
    const questions = [];
    
    // Normalize newlines
    const cleanContent = content.replace(/\r\n/g, '\n');
    
    // Split by question blocks (heuristic: "- " at root indented or just dashed blocks)
    // We assume the whole file relates to one quiz or a list of questions
    const parts = cleanContent.split(/\n\s{0,4}-\s/);
    
    for (let i = 1; i < parts.length; i++) {
        const part = parts[i];
        
        // Is this a question? Check for known text fields
        // Order matters! Check specific keys like 'scenario' first before generic 'text'
        // otherwise we might grab the text from the first choice/option if 'text' is checked first.
        const text = extractValue(part, ['scenario', 'question', 'text']);
        if (!text) continue;
        
        const remedy = extractValue(part, ['remedy', 'explanation']);
        
        const question = {
            text: text,
            remedy: remedy || "",
            options: []
        };
        
        // Try to find options/choices block
        let optionsBlockMatch = part.match(/(options|choices):([\s\S]*?)(\n\S|$)/);
        if (optionsBlockMatch) {
            const optBlock = optionsBlockMatch[2];
            const optParts = optBlock.split(/\n\s+-\s/);
            
            for (let j = 1; j < optParts.length; j++) {
                const optPart = optParts[j];
                const optText = extractValue(optPart, ['text', 'label']);
                const correctMatch = optPart.match(/correct: (true|false)/);
                
                if (optText) {
                    question.options.push({
                        text: optText,
                        correct: correctMatch ? correctMatch[1] === 'true' : false
                    });
                }
            }
        }
        
        if (question.options.length > 0) {
            questions.push(question);
        }
    }
    return questions;
}

function parseReflectionYaml(content) {
    const reflections = [];
    // Extract prompts
    const promptRegex = /- id: ".*?"\n\s+text: "(.*?)"/g;
    let match;
    while ((match = promptRegex.exec(content)) !== null) {
        reflections.push(match[1]);
    }
    // Extract commitment
    const commitMatch = content.match(/commitment:\n\s+text: "(.*?)"/);
    const commitment = commitMatch ? commitMatch[1] : "";
    
    return { prompts: reflections, commitment };
}

// Generate Home.md (landing page with track links)
function generateHome() {
    const modulesContent = fs.readFileSync(MODULES_PATH, 'utf8');
    const trackRegex = /- track: "([^"]+)"/g;
    
    const tracks = [];
    let match;
    while ((match = trackRegex.exec(modulesContent)) !== null) {
        tracks.push(match[1]);
    }
    
    const trackColors = {
        'Front-end Developer': '#2D74DA',
        'UX Designer': '#7E2DDA',
        'Visual Designer': '#DA2D85',
        'Content Author': '#2DDA85'
    };
    
    const trackDescriptions = {
        'Front-end Developer': 'Reduce client-side compute and optimization.',
        'UX Designer': 'Eliminate dark patterns and high-friction flows.',
        'Visual Designer': 'Optimize assets, palettes, and typography.',
        'Content Author': 'Improve clarity, findability, and content lifecycle.'
    };
    
    let homeContent = `<!--
author: Web Sustainability Guidelines MOOC
email:  info@wsg-mooc.org
version: 1.0.0
language: en
narrator: US English Female

comment:  This course is auto-generated from the WSG MOOC repository.
-->

# Web Sustainability MOOC

Learn role-based strategies from the W3C Web Sustainability Guidelines.

Select your role to begin:

`;
    
    tracks.forEach((track, idx) => {
        const safeTrackName = track.replace(/\s+/g, '_');
        const color = trackColors[track] || '#666';
        const desc = trackDescriptions[track] || 'Learn sustainable practices for this role.';
        homeContent += `\n---\n\n`;
        homeContent += `## ${track}\n\n`;
        homeContent += `${desc}\n\n`;
        homeContent += `👉 [Launch ${track} Track →](${safeTrackName}.md)\n\n`;
    });
    
    homeContent += `\n---\n\n## About This MOOC\n\n`;
    homeContent += `This course teaches **role-based decision-making** grounded in the W3C Web Sustainability Guidelines (WSG). Each module includes:\n\n`;
    homeContent += `- **A decision context** (job-relevant scenario)\n`;
    homeContent += `- **A required action** (do something real)\n`;
    homeContent += `- **A measurement hook** (tool or observation)\n`;
    homeContent += `- **A reflection prompt** (short, written)\n\n`;
    homeContent += `🔗 **Source**: [Web Sustainability Guidelines](https://w3c.github.io/sustyweb/)\n`;
    homeContent += `📖 **Repository**: [GitHub](https://github.com/mgifford/wsg-mooc)\n`;
    
    fs.writeFileSync(path.join(OUTPUT_DIR, 'Home.md'), homeContent);
    console.log('Generated: Home.md');
}

// Converter Logic
try {
    generateHome();
    
    const modulesContent = fs.readFileSync(MODULES_PATH, 'utf8');

    // Regex to capture tracks and their content blocks
    const trackRegex = /- track: "([^"]+)"([\s\S]*?)(?=(- track:|$))/g;
    
    let match;
    while ((match = trackRegex.exec(modulesContent)) !== null) {
        const trackName = match[1];
        const trackContent = match[2];
        const safeTrackName = trackName.replace(/\s+/g, '_');
        
        console.log(`Converting Track: ${trackName}`);
        
        let header = `<!--
author: Web Sustainability Guidelines MOOC
email:  info@wsg-mooc.org
version: 1.0.0
language: en
narrator: US English Female

comment:  This course is auto-generated from the WSG MOOC repository.
-->

# ${trackName} Curriculum

> **Role Focus**: ${trackName}
>
> Learn to apply the W3C Web Sustainability Guidelines (WSG) in your daily work. 

`;

        let body = "";
        
        // Find IDs
        const idRegex = /id: "([A-Z]{3}-\d+)"/g;
        let idMatch;
        while ((idMatch = idRegex.exec(trackContent)) !== null) {
            const id = idMatch[1];
            console.log(`  Processing Module: ${id}`);
            
            // --- 0. Title & Lesson ---
            const lessonPath = path.join(CONTENT_DIR, 'lessons', `${id}.md`);
            const lessonRaw = readFile(lessonPath); // Markdown with frontmatter
            if (!lessonRaw) continue; // Skip if missing

            // Strip frontmatter
            const lessonBody = lessonRaw.replace(/---[\s\S]*?---/, '').trim();
            
            // Extract the Title (First H1) to use as the Section Header
            const titleMatch = lessonBody.match(/^# (.*?)$/m);
            const title = titleMatch ? titleMatch[1] : id;
            
            // Remove the H1 from body so it doesn't double print
            let cleanBody = lessonBody.replace(/^# .*$/m, '').trim();

            // Break lesson into sections (by H2 headers)
            // This creates a page for: Decision, Why It Matters, Common Failures, Do This Now, Measurement, Reflection Prompt
            const sections = cleanBody.split(/^## /m).filter(s => s.trim());
            
            // First page: Module intro with decision
            body += `\n---\n\n`;
            body += `## ${id}: ${title}\n\n`;
            if (sections.length > 0) {
                // Add first section (usually "The Decision")
                body += `### ${sections[0]}\n\n`;
            }
            
            // Subsequent pages: one section per page
            for (let i = 1; i < sections.length; i++) {
                body += `\n---\n\n`;
                body += `### ${sections[i]}\n\n`;
            }
            
            // --- 1. Quiz (LiaScript format) ---
            const quizPath = path.join(CONTENT_DIR, 'quizzes', `${id}.yaml`);
            const quizRaw = readFile(quizPath);
            if (quizRaw) {
                body += `\n---\n\n`;
                body += `### ✓ Knowledge Check\n\n`;
                body += `Review what you've learned. Multiple attempts encouraged!\n\n`;
                const questions = parseQuizYaml(quizRaw);
                questions.forEach((q, idx) => {
                    body += `**Question ${idx + 1}:** ${q.text}\n\n`;
                    q.options.forEach(opt => {
                        body += `[${opt.correct ? 'x' : ' '}] ${opt.text}\n`;
                    });
                    if (q.remedy) {
                        body += `\n> **Explanation**: ${q.remedy}\n`;
                    }
                    body += `\n`;
                });
            }

            // --- 2. Assignment / Activity ---
            const assignPath = path.join(CONTENT_DIR, 'assignments', `${id}.yaml`);
            const assignRaw = readFile(assignPath);
            if (assignRaw) {
                body += `\n---\n\n`;
                body += `### 🛠 Assignment\n\n`;
                const desc = extractValue(assignRaw, 'description');
                const deliv = extractValue(assignRaw, 'deliverable');
                
                if (desc) body += `**Goal**: ${desc}\n\n`;
                
                body += `#### Steps\n\n`;
                // Try steps regex
                const stepRegex = /- "(.*?)"/g;
                let sMatch;
                let hasSteps = false;
                while ((sMatch = stepRegex.exec(assignRaw)) !== null) {
                     // Check if it's likely a step and not a key
                     if (sMatch[1].length > 5) { // heuristic
                         body += `1. ${sMatch[1]}\n`;
                         hasSteps = true;
                     }
                }
                if (!hasSteps) {
                    // Fallback line scan for list items
                    const lines = assignRaw.split('\n');
                    let inSteps = false;
                    for(const line of lines) {
                        if (line.includes('steps:')) inSteps = true;
                        else if (inSteps && line.trim().startsWith('-')) {
                             body += `1. ${line.replace('-', '').trim().replace(/"/g, '')}\n`;
                        } else if (inSteps && line.trim() && !line.startsWith('-')) {
                            inSteps = false;
                        }
                    }
                }

                if (deliv) body += `\n#### Deliverable\n\n${deliv}\n\n`;
            }

            // --- 3. Reflection ---
            const reflectPath = path.join(CONTENT_DIR, 'reflections', `${id}.yaml`);
            const reflectRaw = readFile(reflectPath);
            if (reflectRaw) {
                const data = parseReflectionYaml(reflectRaw);
                if (data.prompts.length > 0) {
                    body += `\n---\n\n`;
                    body += `### 💭 Reflection\n\n`;
                    body += `Take a moment to reflect on what you learned.\n\n`;
                    data.prompts.forEach(p => {
                        // LiaScript text input syntax
                        body += `**${p}**\n\n[[___]]\n\n`;
                    });
                }
                if (data.commitment) {
                    body += `#### Your Commitment\n\n`;
                    body += `"${data.commitment}"\n\n`;
                    body += `[[I Commit]]\n\n`; // A button to click
                }
            }
        } // End ID loop

        fs.writeFileSync(path.join(OUTPUT_DIR, `${safeTrackName}.md`), header + body);
        console.log(`Saved: ${safeTrackName}.md`);
        
    } // End Track loop

} catch (e) {
    console.error(e);
}
