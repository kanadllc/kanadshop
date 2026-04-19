# Theme Store Resubmission Checklist

Last updated: 2026-04-18

Use this checklist before the next Shopify Theme Store resubmission. It is organized around the review areas Theme Store reviewers typically assess: design quality, accessibility, merchant UX, customer UX, technical compliance, and submission readiness.

## 1. Design quality and originality

- Confirm the homepage, product, collection, header, and footer all feel intentional and visually consistent, not generic.
- Confirm the theme has a distinct point of view versus free themes and existing Theme Store patterns.
- Review every major template with realistic imagery, copy length, and populated content.
- Remove placeholder copy, weak generic promises, and benchmark-unfriendly filler text.
- Validate that every preset tells a clear merchandising story from first view.

## 2. Customer experience

- Verify product discovery is strong on home, collection, search, and navigation surfaces.
- Verify product pages communicate value, options, pricing, fulfillment, and support clearly.
- Verify cart and checkout paths feel credible and polished on desktop and mobile.
- Verify empty states and no-results states are useful and branded.
- Verify the theme handles long titles, many filters, and crowded navigation without breaking hierarchy.

## 3. Merchant experience

- Confirm upgraded sections have useful settings and are not over-dependent on code edits.
- Check default presets and section defaults so a merchant sees a strong result immediately after install.
- Verify settings labels, defaults, and help text are clear and not overly technical.
- Confirm header, footer, hero, trust, and category sections can support multiple merchandising approaches.
- Validate that merchants can express support, policy, and brand trust messages cleanly through settings.

## 4. Accessibility

- Run keyboard-only testing on header navigation, category menu, disclosures, filters, product options, and cart.
- Check visible focus states across all interactive elements.
- Run automated accessibility audits on home, product, collection, search, cart, and support pages.
- Validate color contrast using final demo-store brand settings.
- Confirm labels, error states, status messages, and success messages are announced clearly where applicable.

## 5. Performance and technical quality

- Run `shopify theme check --path shopify-theme` and confirm zero offenses.
- Run Lighthouse on home, product, and collection pages against populated demo data.
- Validate image loading, media behavior, predictive search, and filters on mobile.
- Test supported browsers and mobile webviews with realistic catalogs.
- Confirm no broken schema defaults, missing images, or broken section presets remain.

## 6. Demo store readiness

- Build a populated demo store with realistic products, collections, articles, policies, and media.
- Add discounts, subscriptions, gift cards, and fulfillment scenarios where supported by the theme.
- Confirm every showcased feature is actually configured in the demo store.
- Review install-state quality so the theme still looks credible before heavy merchant customization.

## 7. Support and documentation

- Finalize the public support route and response workflow.
- Confirm merchant docs, FAQ, and support URLs are public and current.
- Document response-time expectations, escalation path, and onboarding guidance.
- Ensure support messaging inside the theme aligns with the actual support process.

## 8. Submission package review

- Confirm the submission zip includes only the contents of `shopify-theme/`.
- Confirm the final theme name and preset naming are Theme Store-safe and distinct.
- Review `THEME_STORE_REQUIREMENTS_AUDIT.md` and close any remaining manual blockers.
- Perform one final pass on home, collection, product, cart, search, contact, support, and account templates before upload.

## Exit criteria

Do not resubmit until all of the following are true:

- The theme no longer reads as a starter or derivative design on core shopping surfaces.
- Core customer journeys are polished on both desktop and mobile.
- Accessibility and technical validation have been run on realistic store data.
- Merchant defaults are strong enough to create confidence immediately after install.
- Demo store quality is high enough to support the claim that the theme exceeds current catalog quality.