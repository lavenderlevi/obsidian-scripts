// ============================================================
// MORNING TASK
// ============================================================
//
// Workflow:
//
// 1. Open today's Daily Note
// 2. Check initialization
// 3. Find yesterday's Daily Note
// 4. Read incomplete tasks from:
//      - Must do
//      - Should do
//      - Optional
// 5. Preserve task-id when available
// 6. Generate task-id for legacy tasks without one
// 7. Prevent duplicates
// 8. Copy tasks to the same section
// 9. Add carried-over:: true
// 10. Mark today's note as initialized
//
// ============================================================


// ============================================================
// CONFIG
// ============================================================

const INITIALIZED_PROPERTY =
    "daily_initialized";

const CARRIED_OVER_PROPERTY =
    "carried-over";

const TASK_ID_PROPERTY =
    "task-id";

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

    const app =
        params.app;

    const obsidian =
        params.obsidian;


    // ========================================================
    // GET TODAY'S FILE
    // ========================================================

    const todayFile =
        app.workspace.getActiveFile();

    if (!todayFile) {

        new obsidian.Notice(
            "No active Daily Note found."
        );

        return;
    }


    // ========================================================
    // READ TODAY
    // ========================================================

    const todayContent =
        await app.vault.read(
            todayFile
        );


    // ========================================================
    // CHECK DAILY NOTE
    // ========================================================

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


    // ========================================================
    // INITIALIZATION GUARD
    // ========================================================

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


    // ========================================================
    // FIND YESTERDAY
    // ========================================================

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


    // ========================================================
    // EXTRACT UNCHECKED TASKS
    // ========================================================

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


    // ========================================================
    // COUNT FOUND TASKS
    // ========================================================

    const totalFound =
        Object.values(
            yesterdayTasks
        )
        .reduce(
            (
                total,
                tasks
            ) =>
                total +
                tasks.length,
            0
        );


    // ========================================================
    // UPDATE TODAY
    // ========================================================

    let newTodayContent =
        todayContent;

    let copiedCount = 0;

    let duplicateCount = 0;

    let generatedIdCount = 0;


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


        // ----------------------------------------------------
        // READ EXISTING TASKS TODAY
        // ----------------------------------------------------

        const existingBody =
            getSectionBody(
                newTodayContent,
                section.heading
            );


        const existingTasks =
            extractAllTasks(
                existingBody
            );


        // ----------------------------------------------------
        // DUPLICATE INDEX
        //
        // We use BOTH:
        //
        // 1. task-id
        // 2. normalized task text
        //
        // This keeps the old duplicate protection working.
        // ----------------------------------------------------

        const existingIds =
            new Set();

        const existingFingerprints =
            new Set();


        for (
            const task
            of existingTasks
        ) {

            const taskId =
                extractTaskId(
                    task.text
                );


            if (taskId) {

                existingIds.add(
                    taskId
                );
            }


            existingFingerprints.add(
                normalizeTask(
                    task.text
                )
            );
        }


        const tasksToAdd = [];


        // ----------------------------------------------------
        // PROCESS YESTERDAY'S TASKS
        // ----------------------------------------------------

        for (
            const task
            of tasks
        ) {

            let taskId =
                extractTaskId(
                    task.text
                );


            // ------------------------------------------------
            // LEGACY TASK
            //
            // If yesterday's task has no task-id,
            // generate one now.
            // ------------------------------------------------

            if (!taskId) {

                taskId =
                    generateTaskId();

                generatedIdCount++;
            }


            // ------------------------------------------------
            // DUPLICATE BY TASK ID
            // ------------------------------------------------

            if (
                existingIds.has(
                    taskId
                )
            ) {

                duplicateCount++;

                continue;
            }


            // ------------------------------------------------
            // DUPLICATE BY TEXT
            //
            // Keeps compatibility with your old system.
            // ------------------------------------------------

            const fingerprint =
                normalizeTask(
                    task.text
                );


            if (
                existingFingerprints.has(
                    fingerprint
                )
            ) {

                duplicateCount++;

                continue;
            }


            // ------------------------------------------------
            // CREATE CARRIED-OVER TASK
            // ------------------------------------------------

            const carriedTask =
                formatCarriedOverTask(
                    task,
                    taskId
                );


            tasksToAdd.push(
                carriedTask
            );


            // ------------------------------------------------
            // UPDATE DUPLICATE INDEX
            // ------------------------------------------------

            existingIds.add(
                taskId
            );

            existingFingerprints.add(
                normalizeTask(
                    carriedTask
                )
            );


            copiedCount++;
        }


        // ----------------------------------------------------
        // NOTHING TO ADD
        // ----------------------------------------------------

        if (
            tasksToAdd.length === 0
        ) {
            continue;
        }


        // ----------------------------------------------------
        // APPEND
        // ----------------------------------------------------

        const newBody =
            appendTasks(
                existingBody,
                tasksToAdd
            );


        // ----------------------------------------------------
        // REPLACE SECTION
        // ----------------------------------------------------

        newTodayContent =
            replaceSection(
                newTodayContent,
                section.heading,
                newBody
            );
    }


    // ========================================================
    // MARK INITIALIZED
    // ========================================================

    newTodayContent =
        setInitialized(
            newTodayContent,
            INITIALIZED_PROPERTY
        );


    // ========================================================
    // SAVE
    // ========================================================

    await app.vault.modify(
        todayFile,
        newTodayContent
    );


    // ========================================================
    // NOTICES
    // ========================================================

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


    let notice =
        `Morning initialization complete. ${copiedCount} task(s) carried over.`;


    if (
        duplicateCount > 0
    ) {

        notice +=
            ` ${duplicateCount} duplicate(s) skipped.`;
    }


    if (
        generatedIdCount > 0
    ) {

        notice +=
            ` ${generatedIdCount} new task-id(s) generated.`;
    }


    new obsidian.Notice(
        notice
    );
};


