// ============================================================
// DAILY VALIDATOR
// ============================================================
//
// Purpose:
//     Validate Daily Note integrity without modifying files.
//
// Checks:
//     1. Daily Note structure
//     2. Required task sections
//     3. Missing task-id
//     4. Invalid task-id
//     5. Duplicate task-id within the same Daily Note
//     6. Invalid carried-over metadata
//     7. Daily Statistics consistency
//
// IMPORTANT:
//     This script is READ-ONLY.
//     It never modifies Daily Notes.
//
// Designed for QuickAdd User Script.
// ============================================================


// ============================================================
// CONFIG
// ============================================================

const DAILY_FOLDER = "Daily";

const TASK_SECTIONS = [
    "### 1. Must do",
    "### 2. Should do",
    "### 3. Optional"
];

const STATISTICS = [
    "Total",
    "Completed",
    "Incomplete",
    "Completion rate",
    "Carried over"
];

const TASK_ID_REGEX =
    /^[A-Za-z0-9_-]+$/;


// ============================================================
// MAIN
// ============================================================

module.exports = async (params) => {

    const app =
        params.app;

    const obsidian =
        params.obsidian;


    // ========================================================
    // GET ACTIVE FILE
    // ========================================================

    const activeFile =
        app.workspace.getActiveFile();


    if (!activeFile) {

        new obsidian.Notice(
            "Daily Validator: No active file."
        );

        return;
    }


    // ========================================================
    // VALIDATE ACTIVE DAILY NOTE
    // ========================================================

    const activeResult =
        await validateDailyNote(
            app,
            activeFile
        );


    // ========================================================
    // SCAN ALL DAILY NOTES
    // ========================================================

    const markdownFiles =
        app.vault
            .getMarkdownFiles()
            .filter(
                file =>
                    file.path.startsWith(
                        DAILY_FOLDER + "/"
                    )
            );


    const globalResult =
        validateGlobalTaskIds(
            app,
            markdownFiles
        );


    // ========================================================
    // BUILD REPORT
    // ========================================================

    const errors = [
        ...activeResult.errors,
        ...globalResult.errors
    ];

    const warnings = [
        ...activeResult.warnings,
        ...globalResult.warnings
    ];


    // ========================================================
    // OUTPUT NOTICE
    // ========================================================

    if (
        errors.length === 0 &&
        warnings.length === 0
    ) {

        new obsidian.Notice(
            "Daily Validator: ✓ All checks passed."
        );

        return;
    }


    if (
        errors.length === 0
    ) {

        new obsidian.Notice(
            `Daily Validator: ✓ Passed with ${warnings.length} warning(s).`
        );

    } else {

        new obsidian.Notice(
            `Daily Validator: ✗ ${errors.length} error(s), ${warnings.length} warning(s).`
        );
    }


    // ========================================================
    // OPEN REPORT
    // ========================================================

    await showValidationReport(
        app,
        obsidian,
        activeResult,
        globalResult
    );
};


// ============================================================
// VALIDATE ONE DAILY NOTE
// ============================================================

