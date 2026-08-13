module.exports = async (params) => {
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

    const TITLE =
        "Materials + ML — Full Research Plan";

    // ============================================================
    // MULTI-SELECT OPTIONS
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

    const DATA_SOURCES = [
        "Materials Project",
        "OQMD",
        "AFLOW",
        "JARVIS",
        "NOMAD",
        "Experimental literature",
        "My own dataset",
        "Other"
    ];

    const INPUT_INFORMATION = [
        "Chemical composition",
        "Elemental properties",
        "Crystal structure",
        "Lattice parameters",
        "Density",
        "Formation energy",
        "Electronic structure",
        "Band structure",
        "DOS",
        "Processing conditions",
        "Temperature",
        "Pressure",
        "Other"
    ];

    const BASELINE = [
        "Mean prediction",
        "Linear Regression",
        "Ridge / Lasso"
    ];

    const CLASSICAL_ML = [
        "Random Forest",
        "XGBoost",
        "LightGBM",
        "SVR",
        "kNN"
    ];

    const DEEP_LEARNING = [
        "MLP",
        "CNN",
        "GNN",
        "Transformer"
    ];

    const FEATURE_IMPORTANCE = [
        "Permutation importance",
        "SHAP",
        "Feature coefficients",
        "Partial dependence",
        "Other"
    ];

    const CV_OPTIONS = [
        "K-Fold",
        "Stratified K-Fold",
        "Group K-Fold",
        "Leave-one-group-out",
        "Other"
    ];

    const ADVANCED_IMPROVEMENTS = [
        "Better descriptors",
        "More data",
        "Experimental validation",
        "Uncertainty quantification",
        "Explainable ML",
        "Active learning",
        "Transfer learning",
        "Graph Neural Network",
        "Generative model",
        "Inverse design",
        "Multi-objective optimization"
    ];

    const CODE_DELIVERABLES = [
        "Data pipeline",
        "Feature pipeline",
        "Training pipeline",
        "Evaluation pipeline",
        "Inference API",
        "Visualization"
    ];

    const RESEARCH_DELIVERABLES = [
        "Literature review",
        "Dataset analysis",
        "Model comparison",
        "Feature interpretation",
        "Materials screening",
        "Final report"
    ];

    const PRODUCT_DELIVERABLES = [
        "CLI",
        "Streamlit",
        "FastAPI",
        "Web dashboard",
        "Materials database"
    ];

    const PORTFOLIO_DELIVERABLES = [
        "GitHub repository",
        "README",
        "Architecture diagram",
        "Demo",
        "Technical report",
        "Blog post"
    ];

    // ============================================================
    // UTILITIES
    // ============================================================

    function timestamp() {
        const d = new Date();

        const pad = n =>
            String(n).padStart(2, "0");

        return (
            `${d.getFullYear()}-` +
            `${pad(d.getMonth() + 1)}-` +
            `${pad(d.getDate())} ` +
            `${pad(d.getHours())}:` +
            `${pad(d.getMinutes())}`
        );
    }

    function clean(value) {
        if (
            value === null ||
            value === undefined
        ) {
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
                line =
                    line.replace(
                        /^[-*+]\s+/,
                        ""
                    );

                line =
                    line.replace(
                        /^\d+[.)]\s+/,
                        ""
                    );

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
                line =
                    line.replace(
                        /^[-*+]\s+/,
                        ""
                    );

                line =
                    line.replace(
                        /^\d+[.)]\s+/,
                        ""
                    );

                return line;
            })
            .map(
                (line, index) =>
                    `${index + 1}. ${line}`
            )
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
    // FIND HEADING
    // ============================================================

    function findHeading(
        lines,
        parentHeading,
        childHeading
    ) {
        let insideParent = false;

        for (
            let i = 0;
            i < lines.length;
            i++
        ) {
            const match =
                lines[i].match(
                    /^(#{1,6})\s+(.+?)\s*$/
                );

            if (!match) continue;

            const level =
                match[1].length;

            const title =
                match[2].trim();

            if (level === 2) {
                if (
                    title ===
                    parentHeading
                ) {
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
        for (
            let i = 0;
            i < lines.length;
            i++
        ) {
            const match =
                lines[i].match(
                    /^(#{1,6})\s+(.+?)\s*$/
                );

            if (!match) continue;

            const level =
                match[1].length;

            const title =
                match[2].trim();

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
        const formatted =
            formatter(value);

        if (!formatted) return;

        const headingIndex =
            findHeading(
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

        let insertAt =
            headingIndex + 1;

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
    // PARENT-LEVEL HISTORY
    // ============================================================

    function prependToParent(
        lines,
        parentHeading,
        value,
        formatter = formatBulletList
    ) {
        const formatted =
            formatter(value);

        if (!formatted) return;

        const headingIndex =
            findParentHeading(
                lines,
                parentHeading
            );

        if (headingIndex === -1) {
            console.warn(
                `Parent heading not found: ${parentHeading}`
            );

            return;
        }

        let insertAt =
            headingIndex + 1;

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
    // CHECKBOX STATE / ENTRIES
    // ============================================================

    function readCheckboxState(
        lines,
        parentHeading,
        childHeading,
        options
    ) {
        const state = {};
        state.__otherText = "";

        for (const option of options) {
            state[option] = false;
        }

        const headingIndex = findHeading(
            lines,
            parentHeading,
            childHeading
        );

        if (headingIndex === -1) {
            return state;
        }

        for (let i = headingIndex + 1; i < lines.length; i++) {
            const line = lines[i];

            if (/^#{1,6}\s+/.test(line)) {
                break;
            }

            const match = line.match(
                /^-\s+\[([ xX])\]\s+(.+?)\s*$/
            );

            if (!match) continue;

            const checked =
                match[1].toLowerCase() === "x";

            const rawLabel = match[2].trim();

            if (/^Other\s*:/i.test(rawLabel)) {
                if (Object.prototype.hasOwnProperty.call(state, "Other")) {
                    state.Other = checked;
                    state.__otherText =
                        rawLabel.replace(/^Other\s*:\s*/i, "").trim();
                }
                continue;
            }

            if (
                Object.prototype.hasOwnProperty.call(
                    state,
                    rawLabel
                )
            ) {
                state[rawLabel] = checked;
            } else {
                // Preserve custom checkbox states so smart groups
                // can restore them on the next run.
                state[rawLabel] = checked;
            }
        }

        return state;
    }

    function readCheckboxLabels(
        lines,
        parentHeading,
        childHeading
    ) {
        const labels = [];

        const headingIndex = findHeading(
            lines,
            parentHeading,
            childHeading
        );

        if (headingIndex === -1) {
            return labels;
        }

        for (let i = headingIndex + 1; i < lines.length; i++) {
            const line = lines[i];

            if (/^#{1,6}\s+/.test(line)) {
                break;
            }

            const match = line.match(
                /^-\s+\[[ xX]\]\s+(.+?)\s*$/
            );

            if (!match) continue;

            const label = match[1].trim();

            if (/^Other\s*:/i.test(label)) {
                if (!labels.includes("Other")) {
                    labels.push("Other");
                }
            } else if (!labels.includes(label)) {
                labels.push(label);
            }
        }

        return labels;
    }

    function extractCustomOptions(
        lines,
        parentHeading,
        childHeading,
        defaultOptions
    ) {
        const defaults = new Set(defaultOptions);
        const custom = [];

        const headingIndex = findHeading(
            lines,
            parentHeading,
            childHeading
        );

        if (headingIndex === -1) {
            return custom;
        }

        for (let i = headingIndex + 1; i < lines.length; i++) {
            const line = lines[i];

            // Stop at the next heading, including #### history entries.
            if (/^#{1,6}\s+/.test(line)) {
                break;
            }

            const match = line.match(
                /^-\s+\[[ xX]\]\s+(.+?)\s*$/
            );

            if (!match) continue;

            const rawLabel = match[1].trim();
            const label = rawLabel.replace(
                /^Other\s*:.*/i,
                "Other"
            );

            if (
                label &&
                label !== "Other" &&
                !defaults.has(label) &&
                !custom.includes(label)
            ) {
                custom.push(label);
            }
        }

        return custom;
    }

    // ============================================================
    // REPLACE CHECKBOX GROUP
    // ============================================================

    function replaceCheckboxGroup(
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
                `Checkbox heading not found: ${parentHeading} > ${childHeading}`
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
            const checked = selected[option] === true;

            if (option === "Other") {
                const otherText =
                    clean(selected.__otherText || "");

                return otherText && checked
                    ? `- [x] Other: ${otherText}`
                    : `- [${checked ? "x" : " "}] Other`;
            }

            return `- [${checked ? "x" : " "}] ${option}`;
        });

        lines.splice(
            start,
            end - start,
            ...replacement
        );
    }

    // ============================================================
    // READ SINGLE CHOICE
    // ============================================================

    function readSingleChoice(
        lines,
        parentHeading,
        childHeading
    ) {
        const headingIndex =
            findHeading(
                lines,
                parentHeading,
                childHeading
            );

        if (headingIndex === -1) {
            return "";
        }

        for (
            let i = headingIndex + 1;
            i < lines.length;
            i++
        ) {
            const line =
                lines[i].trim();

            if (
                /^#{1,6}\s+/.test(line)
            ) {
                break;
            }

            if (!line) continue;

            // Current bullet state
            const bullet =
                line.match(
                    /^-\s+(.+?)\s*$/
                );

            if (bullet) {
                return bullet[1].trim();
            }

            // Current blockquote
            const quote =
                line.match(
                    /^>\s*(.+?)\s*$/
                );

            if (quote) {
                return quote[1].trim();
            }

            // Plain text
            return line;
        }

        return "";
    }

    // ============================================================
    // REPLACE SINGLE CHOICE
    // ============================================================

    function replaceSingleChoice(
        lines,
        parentHeading,
        childHeading,
        value
    ) {
        if (!isSpecified(value)) {
            return;
        }

        const headingIndex =
            findHeading(
                lines,
                parentHeading,
                childHeading
            );

        if (headingIndex === -1) {
            console.warn(
                `Single-choice heading not found: ${parentHeading} > ${childHeading}`
            );

            return;
        }

        let start =
            headingIndex + 1;

        while (
            start < lines.length &&
            lines[start].trim() === ""
        ) {
            start++;
        }

        if (
            start >= lines.length ||
            /^#{1,6}\s+/.test(
                lines[start]
            )
        ) {
            lines.splice(
                headingIndex + 1,
                0,
                "",
                `- ${value}`,
                ""
            );

            return;
        }

        let end = start;

        // Remove existing current value.
        while (
            end < lines.length &&
            lines[end].trim() !== ""
        ) {
            if (
                /^#{1,6}\s+/.test(
                    lines[end]
                )
            ) {
                break;
            }

            // Stop at history timestamp.
            if (
                /^####\s+/.test(
                    lines[end]
                )
            ) {
                break;
            }

            end++;
        }

        lines.splice(
            start,
            end - start,
            `- ${value}`,
            ""
        );
    }

    // ============================================================
    // MODAL
    // ============================================================

    class FullPlanModal extends Modal {

        constructor(
            app,
            existingLines
        ) {
            super(app);

            this.existingLines =
                existingLines;

            this.fields = {};
            this.choiceOptions = {};

            this.result = null;

            this.submitted = false;

            this.tabs = {};

            this.tabContents = {};

            this.currentContainer = null;

            // Explicit instance binding keeps QuickAdd from losing the
            // radio helper when this user script is executed.
            this.addRadioGroup =
                FullPlanModal.prototype.addRadioGroup.bind(this);
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
                new Setting(
                    this.currentContainer
                ).setName(label);

            const input =
                new TextComponent(
                    setting.controlEl
                );

            input
                .setPlaceholder(
                    placeholder
                )
                .onChange(value => {
                    this.fields[key] =
                        value;
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
                new Setting(
                    this.currentContainer
                ).setName(label);

            const textarea =
                new TextAreaComponent(
                    setting.controlEl
                );

            textarea
                .setPlaceholder(
                    placeholder
                )
                .onChange(value => {
                    this.fields[key] =
                        value;
                });

            textarea.inputEl.style.width =
                "100%";

            textarea.inputEl.style.minHeight =
                height;

            textarea.inputEl.style.resize =
                "vertical";

            this.fields[key] = "";

            return textarea;
        }

        // --------------------------------------------------------
        // DROPDOWN
        // --------------------------------------------------------

        addDropdown(
            key,
            label,
            options,
            existingValue = ""
        ) {
            const setting =
                new Setting(
                    this.currentContainer
                ).setName(label);

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

            const initial =
                options.includes(
                    existingValue
                )
                    ? existingValue
                    : options[0];

            dropdown.setValue(initial);

            this.fields[key] =
                initial;

            dropdown.onChange(
                value => {
                    this.fields[key] =
                        value;
                }
            );

            return dropdown;
        }

        // --------------------------------------------------------
        // MULTI SELECT
        // --------------------------------------------------------

        addCheckboxGroup(
            key,
            label,
            options,
            initialState = {}
        ) {
            const wrapper =
                this.currentContainer.createDiv();

            wrapper.style.marginTop = "16px";
            wrapper.style.marginBottom = "16px";

            const title =
                wrapper.createEl("div", { text: label });

            title.style.fontWeight = "600";
            title.style.marginBottom = "8px";

            const group = wrapper.createDiv();
            this.fields[key] = {};
            this.fields[key].__otherText =
                clean(initialState.__otherText || "");

            for (const option of options) {
                const row = group.createDiv();

                row.style.display = "flex";
                row.style.alignItems = "center";
                row.style.gap = "8px";
                row.style.marginBottom = "6px";

                const checkbox = row.createEl("input");
                checkbox.type = "checkbox";
                checkbox.checked =
                    initialState[option] === true;

                const labelEl =
                    row.createEl("label", { text: option });

                labelEl.style.cursor = "pointer";

                let otherInput = null;

                if (option === "Other") {
                    otherInput = row.createEl("input");
                    otherInput.type = "text";
                    otherInput.placeholder = "Other...";
                    otherInput.value =
                        clean(initialState.__otherText || "");
                    otherInput.style.flex = "1";
                    otherInput.style.display =
                        checkbox.checked ? "block" : "none";

                    otherInput.oninput = () => {
                        this.fields[key].__otherText =
                            otherInput.value;
                    };
                }

                checkbox.onchange = () => {
                    this.fields[key][option] =
                        checkbox.checked;

                    if (otherInput) {
                        otherInput.style.display =
                            checkbox.checked ? "block" : "none";
                    }
                };

                labelEl.onclick = () => {
                    checkbox.checked =
                        !checkbox.checked;

                    this.fields[key][option] =
                        checkbox.checked;

                    if (otherInput) {
                        otherInput.style.display =
                            checkbox.checked ? "block" : "none";
                    }
                };

                this.fields[key][option] =
                    checkbox.checked;
            }

            return group;
        }

        // --------------------------------------------------------
        // SMART CHECKBOX GROUP
        // Custom options are rendered above the template defaults.
        // --------------------------------------------------------

        addSmartCheckboxGroup(
            key,
            label,
            defaultOptions,
            initialState = {},
            existingCustomOptions = []
        ) {
            const wrapper =
                this.currentContainer.createDiv();

            wrapper.style.marginTop = "16px";
            wrapper.style.marginBottom = "16px";

            const title =
                wrapper.createEl("div", { text: label });

            title.style.fontWeight = "600";
            title.style.marginBottom = "8px";

            const customSetting =
                new Setting(wrapper)
                    .setName("Custom options")
                    .setDesc(
                        "One option per line. Custom options appear above the default template options."
                    );

            const customInput =
                new TextAreaComponent(customSetting.controlEl);

            customInput.setPlaceholder(
                "Example:\nCatBoost\nElasticNet\nCustom GNN"
            );

            customInput.inputEl.style.width = "100%";
            customInput.inputEl.style.minHeight = "75px";
            customInput.inputEl.style.resize = "vertical";

            const initialCustom = [
                ...new Set(
                    existingCustomOptions
                        .map(x => clean(x))
                        .filter(Boolean)
                )
            ];

            customInput.setValue(
                initialCustom.join("\n")
            );

            const group = wrapper.createDiv();

            this.fields[key] = {};
            this.fields[key].__otherText =
                clean(initialState.__otherText || "");

            this.choiceOptions =
                this.choiceOptions || {};

            const render = () => {
                const customOptions = [
                    ...new Set(
                        customInput.getValue()
                            .split(/\r?\n/)
                            .map(x => clean(x))
                            .filter(Boolean)
                    )
                ];

                const mergedOptions = [
                    ...customOptions,
                    ...defaultOptions
                ].filter(
                    (option, index, array) =>
                        array.indexOf(option) === index
                );

                const oldState = this.fields[key] || {};

                const nextState = {
                    __otherText:
                        clean(
                            oldState.__otherText ||
                            initialState.__otherText ||
                            ""
                        )
                };

                for (const option of mergedOptions) {
                    nextState[option] =
                        oldState[option] !== undefined
                            ? oldState[option]
                            : initialState[option] === true;
                }

                this.fields[key] = nextState;
                this.choiceOptions[key] = mergedOptions;

                group.empty();

                for (const option of mergedOptions) {
                    const row = group.createDiv();

                    row.style.display = "flex";
                    row.style.alignItems = "center";
                    row.style.gap = "8px";
                    row.style.marginBottom = "6px";

                    const checkbox = row.createEl("input");
                    checkbox.type = "checkbox";
                    checkbox.checked =
                        this.fields[key][option] === true;

                    const labelEl =
                        row.createEl("label", { text: option });

                    labelEl.style.cursor = "pointer";

                    checkbox.onchange = () => {
                        this.fields[key][option] =
                            checkbox.checked;
                    };

                    labelEl.onclick = () => {
                        checkbox.checked =
                            !checkbox.checked;

                        this.fields[key][option] =
                            checkbox.checked;
                    };
                }
            };

            customInput.onChange(() => {
                render();
            });

            render();

            return group;
        }

        // --------------------------------------------------------
        // SINGLE CHOICE / RADIO
        // --------------------------------------------------------

        addRadioGroup(
            key,
            label,
            options,
            existingValue = ""
        ) {
            const wrapper =
                this.currentContainer
                    .createDiv();

            wrapper.style.marginTop =
                "16px";

            wrapper.style.marginBottom =
                "16px";

            const title =
                wrapper.createEl(
                    "div",
                    { text: label }
                );

            title.style.fontWeight =
                "600";

            title.style.marginBottom =
                "8px";

            const group =
                wrapper.createDiv();

            this.fields[key] =
                "Not specified";

            const radioName =
                `${key}-${Date.now()}`;

            for (const option of options) {
                const row =
                    group.createDiv();

                row.style.display =
                    "flex";

                row.style.alignItems =
                    "center";

                row.style.gap =
                    "8px";

                row.style.marginBottom =
                    "6px";

                const radio =
                    row.createEl("input");

                radio.type =
                    "radio";

                radio.name =
                    radioName;

                radio.value =
                    option;

                const labelEl =
                    row.createEl(
                        "label",
                        { text: option }
                    );

                labelEl.style.cursor =
                    "pointer";

                if (
                    existingValue === option
                ) {
                    radio.checked =
                        true;

                    this.fields[key] =
                        option;
                }

                radio.onchange =
                    () => {
                        if (radio.checked) {
                            this.fields[key] =
                                option;
                        }
                    };

                labelEl.onclick =
                    () => {
                        radio.checked =
                            true;

                        this.fields[key] =
                            option;
                    };
            }

            // If nothing exists, default
            // to Not specified.
            if (
                !options.includes(
                    existingValue
                )
            ) {
                this.fields[key] =
                    "Not specified";
            }
        }

        // --------------------------------------------------------
        // SECTION
        // --------------------------------------------------------

        addHeading(
            title,
            description = ""
        ) {
            const heading =
                this.currentContainer
                    .createEl(
                        "h3",
                        { text: title }
                    );

            heading.style.marginTop =
                "20px";

            if (description) {
                const desc =
                    this.currentContainer
                        .createEl(
                            "p",
                            { text: description }
                        );

                desc.style.color =
                    "var(--text-muted)";
            }
        }

        // --------------------------------------------------------
        // TAB
        // --------------------------------------------------------

        createTab(
            key,
            label
        ) {
            const button =
                this.tabBar.createEl(
                    "button",
                    { text: label }
                );

            button.style.marginRight =
                "4px";

            button.style.marginBottom =
                "4px";

            const content =
                this.contentEl.createDiv();

            content.style.display =
                "none";

            button.onclick = () => {
                this.showTab(key);
            };

            this.tabs[key] =
                button;

            this.tabContents[key] =
                content;

            return content;
        }

        showTab(key) {
            for (
                const tabKey of
                Object.keys(
                    this.tabContents
                )
            ) {
                this.tabContents[
                    tabKey
                ].style.display =
                    tabKey === key
                        ? "block"
                        : "none";

                this.tabs[
                    tabKey
                ].style.fontWeight =
                    tabKey === key
                        ? "bold"
                        : "normal";
            }

            this.currentContainer =
                this.tabContents[key];
        }

        // ========================================================
        // OPEN FORM
        // ========================================================

        onOpen() {
            const { contentEl } =
                this;

            contentEl.empty();

            contentEl.style.maxWidth =
                "1000px";

            contentEl.style.maxHeight =
                "85vh";

            contentEl.createEl(
                "h2",
                { text: TITLE }
            );

            const intro =
                contentEl.createEl(
                    "p",
                    {
                        text:
                            "Điền từ A → Z trong một form. " +
                            "Field rỗng được bỏ qua. " +
                            "Text answers tạo history; checkbox/radio giữ current state."
                    }
                );

            intro.style.color =
                "var(--text-muted)";

            // ----------------------------------------------------
            // TAB BAR
            // ----------------------------------------------------

            this.tabBar =
                contentEl.createDiv();

            this.tabBar.style.marginBottom =
                "10px";

            // ----------------------------------------------------
            // CREATE TABS
            // ----------------------------------------------------

            const tabs = {};

            tabs.idea =
                this.createTab(
                    "idea",
                    "1. Idea"
                );

            tabs.materials =
                this.createTab(
                    "materials",
                    "2. Materials"
                );

            tabs.research =
                this.createTab(
                    "research",
                    "3. Research"
                );

            tabs.target =
                this.createTab(
                    "target",
                    "4. Target"
                );

            tabs.dataset =
                this.createTab(
                    "dataset",
                    "5. Dataset"
                );

            tabs.features =
                this.createTab(
                    "features",
                    "6. Features"
                );

            tabs.ml =
                this.createTab(
                    "ml",
                    "7. ML"
                );

            tabs.validation =
                this.createTab(
                    "validation",
                    "8. Validation"
                );

            tabs.interpretation =
                this.createTab(
                    "interpretation",
                    "9. Interpretation"
                );

            tabs.discovery =
                this.createTab(
                    "discovery",
                    "10. Discovery"
                );

            tabs.architecture =
                this.createTab(
                    "architecture",
                    "11. Architecture"
                );

            tabs.mvp =
                this.createTab(
                    "mvp",
                    "12. MVP"
                );

            tabs.advanced =
                this.createTab(
                    "advanced",
                    "13. Advanced"
                );

            tabs.risks =
                this.createTab(
                    "risks",
                    "14. Risks"
                );

            tabs.deliverables =
                this.createTab(
                    "deliverables",
                    "15. Deliverables"
                );

            tabs.literature =
                this.createTab(
                    "literature",
                    "16–17. Literature"
                );

            tabs.decision =
                this.createTab(
                    "decision",
                    "18. Decision"
                );

            tabs.next =
                this.createTab(
                    "next",
                    "19. Next Action"
                );

            // ====================================================
            // 1. IDEA
            // ====================================================

            this.currentContainer =
                tabs.idea;

            this.addHeading(
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
                "whyIdea",
                "Why did I think of this?",
                "Tại sao bạn nghĩ tới project này?",
                "100px"
            );

            this.addTextArea(
                "initialIntuition",
                "Initial Intuition",
                "Trực giác ban đầu...",
                "100px"
            );

            // ====================================================
            // 2. MATERIALS
            // ====================================================

            this.currentContainer =
                tabs.materials;

            this.addHeading(
                "2. Materials Science Problem"
            );

            this.addTextArea(
                "materialSystem",
                "What material / material system?",
                "Ví dụ: HfO2, SiC, perovskites...",
                "90px"
            );

            this.addTextField(
                "propertyInterest",
                "What property am I interested in?",
                "Band gap / dielectric constant..."
            );

            this.addTextArea(
                "propertyMatter",
                "Why does this property matter?",
                "Ý nghĩa khoa học / ứng dụng...",
                "100px"
            );

            this.addTextArea(
                "realProblem",
                "What is the real materials-science problem?",
                "Vấn đề materials science thực sự...",
                "110px"
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
            // 3. RESEARCH
            // ====================================================

            this.currentContainer =
                tabs.research;

            this.addHeading(
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
                "130px"
            );

            this.addTextArea(
                "hypothesis",
                "Hypothesis",
                "I hypothesize that...",
                "110px"
            );

            this.addTextArea(
                "falsification",
                "What would prove the hypothesis wrong?",
                "Điều gì sẽ bác bỏ hypothesis?",
                "110px"
            );

            // ====================================================
            // 4. TARGET PROPERTY
            // ====================================================

            this.currentContainer =
                tabs.target;

            this.addHeading(
                "4. Target Property"
            );

            this.addTextField(
                "target",
                "Target",
                "Band gap..."
            );

            this.addTextField(
                "unit",
                "Unit",
                "eV..."
            );

            this.addRadioGroup(
                "taskType",
                "Regression or Classification?",
                [
                    "Not specified",
                    "Regression",
                    "Binary classification",
                    "Multi-class classification",
                    "Ranking",
                    "Generation / inverse design"
                ],
                readSingleChoice(
                    this.existingLines,
                    "4. Target Property",
                    "Regression or Classification?"
                )
            );

            this.addTextArea(
                "targetReason",
                "Why this target?",
                "Tại sao chọn property này?",
                "100px"
            );

            this.addRadioGroup(
                "expectedDifficulty",
                "Expected difficulty",
                [
                    "Not specified",
                    "Easy",
                    "Moderate",
                    "Difficult"
                ],
                readSingleChoice(
                    this.existingLines,
                    "4. Target Property",
                    "Expected difficulty"
                )
            );

            // ====================================================
            // 5. DATASET
            // ====================================================

            this.currentContainer =
                tabs.dataset;

            this.addHeading(
                "5. Dataset"
            );

            this.addCheckboxGroup(
                "dataSources",
                "Possible Data Sources",
                DATA_SOURCES,
                readCheckboxState(
                    this.existingLines,
                    "5. Dataset",
                    "Possible Data Sources",
                    DATA_SOURCES
                )
            );

            this.addTextArea(
                "datasetReference",
                "Dataset URL / Reference",
                "Mỗi URL / DOI một dòng...",
                "100px"
            );

            this.addTextField(
                "estimatedMaterials",
                "Estimated Number of Materials",
                "~10,000"
            );

            this.addRadioGroup(
                "dataNature",
                "Experimental or Computational?",
                [
                    "Not specified",
                    "Experimental",
                    "DFT",
                    "Molecular dynamics",
                    "Mixed"
                ],
                readSingleChoice(
                    this.existingLines,
                    "5. Dataset",
                    "Experimental or Computational?"
                )
            );

            this.addTextArea(
                "dataProblems",
                "Potential Data Problems",
                "Mỗi vấn đề một dòng...",
                "120px"
            );

            // ====================================================
            // 6. FEATURES
            // ====================================================

            this.currentContainer =
                tabs.features;

            this.addHeading(
                "6. Input Features / Descriptors"
            );

            this.addCheckboxGroup(
                "availableInformation",
                "What information do I have?",
                INPUT_INFORMATION,
                readCheckboxState(
                    this.existingLines,
                    "6. Input Features / Descriptors",
                    "What information do I have?",
                    INPUT_INFORMATION
                )
            );

            this.addTextArea(
                "featureIdeas",
                "Feature Ideas",
                "Mỗi feature một dòng...",
                "120px"
            );

            this.addTextArea(
                "libraries",
                "Possible Libraries",
                "pymatgen\nmatminer\nASE...",
                "100px"
            );

            this.addTextArea(
                "featureEngineering",
                "Feature Engineering Ideas",
                "Mỗi ý tưởng một dòng...",
                "120px"
            );

            // ====================================================
            // 7. ML
            // ====================================================

            this.currentContainer =
                tabs.ml;

            this.addHeading(
                "7. ML Approach"
            );

            this.addSmartCheckboxGroup(
                "baseline",
                "Baseline",
                BASELINE,
                readCheckboxState(
                    this.existingLines,
                    "7. ML Approach",
                    "Baseline",
                    BASELINE
                ),
                extractCustomOptions(
                    this.existingLines,
                    "7. ML Approach",
                    "Baseline",
                    BASELINE
                )
            );

            this.addSmartCheckboxGroup(
                "classicalML",
                "Classical ML",
                CLASSICAL_ML,
                readCheckboxState(
                    this.existingLines,
                    "7. ML Approach",
                    "Classical ML",
                    CLASSICAL_ML
                ),
                extractCustomOptions(
                    this.existingLines,
                    "7. ML Approach",
                    "Classical ML",
                    CLASSICAL_ML
                )
            );

            this.addSmartCheckboxGroup(
                "deepLearning",
                "Deep Learning",
                DEEP_LEARNING,
                readCheckboxState(
                    this.existingLines,
                    "7. ML Approach",
                    "Deep Learning",
                    DEEP_LEARNING
                ),
                extractCustomOptions(
                    this.existingLines,
                    "7. ML Approach",
                    "Deep Learning",
                    DEEP_LEARNING
                )
            );

            this.addTextArea(
                "modelReason",
                "Why this model?",
                "Tại sao chọn model?",
                "110px"
            );

            // ====================================================
            // 8. VALIDATION
            // ====================================================

            this.currentContainer =
                tabs.validation;

            this.addHeading(
                "8. Validation"
            );

            this.addTextArea(
                "splitStrategy",
                "Train / Validation / Test Strategy",
                "70/15/15, group split...",
                "110px"
            );

            this.addCheckboxGroup(
                "crossValidation",
                "Cross Validation",
                CV_OPTIONS,
                readCheckboxState(
                    this.existingLines,
                    "8. Validation",
                    "Cross Validation",
                    CV_OPTIONS
                )
            );

            this.addTextArea(
                "leakageRisks",
                "Important Leakage Risks",
                "Mỗi risk một dòng...",
                "110px"
            );

            this.addCheckboxGroup(
                "metrics",
                "Evaluation Metrics",
                [
                    "MAE",
                    "RMSE",
                    "R²",
                    "Accuracy",
                    "F1",
                    "ROC-AUC",
                    "Precision / Recall"
                ],
                readCheckboxState(
                    this.existingLines,
                    "8. Validation",
                    "Evaluation Metrics",
                    [
                        "MAE",
                        "RMSE",
                        "R²",
                        "Accuracy",
                        "F1",
                        "ROC-AUC",
                        "Precision / Recall"
                    ]
                )
            );

            this.addTextField(
                "successCriterion",
                "Success Criterion",
                "MAE < 0.3 eV..."
            );

            // ====================================================
            // 9. INTERPRETATION
            // ====================================================

            this.currentContainer =
                tabs.interpretation;

            this.addHeading(
                "9. Scientific Interpretation"
            );

            this.addTextArea(
                "scientificLearning",
                "What do I actually want to learn?",
                "Điều bạn thực sự muốn hiểu...",
                "120px"
            );

            this.addTextArea(
                "controllingFeatures",
                "Which features might control the property?",
                "Mỗi feature một dòng...",
                "120px"
            );

            this.addCheckboxGroup(
                "featureImportance",
                "Feature Importance",
                FEATURE_IMPORTANCE,
                readCheckboxState(
                    this.existingLines,
                    "9. Scientific Interpretation",
                    "Feature Importance",
                    FEATURE_IMPORTANCE
                )
            );

            this.addTextArea(
                "scientificHypothesis",
                "Scientific Hypothesis From the Model",
                "Model có thể cho thấy điều gì?",
                "120px"
            );

            this.addTextArea(
                "newInsight",
                "Could the model reveal something new?",
                "Insight mới...",
                "110px"
            );

            // ====================================================
            // 10. DISCOVERY
            // ====================================================

            this.currentContainer =
                tabs.discovery;

            this.addHeading(
                "10. Materials Discovery / Recommendation"
            );

            this.addRadioGroup(
                "canScreen",
                "Can the model be used to screen materials?",
                [
                    "Not specified",
                    "Yes",
                    "No",
                    "Maybe"
                ],
                readSingleChoice(
                    this.existingLines,
                    "10. Materials Discovery / Recommendation",
                    "Can the model be used to screen materials?"
                )
            );

            this.addTextArea(
                "candidates",
                "Candidate Materials",
                "Mỗi candidate một dòng...",
                "120px"
            );

            this.addTextArea(
                "screeningCriteria",
                "Screening Criteria",
                "Band gap: 1.5–2.5 eV\nFormation energy: < 0...",
                "140px"
            );

            this.addTextArea(
                "recommendation",
                "Final Recommendation",
                "Cách model sẽ rank/recommend...",
                "120px"
            );

            // ====================================================
            // 11. ARCHITECTURE
            // ====================================================

            this.currentContainer =
                tabs.architecture;

            this.addHeading(
                "11. Project Architecture"
            );

            this.addTextArea(
                "architecture",
                "Architecture / Pipeline",
                "Data Sources → Data Acquisition → Cleaning → Features → ML → Validation...",
                "180px"
            );

            // ====================================================
            // 12. MVP
            // ====================================================

            this.currentContainer =
                tabs.mvp;

            this.addHeading(
                "12. Minimum Viable Project"
            );

            this.addTextArea(
                "mvp",
                "What is the smallest version I can build?",
                "MVP tối thiểu...",
                "120px"
            );

            this.addTextArea(
                "mvpDataset",
                "Dataset",
                "Dataset tối thiểu...",
                "100px"
            );

            this.addTextArea(
                "mvpFeatures",
                "Features",
                "Features tối thiểu...",
                "100px"
            );

            this.addTextField(
                "mvpModel",
                "Model",
                "Random Forest..."
            );

            this.addTextArea(
                "mvpEvaluation",
                "Evaluation",
                "Validation + metrics...",
                "100px"
            );

            this.addTextArea(
                "mvpOutput",
                "Expected Output",
                "Output mong muốn...",
                "110px"
            );

            this.addRadioGroup(
                "estimatedTime",
                "Estimated Time",
                [
                    "Not specified",
                    "1–2 days",
                    "1 week",
                    "2 weeks",
                    "1 month",
                    "> 1 month"
                ],
                readSingleChoice(
                    this.existingLines,
                    "12. Minimum Viable Project",
                    "Estimated Time"
                )
            );

            // ====================================================
            // 13. ADVANCED
            // ====================================================

            this.currentContainer =
                tabs.advanced;

            this.addHeading(
                "13. Advanced Version"
            );

            this.addTextArea(
                "researchGrade",
                "What could make this project research-grade?",
                "Những yếu tố cần thêm...",
                "120px"
            );

            this.addCheckboxGroup(
                "improvements",
                "Possible Improvements",
                ADVANCED_IMPROVEMENTS,
                readCheckboxState(
                    this.existingLines,
                    "13. Advanced Version",
                    "Possible Improvements",
                    ADVANCED_IMPROVEMENTS
                )
            );

            this.addTextArea(
                "novelty",
                "Novelty",
                "Điểm mới so với existing work...",
                "120px"
            );

            // ====================================================
            // 14. RISKS
            // ====================================================

            this.currentContainer =
                tabs.risks;

            this.addHeading(
                "14. Risks"
            );

            this.addTextArea(
                "technicalRisks",
                "Technical Risks",
                "Mỗi risk một dòng...",
                "100px"
            );

            this.addTextArea(
                "scientificRisks",
                "Scientific Risks",
                "Mỗi risk một dòng...",
                "100px"
            );

            this.addTextArea(
                "dataRisks",
                "Data Risks",
                "Mỗi risk một dòng...",
                "100px"
            );

            this.addTextArea(
                "scopeCreep",
                "Scope Creep",
                "Những thứ làm project phình ra...",
                "100px"
            );

            this.addTextArea(
                "shouldNotBuild",
                "What should I NOT build?",
                "Những thứ nên loại khỏi scope...",
                "100px"
            );

            // ====================================================
            // 15. DELIVERABLES
            // ====================================================

            this.currentContainer =
                tabs.deliverables;

            this.addHeading(
                "15. Deliverables"
            );

            this.addCheckboxGroup(
                "codeDeliverables",
                "Code",
                CODE_DELIVERABLES,
                readCheckboxState(
                    this.existingLines,
                    "15. Deliverables",
                    "Code",
                    CODE_DELIVERABLES
                )
            );

            this.addCheckboxGroup(
                "researchDeliverables",
                "Research",
                RESEARCH_DELIVERABLES,
                readCheckboxState(
                    this.existingLines,
                    "15. Deliverables",
                    "Research",
                    RESEARCH_DELIVERABLES
                )
            );

            this.addCheckboxGroup(
                "productDeliverables",
                "Product",
                PRODUCT_DELIVERABLES,
                readCheckboxState(
                    this.existingLines,
                    "15. Deliverables",
                    "Product",
                    PRODUCT_DELIVERABLES
                )
            );

            this.addCheckboxGroup(
                "portfolioDeliverables",
                "Portfolio",
                PORTFOLIO_DELIVERABLES,
                readCheckboxState(
                    this.existingLines,
                    "15. Deliverables",
                    "Portfolio",
                    PORTFOLIO_DELIVERABLES
                )
            );

            // ====================================================
            // 16–17. LITERATURE + BRAIN DUMP
            // ====================================================

            this.currentContainer =
                tabs.literature;

            this.addHeading(
                "16. Literature"
            );

            this.addTextArea(
                "papers",
                "Related Papers",
                "Mỗi paper một dòng...",
                "120px"
            );

            this.addTextArea(
                "similarProjects",
                "Similar Projects",
                "GitHub / project / paper...",
                "120px"
            );

            this.addTextArea(
                "existingWork",
                "What have others already done?",
                "Tóm tắt existing work...",
                "130px"
            );

            this.addTextArea(
                "literatureImprovement",
                "What can I improve?",
                "Khoảng trống / improvement...",
                "130px"
            );

            this.addHeading(
                "17. Brain Dump"
            );

            this.addTextArea(
                "brainDump",
                "Brain Dump",
                "Không cần tổ chức. Viết mọi thứ...",
                "180px"
            );

            // ====================================================
            // 18. FINAL DECISION
            // ====================================================

            this.currentContainer =
                tabs.decision;

            this.addHeading(
                "18. Final Decision"
            );

            this.addRadioGroup(
                "worthBuilding",
                "Is this idea worth building?",
                [
                    "Not specified",
                    "Yes",
                    "Maybe",
                    "No"
                ],
                readSingleChoice(
                    this.existingLines,
                    "18. Final Decision",
                    "Is this idea worth building?"
                )
            );

            this.addTextField(
                "scientificValue",
                "Scientific Value /10",
                "0–10"
            );

            this.addTextField(
                "mlValue",
                "ML Value /10",
                "0–10"
            );

            this.addTextField(
                "materialsValue",
                "Materials Science Value /10",
                "0–10"
            );

            this.addTextField(
                "portfolioValue",
                "Portfolio Value /10",
                "0–10"
            );

            this.addTextField(
                "feasibility",
                "Feasibility /10",
                "0–10"
            );

            this.addTextField(
                "overallScore",
                "Overall Score /10",
                "0–10"
            );

            // ====================================================
            // 19. NEXT ACTION
            // ====================================================

            this.currentContainer =
                tabs.next;

            this.addHeading(
                "19. Next Action"
            );

            this.addTextArea(
                "nextAction",
                "What is the ONE thing I should do next?",
                "Một hành động cụ thể...",
                "110px"
            );

            this.addTextArea(
                "firstExperiment",
                "First Experiment",
                "Experiment đầu tiên...",
                "110px"
            );

            this.addTextField(
                "firstDataset",
                "First Dataset",
                "Materials Project..."
            );

            this.addTextField(
                "firstModel",
                "First Model",
                "Random Forest..."
            );

            this.addTextArea(
                "firstResult",
                "First Result I Want",
                "Kết quả đầu tiên muốn đạt...",
                "110px"
            );

            // ====================================================
            // DEFAULT TAB
            // ====================================================

            this.showTab("idea");

            // ====================================================
            // BUTTONS
            // ====================================================

            const buttonBar =
                contentEl.createDiv();

            buttonBar.style.display =
                "flex";

            buttonBar.style.justifyContent =
                "flex-end";

            buttonBar.style.gap =
                "8px";

            buttonBar.style.marginTop =
                "16px";

            buttonBar.style.paddingTop =
                "12px";

            buttonBar.style.borderTop =
                "1px solid var(--background-modifier-border)";

            const cancel =
                buttonBar.createEl(
                    "button",
                    { text: "Cancel" }
                );

            cancel.onclick = () => {
                this.submitted = false;
                this.close();
            };

            const apply =
                buttonBar.createEl(
                    "button",
                    {
                        text: "Apply Full Plan",
                        cls: "mod-cta"
                    }
                );

            apply.onclick = () => {
                this.submitted = true;

                this.result = {
                    ...this.fields,
                    __choiceOptions: this.choiceOptions
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
    // READ NOTE
    // ============================================================

    const existingContent =
        await app.vault.read(file);

    const existingLines =
        existingContent.split(/\r?\n/);

    // ============================================================
    // OPEN FORM
    // ============================================================

    const modal =
        new FullPlanModal(
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

    // Quick Brainstorm writes custom ML models as real markdown
    // checkboxes. Re-read those custom labels from the note when
    // applying Full Plan, then merge them with the options currently
    // present in the form. This guarantees Quick Brainstorm -> Full
    // Plan compatibility even when __choiceOptions is unavailable.
    function getMLChoiceOptions(key, defaults) {
        const childHeading =
            key === "baseline"
                ? "Baseline"
                : key === "classicalML"
                    ? "Classical ML"
                    : "Deep Learning";

        const fromNote = extractCustomOptions(
            existingLines,
            "7. ML Approach",
            childHeading,
            defaults
        );

        const fromForm =
            Array.isArray(data.__choiceOptions?.[key])
                ? data.__choiceOptions[key]
                : [];

        return [
            ...new Set([
                ...fromNote,
                ...fromForm,
                ...defaults
            ])
        ];
    }

    const RUN_TIMESTAMP =
        timestamp();

    let lines =
        existingLines;

    const data =
        modal.result;

    // ============================================================
    // 1. IDEA
    // ============================================================

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
        "Why did I think of this?",
        data.whyIdea
    );

    prependEntry(
        lines,
        "1. Idea",
        "Initial Intuition",
        data.initialIntuition
    );

    // ============================================================
    // 2. MATERIALS
    // ============================================================

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
        data.propertyInterest
    );

    prependEntry(
        lines,
        "2. Materials Science Problem",
        "Why does this property matter?",
        data.propertyMatter
    );

    prependEntry(
        lines,
        "2. Materials Science Problem",
        "What is the real materials-science problem?",
        data.realProblem
    );

    replaceCheckboxGroup(
        lines,
        "2. Materials Science Problem",
        "Who would care about this?",
        WHO_CARES,
        data.whoCares
    );

    // ============================================================
    // 3. RESEARCH
    // ============================================================

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

    prependEntry(
        lines,
        "3. Research Question",
        "What would prove the hypothesis wrong?",
        data.falsification
    );

    // ============================================================
    // 4. TARGET PROPERTY
    // ============================================================

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

    if (
        isSpecified(data.taskType)
    ) {
        replaceSingleChoice(
            lines,
            "4. Target Property",
            "Regression or Classification?",
            data.taskType
        );
    }

    prependEntry(
        lines,
        "4. Target Property",
        "Why this target?",
        data.targetReason
    );

    if (
        isSpecified(
            data.expectedDifficulty
        )
    ) {
        replaceSingleChoice(
            lines,
            "4. Target Property",
            "Expected difficulty",
            data.expectedDifficulty
        );
    }

    // ============================================================
    // 5. DATASET
    // ============================================================

    replaceCheckboxGroup(
        lines,
        "5. Dataset",
        "Possible Data Sources",
        DATA_SOURCES,
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

    if (
        isSpecified(data.dataNature)
    ) {
        replaceSingleChoice(
            lines,
            "5. Dataset",
            "Experimental or Computational?",
            data.dataNature
        );
    }

    prependEntry(
        lines,
        "5. Dataset",
        "Potential Data Problems",
        data.dataProblems
    );

    // ============================================================
    // 6. FEATURES
    // ============================================================

    replaceCheckboxGroup(
        lines,
        "6. Input Features / Descriptors",
        "What information do I have?",
        INPUT_INFORMATION,
        data.availableInformation
    );

    prependEntry(
        lines,
        "6. Input Features / Descriptors",
        "Feature Ideas",
        data.featureIdeas
    );

    prependEntry(
        lines,
        "6. Input Features / Descriptors",
        "Possible Libraries",
        data.libraries
    );

    prependEntry(
        lines,
        "6. Input Features / Descriptors",
        "Feature Engineering Ideas",
        data.featureEngineering
    );

    // ============================================================
    // 7. ML
    // ============================================================

    replaceCheckboxGroup(
        lines,
        "7. ML Approach",
        "Baseline",
        getMLChoiceOptions("baseline", BASELINE),
        data.baseline
    );

    replaceCheckboxGroup(
        lines,
        "7. ML Approach",
        "Classical ML",
        getMLChoiceOptions("classicalML", CLASSICAL_ML),
        data.classicalML
    );

    replaceCheckboxGroup(
        lines,
        "7. ML Approach",
        "Deep Learning",
        getMLChoiceOptions("deepLearning", DEEP_LEARNING),
        data.deepLearning
    );

    prependEntry(
        lines,
        "7. ML Approach",
        "Why this model?",
        data.modelReason
    );

    // ============================================================
    // 8. VALIDATION
    // ============================================================

    prependEntry(
        lines,
        "8. Validation",
        "Train / Validation / Test Strategy",
        data.splitStrategy
    );

    replaceCheckboxGroup(
        lines,
        "8. Validation",
        "Cross Validation",
        CV_OPTIONS,
        data.crossValidation
    );

    prependEntry(
        lines,
        "8. Validation",
        "Important Leakage Risks",
        data.leakageRisks
    );

    const METRICS = [
        "MAE",
        "RMSE",
        "R²",
        "Accuracy",
        "F1",
        "ROC-AUC",
        "Precision / Recall"
    ];

    replaceCheckboxGroup(
        lines,
        "8. Validation",
        "Evaluation Metrics",
        METRICS,
        data.metrics
    );

    prependEntry(
        lines,
        "8. Validation",
        "Success Criterion",
        data.successCriterion
    );

    // ============================================================
    // 9. SCIENTIFIC INTERPRETATION
    // ============================================================

    prependEntry(
        lines,
        "9. Scientific Interpretation",
        "What do I actually want to learn?",
        data.scientificLearning
    );

    prependEntry(
        lines,
        "9. Scientific Interpretation",
        "Which features might control the property?",
        data.controllingFeatures
    );

    replaceCheckboxGroup(
        lines,
        "9. Scientific Interpretation",
        "Feature Importance",
        FEATURE_IMPORTANCE,
        data.featureImportance
    );

    prependEntry(
        lines,
        "9. Scientific Interpretation",
        "Scientific Hypothesis From the Model",
        data.scientificHypothesis
    );

    prependEntry(
        lines,
        "9. Scientific Interpretation",
        "Could the model reveal something new?",
        data.newInsight
    );

    // ============================================================
    // 10. DISCOVERY
    // ============================================================

    if (
        isSpecified(data.canScreen)
    ) {
        replaceSingleChoice(
            lines,
            "10. Materials Discovery / Recommendation",
            "Can the model be used to screen materials?",
            data.canScreen
        );
    }

    prependEntry(
        lines,
        "10. Materials Discovery / Recommendation",
        "Candidate Materials",
        data.candidates
    );

    prependEntry(
        lines,
        "10. Materials Discovery / Recommendation",
        "Screening Criteria",
        data.screeningCriteria
    );

    prependEntry(
        lines,
        "10. Materials Discovery / Recommendation",
        "Final Recommendation",
        data.recommendation
    );

    // ============================================================
    // 11. ARCHITECTURE
    // ============================================================

    prependEntry(
        lines,
        "11. Project Architecture",
        "Architecture",
        data.architecture
    );

    // ============================================================
    // 12. MVP
    // ============================================================

    prependEntry(
        lines,
        "12. Minimum Viable Project",
        "What is the smallest version I can build?",
        data.mvp
    );

    prependEntry(
        lines,
        "12. Minimum Viable Project",
        "Dataset",
        data.mvpDataset
    );

    prependEntry(
        lines,
        "12. Minimum Viable Project",
        "Features",
        data.mvpFeatures
    );

    prependEntry(
        lines,
        "12. Minimum Viable Project",
        "Model",
        data.mvpModel
    );

    prependEntry(
        lines,
        "12. Minimum Viable Project",
        "Evaluation",
        data.mvpEvaluation
    );

    prependEntry(
        lines,
        "12. Minimum Viable Project",
        "Expected Output",
        data.mvpOutput
    );

    if (
        isSpecified(data.estimatedTime)
    ) {
        replaceSingleChoice(
            lines,
            "12. Minimum Viable Project",
            "Estimated Time",
            data.estimatedTime
        );
    }

    // ============================================================
    // 13. ADVANCED
    // ============================================================

    prependEntry(
        lines,
        "13. Advanced Version",
        "What could make this project research-grade?",
        data.researchGrade
    );

    replaceCheckboxGroup(
        lines,
        "13. Advanced Version",
        "Possible Improvements",
        ADVANCED_IMPROVEMENTS,
        data.improvements
    );

    prependEntry(
        lines,
        "13. Advanced Version",
        "Novelty",
        data.novelty
    );

    // ============================================================
    // 14. RISKS
    // ============================================================

    prependEntry(
        lines,
        "14. Risks",
        "Technical Risks",
        data.technicalRisks
    );

    prependEntry(
        lines,
        "14. Risks",
        "Scientific Risks",
        data.scientificRisks
    );

    prependEntry(
        lines,
        "14. Risks",
        "Data Risks",
        data.dataRisks
    );

    prependEntry(
        lines,
        "14. Risks",
        "Scope Creep",
        data.scopeCreep
    );

    prependEntry(
        lines,
        "14. Risks",
        "What should I NOT build?",
        data.shouldNotBuild
    );

    // ============================================================
    // 15. DELIVERABLES
    // ============================================================

    replaceCheckboxGroup(
        lines,
        "15. Deliverables",
        "Code",
        CODE_DELIVERABLES,
        data.codeDeliverables
    );

    replaceCheckboxGroup(
        lines,
        "15. Deliverables",
        "Research",
        RESEARCH_DELIVERABLES,
        data.researchDeliverables
    );

    replaceCheckboxGroup(
        lines,
        "15. Deliverables",
        "Product",
        PRODUCT_DELIVERABLES,
        data.productDeliverables
    );

    replaceCheckboxGroup(
        lines,
        "15. Deliverables",
        "Portfolio",
        PORTFOLIO_DELIVERABLES,
        data.portfolioDeliverables
    );

    // ============================================================
    // 16. LITERATURE
    // ============================================================

    prependEntry(
        lines,
        "16. Literature",
        "Related Papers",
        data.papers
    );

    prependEntry(
        lines,
        "16. Literature",
        "Similar Projects",
        data.similarProjects
    );

    prependEntry(
        lines,
        "16. Literature",
        "What have others already done?",
        data.existingWork
    );

    prependEntry(
        lines,
        "16. Literature",
        "What can I improve?",
        data.literatureImprovement
    );

    // ============================================================
    // 17. BRAIN DUMP
    // ============================================================

    prependToParent(
        lines,
        "17. Brain Dump",
        data.brainDump
    );

    // ============================================================
    // 18. FINAL DECISION
    // ============================================================

    if (
        isSpecified(data.worthBuilding)
    ) {
        replaceSingleChoice(
            lines,
            "18. Final Decision",
            "Is this idea worth building?",
            data.worthBuilding
        );
    }

    prependEntry(
        lines,
        "18. Final Decision",
        "Scientific Value",
        data.scientificValue
    );

    prependEntry(
        lines,
        "18. Final Decision",
        "ML Value",
        data.mlValue
    );

    prependEntry(
        lines,
        "18. Final Decision",
        "Materials Science Value",
        data.materialsValue
    );

    prependEntry(
        lines,
        "18. Final Decision",
        "Portfolio Value",
        data.portfolioValue
    );

    prependEntry(
        lines,
        "18. Final Decision",
        "Feasibility",
        data.feasibility
    );

    prependEntry(
        lines,
        "18. Final Decision",
        "Overall Score",
        data.overallScore
    );

    // ============================================================
    // 19. NEXT ACTION
    // ============================================================

    prependEntry(
        lines,
        "19. Next Action",
        "What is the ONE thing I should do next?",
        data.nextAction
    );

    prependEntry(
        lines,
        "19. Next Action",
        "First Experiment",
        data.firstExperiment
    );

    prependEntry(
        lines,
        "19. Next Action",
        "First Dataset",
        data.firstDataset
    );

    prependEntry(
        lines,
        "19. Next Action",
        "First Model",
        data.firstModel
    );

    prependEntry(
        lines,
        "19. Next Action",
        "First Result I Want",
        data.firstResult
    );

    // ============================================================
    // SAVE
    // ============================================================

    await app.vault.modify(
        file,
        lines.join("\n")
    );

    new Notice(
        `Full Research Plan saved — ${RUN_TIMESTAMP}`
    );
};