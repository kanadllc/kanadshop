# Kanad Shopify Theme

Kanad is a Shopify Online Store 2.0 theme workspace prepared for Shopify Theme Store submission work. The repository contains the storefront theme, supporting React preview files, merchant-facing documentation drafts, and internal launch planning notes.

## Repository Layout

- `shopify-theme/`: Shopify theme source intended for Theme Store submission.
- `docs/`: GitHub Pages-ready merchant documentation and support pages.
- `src/`: React preview application used during design and exploration.

## Local Development

Prerequisites:

- Node.js
- Shopify CLI

Commands:

- `npm install`
- `npm run shopify:dev`
- `npm run shopify:push`
- `npm run lint`

## Validation

Run Shopify Theme Check from the theme folder:

```powershell
Push-Location .\shopify-theme
npm exec --yes shopify theme check
Pop-Location
```

## GitHub Publication Prep

This repository now includes:

- GitHub Pages-ready merchant docs in `docs/`
- A support page template in `docs/support.html`
- A GitHub Pages workflow in `.github/workflows/pages.yml`
- Internal submission planning docs in `shopify-theme/`

The theme documentation URLs in `shopify-theme/config/settings_schema.json` are already pointed at `https://kanadllc.github.io/kanadshop/`.
Before publishing publicly, confirm that GitHub Pages is enabled for that repository and that the Shopify-hosted support page using the `page.support` template is published.

## GitHub Publish Workflow

After creating the GitHub repository:

1. Push this codebase to the `main` branch.
2. Open the repository Settings page and enable GitHub Pages with GitHub Actions as the source.
3. Update `shopify-theme/config/settings_schema.json` so the documentation and support URLs use your final GitHub Pages or custom domain.
4. Publish the Shopify support page that uses the `page.support` or `contact` template.
5. Let the `pages.yml` workflow publish the contents of `docs/`.

Detailed rollout steps are in `GITHUB_PUBLISH_PLAN.md`.

## GitHub To Shopify Deployment

This repository now includes `.github/workflows/deploy-shopify.yml` so GitHub can deploy theme changes to Shopify.

Recommended flow:

1. Create a feature branch.
2. Make theme changes in `shopify-theme/`.
3. Open a pull request into `main`.
4. Wait for the `Validate` workflow to pass.
5. Merge into `main`.
6. GitHub automatically deploys the merged theme to your Shopify staging theme.
7. Preview the staging theme in Shopify.
8. Run the `Deploy Shopify Theme` workflow manually with the `live` target when you are ready to update the live Shopify theme.

Required GitHub repository secrets:

- `SHOPIFY_STORE`: `kanaddev.myshopify.com`
- `SHOPIFY_CLI_THEME_TOKEN`: Theme Access password or an Admin API token with theme access
- `SHOPIFY_STAGING_THEME_ID`: the unpublished theme ID used for automatic staging deploys
- `SHOPIFY_LIVE_THEME_ID`: the live theme ID used only for manual live deploys

Current staging theme from this workspace:

- `SHOPIFY_STAGING_THEME_ID`: `149599879319` (`Kanad Sync`)

The live theme ID should be added only after you decide which Shopify theme should receive production updates.

## Submission Notes

- Merchant docs entry page: `docs/index.html`
- Merchant guide: `docs/merchant-guide.html`
- Support page: `docs/support.html`
- GitHub publish plan: `GITHUB_PUBLISH_PLAN.md`
- Launch plan: `shopify-theme/THEME_STORE_LAUNCH_PLAN.md`
