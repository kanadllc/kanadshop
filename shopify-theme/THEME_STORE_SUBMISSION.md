# Shopify Theme Store Submission Notes

This theme now includes the baseline Shopify Online Store 2.0 scaffolding required for a Theme Store submission review:

- Required templates added: 404, article, blog, cart, collection, homepage, list collections, page, page contact, password, product, search, and gift card.
- Required config files added: config/settings_schema.json and config/settings_data.json.
- Section groups added for the header and footer.
- Custom liquid section added.
- Core storefront sections added for product, cart, search, article, page, contact, password, and collection list pages.
- SEO metadata and social sharing tags added.
- Gift card template added with code, QR code, and Apple Wallet support.

Remaining blockers before an actual Shopify Theme Store submission:

1. Confirm that the published documentation URLs in config/settings_schema.json resolve correctly.
2. Publish a Shopify support page that uses the `page.support` template so support requests go to the store admin email.
3. Validate the theme on a Shopify development store with realistic products, collections, blog posts, gift cards, discounts, subscriptions, and multiple variants.
4. Run Lighthouse, accessibility tests, and manual browser QA against the benchmark data set.
5. Complete merchant-content review: demo copy, imagery rights, originality, theme naming, and preset naming.
6. Complete Partner-side submission tasks following `THEME_STORE_LAUNCH_PLAN.md`.

GitHub and Partner-side steps that cannot be completed from this workspace alone:

1. Publish this code to a GitHub repository you control.
2. Enable GitHub Pages or deploy the docs to your final support domain.
3. Connect the support form to your email/helpdesk workflow and configure auto-response.
4. Upload the theme zip or connect the repository from your Shopify Partner account.
5. Submit through https://partners.shopify.com/ after the live-store validation passes.

Launch plan reference: see `THEME_STORE_LAUNCH_PLAN.md`.