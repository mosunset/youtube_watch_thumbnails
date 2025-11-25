// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

// https://astro.build/config
export default defineConfig({
	site: 'https://mosunset.github.io/youtube_watch_thumbnails',
	integrations: [
		starlight({
			logo: {
				src: '/src/assets/icon.png',
				alt: 'YouTube Watch Thumbnails',
				replacesTitle: false,
			},
			title: 'YouTube Watch Thumbnails',
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
					items: [
						{ label: 'FAQ', slug: 'faq' },
						{ label: 'Privacy Policy', slug: 'privacy' },
						{ label: 'Changelog', slug: 'changelog' },
					],
				},
			],
		}),
	],
});
