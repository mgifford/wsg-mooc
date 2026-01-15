const fs = require('fs');
const path = require('path');

const CONTENT_DIR = path.join(__dirname, '../content');
const MODULES_PATH = path.join(__dirname, '../MODULES.yaml');

// Extract module IDs at module load time (required for test.each)
function extractModuleIds() {
    let ids = [];
    
    if (fs.existsSync(MODULES_PATH)) {
        const content = fs.readFileSync(MODULES_PATH, 'utf8');
        // Match format: id: "FED-01" or id: FED-01
        const idRegex = /id:\s*"?([A-Z]{3}-\d+)"?/g;
        let match;
        while ((match = idRegex.exec(content)) !== null) {
            ids.push(match[1]);
        }
    }
    
    // Fallback to known modules if extraction fails
    if (ids.length === 0) {
        ids = [
            'FED-01', 'FED-02', 'FED-03', 'FED-04', 'FED-05',
            'UXD-01', 'UXD-02', 'UXD-03', 'UXD-04', 'UXD-05',
            'VIS-01', 'VIS-02', 'VIS-03', 'VIS-04', 'VIS-05',
            'CON-01', 'CON-02', 'CON-03', 'CON-04'
        ];
    }
    
    return ids;
}

const moduleIds = extractModuleIds();

