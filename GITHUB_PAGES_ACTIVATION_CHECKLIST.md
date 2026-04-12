# GitHub Pages Activation Checklist

Use this checklist to get `https://kanadllc.github.io/kanadshop/` live and aligned with the URLs already configured in `shopify-theme/config/settings_schema.json`.

## Prerequisites

1. Confirm the GitHub repository exists at `https://github.com/kanadllc/kanadshop`.
2. Confirm the `main` branch contains `.github/workflows/pages.yml` and the `docs/` folder.
3. Confirm the theme config points at the intended Pages URLs.

## Activation Steps

1. Open the GitHub repository.
2. Go to `Settings`.
3. Open `Pages` in the left sidebar.
4. Under `Build and deployment`, set `Source` to `GitHub Actions`.
5. Open the `Actions` tab.
6. Locate the workflow named `Deploy documentation to GitHub Pages`.
7. If it has not run yet, either:
   Run it manually with `Run workflow`, or
   Push a commit that changes a file in `docs/`.
8. Wait for the workflow to complete successfully.

## Live URL Checks

After the workflow succeeds, verify all of these URLs load without `404`:

1. `https://kanadllc.github.io/kanadshop/`
2. `https://kanadllc.github.io/kanadshop/merchant-guide.html`
3. `https://kanadllc.github.io/kanadshop/faq.html`
4. `https://kanadllc.github.io/kanadshop/support.html`

## Consistency Checks

1. Confirm `shopify-theme/config/settings_schema.json` still points to:
   `https://kanadllc.github.io/kanadshop/merchant-guide.html`
   `https://kanadllc.github.io/kanadshop/support.html`
2. Confirm the homepage links in `docs/index.html` open the correct pages.
3. Confirm the Pages deployment did not strip the `/kanadshop/` base path.

## Support Page Checks

1. Open `https://kanadllc.github.io/kanadshop/support.html`.
2. Confirm the page explains that the live support form is hosted on Shopify using the `page.support` template.
3. Confirm the Shopify support page is published on the support store.
4. Submit a live test request on the Shopify-hosted support page and confirm delivery to the store admin email.

## If Pages Still Returns 404

1. Confirm the repository is public, or confirm your plan supports Pages for the repository visibility you chose.
2. Confirm the workflow completed successfully in the `Actions` tab.
3. Confirm Pages source is set to `GitHub Actions`, not `Deploy from a branch`.
4. Confirm the repository name is exactly `kanadshop`.
5. Wait a few minutes and retry, because first-time Pages provisioning can lag.

## Completion Criteria

This step is complete when:

1. The root documentation URL loads successfully.
2. The merchant guide and support URLs load successfully.
3. The live URLs match the theme settings.
4. The support form is either safely disabled with a warning or connected to the real backend.