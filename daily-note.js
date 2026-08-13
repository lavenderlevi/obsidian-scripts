module.exports = async (params) => {
    const app = params.app;
    const obsidian = params.obsidian;

    // ============================================================
    // CONFIG
    // ============================================================

    const GROUPS = [
    {
        title: "Today's Focus",
        sections: [
            {
                id: "must-do",
                heading: "### 1. Must do",
                title: "Must do",
                type: "checkbox",
                placeholder: "One task per line..."
            },
            {
                id: "should-do",
                heading: "### 2. Should do",
                title: "Should do",
                type: "checkbox",
                placeholder: "One task per line..."
            },
            {
                id: "optional",
                heading: "### 3. Optional",
                title: "Optional",
                type: "checkbox",
                placeholder: "One task per line..."
            }
        ]
    },

    {
        title: "Study Log",
        sections: [
            {
                id: "physics",
                heading: "### Physics",
                title: "Physics",
                type: "bullet",
                placeholder: "What did you study in Physics today?"
            },
            {
                id: "mathematics",
                heading: "### Mathematics",
                title: "Mathematics",
                type: "bullet",
                placeholder: "What did you study in Mathematics today?"
            },
            {
                id: "materials-science",
                heading: "### Materials Science",
                title: "Materials Science",
                type: "bullet",
                placeholder: "What did you study in Materials Science today?"
            },
            {
                id: "semiconductor",
                heading: "### Semiconductor",
                title: "Semiconductor",
                type: "bullet",
                placeholder: "What did you study in Semiconductor today?"
            },
            {
                id: "programming-ml",
                heading: "### Programming / ML",
                title: "Programming / ML",
                type: "bullet",
                placeholder: "What did you study in Programming / ML today?"
            }
        ]
    },

    {
        title: "Active Recall",
        sections: [
            {
                id: "active-recall",
                heading: "## Active Recall",
                title: "Without looking at your notes, what did you learn today?",
                type: "numbered",
                maxLines: 3,
                placeholder: "Maximum 3 items. One item per line."
            }
        ]
    },

    {
        title: "Reflection",
        sections: [
            {
                id: "problems",
                heading: "## Problems I Couldn't Solve",
                title: "Problems I Couldn't Solve",
                type: "bullet",
                placeholder: "One problem per line..."
            },
            {
                id: "understood",
                heading: "## What I Actually Understood",
                title: "Explain one difficult concept from today in your own words.",
                type: "quote",
                placeholder: "You can write multiple lines..."
            },
            {
                id: "questions",
                heading: "## New Questions",
                title: "New Questions",
                type: "checkbox",
                placeholder: "One question per line..."
            }
        ]
    },

    {
        title: "Project / Research",
        sections: [
            {
                id: "project",
                heading: "## Project / Research Progress",
                title: "Project / Research Progress",
                type: "bullet",
                placeholder: "One item per line..."
            }
        ]
    },

    {
        title: "End-of-Day Review",
        sections: [
            {
                id: "went-well",
                heading: "### What went well?",
                title: "What went well?",
                type: "bullet",
                placeholder: "One item per line..."
            },
            {
                id: "went-wrong",
                heading: "### What went wrong?",
                title: "What went wrong?",
                type: "bullet",
                placeholder: "One item per line..."
            },
            {
                id: "change-tomorrow",
                heading: "### What should I change tomorrow?",
                title: "What should I change tomorrow?",
                type: "bullet",
                placeholder: "One item per line..."
            },
            {
                id: "important-learned",
                heading: "### Most important thing I learned",
                title: "Most important thing I learned",
                type: "bullet",
                placeholder: "Write the most important thing you learned..."
            }
        ]
    },

    {
        title: "Tomorrow",
        sections: [
            {
                id: "tomorrow",
                heading: "## Tomorrow",
                title: "Tomorrow",
                type: "checkbox",
                placeholder: "One task per line..."
            }
        ]
    }
];
    const sections = [];

    for (const group of GROUPS) {
        for (const section of group.sections) {
            sections.push(section);
        }
    }

    // ============================================================
    // ACTIVE FILE
    // ============================================================

    const file = app.workspace.getActiveFile();

    if (!file) {
        new obsidian.Notice("No active note is open.");
        return;
    }

    if (file.extension !== "md") {
        new obsidian.Notice("The active file is not a Markdown note.");
        return;
    }

    // ============================================================
    // READ NOTE
    // ============================================================

    const originalContent = await app.vault.read(file);

    // ============================================================
    // CHECK HEADINGS
    // ============================================================

    for (const section of sections) {
        if (!hasHeading(originalContent, section.heading)) {
            new obsidian.Notice(
                "Missing heading: " + section.heading
            );
            return;
        }
    }

    // ============================================================
    // LOAD EXISTING VALUES
    // ============================================================

    const values = {};

    for (const section of sections) {
        const body = getSectionBody(
            originalContent,
            section.heading
        );

        values[section.id] = extractContent(
            body,
            section.type
        );
    }

    // ============================================================
    // OPEN MODAL
    // ============================================================

    const result = await openModal(
        app,
        obsidian,
        file,
        GROUPS,
        sections,
        values
    );

    if (result === null) {
        new obsidian.Notice("Cancelled.");
        return;
    }

    // ============================================================
    // UPDATE NOTE
    // ============================================================

    let newContent = originalContent;

    for (const section of sections) {

    const value = result[section.id] || "";

    const formatted = formatContent(
        value,
        section.type,
        section.maxLines
    );

    newContent = replaceSection(
        newContent,
        section.heading,
        formatted
    );
}
    // ============================================================
    // SAVE
    // ============================================================

    if (newContent === originalContent) {
        new obsidian.Notice("No changes made.");
        return;
    }

    await app.vault.modify(file, newContent);

    new obsidian.Notice(
        "Daily Note updated successfully."
    );
};


