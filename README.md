# Portfolio

Personal site of [Parthiv Patel](https://parthiv221197.github.io/Portfolio/) — Senior Security Automation Engineer in Toronto.

Plain HTML, CSS, and vanilla JS. No build step. Auto-deploys to GitHub Pages on push to `main` via `.github/workflows/deploy.yml`.

## Structure

```
.
├── index.html                            # home (hero, timeline, projects, writing, contact)
├── styles.css                            # design system + all component styles
├── script.js                             # theme toggle, photo cycle, marquee,
│                                         # timeline, scroll progress, GitHub projects
├── blog/
│   ├── index.html                        # blog index (lists all posts)
│   └── the-agentic-soc-trap.html         # individual post
├── assets/
│   ├── parthiv.jpeg                      # hero portrait
│   ├── Parthiv_Patel_Resume.pdf          # downloadable résumé
│   ├── xsoar.svg                         # marquee brand mark
│   ├── agentic-soc-illustration.svg      # blog hero illustration
│   └── logos/                            # local timeline + marquee logo files
└── .github/workflows/deploy.yml          # auto-deploy on push to main
```

## Adding a new blog post

1. Copy `blog/the-agentic-soc-trap.html` to `blog/your-slug.html`.
2. Update the `<title>`, meta tags, `<h1 class="article__title">`, lede, date, and read-time at the top.
3. Write the post inside `<div class="prose"> ... </div>`. Available styles: `<h2>`, `<h3>`, `<p>`, `<blockquote>`, `<ul>`, `<ol>`, `<code>`, `<figure>`.
4. Add a `<li>` entry in `blog/index.html` pointing to the new post.
5. Update the featured post block in `index.html` (Writing section) if this is the new highlight.
6. Commit and push to `main` — the workflow redeploys within a minute.

```bash
git add .
git commit -m "post: add 'your-slug'"
git push
```

## Local preview

```bash
python3 -m http.server 8000
# open http://localhost:8000
```

## License

Code: MIT. Words and images: © Parthiv Patel.
