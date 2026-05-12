/* =========================================================
   Parthiv Patel · Portfolio v8 interactions
   - Sticky nav
   - Mobile menu
   - Reveal-on-scroll
   - Marquee with brand-correct logos (Simple Icons in brand color
     for tools that have them, Google favicons for the rest)
   - Cursor-tracking gradient on hero
   - Timeline scroll-fill animation
   - Live GitHub projects with language-color dots and 3D tilt
   - Top scroll-progress bar

   No third-party libraries. No eval. No inline event handlers.
   All external assets requested over HTTPS only.
   ========================================================= */
(function () {
  "use strict";

  // ---- Year -------------------------------------------------
  var yr = document.getElementById("year");
  if (yr) yr.textContent = new Date().getFullYear();

  // ---- Theme toggle (light / dark) --------------------------
  // The initial theme is applied by an inline script in <head> to avoid
  // flash of unstyled content. This binding handles user-driven toggling
  // and keeps the system-preference listener live.
  (function () {
    var themeBtn = document.getElementById("themeToggle");
    var root = document.documentElement;

    function setTheme(mode, persist) {
      root.classList.toggle("dark", mode === "dark");
      if (persist) {
        try { localStorage.setItem("pp-theme", mode); } catch (e) {}
      }
    }

    if (themeBtn) {
      themeBtn.addEventListener("click", function () {
        var nextDark = !root.classList.contains("dark");
        setTheme(nextDark ? "dark" : "light", true);
      });
    }

    // Track system preference changes for users who haven't manually toggled.
    // Inherit "light" only if the user has explicitly set light at the OS
    // level; otherwise default to dark.
    if (window.matchMedia) {
      var mql = window.matchMedia("(prefers-color-scheme: light)");
      var onSysChange = function (e) {
        var stored;
        try { stored = localStorage.getItem("pp-theme"); } catch (er) {}
        if (!stored) setTheme(e.matches ? "light" : "dark", false);
      };
      if (mql.addEventListener) mql.addEventListener("change", onSysChange);
      else if (mql.addListener) mql.addListener(onSysChange);
    }
  })();

  // ---- Hero photo cycle (original / sketch / duotone / vintage)
  (function () {
    var img = document.getElementById("heroPhoto");
    var cap = document.getElementById("heroPhotoCaption");
    if (!img) return;

    var variants = [
      { name: "Portrait",   filter: "" },
      { name: "Sketch",     filter: "url(#fxSketch)" },
      { name: "Editorial",  filter: "url(#fxEditorial)" }
    ];
    var idx = 0;

    function setVariant(i) {
      var v = variants[i];
      img.style.filter = v.filter;
      if (cap) {
        cap.style.opacity = "0";
        setTimeout(function () {
          cap.textContent = v.name;
          cap.style.opacity = "1";
        }, 200);
      }
    }

    setInterval(function () {
      idx = (idx + 1) % variants.length;
      setVariant(idx);
    }, 5500);
  })();

  // ---- Sticky nav -------------------------------------------
  var nav = document.getElementById("topnav");
  if (nav) {
    var setNavState = function () {
      if (window.scrollY > 14) nav.classList.add("is-scrolled");
      else nav.classList.remove("is-scrolled");
    };
    window.addEventListener("scroll", setNavState, { passive: true });
    setNavState();
  }

  // ---- Mobile menu ------------------------------------------
  var menuBtn = document.getElementById("menuBtn");
  if (menuBtn && nav) {
    menuBtn.addEventListener("click", function () {
      var open = nav.classList.toggle("is-open");
      menuBtn.setAttribute("aria-expanded", String(open));
    });
    nav.querySelectorAll(".topnav__links a").forEach(function (a) {
      a.addEventListener("click", function () {
        nav.classList.remove("is-open");
        menuBtn.setAttribute("aria-expanded", "false");
      });
    });
  }

  // ---- Top scroll-progress bar ------------------------------
  var progress = document.getElementById("scrollProgress");
  if (progress) {
    var updateProgress = function () {
      var max = document.documentElement.scrollHeight - window.innerHeight;
      var pct = max > 0 ? (window.scrollY / max) * 100 : 0;
      progress.style.width = pct + "%";
    };
    window.addEventListener("scroll", updateProgress, { passive: true });
    window.addEventListener("resize", updateProgress);
    updateProgress();
  }

  // ---- Reveal-on-scroll -------------------------------------
  var revealTargets = [
    ".hero__text > *", ".hero__photo",
    ".post-feature", ".writing__more",
    ".contact__inner > *",
    ".section__head > *",
    ".post-list__item"
  ];
  var revealEls = [].slice.call(document.querySelectorAll(revealTargets.join(",")));
  revealEls.forEach(function (el) { el.classList.add("reveal"); });

  if ("IntersectionObserver" in window) {
    var revealIO = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) {
          var delay = (parseInt(e.target.dataset.idx, 10) || 0) * 60;
          setTimeout(function () { e.target.classList.add("is-in"); }, delay);
          revealIO.unobserve(e.target);
        }
      });
    }, { threshold: 0.1, rootMargin: "0px 0px -40px 0px" });
    revealEls.forEach(function (el, i) {
      el.dataset.idx = String(Math.min(i % 5, 4));
      revealIO.observe(el);
    });
  } else {
    revealEls.forEach(function (el) { el.classList.add("is-in"); });
  }

  // ---- Hero cursor-tracking gradient ------------------------
  var hero = document.getElementById("hero");
  if (hero && window.matchMedia("(pointer: fine)").matches) {
    hero.addEventListener("mousemove", function (e) {
      var rect = hero.getBoundingClientRect();
      var x = ((e.clientX - rect.left) / rect.width) * 100;
      var y = ((e.clientY - rect.top) / rect.height) * 100;
      hero.style.setProperty("--mx", x + "%");
      hero.style.setProperty("--my", y + "%");
    });
  }

  // ============================================================
  // MARQUEE — brand-correct logos
  // Simple Icons in brand color for tools they cover.
  // Google favicons for company-branded tools they don't cover.
  // ============================================================
  var marqueeTrack = document.getElementById("marqueeTrack");
  if (marqueeTrack) {
    var si = function (slug, hex) { return "https://cdn.simpleicons.org/" + slug + "/" + hex; };
    var fav = function (domain) { return "https://www.google.com/s2/favicons?domain=" + domain + "&sz=128"; };

    // Marquee list — every entry has a verified, brand-correct logo asset.
    // Tools without a clean brand mark are intentionally excluded (they
    // appear in the timeline copy and résumé instead).
    var stack = [
      { name: "Python",          src: si("python", "3776AB"),          kind: "si" },
      { name: "Java",            src: si("openjdk", "ED8B00"),         kind: "si" },
      { name: "JavaScript",      src: si("javascript", "F7DF1E"),      kind: "si" },
      { name: "Neo4j",           src: si("neo4j", "4581C3"),           kind: "si" },
      { name: "Docker",          src: si("docker", "2496ED"),          kind: "si" },
      { name: "Azure",           src: "assets/logos/azure.png",        kind: "local" },
      { name: "GitHub",          src: si("github", "181717"),          kind: "si" },
      { name: "GitHub Actions",  src: si("githubactions", "2088FF"),   kind: "si" },
      { name: "Linux",           src: si("linux", "FCC624"),           kind: "si" },
      { name: "Snyk",            src: si("snyk", "4C4A73"),            kind: "si" },
      { name: "Ansible",         src: si("ansible", "EE0000"),         kind: "si" },
      { name: "Cortex XSOAR",    src: "assets/xsoar.svg",              kind: "local" },
      { name: "Wiz",             src: "assets/logos/wiz-square.jpg",   kind: "local" },
      { name: "Devo",            src: "assets/logos/devo.png",         kind: "local" }
    ];

    var buildItem = function (t) {
      var item = document.createElement("span");
      item.className = "marquee__item";
      var img = document.createElement("img");
      img.src = t.src;
      img.alt = "";
      img.width = 22; img.height = 22;
      img.loading = "lazy";
      img.referrerPolicy = "no-referrer";
      // Tag favicons so dark mode can give them a white backdrop for readability
      if (t.kind === "fav") img.className = "marquee__item-fav";
      img.addEventListener("error", function () { img.style.display = "none"; });
      var label = document.createElement("span");
      label.textContent = t.name;
      item.appendChild(img);
      item.appendChild(label);
      return item;
    };
    var buildSep = function () {
      var s = document.createElement("span");
      s.className = "marquee__sep";
      return s;
    };

    // Two passes for seamless infinite scroll
    [0, 1].forEach(function () {
      stack.forEach(function (t) {
        marqueeTrack.appendChild(buildItem(t));
        marqueeTrack.appendChild(buildSep());
      });
    });
  }

  // ============================================================
  // TIMELINE — line fill via scroll, item reveal via IntersectionObserver
  //   - Line fill is a smooth percentage tied to scroll position
  //   - Each item's reveal is an isolated IO so animations always trigger
  //     reliably regardless of scroll speed or initial viewport position
  // ============================================================
  var tl = document.getElementById("timelineEl");
  var tlFill = document.getElementById("timelineFill");
  var tlItems = [].slice.call(document.querySelectorAll(".timeline__item"));

  if (tl && tlItems.length) {
    // 1) Per-item reveal — BIDIRECTIONAL.
    //    Items fade in when they enter the viewport AND fade out when
    //    they leave. We do NOT call unobserve so the IO keeps firing on
    //    both directions of scroll.
    if ("IntersectionObserver" in window) {
      var tlIO = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) entry.target.classList.add("is-in");
          else                       entry.target.classList.remove("is-in");
        });
      }, {
        rootMargin: "0px 0px -80px 0px",
        threshold: 0.15
      });
      tlItems.forEach(function (item) { tlIO.observe(item); });
    } else {
      tlItems.forEach(function (item) { item.classList.add("is-in"); });
    }

    // 2) Line fill: tracks scroll progress through the timeline section
    if (tlFill) {
      var rafId = null;
      var updateFill = function () {
        var rect = tl.getBoundingClientRect();
        var triggerY = window.innerHeight * 0.55;
        var top = rect.top;
        var bottom = rect.bottom;
        var pct;
        if (top > triggerY)        pct = 0;
        else if (bottom < triggerY) pct = 100;
        else                        pct = ((triggerY - top) / (bottom - top)) * 100;
        tlFill.style.height = pct + "%";
      };
      var onScroll = function () {
        if (rafId) return;
        rafId = window.requestAnimationFrame(function () {
          updateFill();
          rafId = null;
        });
      };
      window.addEventListener("scroll", onScroll, { passive: true });
      window.addEventListener("resize", updateFill);
      updateFill();
    }
  }

  // ============================================================
  // GITHUB PROJECTS — live fetch, language colors, 3D tilt
  // ============================================================
  var grid = document.getElementById("projectsGrid");
  if (grid) {
    // GitHub's language colors (curated, matches github.com)
    var langColors = {
      "Python":     "#3572A5",
      "JavaScript": "#f1e05a",
      "TypeScript": "#3178c6",
      "Java":       "#b07219",
      "CSS":        "#563d7c",
      "HTML":       "#e34c26",
      "Shell":      "#89e051",
      "Go":         "#00ADD8",
      "Ruby":       "#701516",
      "C++":        "#f34b7d",
      "C":          "#555555",
      "C#":         "#178600",
      "Rust":       "#dea584",
      "Kotlin":     "#A97BFF",
      "Swift":      "#F05138",
      "PowerShell": "#012456",
      "Dockerfile": "#384d54"
    };
    var langDot = function (lang) {
      return langColors[lang] || "#a4a59e";
    };

    // Repos to hide from the grid (old/profile/duplicates)
    var hidden = { "Parthiv221197": 1, "Portfolio": 1, "React-webpage": 1, "WisdomPets": 1, "Meeting": 1 };

    // Per-project glyph that hints at what the repo is about. Falls back to
    // the first letter of the repo name if no mapping exists.
    var projectIcon = {
      "llm-sneak":          "🥷",
      "Scapy_Recon_Master": "🛰️",
      "Queue_Simulator":    "⏳",
      "Java_REST_Project":  "☕",
      "Java_Database":      "🗄️",
      "Android-Projects":   "🤖"
    };

    // Friendly names for repos with no description
    var fallbackDesc = {
      "llm-sneak":         "Security scanner for large language models.",
      "Scapy_Recon_Master":"Network reconnaissance toolkit built on Scapy.",
      "Queue_Simulator":   "Java implementation of queue scheduling algorithms.",
      "Java_REST_Project": "REST API project in Java for backend practice.",
      "Java_Database":     "Database-backed Java project exploring JDBC.",
      "Android-Projects":  "Collection of early Android Studio projects."
    };

    var formatDate = function (iso) {
      var d = new Date(iso);
      return d.toLocaleDateString("en-US", { month: "short", year: "numeric" });
    };

    var attachTilt = function (card) {
      if (!window.matchMedia("(pointer: fine)").matches) return;
      var inner = card.querySelector(".project-card__inner") || card;
      card.addEventListener("mousemove", function (e) {
        var rect = card.getBoundingClientRect();
        var x = (e.clientX - rect.left) / rect.width;
        var y = (e.clientY - rect.top) / rect.height;
        var rx = (y - 0.5) * 4;
        var ry = (x - 0.5) * -4;
        inner.style.transform = "perspective(900px) rotateX(" + rx + "deg) rotateY(" + ry + "deg) translateY(-3px)";
      });
      card.addEventListener("mouseleave", function () {
        inner.style.transform = "";
      });
    };

    var renderRepos = function (repos) {
      grid.innerHTML = "";
      if (!repos.length) {
        grid.innerHTML = '<div class="projects__empty">No public projects to show.</div>';
        return;
      }
      repos.forEach(function (r) {
        var a = document.createElement("a");
        a.className = "project-card";
        a.href = r.html_url;
        a.target = "_blank";
        a.rel = "noopener noreferrer";

        var inner = document.createElement("div");
        inner.className = "project-card__inner";

        var head = document.createElement("div");
        head.className = "project-card__head";
        var icon = document.createElement("span");
        icon.className = "project-card__icon";
        icon.textContent = projectIcon[r.name] || (r.name[0] || "?").toUpperCase();
        var name = document.createElement("h3");
        name.className = "project-card__name";
        name.textContent = r.name;
        head.appendChild(icon); head.appendChild(name);

        var desc = document.createElement("p");
        desc.className = "project-card__desc";
        desc.textContent = r.description || fallbackDesc[r.name] || "No description provided.";

        var meta = document.createElement("div");
        meta.className = "project-card__meta";

        if (r.language) {
          var langSpan = document.createElement("span");
          langSpan.className = "project-card__lang";
          var dot = document.createElement("span");
          dot.className = "project-card__lang-dot";
          dot.style.background = langDot(r.language);
          var langText = document.createElement("span");
          langText.textContent = r.language;
          langSpan.appendChild(dot); langSpan.appendChild(langText);
          meta.appendChild(langSpan);
        }

        if (r.stargazers_count > 0) {
          var stars = document.createElement("span");
          stars.className = "project-card__stars";
          stars.innerHTML = '<svg width="11" height="11" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true"><path d="M8 .25a.75.75 0 0 1 .673.418l1.882 3.815 4.21.612a.75.75 0 0 1 .416 1.279l-3.046 2.97.719 4.192a.75.75 0 0 1-1.088.791L8 12.347l-3.766 1.98a.75.75 0 0 1-1.088-.79l.72-4.194L.818 6.374a.75.75 0 0 1 .416-1.28l4.21-.611L7.327.668A.75.75 0 0 1 8 .25z"/></svg> ' + r.stargazers_count;
          meta.appendChild(stars);
        }

        var dateSpan = document.createElement("span");
        dateSpan.style.marginLeft = "auto";
        dateSpan.style.color = "var(--ink-4)";
        dateSpan.textContent = formatDate(r.updated_at);
        meta.appendChild(dateSpan);

        var arrow = document.createElement("span");
        arrow.className = "project-card__arrow";
        arrow.setAttribute("aria-hidden", "true");
        arrow.textContent = "↗";

        inner.appendChild(head);
        inner.appendChild(desc);
        inner.appendChild(meta);
        inner.appendChild(arrow);
        a.appendChild(inner);

        grid.appendChild(a);
        attachTilt(a);
      });
    };

    var fetchRepos = function () {
      // 5-minute localStorage cache to be polite to GitHub's rate limit
      var cacheKey = "ppgh_v1";
      var cacheTtl = 5 * 60 * 1000;
      try {
        var raw = window.localStorage.getItem(cacheKey);
        if (raw) {
          var cached = JSON.parse(raw);
          if (cached && (Date.now() - cached.t) < cacheTtl) {
            renderRepos(cached.d);
            return;
          }
        }
      } catch (e) { /* ignore */ }

      fetch("https://api.github.com/users/Parthiv221197/repos?sort=updated&per_page=30", {
        headers: { "Accept": "application/vnd.github+json" },
        referrerPolicy: "no-referrer"
      })
        .then(function (r) {
          if (!r.ok) throw new Error("GitHub API " + r.status);
          return r.json();
        })
        .then(function (data) {
          var visible = data
            .filter(function (r) { return !r.fork && !hidden[r.name]; })
            .sort(function (a, b) {
              if (b.stargazers_count !== a.stargazers_count) {
                return b.stargazers_count - a.stargazers_count;
              }
              return new Date(b.updated_at) - new Date(a.updated_at);
            })
            .slice(0, 6);

          renderRepos(visible);

          try {
            window.localStorage.setItem(cacheKey, JSON.stringify({ t: Date.now(), d: visible }));
          } catch (e) { /* storage may be unavailable */ }
        })
        .catch(function () {
          // Fallback if GitHub API fails or rate-limits
          var fallback = [
            { name: "llm-sneak", description: fallbackDesc["llm-sneak"], language: "Python", stargazers_count: 1, updated_at: "2026-04-27", html_url: "https://github.com/Parthiv221197/llm-sneak" },
            { name: "Scapy_Recon_Master", description: fallbackDesc["Scapy_Recon_Master"], language: "Python", stargazers_count: 0, updated_at: "2022-09-02", html_url: "https://github.com/Parthiv221197/Scapy_Recon_Master" },
            { name: "Queue_Simulator", description: fallbackDesc["Queue_Simulator"], language: "Java", stargazers_count: 0, updated_at: "2023-02-27", html_url: "https://github.com/Parthiv221197/Queue_Simulator" },
            { name: "Java_REST_Project", description: fallbackDesc["Java_REST_Project"], language: "Java", stargazers_count: 0, updated_at: "2022-09-02", html_url: "https://github.com/Parthiv221197/Java_REST_Project" }
          ];
          renderRepos(fallback);
        });
    };

    fetchRepos();
  }

})();
