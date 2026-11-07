// docsify サイト内の Markdown リンク・画像の参照先が存在するかを検証する（依存パッケージなし）
//
// - `/foo/`   → site/foo/README.md
// - `/foo/bar` → site/foo/bar.md
// - 相対パス（`../_media/x.png` など）は Markdown ファイルの場所から解決
// - 外部リンク（http/https/mailto）とアンカーのみのリンクは対象外
//
// usage: node scripts/check-links.mjs [siteDir]
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const here = path.dirname(fileURLToPath(import.meta.url));
const siteDir = path.resolve(process.argv[2] ?? path.join(here, "..", "site"));

function walk(dir) {
    return fs.readdirSync(dir, { withFileTypes: true }).flatMap((e) => {
        const p = path.join(dir, e.name);
        return e.isDirectory() ? walk(p) : [p];
    });
}

/** docsify のルート（`/guide/` や `/guide/features`）を実ファイルに変換 */
function resolveRoute(route) {
    const clean = route.replace(/^\//, "");
    if (clean === "" || clean.endsWith("/")) return path.join(siteDir, clean, "README.md");
    if (path.extname(clean)) return path.join(siteDir, clean);
    return path.join(siteDir, `${clean}.md`);
}

function resolveTarget(fromFile, target) {
    if (target.startsWith("/")) return resolveRoute(target);
    const abs = path.resolve(path.dirname(fromFile), target);
    if (target.endsWith("/")) return path.join(abs, "README.md");
    return path.extname(abs) ? abs : `${abs}.md`;
}

// [text](target "title") / ![alt](target ':size=..') と <img src="..."> / <a href="...">
const LINK_RE = /!?\[[^\]]*\]\(\s*<?([^)\s>]+)>?(?:\s+["'][^)]*["'])?\s*\)/g;
const HTML_RE = /<(?:img|a)\b[^>]*?\s(?:src|href)=["']([^"']+)["']/g;

const files = walk(siteDir).filter((f) => f.endsWith(".md"));
const broken = [];
let checked = 0;

for (const file of files) {
    // コードブロック内は検査しない
    const text = fs.readFileSync(file, "utf8").replace(/```[\s\S]*?```/g, "");
    for (const re of [LINK_RE, HTML_RE]) {
        for (const m of text.matchAll(re)) {
            const raw = m[1];
            if (/^(https?:|mailto:|#|\/\/)/.test(raw)) continue;
            const target = decodeURI(raw.split("#")[0].split("?")[0]);
            if (!target) continue;
            checked++;
            const resolved = resolveTarget(file, target);
            if (!fs.existsSync(resolved)) {
                broken.push(`${path.relative(siteDir, file)}: ${raw} -> ${path.relative(siteDir, resolved)}`);
            }
        }
    }
}

if (broken.length) {
    console.error(`✖ ${broken.length} broken link(s):`);
    for (const b of broken) console.error(`  ${b}`);
    process.exit(1);
}
console.log(`✓ ${checked} internal links in ${files.length} files are valid.`);
