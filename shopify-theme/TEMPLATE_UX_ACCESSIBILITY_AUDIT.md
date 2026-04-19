# Template UX and Accessibility Audit

Last updated: 2026-04-18

This audit focuses on code-side storefront quality that Theme Store reviewers will notice in header, footer, product, collection, search, cart, contact, support, and standard page templates.

## Upgraded in this pass

### Header

- Added announcement support, utility highlight text, and better search labeling.
- Fixed the category menu so the button now controls real visibility instead of only toggling `aria-expanded`.
- Improved disclosure and category-menu dismissal behavior for outside click and `Escape`.

### Footer

- Reworked the footer into a stronger editorial/support surface instead of a simple utility strip.
- Added dedicated support messaging, contact routes, and CTA settings.
- Improved newsletter and support hierarchy to better match Theme Store quality expectations.

### Product template

- Added breadcrumb context, lead copy, merchant-configurable highlight chips, media thumbnails, and a support guidance card.
- Improved variant UX with swatch pressed states, media sync, and variant URL updates.
- Added a clearer inventory/status message in the pricing area.

### Collection template

- Added collection hero treatment, active-filter chips, stronger sidebar treatment, and better empty-state handling.
- Fixed collection sorting behavior and checkbox filter submission with client-side handling.
- Improved result-count association and overall hierarchy for filters and merchandising content.

## Reviewed remaining templates

### Search

- Predictive search is present and keyboard-friendly at a basic level.
- Filtering exists, but the search template still needs stronger visual hierarchy and clearer no-results merchandising.
- Residual risk: search result cards are functional but still less premium than the upgraded collection/product surfaces.

### Cart

- Cart supports discounts, quantities, notes, checkout, and accelerated checkout.
- Residual risk: cart layout is technically sound but still visually simpler than Theme Store-leading themes.
- Recommendation: add stronger order-summary framing, better empty-state storytelling, and clearer trust messaging.

### Contact and support

- Forms are accessible at a basic level with labels and success states.
- Residual risk: support workflow still depends on external operational setup such as autoresponders, triage, and attachments.
- Recommendation: add merchant-facing expectations around SLA, file upload workflow, and support-path clarity outside the theme code.

### Standard page template

- Standard pages are structurally safe and minimal.
- Residual risk: content presentation depends heavily on authored content rather than theme-provided layout richness.

## Remaining manual QA before resubmission

- Run keyboard-only walkthroughs on header navigation, predictive search, product variant selection, filters, cart, and localization disclosures.
- Test collection filters and sort combinations against a populated demo catalog.
- Validate mobile behavior for the category menu, filter submission, and media thumbnail interactions.
- Verify color contrast with final merchant-configured colors, not only defaults.
- Test with long product titles, long filter labels, multiple locales, and large menus.
- Run Lighthouse and accessibility checks on home, collection, product, cart, and search using realistic benchmark content.

## Theme Store relevance

These improvements materially reduce the risk that the theme feels too generic or under-designed in its core shopping surfaces. They do not replace the need for populated demo stores, benchmark performance validation, originality review, and polished merchant-facing support operations.