// =================================================================
// MODAL
// =================================================================

function openModal(
    app,
    obsidian,
    file,
    groups,
    sections,
    values
) {
    return new Promise((resolve) => {

        class DailyModal extends obsidian.Modal {

            constructor(app) {
                super(app);
                this.result = null;
                this.fields = {};
            }

            onOpen() {

                const container = this.contentEl;

                container.empty();

                // =================================================
                // CSS
                // =================================================

                const style = document.createElement("style");

                style.textContent = `
                    .daily-editor {
                        width: 850px;
                        max-width: 90vw;
                    }

                    .daily-editor-wrapper {
                        display: flex;
                        flex-direction: column;
                        height: 78vh;
                    }

                    .daily-editor-header {
                        flex-shrink: 0;
                        padding-bottom: 12px;
                        border-bottom: 1px solid var(--background-modifier-border);
                    }

                    .daily-editor-title {
                        margin: 0;
                        font-size: 1.3em;
                    }

                    .daily-editor-subtitle {
                        margin-top: 5px;
                        color: var(--text-muted);
                        font-size: 0.85em;
                    }

                    .daily-editor-scroll {
                        flex: 1;
                        overflow-y: auto;
                        padding: 18px 8px 20px 0;
                    }

                    .daily-editor-group {
                        margin-bottom: 28px;
                    }

                    .daily-editor-group-title {
                        font-size: 1.05em;
                        font-weight: 700;
                        margin: 0 0 14px 0;
                        padding-bottom: 7px;
                        border-bottom: 1px solid var(--background-modifier-border);
                    }

                    .daily-editor-field {
                        margin-bottom: 18px;
                    }

                    .daily-editor-label {
                        display: block;
                        margin-bottom: 6px;
                        font-weight: 600;
                    }

                    .daily-editor-textarea {
                        display: block;
                        width: 100%;
                        min-height: 95px;
                        box-sizing: border-box;
                        resize: vertical;
                        padding: 10px 12px;
                        border-radius: 7px;
                        border: 1px solid var(--background-modifier-border);
                        background: var(--background-primary);
                        color: var(--text-normal);
                        font-family: var(--font-text);
                        font-size: var(--font-ui-medium);
                        line-height: 1.5;
                    }

                    .daily-editor-textarea:focus {
                        outline: none;
                        border-color: var(--interactive-accent);
                    }

                    .daily-editor-description {
                        margin-top: 5px;
                        color: var(--text-muted);
                        font-size: 0.75em;
                    }

                    .daily-editor-footer {
                        flex-shrink: 0;
                        display: flex;
                        align-items: center;
                        justify-content: space-between;
                        border-top: 1px solid var(--background-modifier-border);
                        padding-top: 12px;
                    }

                    .daily-editor-help {
                        color: var(--text-muted);
                        font-size: 0.75em;
                    }

                    .daily-editor-buttons {
                        display: flex;
                        gap: 8px;
                    }
                `;

                container.appendChild(style);

                // =================================================
                // MODAL
                // =================================================

                this.modalEl.addClass(
                    "daily-editor"
                );

                const wrapper = container.createDiv({
                    cls: "daily-editor-wrapper"
                });

                // =================================================
                // HEADER
                // =================================================

                const header = wrapper.createDiv({
                    cls: "daily-editor-header"
                });

                const title = header.createEl("h2", {
                    cls: "daily-editor-title"
                });

                title.setText(
                    "Daily Note - " + getDate(file)
                );

                const subtitle = header.createDiv({
                    cls: "daily-editor-subtitle"
                });

                subtitle.setText(
                    "Fill in your study log, reflection, and plan."
                );

                // =================================================
                // SCROLL AREA
                // =================================================

                const scroll = wrapper.createDiv({
                    cls: "daily-editor-scroll"
                });

                // =================================================
                // GROUPS
                // =================================================

                for (const group of groups) {

                    const groupElement = scroll.createDiv({
                        cls: "daily-editor-group"
                    });

                    const groupTitle =
                        groupElement.createEl("h3", {
                            cls: "daily-editor-group-title"
                        });

                    groupTitle.setText(
                        group.title
                    );

                    for (const section of group.sections) {

                        createField(
                            this,
                            groupElement,
                            section,
                            values[section.id] || ""
                        );
                    }
                }

                // =================================================
                // FOOTER
                // =================================================

                const footer = wrapper.createDiv({
                    cls: "daily-editor-footer"
                });

                const help = footer.createDiv({
                    cls: "daily-editor-help"
                });

                help.setText(
                    "Ctrl + Enter = Save | Esc = Cancel"
                );

                const buttons = footer.createDiv({
                    cls: "daily-editor-buttons"
                });

                const cancel = buttons.createEl("button", {
                    text: "Cancel"
                });

                const save = buttons.createEl("button", {
                    text: "Save",
                    cls: "mod-cta"
                });

                // =================================================
                // EVENTS
                // =================================================

                cancel.addEventListener(
                    "click",
                    () => {
                        this.result = null;
                        this.close();
                    }
                );

                save.addEventListener(
                    "click",
                    () => {
                        this.save();
                    }
                );

                container.addEventListener(
                    "keydown",
                    (event) => {

                        if (event.key === "Escape") {
                            event.preventDefault();
                            this.result = null;
                            this.close();
                            return;
                        }

                        if (
                            event.key === "Enter" &&
                            event.ctrlKey
                        ) {
                            event.preventDefault();
                            this.save();
                        }
                    }
                );

                // =================================================
                // FOCUS
                // =================================================

                if (sections.length > 0) {

                    const first =
                        this.fields[
                            sections[0].id
                        ];

                    if (first) {
                        setTimeout(() => {
                            first.focus();
                        }, 100);
                    }
                }
            }

            save() {

                const result = {};

                for (const section of sections) {

                    const field =
                        this.fields[
                            section.id
                        ];

                    result[section.id] =
                        field ? field.value : "";
                }

                this.result = result;

                this.close();
            }

            onClose() {

                this.contentEl.empty();

                resolve(this.result);
            }
        }

        // ========================================================
        // CREATE FIELD
        // ========================================================

        function createField(
            modal,
            parent,
            section,
            value
        ) {

            const field = parent.createDiv({
                cls: "daily-editor-field"
            });

            const label = field.createEl("label", {
                cls: "daily-editor-label"
            });

            label.setText(
                section.title
            );

            const textarea = field.createEl("textarea", {
                cls: "daily-editor-textarea"
            });

            textarea.value = value;
            textarea.placeholder =
                section.placeholder;

            // Bigger field for long explanation
            if (section.type === "quote") {
                textarea.style.minHeight = "150px";
            }

            // Active Recall
            if (section.type === "numbered") {
                textarea.style.minHeight = "110px";
            }

            const description =
                field.createDiv({
                    cls: "daily-editor-description"
                });

            if (section.type === "checkbox") {
                description.setText(
                    "One task per line - saved as - [ ]"
                );
            }

            if (section.type === "bullet") {
                description.setText(
                    "One item per line - saved as -"
                );
            }

            if (section.type === "numbered") {
                description.setText(
                    "Maximum 3 items - numbering is automatic"
                );
            }

            if (section.type === "quote") {
                description.setText(
                    "Multiple lines supported - saved as >"
                );
            }

            modal.fields[section.id] =
                textarea;
        }

        const modal =
            new DailyModal(app);

        modal.open();
    });
}


