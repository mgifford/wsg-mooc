const fs = require('fs');
const path = require('path');

const LIASCRIPT_DIR = path.join(__dirname, '../liascript_courses');
const CONTENT_DIR = path.join(__dirname, '../content');
const TRACKS_PATH = path.join(__dirname, '../TRACKS.yaml');
const MODULES_PATH = path.join(__dirname, '../MODULES.yaml');

describe('LiaScript Integrity Tests', () => {

    let tracks = [];
    let modulesConfig = "";

    beforeAll(() => {
        // Read the configuration files
        if (fs.existsSync(TRACKS_PATH)) {
            const content = fs.readFileSync(TRACKS_PATH, 'utf8');
            // Simple regex parse for tracks
            // - id: "Front-end Developer"
            const nameRegex = /- name: "(.*?)"/g;
            let match;
            while ((match = nameRegex.exec(content)) !== null) {
                tracks.push(match[1]);
            }
            if (tracks.length === 0) {
                 // Fallback if parsing failed or format diff
                 tracks = ["Front-end Developer", "UX Designer", "Visual Designer", "Content Author"];
            }
        } else {
             tracks = ["Front-end Developer", "UX Designer", "Visual Designer", "Content Author"];
        }
        
        if (fs.existsSync(MODULES_PATH)) {
            modulesConfig = fs.readFileSync(MODULES_PATH, 'utf8');
        }
    });

    test('All Track Files should exist', () => {
        tracks.forEach(track => {
            const safeName = track.replace(/\s+/g, '_');
            const filePath = path.join(LIASCRIPT_DIR, `${safeName}.md`);
            expect(fs.existsSync(filePath)).toBeTruthy();
        });
    });

    test('Home.md should exist', () => {
         const filePath = path.join(LIASCRIPT_DIR, 'Home.md');
         expect(fs.existsSync(filePath)).toBeTruthy();
    });
    
    test('Index.html should exist in liascript_courses', () => {
         const filePath = path.join(LIASCRIPT_DIR, 'index.html');
         expect(fs.existsSync(filePath)).toBeTruthy();
         
         const content = fs.readFileSync(filePath, 'utf8');
         expect(content).toContain('href="Home.md"');
    });

    test('Generated Files should contain Lesson Headers', () => {
        // We pick one track to spot check, e.g. Front-end Developer
        const safeName = "Front-end_Developer";
        const filePath = path.join(LIASCRIPT_DIR, `${safeName}.md`);
        
        if (fs.existsSync(filePath)) {
            const content = fs.readFileSync(filePath, 'utf8');
            // Check for a known ID header format from the script
            // body += `\n## ${id}: ${title}\n\n`;
            // We expect "## FED-01:"
            expect(content).toMatch(/## FED-01:/);
            expect(content).toMatch(/## FED-02:/);
        }
    });

    test('Quizzes should be rendered as Checkboxes or Inputs', () => {
        // FED-01 has a quiz
        const safeName = "Front-end_Developer";
        const filePath = path.join(LIASCRIPT_DIR, `${safeName}.md`);
        
        if (fs.existsSync(filePath)) {
            const content = fs.readFileSync(filePath, 'utf8');
            // We expect [x] or [ ]
            expect(content).toMatch(/\[(x| )\]/);
            
            // Check for specific text from FED-01 quiz
            expect(content).toContain("Generic `div` tags force the browser");
        }
    });

    test('Reflections should be rendered as Inputs', () => {
        // FED-01 has a reflection
        const safeName = "Front-end_Developer";
        const filePath = path.join(LIASCRIPT_DIR, `${safeName}.md`);
        
        if (fs.existsSync(filePath)) {
            const content = fs.readFileSync(filePath, 'utf8');
            // Expect LiaScript text area
            expect(content).toContain("[[___]]");
        }
    });
    
    test('Assignments should have Deliverables', () => {
        // Check UX Designer which we know has assignments
        const tracksToCheck = ["UX_Designer", "Front-end_Developer"];
        
        tracksToCheck.forEach(name => {
            const filePath = path.join(LIASCRIPT_DIR, `${name}.md`);
            if (fs.existsSync(filePath)) {
                const content = fs.readFileSync(filePath, 'utf8');
                // Accept either "**Deliverable**:" or "#### Deliverable" formats
                expect(content).toMatch(/(\*\*Deliverable\*\*:|#### Deliverable)/);
            }
        });
    });

});
