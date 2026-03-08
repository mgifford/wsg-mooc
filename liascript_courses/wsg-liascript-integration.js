/**
 * WSG MOOC - LiaScript Integration Layer
 * 
 * Automatically captures quiz answers, reflection text, and rubric checks
 * and stores them in localStorage via wsg-learning-journal.js
 * 
 * This script should be injected into LiaScript markdown files
 * and will auto-hook into LiaScript's interactive elements.
 */

(function() {
  'use strict';

  // Wait for LiaScript and journal to be ready
  const waitForDependencies = (callback) => {
    const checkReady = () => {
      // LiaScript exposes LiaScript object when loaded
      // wsgJournal is exposed by wsg-learning-journal.js
      if (typeof wsgJournal !== 'undefined') {
        callback();
      } else {
        setTimeout(checkReady, 100);
      }
    };
    checkReady();
  };

  waitForDependencies(() => {
    const journal = wsgJournal;

    /**
     * Extract lesson ID from current page/URL
     * Expects URL like: Front-end_Developer.md or FED-01
     */
    function getLessonId() {
      const pathname = window.location.pathname;
      // Try to extract ID from URL path
      const match = pathname.match(/([A-Z]{3}-\d{2})/);
      if (match) return match[1];
      
      // Fallback: try to get from page title or meta
      const title = document.title || '';
      const titleMatch = title.match(/([A-Z]{3}-\d{2})/);
      if (titleMatch) return titleMatch[1];
      
      // Last resort: generic ID
      return 'UNKNOWN';
    }

    const currentLessonId = getLessonId();
    console.log(`WSG MOOC Integration: Lesson ID = ${currentLessonId}`);

    /**
     * Hook into LiaScript quiz questions
     * LiaScript uses [x] or [ ] syntax for multiple choice
     * and stores state in its own internal data
     */
    function hookQuizzes() {
      // LiaScript stores quiz state in data structures
      // We'll periodically scan the DOM for quiz containers and hook into them
      
      const quizContainers = document.querySelectorAll('[data-lia-quiz], .lia-quiz, .lia-question');
      
      quizContainers.forEach((container, idx) => {
        // Check if already hooked
        if (container.dataset.wsgHooked) return;
        container.dataset.wsgHooked = 'true';

        // Find radio buttons or checkboxes (quiz options)
        const inputs = container.querySelectorAll('input[type="radio"], input[type="checkbox"]');
        
        inputs.forEach((input) => {
          input.addEventListener('change', () => {
            const label = input.nextElementSibling?.textContent || input.parentElement?.textContent || '';
            const isCorrect = input.dataset.correct === 'true' || input.parentElement?.classList.contains('correct');
            const questionText = container.querySelector('strong, p, label')?.textContent || `Question ${idx + 1}`;
            
            journal.saveQuizAnswer(
              currentLessonId,
              idx,
              label.trim().substring(0, 100), // Limit label length
              isCorrect,
              questionText
            );
            
            console.log(`WSG MOOC: Saved quiz answer for Q${idx + 1}`, { label, isCorrect });
          });
        });
      });
    }

    /**
     * Hook into reflection text inputs
     * LiaScript renders text inputs as [[___]] which become <input type="text"> or <textarea>
     */
    function hookReflections() {
      const reflectionInputs = document.querySelectorAll('input[placeholder*="Your response"], textarea[placeholder*="Your response"], .lia-text-input');
      
      reflectionInputs.forEach((input, idx) => {
        // Check if already hooked
        if (input.dataset.wsgHooked) return;
        input.dataset.wsgHooked = 'true';

        // Restore persisted value if exists
        const persisted = journal.getReflection(currentLessonId, idx);
        if (persisted) {
          input.value = persisted;
        }

        // Hook change event for auto-save
        input.addEventListener('change', () => {
          const promptText = input.previousElementSibling?.textContent || `Reflection ${idx + 1}`;
          journal.saveReflection(currentLessonId, idx, input.value, promptText);
          console.log(`WSG MOOC: Saved reflection ${idx + 1}`, { length: input.value.length });
        });

        // Also save on blur for better UX
        input.addEventListener('blur', () => {
          const promptText = input.previousElementSibling?.textContent || `Reflection ${idx + 1}`;
          journal.saveReflection(currentLessonId, idx, input.value, promptText);
        });
      });
    }

    /**
     * Hook into rubric checkboxes
     * Self-audit items that users check off
     */
    function hookRubric() {
      const rubricItems = document.querySelectorAll('[data-rubric], .rubric-item, li input[type="checkbox"]');
      
      rubricItems.forEach((item, idx) => {
        if (item.dataset.wsgHooked) return;
        item.dataset.wsgHooked = 'true';

        const checkbox = item.querySelector('input[type="checkbox"]') || item;
        if (!checkbox) return;

        // Restore persisted state
        const itemId = item.dataset.rubricId || item.id || `rubric_${idx}`;
        const checks = journal.getRubricChecks(currentLessonId);
        if (checks[itemId]?.checked) {
          checkbox.checked = true;
        }

        checkbox.addEventListener('change', () => {
          const itemText = item.textContent?.substring(0, 100) || `Rubric item ${idx + 1}`;
          journal.saveRubricCheck(currentLessonId, itemId, checkbox.checked, itemText);
          console.log(`WSG MOOC: Rubric item ${itemId} checked = ${checkbox.checked}`);
        });
      });
    }

    /**
     * Hook into diagnostic questions
     * Pre-assessment before lesson
     */
    function hookDiagnostic() {
      const diagnosticInputs = document.querySelectorAll('[data-diagnostic], .diagnostic-question');
      
      diagnosticInputs.forEach((container) => {
        if (container.dataset.wsgHooked) return;
        container.dataset.wsgHooked = 'true';

        const inputs = container.querySelectorAll('input[type="radio"], input[type="checkbox"], select');
        const questionId = container.dataset.diagnosticId || container.id || 'diag_' + Math.random();
        const questionText = container.textContent?.substring(0, 100) || '';

        inputs.forEach((input) => {
          input.addEventListener('change', () => {
            const response = input.type === 'checkbox' ? input.checked : input.value;
            journal.saveDiagnostic(currentLessonId, questionId, response, questionText);
            console.log(`WSG MOOC: Diagnostic saved`, { questionId, response });
          });
        });
      });
    }

    /**
     * Create a visible journal summary panel (optional)
     * Shows user what's been saved
     */
    function createJournalPanel() {
      const panelId = 'wsg-journal-panel';
      if (document.getElementById(panelId)) return; // Already exists

      const panel = document.createElement('div');
      panel.id = panelId;
      panel.innerHTML = `
        <div style="
          position: fixed;
          bottom: 20px;
          right: 20px;
          background: white;
          border: 1px solid #667eea;
          border-radius: 8px;
          padding: 12px;
          font-size: 12px;
          box-shadow: 0 4px 12px rgba(0,0,0,0.15);
          z-index: 9999;
          max-width: 250px;
        ">
          <strong style="color: #667eea;">Learning Journal Active</strong>
          <div id="wsg-journal-stats" style="margin-top: 8px; line-height: 1.4;">
            <p>Tracking quiz answers, reflections, and rubric checks...</p>
          </div>
          <button id="wsg-journal-download" style="
            background: #667eea;
            color: white;
            border: none;
            padding: 6px 12px;
            border-radius: 4px;
            cursor: pointer;
            margin-top: 8px;
            font-size: 11px;
          ">Download Evidence</button>
        </div>
      `;
      
      document.body.appendChild(panel);

      // Download button handler
      document.getElementById('wsg-journal-download').addEventListener('click', () => {
        journal.downloadEvidencePack(currentLessonId);
      });

      // Update stats periodically
      const updateStats = () => {
        const summary = journal.getSummary();
        const lesson = summary.lessons[currentLessonId];
        if (lesson) {
          document.getElementById('wsg-journal-stats').innerHTML = `
            <p>Quiz: ${lesson.quizCorrect}/${lesson.quizAnswers} correct</p>
            <p>Reflections: ${lesson.reflectionsCount}</p>
            <p>Rubric: ${lesson.rubricChecked}/${lesson.rubricTotal}</p>
          `;
        }
      };

      updateStats();
      setInterval(updateStats, 2000);
    }

    /**
     * Initialize hooks when page is ready
     */
    function initializeHooks() {
      // Initial hook
      hookQuizzes();
      hookReflections();
      hookRubric();
      hookDiagnostic();
      createJournalPanel();

      // Re-hook periodically (for dynamically added content)
      setInterval(() => {
        hookQuizzes();
        hookReflections();
        hookRubric();
        hookDiagnostic();
      }, 2000);
    }

    // Wait for DOM to be ready
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', initializeHooks);
    } else {
      initializeHooks();
    }
  });
})();
