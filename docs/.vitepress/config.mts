import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: 'YouTube Watch Thumbnails',
  description: 'Documentation for YouTube Watch Thumbnails browser extension',
  base: '/youtube_watch_thumbnails/',
  head: [
    // ファビコン（PNG）の例
    [
      'link',
      {
        rel: 'icon',
        type: 'image/x-icon',
        // base からの絶対パスになる
        href: '/youtube_watch_thumbnails/favicon.ico',
      },
    ],
  ],

  locales: {
    root: {
      label: 'English',
      lang: 'en',
      themeConfig: {
        nav: [
          { text: 'Home', link: '/' },
          { text: 'Install', link: '/guide/install' },
          { text: 'Usage', link: '/guide/' },
          { text: 'FAQ', link: '/faq' },
          { text: 'Privacy', link: '/privacy' },
          { text: 'Changelog', link: '/changelog' },
        ],
        sidebar: {
          '/guide/': [
            {
              text: 'Guide',
              items: [
                { text: 'Installation', link: '/guide/install' },
                { text: 'Usage', link: '/guide/' },
                { text: 'Troubleshooting', link: '/guide/troubleshooting' },
                { text: 'Firefox Reviewers', link: '/guide/FIREFOX_REVIEWERS.md' }
              ]
            }
          ]
        },
        socialLinks: [
          { icon: 'github', link: 'https://github.com/mosunset/youtube_watch_thumbnails' }
        ],
        footer: {
          // message: 'MIT License',
          copyright: 'Copyright © 2024 mosunset'
        }
      }
    },
    ja: {
      label: '日本語',
      lang: 'ja',
      link: '/ja/',
      themeConfig: {
        nav: [
          { text: 'ホーム', link: '/ja/' },
          { text: 'インストール', link: '/ja/guide/install' },
          { text: '使い方', link: '/ja/guide/' },
          { text: 'FAQ', link: '/ja/faq' },
          { text: 'プライバシー', link: '/ja/privacy' },
          { text: '更新履歴', link: '/ja/changelog' },
        ],
        sidebar: {
          '/ja/guide/': [
            {
              text: 'ガイド',
              items: [
                { text: 'インストール', link: '/ja/guide/install' },
                { text: '使い方', link: '/ja/guide/' },
                { text: 'トラブルシューティング', link: '/ja/guide/troubleshooting' },
              ]
            }
          ]
        },
        socialLinks: [
          { icon: 'github', link: 'https://github.com/mosunset/youtube_watch_thumbnails' }
        ],
        footer: {
          // message: 'MIT License',
          copyright: 'Copyright © 2024 mosunset'
        }
      }
    }
  },

  themeConfig: {
    logo: '/favicon.ico'
  }
})
