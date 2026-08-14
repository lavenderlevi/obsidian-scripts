const TASK_ID_PROPERTY = "task-id";
module.exports = async (params) => {

    const app =
        params.app;

    const obsidian =
        params.obsidian;


    // ============================================================
    // CONFIGURATION
    // ============================================================

    /*
     * IMPORTANT
     *
     * Daily Statistics is intentionally NOT handled here.
     *
     * Statistics are calculated by Dataview / Dashboard.
     *
     * This script is responsible only for:
     *
     * 1. Opening the Daily Note editor
     * 2. Reading existing content
     * 3. Collecting user input
     * 4. Formatting the input
     * 5. Generating task-id for NEW managed tasks
     * 6. Preserving existing task-id
     * 7. Writing the Daily Note
     */


    const TASK_ID_PROPERTY =
        "task-id";


    /*
     * Only these sections are part of the
     * persistent task-management system.
     *
     * taskManaged: true
     *
     * means:
     *
     *     New task → automatically receive task-id
     *
     * Existing task-id → preserve it
     */


    const GROUPS = [

        // ========================================================
        // TODAY'S FOCUS
        // ========================================================

        {
            title:
                "Today's Focus",

            sections: [

                {
                    id:
                        "must-do",

                    heading:
                        "### 1. Must do",

                    title:
                        "Must do",

                    type:
                        "checkbox",

                    taskManaged:
                        true,

                    placeholder:
                        "One task per line..."
                },

                {
                    id:
                        "should-do",

                    heading:
                        "### 2. Should do",

                    title:
                        "Should do",

                    type:
                        "checkbox",

                    taskManaged:
                        true,

                    placeholder:
                        "One task per line..."
                },

                {
                    id:
                        "optional",

                    heading:
                        "### 3. Optional",

                    title:
                        "Optional",

                    type:
                        "checkbox",

                    taskManaged:
                        true,

                    placeholder:
                        "One task per line..."
                }
            ]
        },


        // ========================================================
        // STUDY LOG
        // ========================================================

        {
            title:
                "Study Log",

            sections: [

                {
                    id:
                        "physics",

                    heading:
                        "### Physics",

                    title:
                        "Physics",

                    type:
                        "bullet",

                    taskManaged:
                        false,

                    placeholder:
                        "What did you study in Physics today?"
                },

                {
                    id:
                        "mathematics",

                    heading:
                        "### Mathematics",

                    title:
                        "Mathematics",

                    type:
                        "bullet",

                    taskManaged:
                        false,

                    placeholder:
                        "What did you study in Mathematics today?"
                },

                {
                    id:
                        "materials-science",

                    heading:
                        "### Materials Science",

                    title:
                        "Materials Science",

                    type:
                        "bullet",

                    taskManaged:
                        false,

                    placeholder:
                        "What did you study in Materials Science today?"
                },

                {
                    id:
                        "semiconductor",

                    heading:
                        "### Semiconductor",

                    title:
                        "Semiconductor",

                    type:
                        "bullet",

                    taskManaged:
                        false,

                    placeholder:
                        "What did you study in Semiconductor today?"
                },

                {
                    id:
                        "programming-ml",

                    heading:
                        "### Programming / ML",

                    title:
                        "Programming / ML",

                    type:
                        "bullet",

                    taskManaged:
                        false,

                    placeholder:
                        "What did you study in Programming / ML today?"
                }
            ]
        },


        // ========================================================
        // ACTIVE RECALL
        // ========================================================

        {
            title:
                "Active Recall",

            sections: [

                {
                    id:
                        "active-recall",

                    heading:
                        "## Active Recall",

                    title:
                        "Without looking at your notes, what did you learn today?",

                    type:
                        "numbered",

                    taskManaged:
                        false,

                    maxLines:
                        3,

                    placeholder:
                        "Maximum 3 items. One item per line."
                }
            ]
        },


        // ========================================================
        // REFLECTION
        // ========================================================

        {
            title:
                "Reflection",

            sections: [

                {
                    id:
                        "problems",

                    heading:
                        "## Problems I Couldn't Solve",

                    title:
                        "Problems I Couldn't Solve",

                    type:
                        "bullet",

                    taskManaged:
                        false,

                    placeholder:
                        "One problem per line..."
                },

                {
                    id:
                        "understood",

                    heading:
                        "## What I Actually Understood",

                    title:
                        "Explain one difficult concept from today in your own words.",

                    type:
                        "quote",

                    taskManaged:
                        false,

                    placeholder:
                        "You can write multiple lines..."
                },

                {
                    id:
                        "questions",

                    heading:
                        "## New Questions",

                    title:
                        "New Questions",

                    type:
                        "bullet",

                    taskManaged:
                        false,

                    placeholder:
                        "One question per line..."
                }
            ]
        },


        // ========================================================
        // PROJECT / RESEARCH
        // ========================================================

        {
            title:
                "Project / Research",

            sections: [

                {
                    id:
                        "project",

                    heading:
                        "## Project / Research Progress",

                    title:
                        "Project / Research Progress",

                    type:
                        "bullet",

                    taskManaged:
                        false,

                    placeholder:
                        "One item per line..."
                }
            ]
        },


        // ========================================================
        // END-OF-DAY REVIEW
        // ========================================================

        {
            title:
                "End-of-Day Review",

            sections: [

                {
                    id:
                        "went-well",

                    heading:
                        "### What went well?",

                    title:
                        "What went well?",

                    type:
                        "bullet",

                    taskManaged:
                        false,

                    placeholder:
                        "One item per line..."
                },

                {
                    id:
                        "went-wrong",

                    heading:
                        "### What went wrong?",

                    title:
                        "What went wrong?",

                    type:
                        "bullet",

                    taskManaged:
                        false,

                    placeholder:
                        "One item per line..."
                },

                {
                    id:
                        "change-tomorrow",

                    heading:
                        "### What should I change tomorrow?",

                    title:
                        "What should I change tomorrow?",

                    type:
                        "bullet",

                    taskManaged:
                        false,

                    placeholder:
                        "One item per line..."
                },

                {
                    id:
                        "important-learned",

                    heading:
                        "### Most important thing I learned",

                    title:
                        "Most important thing I learned",

                    type:
                        "bullet",

                    taskManaged:
                        false,

                    placeholder:
                        "Write the most important thing you learned..."
                }
            ]
        },


        // ========================================================
        // TOMORROW
        // ========================================================

        {
            title:
                "Tomorrow",

            sections: [

                {
                    id:
                        "tomorrow",

                    heading:
                        "## Tomorrow",

                    title:
                        "Tomorrow",

                    type:
                        "checkbox",

                    /*
                     * IMPORTANT:
                     *
                     * Tomorrow is NOT part of the
                     * persistent task system.
                     *
                     * Therefore new items here do NOT
                     * receive task-id.
                     */

                    taskManaged:
                        false,

                    placeholder:
                        "One task per line..."
                }
            ]
        }
    ];


    // ============================================================
    // FLATTEN SECTIONS
    // ============================================================

    const sections = [];


    for (
        const group of GROUPS
    ) {

        for (
            const section of group.sections
        ) {

            sections.push(
                section
            );
        }
    }


    // ============================================================
    // ACTIVE FILE
    // ============================================================

    const file =
        app.workspace.getActiveFile();


    if (!file) {

        new obsidian.Notice(
            "No active note is open."
        );

        return;
    }


    if (
        file.extension !== "md"
    ) {

        new obsidian.Notice(
            "The active file is not a Markdown note."
        );

        return;
    }


    // ============================================================
    // READ NOTE
    // ============================================================

    const originalContent =
        await app.vault.read(
            file
        );


    // ============================================================
    // CHECK HEADINGS
    // ============================================================

    for (
        const section of sections
    ) {

        if (
            !hasHeading(
                originalContent,
                section.heading
            )
        ) {

            new obsidian.Notice(
                "Missing heading: " +
                section.heading
            );

            return;
        }
    }


    // ============================================================
    // LOAD EXISTING VALUES
    // ============================================================

    const values = {};


    for (
        const section of sections
    ) {

        const body =
            getSectionBody(
                originalContent,
                section.heading
            );


        values[
            section.id
        ] =
            extractContent(
                body,
                section.type
            );
    }


    // ============================================================
    // OPEN MODAL
    // ============================================================

    const result =
        await openModal(
            app,
            obsidian,
            file,
            GROUPS,
            sections,
            values
        );


    if (
        result === null
    ) {

        new obsidian.Notice(
            "Cancelled."
        );

        return;
    }


    // ============================================================
    // UPDATE NOTE
    // ============================================================

    let newContent =
        originalContent;


    for (
        const section of sections
    ) {

        const value =
            result[
                section.id
            ] || "";


        const formatted =
            formatContent(
                value,
                section.type,
                section.maxLines,
                section.taskManaged
            );


        newContent =
            replaceSection(
                newContent,
                section.heading,
                formatted
            );
    }


    // ============================================================
    // SAVE
    // ============================================================

    if (
        newContent ===
        originalContent
    ) {

        new obsidian.Notice(
            "No changes made."
        );

        return;
    }


    await app.vault.modify(
        file,
        newContent
    );


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

    return new Promise(
        (resolve) => {

            class DailyModal
                extends obsidian.Modal {

                constructor(app) {

                    super(app);

                    this.result =
                        null;

                    this.fields =
                        {};
                }


                // =================================================
                // OPEN
                // =================================================

                onOpen() {

                    const container =
                        this.contentEl;


                    container.empty();


                    // =============================================
                    // CSS
                    // =============================================

                    const style =
                        document.createElement(
                            "style"
                        );


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
                            border-bottom: 1px solid
                                var(--background-modifier-border);
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
                            border-bottom: 1px solid
                                var(--background-modifier-border);
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
                            border: 1px solid
                                var(--background-modifier-border);
                            background: var(--background-primary);
                            color: var(--text-normal);
                            font-family: var(--font-text);
                            font-size: var(--font-ui-medium);
                            line-height: 1.5;
                        }

                        .daily-editor-textarea:focus {
                            outline: none;
                            border-color:
                                var(--interactive-accent);
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
                            border-top: 1px solid
                                var(--background-modifier-border);
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


                    container.appendChild(
                        style
                    );


                    // =============================================
                    // MODAL
                    // =============================================

                    this.modalEl.addClass(
                        "daily-editor"
                    );


                    const wrapper =
                        container.createDiv({
                            cls:
                                "daily-editor-wrapper"
                        });


                    // =============================================
                    // HEADER
                    // =============================================

                    const header =
                        wrapper.createDiv({
                            cls:
                                "daily-editor-header"
                        });


                    const title =
                        header.createEl(
                            "h2",
                            {
                                cls:
                                    "daily-editor-title"
                            }
                        );


                    title.setText(
                        "Daily Note - " +
                        getDate(file)
                    );


                    const subtitle =
                        header.createDiv({
                            cls:
                                "daily-editor-subtitle"
                        });


                    subtitle.setText(
                        "Fill in your study log, reflection, and plan."
                    );


                    // =============================================
                    // SCROLL AREA
                    // =============================================

                    const scroll =
                        wrapper.createDiv({
                            cls:
                                "daily-editor-scroll"
                        });


                    // =============================================
                    // GROUPS
                    // =============================================

                    for (
                        const group of groups
                    ) {

                        const groupElement =
                            scroll.createDiv({
                                cls:
                                    "daily-editor-group"
                            });


                        const groupTitle =
                            groupElement.createEl(
                                "h3",
                                {
                                    cls:
                                        "daily-editor-group-title"
                                }
                            );


                        groupTitle.setText(
                            group.title
                        );


                        for (
                            const section of group.sections
                        ) {

                            createField(
                                this,
                                groupElement,
                                section,
                                values[
                                    section.id
                                ] || ""
                            );
                        }
                    }


                    // =============================================
                    // FOOTER
                    // =============================================

                    const footer =
                        wrapper.createDiv({
                            cls:
                                "daily-editor-footer"
                        });


                    const help =
                        footer.createDiv({
                            cls:
                                "daily-editor-help"
                        });


                    help.setText(
                        "Ctrl + Enter = Save | Esc = Cancel"
                    );


                    const buttons =
                        footer.createDiv({
                            cls:
                                "daily-editor-buttons"
                        });


                    const cancel =
                        buttons.createEl(
                            "button",
                            {
                                text:
                                    "Cancel"
                            }
                        );


                    const save =
                        buttons.createEl(
                            "button",
                            {
                                text:
                                    "Save",

                                cls:
                                    "mod-cta"
                            }
                        );


                    // =============================================
                    // EVENTS
                    // =============================================

                    cancel.addEventListener(
                        "click",
                        () => {

                            this.result =
                                null;

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

                            if (
                                event.key ===
                                "Escape"
                            ) {

                                event.preventDefault();

                                this.result =
                                    null;

                                this.close();

                                return;
                            }


                            if (
                                event.key ===
                                    "Enter" &&
                                event.ctrlKey
                            ) {

                                event.preventDefault();

                                this.save();
                            }
                        }
                    );


                    // =============================================
                    // FOCUS
                    // =============================================

                    if (
                        sections.length > 0
                    ) {

                        const first =
                            this.fields[
                                sections[0].id
                            ];


                        if (first) {

                            setTimeout(
                                () => {

                                    first.focus();

                                },
                                100
                            );
                        }
                    }
                }


                // =================================================
                // SAVE MODAL
                // =================================================

                save() {

                    const result =
                        {};


                    for (
                        const section of sections
                    ) {

                        const field =
                            this.fields[
                                section.id
                            ];


                        result[
                            section.id
                        ] =
                            field
                                ? field.value
                                : "";
                    }


                    this.result =
                        result;


                    this.close();
                }


                // =================================================
                // CLOSE
                // =================================================

                onClose() {

                    this.contentEl.empty();


                    resolve(
                        this.result
                    );
                }
            }


            // =====================================================
            // CREATE FIELD
            // =====================================================

            function createField(
                modal,
                parent,
                section,
                value
            ) {

                const field =
                    parent.createDiv({
                        cls:
                            "daily-editor-field"
                    });


                const label =
                    field.createEl(
                        "label",
                        {
                            cls:
                                "daily-editor-label"
                        }
                    );


                label.setText(
                    section.title
                );


                const textarea =
                    field.createEl(
                        "textarea",
                        {
                            cls:
                                "daily-editor-textarea"
                        }
                    );


                textarea.value =
                    value;


                textarea.placeholder =
                    section.placeholder;


                // Bigger field for long explanation

                if (
                    section.type ===
                    "quote"
                ) {

                    textarea.style.minHeight =
                        "150px";
                }


                // Active Recall

                if (
                    section.type ===
                    "numbered"
                ) {

                    textarea.style.minHeight =
                        "110px";
                }


                const description =
                    field.createDiv({
                        cls:
                            "daily-editor-description"
                    });


                if (
                    section.type ===
                    "checkbox"
                ) {

                    if (
                        section.taskManaged
                    ) {

                        description.setText(
                            "One task per line - [ ] or [x] supported. New tasks automatically receive task-id."
                        );

                    } else {

                        description.setText(
                            "One task per line - [ ] or [x] supported"
                        );
                    }
                }


                if (
                    section.type ===
                    "bullet"
                ) {

                    description.setText(
                        "One item per line - saved as -"
                    );
                }


                if (
                    section.type ===
                    "numbered"
                ) {

                    description.setText(
                        "Maximum 3 items - numbering is automatic"
                    );
                }


                if (
                    section.type ===
                    "quote"
                ) {

                    description.setText(
                        "Multiple lines supported - saved as >"
                    );
                }


                modal.fields[
                    section.id
                ] =
                    textarea;
            }


            const modal =
                new DailyModal(
                    app
                );


            modal.open();
        }
    );
}


