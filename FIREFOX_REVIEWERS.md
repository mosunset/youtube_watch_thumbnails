# Firefox

> **Note for Reviewers**: The developer is a native Japanese speaker and does not speak English (not even basic conversational level).

All code is submitted to [Github](https://github.com/mosunset/youtube_watch_thumbnails).

## Build Environment Requirements

### Operating System

- Windows 10/11
- macOS 10.15 or later
- Linux (Ubuntu 20.04 or later, or other major distributions)

### Required Software and Versions

1. **Node.js**
   - Version: 18.0.0 or higher (20.x.x recommended)
   - Download: <https://nodejs.org/>

2. **pnpm** (Package Manager)
   - Version: 8.0.0 or higher
   - Installation: `npm install -g pnpm`
   - Or use corepack: `corepack enable && corepack prepare pnpm@latest --activate`

3. **TypeScript**
   - Version: 5.9.2 or higher
   - Installed automatically via dependencies

### Build Tools

All build tools used are open-source and can be run locally:

- **WXT** (v0.20.6) - Extension framework
- **Vite** (built into WXT) - Build tool
- **TypeScript** (v5.9.2) - Type checking and compilation
- **Tailwind CSS** (v4.1.16) - CSS framework

## Build Instructions

### Step 1: Clone the Repository

```bash
git clone https://github.com/mosunset/youtube_watch_thumbnails.git
cd youtube_watch_thumbnails
```

### Step 2: Install Dependencies

```bash
pnpm install
```

This will automatically run the `postinstall` script which executes `wxt prepare`.

**Important**: The `pnpm-lock.yaml` file is included in the repository to ensure reviewers use the exact same dependency versions.

### Step 3: Build the Extension

To build for Firefox:

```bash
pnpm run buildf
```

The build output will be generated in `.output/firefox-mv2/` directory.

### Step 4: Verify Build Output

After the build completes, verify the following files exist:

- `.output/firefox-mv2/manifest.json`
- `.output/firefox-mv2/background.js`
- `.output/firefox-mv2/content-scripts/content.js`
- `.output/firefox-mv2/popup.html`
- `.output/firefox-mv2/icon/` directory with icon files

## Build Scripts

All build commands are defined in `package.json`:

- `pnpm install` - Install dependencies and run `postinstall` script
- `pnpm run buildf` - Build for Firefox (generates `.output/firefox-mv2/`)
- `pnpm run zipf` - Create ZIP file for distribution (generates `.output/firefox-mv2.zip`)
- `pnpm run compile` - TypeScript type checking only (does not build)

## Technology Stack

- **Framework**: WXT (v0.20.6) - Open source
- **UI Library**: React (v19.1.1)
- **Language**: TypeScript (v5.9.2)
- **Styling**: Tailwind CSS (v4.1.16)
- **Build Tool**: Vite (built into WXT) - Open source

## Important Notes

1. **Lock File**: The `pnpm-lock.yaml` file must be used to ensure exact dependency versions. Without it, different versions may produce different build output.

2. **Build Output**: The build artifacts are generated in the `.output/firefox-mv2/` directory. This directory is excluded from Git via `.gitignore`.

3. **No Code Obfuscation**: This extension does not use code obfuscation. All code is minified only for file size reduction, maintaining code readability and meaning.

4. **Build Time**: The build process typically takes 1-2 minutes.
