module.exports = async (params) => {
    const { app, quickAddApi } = params;

    // 1. Get active note
    const activeFile = app.workspace.getActiveFile();

    if (!activeFile) {
        new Notice("Không có note nào đang mở.");
        return;
    }

    if (activeFile.extension !== "md") {
        new Notice("Note hiện tại không phải Markdown.");
        return;
    }

    // 2. Read note
    const content = await app.vault.read(activeFile);
    const lines = content.split(/\r?\n/);

    // 3. Find headings
    const headings = [];
    let insideCodeBlock = false;

    for (let i = 0; i < lines.length; i++) {
        const line = lines[i];

        // Ignore headings inside code blocks
        if (/^\s*(```|~~~)/.test(line)) {
            insideCodeBlock = !insideCodeBlock;
            continue;
        }

        if (insideCodeBlock) {
            continue;
        }

        const match = line.match(/^(#{1,6})\s+(.+?)\s*$/);

        if (!match) {
            continue;
        }

        const level = match[1].length;

        const text = match[2]
            .replace(/\s+#+\s*$/, "")
            .trim();

        headings.push({
            line: i,
            level: level,
            text: text,
            display: `${match[1]} ${text}`
        });
    }

    if (headings.length === 0) {
        new Notice("Không tìm thấy heading nào.");
        return;
    }

    // 4. Enter multiple questions
    const rawQuestions = await quickAddApi.wideInputPrompt(
        "Enter questions",
        "Mỗi dòng là một câu hỏi..."
    );

    if (!rawQuestions || !rawQuestions.trim()) {
        return;
    }

    // 5. Convert each line into a question
    const questions = rawQuestions
        .split(/\r?\n/)
        .map(q => q.trim())
        .filter(q => q.length > 0);

    if (questions.length === 0) {
        new Notice("Không có câu hỏi hợp lệ.");
        return;
    }

    // 6. Choose heading
    const selectedHeading = await quickAddApi.suggester(
        headings.map(h => h.display),
        headings,
        "Chọn section..."
    );

    if (!selectedHeading) {
        return;
    }

    // 7. Create Markdown tasks
    const tasks = questions.map(
        question => `- [ ] ${question}`
    );

    // 8. Insert immediately BELOW the selected heading
    const insertIndex = selectedHeading.line + 1;

    const before = lines.slice(0, insertIndex);
    const after = lines.slice(insertIndex);

    const newContent = [
        ...before,
        "",
        ...tasks,
        ...after
    ].join("\n");

    // 9. Write file
    await app.vault.modify(
        activeFile,
        newContent
    );

    // 10. Confirmation
    new Notice(
        `Đã thêm ${questions.length} câu hỏi vào "${selectedHeading.display}".`
    );
};