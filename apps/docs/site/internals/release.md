# Releasing

Once manual testing is done, a release is **one command**:

```bash
pnpm release 4.1.0
```

## What happens

```text
Local: pnpm release 4.1.0
  1. Checks   on main, no uncommitted changes, matches origin/main, tag not used yet
  2. Tests    lint / type check / unit tests / E2E tests
  3. Updates  version in apps/extension/package.json
              changelog (en / ja): "Unreleased / 未リリース" → "v4.1.0 (date)"
  4. Records  commit "release: v4.1.0" and tag v4.1.0
  5. Asks     "push? [y/N]" → y pushes main and the tag
                │
                ▼
GitHub Actions (.github/workflows/release.yml)
  6. Checks the tag matches the version
  7. Runs the tests again (lint / type check / unit tests / E2E)
  8. Builds the Chrome / Firefox / sources zips
  9. Creates the GitHub Release (notes = that version's changelog section)
 10. Submits to the Chrome Web Store, Firefox Add-ons, Edge Add-ons and Opera add-ons (goes into review; one failing does not stop the others)
```

Users get the update once the store review passes. Check review status in each store's dashboard.

## Usage

```bash
# Start from an up-to-date main
git switch main
git pull

# Only show what would happen (no files changed)
pnpm release 4.1.0 --dry-run

# For real
pnpm release 4.1.0
```

- `--yes` skips the confirmation before pushing.
- If you answer `n` at the confirmation, the script prints the commands to undo the commit and tag.
- The version must be a higher `x.y.z`. Bump the major for big changes in permissions or behaviour, the minor for new features, the patch for fixes only.

## One-time setup

Add the store credentials under GitHub **Settings → Secrets and variables → Actions**.
**Stores without credentials are skipped** (the GitHub Release is still created). In that case, upload the zips from the Release by hand in each store's dashboard.

### Chrome Web Store

This uses Chrome Web Store API v2 (service account). v1 (refresh token) stopped working on October 15, 2026.

1. Run the following locally, choose the Chrome Web Store, and pick API version **v2**

   ```bash
   pnpm --filter extension exec wxt submit init
   ```

   It walks you through creating a service account in Google Cloud and adding it to the Chrome Web Store developer dashboard.
2. The values are written to `apps/extension/.env.submit` (not tracked by Git)
3. Add these three secrets

   | Secret | Value |
   | :--- | :--- |
   | `CHROME_PUBLISHER_ID` | Publisher ID |
   | `CHROME_SERVICE_ACCOUNT_CLIENT_EMAIL` | Service account email |
   | `CHROME_SERVICE_ACCOUNT_PRIVATE_KEY` | Service account private key. Paste the JSON `private_key` value as-is, without the surrounding `"` (a single line with `\n` is fine) |

The extension ID (`aobeafpjgdgakpagffmlkfeognaiigci`) is public, so it is written in the workflow.

### Firefox Add-ons

1. Sign in to the [Firefox Add-on Developer Hub](https://addons.mozilla.org/developers/) and create an API key under **Tools → Manage API Keys**
2. Add these two secrets

   | Secret | Value |
   | :--- | :--- |
   | `FIREFOX_JWT_ISSUER` | JWT issuer |
   | `FIREFOX_JWT_SECRET` | JWT secret |

The source code zip (`*-sources.zip`) is submitted too.

### Edge Add-ons

The Chrome zip is submitted as-is. **Create the listing by hand in Partner Center the first time** (the API can only update an existing extension).

1. Open the extension on the [Partner Center Edge extensions page](https://partner.microsoft.com/dashboard/microsoftedge/overview) and note the **Product ID** under its name
2. In the left menu, open **Publish API**, click **Create API credentials**, and note the **Client ID** and **API key** (the API key is shown only once and expires; create a new one when it does)
3. Add these three secrets

   | Secret | Value |
   | :--- | :--- |
   | `EDGE_PRODUCT_ID` | Product ID |
   | `EDGE_CLIENT_ID` | Client ID |
   | `EDGE_API_KEY` | API key |

### Opera add-ons

The Chrome zip is submitted as-is. **Create the listing by hand on the Opera developer site the first time.**

> [!WARNING]
> Opera has no official API key; it authenticates with **your logged-in browser cookie (`sessionid`)**. The cookie expires, so if a submission fails, copy a fresh value and update the secret.

1. Sign in to the [Opera developer site](https://addons.opera.com/developer/) and open the extension. The number in `https://addons.opera.com/developer/package/<number>` is the **Package ID**
2. On that page open the developer tools (F12) → **Application** (**Storage** in Firefox) → **Cookies** → `https://addons.opera.com` and copy the `sessionid` value
3. Add these two secrets

   | Secret | Value |
   | :--- | :--- |
   | `OPERA_PACKAGE_ID` | Package ID (number) |
   | `OPERA_SESSION_ID` | Value of the `sessionid` cookie |

### Testing the credentials

With `.env.submit` in place, you can check authentication without submitting (run in Git Bash or similar):

```bash
cd apps/extension
pnpm zip
pnpm exec wxt submit --dry-run \
  --chrome-zip .output/*-chrome.zip \
  --firefox-zip .output/*-firefox.zip \
  --firefox-sources-zip .output/*-sources.zip \
  --edge-zip .output/*-chrome.zip \
  --opera-zip .output/*-chrome.zip
```

### Requiring approval before submitting (optional)

The workflow uses the GitHub Environment `release`. Add yourself under **Settings → Environments → release → Required reviewers** and the workflow will wait for your approval on GitHub before submitting.

## Troubleshooting

| Symptom | Fix |
| :--- | :--- |
| `main ブランチで実行してください` (run on main) | Merge the PR, then `git switch main && git pull` |
| `origin/main と一致していません` (not in sync with origin/main) | `git pull` (or push your unpushed commits) |
| Local tests fail | Fix them and run again (nothing has been changed yet) |
| Actions: "tag and version do not match" | Happens when a tag is created by hand. Use `pnpm release` |
| Only the store submission fails | The GitHub Release exists. Check the secrets, then upload the zips by hand or use **Re-run failed jobs** in Actions |