// =================================================================
// GET DATE
// =================================================================
function cleanForInput(text) {

    if (!text) {
        return "";
    }

    return text
        .split(/\r?\n/)
        .map(line => line.trim())
        .filter(line => {

            // Empty line
            if (!line) {
                return false;
            }

            // Markdown separators / empty bullets
            // -, --, ---, *, **, ___
            if (/^[-*_]+$/.test(line)) {
                return false;
            }

            // Empty checkbox
            // - [ ]
            // - [x]
            // - [X]
            if (/^[-*]\s*\[\s*[xX]?\s*\]\s*$/.test(line)) {
                return false;
            }

            // Empty numbered list
            // 1.
            // 2.
            // 3.
            if (/^\d+\.\s*$/.test(line)) {
                return false;
            }

            // Empty quote
            // >
            if (/^>\s*$/.test(line)) {
                return false;
            }

            return true;
        })
        .join("\n");
}
function getDate(file) {

    if (
        /^\d{4}-\d{2}-\d{2}$/.test(
            file.basename
        )
    ) {
        return file.basename;
    }

    const now = new Date();

    return now.toISOString().slice(0, 10);
}


// =================================================================
// CHECK HEADING
// =================================================================

function hasHeading(
    content,
    heading
) {

    const lines =
        content.split(/\r?\n/);

    return lines.some(
        (line) =>
            line.trim() ===
            heading.trim()
    );
}


