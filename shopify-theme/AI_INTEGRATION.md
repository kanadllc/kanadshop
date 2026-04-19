# AI Integration

## What is implemented

- Theme-level AI settings for assistant name, gateway URL, provider, provider-specific models, provider API keys, voice input, voice output, and system prompt.
- A global storefront AI concierge with browser voice input and speech playback.
- A server-side gateway contract for multi-provider chat and merchant content generation.

## Secure architecture

Use the Shopify theme as the merchant configuration surface and the storefront client.

- Merchant API keys can be entered in theme settings, but they must only be read server-side.
- The storefront must never render those key settings in Liquid or expose them to JavaScript.
- Point the theme to a secure gateway with the `AI gateway endpoint URL` setting.
- Keep merchant-only generation flows such as product title, description, SEO title, SEO description, FAQ, and collection copy in an authenticated app, dashboard, or app proxy.

Do not send raw provider keys from theme JavaScript.

## Theme settings

- `Enable AI voice chatbot`: turns the storefront assistant on.
- `AI gateway endpoint URL`: endpoint used by the chatbot.
- `Default provider`: provider identifier sent to the gateway.
- `OpenAI API key`, `Anthropic API key`, `Google Gemini API key`, `Groq API key`: merchant-managed provider secrets stored in theme settings.
- `OpenAI model`, `Anthropic model`, `Google Gemini model`, `Groq model`: provider-specific model defaults.
- `Storefront assistant instructions`: system prompt for storefront behavior.
- `Enable voice input` and `Enable voice playback`: browser speech features.

## Gateway resolution path

The gateway resolves provider secrets in this order:

1. Local [shopify-theme/config/settings_data.json](shopify-theme/config/settings_data.json) for local development.
2. Live Shopify theme settings via Admin API using `SHOPIFY_ADMIN_ACCESS_TOKEN` and `SHOPIFY_THEME_ID`.
3. Environment-variable fallback when explicitly configured.

## Gateway endpoints

- `POST /api/ai/chat`
- `POST /api/ai/product-copy`
- `GET /admin/ai-copy`
- `GET /api/admin/products`
- `POST /api/admin/products/generate-copy`
- `POST /api/admin/products/save-copy`
- `GET /api/ai/providers`
- `GET /health`

## Product copy workflow

Recommended flow for merchant content automation:

1. Open the merchant console at `/admin/ai-copy?shop=your-store.myshopify.com`.
2. Search for a product from Shopify Admin.
3. Let the merchant choose provider, model, tone, audience, and keywords there.
4. Generate the product title, description, SEO title, and SEO description.
5. Review and edit the generated result.
6. Save the approved content back to Shopify Admin.

This keeps API keys off the storefront while still allowing the merchant to use their own provider and model choices.