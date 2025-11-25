// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import starlightLinksValidator from 'starlight-links-validator'
import starlightImageZoom from 'starlight-image-zoom'
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
    site: 'https://mosunset.github.io',
    base: '/youtube_watch_thumbnails',
    integrations: [starlight({
        plugins: [starlightLinksValidator(), starlightImageZoom()],
        favicon: '/favicon.ico',
        logo: {
            src: '/src/assets/icon.png',
            alt: 'YouTube Watch Thumbnails',
            replacesTitle: false,
        },
        title: 'YouTube Watch Thumbnails',
        editLink: {
            baseUrl: 'https://github.com/mosunset/youtube_watch_thumbnails/blob/main/apps/docs/',
        },
        defaultLocale: 'root',
        locales: {
            root: {
                label: 'English',
                lang: 'en',
            },
            ja: {
                label: '日本語',
                lang: 'ja',
            },
        },
        social: [
            {
                label: 'GitHub',
                icon: 'github',
                href: 'https://github.com/mosunset/youtube_watch_thumbnails',
            },
        ],
        sidebar: [
            {
                label: 'Getting Started',
                translations: { ja: 'はじめる' },
                autogenerate: { directory: 'getting-started' },
            },
            {
                label: 'User Guide',
                translations: { ja: 'ユーザーガイド' },
                autogenerate: { directory: 'guide' },
            },
            {
                label: 'Settings',
                translations: { ja: '設定' },
                autogenerate: { directory: 'settings' },
            },
            {
                label: 'Troubleshooting',
                translations: { ja: 'トラブルシューティング' },
                autogenerate: { directory: 'troubleshooting' },
            },
            {
                label: 'Internals',
                translations: { ja: '内部仕様' },
                autogenerate: { directory: 'internals' },
            },
            {
                label: 'Project Docs',
                translations: { ja: 'プロジェクト情報' },
                autogenerate: { directory: 'resources' },
            },
            {
                label: 'For Reviewers',
                translations: { ja: 'レビュアー向け' },
                autogenerate: { directory: 'for-reviewers' },
            },
        ],
        components: {
            Footer: './src/components/overrides/Footer.astro',
            Header: './src/components/overrides/Header.astro',
            MobileMenuFooter: './src/components/overrides/MobileMenuFooter.astro',
        },
    }), sitemap()],
});
