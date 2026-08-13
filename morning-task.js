// ============================================================
// CONFIG
// ============================================================

const INITIALIZED_PROPERTY =
    "daily_initialized";

const CARRIED_OVER_PROPERTY =
    "carried-over";

const TASK_SECTIONS = [
    {
        heading: "### 1. Must do",
        name: "Must do"
    },
    {
        heading: "### 2. Should do",
        name: "Should do"
    },
    {
        heading: "### 3. Optional",
        name: "Optional"
    }
];


// ============================================================
// MAIN
// ============================================================

module.exports = async (params) => {
    const app = params.app;
    const obsidian = params.obsidian;

    // ============================================================
    // GET TODAY'S FILE
    // ============================================================

   
    const todayFile =
        app.workspace.getActiveFile();

    if (!todayFile) {
        new obsidian.Notice(
            "No active Daily Note found."
        );
        return;
    }

    // ============================================================
    // CHECK TODAY'S DAILY NOTE
    // ============================================================

    const todayContent =
        await app.vault.read(
            todayFile
        );

    // Make sure this looks like a Daily Note.
    if (
        !hasHeading(
            todayContent,
            "## Today's Focus"
        )
    ) {
        new obsidian.Notice(
            "This does not appear to be a Daily Note."
        );
        return;
    }

    // ============================================================
    // INITIALIZATION GUARD
    // ============================================================

    if (
        isInitialized(
            todayContent,
            INITIALIZED_PROPERTY
        )
    ) {

        new obsidian.Notice(
            "Today's Daily Note is already initialized."
        );

        return;
    }

    // ============================================================
    // FIND YESTERDAY
    // ============================================================

    const yesterdayFile =
        await findYesterdayFile(
            app,
            todayFile
        );

    if (!yesterdayFile) {

        new obsidian.Notice(
            "Yesterday's Daily Note could not be found."
        );

        return;
    }

    const yesterdayContent =
        await app.vault.read(
            yesterdayFile
        );

    // ============================================================
    // EXTRACT TASKS
    // ============================================================

    const yesterdayTasks = {};

    for (
        const section
        of TASK_SECTIONS
    ) {

        yesterdayTasks[
            section.heading
        ] =
            extractUncheckedTasks(
                yesterdayContent,
                section.heading
            );
    }

    // ============================================================
    // COUNT TASKS
    // ============================================================

    const totalFound =
        Object.values(
            yesterdayTasks
        )
        .reduce(
            (
                total,
                tasks
            ) =>
                total + tasks.length,
            0
        );

    // ============================================================
    // UPDATE TODAY'S NOTE
    // ============================================================

    let newTodayContent =
        todayContent;

    let copiedCount = 0;
    let duplicateCount = 0;

    for (
        const section
        of TASK_SECTIONS
    ) {

        const tasks =
            yesterdayTasks[
                section.heading
            ] || [];

        if (
            tasks.length === 0
        ) {
            continue;
        }

        const existingBody =
            getSectionBody(
                newTodayContent,
                section.heading
            );

        const existingTasks =
            extractAllTasks(
                existingBody
            );

        const existingFingerprints =
            new Set(
                existingTasks.map(
                    task =>
                        normalizeTask(
                            task.text
                        )
                )
            );

        const tasksToAdd = [];

        for (
            const task
            of tasks
        ) {

            const fingerprint =
                normalizeTask(
                    task.text
                );

            if (
                existingFingerprints
                    .has(fingerprint)
            ) {

                duplicateCount++;

                continue;
            }

            tasksToAdd.push(
                formatCarriedOverTask(
                    task
                )
            );

            existingFingerprints.add(
                fingerprint
            );

            copiedCount++;
        }

        if (
            tasksToAdd.length === 0
        ) {
            continue;
        }

        const newBody =
            appendTasks(
                existingBody,
                tasksToAdd
            );

        newTodayContent =
            replaceSection(
                newTodayContent,
                section.heading,
                newBody
            );
    }

    // ============================================================
    // MARK INITIALIZED
    // ============================================================

    newTodayContent =
        setInitialized(
            newTodayContent,
            INITIALIZED_PROPERTY
        );

    // ============================================================
    // SAVE
    // ============================================================

    await app.vault.modify(
        todayFile,
        newTodayContent
    );

    // ============================================================
    // NOTICE
    // ============================================================

    if (
        totalFound === 0
    ) {

        new obsidian.Notice(
            "Morning initialization complete. No incomplete tasks from yesterday."
        );

        return;
    }

    if (
        copiedCount === 0 &&
        duplicateCount > 0
    ) {

        new obsidian.Notice(
            `Morning initialization complete. ${duplicateCount} task(s) already existed.`
        );

        return;
    }

    new obsidian.Notice(
        `Morning initialization complete. ${copiedCount} task(s) carried over.` +
        (
            duplicateCount > 0
                ? ` ${duplicateCount} duplicate(s) skipped.`
                : ""
        )
    );
};


