import 'dotenv/config';
import express from 'express';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

type Provider = 'openai' | 'anthropic' | 'google' | 'groq' | 'custom';
type ChatRole = 'system' | 'user' | 'assistant';

interface ChatMessage {
  role: ChatRole;
  content: string;
}

interface ChatRequestBody {
  provider?: string;
  model?: string;
  systemPrompt?: string;
  messages?: ChatMessage[];
  context?: Record<string, unknown>;
  source?: string;
}

interface ProductCopyRequestBody {
  provider?: string;
  model?: string;
  product?: Record<string, unknown>;
  tone?: string;
  audience?: string;
  keywords?: string[];
  extraInstructions?: string;
}

interface ProductSearchResult {
  id: string;
  legacyResourceId: string;
  title: string;
  handle: string;
  descriptionHtml: string;
  seoTitle: string;
  seoDescription: string;
  productType: string;
  vendor: string;
  tags: string[];
}

const app = express();
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const port = Number(process.env.PORT || 8787);
const allowedOrigins = (process.env.AI_GATEWAY_ALLOWED_ORIGINS || '')
  .split(',')
  .map((origin) => origin.trim())
  .filter(Boolean);
const localSettingsDataPath = process.env.SHOPIFY_THEME_SETTINGS_FILE || 'shopify-theme/config/settings_data.json';
const settingsCacheTtlMs = Number(process.env.SHOPIFY_THEME_SETTINGS_CACHE_MS || 60000);

const defaultModels: Record<Exclude<Provider, 'custom'>, string> = {
  openai: 'gpt-4.1-mini',
  anthropic: 'claude-3-5-sonnet-latest',
  google: 'gemini-2.5-flash',
  groq: 'llama-3.3-70b-versatile'
};

const providerKeySettingMap: Record<Exclude<Provider, 'custom'>, string> = {
  openai: 'ai_openai_api_key',
  anthropic: 'ai_anthropic_api_key',
  google: 'ai_google_api_key',
  groq: 'ai_groq_api_key'
};

const providerModelSettingMap: Record<Exclude<Provider, 'custom'>, string> = {
  openai: 'ai_openai_model',
  anthropic: 'ai_anthropic_model',
  google: 'ai_google_model',
  groq: 'ai_groq_model'
};

let cachedSettings:
  | {
      fetchedAt: number;
      settings: Record<string, unknown>;
      source: 'local' | 'shopify';
    }
  | null = null;

const merchantConsolePath = path.join(__dirname, 'merchant-ai-console.html');

app.use(express.json({ limit: '1mb' }));

app.use((req, res, next) => {
  const origin = req.headers.origin;

  if (origin && (allowedOrigins.length === 0 || allowedOrigins.includes('*') || allowedOrigins.includes(origin))) {
    res.header('Access-Control-Allow-Origin', allowedOrigins.includes('*') ? '*' : origin);
    res.header('Vary', 'Origin');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    res.header('Access-Control-Allow-Methods', 'GET,POST,OPTIONS');
  }

  if (req.method === 'OPTIONS') {
    res.sendStatus(204);
    return;
  }

  next();
});

function normalizeProvider(provider: string | undefined): Provider {
  if (provider === 'anthropic' || provider === 'google' || provider === 'groq' || provider === 'custom') {
    return provider;
  }

  return 'openai';
}

function readContextValue(context: Record<string, unknown> | undefined, key: string): string {
  if (!context || !(key in context)) return '';
  const value = context[key];
  return typeof value === 'string' ? value.trim() : '';
}

function sanitizeMessages(input: unknown): ChatMessage[] {
  if (!Array.isArray(input)) return [];

  return input
    .map((item) => {
      if (!item || typeof item !== 'object') return null;

      const candidate = item as Partial<ChatMessage>;
      if (candidate.role !== 'system' && candidate.role !== 'user' && candidate.role !== 'assistant') return null;
      if (typeof candidate.content !== 'string') return null;

      const content = candidate.content.trim();
      if (!content) return null;

      return {
        role: candidate.role,
        content
      } satisfies ChatMessage;
    })
    .filter((item): item is ChatMessage => Boolean(item))
    .slice(-20);
}

