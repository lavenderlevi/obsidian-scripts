function replaceSmartCheckboxGroup(
    lines,
    parentHeading,
    childHeading,
    options,
    selected
) {
    const headingIndex = findHeading(
        lines,
        parentHeading,
        childHeading
    );

    if (headingIndex === -1) {
        console.warn(
            `Smart checkbox heading not found: ${parentHeading} > ${childHeading}`
        );
        return;
    }

    let start = headingIndex + 1;

    while (
        start < lines.length &&
        !/^-\s+\[[ xX]\]\s+/.test(lines[start])
    ) {
        if (/^#{1,6}\s+/.test(lines[start])) {
            return;
        }
        start++;
    }

    if (start >= lines.length) {
        return;
    }

    let end = start;

    while (
        end < lines.length &&
        /^-\s+\[[ xX]\]\s+/.test(lines[end])
    ) {
        end++;
    }

    const uniqueOptions = [
        ...new Set(
            options
                .map(option => String(option).trim())
                .filter(Boolean)
        )
    ];

    const replacement = uniqueOptions.map(option => {
        const checked =
            selected &&
            selected[option] === true;

        return `- [${checked ? "x" : " "}] ${option}`;
    });

    lines.splice(
        start,
        end - start,
        ...replacement
    );
}module.exports = async (params) => {
    const { app, obsidian } = params;

    const {
        Modal,
        Notice,
        Setting,
        TextComponent,
        TextAreaComponent,
        DropdownComponent
    } = obsidian;

    // ============================================================
    // CONFIG
    // ============================================================

    const TITLE = "Materials + ML — Quick Brainstorm";

    // ============================================================
    // CHECKBOX / RADIO OPTIONS
    // ============================================================

    const WHO_CARES = [
        "Semiconductor",
        "Materials R&D",
        "Manufacturing",
        "Energy",
        "Electronics",
        "Packaging",
        "Other"
    ];

    // ============================================================
    // UTILITIES
    // ============================================================

    function timestamp() {
        const d = new Date();

        const pad = n => String(n).padStart(2, "0");

        return (
            `${d.getFullYear()}-` +
            `${pad(d.getMonth() + 1)}-` +
            `${pad(d.getDate())} ` +
            `${pad(d.getHours())}:` +
            `${pad(d.getMinutes())}`
        );
    }

    function clean(value) {
        if (value === null || value === undefined) {
            return "";
        }

        return String(value).trim();
    }

    function isSpecified(value) {
        return (
            clean(value) !== "" &&
            clean(value) !== "Not specified"
        );
    }

    // ============================================================
    // FORMATTERS
    // ============================================================

    function formatBulletList(value) {
        const text = clean(value);

        if (!text) return "";

        return text
            .split(/\r?\n/)
            .map(line => line.trim())
            .filter(Boolean)
            .map(line => {
                line = line.replace(/^[-*+]\s+/, "");
                line = line.replace(/^\d+[.)]\s+/, "");

                return `- ${line}`;
            })
            .join("\n");
    }

    function formatNumberedList(value) {
        const text = clean(value);

        if (!text) return "";

        return text
            .split(/\r?\n/)
            .map(line => line.trim())
            .filter(Boolean)
            .map(line => {
                line = line.replace(/^[-*+]\s+/, "");
                line = line.replace(/^\d+[.)]\s+/, "");

                return line;
            })
            .map((line, index) => `${index + 1}. ${line}`)
            .join("\n");
    }

    function formatBlockquote(value) {
        const text = clean(value);

        if (!text) return "";

        return text
            .split(/\r?\n/)
            .map(line =>
                line.trim()
                    ? `> ${line.trim()}`
                    : ">"
            )
            .join("\n");
    }

    // ============================================================
    // HEADING SEARCH
    // ============================================================

    function findHeading(
        lines,
        parentHeading,
        childHeading
    ) {
        let insideParent = false;

        for (let i = 0; i < lines.length; i++) {
            const match = lines[i].match(
                /^(#{1,6})\s+(.+?)\s*$/
            );

            if (!match) continue;

            const level = match[1].length;
            const title = match[2].trim();

            if (level === 2) {
                if (title === parentHeading) {
                    insideParent = true;
                    continue;
                }

                if (insideParent) {
                    insideParent = false;
                }
            }

            if (
                insideParent &&
                level === 3 &&
                title === childHeading
            ) {
                return i;
            }
        }

        return -1;
    }

    function findParentHeading(
        lines,
        parentHeading
    ) {
        for (let i = 0; i < lines.length; i++) {
            const match = lines[i].match(
                /^(#{1,6})\s+(.+?)\s*$/
            );

            if (!match) continue;

            const level = match[1].length;
            const title = match[2].trim();

            if (
                level === 2 &&
                title === parentHeading
            ) {
                return i;
            }
        }

        return -1;
    }

    // ============================================================
    // HISTORY ENTRY
    // ============================================================

    function prependEntry(
        lines,
        parentHeading,
        childHeading,
        value,
        formatter = formatBulletList
    ) {
        const formatted = formatter(value);

        if (!formatted) return;

        const headingIndex = findHeading(
            lines,
            parentHeading,
            childHeading
        );

        if (headingIndex === -1) {
            console.warn(
                `Heading not found: ${parentHeading} > ${childHeading}`
            );

            return;
        }

        let insertAt = headingIndex + 1;

        while (
            insertAt < lines.length &&
            lines[insertAt].trim() === ""
        ) {
            insertAt++;
        }

        lines.splice(
            insertAt,
            0,
            "",
            `#### ${RUN_TIMESTAMP}`,
            "",
            formatted,
            ""
        );
    }

    // ============================================================
    // CHECKBOX STATE
    // ============================================================

    function readCheckboxState(
        lines,
        parentHeading,
        childHeading,
        options
    ) {
        const state = { OtherText: "" };
        for (const option of options) state[option] = false;

        const headingIndex = findHeading(lines, parentHeading, childHeading);
        if (headingIndex === -1) return state;

        for (let i = headingIndex + 1; i < lines.length; i++) {
            const line = lines[i];
            if (/^#{1,6}\s+/.test(line)) break;

            const match = line.match(/^-\s+\[([ xX])\]\s+(.+?)\s*$/);
            if (!match) continue;

            const checked = match[1].toLowerCase() === "x";
            const label = match[2].trim();

            if (label === "Other" || label.startsWith("Other:")) {
                state.Other = checked;
                if (label.startsWith("Other:")) state.OtherText = label.slice(6).trim();
            } else if (Object.prototype.hasOwnProperty.call(state, label)) {
                state[label] = checked;
            }
        }
        return state;
    }

    function normalizeOptionList(value) {
        if (Array.isArray(value)) return value.map(v => clean(v)).filter(Boolean);
        return clean(value).split(/\r?\n/)
            .map(v => v.trim())
            .map(v => v.replace(/^[-*+]\s+/, ""))
            .map(v => v.replace(/^\d+[.)]\s+/, ""))
            .filter(Boolean);
    }

    function mergeOptions(customOptions, defaults) {
        const result = [];
        const seen = new Set();
        for (const option of [...normalizeOptionList(customOptions), ...defaults]) {
            const value = clean(option);
            if (!value) continue;
            const key = value.toLowerCase();
            if (seen.has(key)) continue;
            seen.add(key);
            result.push(value);
        }
        return result;
    }

    function readCustomCheckboxOptions(lines, parentHeading, childHeading, defaults) {
        const defaultSet = new Set(defaults.map(v => clean(v).toLowerCase()));
        const custom = [];
        const headingIndex = findHeading(lines, parentHeading, childHeading);
        if (headingIndex === -1) return custom;

        for (let i = headingIndex + 1; i < lines.length; i++) {
            const line = lines[i];
            if (/^#{1,6}\s+/.test(line)) break;
            const match = line.match(/^-\s+\[[ xX]\]\s+(.+?)\s*$/);
            if (!match) continue;
            const label = match[1].trim();
            if (label === "Other" || label.startsWith("Other:")) continue;
            if (!defaultSet.has(label.toLowerCase())) custom.push(label);
        }
        return custom;
    }

    function replaceCheckboxGroup(
        lines,
        parentHeading,
        childHeading,
        options,
        selected
    ) {
        const headingIndex = findHeading(lines, parentHeading, childHeading);
        if (headingIndex === -1) return;

        let start = headingIndex + 1;
        while (start < lines.length && !/^-\s+\[[ xX]\]\s+/.test(lines[start])) {
            if (/^#{1,6}\s+/.test(lines[start])) return;
            start++;
        }
        if (start >= lines.length) return;

        let end = start;
        while (end < lines.length && /^-\s+\[[ xX]\]\s+/.test(lines[end])) end++;

        const replacement = options.map(option => {
            const checked = selected[option] === true;
            if (option === "Other") {
                const text = clean(selected.OtherText);
                return `- [${checked ? "x" : " "}] ${text ? `Other: ${text}` : "Other"}`;
            }
            return `- [${checked ? "x" : " "}] ${option}`;
        });

        lines.splice(start, end - start, ...replacement);
    }
    function replaceSmartCheckboxGroup(
    lines,
    parentHeading,
    childHeading,
    options,
    selected
) {
    const headingIndex = findHeading(
        lines,
        parentHeading,
        childHeading
    );

    if (headingIndex === -1) {
        console.warn(
            `Smart checkbox heading not found: ${parentHeading} > ${childHeading}`
        );
        return;
    }

    let start = headingIndex + 1;

    while (
        start < lines.length &&
        !/^-\s+\[[ xX]\]\s+/.test(lines[start])
    ) {
        if (/^#{1,6}\s+/.test(lines[start])) {
            return;
        }
        start++;
    }

    if (start >= lines.length) {
        return;
    }

    let end = start;

    while (
        end < lines.length &&
        /^-\s+\[[ xX]\]\s+/.test(lines[end])
    ) {
        end++;
    }

    const uniqueOptions = [
        ...new Set(
            options
                .map(option => String(option).trim())
                .filter(Boolean)
        )
    ];

    const replacement = uniqueOptions.map(option => {
        const checked =
            selected &&
            selected[option] === true;

        return `- [${checked ? "x" : " "}] ${option}`;
    });

    lines.splice(
        start,
        end - start,
        ...replacement
    );
}

    // ============================================================
    // MODAL
    // ============================================================

    class QuickBrainstormModal extends Modal {

        constructor(app, existingLines) {
            super(app);

            this.existingLines = existingLines;

            this.fields = {};
            this.result = null;
            this.submitted = false;

            this.currentContainer = null;
        }

        // --------------------------------------------------------
        // TEXT FIELD
        // --------------------------------------------------------

        addTextField(
            key,
            label,
            placeholder = ""
        ) {
            const setting =
                new Setting(this.currentContainer)
                    .setName(label);

            const input =
                new TextComponent(setting.controlEl);

            input
                .setPlaceholder(placeholder)
                .onChange(value => {
                    this.fields[key] = value;
                });

            this.fields[key] = "";

            return input;
        }

        // --------------------------------------------------------
        // TEXT AREA
        // --------------------------------------------------------

        addTextArea(
            key,
            label,
            placeholder = "",
            height = "100px"
        ) {
            const setting =
                new Setting(this.currentContainer)
                    .setName(label);

            const textarea =
                new TextAreaComponent(
                    setting.controlEl
                );

            textarea
                .setPlaceholder(placeholder)
                .onChange(value => {
                    this.fields[key] = value;
                });

            textarea.inputEl.style.width = "100%";
            textarea.inputEl.style.minHeight = height;
            textarea.inputEl.style.resize = "vertical";

            this.fields[key] = "";

            return textarea;
        }

        // --------------------------------------------------------
        // DROPDOWN
        // --------------------------------------------------------

        addDropdown(
            key,
            label,
            options
        ) {
            const setting =
                new Setting(this.currentContainer)
                    .setName(label);

            const dropdown =
                new DropdownComponent(
                    setting.controlEl
                );

            for (const option of options) {
                dropdown.addOption(
                    option,
                    option
                );
            }

            dropdown
                .setValue(options[0])
                .onChange(value => {
                    this.fields[key] = value;
                });

            this.fields[key] = options[0];

            return dropdown;
        }

        // --------------------------------------------------------
        // MULTI SELECT CHECKBOX
        // --------------------------------------------------------

        addCheckboxGroup(
            key,
            label,
            options,
            initialState = {}
        ) {
            const wrapper = this.currentContainer.createDiv();
            wrapper.style.marginTop = "16px";
            wrapper.style.marginBottom = "16px";

            const title = wrapper.createEl("div", { text: label });
            title.style.fontWeight = "600";
            title.style.marginBottom = "8px";

            const group = wrapper.createDiv();
            const otherHolder = wrapper.createDiv();
            this.fields[key] = {};

            for (const option of options) {
                const row = group.createDiv();
                row.style.display = "flex";
                row.style.alignItems = "center";
                row.style.gap = "8px";
                row.style.marginBottom = "6px";

                const checkbox = row.createEl("input");
                checkbox.type = "checkbox";
                checkbox.checked = initialState[option] === true;

                const labelEl = row.createEl("label", { text: option });
                labelEl.style.cursor = "pointer";

                const sync = () => {
                    this.fields[key][option] = checkbox.checked;

                    if (option !== "Other") return;

                    if (checkbox.checked) {
                        if (!this._otherInputs) this._otherInputs = {};

                        if (!this._otherInputs[key]) {
                            const setting = new Setting(otherHolder).setName("Other");
                            const input = new TextComponent(setting.controlEl);

                            input.setPlaceholder("Nhập nội dung cho Other...")
                                .setValue(initialState.OtherText || "")
                                .onChange(value => {
                                    this.fields[key].OtherText = value;
                                });

                            input.inputEl.style.width = "100%";
                            this._otherInputs[key] = input;
                        }

                        const el = this._otherInputs[key].inputEl.closest(".setting-item");
                        if (el) el.style.display = "";
                        this.fields[key].OtherText = this._otherInputs[key].getValue();
                    } else {
                        this.fields[key].OtherText = "";
                        const input = this._otherInputs?.[key];
                        if (input) {
                            const el = input.inputEl.closest(".setting-item");
                            if (el) el.style.display = "none";
                        }
                    }
                };

                checkbox.onchange = sync;
                labelEl.onclick = event => {
                    event.preventDefault();
                    checkbox.checked = !checkbox.checked;
                    sync();
                };

                this.fields[key][option] = checkbox.checked;
            }

            const otherIndex = options.indexOf("Other");
            if (otherIndex !== -1) {
                const checkbox = group.children[otherIndex]?.querySelector('input[type="checkbox"]');
                if (checkbox && checkbox.checked) checkbox.dispatchEvent(new Event("change"));
            }

            return group;
        }

        addDynamicCheckboxGroup(
            key,
            label,
            defaults,
            customInitial,
            customLabel = "Custom Options"
        ) {
            const customSetting =
                new Setting(this.currentContainer).setName(customLabel);

            const customInput =
                new TextAreaComponent(customSetting.controlEl);

            customInput
                .setPlaceholder("A, B, C — mỗi dòng một option...")
                .setValue((customInitial || []).join("\n"));

            customInput.inputEl.style.width = "100%";
            customInput.inputEl.style.minHeight = "70px";
            customInput.inputEl.style.resize = "vertical";

            this.fields[key + "Custom"] = customInput.getValue();

            const groupWrapper = this.currentContainer.createDiv();
            groupWrapper.style.marginTop = "10px";
            groupWrapper.style.marginBottom = "16px";

            const title = groupWrapper.createEl("div", { text: label });
            title.style.fontWeight = "600";
            title.style.marginBottom = "8px";

            const group = groupWrapper.createDiv();

            const initialOptions =
                mergeOptions(customInitial || [], defaults);

            const initialState =
                readCheckboxState(
                    this.existingLines,
                    "7. ML Approach",
                    label,
                    initialOptions
                );

            this.fields[key] = { ...initialState };

            const render = (options) => {
                const previous = { ...this.fields[key] };
                group.empty();

                for (const option of options) {
                    const row = group.createDiv();
                    row.style.display = "flex";
                    row.style.alignItems = "center";
                    row.style.gap = "8px";
                    row.style.marginBottom = "6px";

                    const checkbox = row.createEl("input");
                    checkbox.type = "checkbox";
                    checkbox.checked = previous[option] === true;

                    const labelEl = row.createEl("label", { text: option });
                    labelEl.style.cursor = "pointer";

                    const sync = () => {
                        this.fields[key][option] = checkbox.checked;
                    };

                    checkbox.onchange = sync;
                    labelEl.onclick = event => {
                        event.preventDefault();
                        checkbox.checked = !checkbox.checked;
                        sync();
                    };

                    if (!(option in this.fields[key])) {
                        this.fields[key][option] = false;
                    }
                }
            };

            render(initialOptions);

            customInput.onChange(value => {
                this.fields[key + "Custom"] = value;

                const options =
                    mergeOptions(
                        readCustomCheckboxOptions(
                            this.existingLines,
                            "7. ML Approach",
                            label,
                            defaults
                        ),
                        [...normalizeOptionList(value), ...defaults]
                    );

                render(options);
            });

            return {
                input: customInput,
                group
            };
        }

        // --------------------------------------------------------
        // SECTION
        // --------------------------------------------------------
        // SECTION
        // --------------------------------------------------------

        addSection(
            title,
            description = ""
        ) {
            const heading =
                this.currentContainer.createEl(
                    "h3",
                    { text: title }
                );

            heading.style.marginTop = "20px";

            if (description) {
                const desc =
                    this.currentContainer.createEl(
                        "p",
                        { text: description }
                    );

                desc.style.color =
                    "var(--text-muted)";
            }
        }

        // --------------------------------------------------------
        // OPEN
        // --------------------------------------------------------

        onOpen() {
            const { contentEl } = this;

            contentEl.empty();

            contentEl.style.maxWidth = "900px";

            contentEl.createEl(
                "h2",
                { text: TITLE }
            );

            const intro =
                contentEl.createEl(
                    "p",
                    {
                        text:
                            "Điền nhanh những gì bạn biết. " +
                            "Field rỗng sẽ được bỏ qua. " +
                            "Các câu trả lời dạng text được lưu thành history."
                    }
                );

            intro.style.color =
                "var(--text-muted)";

            this.currentContainer =
                contentEl;

            // ====================================================
            // IDEA
            // ====================================================

            this.addSection(
                "1. Idea"
            );

            this.addTextField(
                "projectName",
                "Project Name",
                "Tên project..."
            );

            this.addTextArea(
                "oneSentenceIdea",
                "One-Sentence Idea",
                "Mô tả ý tưởng trong 1–3 câu...",
                "100px"
            );

            this.addTextArea(
                "initialIntuition",
                "Initial Intuition",
                "Trực giác ban đầu...",
                "100px"
            );

            // ====================================================
            // MATERIALS
            // ====================================================

            this.addSection(
                "2. Materials Science Problem"
            );

            this.addTextArea(
                "materialSystem",
                "What material / material system?",
                "Ví dụ: HfO2, SiC, perovskites...",
                "90px"
            );

            this.addTextField(
                "property",
                "What property am I interested in?",
                "Band gap / dielectric constant..."
            );

            this.addCheckboxGroup(
                "whoCares",
                "Who would care about this?",
                WHO_CARES,
                readCheckboxState(
                    this.existingLines,
                    "2. Materials Science Problem",
                    "Who would care about this?",
                    WHO_CARES
                )
            );

            // ====================================================
            // RESEARCH
            // ====================================================

            this.addSection(
                "3. Research Question"
            );

            this.addTextArea(
                "researchQuestion",
                "Main Research Question",
                "Can I use machine learning to...",
                "110px"
            );

            this.addTextArea(
                "subQuestions",
                "Sub-questions",
                "Mỗi câu hỏi một dòng...",
                "120px"
            );

            this.addTextArea(
                "hypothesis",
                "Hypothesis",
                "I hypothesize that...",
                "110px"
            );

            // ====================================================
            // TARGET
            // ====================================================

            this.addSection(
                "4. Target Property"
            );

            this.addTextField(
                "target",
                "Target",
                "Ví dụ: Band gap"
            );

            this.addTextField(
                "unit",
                "Unit",
                "eV"
            );

            this.addDropdown(
                "taskType",
                "Regression or Classification?",
                [
                    "Not specified",
                    "Regression",
                    "Binary classification",
                    "Multi-class classification",
                    "Ranking",
                    "Generation / inverse design"
                ]
            );

            this.addDropdown(
                "difficulty",
                "Expected difficulty",
                [
                    "Not specified",
                    "Easy",
                    "Moderate",
                    "Difficult"
                ]
            );

            // ====================================================
            // DATASET
            // ====================================================

            this.addSection(
                "5. Dataset"
            );

            this.addTextArea(
                "dataSources",
                "Possible Data Sources",
                "Mỗi nguồn một dòng...",
                "110px"
            );

            this.addTextArea(
                "datasetReference",
                "Dataset URL / Reference",
                "Mỗi URL / DOI một dòng...",
                "120px"
            );

            this.addTextField(
                "estimatedMaterials",
                "Estimated Number of Materials",
                "~10,000"
            );

            this.addDropdown(
                "dataNature",
                "Experimental or Computational?",
                [
                    "Not specified",
                    "Experimental",
                    "DFT",
                    "Molecular dynamics",
                    "Mixed"
                ]
            );

            // ====================================================
            // ML
            // ====================================================

            this.addSection(
                "7. ML Approach"
            );

            const qBaselineCustom = readCustomCheckboxOptions(
                this.existingLines, "7. ML Approach", "Baseline",
                ["Mean prediction", "Linear Regression", "Ridge / Lasso"]
            );
            const qClassicalCustom = readCustomCheckboxOptions(
                this.existingLines, "7. ML Approach", "Classical ML",
                ["Random Forest", "XGBoost", "LightGBM", "SVR", "kNN"]
            );
            const qDeepCustom = readCustomCheckboxOptions(
                this.existingLines, "7. ML Approach", "Deep Learning",
                ["MLP", "CNN", "GNN", "Transformer"]
            );

            this.addDynamicCheckboxGroup(
                "baseline",
                "Baseline",
                ["Mean prediction", "Linear Regression", "Ridge / Lasso"],
                qBaselineCustom,
                "Custom Baseline Options"
            );

            this.addDynamicCheckboxGroup(
                "classicalML",
                "Classical ML",
                ["Random Forest", "XGBoost", "LightGBM", "SVR", "kNN"],
                qClassicalCustom,
                "Custom Classical ML Options"
            );

            this.addDynamicCheckboxGroup(
                "deepLearning",
                "Deep Learning",
                ["MLP", "CNN", "GNN", "Transformer"],
                qDeepCustom,
                "Custom Deep Learning Options"
            );

            this.addTextArea(
                "modelReason",
                "Why this model?",
                "Tại sao chọn model này?",
                "100px"
            );

            // ====================================================
            // NEXT
            // ====================================================

            this.addSection(
                "19. Next Action"
            );

            this.addTextArea(
                "nextAction",
                "What is the ONE thing I should do next?",
                "Một hành động cụ thể...",
                "110px"
            );

            // ====================================================
            // BUTTONS
            // ====================================================

            const buttons =
                contentEl.createDiv();

            buttons.style.display = "flex";
            buttons.style.justifyContent = "flex-end";
            buttons.style.gap = "8px";
            buttons.style.marginTop = "24px";
            buttons.style.paddingTop = "12px";
            buttons.style.borderTop =
                "1px solid var(--background-modifier-border)";

            const cancel =
                buttons.createEl(
                    "button",
                    { text: "Cancel" }
                );

            cancel.onclick = () => {
                this.submitted = false;
                this.close();
            };

            const apply =
                buttons.createEl(
                    "button",
                    {
                        text: "Apply",
                        cls: "mod-cta"
                    }
                );

            apply.onclick = () => {
                this.submitted = true;
                this.result = {
                    ...this.fields
                };

                this.close();
            };
        }

        onClose() {
            this.contentEl.empty();

            if (!this.submitted) {
                this.result = null;
            }
        }
    }

    // ============================================================
    // ACTIVE FILE
    // ============================================================

    const file =
        app.workspace.getActiveFile();

    if (!file) {
        new Notice(
            "Không có note nào đang mở."
        );

        return;
    }

    if (file.extension !== "md") {
        new Notice(
            "Active file không phải Markdown."
        );

        return;
    }

    // ============================================================
    // READ EXISTING NOTE
    // ============================================================

    const existingContent =
        await app.vault.read(file);

    const existingLines =
        existingContent.split(/\r?\n/);

    // ============================================================
    // OPEN FORM
    // ============================================================

    const modal =
        new QuickBrainstormModal(
            app,
            existingLines
        );

    await new Promise(resolve => {
        const originalClose =
            modal.onClose.bind(modal);

        modal.onClose = function () {
            originalClose();
            resolve();
        };

        modal.open();
    });

    if (!modal.result) {
        return;
    }

    // ============================================================
    // APPLY
    // ============================================================

    const RUN_TIMESTAMP =
        timestamp();

    let lines = existingLines;

    const data =
        modal.result;

    // ------------------------------------------------------------
    // HISTORY FIELDS
    // ------------------------------------------------------------

    prependEntry(
        lines,
        "1. Idea",
        "Project Name",
        data.projectName
    );

    prependEntry(
        lines,
        "1. Idea",
        "One-Sentence Idea",
        data.oneSentenceIdea
    );

    prependEntry(
        lines,
        "1. Idea",
        "Initial Intuition",
        data.initialIntuition
    );

    prependEntry(
        lines,
        "2. Materials Science Problem",
        "What material / material system?",
        data.materialSystem
    );

    prependEntry(
        lines,
        "2. Materials Science Problem",
        "What property am I interested in?",
        data.property
    );

    // ------------------------------------------------------------
    // CHECKBOX STATE
    // ------------------------------------------------------------

    replaceCheckboxGroup(
        lines,
        "2. Materials Science Problem",
        "Who would care about this?",
        WHO_CARES,
        data.whoCares
    );

    // ------------------------------------------------------------
    // RESEARCH
    // ------------------------------------------------------------

    prependEntry(
        lines,
        "3. Research Question",
        "Main Research Question",
        data.researchQuestion,
        formatBlockquote
    );

    prependEntry(
        lines,
        "3. Research Question",
        "Sub-questions",
        data.subQuestions,
        formatNumberedList
    );

    prependEntry(
        lines,
        "3. Research Question",
        "Hypothesis",
        data.hypothesis,
        formatBlockquote
    );

    // ------------------------------------------------------------
    // TARGET
    // ------------------------------------------------------------

    prependEntry(
        lines,
        "4. Target Property",
        "Target",
        data.target
    );

    prependEntry(
        lines,
        "4. Target Property",
        "Unit",
        data.unit
    );

    if (isSpecified(data.taskType)) {
        prependEntry(
            lines,
            "4. Target Property",
            "Regression or Classification?",
            data.taskType
        );
    }

    if (isSpecified(data.difficulty)) {
        prependEntry(
            lines,
            "4. Target Property",
            "Expected difficulty",
            data.difficulty
        );
    }

    // ------------------------------------------------------------
    // DATASET
    // ------------------------------------------------------------

    prependEntry(
        lines,
        "5. Dataset",
        "Possible Data Sources",
        data.dataSources
    );

    prependEntry(
        lines,
        "5. Dataset",
        "Dataset URL / Reference",
        data.datasetReference
    );

    prependEntry(
        lines,
        "5. Dataset",
        "Estimated Number of Materials",
        data.estimatedMaterials
    );

    if (isSpecified(data.dataNature)) {
        prependEntry(
            lines,
            "5. Dataset",
            "Experimental or Computational?",
            data.dataNature
        );
    }

    // ------------------------------------------------------------
    // ML
    // ------------------------------------------------------------

    const quickBaselineCustom = readCustomCheckboxOptions(
        lines, "7. ML Approach", "Baseline",
        ["Mean prediction", "Linear Regression", "Ridge / Lasso"]
    );
    const quickClassicalCustom = readCustomCheckboxOptions(
        lines, "7. ML Approach", "Classical ML",
        ["Random Forest", "XGBoost", "LightGBM", "SVR", "kNN"]
    );
    const quickDeepCustom = readCustomCheckboxOptions(
        lines, "7. ML Approach", "Deep Learning",
        ["MLP", "CNN", "GNN", "Transformer"]
    );

    const mergedBaseline = mergeOptions(
        [...quickBaselineCustom, ...normalizeOptionList(data.baselineCustom)],
        ["Mean prediction", "Linear Regression", "Ridge / Lasso"]
    );
    const mergedClassical = mergeOptions(
        [...quickClassicalCustom, ...normalizeOptionList(data.classicalMLCustom)],
        ["Random Forest", "XGBoost", "LightGBM", "SVR", "kNN"]
    );
    const mergedDeep = mergeOptions(
        [...quickDeepCustom, ...normalizeOptionList(data.deepLearningCustom)],
        ["MLP", "CNN", "GNN", "Transformer"]
    );

    replaceCheckboxGroup(lines, "7. ML Approach", "Baseline", mergedBaseline, data.baseline);
    replaceCheckboxGroup(lines, "7. ML Approach", "Classical ML", mergedClassical, data.classicalML);
    replaceCheckboxGroup(lines, "7. ML Approach", "Deep Learning", mergedDeep, data.deepLearning);
// ------------------------------------------------------------
// ML CHECKBOX STATE
// ------------------------------------------------------------

replaceSmartCheckboxGroup(
    lines,
    "7. ML Approach",
    "Baseline",
    data.__choiceOptions?.baseline || [
        "Mean prediction",
        "Linear Regression",
        "Ridge / Lasso"
    ],
    data.baseline
);

replaceSmartCheckboxGroup(
    lines,
    "7. ML Approach",
    "Classical ML",
    data.__choiceOptions?.classicalML || [
        "Random Forest",
        "XGBoost",
        "LightGBM",
        "SVR",
        "kNN"
    ],
    data.classicalML
);

replaceSmartCheckboxGroup(
    lines,
    "7. ML Approach",
    "Deep Learning",
    data.__choiceOptions?.deepLearning || [
        "MLP",
        "CNN",
        "GNN",
        "Transformer"
    ],
    data.deepLearning
);

    // ------------------------------------------------------------
    // NEXT ACTION
    // ------------------------------------------------------------

    prependEntry(
        lines,
        "19. Next Action",
        "What is the ONE thing I should do next?",
        data.nextAction
    );

    // ============================================================
    // SAVE
    // ============================================================

    await app.vault.modify(
        file,
        lines.join("\n")
    );

    new Notice(
        `Quick Brainstorm saved — ${RUN_TIMESTAMP}`
    );
};