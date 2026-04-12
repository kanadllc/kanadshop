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
Before publishing publicly, confirm that GitHub Pages is enabled for that repository and that the support form backend in `docs/support.html` is configured.

## GitHub Publish Workflow

After creating the GitHub repository:

1. Push this codebase to the `main` branch.
2. Open the repository Settings page and enable GitHub Pages with GitHub Actions as the source.
3. Update `shopify-theme/config/settings_schema.json` so the documentation and support URLs use your final GitHub Pages or custom domain.
4. Update `docs/support.html` so the form action points to your production support form backend.
5. Let the `pages.yml` workflow publish the contents of `docs/`.

Detailed rollout steps are in `GITHUB_PUBLISH_PLAN.md`.

## Submission Notes

- Merchant docs entry page: `docs/index.html`
- Merchant guide: `docs/merchant-guide.html`
- Support page: `docs/support.html`
- GitHub publish plan: `GITHUB_PUBLISH_PLAN.md`
- Launch plan: `shopify-theme/THEME_STORE_LAUNCH_PLAN.md`
