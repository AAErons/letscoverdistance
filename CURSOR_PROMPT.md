Build a complete, minimal, responsive website for “Let’s Cover Distance” (LCD), a social running and hiking club in Riga.

This folder contains the prepared assets and a working HTML/CSS reference of the page I want. Read `reference/index.html`, `reference/style.css`, and `ASSET_GUIDE.md` before implementing. Treat the local reference as the visual and content source of truth. It includes the exact poster lettering and Instagram doodles I have already approved. Recreate this page faithfully as a clean React application; do not redesign it into a generic fitness landing page.

## Implementation
- Use React, TypeScript, Vite and plain CSS. Choose compatible stable package versions and keep the dependency footprint small.
- This folder currently contains assets and reference files, not an initialized app. Set up the application in this same folder without deleting or overwriting `public/images`, `reference`, or these instructions. Avoid an initializer that refuses nonempty directories or clears their contents; create configuration files directly if necessary.
- Use reusable components such as Header, Hero, PosterHeading, Doodle, ScheduleCard, OctoberCalendar and Footer.
- Store the October event data in a typed data file so dates are easy to change later.
- There is one page. No backend, login, database, pricing, contact form, newsletter, gallery, extra sections or invented social links.
- Use local images from `/images/`. Never make the page depend on the hosted ChatGPT site or remote image URLs.
- Keep the reference files for comparison, but do not merely iframe the reference page.

## Visual direction
A friendly, handmade autumn running-club poster translated into a spacious website. Cream paper, black ink, bold condensed headings, little original illustrated doodles and gently irregular pastel labels. Keep it simple and basic; leave room for additions later.

Use the existing CSS as the baseline, including its geometry and image-crop definitions. Palette:
- Paper: #f6ecda
- Ink: #25271f
- Lavender: #aaa0df
- Pink: #efab9e
- Sage green: #b8cba2
- Soft blue: #a4c0e8

Fonts: Barlow Condensed for display labels, DM Sans for body/navigation, Patrick Hand for the handwritten note. Use suitable local fallbacks if web fonts fail. The main “LET’S COVER DISTANCE” heading is the ORIGINAL ARTWORK from the poster, not any of these fonts. Preserve its exact three-line layout, letterforms and tilt using the existing crop. Give the h1 an accessible name. Do not replace it with an approximate font or regenerate it.

Light, subtle paper grain. Thin dark borders. Small, slightly irregular rounded corners. No glossy gradients, heavy shadows, stock photos, glass effects or giant rounded dashboard tiles. Do not add more doodles or animations than the reference.

## Layout and content
1. Header: LCD wordmark and “SOCIAL CLUB · RIGA” left. “What’s on” anchor and outlined “Our meeting spot ↗” link right. Thin bottom rule. Meeting link: https://www.google.com/maps/search/?api=1&query=Vermanes+darzs+fountain+Riga (new tab, rel=noopener).
2. Hero: two columns on desktop, stacked on mobile. Left: small “A LITTLE MOVEMENT. GOOD COMPANY.” label, original poster heading, “Same people. Different distances. / More good stories.” and a dark “Find your next outing ↘” anchor to the schedule. Right: “Runs. Hikes. Friends. / See you outside!” handwritten note, the original Riga/fountain illustration from the poster’s bottom, and “A FEW KILOMETRES. A LOT TO TALK ABOUT.”
3. Schedule: “FRESH AIR IS ON THE CALENDAR”, “October at LCD” with a gently rotated lavender October label, and “2026 · RIGA, LATVIA”. Three equal cards sharing an outer border on desktop; one column on mobile.
   - Monday mornings: blue “6 @ 6”, “Start the week on the right foot.”, 6 km, 06:00, “Vērmanes Dārzs fountain”. Note: “A slower start on 26 Oct — no morning run.”
   - Thursday evenings: pink “5 KM”, “Same routes. New conversations.”, 5 km, 19:30, same meeting point. Note: “Going a little further: 10 km on 15 Oct.”
   - Weekend wanders: green “OFF THE ROAD”, “A change of scenery, together.”, 03 OCT Ķemeri hike; 17 OCT Amatas dabas taka; 25 OCT Sigulda uphill day. Note: “Times & meeting details to be announced.”
4. Native accessible details/summary expander titled “All October dates”, initially closed. Reproduce all five weekly groups from reference/index.html. Preserve the boundary date 28 September, Thursday 15 October’s 10 km distance, Sunday 25 October’s 1 km uphill repeats and Monday 26 October’s rest day. All October Thursday runs start at 19:30. Do not substitute 19:00 from the older Instagram posts. Weekend start times remain TBA.
5. Quiet footer: club name and a small illustrated heart; “Runs · Hikes · Friends · Good stories”; “The October poster ↗” links to `/images/october-poster.png`.

## Doodles and image handling
The two supplied PNGs are the ORIGINAL full source images, not transparent cutouts. The current design displays selected parts using CSS crops, clip paths and blend modes. Reuse the exact crop definitions from reference/style.css, updating asset paths from `../public/images/` to `/images/`. Do not show the whole Instagram grid on the website.
- Pigeon: small accent near the heading.
- Sun: small accent near the right hero illustration.
- Coffee cup: Monday card corner.
- Running shoe: Thursday card corner.
- Mountains: weekend card corner.
- Heart: footer.
Keep them decorative (aria-hidden, noninteractive, pointer-events:none), small and separate from readable text. Do not draw substitutes in SVG or replace them with emoji. Preserve their existing colours and handwritten character. Check crop edges to ensure no adjacent text/photos leak into the doodles.

## Responsive behaviour and accessibility
- Main wrapper max width 1160px, with generous gutters (40px desktop, 18px small mobile).
- Preserve the reference's desktop two-column hero and three-column schedule. At 650px and below, stack both.
- Keep the heading within its container and doodles clear of the heading and labels at 375, 768 and 1440px widths.
- On small screens hide the “What’s on” nav link and handwritten hero note, keep the meeting link and all event information.
- Use readable text; do not shrink important information just to force it onto one line.
- Semantic headings, visible keyboard focus, reduced-motion support, and native keyboard-operable calendar disclosure.
- No horizontal overflow. All links must work. Any smooth scrolling must respect prefers-reduced-motion.

## Completion
Install dependencies, build the app, resolve actual errors, and start the local development preview. Verify mobile and desktop layouts if browser tools are available. Check image crops, no overlapping text, anchors, map link, poster link and calendar toggle. Do not claim visual testing if it was not available. Add a short README with the local run and build commands. Keep this task focused on recreating the supplied page; no speculative features and no deployment unless I request it.