// =================================================================
// CLEAN INPUT
// =================================================================

function cleanForInput(
    text
) {

    if (!text) {
        return "";
    }


    return text

        .split(
            /\r?\n/
        )

        .map(
            line =>
                line.trim()
        )

        .filter(
            line => {

                // Empty line

                if (!line) {
                    return false;
                }


                // Markdown separators

                if (
                    /^[-*_]+$/.test(
                        line
                    )
                ) {

                    return false;
                }


                // Empty checkbox

                if (
                    /^[-*]\s*\[\s*[xX]?\s*\]\s*$/.test(
                        line
                    )
                ) {

                    return false;
                }


                // Empty numbered item

                if (
                    /^\d+\.\s*$/.test(
                        line
                    )
                ) {

                    return false;
                }


                // Empty quote

                if (
                    /^>\s*$/.test(
                        line
                    )
                ) {

                    return false;
                }


                return true;
            }
        )

        .join(
            "\n"
        );
}


// =================================================================
// GET DATE
// =================================================================

function getDate(
    file
) {

    if (
        /^\d{4}-\d{2}-\d{2}$/.test(
            file.basename
        )
    ) {

        return file.basename;
    }


    const now =
        new Date();


    return now
        .toISOString()
        .slice(
            0,
            10
        );
}


