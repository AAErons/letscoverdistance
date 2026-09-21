# Original artwork and crop map

Reuse the exact selectors in `reference/style.css`. Do not display either complete source as the main page layout. The poster remains available through the footer link.

## Files

| File | Source size | Used for |
| --- | --- | --- |
| `public/images/october-poster.png` | 564 × 834 px | Main heading, bottom Riga/fountain illustration, downloadable poster |
| `public/images/instagram-doodles.png` | 1414 × 985 px | Six decorative doodles |

## Poster artwork

- Heading: `.poster-heading` and `.poster-heading img`. Uses the original top-left 210 × 144 px region with a polygon clip; displayed at up to 420px wide on desktop, 360px on mobile. Grayscale/contrast and multiply blending isolate the black lettering visually. Preserve its accessible h1 name.
- Riga illustration: `.illustration` and `.illustration img`. Uses the bottom 145px of the poster, full width, in a 564:145 container. Preserve the original colours. It includes the fountain, trees and signpost.

## Instagram crops

Coordinates are source pixels measured from the top-left. `w` and `h` define the crop region, not the display size. The CSS also clips the region to avoid neighbouring content. Use the individual selectors and mobile overrides from the reference.

| Doodle / selector | x | y | w | h | Desktop display width |
| --- | ---: | ---: | ---: | ---: | ---: |
| `.doodle-pigeon` | 1061 | 271 | 46 | 53 | 62px |
| `.doodle-sun` | 1156 | 247 | 51 | 51 | 53px |
| `.doodle-coffee` | 869 | 281 | 48 | 73 | 39px |
| `.doodle-shoe` | 1076 | 363 | 52 | 54 | 58px |
| `.doodle-mountains` | 573 | 247 | 121 | 117 | 62px |
| `.doodle-heart` | 1097 | 335 | 22 | 26 | 19px |

A shared `.doodle` CSS rule computes background size and position from these variables, and applies multiply blending and a slight brightness adjustment. These are image crops, not newly drawn artwork.

When porting to Vite, change CSS `url('../public/images/instagram-doodles.png')` to `url('/images/instagram-doodles.png')`. Change HTML image and poster-link paths to `/images/october-poster.png`. Keep the original reference paths unchanged so the reference HTML still opens on its own.
