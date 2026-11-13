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

Honey Fork and Castleberry were added November 12, 2026, using matching current MLS listings (Realtracs #3635568 and Greater Alabama MLS #21470003). Each has three actual listing photos from Movoto and retains the owner-provided Zillow link. The Zillow detail pages could not be retrieved during this update; prices, acreage, and descriptions were checked against the matching MLS pages. Honey Fork sources: [Nashville MLS](https://www.nashvillesmls.com/listing/3635568-0-honey-fork-rd-indian-mound-tn-37079/) and [Movoto](https://www.movoto.com/indian-mound-tn/0-honey-fork-rd-indian-mound-tn-37079-571_3635568/). Castleberry sources: [Movoto](https://www.movoto.com/talladega-al/0-castleberry-rd-apt-na-talladega-al-35160-621_21470003/) and [Weichert](https://www.weichert.com/139360887/). Earlier listings keep their prior review dates.

Citronelle was added October 30, 2026, with details and five photo URLs verified on Zillow (MLS #7861504). The previous collection update was October 6, 2026: Burnside pricing was supplied by the owner; Hague details were verified against [Trulia](https://www.trulia.com/home/l4-overbrook-extension-rd-hague-ny-12836-465812103), My State MLS #12016076. Other listings retain their September 17 review. Hague displays four photos directly from the Zillow image URLs supplied by the owner. There is no automatic Zillow feed or full-page Zillow iframe. Cards and galleries use the listing photos and factual details, and link to the full Zillow listings for current pricing and availability. Source photo URLs are kept with each photo in `properties.js`.

1. 0 S West Bay Shr, Traverse City, MI — $324,900; 0.46 acres. The private shore frontage is **across the road** from the parcel.
2. 836 N 8th Ave, Laurel, MS — $225,000; 3 beds, 2 baths, 2,236 sq ft.
3. 200 Indian Creek Rd, Burnside, KY — $25,000; 2.95 acres.
4. L4 Overbrook Extension Rd, Hague, NY — $67,900; 1.27 acres.
5. 0 Smith Rd, Citronelle, AL — $38,700; 10.62 acres. Creek on the eastern side; city water available; septic required; mobile homes not permitted.

6. 0 Honey Fork Rd, Indian Mound, TN — $319,900; 55 acres. Two adjoining wooded tracts; electricity available; well and septic needed; no HOA.
7. 0 Castleberry Rd, Talladega, AL — $15,900; 1.6 acres. Water, electricity, and gas at the road; approved four-bedroom septic permit; no HOA; mobile homes not permitted.

Update the price/status, photography, details, and review date when listings change. Remove sold properties from the collection or update their display labels.

## Contact form

The pre-existing FormSubmit endpoint and recipient are preserved. The UI checks both HTTP status and the provider's success field, prevents duplicate requests, times out after 20 seconds, and keeps entered details if the submission cannot be confirmed.

Local tests used mocked provider responses; no test emails were sent. Recipient activation and actual email delivery have not been verified.

## Service statements

The three cards describe the company’s approach. They are service statements, without customer attributions, quotation marks, or testimonial claims.

## Preview verification

- Reviewed desktop layout and 390px / 320px phone layouts.
- Verified mobile navigation, property carousel, gallery controls, keyboard dismissal/focus handling, and all three listing links.
- 20 local integration checks passed for rendered cards, image loading, each gallery, required-field validation, provider success, provider rejection, HTTP failure, malformed JSON, offline handling, duplicate submission prevention, button recovery, and honeypot handling.
- JavaScript syntax checks passed. No browser console warnings/errors observed.
- Reduced-motion preferences are respected; section content stays available without animation support.

## Publication

The production site is https://www.nextsteplandbuyers.org/. GitHub Pages builds and deploys updates pushed to `main`. All assets use relative paths suitable for static hosting. Review local changes before pushing; confirm the GitHub Pages deployment succeeds afterward.
