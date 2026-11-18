# Numbrawl static website — Version 4

Responsive static website for Numbrawl / P2D Studios. Built with HTML, CSS and a small JavaScript file. No application backend or database is required.

## Pages
- `index.html` — Home, game modes, difficulty, timer choices and download QR placeholder
- `about.html` — Combined P2D Studios and founder-led studio profile
- `contact.html` — Enquiry form and contact email
- `privacy-policy.html` — Privacy policy draft; must be checked against the final app SDKs/data practices before publication
- `terms.html` — Terms and conditions draft; requires final legal review
- `delete-account.html` — Account deletion instructions
- `download.html` — Download landing page placeholder
- `thank-you.html` — Form submission confirmation

## Assets
- `assets/numbrawl-app-icon.png` — supplied app icon
- `assets/numbrawl-game-logo.png` — supplied game logo
- `assets/practice-mode.jpg` — supplied Practice Mode screenshot
- `assets/pvp-mode.jpg` — supplied PvP screenshot

## Contact form setup
The form uses FormSubmit (`https://formsubmit.co/p2dstudio2026@gmail.com`) so the static site can deliver enquiries without a custom backend. Before public launch:
1. Deploy the site to a temporary URL.
2. Submit a test enquiry.
3. Complete FormSubmit's email activation/confirmation sent to `p2dstudio2026@gmail.com`.
4. Verify delivery and the thank-you redirect. Update `_next` in `contact.html` if the final domain differs from `https://kreeda.game/thank-you.html`.

The form provider processes submitted data. Add this third-party processing to the Privacy Policy before enabling the form publicly.

## Deployment
Upload the contents of this folder to a static host such as Cloudflare Pages. Connect `kreeda.game` only after checking existing DNS records and confirming the domain is not used for email or other services. Later, add the Numbrawl domain as a custom domain to the same deployment.

## Before publishing
- Replace QR placeholder with a real QR code after Google Play listing is live. The QR should point to a stable `/download` page on the final domain.
- Review Privacy Policy against the actual app behaviour, analytics, ads and SDK disclosures.
- Review Terms & Conditions and account deletion process.
- Confirm legal studio/operator name and contact details.
- Ensure all app-store listing links and support details are accurate.


V4: Three-mode marketing homepage, progressive difficulty and simplified top navigation. Events page remains accessible via footer.
