# Lessons Learned

## Session 2026-03-22 - Initial Build

### 1. Tech Stack Pivot
- **Context**: Initially scaffolded with Flask as the backend server.
- **Lesson**: User prefers `pnpm dev` (Vite) over Flask for frontend-only projects.
- **Pattern**: When the project is purely client-side (no backend logic), default to Vite + pnpm rather than a Python server.
- **Rule**: Always ask about preferred dev tooling early in planning to avoid rework.

### 2. Multi-Language Support
- **Context**: Initial plan only included Python, Java, C++, and JavaScript code snippets.
- **Lesson**: Code display should include pseudocode as the default, not just real programming languages.
- **Pattern**: Pseudocode is language-agnostic and best for initial understanding before switching to a specific language.
- **Rule**: When showing algorithm code, always lead with pseudocode.

### 3. Containerization By Default
- **Context**: Docker support was added as an afterthought during polish.
- **Lesson**: Even simple frontend apps should have Docker support from the start.
- **Pattern**: Multi-stage builds (node build + nginx serve) keep production images minimal.
- **Rule**: Include dockerfile and docker-compose.yaml in initial scaffolding for all projects.

### 4. Self-Healing Setup Scripts
- **Context**: Setup script initially exited on missing Node.js instead of installing it.
- **Lesson**: Setup scripts should install or correct missing dependencies rather than failing.
- **Pattern**: Detect what is missing, install it automatically, and verify after installation.
- **Rule**: Never exit with an error when the dependency can be installed programmatically.

## Session 2026-03-23 - UX Refinements and Feature Expansion

### 5. Code Readability Over Density
- **Context**: Inline comments were wrapping to new lines, making code hard to read.
- **Lesson**: Code panel should use `white-space: pre` (no wrapping) with a smaller font and horizontal scroll when needed. Wrapping comments destroy readability.
- **Pattern**: Reduce font size to fit most lines, but let long lines scroll rather than wrap.
- **Rule**: Never use `pre-wrap` for code display panels.

### 6. Comments as a Learning Tool
- **Context**: User wanted inline explanations for every line of code.
- **Lesson**: Step-numbered inline comments (e.g., `# [3] Compare neighbors`) provide a clear progression. Section-level comments stay standalone; line-level comments go inline to the right.
- **Pattern**: Section headers on their own line, line explanations inline after the code.
- **Rule**: Always add step numbers so learners can follow the execution order.

### 7. Information Density Matters
- **Context**: Info panel text was too large, requiring scrolling to see all details.
- **Lesson**: For reference panels, compact formatting (smaller fonts, tight spacing) is better than generous whitespace. Users want to see everything at once without scrolling.
- **Pattern**: Prioritize fitting all info on screen over visual comfort margins.
- **Rule**: Test that the info panel fits fully without scrolling at 1080p.

### 8. Global vs Per-Algorithm UI
- **Context**: Cheat sheet was initially inside the per-algorithm info panel.
- **Lesson**: Reference content that applies to all algorithms should be global (accessible from any view), not buried inside a per-item panel.
- **Pattern**: Use a collapsible bottom drawer for global reference content.
- **Rule**: Ask "does this change when the user switches algorithms?" to decide placement.

### 9. Comparison Mode Design
- **Context**: User wanted to compare two algorithms side by side.
- **Lesson**: In compare mode, only show stats that matter for comparison (name, time, comparisons, swaps, complexity). Full descriptions stay in the individual info panel.
- **Pattern**: Compare views should be data-dense and numbers-focused.
- **Rule**: Strip compare views to just the metrics. Descriptions belong in the detail view.

### 10. Content Creation as a Feature
- **Context**: User wants to record algorithm visualizations for YouTube Shorts.
- **Lesson**: Build content creation tools directly into the app rather than relying on external screen recorders. A portrait layout toggle + built-in recording with quality presets makes the workflow seamless.
- **Pattern**: If users will create content from the app, add layout modes and recording as first-class features.
- **Rule**: Offer quality presets that match the target platform (Shorts = 9:16 at 1080p/4K, Landscape = 16:9).

### 11. Parallel Algorithm Development
- **Context**: Adding 4 new algorithms (Heap Sort, Shell Sort, Counting Sort, Jump Search) at once.
- **Lesson**: New algorithms that share the same infrastructure (generator pattern, code snippet format, complexity data) can be developed in parallel via subagents. The template is well-defined enough that each algorithm is independent.
- **Pattern**: When adding to a well-established pattern, parallelize aggressively.
- **Rule**: Ensure the HTML dropdowns and cheat sheet are updated alongside the algorithm code.