function resolveEnvApiKey(provider: Provider): string {
  const envMap: Record<Provider, string> = {
    openai: process.env.OPENAI_API_KEY || '',
    anthropic: process.env.ANTHROPIC_API_KEY || '',
    google: process.env.GOOGLE_API_KEY || process.env.GEMINI_API_KEY || '',
    groq: process.env.GROQ_API_KEY || '',
    custom: process.env.CUSTOM_AI_BEARER_TOKEN || ''
  };

  return envMap[provider];
}

function normalizeThemeSettingsPayload(payload: Record<string, any>): Record<string, unknown> {
  if (payload.current && typeof payload.current === 'object' && payload.current.settings && typeof payload.current.settings === 'object') {
    return payload.current.settings as Record<string, unknown>;
  }

  if (typeof payload.current === 'string' && payload.presets?.[payload.current]?.settings && typeof payload.presets[payload.current].settings === 'object') {
    return payload.presets[payload.current].settings as Record<string, unknown>;
  }

  if (payload.settings && typeof payload.settings === 'object') {
    return payload.settings as Record<string, unknown>;
  }

  return {};
}

async function loadThemeSettingsFromLocalFile(): Promise<Record<string, unknown>> {
  const { readFile } = await import('node:fs/promises');
  const contents = await readFile(localSettingsDataPath, 'utf8');
  return normalizeThemeSettingsPayload(JSON.parse(contents) as Record<string, any>);
}

async function loadThemeSettingsFromShopify(shopDomain: string): Promise<Record<string, unknown>> {
  const adminToken = process.env.SHOPIFY_ADMIN_ACCESS_TOKEN || '';
  const apiVersion = process.env.SHOPIFY_ADMIN_API_VERSION || '2025-01';
  const themeId = process.env.SHOPIFY_THEME_ID || '';

  if (!shopDomain || !adminToken || !themeId) {
    throw new Error('Shopify theme settings lookup requires shop domain, SHOPIFY_ADMIN_ACCESS_TOKEN, and SHOPIFY_THEME_ID.');
  }

  const assetKey = encodeURIComponent('config/settings_data.json');
  const endpoint = `https://${shopDomain}/admin/api/${apiVersion}/themes/${themeId}/assets.json?asset[key]=${assetKey}`;
  const response = await fetch(endpoint, {
    headers: {
      'X-Shopify-Access-Token': adminToken,
      'Content-Type': 'application/json'
    }
  });

  const payload = await parseJson(response);
  if (!response.ok) {
    throw new Error(payload.errors || payload.error || 'Failed to load Shopify theme settings.');
  }

  const value = payload.asset?.value;
  if (typeof value !== 'string' || !value.trim()) {
    throw new Error('Shopify theme settings asset did not include config/settings_data.json content.');
  }

  return normalizeThemeSettingsPayload(JSON.parse(value) as Record<string, any>);
}

async function getThemeSettings(shopDomain: string): Promise<{ settings: Record<string, unknown>; source: 'local' | 'shopify' }> {
  if (cachedSettings && Date.now() - cachedSettings.fetchedAt < settingsCacheTtlMs) {
    return {
      settings: cachedSettings.settings,
      source: cachedSettings.source
    };
  }

  try {
    const settings = await loadThemeSettingsFromLocalFile();
    cachedSettings = {
      fetchedAt: Date.now(),
      settings,
      source: 'local'
    };
    return {
      settings,
      source: 'local'
    };
  } catch {
  }

  const settings = await loadThemeSettingsFromShopify(shopDomain);
  cachedSettings = {
    fetchedAt: Date.now(),
    settings,
    source: 'shopify'
  };

  return {
    settings,
    source: 'shopify'
  };
}

async function resolveApiKey(provider: Provider, context: Record<string, unknown> | undefined): Promise<string> {
  if (provider === 'custom') {
    return resolveEnvApiKey('custom');
  }

  try {
    const shopDomain = readContextValue(context, 'shopDomain');
    const { settings } = await getThemeSettings(shopDomain);
    const keyName = providerKeySettingMap[provider];
    const value = settings[keyName];

    if (typeof value === 'string' && value.trim()) {
      return value.trim();
    }
  } catch {
  }

  return resolveEnvApiKey(provider);
}

function buildSystemPrompt(systemPrompt: string | undefined, context: Record<string, unknown> | undefined): string {
  const prompt = systemPrompt?.trim() || 'You are a helpful Shopify storefront and ecommerce merchandising assistant.';
  const contextText = context && Object.keys(context).length > 0 ? JSON.stringify(context, null, 2) : '';

  return contextText ? `${prompt}\n\nStore context:\n${contextText}` : prompt;
}

