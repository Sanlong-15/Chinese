# Character Memory Lab — Boya 16 & GCP8 L1

A single-page Chinese vocabulary study app (spaced repetition, flashcards, radical/sound
families, structure reference, cloze practice). Runs entirely in the browser; progress is
stored in `localStorage`.

## Project structure

```
.
├── index.html        # Markup and page shell only
├── css/
│   └── styles.css     # All styling (design tokens live in :root)
└── js/
    ├── data.js         # Lesson dataset — const DB = { ... } (see markers below)
    └── app.js           # Application logic: scheduler, rendering, views, settings
```

Previously everything lived in one `Boya16-GCP8L1-Combined.html`; it has been split into
the files above with no behavioural change.

## Running locally

The app loads `js/*` and `css/*` as separate files, so open it through a web server
rather than `file://`:

```bash
python3 -m http.server 8777
```

Then visit http://localhost:8777/index.html

## Updating the lesson data

Edit **only** the object between the two markers in `js/data.js`:

```js
const DB = /*__DB_JSON_START__*/{ ... }/*__DB_JSON_END__*/;
```

Keep `const DB = ` and the trailing `;` exactly as they are. `app.js` reads `DB` as a
global, so `data.js` must stay loaded before `app.js` in `index.html`.

## Load order

`index.html` loads `data.js` first, then `app.js`. `app.js` runs an IIFE on load that
wires up the views and renders the initial screen.