// =================================================================
// CHECK HEADING
// =================================================================

function hasHeading(
    content,
    heading
) {

    const lines =
        content.split(
            /\r?\n/
        );


    return lines.some(
        line =>
            line.trim() ===
            heading.trim()
    );
}


// =================================================================
// GET SECTION BODY
// =================================================================

function getSectionBody(
    content,
    heading
) {

    const lines =
        content.split(
            /\r?\n/
        );


    const start =
        lines.findIndex(
            line =>
                line.trim() ===
                heading.trim()
        );


    if (
        start === -1
    ) {

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

            end =
                i;

            break;
        }
    }


    return lines
        .slice(
            start + 1,
            end
        )
        .join(
            "\n"
        );
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
        content.split(
            /\r?\n/
        );


    const start =
        lines.findIndex(
            line =>
                line.trim() ===
                heading.trim()
        );


    if (
        start === -1
    ) {

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

            end =
                i;

            break;
        }
    }


    const before =
        lines.slice(
            0,
            start + 1
        );


    const after =
        lines.slice(
            end
        );


    /*
     * If the user cleared the field,
     * preserve an empty section.
     */

    if (
        !newBody ||
        !newBody.trim()
    ) {

        return [
            ...before,
            "",
            ...after
        ].join(
            "\n"
        );
    }


    const bodyLines =
        newBody
            .trim()
            .split(
                "\n"
            );


    return [

        ...before,

        "",

        ...bodyLines,

        "",

        ...after

    ].join(
        "\n"
    );
}