// ============================================================
// FIND YESTERDAY'S DAILY NOTE
// ============================================================

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


    // --------------------------------------------------------
    // FIRST: SAME FOLDER
    //
    // Supports:
    //
    // Daily/YYYY/MM/YYYY-MM-DD.md
    // --------------------------------------------------------

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


    // --------------------------------------------------------
    // FALLBACK: SEARCH VAULT
    // --------------------------------------------------------

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


    if (
        matches.length === 1
    ) {

        return matches[0];
    }


    // --------------------------------------------------------
    // PREFER SAME PARENT
    // --------------------------------------------------------

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


// ============================================================
// PARSE DATE
// ============================================================

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


// ============================================================
// FORMAT DATE
// ============================================================

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


// ============================================================
// CHECK INITIALIZATION
// ============================================================

function isInitialized(
    content,
    property
) {

    // --------------------------------------------------------
    // YAML
    //
    // daily_initialized: true
    // --------------------------------------------------------

    const yamlPattern =
        new RegExp(
            `^\\s*${escapeRegExp(property)}\\s*:\\s*true\\s*$`,
            "mi"
        );


    // --------------------------------------------------------
    // INLINE
    //
    // daily_initialized:: true
    // --------------------------------------------------------

    const inlinePattern =
        new RegExp(
            `${escapeRegExp(property)}\\s*::\\s*true`,
            "i"
        );


    return (
        yamlPattern.test(
            content
        ) ||
        inlinePattern.test(
            content
        )
    );
}


// ============================================================
// SET INITIALIZATION
// ============================================================

function setInitialized(
    content,
    property
) {

    // --------------------------------------------------------
    // EXISTING YAML PROPERTY
    // --------------------------------------------------------

    const yamlPattern =
        new RegExp(
            `^(\\s*)${escapeRegExp(property)}\\s*:\\s*.*$`,
            "mi"
        );


    if (
        yamlPattern.test(
            content
        )
    ) {

        return content.replace(
            yamlPattern,
            `$1${property}: true`
        );
    }


    // --------------------------------------------------------
    // INSERT INTO EXISTING FRONTMATTER
    // --------------------------------------------------------

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


    // --------------------------------------------------------
    // FALLBACK
    // --------------------------------------------------------

    return (
        `---\n${property}: true\n---\n\n` +
        content
    );
}


