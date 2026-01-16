/**
 * WSG MOOC Learning Journal - localStorage persistence
 * 
 * Captures and persists:
 * - Quiz answers (with timestamps)
 * - Reflection text inputs
 * - Self-audit rubric checks
 * - Diagnostic responses
 * 
 * Storage location: browser's localStorage under key: 'wsg-mooc-journal'
 * Structure: { lessonId: { quiz: [], reflections: {}, rubric: [], diagnostic: {} } }
 */

class WSGLearningJournal {
  constructor() {
    this.storageKey = 'wsg-mooc-journal';
    this.dataStructure = {
      version: '1.0',
      lastUpdated: null,
      lessons: {} // { 'FED-01': { quiz: [...], reflections: {...}, rubric: [...], diagnostic: {...} } }
    };
    this.load();
  }

  /**
   * Load journal from localStorage
   */
  load() {
    try {
      const stored = localStorage.getItem(this.storageKey);
      if (stored) {
        this.dataStructure = JSON.parse(stored);
      }
    } catch (e) {
      console.warn('WSG MOOC: Failed to load journal from localStorage', e);
      // Continue with empty structure
    }
  }

  /**
   * Save journal to localStorage
   */
  save() {
    try {
      this.dataStructure.lastUpdated = new Date().toISOString();
      localStorage.setItem(this.storageKey, JSON.stringify(this.dataStructure));
    } catch (e) {
      console.error('WSG MOOC: Failed to save journal to localStorage', e);
    }
  }

  /**
   * Ensure lesson entry exists in data structure
   */
  ensureLesson(lessonId) {
    if (!this.dataStructure.lessons[lessonId]) {
      this.dataStructure.lessons[lessonId] = {
        quiz: [],
        reflections: {},
        rubric: [],
        diagnostic: {}
      };
    }
  }

  /**
   * Save quiz answer
   * @param {string} lessonId - e.g., 'FED-01'
   * @param {number} questionIndex - Question number (0-indexed)
   * @param {string} selectedAnswer - Text of selected answer
   * @param {boolean} isCorrect - Whether answer is correct
   * @param {string} scenarioText - The quiz scenario/question
   */
  saveQuizAnswer(lessonId, questionIndex, selectedAnswer, isCorrect, scenarioText = '') {
    this.ensureLesson(lessonId);
    
    this.dataStructure.lessons[lessonId].quiz[questionIndex] = {
      questionIndex,
      selectedAnswer,
      isCorrect,
      scenario: scenarioText,
      timestamp: new Date().toISOString()
    };
    
    this.save();
  }

  /**
   * Get quiz answers for a lesson
   */
  getQuizAnswers(lessonId) {
    this.ensureLesson(lessonId);
    return this.dataStructure.lessons[lessonId].quiz || [];
  }

  /**
   * Save reflection text
   * @param {string} lessonId - e.g., 'FED-01'
   * @param {number} reflectionIndex - Reflection number (0-indexed)
   * @param {string} text - Reflection text input
   * @param {string} prompt - The reflection prompt
   */
  saveReflection(lessonId, reflectionIndex, text, prompt = '') {
    this.ensureLesson(lessonId);
    
    this.dataStructure.lessons[lessonId].reflections[reflectionIndex] = {
      reflectionIndex,
      text,
      prompt,
      wordCount: text.split(/\s+/).length,
      timestamp: new Date().toISOString()
    };
    
    this.save();
  }

  /**
   * Get reflection text
   */
  getReflection(lessonId, reflectionIndex) {
    this.ensureLesson(lessonId);
    const reflection = this.dataStructure.lessons[lessonId].reflections[reflectionIndex];
    return reflection ? reflection.text : '';
  }

  /**
   * Get all reflections for a lesson
   */
  getReflections(lessonId) {
    this.ensureLesson(lessonId);
    return this.dataStructure.lessons[lessonId].reflections || {};
  }