// =================================================================
// FIND YESTERDAY'S DAILY NOTE
// =================================================================

async function findYesterdayFile(
    app,
    todayFile
) {

    const todayDate =
        parseDateFromFilename(
            todayFile.basename
        );

    if (!todayDate) {
        return null;
    }

    const yesterday =
        new Date(
            todayDate
        );

    yesterday.setDate(
        yesterday.getDate() - 1
    );

    const yesterdayName =
        formatDate(
            yesterday
        );

    /*
     * First try the same folder.
     *
     * This supports:
     *
     * Daily/YYYY/MM/YYYY-MM-DD.md
     */

    const sameFolderPath =
        todayFile.parent.path === "."
            ? yesterdayName + ".md"
            : todayFile.parent.path +
              "/" +
              yesterdayName +
              ".md";

    const sameFolderFile =
        app.vault.getAbstractFileByPath(
            sameFolderPath
        );

    if (
        sameFolderFile &&
        sameFolderFile.extension === "md"
    ) {

        return sameFolderFile;
    }

    /*
     * Fallback:
     *
     * Search the entire vault for a file
     * with yesterday's date as basename.
     */

    const matches =
        app.vault
            .getMarkdownFiles()
            .filter(
                file =>
                    file.basename ===
                    yesterdayName
            );

    if (
        matches.length === 0
    ) {
        return null;
    }

    /*
     * If there is exactly one match,
     * use it.
     */

    if (
        matches.length === 1
    ) {
        return matches[0];
    }

    /*
     * If multiple files exist with the same
     * basename, prefer the one whose folder
     * is closest to today's folder.
     */

    const sameParent =
        matches.find(
            file =>
                file.parent.path ===
                todayFile.parent.path
        );

    return (
        sameParent ||
        matches[0]
    );
}


// =================================================================
// PARSE DATE
// =================================================================

function parseDateFromFilename(
    filename
) {

    const match =
        filename.match(
            /^(\d{4})-(\d{2})-(\d{2})$/
        );

    if (!match) {
        return null;
    }

    const year =
        Number(match[1]);

    const month =
        Number(match[2]) - 1;

    const day =
        Number(match[3]);

    return new Date(
        year,
        month,
        day
    );
}


// =================================================================
// FORMAT DATE
// =================================================================

function formatDate(
    date
) {

    const year =
        date.getFullYear();

    const month =
        String(
            date.getMonth() + 1
        )
        .padStart(
            2,
            "0"
        );

    const day =
        String(
            date.getDate()
        )
        .padStart(
            2,
            "0"
        );

    return (
        `${year}-${month}-${day}`
    );
}


// =================================================================
// CHECK INITIALIZATION
// =================================================================

function isInitialized(
    content,
    property
) {

    /*
     * Supports either:
     *
     * daily_initialized: true
     *
     * or:
     *
     * daily_initialized:: true
     *
     */

    const yamlPattern =
        new RegExp(
            `^\\s*${escapeRegExp(property)}\\s*:\\s*true\\s*$`,
            "mi"
        );

    const inlinePattern =
        new RegExp(
            `${escapeRegExp(property)}\\s*::\\s*true`,
            "i"
        );

    return (
        yamlPattern.test(content) ||
        inlinePattern.test(content)
    );
}


// =================================================================
// SET INITIALIZATION
// =================================================================