// ============================================================
// EXTRACT UNCHECKED TASKS
// ============================================================

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
        body.split(
            /\r?\n/
        );


    const tasks = [];


    for (
        const line
        of lines
    ) {

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
            text
        });
    }


    return tasks;
}


// ============================================================
// EXTRACT ALL TASKS
// ============================================================

function extractAllTasks(
    body
) {

    if (!body) {
        return [];
    }


    const lines =
        body.split(
            /\r?\n/
        );


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

            state:
                match[1],

            text:
                match[2].trim()

        });
    }


    return tasks;
}


// ============================================================
// EXTRACT TASK ID
// ============================================================
//
// Recognizes:
//
// task-id:: task-a83f29
//
// ============================================================

function extractTaskId(
    text
) {

    if (!text) {
        return null;
    }


    const match =
        text.match(
            /(?:^|\s)task-id\s*::\s*([A-Za-z0-9_-]+)/i
        );


    if (!match) {
        return null;
    }


    return match[1];
}


// ============================================================
// GENERATE TASK ID
// ============================================================
//
// Format:
//
// task-xxxxxx
//
// Uses crypto.randomUUID when available.
// Falls back to timestamp + random string.
//
// ============================================================

function generateTaskId() {

    if (
        typeof crypto !== "undefined" &&
        typeof crypto.randomUUID === "function"
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


// ============================================================
// NORMALIZE TASK
// ============================================================

function normalizeTask(
    text
) {

    if (!text) {
        return "";
    }


    return text

        // ----------------------------------------------------
        // Remove carried-over
        // ----------------------------------------------------

        .replace(
            /\s+carried-over\s*::\s*true\b/gi,
            ""
        )

        // ----------------------------------------------------
        // Remove task-id
        // ----------------------------------------------------

        .replace(
            /\s+task-id\s*::\s*[A-Za-z0-9_-]+\b/gi,
            ""
        )

        // ----------------------------------------------------
        // Normalize whitespace
        // ----------------------------------------------------

        .replace(
            /\s+/g,
            " "
        )

        // ----------------------------------------------------
        // Trim
        // ----------------------------------------------------

        .trim()

        // ----------------------------------------------------
        // Case-insensitive
        // ----------------------------------------------------

        .toLowerCase();
}


// ============================================================
// FORMAT CARRIED-OVER TASK
// ============================================================

function formatCarriedOverTask(
    task,
    taskId
) {

    const cleanText =
        task.text

            // Remove old carried-over
            .replace(
                /\s+carried-over\s*::\s*true\b/gi,
                ""
            )

            // Remove old task-id
            .replace(
                /\s+task-id\s*::\s*[A-Za-z0-9_-]+\b/gi,
                ""
            )

            .trim();


    return (
        `- [ ] ${cleanText} ` +
        `${TASK_ID_PROPERTY}:: ${taskId} ` +
        `${CARRIED_OVER_PROPERTY}:: true`
    );
}


// ============================================================
// APPEND TASKS
// ============================================================

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

        return tasks.join(
            "\n"
        );
    }


    return (
        cleanBody +
        "\n" +
        tasks.join(
            "\n"
        )
    );
}


// ============================================================
// GET SECTION BODY
// ============================================================

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

            end = i;

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


// ============================================================
// REPLACE SECTION
// ============================================================

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


    return [
        ...before,
        "",
        newBody.trim(),
        "",
        ...after
    ].join(
        "\n"
    );
}


// ============================================================
// HAS HEADING
// ============================================================

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


// ============================================================
// ESCAPE REGEX
// ============================================================

function escapeRegExp(
    string
) {

    return string.replace(
        /[.*+?^${}()|[\]\\]/g,
        "\\$&"
    );
}