async function getModel(provider: Provider, requestedModel: string | undefined, context: Record<string, unknown> | undefined): Promise<string> {
  if (requestedModel?.trim()) return requestedModel.trim();
  if (provider === 'custom') return 'custom';

  try {
    const shopDomain = readContextValue(context, 'shopDomain');
    const { settings } = await getThemeSettings(shopDomain);
    const modelSettingName = providerModelSettingMap[provider];
    const value = settings[modelSettingName];

    if (typeof value === 'string' && value.trim()) {
      return value.trim();
    }
  } catch {
  }

  return defaultModels[provider];
}

async function parseJson(response: Response): Promise<any> {
  return response.json().catch(() => ({}));
}

function normalizeShopDomain(shopDomain: string): string {
  return shopDomain.trim().replace(/^https?:\/\//, '').replace(/\/$/, '');
}

function getRequiredShopDomain(input: string | undefined): string {
  const shopDomain = normalizeShopDomain(input || '');
  if (!shopDomain) {
    throw new Error('A Shopify shop domain is required.');
  }

  return shopDomain;
}

function getAdminApiHeaders(): Record<string, string> {
  const token = process.env.SHOPIFY_ADMIN_ACCESS_TOKEN || '';
  if (!token) {
    throw new Error('SHOPIFY_ADMIN_ACCESS_TOKEN is not configured.');
  }

  return {
    'X-Shopify-Access-Token': token,
    'Content-Type': 'application/json'
  };
}

async function shopifyAdminGraphql<T>(shopDomain: string, query: string, variables: Record<string, unknown>): Promise<T> {
  const apiVersion = process.env.SHOPIFY_ADMIN_API_VERSION || '2025-01';
  const response = await fetch(`https://${normalizeShopDomain(shopDomain)}/admin/api/${apiVersion}/graphql.json`, {
    method: 'POST',
    headers: getAdminApiHeaders(),
    body: JSON.stringify({ query, variables })
  });

  const payload = await parseJson(response);
  if (!response.ok) {
    throw new Error(payload.errors || payload.error || 'Shopify Admin API request failed.');
  }

  if (Array.isArray(payload.errors) && payload.errors.length > 0) {
    throw new Error(payload.errors.map((error: { message?: string }) => error.message || 'GraphQL error').join(', '));
  }

  return payload.data as T;
}

function mapProductNode(node: any): ProductSearchResult {
  return {
    id: node.id || '',
    legacyResourceId: node.legacyResourceId || '',
    title: node.title || '',
    handle: node.handle || '',
    descriptionHtml: node.descriptionHtml || '',
    seoTitle: node.seo?.title || '',
    seoDescription: node.seo?.description || '',
    productType: node.productType || '',
    vendor: node.vendor || '',
    tags: Array.isArray(node.tags) ? node.tags : []
  };
}

async function searchProducts(shopDomain: string, queryText: string): Promise<ProductSearchResult[]> {
  const data = await shopifyAdminGraphql<{
    products: {
      edges: Array<{
        node: any;
      }>;
    };
  }>(
    shopDomain,
    `query SearchProducts($query: String!) {
      products(first: 12, sortKey: UPDATED_AT, reverse: true, query: $query) {
        edges {
          node {
            id
            legacyResourceId
            title
            handle
            descriptionHtml
            productType
            vendor
            tags
            seo {
              title
              description
            }
          }
        }
      }
    }`,
    { query: queryText.trim() || 'status:active' }
  );

  return data.products.edges.map((edge) => mapProductNode(edge.node));
}

async function getProductById(shopDomain: string, id: string): Promise<ProductSearchResult> {
  const productId = id.startsWith('gid://') ? id : `gid://shopify/Product/${id}`;
  const data = await shopifyAdminGraphql<{
    product: any;
  }>(
    shopDomain,
    `query GetProduct($id: ID!) {
      product(id: $id) {
        id
        legacyResourceId
        title
        handle
        descriptionHtml
        productType
        vendor
        tags
        seo {
          title
          description
        }
      }
    }`,
    { id: productId }
  );

  if (!data.product) {
    throw new Error('Product not found.');
  }

  return mapProductNode(data.product);
}

async function updateProductCopy(
  shopDomain: string,
  input: {
    id: string;
    title: string;
    descriptionHtml: string;
    seoTitle: string;
    seoDescription: string;
  }
): Promise<ProductSearchResult> {
  const productId = input.id.startsWith('gid://') ? input.id : `gid://shopify/Product/${input.id}`;
  const data = await shopifyAdminGraphql<{
    productUpdate: {
      product: any;
      userErrors: Array<{ field?: string[]; message: string }>;
    };
  }>(
    shopDomain,
    `mutation UpdateProductCopy($product: ProductUpdateInput!) {
      productUpdate(product: $product) {
        product {
          id
          legacyResourceId
          title
          handle
          descriptionHtml
          productType
          vendor
          tags
          seo {
            title
            description
          }
        }
        userErrors {
          field
          message
        }
      }
    }`,
    {
      product: {
        id: productId,
        title: input.title,
        descriptionHtml: input.descriptionHtml,
        seo: {
          title: input.seoTitle,
          description: input.seoDescription
        }
      }
    }
  );

  if (data.productUpdate.userErrors.length > 0) {
    throw new Error(data.productUpdate.userErrors.map((error) => error.message).join(', '));
  }

  return mapProductNode(data.productUpdate.product);
}

function extractTextFromUnknown(value: unknown): string {
  if (typeof value === 'string') return value.trim();
  if (Array.isArray(value)) {
    return value
      .map((item) => {
        if (typeof item === 'string') return item;
        if (item && typeof item === 'object' && 'text' in item && typeof item.text === 'string') return item.text;
        return '';
      })
      .join('')
      .trim();
  }

  return '';
}

async function callOpenAICompatible(provider: 'openai' | 'groq', model: string, systemPrompt: string, messages: ChatMessage[], context: Record<string, unknown> | undefined): Promise<string> {
  const apiKey = await resolveApiKey(provider, context);
  if (!apiKey) throw new Error(`${provider} API key is not configured on the gateway.`);

  const endpoint = provider === 'openai' ? 'https://api.openai.com/v1/chat/completions' : 'https://api.groq.com/openai/v1/chat/completions';
  const response = await fetch(endpoint, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      model,
      temperature: 0.7,
      messages: [
        { role: 'system', content: systemPrompt },
        ...messages
          .filter((message) => message.role !== 'system')
          .map((message) => ({ role: message.role, content: message.content }))
      ]
    })
  });

  const payload = await parseJson(response);
  if (!response.ok) {
    throw new Error(payload.error?.message || `${provider} request failed.`);
  }

  const reply = extractTextFromUnknown(payload.choices?.[0]?.message?.content);
  if (!reply) throw new Error(`${provider} returned an empty response.`);
  return reply;
}

