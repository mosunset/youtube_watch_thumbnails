#!/usr/bin/env node
/**
 * リリースを始めるコマンド
 *
 *   pnpm release 4.1.0            # チェック → バージョン更新 → コミット・タグ → 確認して push
 *   pnpm release 4.1.0 --dry-run  # チェックと書き換え内容の表示だけ（何も変更しない）
 *   pnpm release 4.1.0 --yes      # push 前の確認を省略
 *
 * タグ（v4.1.0）が push されると .github/workflows/release.yml が
 * テスト → zip 作成 → GitHub Release → ストア提出 を行う。
 */
import { execSync } from "node:child_process";
import { readFileSync, writeFileSync } from "node:fs";
import { createInterface } from "node:readline/promises";

const EXTENSION_PACKAGE = "apps/extension/package.json";
const CHANGELOGS = [
    { file: "apps/docs/site/resources/changelog.md", heading: /^## Unreleased[^\n]*$/m },
    { file: "apps/docs/site/ja/resources/changelog.md", heading: /^## 未リリース[^\n]*$/m },
];

const args = process.argv.slice(2);
const version = args.find((a) => !a.startsWith("--"));
const dryRun = args.includes("--dry-run");
const yes = args.includes("--yes");

function fail(message) {
    console.error(`\n✖ ${message}`);
    process.exit(1);
}

function sh(command, { quiet = false } = {}) {
    if (!quiet) console.log(`$ ${command}`);
    return execSync(command, { encoding: "utf8", stdio: quiet ? "pipe" : "inherit" })?.trim();
}

function step(title) {
    console.log(`\n▶ ${title}`);
}

function compareVersions(a, b) {
    const pa = a.split(".").map(Number);
    const pb = b.split(".").map(Number);
    for (let i = 0; i < 3; i++) if (pa[i] !== pb[i]) return pa[i] - pb[i];
    return 0;
}

// --- 引数 ---------------------------------------------------------------
if (!version || !/^\d+\.\d+\.\d+$/.test(version)) {
    fail("バージョンを x.y.z 形式で指定してください。例: pnpm release 4.1.0");
}
const pkg = JSON.parse(readFileSync(EXTENSION_PACKAGE, "utf8"));
if (compareVersions(version, pkg.version) <= 0) {
    fail(`${version} は現在のバージョン ${pkg.version} より大きくしてください。`);
}
const tag = `v${version}`;

// --- Git の状態 ------------------------------------------------------------
step("Git の状態を確認");
const branch = sh("git branch --show-current", { quiet: true });
if (branch !== "main") fail(`main ブランチで実行してください（現在: ${branch}）。`);
if (sh("git status --porcelain", { quiet: true })) fail("コミットしていない変更があります。");
sh("git fetch origin main --tags", { quiet: true });
if (sh("git rev-parse HEAD", { quiet: true }) !== sh("git rev-parse origin/main", { quiet: true })) {
    fail("origin/main と一致していません。git pull / git push で揃えてください。");
}
if (sh(`git tag --list ${tag}`, { quiet: true })) fail(`タグ ${tag} は既にあります。`);
console.log(`main = origin/main、タグ ${tag} は未使用`);

// --- テスト ---------------------------------------------------------------
step("lint・型チェック・ユニットテスト・E2E テスト");
sh("pnpm lint");
sh("pnpm --filter extension compile");
sh("pnpm test");
sh("pnpm test:e2e");

// --- 書き換え ---------------------------------------------------------------
step(`バージョンを ${pkg.version} → ${version} に更新`);
const today = new Date().toISOString().slice(0, 10);
const edits = [];

pkg.version = version;
edits.push({ file: EXTENSION_PACKAGE, content: `${JSON.stringify(pkg, null, 2)}\n` });

for (const { file, heading } of CHANGELOGS) {
    const text = readFileSync(file, "utf8");
    if (!heading.test(text)) {
        console.warn(`⚠ ${file} に未リリースの見出しがありません（変更履歴は更新しません）`);
        continue;
    }
    edits.push({ file, content: text.replace(heading, `## ${tag} (${today})`) });
    console.log(`${file}: 未リリースの見出し → ## ${tag} (${today})`);
}

if (dryRun) {
    console.log("\n--dry-run のため、ここで終了します（ファイルは変更していません）。");
    process.exit(0);
}

for (const { file, content } of edits) writeFileSync(file, content);

// --- コミット・タグ・push --------------------------------------------------
step("コミットとタグを作成");
sh(`git add ${edits.map((e) => e.file).join(" ")}`);
sh(`git commit -m "release: ${tag}"`);
sh(`git tag -a ${tag} -m "${tag}"`);

if (!yes) {
    const rl = createInterface({ input: process.stdin, output: process.stdout });
    const answer = await rl.question(
        `\n${tag} を push します。GitHub Release の作成とストアへの提出が始まります。続けますか？ [y/N] `,
    );
    rl.close();
    if (answer.trim().toLowerCase() !== "y") {
        console.log(
            `\npush しませんでした。取り消すには:\n  git tag -d ${tag} && git reset --hard HEAD~1\n` +
                `あとで公開するには:\n  git push origin main ${tag}`,
        );
        process.exit(0);
    }
}

step("push");
sh(`git push origin main ${tag}`);

const repo = sh("gh repo view --json nameWithOwner -q .nameWithOwner 2>&1 || echo", { quiet: true });
console.log(
    `\n✔ ${tag} を push しました。進み具合は GitHub Actions の「Release」で確認できます。` +
        (repo && !repo.includes(" ") ? `\n  https://github.com/${repo}/actions/workflows/release.yml` : ""),
);
