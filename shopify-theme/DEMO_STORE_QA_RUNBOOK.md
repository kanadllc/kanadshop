# Demo Store QA Runbook

Last updated: 2026-04-18

This runbook turns the resubmission checklist into a concrete review pass on a populated Shopify demo store.

## Goal

Review the upgraded theme on real store data across desktop and mobile before the next Theme Store submission.

## Required storefronts

- Home
- Product
- Collection
- Cart
- Search
- Contact
- Support

## Devices

- Desktop: one modern Chromium browser and Safari or Firefox
- Mobile: iPhone-width viewport and Android-width viewport

## 1. Homepage review

- Confirm hero, trust row, category cards, and featured collection all feel curated rather than generic.
- Confirm default content has been fully replaced with realistic demo-store copy and assets.
- Confirm spacing, image cropping, and call-to-action hierarchy remain strong on mobile.

## 2. Product page review

- Test products with one option, multiple options, swatches, and unavailable variants.
- Confirm media thumbnails, variant switching, pricing, compare-at pricing, and subscription messaging work correctly.
- Confirm support guidance, vendor context, and highlight chips still read credibly with real copy.

## 3. Collection page review

- Test long filter labels, multiple filters, zero-result states, and sort changes.
- Confirm filter checkboxes, price ranges, active filter chips, and clear-filter flows behave correctly.
- Confirm the hero area still looks intentional with realistic collection content and imagery.

## 4. Cart review

- Test empty cart, mixed cart, discounted cart, subscription cart, and high-quantity cart.
- Confirm line totals, remove actions, quantity updates, note field, and checkout CTAs all behave correctly.
- Confirm support and reassurance copy in the summary matches the real support workflow.

## 5. Search review

- Test high-intent product searches, vague searches, no-results queries, and mixed-result queries.
- Confirm filters refine results correctly and auto-submit behavior feels predictable.
- Confirm product, article, page, and collection results each remain readable and visually consistent.

## 6. Accessibility review

- Run a keyboard-only pass through header navigation, category menu, predictive search, filters, cart, and disclosures.
- Confirm visible focus states remain clear on final merchant-configured colors.
- Run automated accessibility scans on home, product, collection, cart, and search.

## 7. Lighthouse and performance review

- Run Lighthouse on home, product, and collection pages using realistic populated data.
- Record desktop and mobile scores.
- Capture any regressions caused by image size, layout shifts, third-party apps, or demo data.

## 8. Support workflow review

- Submit test requests through contact and support forms.
- Confirm delivery to the real support inbox.
- Confirm autoresponder, SLA messaging, and escalation notes align with what the theme promises.

## 9. Originality review

- Compare the demo store against Shopify free themes and several Theme Store leaders.
- Answer these questions honestly:
  - Does the theme have a distinct merchandising voice?
  - Do the key templates feel more deliberate than baseline free-theme output?
  - Would a reviewer immediately recognize a clear point of view?

## Exit gate

Do not resubmit until all defects found in this runbook are either fixed in code, fixed in demo content, or consciously accepted with a clear reason.