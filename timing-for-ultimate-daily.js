const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

const now = new Date();

const year = String(now.getFullYear());
const month = String(now.getMonth() + 1).padStart(2, "0");
const day = String(now.getDate()).padStart(2, "0");

const date = `${year}-${month}-${day}`;
const path = `Daily/${year}/${month}/${day}/${date}.md`;

const timeout = 30_000;
const interval = 250;
const startTime = Date.now();

console.log(`Waiting for Today Note: ${path}`);

while (true) {
    const file = app.vault.getAbstractFileByPath(path);

    if (file) {
        console.log(`Today Note found: ${path}`);
        return;
    }

    if (Date.now() - startTime >= timeout) {
        new Notice(
            `Timeout: Today Note was not created within 30 seconds.`
        );

        throw new Error(`Today Note not found: ${path}`);
    }

    await sleep(interval);
}