async function callAnthropic(model: string, systemPrompt: string, messages: ChatMessage[], context: Record<string, unknown> | undefined): Promise<string> {
  const apiKey = await resolveApiKey('anthropic', context);
  if (!apiKey) throw new Error('Anthropic API key is not configured on the gateway.');

  const response = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'x-api-key': apiKey,
      'anthropic-version': '2023-06-01',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      model,
      system: systemPrompt,
      max_tokens: 900,
      messages: messages
        .filter((message) => message.role !== 'system')
        .map((message) => ({
          role: message.role === 'assistant' ? 'assistant' : 'user',
          content: message.content
        }))
    })
  });

  const payload = await parseJson(response);
  if (!response.ok) {
    throw new Error(payload.error?.message || 'Anthropic request failed.');
  }

  const reply = extractTextFromUnknown(payload.content);
  if (!reply) throw new Error('Anthropic returned an empty response.');
  return reply;
}

async function callGoogle(model: string, systemPrompt: string, messages: ChatMessage[], context: Record<string, unknown> | undefined): Promise<string> {
  const apiKey = await resolveApiKey('google', context);
  if (!apiKey) throw new Error('Google API key is not configured on the gateway.');

  const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${encodeURIComponent(model)}:generateContent?key=${encodeURIComponent(apiKey)}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      systemInstruction: {
        parts: [{ text: systemPrompt }]
      },
      contents: messages
        .filter((message) => message.role !== 'system')
        .map((message) => ({
          role: message.role === 'assistant' ? 'model' : 'user',
          parts: [{ text: message.content }]
        })),
      generationConfig: {
        temperature: 0.7
      }
    })
  });

  const payload = await parseJson(response);
  if (!response.ok) {
    throw new Error(payload.error?.message || 'Google request failed.');
  }

  const reply = extractTextFromUnknown(payload.candidates?.[0]?.content?.parts);
  if (!reply) throw new Error('Google returned an empty response.');
  return reply;
}