// =================================================================
// GET SECTION
// =================================================================

function getSectionBody(
    content,
    heading
) {

    const lines =
        content.split(/\r?\n/);

    const start =
        lines.findIndex(
            (line) =>
                line.trim() ===
                heading.trim()
        );

    if (start === -1) {
        return "";
    }

    let end =
        lines.length;

    for (
        let i = start + 1;
        i < lines.length;
        i++
    ) {

        if (
            /^#{1,6}\s/.test(
                lines[i]
            )
        ) {
            end = i;
            break;
        }
    }

    return lines
        .slice(start + 1, end)
        .join("\n");
}


// =================================================================
// REPLACE SECTION
// =================================================================

function replaceSection(
    content,
    heading,
    newBody
) {

    const lines =
        content.split(/\r?\n/);

    const start =
        lines.findIndex(
            (line) =>
                line.trim() ===
                heading.trim()
        );

    if (start === -1) {
        return content;
    }

    let end =
        lines.length;

    for (
        let i = start + 1;
        i < lines.length;
        i++
    ) {

        if (
            /^#{1,6}\s/.test(
                lines[i]
            )
        ) {
            end = i;
            break;
        }
    }

    const before =
        lines.slice(0, start + 1);

    const after =
        lines.slice(end);

    const bodyLines =
        newBody
            .trim()
            .split("\n");

    return [
        ...before,
        "",
        ...bodyLines,
        "",
        ...after
    ].join("\n");
}