// =================================================================
// FORMAT CONTENT
// =================================================================

function formatContent(
    input,
    type,
    maxLines,
    taskManaged
) {

    let lines =
        input

            .split(
                /\r?\n/
            )

            .map(
                line =>
                    line.trim()
            )

            .filter(
                line =>
                    line.length > 0
            );


    // =============================================================
    // REMOVE PLACEHOLDERS
    // =============================================================

    lines =
        lines.filter(
            line =>
                !isEmptyPlaceholder(
                    line
                )
        );


    // =============================================================
    // MAX LINES
    // =============================================================

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


    // =============================================================
    // CHECKBOX
    // =============================================================

    if (
        type ===
        "checkbox"
    ) {

        return lines

            .map(
                line => {

                    const match =
                        line.match(
                            /^[-*]\s*\[([ xX])\]\s*(.*)$/
                        );


                    // =============================================
                    // Existing checkbox
                    // =============================================

                    if (
                        match
                    ) {

                        const state =
                            match[1];


                        let content =
                            match[2].trim();


                        /*
                         * IMPORTANT:
                         *
                         * If this task already has task-id,
                         * preserve it exactly.
                         */

                        if (
                            taskManaged &&
                            hasTaskId(
                                content
                            )
                        ) {

                            return (
                                "- [" +
                                state +
                                "] " +
                                content
                            );
                        }


                        /*
                         * Managed task without task-id:
                         *
                         * This can happen when:
                         *
                         * - the user created a new task
                         * - an old legacy task has no ID
                         * - the user manually removed the ID
                         *
                         * Assign a new ID.
                         */

                        if (
                            taskManaged
                        ) {

                            const taskId =
                                generateTaskId();


                            content =
                                removeTaskId(
                                    content
                                );


                            return (
                                "- [" +
                                state +
                                "] " +
                                content +
                                " " +
                                TASK_ID_PROPERTY +
                                ":: " +
                                taskId
                            );
                        }


                        /*
                         * Non-managed checkbox:
                         *
                         * Preserve exactly as a normal
                         * checkbox without task-id.
                         */

                        return (
                            "- [" +
                            state +
                            "] " +
                            content
                        );
                    }


                    // =============================================
                    // Plain text entered by user
                    // =============================================

                    let clean =
                        line
                            .replace(
                                /^[-*]\s*/,
                                ""
                            )
                            .trim();


                    if (
                        !clean
                    ) {

                        return "";
                    }


                    /*
                     * Managed section:
                     *
                     * Plain text becomes:
                     *
                     * - [ ] Task
                     *   task-id:: task-xxxx
                     */

                    if (
                        taskManaged
                    ) {

                        /*
                         * If user manually entered task-id,
                         * preserve it.
                         */

                        if (
                            hasTaskId(
                                clean
                            )
                        ) {

                            return (
                                "- [ ] " +
                                clean
                            );
                        }


                        const taskId =
                            generateTaskId();


                        clean =
                            removeTaskId(
                                clean
                            );


                        return (
                            "- [ ] " +
                            clean +
                            " " +
                            TASK_ID_PROPERTY +
                            ":: " +
                            taskId
                        );
                    }


                    /*
                     * Non-managed checkbox section.
                     */

                    return (
                        "- [ ] " +
                        clean
                    );
                }
            )

            .filter(
                line =>
                    line.length > 0
            )

            .join(
                "\n"
            );
    }


    // =============================================================
    // BULLET
    // =============================================================

    if (
        type ===
        "bullet"
    ) {

        return lines

            .map(
                line => {

                    const clean =
                        line

                            .replace(
                                /^[-*]\s*/,
                                ""
                            )

                            .replace(
                                /^\[\s*[xX]?\s*\]\s*/,
                                ""
                            )

                            .trim();


                    return (
                        "- " +
                        clean
                    );
                }
            )

            .join(
                "\n"
            );
    }


    // =============================================================
    // NUMBERED
    // =============================================================

    if (
        type ===
        "numbered"
    ) {

        return lines

            .map(
                (
                    line,
                    index
                ) => {

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

            .join(
                "\n"
            );
    }


    // =============================================================
    // QUOTE
    // =============================================================

    if (
        type ===
        "quote"
    ) {

        return lines

            .map(
                line => {

                    const clean =
                        line

                            .replace(
                                /^>\s*/,
                                ""
                            )

                            .trim();


                    return (
                        "> " +
                        clean
                    );
                }
            )

            .join(
                "\n"
            );
    }


    return lines.join(
        "\n"
    );
}


// =================================================================
// EXTRACT EXISTING CONTENT
// =================================================================

function extractContent(
    body,
    type
) {

    if (
        !body
    ) {

        return "";
    }


    const lines =
        body

            .split(
                /\r?\n/
            )

            .map(
                line =>
                    line.trim()
            );


    const result = [];


    for (
        let line of lines
    ) {

        if (
            !line
        ) {

            continue;
        }


        // =========================================================
        // CHECKBOX
        // =========================================================

        if (
            type ===
            "checkbox"
        ) {

            const checkboxMatch =
                line.match(
                    /^[-*]\s*\[([ xX])\]\s*(.*)$/
                );


            if (
                checkboxMatch
            ) {

                const state =
                    checkboxMatch[1];


                const content =
                    checkboxMatch[2].trim();


                /*
                 * Empty checkbox placeholder:
                 *
                 * - [ ]
                 *
                 * must NOT appear in modal.
                 */

                if (
                    !content
                ) {

                    continue;
                }


                /*
                 * Preserve everything inside
                 * the task content.
                 *
                 * This includes:
                 *
                 * task-id:: ...
                 * carried-over:: true
                 */

                result.push(
                    "- [" +
                    state +
                    "] " +
                    content
                );


                continue;
            }


            /*
             * Support normal bullet / plain text
             * inside checkbox sections.
             */

            line =
                line
                    .replace(
                        /^[-*]\s*/,
                        ""
                    )
                    .trim();


            if (
                !line
            ) {

                continue;
            }


            result.push(
                line
            );


            continue;
        }


        // =========================================================
        // BULLET
        // =========================================================

        if (
            type ===
            "bullet"
        ) {

            line =
                line

                    .replace(
                        /^[-*]\s*/,
                        ""
                    )

                    .replace(
                        /^\[\s*[xX]?\s*\]\s*/,
                        ""
                    )

                    .trim();


            if (
                !line
            ) {

                continue;
            }


            result.push(
                line
            );


            continue;
        }


        // =========================================================
        // NUMBERED
        // =========================================================

        if (
            type ===
            "numbered"
        ) {

            line =
                line

                    .replace(
                        /^\d+\.\s*/,
                        ""
                    )

                    .trim();


            if (
                !line
            ) {

                continue;
            }


            result.push(
                line
            );


            continue;
        }


        // =========================================================
        // QUOTE
        // =========================================================

        if (
            type ===
            "quote"
        ) {

            line =
                line

                    .replace(
                        /^>\s*/,
                        ""
                    )

                    .trim();


            if (
                !line
            ) {

                continue;
            }


            result.push(
                line
            );


            continue;
        }


        // =========================================================
        // DEFAULT
        // =========================================================

        result.push(
            line
        );
    }


    return cleanForInput(
        result.join(
            "\n"
        )
    );
}


// =================================================================
// TASK ID
// =================================================================

function hasTaskId(
    text
) {

    if (
        !text
    ) {

        return false;
    }


    return (
        /(?:^|\s)task-id\s*::\s*[A-Za-z0-9_-]+/i
            .test(
                text
            )
    );
}


// =================================================================
// EXTRACT TASK ID
// =================================================================

function extractTaskId(
    text
) {

    if (
        !text
    ) {

        return null;
    }


    const match =
        text.match(
            /(?:^|\s)task-id\s*::\s*([A-Za-z0-9_-]+)/i
        );


    if (
        !match
    ) {

        return null;
    }


    return match[1];
}


// =================================================================
// REMOVE TASK ID
// =================================================================

function removeTaskId(
    text
) {

    if (
        !text
    ) {

        return "";
    }


    return text

        .replace(
            /\s+task-id\s*::\s*[A-Za-z0-9_-]+/gi,
            ""
        )

        .replace(
            /\s+/g,
            " "
        )

        .trim();
}


// =================================================================
// GENERATE TASK ID
// =================================================================

function generateTaskId() {

    /*
     * Same ID format used by morning-task.js:
     *
     * task-xxxxxxxx
     *
     * crypto.randomUUID()
     * is preferred.
     */

    if (
        typeof crypto !==
            "undefined" &&
        typeof crypto.randomUUID ===
            "function"
    ) {

        return (
            "task-" +
            crypto

                .randomUUID()

                .replace(
                    /-/g,
                    ""
                )

                .slice(
                    0,
                    8
                )
        );
    }


    /*
     * Fallback for environments where
     * crypto.randomUUID is unavailable.
     */

    return (

        "task-" +

        Date.now()
            .toString(
                36
            ) +

        "-" +

        Math.random()
            .toString(
                36
            )
            .slice(
                2,
                7
            )
    );
}


// =================================================================
// PLACEHOLDER DETECTION
// =================================================================

function isEmptyPlaceholder(
    line
) {

    const value =
        line.trim();


    // =============================================================
    // EMPTY
    // =============================================================

    if (
        !value
    ) {

        return true;
    }


    // =============================================================
    // MARKDOWN SEPARATORS
    //
    // -
    // --
    // ---
    // *
    // **
    // ___
    // =============================================================

    if (
        /^[-*_]+$/.test(
            value
        )
    ) {

        return true;
    }


    // =============================================================
    // EMPTY CHECKBOX
    //
    // - [ ]
    // - [x]
    // - [X]
    // =============================================================

    if (
        /^[-*]\s*\[\s*[xX]?\s*\]\s*$/.test(
            value
        )
    ) {

        return true;
    }


    // =============================================================
    // EMPTY NUMBERED ITEM
    // =============================================================

    if (
        /^\d+\.\s*$/.test(
            value
        )
    ) {

        return true;
    }


    // =============================================================
    // EMPTY QUOTE
    // =============================================================

    if (
        /^>\s*$/.test(
            value
        )
    ) {

        return true;
    }


    return false;
}