# GitHub Publish Plan

This plan prepares the Kanad repository for a clean first publish, a working GitHub Pages deployment, and a low-noise initial commit history.

## 1. Create the repository

1. Create a new GitHub repository named `kanadshop`.
2. Do not initialize it with a README, license, or gitignore if you want to use this workspace as the source of truth.
3. Set the default branch to `main`.

## 2. Review placeholders before first push

Update these remaining publication settings before the repository becomes public:

1. Confirm that `shopify-theme/config/settings_schema.json` points to the final live documentation domain.
2. Publish a Shopify support page using the `page.support` template.
3. Review merchant-facing copy in `docs/merchant-guide.html`, `docs/faq.html`, and `docs/support.html`.
4. Review the support policy and launch sequence in `shopify-theme/THEME_STORE_SUBMISSION.md` and `shopify-theme/THEME_STORE_LAUNCH_PLAN.md`.

## 3. Recommended initial commit structure

If you want a clean first history, use three commits instead of one large dump:

1. `chore: initialize kanad theme repository`
   Include root repo files, gitignore, package metadata, and base workspace structure.
2. `feat: add shopify theme store scaffolding`
   Include `shopify-theme/` source, templates, sections, assets, configs, locales, and validation-ready theme code.
3. `docs: add merchant docs and launch planning`
   Include `docs/`, support assets, README updates, issue template, and launch-plan documents.

## 4. Example first-publish commands

Run these after creating the GitHub repository and replacing placeholders:

```powershell
git init
git branch -M main
git add .gitignore package.json package-lock.json tsconfig.json vite.config.ts README.md metadata.json index.html src shopify-theme docs .github GITHUB_PUBLISH_PLAN.md
git commit -m "chore: initialize kanad theme repository"
git remote add origin https://github.com/kanadllc/kanadshop.git
git push -u origin main
```

If you want the cleaner three-commit history, stage and commit in smaller groups instead of one `git add`.

## 5. GitHub Pages setup

1. Push the `main` branch.
2. Open GitHub repository Settings.
3. Open Pages.
4. Set Source to `GitHub Actions`.
5. Confirm that `.github/workflows/pages.yml` is present on `main`.
6. Trigger the workflow with a push to `docs/` or from the Actions tab.
7. Verify that the published site serves:
   `https://kanadllc.github.io/kanadshop/`
8. Follow the full activation and verification flow in `GITHUB_PAGES_ACTIVATION_CHECKLIST.md`.

## 6. Post-publish verification

1. Open the published docs homepage.
2. Confirm `merchant-guide.html`, `faq.html`, and `support.html` load correctly.
3. Verify that the support form submits to the configured backend.
4. Confirm the URLs in `shopify-theme/config/settings_schema.json` match the live docs URLs.
5. Re-run Theme Check after any docs URL changes that affect theme config.

## 7. Recommended next steps after first push

1. Add a repository description and topics in GitHub.
2. Protect the `main` branch.
3. Add issue labels for support, documentation, theme-store, accessibility, and performance.
4. Tag the first validated version after live-store QA.