// =================================================================
// FORMAT CONTENT
// =================================================================

function formatContent(
    input,
    type,
    maxLines
) {

    let lines =
        input
            .split(/\r?\n/)
            .map(
                (line) => line.trim()
            )
            .filter(
                (line) => line.length > 0
            );

    if (
        maxLines &&
        lines.length > maxLines
    ) {
        lines =
            lines.slice(
                0,
                maxLines
            );
    }

    if (type === "checkbox") {

        return lines
            .map((line) => {

                const clean =
                    line
                        .replace(
                            /^[-*]\s*\[[ xX]\]\s*/,
                            ""
                        )
                        .replace(
                            /^[-*]\s*/,
                            ""
                        )
                        .trim();

                return "- [ ] " + clean;
            })
            .join("\n");
    }

    if (type === "bullet") {

        return lines
            .map((line) => {

                const clean =
                    line
                        .replace(
                            /^[-*]\s*/,
                            ""
                        )
                        .trim();

                return "- " + clean;
            })
            .join("\n");
    }

    if (type === "numbered") {

        return lines
            .map(
                (line, index) => {

                    const clean =
                        line
                            .replace(
                                /^\d+\.\s*/,
                                ""
                            )
                            .trim();

                    return (
                        (index + 1) +
                        ". " +
                        clean
                    );
                }
            )
            .join("\n");
    }

    if (type === "quote") {

        return lines
            .map((line) => {

                const clean =
                    line
                        .replace(
                            /^>\s*/,
                            ""
                        )
                        .trim();

                return "> " + clean;
            })
            .join("\n");
    }

    return lines.join("\n");
}


// =================================================================
// EXTRACT EXISTING CONTENT
// =================================================================

function extractContent(body, type) {

    if (!body) {
        return "";
    }

    const lines = body
        .split(/\r?\n/)
        .map(line => line.trim());

    const result = [];

    for (let line of lines) {

        // ========================================================
        // Remove empty lines
        // ========================================================

        if (!line) {
            continue;
        }

        // ========================================================
        // CHECKBOX
        // ========================================================

        if (type === "checkbox") {

            // Remove checkbox syntax
            line = line.replace(
                /^-\s*\[[ xX]\]\s*/,
                ""
            );

            // Remove normal bullet
            line = line.replace(
                /^[-*]\s*/,
                ""
            );

            line = line.trim();

            // Ignore empty placeholder
            if (!line) {
                continue;
            }

            result.push(line);

            continue;
        }

        // ========================================================
        // BULLET
        // ========================================================

        if (type === "bullet") {

            line = line.replace(
                /^[-*]\s*/,
                ""
            );

            line = line.trim();

            // Ignore "-" placeholder
            if (!line) {
                continue;
            }

            result.push(line);

            continue;
        }

        // ========================================================
        // NUMBERED
        // ========================================================

        if (type === "numbered") {

            line = line.replace(
                /^\d+\.\s*/,
                ""
            );

            line = line.trim();

            // Ignore "1.", "2.", "3." placeholders
            if (!line) {
                continue;
            }

            result.push(line);

            continue;
        }

        // ========================================================
        // QUOTE
        // ========================================================

        if (type === "quote") {

            line = line.replace(
                /^>\s*/,
                ""
            );

            line = line.trim();

            // Ignore ">" placeholder
            if (!line) {
                continue;
            }

            result.push(line);

            continue;
        }

        // ========================================================
        // DEFAULT
        // ========================================================

        result.push(line);
    }

    return cleanForInput(result.join("\n"));
}