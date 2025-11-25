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
                label: 'Guides',
                autogenerate: { directory: 'guides' },
            },
            {
                label: 'Resources',
                autogenerate: { directory: 'resources' },
                // items: [
                // 	{ label: 'FAQ', slug: 'faq' },
                // 	{ label: 'Privacy Policy', slug: 'privacy' },
                // 	{ label: 'Changelog', slug: 'changelog' },
                // ],
            }, {
                label: 'Other',
                autogenerate: { directory: 'other' },
            }
        ],
        components: {
            Footer: './src/components/overrides/Footer.astro',
        },
    }), sitemap()],
});
