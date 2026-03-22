/**
 * Code Highlighter module.
 *
 * Displays algorithm source code in the selected programming language
 * and highlights the currently executing line during visualization.
 */

const CodeHighlighter = (() => {
    /** @type {HTMLPreElement|null} */
    let displayEl = null;
    /** @type {string} */
    let currentLang = 'pseudo';
    /** @type {string[]} */
    let currentCode = [];
    /** @type {HTMLSpanElement[]} */
    let lineElements = [];

    /**
     * Initialize the code highlighter with a DOM element.
     *
     * @param {HTMLPreElement} el - The pre element for code display.
     * @returns {void}
     */
    function init(el) {
        displayEl = el;
    }

    /**
     * Load and render code lines into the display panel.
     * Creates numbered line elements for each code line.
     *
     * @param {string[]} codeLines - Array of code line strings to display.
     * @returns {void}
     */
    function loadCode(codeLines) {
        currentCode = codeLines;
        displayEl.innerHTML = '';
        lineElements = [];

        for (let i = 0; i < codeLines.length; i++) {
            /** @type {HTMLSpanElement} */
            const lineSpan = document.createElement('span');
            lineSpan.className = 'code-line';

            /** @type {HTMLSpanElement} */
            const numberSpan = document.createElement('span');
            numberSpan.className = 'line-number';
            numberSpan.textContent = String(i + 1);

            lineSpan.appendChild(numberSpan);

            const text = codeLines[i];
            const trimmed = text.trimStart();
            const isFullComment = trimmed.startsWith('#') || trimmed.startsWith('//');

            if (isFullComment) {
                // Entire line is a comment (section header)
                const commentSpan = document.createElement('span');
                commentSpan.className = 'code-comment';
                commentSpan.textContent = text;
                lineSpan.appendChild(commentSpan);
                lineSpan.classList.add('comment-line');
            } else {
                // Check for inline comment after code
                const split = splitInlineComment(text);
                if (split) {
                    lineSpan.appendChild(document.createTextNode(split.code));
                    const commentSpan = document.createElement('span');
                    commentSpan.className = 'code-comment';
                    commentSpan.textContent = split.comment;
                    lineSpan.appendChild(commentSpan);
                } else {
                    lineSpan.appendChild(document.createTextNode(text));
                }
            }

            displayEl.appendChild(lineSpan);
            displayEl.appendChild(document.createTextNode('\n'));
            lineElements.push(lineSpan);
        }
    }

    /**
     * Split a code line into code and inline comment parts.
     * Looks for `  #` or `  //` patterns that indicate an inline comment.
     * Ignores `#` or `//` inside strings or at the start of the line.
     *
     * @param {string} line - The code line to split.
     * @returns {{code: string, comment: string}|null} Split parts, or null if no inline comment.
     */
    function splitInlineComment(line) {
        // Look for "  # " or "  // " pattern (at least 2 spaces before comment marker)
        const hashMatch = line.match(/^(.+?\S)\s{2,}(#\s.*)$/);
        if (hashMatch) {
            return { code: hashMatch[1], comment: '  ' + hashMatch[2] };
        }

        const slashMatch = line.match(/^(.+?\S)\s{2,}(\/\/\s.*)$/);
        if (slashMatch) {
            return { code: slashMatch[1], comment: '  ' + slashMatch[2] };
        }

        return null;
    }

    /**
     * Highlight a specific line and scroll it into view.
     *
     * @param {number} lineIdx - The 0-based line index to highlight.
     * @returns {void}
     */
    function highlightLine(lineIdx) {
        clearHighlight();
        if (lineIdx >= 0 && lineIdx < lineElements.length) {
            lineElements[lineIdx].classList.add('highlighted');
            lineElements[lineIdx].scrollIntoView({ block: 'nearest', behavior: 'smooth' });
        }
    }

    /**
     * Remove highlight from all lines.
     *
     * @returns {void}
     */
    function clearHighlight() {
        for (const el of lineElements) {
            el.classList.remove('highlighted');
        }
    }

    /**
     * Get the currently selected language key.
     *
     * @returns {string} Current language key (e.g. 'pseudo', 'python', 'java', 'cpp', 'javascript').
     */
    function getLanguage() {
        return currentLang;
    }

    /**
     * Set the current language for code display.
     *
     * @param {string} lang - The language key to set.
     * @returns {void}
     */
    function setLanguage(lang) {
        currentLang = lang;
    }

    return { init, loadCode, highlightLine, clearHighlight, getLanguage, setLanguage };
})();

export default CodeHighlighter;
