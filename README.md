# parthiv221197.github.io

Personal site of [Parthiv Patel](https://parthiv221197.github.io/) — Senior DevOps &amp; Security Engineer in Toronto.

Plain HTML, CSS, and a sprinkle of vanilla JS. No build step. Auto-deploys to GitHub Pages on push to `main` via the workflow in `.github/workflows/deploy.yml`.

## Structure

```
.
├── index.html                         # home
├── styles.css                         # all styles
├── script.js                          # tiny interactions (sticky nav, reveal-on-scroll)
├── assets/
│   ├── parthiv.jpeg                   # hero portrait + blog signature
│   └── Parthiv_Patel_Resume.pdf       # downloadable résumé
├── blog/
│   └── the-agentic-soc-trap.html      # individual posts
└── .github/workflows/deploy.yml       # auto-deploy
```

## Adding a new blog post

1. Copy `blog/the-agentic-soc-trap.html` to a new file: `blog/your-slug.html`.
2. Update the `<title>`, meta tags, `<h1 class="article__title">`, lede, date, and read-time at the top.
3. Write the post inside `<div class="prose"> ... </div>`. Available styles:
   - `<h2>`, `<h3>` for section headings
   - `<p>` for paragraphs
   - `<blockquote>` for pull quotes
   - `<ul>`, `<ol>` for lists
   - `<code>` for inline code
   - `<figure>` with an inline `<svg>` and `<figcaption>` for diagrams
4. Open `index.html` and update the Writing section's `post-feature` block to point to the new post (or add a new one alongside it).
5. Commit and push to `main` — the workflow rebuilds and redeploys within a minute.

```bash
git add .
git commit -m "post: add 'your-slug'"
git push
```

## Local preview

Just open `index.html` in a browser, or run a tiny local server:

```bash
python3 -m http.server 8000
# then open http://localhost:8000
```

## License

Code: MIT. Words and image: © Parthiv Patel.