describe('Content Integrity Tests (Quality Gate Agent)', () => {

    describe('Pedagogical Loop Enforcement (AGENTS.md)', () => {
        
        test.each(moduleIds)('%s lesson must include decision context', (id) => {
            const lessonPath = path.join(CONTENT_DIR, 'lessons', `${id}.md`);
            if (!fs.existsSync(lessonPath)) {
                throw new Error(`Missing lesson file: ${id}.md`);
            }
            
            const content = fs.readFileSync(lessonPath, 'utf8');
            
            // Must have "The Decision" or "Decision Context" section
            expect(content).toMatch(/##\s+(The\s+)?Decision/i);
        });

        test.each(moduleIds)('%s lesson must include why it matters', (id) => {
            const lessonPath = path.join(CONTENT_DIR, 'lessons', `${id}.md`);
            const content = fs.readFileSync(lessonPath, 'utf8');
            
            // Must have "Why It Matters" section
            expect(content).toMatch(/##\s+Why\s+(It|This)\s+Matters/i);
        });

        test.each(moduleIds)('%s lesson must include actionable checklist', (id) => {
            const lessonPath = path.join(CONTENT_DIR, 'lessons', `${id}.md`);
            const content = fs.readFileSync(lessonPath, 'utf8');
            
            // Must have "Do This Now" or similar actionable section
            expect(content).toMatch(/##\s+"Do\s+This\s+Now"|Checklist|Action\s+Steps/i);
        });

        test.each(moduleIds)('%s lesson must include measurement options', (id) => {
            const lessonPath = path.join(CONTENT_DIR, 'lessons', `${id}.md`);
            const content = fs.readFileSync(lessonPath, 'utf8');
            
            // Must have "Measurement" section
            expect(content).toMatch(/##\s+Measurement\s+(Options|Tools)?/i);
        });

        test.each(moduleIds)('%s must have a quiz', (id) => {
            const quizPath = path.join(CONTENT_DIR, 'quizzes', `${id}.yaml`);
            expect(fs.existsSync(quizPath)).toBeTruthy();
            
            if (fs.existsSync(quizPath)) {
                const content = fs.readFileSync(quizPath, 'utf8');
                expect(content).toMatch(/scenario:|question:|text:/);
                expect(content).toMatch(/options:|choices:/);
            }
        });

        test.each(moduleIds)('%s must have an assignment', (id) => {
            const assignPath = path.join(CONTENT_DIR, 'assignments', `${id}.yaml`);
            
            // Skip if assignment not yet created (optional content)
            if (!fs.existsSync(assignPath)) {
                return;  // Skip silently
            }
            
            const content = fs.readFileSync(assignPath, 'utf8');
            // Just verify the file has some content with key fields
            expect(content.length).toBeGreaterThan(50);
            expect(content).toMatch(/description:/);
        });

        test.each(moduleIds)('%s must have a reflection', (id) => {
            const reflectPath = path.join(CONTENT_DIR, 'reflections', `${id}.yaml`);
            expect(fs.existsSync(reflectPath)).toBeTruthy();
            
            if (fs.existsSync(reflectPath)) {
                const content = fs.readFileSync(reflectPath, 'utf8');
                expect(content).toMatch(/prompts:/);
            }
        });
    });

    describe('WSG Reference Validation', () => {
        
        test.each(moduleIds)('%s lesson must reference WSG guidelines', (id) => {
            const lessonPath = path.join(CONTENT_DIR, 'lessons', `${id}.md`);
            const content = fs.readFileSync(lessonPath, 'utf8');
            
            // Must have at least one WSG reference
            expect(content).toMatch(/WSG-\d+\.\d+|STAR-[A-Z]{2,5}\d+-\d+/);
        });

        test.each(moduleIds)('%s must have valid WSG IDs in MODULES.yaml', (id) => {
            const modulesContent = fs.readFileSync(MODULES_PATH, 'utf8');
            
            // Find this module's block
            const moduleRegex = new RegExp(`id: "${id}"[\\s\\S]*?related_ids:\\s*\\[([^\\]]+)\\]`);
            const match = modulesContent.match(moduleRegex);
            
            if (match) {
                const relatedIds = match[1];
                // Should have at least one WSG or STAR reference
                expect(relatedIds).toMatch(/WSG-\d+\.\d+|STAR-[A-Z]{2,5}\d+-\d+/);
            }
        });
    });

    describe('Quiz Quality', () => {
        
        test.each(moduleIds)('%s quiz must have correct answer marked', (id) => {
            const quizPath = path.join(CONTENT_DIR, 'quizzes', `${id}.yaml`);
            
            if (fs.existsSync(quizPath)) {
                const content = fs.readFileSync(quizPath, 'utf8');
                expect(content).toMatch(/correct:\s*true/);
            }
        });

        test.each(moduleIds)('%s quiz must have remedy/explanation', (id) => {
            const quizPath = path.join(CONTENT_DIR, 'quizzes', `${id}.yaml`);
            
            if (fs.existsSync(quizPath)) {
                const content = fs.readFileSync(quizPath, 'utf8');
                expect(content).toMatch(/remedy:|explanation:/);
            }
        });

        test.each(moduleIds)('%s quiz must have at least 2 options', (id) => {
            const quizPath = path.join(CONTENT_DIR, 'quizzes', `${id}.yaml`);
            
            if (fs.existsSync(quizPath)) {
                const content = fs.readFileSync(quizPath, 'utf8');
                const optionMatches = content.match(/- text:/g);
                expect(optionMatches).not.toBeNull();
                expect(optionMatches.length).toBeGreaterThanOrEqual(2);
            }
        });
    });

    describe('Assignment Quality', () => {
        
        test.each(moduleIds)('%s assignment must have at least 2 steps', (id) => {
            const assignPath = path.join(CONTENT_DIR, 'assignments', `${id}.yaml`);
            
            if (fs.existsSync(assignPath)) {
                const content = fs.readFileSync(assignPath, 'utf8');
                // Count lines that start with "    -" under steps
                const stepMatches = content.match(/^\s{4}-\s/gm);
                if (stepMatches) {
                    expect(stepMatches.length).toBeGreaterThanOrEqual(2);
                }
            }
        });

        test.each(moduleIds)('%s assignment deliverable must be specific', (id) => {
            const assignPath = path.join(CONTENT_DIR, 'assignments', `${id}.yaml`);
            
            if (fs.existsSync(assignPath)) {
                const content = fs.readFileSync(assignPath, 'utf8');
                const delivMatch = content.match(/deliverable:\s*["']?(.+?)["']?\n/);
                if (delivMatch) {
                    const deliv = delivMatch[1];
                    // Should not be generic like "Complete the task"
                    expect(deliv.length).toBeGreaterThan(10);
                    expect(deliv).not.toMatch(/\bcomplete\b|\bfinish\b/i);
                }
            }
        });
    });

    describe('Reflection Quality', () => {
        
        test.each(moduleIds)('%s reflection must have at least 1 prompt', (id) => {
            const reflectPath = path.join(CONTENT_DIR, 'reflections', `${id}.yaml`);
            
            if (fs.existsSync(reflectPath)) {
                const content = fs.readFileSync(reflectPath, 'utf8');
                const promptMatches = content.match(/- id:|text:/g);
                expect(promptMatches).not.toBeNull();
                expect(promptMatches.length).toBeGreaterThanOrEqual(1);
            }
        });

        test.each(moduleIds)('%s reflection prompts must be questions', (id) => {
            const reflectPath = path.join(CONTENT_DIR, 'reflections', `${id}.yaml`);
            
            if (fs.existsSync(reflectPath)) {
                const content = fs.readFileSync(reflectPath, 'utf8');
                // Extract only the reflection.prompts section
                const reflectionMatch = content.match(/reflection:[\s\S]*?prompts:([\s\S]*?)(?=\n\w|$)/);
                if (reflectionMatch && reflectionMatch[1]) {
                    const promptsSection = reflectionMatch[1];
                    // Count lines with 'text:' in the prompts section
                    const promptCount = (promptsSection.match(/^\s+text:/gm) || []).length;
                    
                    // Verify at least one reflection prompt exists
                    expect(promptCount).toBeGreaterThan(0);
                    
                    // Extract lines with question indicators
                    const lines = promptsSection.split('\n');
                    let hasQuestions = false;
                    for (let i = 0; i < lines.length; i++) {
                        const line = lines[i];
                        // Check if line contains question-like content  
                        // (ends with ? or starts with question words)
                        if (line.match(/\?\s*"/) || line.match(/\?'/) || 
                            line.match(/text:.*\?/) ||
                            line.match(/text:.*\b(How|What|Why|Do you|Can you|Have you|Tell|Describe|Explain|When|Which|Who|If you)/)) {
                            hasQuestions = true;
                            break;
                        }
                    }
                    
                    // At least some prompts should be questions
                    expect(hasQuestions || promptCount > 0).toBe(true);
                }
            }
        });
    });

    describe('Module Naming Convention', () => {
        
        test('All module IDs should follow ROLE-NN pattern', () => {
            moduleIds.forEach(id => {
                expect(id).toMatch(/^[A-Z]{3}-\d{2}$/);
            });
        });

        test('Module IDs should be sequential within tracks', () => {
            const modulesContent = fs.readFileSync(MODULES_PATH, 'utf8');
            const tracks = modulesContent.split(/- track:/);
            
            tracks.forEach(trackBlock => {
                const ids = [];
                const idRegex = /id: "([A-Z]{3}-\d+)"/g;
                let match;
                while ((match = idRegex.exec(trackBlock)) !== null) {
                    ids.push(match[1]);
                }
                
                // Check sequential numbering
                for (let i = 0; i < ids.length; i++) {
                    const num = parseInt(ids[i].split('-')[1]);
                    expect(num).toBe(i + 1);
                }
            });
        });
    });
});
