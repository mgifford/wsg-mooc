const fs = require('fs');
const path = require('path');

const LIASCRIPT_DIR = path.join(__dirname, '../liascript_courses');

describe('Build Process Validation', () => {

    describe('Conversion Script Output', () => {
        
        test('All generated files should have LiaScript frontmatter', () => {
            const files = fs.readdirSync(LIASCRIPT_DIR)
                .filter(f => f.endsWith('.md'));
            
            files.forEach(file => {
                const content = fs.readFileSync(path.join(LIASCRIPT_DIR, file), 'utf8');
                expect(content).toMatch(/<!--[\s\S]*?author:[\s\S]*?-->/);
            });
        });

        test('Generated files should have version numbers', () => {
            const files = fs.readdirSync(LIASCRIPT_DIR)
                .filter(f => f.endsWith('.md'));
            
            files.forEach(file => {
                const content = fs.readFileSync(path.join(LIASCRIPT_DIR, file), 'utf8');
                expect(content).toMatch(/version:\s*\d+\.\d+\.\d+/);
            });
        });

        test('Quiz checkboxes should be properly formatted', () => {
            const fedFile = path.join(LIASCRIPT_DIR, 'Front-end_Developer.md');
            
            if (fs.existsSync(fedFile)) {
                const content = fs.readFileSync(fedFile, 'utf8');
                
                // Should have both checked and unchecked
                expect(content).toContain('[x]');
                expect(content).toContain('[ ]');
                
                // Should not have malformed checkboxes
                expect(content).not.toMatch(/\[\s{2,}\]/);
                expect(content).not.toMatch(/\[xx\]/);
            }
        });

        test('Reflection inputs should use LiaScript syntax', () => {
            const files = fs.readdirSync(LIASCRIPT_DIR)
                .filter(f => f.endsWith('.md') && f !== 'Home.md');
            
            files.forEach(file => {
                const content = fs.readFileSync(path.join(LIASCRIPT_DIR, file), 'utf8');
                
                if (content.includes('Reflection')) {
                    // Should use [[___]] for text input
                    expect(content).toMatch(/\[\[___\]\]/);
                }
            });
        });

        test('Assignment sections should be properly formatted', () => {
            const files = fs.readdirSync(LIASCRIPT_DIR)
                .filter(f => f.endsWith('.md') && f !== 'Home.md');
            
            files.forEach(file => {
                const content = fs.readFileSync(path.join(LIASCRIPT_DIR, file), 'utf8');
                
                if (content.includes('Assignment')) {
                    // Should have Steps and Deliverable sections (flexible format)
                    expect(content).toMatch(/(\*\*Steps:\*\*|#### Steps)/);
                    expect(content).toMatch(/(\*\*Deliverable\*\*:|#### Deliverable)/);
                }
            });
        });
    });

    describe('Link Integrity', () => {
        
        test('Home.md should link to all track files', () => {
            const homeContent = fs.readFileSync(path.join(LIASCRIPT_DIR, 'Home.md'), 'utf8');
            
            const tracks = ['Front-end_Developer.md', 'UX_Designer.md', 'Visual_Designer.md', 'Content_Author.md'];
            
            tracks.forEach(track => {
                expect(homeContent).toContain(track);
            });
        });

        test('All linked files should exist', () => {
            const files = fs.readdirSync(LIASCRIPT_DIR)
                .filter(f => f.endsWith('.md'));
            
            files.forEach(file => {
                const content = fs.readFileSync(path.join(LIASCRIPT_DIR, file), 'utf8');
                
                // Find markdown links
                const linkRegex = /\[([^\]]+)\]\(([^)]+)\)/g;
                let match;
                
                while ((match = linkRegex.exec(content)) !== null) {
                    const link = match[2];
                    
                    // Check internal links (not external URLs)
                    if (!link.startsWith('http') && !link.startsWith('#')) {
                        const linkedFile = path.join(LIASCRIPT_DIR, link);
                        expect(fs.existsSync(linkedFile)).toBeTruthy();
                    }
                }
            });
        });
    });

    describe('Performance Budget', () => {
        
        test('Individual course files should be under 500KB', () => {
            const files = fs.readdirSync(LIASCRIPT_DIR)
                .filter(f => f.endsWith('.md'));
            
            files.forEach(file => {
                const stats = fs.statSync(path.join(LIASCRIPT_DIR, file));
                expect(stats.size).toBeLessThan(500 * 1024);
            });
        });

        test('Total liascript_courses size should be under 5MB', () => {
            let totalSize = 0;
            
            const files = fs.readdirSync(LIASCRIPT_DIR);
            files.forEach(file => {
                const stats = fs.statSync(path.join(LIASCRIPT_DIR, file));
                if (stats.isFile()) {
                    totalSize += stats.size;
                }
            });
            
            expect(totalSize).toBeLessThan(5 * 1024 * 1024);
        });
    });

    describe('Accessibility', () => {
        
        test('viewer.html should have proper semantic HTML', () => {
            const viewerPath = path.join(LIASCRIPT_DIR, 'viewer.html');
            
            if (fs.existsSync(viewerPath)) {
                const content = fs.readFileSync(viewerPath, 'utf8');
                
                // Should have lang attribute
                expect(content).toMatch(/<html[^>]*lang=/);
                
                // Should have title
                expect(content).toMatch(/<title>/);
                
                // Should have viewport meta
                expect(content).toMatch(/viewport/);
            }
        });

        test('Generated markdown should not have accessibility anti-patterns', () => {
            const files = fs.readdirSync(LIASCRIPT_DIR)
                .filter(f => f.endsWith('.md'));
            
            files.forEach(file => {
                const content = fs.readFileSync(path.join(LIASCRIPT_DIR, file), 'utf8');
                
                // Should not have "click here" as link text
                expect(content).not.toMatch(/\[click here\]/i);
                
                // Should not have empty links
                expect(content).not.toMatch(/\[\]\(/);
            });
        });
    });
});