function setInitialized(
    content,
    property
) {

    /*
     * If the property already exists,
     * update it instead of adding another one.
     */

    const yamlPattern =
        new RegExp(
            `^(\\s*)${escapeRegExp(property)}\\s*:\\s*.*$`,
            "mi"
        );

    if (
        yamlPattern.test(content)
    ) {

        return content.replace(
            yamlPattern,
            `$1${property}: true`
        );
    }

    /*
     * Prefer YAML frontmatter because
     * your Daily Note already has frontmatter.
     */

    if (
        content.startsWith("---")
    ) {

        const closingIndex =
            content.indexOf(
                "\n---",
                3
            );

        if (
            closingIndex !== -1
        ) {

            const insertPosition =
                closingIndex;

            return (
                content.slice(
                    0,
                    insertPosition
                ) +
                `\n${property}: true` +
                content.slice(
                    insertPosition
                )
            );
        }
    }

    /*
     * Fallback if no frontmatter exists.
     */

    return (
        `---\n${property}: true\n---\n\n` +
        content
    );
}


// =================================================================
// EXTRACT UNCHECKED TASKS
// =================================================================

function extractUncheckedTasks(
    content,
    heading
) {

    const body =
        getSectionBody(
            content,
            heading
        );

    if (!body) {
        return [];
    }

    const lines =
        body.split(/\r?\n/);

    const tasks = [];

    for (
        const line
        of lines
    ) {

        /*
         * Only accept standard Markdown
         * task syntax:
         *
         * - [ ] Task
         */

        const match =
            line.match(
                /^\s*[-*]\s*\[\s*\]\s+(.+?)\s*$/
            );

        if (!match) {
            continue;
        }

        const text =
            match[1].trim();

        if (!text) {
            continue;
        }

        tasks.push({
            text: text
        });
    }

    return tasks;
}


// =================================================================
// EXTRACT ALL TASKS
// =================================================================

function extractAllTasks(
    body
) {

    if (!body) {
        return [];
    }

    const lines =
        body.split(/\r?\n/);

    const tasks = [];

    for (
        const line
        of lines
    ) {

        const match =
            line.match(
                /^\s*[-*]\s*\[([ xX])\]\s+(.+?)\s*$/
            );

        if (!match) {
            continue;
        }

        tasks.push({
            state: match[1],
            text: match[2].trim()
        });
    }

    return tasks;
}


// =================================================================
// NORMALIZE TASK
// =================================================================

function normalizeTask(
    text
) {

    if (!text) {
        return "";
    }

    return text

        // Remove carried-over metadata
        .replace(
            /\s+carried-over\s*::\s*true\b/gi,
            ""
        )

        // Remove duplicate spaces
        .replace(
            /\s+/g,
            " "
        )

        // Remove surrounding whitespace
        .trim()

        // Case-insensitive comparison
        .toLowerCase();
}


// =================================================================
// FORMAT CARRIED-OVER TASK
// =================================================================

function formatCarriedOverTask(
    task
) {

    const cleanText =
        task.text
            .replace(
                /\s+carried-over\s*::\s*true\b/gi,
                ""
            )
            .trim();

    return (
        `- [ ] ${cleanText} ${CARRIED_OVER_PROPERTY}:: true`
    );
}


// =================================================================
// APPEND TASKS
// =================================================================

function appendTasks(
    existingBody,
    tasks
) {

    const cleanBody =
        existingBody
            .replace(
                /\s+$/,
                ""
            );

    if (
        !cleanBody.trim()
    ) {

        return tasks.join("\n");
    }

    return (
        cleanBody +
        "\n" +
        tasks.join("\n")
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
        content.split(/\r?\n/);

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

        /*
         * Any heading of the same or higher level
         * ends the section.
         */

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
        .slice(
            start + 1,
            end
        )
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

            end = i;

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
     * Preserve a blank line between
     * heading and content.
     */

    return [
        ...before,
        "",
        newBody.trim(),
        "",
        ...after
    ].join("\n");
}


// =================================================================
// HAS HEADING
// =================================================================

function hasHeading(
    content,
    heading
) {

    const lines =
        content.split(/\r?\n/);

    return lines.some(
        line =>
            line.trim() ===
            heading.trim()
    );
}


// =================================================================
// ESCAPE REGEX
// =================================================================

function escapeRegExp(
    string
) {

    return string.replace(
        /[.*+?^${}()|[\]\\]/g,
        "\\$&"
    );
}