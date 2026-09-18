# Next Step Land Buyers

A one-page static property website. No package installation or build step is required.

## Preview

From this folder, run:

```sh
python3 -m http.server 8765 --bind 127.0.0.1
```

Then open http://127.0.0.1:8765 in your browser.

## Edit the website

- `index.html`: sections, copy, contact form, and gallery structure.
- `styles.css`: white, navy, blue, and gold theme; responsive layouts; motion.
- `properties.js`: the property collection, prices, descriptions, photo paths, source links, and last-reviewed date. Add another object to the array to add a property; the cards and gallery update automatically.
- `script.js`: property cards and dialogs, mobile carousel/menu, reveals, and form handling.
- `assets/`: nine actual listing photos, downloaded from the linked Zillow listings.
- `CNAME`: the existing custom domain, `www.nextsteplandbuyers.org`.

## Listing data

The properties are a manually maintained snapshot reviewed September 17, 2026. There is no automatic Zillow feed or full-page Zillow iframe. Cards and galleries use the listing photos and factual details, and link to the full Zillow listings for current pricing and availability. Source photo URLs are kept with each photo in `properties.js`.

1. 0 S West Bay Shr, Traverse City, MI — $324,900; 0.46 acres. The private shore frontage is **across the road** from the parcel.
2. 836 N 8th Ave, Laurel, MS — $225,000; 3 beds, 2 baths, 2,236 sq ft.
3. 200 Indian Creek Rd, Burnside, KY — $29,000; 2.95 acres.

Update the price/status, photography, details, and review date when listings change. Remove sold properties from the collection or update their display labels.

## Contact form

The pre-existing FormSubmit endpoint and recipient are preserved. The UI checks both HTTP status and the provider's success field, prevents duplicate requests, times out after 20 seconds, and keeps entered details if the submission cannot be confirmed.

Local tests used mocked provider responses; no test emails were sent. Recipient activation and actual email delivery have not been verified.

## Sample stories

The three quote cards are visibly labeled as illustrative examples, not actual customer testimonials. Replace them with permissioned real customer quotes when available.

## Preview verification

- Reviewed desktop layout and 390px / 320px phone layouts.
- Verified mobile navigation, property carousel, gallery controls, keyboard dismissal/focus handling, and all three listing links.
- 20 local integration checks passed for rendered cards, image loading, each gallery, required-field validation, provider success, provider rejection, HTTP failure, malformed JSON, offline handling, duplicate submission prevention, button recovery, and honeypot handling.
- JavaScript syntax checks passed. No browser console warnings/errors observed.
- Reduced-motion preferences are respected; section content stays available without animation support.

## Publication

The production site is https://www.nextsteplandbuyers.org/. GitHub Pages builds and deploys updates pushed to `main`. All assets use relative paths suitable for static hosting. Review local changes before pushing; confirm the GitHub Pages deployment succeeds afterward.
