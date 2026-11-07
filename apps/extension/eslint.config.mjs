// @ts-check
import js from "@eslint/js";
import { defineConfig, globalIgnores } from "eslint/config";
import reactHooks from "eslint-plugin-react-hooks";
import globals from "globals";
import tseslint from "typescript-eslint";
// WXT が `wxt prepare` で生成する自動インポート（browser, defineBackground など）のグローバル定義
import autoImports from "./.wxt/eslint-auto-imports.mjs";

export default defineConfig([
    globalIgnores([".output/**", ".wxt/**", "node_modules/**"]),
    {
        files: ["**/*.{ts,tsx,js,mjs}"],
        extends: [js.configs.recommended, tseslint.configs.recommended, autoImports],
        languageOptions: {
            globals: { ...globals.browser, ...globals.webextensions },
        },
        rules: {
            "@typescript-eslint/no-unused-vars": [
                "warn",
                { argsIgnorePattern: "^_", varsIgnorePattern: "^_", caughtErrorsIgnorePattern: "^_" },
            ],
        },
    },
    {
        files: ["**/*.tsx"],
        extends: [reactHooks.configs.flat["recommended-latest"]],
    },
]);