async function callCustomGateway(model: string, systemPrompt: string, messages: ChatMessage[]): Promise<string> {
  const endpoint = process.env.CUSTOM_AI_ENDPOINT || '';
  if (!endpoint) throw new Error('CUSTOM_AI_ENDPOINT is not configured on the gateway.');

  const bearerToken = resolveEnvApiKey('custom');
  const headers: Record<string, string> = {
    'Content-Type': 'application/json'
  };

  if (bearerToken) {
    headers.Authorization = `Bearer ${bearerToken}`;
  }

  const response = await fetch(endpoint, {
    method: 'POST',
    headers,
    body: JSON.stringify({ model, systemPrompt, messages })
  });

  const payload = await parseJson(response);
  if (!response.ok) {
    throw new Error(payload.error || 'Custom AI gateway request failed.');
  }

  const reply = extractTextFromUnknown(payload.reply || payload.message || payload.output);
  if (!reply) throw new Error('Custom AI gateway returned an empty response.');
  return reply;
}

async function generateReply(provider: Provider, model: string, systemPrompt: string, messages: ChatMessage[], context: Record<string, unknown> | undefined): Promise<string> {
  switch (provider) {
    case 'anthropic':
      return callAnthropic(model, systemPrompt, messages, context);
    case 'google':
      return callGoogle(model, systemPrompt, messages, context);
    case 'groq':
      return callOpenAICompatible('groq', model, systemPrompt, messages, context);
    case 'custom':
      return callCustomGateway(model, systemPrompt, messages);
    case 'openai':
    default:
      return callOpenAICompatible('openai', model, systemPrompt, messages, context);
  }
}

function extractFirstJsonObject(text: string): Record<string, unknown> | null {
  const trimmed = text.trim();
  if (!trimmed) return null;

  try {
    const parsed = JSON.parse(trimmed);
    if (parsed && typeof parsed === 'object' && !Array.isArray(parsed)) {
      return parsed as Record<string, unknown>;
    }
  } catch {
  }

  const match = trimmed.match(/\{[\s\S]*\}/);
  if (!match) return null;

  try {
    const parsed = JSON.parse(match[0]);
    if (parsed && typeof parsed === 'object' && !Array.isArray(parsed)) {
      return parsed as Record<string, unknown>;
    }
  } catch {
  }

  return null;
}

app.get('/health', (_req, res) => {
  res.json({ ok: true });
});

app.get('/admin/ai-copy', (_req, res) => {
  res.sendFile(merchantConsolePath);
});

app.get('/api/ai/providers', (_req, res) => {
  res.json({
    providers: {
      openai: { configured: Boolean(resolveEnvApiKey('openai')), defaultModel: defaultModels.openai },
      anthropic: { configured: Boolean(resolveEnvApiKey('anthropic')), defaultModel: defaultModels.anthropic },
      google: { configured: Boolean(resolveEnvApiKey('google')), defaultModel: defaultModels.google },
      groq: { configured: Boolean(resolveEnvApiKey('groq')), defaultModel: defaultModels.groq },
      custom: { configured: Boolean(process.env.CUSTOM_AI_ENDPOINT) }
    }
  });
});