async function validateDailyNote(
    app,
    file
) {

    const result = {

        file,

        errors: [],

        warnings: [],

        tasks: [],

        statistics: null

    };


    // ========================================================
    // CHECK FILE NAME
    // ========================================================

    const dateMatch =
        file.basename.match(
            /^\d{4}-\d{2}-\d{2}$/
        );


    if (!dateMatch) {

        result.errors.push(
            `Filename is not YYYY-MM-DD: ${file.path}`
        );

        return result;
    }


    // ========================================================
    // READ FILE
    // ========================================================

    const content =
        await app.vault.read(
            file
        );


    // ========================================================
    // CHECK DAILY TYPE
    // ========================================================

    if (
        !/^\s*type\s*:\s*daily\s*$/mi
            .test(content)
    ) {

        result.warnings.push(
            "Frontmatter does not contain type: daily."
        );
    }


    // ========================================================
    // CHECK SECTIONS
    // ========================================================

    for (
        const section
        of TASK_SECTIONS
    ) {

        if (
            !hasHeading(
                content,
                section
            )
        ) {

            result.errors.push(
                `Missing section: ${section}`
            );
        }
    }


    // ========================================================
    // PARSE TASKS
    // ========================================================

    const tasks =
        parseTasks(
            content
        );


    result.tasks =
        tasks;


    // ========================================================
    // TASK-ID VALIDATION
    // ========================================================

    const ids =
        new Map();


    for (
        const task
        of tasks
    ) {

        // ----------------------------------------------------
        // Missing task-id
        // ----------------------------------------------------

        if (
            !task.taskId
        ) {

            result.errors.push(
                `Task without task-id: "${task.cleanText}"`
            );

            continue;
        }


        // ----------------------------------------------------
        // Invalid task-id
        // ----------------------------------------------------

        if (
            !TASK_ID_REGEX.test(
                task.taskId
            )
        ) {

            result.errors.push(
                `Invalid task-id "${task.taskId}" in task: "${task.cleanText}"`
            );
        }


        // ----------------------------------------------------
        // Duplicate task-id within same note
        // ----------------------------------------------------

        if (
            ids.has(
                task.taskId
            )
        ) {

            const previous =
                ids.get(
                    task.taskId
                );


            result.errors.push(
                `Duplicate task-id "${task.taskId}" in the same Daily Note: "${previous}" and "${task.cleanText}"`
            );

        } else {

            ids.set(
                task.taskId,
                task.cleanText
            );
        }


        // ----------------------------------------------------
        // carried-over must have task-id
        // ----------------------------------------------------

        if (
            task.carriedOver &&
            !task.taskId
        ) {

            result.errors.push(
                `carried-over:: true without task-id: "${task.cleanText}"`
            );
        }


        // ----------------------------------------------------
        // Check malformed carried-over value
        // ----------------------------------------------------

        if (
            task.hasCarriedOverProperty &&
            !task.carriedOver
        ) {

            result.warnings.push(
                `Task has carried-over property that is not true: "${task.cleanText}"`
            );
        }
    }


    // ========================================================
    // DAILY STATISTICS
    // ========================================================

    const statistics =
        parseDailyStatistics(
            content
        );


    result.statistics =
        statistics;


    if (
        !statistics.found
    ) {

        result.errors.push(
            "Daily Statistics section or fields not found."
        );

    } else {

        validateStatistics(
            tasks,
            statistics,
            result
        );
    }


    // ========================================================
    // EMPTY TASK WARNING
    // ========================================================

    const emptyTasks =
        tasks.filter(
            task =>
                !task.cleanText
        );


    for (
        const task
        of emptyTasks
    ) {

        result.errors.push(
            "Empty task detected."
        );
    }


    // ========================================================
    // INITIALIZATION CHECK
    // ========================================================

    if (
        !hasInitializedProperty(
            content
        )
    ) {

        result.warnings.push(
            "daily_initialized:: true not found. Morning initialization may not have run."
        );
    }


    return result;
};


// ============================================================
// PARSE TASKS
// ============================================================

function parseTasks(
    content
) {

    const lines =
        content.split(
            /\r?\n/
        );


    const tasks = [];

    let currentSection =
        null;


    for (
        const line
        of lines
    ) {

        // ----------------------------------------------------
        // Enter task section
        // ----------------------------------------------------

        if (
            TASK_SECTIONS.includes(
                line.trim()
            )
        ) {

            currentSection =
                line.trim();

            continue;
        }


        // ----------------------------------------------------
        // Leave task section
        // ----------------------------------------------------

        if (
            /^#{1,6}\s/.test(
                line
            )
        ) {

            currentSection =
                null;

            continue;
        }


        if (
            !currentSection
        ) {

            continue;
        }


        // ----------------------------------------------------
        // Markdown task
        // ----------------------------------------------------

        const match =
            line.match(
                /^\s*[-*]\s*\[([ xX])\]\s+(.+?)\s*$/
            );


        if (!match) {
            continue;
        }


        const completed =
            match[1]
                .toLowerCase() === "x";


        const text =
            match[2].trim();


        const taskId =
            extractTaskId(
                text
            );


        const carriedOverMatch =
            text.match(
                /carried-over\s*::\s*([^\s]+)/i
            );


        const hasCarriedOverProperty =
            !!carriedOverMatch;


        const carriedOver =
            carriedOverMatch
                ? carriedOverMatch[1]
                    .toLowerCase() === "true"
                : false;


        const cleanText =
            cleanTaskText(
                text
            );


        tasks.push({

            section:
                currentSection,

            completed,

            text,

            cleanText,

            taskId,

            carriedOver,

            hasCarriedOverProperty

        });
    }


    return tasks;
};


