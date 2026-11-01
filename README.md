# Salone Stitch House — landing page

A lightweight, mobile-first website concept for a Sierra Leonean fashion business offering men's and women's clothing and custom tailoring. The homepage links to browsable collections and individual design enquiry pages.

## Files
- `index.html` — semantic page content, collection entry points, and detail view
- `styles.css` — responsive design system and layouts
- `script.js` — accessible mobile navigation, hash-based collection/product routing, catalogue data, and WhatsApp enquiry links
- `assets/` — locally stored SVG illustrations and men’s and women’s collection photos

## Collections and product enquiries
The static site uses hash routes so collection and product views can be bookmarked, refreshed, and navigated with browser back/forward without server-side routing:
- `#/collections/mens-fashion`
- `#/collections/womens-fashion`
- `#/collections/custom-tailoring`
- `#/products/mens-teal-formal-suit` (product IDs are defined in `script.js`)

The men’s collection contains 37 style-reference photos: 21 are stored in `assets/menswear/`, and 16 additional photos are sourced from `IMG/`. The 34 women’s style-reference photos are stored in `assets/womenswear/`. Each appears as an individual design in `script.js`. Update the `collections` data when the business confirms its designs, services, descriptions, and prices. Photos are references only; prices, availability, sizes, colours, and fabric options are not represented as confirmed. Product detail enquiry links offer both business WhatsApp numbers.

The custom-tailoring route provides men's and women's outfit references, enquiry guidance, and WhatsApp contact options. Its gallery reuses selected collection photos as inspiration only; it does not claim that a particular tailoring service, fabric, price, or completion time is confirmed. Update the tailoring gallery in `script.js` and the tailoring page content in `index.html` when the business confirms its services and terms.

## Run locally
Open `index.html` in a browser. No build step, package manager, or framework is required.

## Before public launch
1. Replace the remaining SVG illustrations with approved business photography where available.
2. Confirm actual product inventory, tailoring services, and prices before adding them to the catalogue.
3. Confirm the exact Lumley landmark and the accepted Orange Money, Afrimoney, and cash payment arrangements. Do not publish mobile money account details until verified with the owner.
4. Test WhatsApp links on Android, telephone links, keyboard navigation, contrast, and layout at narrow widths.
5. Measure transferred page weight on the hosted build and optimize the local photos as needed. The current `assets/` directory is about 8.68 MiB across 59 files; this is a disk-footprint measurement, not the initial page transfer size.

## Hosting
This is a static site and can be hosted on GitHub Pages, Netlify, or Vercel. No live public URL is created by this source package alone.
# SALONE-STITCH