app.post('/api/ai/chat', async (req, res) => {
  const body = (req.body || {}) as ChatRequestBody;
  const provider = normalizeProvider(body.provider);
  const messages = sanitizeMessages(body.messages);

  if (!messages.length) {
    res.status(400).json({ error: 'At least one chat message is required.' });
    return;
  }

  try {
    const model = await getModel(provider, body.model, body.context);
    const reply = await generateReply(provider, model, buildSystemPrompt(body.systemPrompt, body.context), messages, body.context);

    res.json({
      reply,
      meta: {
        provider,
        model,
        source: body.source || 'text'
      }
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'AI chat request failed.';
    res.status(502).json({ error: message });
  }
});

app.post('/api/ai/product-copy', async (req, res) => {
  const body = (req.body || {}) as ProductCopyRequestBody;
  const provider = normalizeProvider(body.provider);
  const context = {
    shopDomain: typeof body.product?.shopDomain === 'string' ? body.product.shopDomain : ''
  };
  const prompt = [
    'Generate ecommerce product copy and return valid JSON only.',
    'Required keys: title, subtitle, description_html, seo_title, seo_description, bullet_points, tags.',
    'Use an array of strings for bullet_points and tags.',
    body.tone ? `Tone: ${body.tone}` : '',
    body.audience ? `Audience: ${body.audience}` : '',
    body.keywords?.length ? `SEO keywords: ${body.keywords.join(', ')}` : '',
    body.extraInstructions ? `Extra instructions: ${body.extraInstructions}` : '',
    `Product data: ${JSON.stringify(body.product || {}, null, 2)}`
  ]
    .filter(Boolean)
    .join('\n\n');

  try {
    const model = await getModel(provider, body.model, context);
    const raw = await generateReply(provider, model, 'You are a senior ecommerce copywriter and SEO specialist.', [
      {
        role: 'user',
        content: prompt
      }
    ], context);

    const structured = extractFirstJsonObject(raw);

    res.json({
      provider,
      model,
      raw,
      structured
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'AI product copy request failed.';
    res.status(502).json({ error: message });
  }
});

app.get('/api/admin/products', async (req, res) => {
  try {
    const shopDomain = getRequiredShopDomain(typeof req.query.shop === 'string' ? req.query.shop : '');
    const id = typeof req.query.id === 'string' ? req.query.id : '';
    const queryText = typeof req.query.query === 'string' ? req.query.query : '';

    if (id) {
      const product = await getProductById(shopDomain, id);
      res.json({ product });
      return;
    }

    const products = await searchProducts(shopDomain, queryText);
    res.json({ products });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Failed to load products from Shopify Admin.';
    res.status(502).json({ error: message });
  }
});

app.post('/api/admin/products/generate-copy', async (req, res) => {
  const body = (req.body || {}) as ProductCopyRequestBody & { shop?: string };
  const shopDomain = normalizeShopDomain(body.shop || (typeof body.product?.shopDomain === 'string' ? body.product.shopDomain : ''));
  const provider = normalizeProvider(body.provider);
  const context = { shopDomain };
  const prompt = [
    'Generate ecommerce product copy and return valid JSON only.',
    'Required keys: title, description_html, seo_title, seo_description.',
    'Keep title commercially strong but not clickbait.',
    'Use clear HTML paragraphs and short scannable structure for description_html.',
    body.tone ? `Tone: ${body.tone}` : '',
    body.audience ? `Audience: ${body.audience}` : '',
    body.keywords?.length ? `SEO keywords: ${body.keywords.join(', ')}` : '',
    body.extraInstructions ? `Extra instructions: ${body.extraInstructions}` : '',
    `Product data: ${JSON.stringify(body.product || {}, null, 2)}`
  ]
    .filter(Boolean)
    .join('\n\n');

  try {
    const model = await getModel(provider, body.model, context);
    const raw = await generateReply(provider, model, 'You are a senior ecommerce copywriter optimizing Shopify product content for conversion and SEO.', [
      {
        role: 'user',
        content: prompt
      }
    ], context);
    const structured = extractFirstJsonObject(raw);

    res.json({ provider, model, raw, structured });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'AI copy generation failed.';
    res.status(502).json({ error: message });
  }
});

app.post('/api/admin/products/save-copy', async (req, res) => {
  try {
    const body = (req.body || {}) as {
      shop?: string;
      id?: string;
      title?: string;
      descriptionHtml?: string;
      seoTitle?: string;
      seoDescription?: string;
    };
    const shopDomain = getRequiredShopDomain(body.shop);
    if (!body.id) {
      res.status(400).json({ error: 'Product id is required.' });
      return;
    }

    const product = await updateProductCopy(shopDomain, {
      id: body.id,
      title: body.title || '',
      descriptionHtml: body.descriptionHtml || '',
      seoTitle: body.seoTitle || '',
      seoDescription: body.seoDescription || ''
    });

    res.json({ product });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Saving product copy failed.';
    res.status(502).json({ error: message });
  }
});

app.listen(port, () => {
  console.log(`AI gateway listening on http://localhost:${port}`);
});