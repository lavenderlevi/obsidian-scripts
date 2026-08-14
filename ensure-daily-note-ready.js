module.exports = async (params) => {
    const { app, obsidian } = params;

    const TIMEOUT = 30000;
    const POLL_INTERVAL = 250;

    function getTodayPath() {
        const now = new Date();

        const year = now.getFullYear();
        const month = String(now.getMonth() + 1).padStart(2, "0");
        const day = String(now.getDate()).padStart(2, "0");

        return `Daily/${year}/${month}/${year}-${month}-${day}.md`;
    }

    function templateIsReady(content) {
        const requiredHeadings = [
            "### 1. Must do",
            "### 2. Should do",
            "### 3. Optional"
        ];

        return requiredHeadings.every(
            heading => content.includes(heading)
        );
    }

    const todayPath = getTodayPath();
    const startTime = Date.now();

    while (Date.now() - startTime < TIMEOUT) {

        const file =
            app.vault.getAbstractFileByPath(todayPath);

        if (file) {

            const activeFile =
                app.workspace.getActiveFile();

            if (
                activeFile &&
                activeFile.path === todayPath
            ) {

                const content =
                    await app.vault.read(file);

                if (templateIsReady(content)) {
                    return;
                }
            }
        }

        await new Promise(resolve =>
            setTimeout(resolve, POLL_INTERVAL)
        );
    }

    new obsidian.Notice(
        `Daily Note chưa sẵn sàng sau 30 giây: ${todayPath}`,
        5000
    );

    throw new Error(
        `Timeout waiting for Daily Note template: ${todayPath}`
    );
};