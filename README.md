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
- `npm run ai:gateway`

## Validation

Run Shopify Theme Check from the theme folder:

```powershell
Push-Location .\shopify-theme
npm exec --yes shopify theme check
Pop-Location
```

Typecheck the AI gateway service:

```powershell
npx tsc --noEmit -p .\tsconfig.server.json
```

## AI Integration

The Shopify theme now includes a configurable AI storefront concierge with optional browser voice input and voice playback. The merchant controls live in [shopify-theme/config/settings_schema.json](shopify-theme/config/settings_schema.json) under `AI integration`.

Important limitation: product title, description, SEO, FAQ, and collection-copy generation must use a secure server or app, not raw theme JavaScript. A Shopify storefront cannot keep provider API keys secret.

This workspace now supports merchant-entered provider keys in theme settings for OpenAI, Anthropic, Google Gemini, and Groq. Those settings are intended to be read only by the server-side gateway from `config/settings_data.json` or from the live theme asset through Shopify Admin API. They are not injected into the storefront runtime.

This repo now includes a multi-provider AI gateway in [server/ai-gateway.ts](server/ai-gateway.ts) with:

- `POST /api/ai/chat` for the storefront chatbot
- `POST /api/ai/product-copy` for merchant content generation workflows
- `GET /admin/ai-copy` for the merchant AI copy console
- `GET /api/admin/products` for Shopify Admin product search and lookup
- `POST /api/admin/products/generate-copy` for merchant content generation from admin product data
- `POST /api/admin/products/save-copy` for writing title, description, SEO title, and SEO description back to Shopify
- `GET /api/ai/providers` and `GET /health`

Setup:

1. Copy `.env.example` to `.env` and set `SHOPIFY_ADMIN_ACCESS_TOKEN` and `SHOPIFY_THEME_ID` for the store whose theme settings should be read by the gateway.
2. In Shopify Theme Editor, add the provider API keys and provider-specific models under `AI integration`.
3. Start the gateway with `npm run ai:gateway`.
4. Put the deployed gateway URL into the theme setting `AI gateway endpoint URL`.
5. Choose the default provider in the theme settings.
6. For merchant-side content generation, call `/api/ai/product-copy` from an authenticated admin app, internal dashboard, or app proxy.
7. Open `/admin/ai-copy?shop=your-store.myshopify.com` to search products, generate copy, and save it back to Shopify Admin.

## Deploy The AI Gateway

This repo is now prepared for a real Node deployment on Render using [render.yaml](render.yaml).

Recommended production flow:

1. Create a new Render Blueprint or Web Service from this repository.
2. Set `SHOPIFY_THEME_ID` to the theme whose settings the gateway should read.
3. Set `SHOPIFY_ADMIN_ACCESS_TOKEN` if you want the gateway to read live theme settings or use the merchant admin copy console.
4. Set one or more provider keys such as `GOOGLE_API_KEY` when you want the gateway to resolve keys from environment variables instead of theme settings.
5. After deploy, use `https://your-render-host/api/ai/chat` as the Shopify theme setting `AI gateway endpoint URL`.
6. Optionally open `https://your-render-host/admin/ai-copy?shop=your-store.myshopify.com` for the merchant copy console.

Build and start commands used by Render:

- `npm run ai:gateway:build`
- `npm run ai:gateway:start`

Additional implementation notes are in [shopify-theme/AI_INTEGRATION.md](shopify-theme/AI_INTEGRATION.md).

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