  /**
   * Save rubric self-check
   * @param {string} lessonId - e.g., 'FED-01'
   * @param {string} rubricItemId - e.g., 'rubric_1'
   * @param {boolean} checked - Whether user confirmed this item
   * @param {string} itemText - Text of the rubric item
   */
  saveRubricCheck(lessonId, rubricItemId, checked, itemText = '') {
    this.ensureLesson(lessonId);
    
    this.dataStructure.lessons[lessonId].rubric[rubricItemId] = {
      itemId: rubricItemId,
      checked,
      itemText,
      timestamp: new Date().toISOString()
    };
    
    this.save();
  }

  /**
   * Get rubric status for a lesson
   */
  getRubricChecks(lessonId) {
    this.ensureLesson(lessonId);
    return this.dataStructure.lessons[lessonId].rubric || {};
  }

  /**
   * Check if all rubric items are checked
   */
  isRubricComplete(lessonId) {
    const rubric = this.getRubricChecks(lessonId);
    const items = Object.values(rubric);
    if (items.length === 0) return false;
    return items.every(item => item.checked === true);
  }

  /**
   * Save diagnostic response
   * @param {string} lessonId - e.g., 'FED-01'
   * @param {string} questionId - e.g., 'diag_1'
   * @param {any} response - User's response (boolean, number, string, etc.)
   * @param {string} question - The diagnostic question text
   */
  saveDiagnostic(lessonId, questionId, response, question = '') {
    this.ensureLesson(lessonId);
    
    this.dataStructure.lessons[lessonId].diagnostic[questionId] = {
      questionId,
      response,
      question,
      timestamp: new Date().toISOString()
    };
    
    this.save();
  }

  /**
   * Get diagnostic responses
   */
  getDiagnostic(lessonId) {
    this.ensureLesson(lessonId);
    return this.dataStructure.lessons[lessonId].diagnostic || {};
  }

  /**
   * Get all lesson data
   */
  getLesson(lessonId) {
    this.ensureLesson(lessonId);
    return this.dataStructure.lessons[lessonId];
  }

  /**
   * Export evidence pack (for badge issuance)
   * Returns JSON suitable for hashing and badge verification
   */
  exportEvidencePack(lessonId) {
    return {
      lessonId,
      data: this.getLesson(lessonId),
      exportedAt: new Date().toISOString()
    };
  }

  /**
   * Export all evidence (for all lessons)
   */
  exportAllEvidence() {
    return {
      version: this.dataStructure.version,
      lessons: this.dataStructure.lessons,
      exportedAt: new Date().toISOString()
    };
  }

  /**
   * Download evidence pack as JSON file
   * @param {string} lessonId - Optional; if omitted, exports all
   */
  downloadEvidencePack(lessonId = null) {
    const data = lessonId 
      ? this.exportEvidencePack(lessonId)
      : this.exportAllEvidence();
    
    const filename = lessonId 
      ? `wsg-mooc-evidence-${lessonId}.json`
      : `wsg-mooc-evidence-all.json`;
    
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }

  /**
   * Clear all data (destructive)
   */
  clear() {
    if (confirm('Are you sure you want to clear all learning progress? This cannot be undone.')) {
      localStorage.removeItem(this.storageKey);
      this.dataStructure = {
        version: '1.0',
        lastUpdated: null,
        lessons: {}
      };
    }
  }

  /**
   * Get summary stats
   */
  getSummary() {
    const lessons = Object.keys(this.dataStructure.lessons);
    const stats = {
      totalLessons: lessons.length,
      lessons: {}
    };

    lessons.forEach(lessonId => {
      const lesson = this.dataStructure.lessons[lessonId];
      stats.lessons[lessonId] = {
        quizAnswers: lesson.quiz.length,
        quizCorrect: lesson.quiz.filter(q => q.isCorrect).length,
        reflectionsCount: Object.keys(lesson.reflections).length,
        totalReflectionWords: Object.values(lesson.reflections).reduce((sum, r) => sum + (r.wordCount || 0), 0),
        rubricChecked: Object.values(lesson.rubric).filter(r => r.checked).length,
        rubricTotal: Object.keys(lesson.rubric).length
      };
    });

    return stats;
  }
}

// Initialize and expose globally
const wsgJournal = new WSGLearningJournal();

// Auto-save on window unload
window.addEventListener('beforeunload', () => {
  wsgJournal.save();
});

// Log initialization
console.log('WSG Learning Journal initialized', wsgJournal.getSummary());