// ============================================================
// EXTRACT TASK ID
// ============================================================

function extractTaskId(
    text
) {

    if (!text) {
        return null;
    }


    const match =
        text.match(
            /(?:^|\s)task-id\s*::\s*([^\s]+)/i
        );


    if (!match) {
        return null;
    }


    return match[1]
        .replace(
            /[`"'.,;]+$/,
            ""
        );
};


// ============================================================
// CLEAN TASK TEXT
// ============================================================

function cleanTaskText(
    text
) {

    if (!text) {
        return "";
    }


    return text

        .replace(
            /\s+task-id\s*::\s*[^\s]+/gi,
            ""
        )

        .replace(
            /\s+carried-over\s*::\s*true\b/gi,
            ""
        )

        .replace(
            /\s+/g,
            " "
        )

        .trim();
};


// ============================================================
// PARSE DAILY STATISTICS
// ============================================================

function parseDailyStatistics(
    content
) {

    const result = {

        found: false,

        total: null,

        completed: null,

        incomplete: null,

        completionRate: null,

        carriedOver: null

    };


    // --------------------------------------------------------
    // Find Daily Statistics section
    // --------------------------------------------------------

    const sectionMatch =
        content.match(
            /## Daily Statistics([\s\S]*?)(?=\n## |\n# |$)/i
        );


    if (!sectionMatch) {

        return result;
    }


    result.found =
        true;


    const section =
        sectionMatch[1];


    // --------------------------------------------------------
    // Parse values
    // --------------------------------------------------------

    result.total =
        extractStatistic(
            section,
            "Total"
        );


    result.completed =
        extractStatistic(
            section,
            "Completed"
        );


    result.incomplete =
        extractStatistic(
            section,
            "Incomplete"
        );


    result.completionRate =
        extractPercentage(
            section,
            "Completion rate"
        );


    result.carriedOver =
        extractStatistic(
            section,
            "Carried over"
        );


    return result;
};


// ============================================================
// EXTRACT STATISTIC
// ============================================================

function extractStatistic(
    section,
    label
) {

    const escaped =
        escapeRegExp(
            label
        );


    const regex =
        new RegExp(
            `[-*]\\s*${escaped}\\s*:\\s*(-?\\d+)`,
            "i"
        );


    const match =
        section.match(
            regex
        );


    if (!match) {
        return null;
    }


    return Number(
        match[1]
    );
};


// ============================================================
// EXTRACT PERCENTAGE
// ============================================================

function extractPercentage(
    section,
    label
) {

    const escaped =
        escapeRegExp(
            label
        );


    const regex =
        new RegExp(
            `[-*]\\s*${escaped}\\s*:\\s*(-?\\d+(?:\\.\\d+)?)\\s*%?`,
            "i"
        );


    const match =
        section.match(
            regex
        );


    if (!match) {
        return null;
    }


    return Number(
        match[1]
    );
};


// ============================================================
// VALIDATE STATISTICS
// ============================================================

function validateStatistics(
    tasks,
    statistics,
    result
) {

    const total =
        tasks.length;


    const completed =
        tasks.filter(
            task =>
                task.completed
        ).length;


    const incomplete =
        total -
        completed;


    const carriedOver =
        tasks.filter(
            task =>
                task.carriedOver
        ).length;


    const completionRate =
        total === 0
            ? 0
            : Math.round(
                completed /
                total *
                100
            );


    // --------------------------------------------------------
    // Total
    // --------------------------------------------------------

    if (
        statistics.total === null
    ) {

        result.errors.push(
            "Daily Statistics: Total is missing."
        );

    } else if (
        statistics.total !== total
    ) {

        result.errors.push(
            `Daily Statistics mismatch: Total = ${statistics.total}, actual = ${total}.`
        );
    }


    // --------------------------------------------------------
    // Completed
    // --------------------------------------------------------

    if (
        statistics.completed === null
    ) {

        result.errors.push(
            "Daily Statistics: Completed is missing."
        );

    } else if (
        statistics.completed !== completed
    ) {

        result.errors.push(
            `Daily Statistics mismatch: Completed = ${statistics.completed}, actual = ${completed}.`
        );
    }


    // --------------------------------------------------------
    // Incomplete
    // --------------------------------------------------------

    if (
        statistics.incomplete === null
    ) {

        result.errors.push(
            "Daily Statistics: Incomplete is missing."
        );

    } else if (
        statistics.incomplete !== incomplete
    ) {

        result.errors.push(
            `Daily Statistics mismatch: Incomplete = ${statistics.incomplete}, actual = ${incomplete}.`
        );
    }


    // --------------------------------------------------------
    // Completion rate
    // --------------------------------------------------------

    if (
        statistics.completionRate === null
    ) {

        result.errors.push(
            "Daily Statistics: Completion rate is missing."
        );

    } else if (
        statistics.completionRate !==
        completionRate
    ) {

        result.errors.push(
            `Daily Statistics mismatch: Completion rate = ${statistics.completionRate}%, actual = ${completionRate}%.`
        );
    }


    // --------------------------------------------------------
    // Carried over
    // --------------------------------------------------------

    if (
        statistics.carriedOver === null
    ) {

        result.errors.push(
            "Daily Statistics: Carried over is missing."
        );

    } else if (
        statistics.carriedOver !==
        carriedOver
    ) {

        result.errors.push(
            `Daily Statistics mismatch: Carried over = ${statistics.carriedOver}, actual = ${carriedOver}.`
        );
    }
};


// ============================================================
// GLOBAL TASK-ID VALIDATION
// ============================================================
//
// Important:
//
// Same task-id appearing on different dates is NORMAL.
//
// Example:
//
// 2026-08-12 → task-a1b2c3
// 2026-08-13 → task-a1b2c3
//
// This represents the same persistent task.
//
// We only flag duplicate task-id when it occurs MORE THAN ONCE
// inside the SAME Daily Note.
//
// ============================================================

function validateGlobalTaskIds(
    app,
    files
) {

    const result = {

        errors: [],

        warnings: []

    };


    // Map:
    //
    // date
    //   ↓
    // task-id
    //

    const dateMap =
        new Map();


    for (
        const file
        of files
    ) {

        if (
            !/^\d{4}-\d{2}-\d{2}$/
                .test(
                    file.basename
                )
        ) {

            continue;
        }


        // ----------------------------------------------------
        // Read file
        // ----------------------------------------------------

        // We cannot await inside this synchronous helper,
        // so global validation is handled through cached
        // metadata below.
        //
        // The active note receives the full validation above.
        //
        // For historical files we use Dataview metadata when
        // possible.
        // ----------------------------------------------------

        const cache =
            app.metadataCache.getFileCache(
                file
            );


        if (!cache) {
            continue;
        }


        const date =
            file.basename;


        if (
            !dateMap.has(
                date
            )
        ) {

            dateMap.set(
                date,
                new Set()
            );
        }


        const ids =
            dateMap.get(
                date
            );


        // ----------------------------------------------------
        // Inline fields
        // ----------------------------------------------------

        if (
            cache.fields
        ) {

            for (
                const fieldName
                of Object.keys(
                    cache.fields
                )
            ) {

                if (
                    fieldName
                        .toLowerCase()
                        !==
                    "task-id"
                ) {

                    continue;
                }


                const field =
                    cache.fields[
                        fieldName
                    ];


                const value =
                    field.value;


                if (
                    typeof value !==
                    "string"
                ) {

                    continue;
                }


                const taskId =
                    value.trim();


                if (
                    ids.has(
                        taskId
                    )
                ) {

                    result.errors.push(
                        `Duplicate task-id "${taskId}" detected in ${file.path}.`
                    );

                } else {

                    ids.add(
                        taskId
                    );
                }
            }
        }
    }


    return result;
};


// ============================================================
// INITIALIZATION CHECK
// ============================================================

function hasInitializedProperty(
    content
) {

    const yaml =
        /^\s*daily_initialized\s*:\s*true\s*$/mi;


    const inline =
        /daily_initialized\s*::\s*true/i;


    return (
        yaml.test(
            content
        ) ||
        inline.test(
            content
        )
    );
};


// ============================================================
// HEADING CHECK
// ============================================================

function hasHeading(
    content,
    heading
) {

    return content
        .split(
            /\r?\n/
        )
        .some(
            line =>
                line.trim() ===
                heading.trim()
        );
};


// ============================================================
// VALIDATION REPORT
// ============================================================

async function showValidationReport(
    app,
    obsidian,
    activeResult,
    globalResult
) {

    const errors = [
        ...activeResult.errors,
        ...globalResult.errors
    ];

    const warnings = [
        ...activeResult.warnings,
        ...globalResult.warnings
    ];


    const lines = [];


    lines.push(
        "# Daily Validator Report"
    );

    lines.push("");

    lines.push(
        `**File:** ${activeResult.file.path}`
    );

    lines.push("");


    // ========================================================
    // STATUS
    // ========================================================

    if (
        errors.length === 0
    ) {

        lines.push(
            "## Status"
        );

        lines.push("");

        lines.push(
            "✓ **PASS** — no errors detected."
        );

    } else {

        lines.push(
            "## Status"
        );

        lines.push("");

        lines.push(
            `✗ **FAIL** — ${errors.length} error(s) detected.`
        );
    }


    lines.push("");


    // ========================================================
    // ERRORS
    // ========================================================

    if (
        errors.length > 0
    ) {

        lines.push(
            "## Errors"
        );

        lines.push("");


        for (
            const error
            of errors
        ) {

            lines.push(
                `- [ ] ${error}`
            );
        }


        lines.push("");
    }


    // ========================================================
    // WARNINGS
    // ========================================================

    if (
        warnings.length > 0
    ) {

        lines.push(
            "## Warnings"
        );

        lines.push("");


        for (
            const warning
            of warnings
        ) {

            lines.push(
                `- [ ] ${warning}`
            );
        }


        lines.push("");
    }


    // ========================================================
    // TASK SUMMARY
    // ========================================================

    const tasks =
        activeResult.tasks;


    const withId =
        tasks.filter(
            task =>
                !!task.taskId
        ).length;


    const withoutId =
        tasks.filter(
            task =>
                !task.taskId
        ).length;


    const completed =
        tasks.filter(
            task =>
                task.completed
        ).length;


    const incomplete =
        tasks.length -
        completed;


    const carried =
        tasks.filter(
            task =>
                task.carriedOver
        ).length;


    lines.push(
        "## Task Summary"
    );

    lines.push("");

    lines.push(
        `- Total: ${tasks.length}`
    );

    lines.push(
        `- Completed: ${completed}`
    );

    lines.push(
        `- Incomplete: ${incomplete}`
    );

    lines.push(
        `- With task-id: ${withId}`
    );

    lines.push(
        `- Without task-id: ${withoutId}`
    );

    lines.push(
        `- Carried-over: ${carried}`
    );


    lines.push("");


    // ========================================================
    // STATISTICS
    // ========================================================

    if (
        activeResult.statistics
    ) {

        const stats =
            activeResult.statistics;


        lines.push(
            "## Daily Statistics"
        );

        lines.push("");

        lines.push(
            `- Total: ${stats.total ?? "missing"}`
        );

        lines.push(
            `- Completed: ${stats.completed ?? "missing"}`
        );

        lines.push(
            `- Incomplete: ${stats.incomplete ?? "missing"}`
        );

        lines.push(
            `- Completion rate: ${
                stats.completionRate !== null
                    ? stats.completionRate + "%"
                    : "missing"
            }`
        );

        lines.push(
            `- Carried over: ${stats.carriedOver ?? "missing"}`
        );
    }


    // ========================================================
    // CREATE TEMP REPORT
    // ========================================================

    const reportPath =
        "Daily/Reports/daily-validator-report.md";


    const reportContent =
        lines.join(
            "\n"
        );


    const existing =
        app.vault.getAbstractFileByPath(
            reportPath
        );


    if (existing) {

        await app.vault.modify(
            existing,
            reportContent
        );

    } else {

        await app.vault.create(
            reportPath,
            reportContent
        );
    }


    // ========================================================
    // OPEN REPORT
    // ========================================================

    const reportFile =
        app.vault.getAbstractFileByPath(
            reportPath
        );


    if (reportFile) {

        await app.workspace
            .getLeaf(
                true
            )
            .openFile(
                reportFile
            );
    }
};


// ============================================================
// REGEX ESCAPE
// ============================================================

function escapeRegExp(
    string
) {

    return string.replace(
        /[.*+?^${}()|[\]\\]/g,
        "\\$&"
    );
}