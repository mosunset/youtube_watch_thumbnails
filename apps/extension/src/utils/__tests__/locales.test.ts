import { readdirSync, readFileSync } from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";

const LOCALES_DIR = path.resolve(import.meta.dirname, "../../locales");
const BASE = "en";

/** locales/*.yml は「key: value」だけの平らな形式 */
function readMessages(locale: string): Record<string, string> {
    const text = readFileSync(path.join(LOCALES_DIR, `${locale}.yml`), "utf8");
    const entries = text
        .split(/\r?\n/)
        .filter((line) => line.trim() && !line.trimStart().startsWith("#"))
        .map((line) => {
            const index = line.indexOf(":");
            return [line.slice(0, index).trim(), line.slice(index + 1).trim()] as const;
        });
    return Object.fromEntries(entries);
}

const locales = readdirSync(LOCALES_DIR)
    .filter((file) => file.endsWith(".yml"))
    .map((file) => file.replace(/\.yml$/, ""));

describe("翻訳ファイル", () => {
    const base = readMessages(BASE);

    it.each(locales.filter((l) => l !== BASE))("%s に英語と同じキーがすべてある", (locale) => {
        const messages = readMessages(locale);
        expect(Object.keys(messages).sort()).toEqual(Object.keys(base).sort());
        for (const [key, value] of Object.entries(messages)) {
            expect(value, `${locale}.${key} が空`).not.toBe("");
        }
    });

    // Chrome Web Store は manifest の name / description（__MSG_extName__ など）を全言語で要求する
    it.each(locales)("%s の拡張機能名と説明がストアの制限内", (locale) => {
        const messages = readMessages(locale);
        expect(messages.extName, `${locale}.extName が無い`).toBeTruthy();
        expect([...(messages.extName ?? "")].length).toBeLessThanOrEqual(75);
        expect(messages.extDescription, `${locale}.extDescription が無い`).toBeTruthy();
        expect([...(messages.extDescription ?? "")].length).toBeLessThanOrEqual(132);
    });
});
