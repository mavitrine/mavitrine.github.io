/* ==========================================================================
   mavitrine — le compositeur
   Deux axes, exactement comme le système de génération :
     catégorie → quelles sections, dans quel ordre, quel appel à l'action
     ambiance  → le jeu de jetons (couleurs, typographie, rythme)
   Les commerces présentés sont fictifs et servent uniquement d'illustration.
   ========================================================================== */
(function () {
  "use strict";

  /* ------------------------------------------------------------ Données */

  var CATEGORIES = [
    {
      id: "restaurant",
      label: "Restaurant",
      slug: "le-comptoir-saint-jean",
      nom: "Le Comptoir Saint-Jean",
      eyebrow: "Cuisine du marché · Trois-Rivières",
      titre: "Ce que le marché donne, cuisiné le jour même.",
      sous: "Une ardoise qui change chaque semaine, une cave courte et bien choisie, et 34 places à ne pas manquer.",
      cta: "Réserver une table",
      liens: ["Menu", "Heures", "Galerie"],
      sections: [
        { type: "liste", titre: "L'ardoise de la semaine", items: [
          { n: "Betteraves rôties", d: "chèvre frais, noisettes, miel de sarrasin", p: "14 $" },
          { n: "Truite de la Mauricie", d: "beurre blanc à l'oseille, pommes de terre grelots", p: "31 $" },
          { n: "Jarret d'agneau", d: "braisé six heures, gremolata", p: "34 $" },
          { n: "Tarte au sucre", d: "crème double de la ferme Bellemare", p: "11 $" }
        ]},
        { type: "heures", titre: "Nous sommes ouverts", items: [
          { j: "Mercredi — jeudi", h: "17 h 30 – 22 h" },
          { j: "Vendredi — samedi", h: "17 h 30 – 23 h" },
          { j: "Dimanche", h: "10 h – 14 h (brunch)" },
          { j: "Lundi — mardi", h: "fermé" }
        ], alt: true },
        { type: "galerie", titre: "La salle et l'assiette" },
        { type: "contact", titre: "Nous trouver", items: [
          { j: "Adresse", h: "412, rue des Forges, Trois-Rivières" },
          { j: "Téléphone", h: "819 555-0142" },
          { j: "Réservations", h: "en ligne ou par téléphone" }
        ], alt: true }
      ]
    },
    {
      id: "salon",
      label: "Salon & beauté",
      slug: "studio-mireille",
      nom: "Studio Mireille",
      eyebrow: "Coiffure & soins · Sherbrooke",
      titre: "Une coupe qui tient jusqu'à la prochaine visite.",
      sous: "Quatre coiffeuses d'expérience, des produits sans sulfates, et le temps de faire les choses correctement.",
      cta: "Prendre rendez-vous",
      liens: ["Services", "Galerie", "Avis"],
      sections: [
        { type: "liste", titre: "Services et tarifs", items: [
          { n: "Coupe femme", d: "consultation, lavage, coupe, coiffage", p: "65 $" },
          { n: "Coupe homme", d: "tondeuse et ciseaux, contours", p: "38 $" },
          { n: "Coloration complète", d: "à partir de, selon la longueur", p: "120 $" },
          { n: "Mèches balayées", d: "à partir de, selon la longueur", p: "165 $" }
        ]},
        { type: "galerie", titre: "Nos réalisations", alt: true },
        { type: "temoignages", titre: "Ce qu'on nous dit", items: [
          { q: "Première fois en dix ans que je sors d'un salon sans vouloir me recoiffer en arrivant chez nous.", a: "Josée L., cliente depuis 2021" },
          { q: "Elles prennent le temps d'expliquer ce qu'elles font. Ça paraît dans le résultat.", a: "Marc-André T." }
        ]},
        { type: "heures", titre: "Heures d'ouverture", items: [
          { j: "Mardi — mercredi", h: "9 h – 17 h" },
          { j: "Jeudi — vendredi", h: "9 h – 20 h" },
          { j: "Samedi", h: "9 h – 16 h" },
          { j: "Dimanche — lundi", h: "fermé" }
        ], alt: true }
      ]
    },
    {
      id: "metiers",
      label: "Métiers",
      slug: "plomberie-bellevue",
      nom: "Plomberie Bellevue",
      eyebrow: "Plombier licencié RBQ · Rive-Sud",
      titre: "On arrive quand on a dit qu'on arriverait.",
      sous: "Urgences, rénovations et entretien résidentiel. Estimation écrite avant les travaux, toujours.",
      cta: "Demander une soumission",
      liens: ["Services", "Territoire", "Nous joindre"],
      sections: [
        { type: "liste", titre: "Ce qu'on fait", items: [
          { n: "Urgence 24 h", d: "dégât d'eau, refoulement, tuyau gelé", p: "" },
          { n: "Chauffe-eau", d: "remplacement le jour même si disponible", p: "" },
          { n: "Rénovation de salle de bain", d: "plomberie brute et finition", p: "" },
          { n: "Débouchage par caméra", d: "diagnostic filmé remis au client", p: "" }
        ]},
        { type: "zone", titre: "Territoire desservi", items: [
          "Longueuil", "Saint-Lambert", "Brossard", "Boucherville",
          "Saint-Bruno", "La Prairie", "Candiac", "Chambly"
        ], alt: true },
        { type: "liste", titre: "Nos garanties", items: [
          { n: "Licence RBQ en règle", d: "numéro affiché sur chaque soumission", p: "" },
          { n: "Prix fixe accepté d'avance", d: "aucun dépassement sans votre accord écrit", p: "" },
          { n: "Garantie un an", d: "sur la main-d'œuvre de tous nos travaux", p: "" }
        ]},
        { type: "contact", titre: "Nous joindre", items: [
          { j: "Urgences", h: "450 555-0188 — 24 h sur 24" },
          { j: "Bureau", h: "lundi au vendredi, 7 h – 16 h" },
          { j: "Soumission", h: "réponse sous un jour ouvrable" }
        ], alt: true }
      ]
    },
    {
      id: "clinique",
      label: "Clinique & santé",
      slug: "clinique-rivard",
      nom: "Clinique dentaire Rivard",
      eyebrow: "Dentisterie familiale · Saint-Jérôme",
      titre: "Une clinique où on explique avant de commencer.",
      sous: "Soins généraux pour toute la famille, sans jugement et sans pression pour des traitements dont vous n'avez pas besoin.",
      cta: "Prendre rendez-vous",
      liens: ["Soins", "Équipe", "Heures"],
      sections: [
        { type: "liste", titre: "Nos soins", items: [
          { n: "Examen et nettoyage", d: "adultes et enfants, radiographies au besoin", p: "" },
          { n: "Obturations", d: "composite de la couleur de la dent", p: "" },
          { n: "Urgences dentaires", d: "plages réservées chaque jour", p: "" },
          { n: "Prothèses et couronnes", d: "laboratoire québécois", p: "" }
        ]},
        { type: "equipe", titre: "Qui vous recevra", items: [
          { n: "Dre Annie Rivard", r: "Dentiste généraliste" },
          { n: "Dr Pascal Guimond", r: "Dentiste généraliste" },
          { n: "Sophie Bergeron", r: "Hygiéniste dentaire" },
          { n: "Karine Dubé", r: "Coordonnatrice des soins" }
        ], alt: true },
        { type: "heures", titre: "Heures de la clinique", items: [
          { j: "Lundi — mercredi", h: "8 h – 17 h" },
          { j: "Jeudi", h: "8 h – 20 h" },
          { j: "Vendredi", h: "8 h – 14 h" },
          { j: "Samedi — dimanche", h: "fermé" }
        ]},
        { type: "contact", titre: "Nous trouver", items: [
          { j: "Adresse", h: "225, boulevard Labelle, Saint-Jérôme" },
          { j: "Téléphone", h: "450 555-0117" },
          { j: "Stationnement", h: "gratuit, à l'arrière" }
        ], alt: true }
      ]
    },
    {
      id: "boutique",
      label: "Boutique",
      slug: "papeterie-marguerite",
      nom: "Papeterie Marguerite",
      eyebrow: "Papeterie & beaux-arts · Québec",
      titre: "Du beau papier, et quelqu'un pour vous conseiller.",
      sous: "Carnets, plumes, encres et matériel d'artiste choisis un par un. Rue Saint-Jean, depuis le printemps.",
      cta: "Venir nous voir",
      liens: ["Boutique", "À propos", "Heures"],
      sections: [
        { type: "liste", titre: "En rayon ce mois-ci", items: [
          { n: "Carnets reliés à la main", d: "papier 120 g, six formats", p: "dès 28 $" },
          { n: "Encres pour plume", d: "douze couleurs, fabriquées au Québec", p: "22 $" },
          { n: "Aquarelles en godets", d: "demi-godets à l'unité ou en coffret", p: "dès 9 $" },
          { n: "Cartes de souhaits", d: "illustrées par des artistes d'ici", p: "7 $" }
        ]},
        { type: "galerie", titre: "Dans la boutique", alt: true },
        { type: "texte", titre: "À propos", corps: "La boutique est née d'une collection personnelle devenue encombrante. On garde un inventaire volontairement court : si c'est sur la tablette, c'est parce qu'on s'en sert nous-mêmes. Commandes spéciales possibles pour à peu près tout ce qui s'écrit ou se dessine." },
        { type: "heures", titre: "Heures d'ouverture", items: [
          { j: "Mardi — vendredi", h: "10 h – 18 h" },
          { j: "Samedi", h: "10 h – 17 h" },
          { j: "Dimanche", h: "12 h – 17 h" },
          { j: "Lundi", h: "fermé" }
        ], alt: true }
      ]
    },
    {
      id: "services",
      label: "Services professionnels",
      slug: "lavoie-comptabilite",
      nom: "Lavoie Comptabilité",
      eyebrow: "CPA · Gatineau",
      titre: "Vos chiffres, tenus par quelqu'un que vous pouvez appeler.",
      sous: "Tenue de livres, fin d'année et impôts pour travailleurs autonomes et PME de l'Outaouais.",
      cta: "Demander un appel",
      liens: ["Services", "À propos", "Contact"],
      sections: [
        { type: "liste", titre: "Nos services", items: [
          { n: "Tenue de livres mensuelle", d: "conciliation, TPS/TVQ, rapports", p: "" },
          { n: "États financiers de fin d'année", d: "avis au lecteur ou mission d'examen", p: "" },
          { n: "Déclarations de revenus", d: "particuliers, travailleurs autonomes, sociétés", p: "" },
          { n: "Démarrage d'entreprise", d: "structure, immatriculation, premières obligations", p: "" }
        ]},
        { type: "texte", titre: "À propos", corps: "Le cabinet compte trois personnes et prend un nombre limité de nouveaux dossiers par année. C'est délibéré : vous parlez toujours à la personne qui connaît votre dossier, et vos appels de février ne se perdent pas dans une file d'attente.", alt: true },
        { type: "temoignages", titre: "Nos clients", items: [
          { q: "J'ai passé six ans à changer de comptable chaque année. Ça fait quatre ans que je suis ici.", a: "Entrepreneur en construction, Gatineau" },
          { q: "On m'a expliqué mes acomptes provisionnels en cinq minutes. Personne n'avait pris la peine avant.", a: "Travailleuse autonome, Aylmer" }
        ]},
        { type: "contact", titre: "Nous joindre", items: [
          { j: "Bureau", h: "160, rue Montcalm, Gatineau" },
          { j: "Téléphone", h: "819 555-0163" },
          { j: "Période des impôts", h: "ouvert samedi de février à avril" }
        ], alt: true }
      ]
    }
  ];

  var VIBES = [
    { id: "moderne",       label: "Moderne épuré",
      note: "Une seule teinte, beaucoup de blanc, des angles nets. Le choix par défaut quand le contenu doit passer avant le décor." },
    { id: "chaleureux",    label: "Chaleureux",
      note: "Coins arrondis, teintes de terre, interlignes généreux. Pour les commerces où l'on reçoit des gens." },
    { id: "audacieux",     label: "Audacieux",
      note: "Typographie massive, contraste élevé, une couleur qui ne s'excuse pas. À réserver aux marques qui assument." },
    { id: "classique",     label: "Classique élégant",
      note: "Empattements, interlignes larges, palette désaturée. La sobriété qui ne se démode pas." },
    { id: "professionnel", label: "Professionnel",
      note: "Bleu conservateur, structure régulière, aucune surprise. Pour ceux qui vendent de la fiabilité." }
  ];

  /* ------------------------------------------------------------ Utilitaires */

  function el(tag, cls, txt) {
    var n = document.createElement(tag);
    if (cls) n.className = cls;
    if (txt != null) n.textContent = txt;
    return n;
  }

  var state = { cat: CATEGORIES[0], vibe: VIBES[0] };

  /* --------------------------------------------------- Rendu de l'aperçu */

  function renderSection(sec) {
    var block = el("div", "pv-block" + (sec.alt ? " pv-block-alt" : ""));
    block.appendChild(el("div", "pv-h2", sec.titre));

    if (sec.type === "liste") {
      var rows = el("div", "pv-rows");
      sec.items.forEach(function (it) {
        var row = el("div", "pv-row");
        row.appendChild(el("span", "pv-row-name", it.n));
        row.appendChild(el("span", "pv-row-desc", it.d));
        if (it.p) row.appendChild(el("span", "pv-row-price", it.p));
        rows.appendChild(row);
      });
      block.appendChild(rows);

    } else if (sec.type === "heures" || sec.type === "contact") {
      var hrs = el("div", "pv-hours");
      sec.items.forEach(function (it) {
        var row = el("div", "pv-hours-row");
        row.appendChild(el("span", null, it.j));
        row.appendChild(el("span", null, it.h));
        hrs.appendChild(row);
      });
      block.appendChild(hrs);

    } else if (sec.type === "galerie") {
      var grid = el("div", "pv-grid");
      for (var i = 0; i < 3; i++) grid.appendChild(el("div", "pv-tile"));
      block.appendChild(grid);

    } else if (sec.type === "temoignages") {
      var wrap = el("div", "pv-rows");
      sec.items.forEach(function (it) {
        var q = el("blockquote", "pv-quote", "« " + it.q + " »");
        q.appendChild(el("cite", "pv-quote-who", it.a));
        wrap.appendChild(q);
      });
      block.appendChild(wrap);

    } else if (sec.type === "zone") {
      var chips = el("div", "pv-chips");
      sec.items.forEach(function (v) { chips.appendChild(el("span", "pv-chip", v)); });
      block.appendChild(chips);

    } else if (sec.type === "equipe") {
      var team = el("div", "pv-team");
      sec.items.forEach(function (p) {
        var person = el("div", "pv-person");
        person.appendChild(el("div", "pv-avatar"));
        var col = el("div");
        col.appendChild(el("div", "pv-person-name", p.n));
        col.appendChild(el("div", "pv-person-role", p.r));
        person.appendChild(col);
        team.appendChild(person);
      });
      block.appendChild(team);

    } else if (sec.type === "texte") {
      block.appendChild(el("p", "pv-sub", sec.corps));
    }

    return block;
  }

  function renderPreview() {
    var cat = state.cat;
    var host = document.getElementById("preview");
    var frag = document.createDocumentFragment();

    var nav = el("div", "pv-nav");
    nav.appendChild(el("div", "pv-logo", cat.nom));
    var links = el("div", "pv-navlinks");
    cat.liens.forEach(function (l) { links.appendChild(el("span", null, l)); });
    nav.appendChild(links);
    nav.appendChild(el("span", "pv-navcta", cat.cta));
    frag.appendChild(nav);

    var hero = el("div", "pv-hero");
    hero.appendChild(el("div", "pv-eyebrow", cat.eyebrow));
    hero.appendChild(el("div", "pv-h1", cat.titre));
    hero.appendChild(el("p", "pv-sub", cat.sous));
    hero.appendChild(el("span", "pv-btn", cat.cta));
    hero.appendChild(el("div", "pv-shot"));
    frag.appendChild(hero);

    cat.sections.forEach(function (s) { frag.appendChild(renderSection(s)); });

    var foot = el("div", "pv-foot");
    foot.appendChild(el("span", null, "© " + new Date().getFullYear() + " " + cat.nom));
    foot.appendChild(el("span", null, "Site par mavitrine"));
    frag.appendChild(foot);

    host.textContent = "";
    host.appendChild(frag);
    host.setAttribute("data-vibe", state.vibe.id);

    document.getElementById("viewport-url").textContent = "mavitrine.ca/" + cat.slug;
    document.getElementById("vibe-note").textContent = state.vibe.note;
  }

  /* Petit fondu au changement — un seul moment d'animation, pas dix */
  function swap() {
    var host = document.getElementById("preview");
    var reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) { renderPreview(); return; }
    host.classList.add("is-swapping");
    window.setTimeout(function () {
      renderPreview();
      host.classList.remove("is-swapping");
    }, 180);
  }

  /* ------------------------------------------------------------- Contrôles */

  function buildChips(containerId, items, key) {
    var box = document.getElementById(containerId);
    items.forEach(function (item, idx) {
      var b = el("button", "chip", item.label);
      b.type = "button";
      b.setAttribute("role", "radio");
      b.setAttribute("aria-checked", idx === 0 ? "true" : "false");
      b.tabIndex = idx === 0 ? 0 : -1;

      b.addEventListener("click", function () {
        Array.prototype.forEach.call(box.children, function (c) {
          c.setAttribute("aria-checked", "false");
          c.tabIndex = -1;
        });
        b.setAttribute("aria-checked", "true");
        b.tabIndex = 0;
        state[key] = item;
        swap();
      });

      b.addEventListener("keydown", function (ev) {
        var dir = ev.key === "ArrowRight" || ev.key === "ArrowDown" ? 1
                : ev.key === "ArrowLeft"  || ev.key === "ArrowUp"   ? -1 : 0;
        if (!dir) return;
        ev.preventDefault();
        var kids = Array.prototype.slice.call(box.children);
        var next = kids[(kids.indexOf(b) + dir + kids.length) % kids.length];
        next.focus();
        next.click();
      });

      box.appendChild(b);
    });
  }

  /* ----------------------------------------------------------- Thème */

  function initTheme() {
    var root = document.documentElement;
    var stored = null;
    try { stored = localStorage.getItem("mavitrine-theme"); } catch (e) {}
    if (stored === "light" || stored === "dark") root.setAttribute("data-theme", stored);

    document.getElementById("theme-toggle").addEventListener("click", function () {
      var current = root.getAttribute("data-theme");
      if (!current) {
        current = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
      }
      var next = current === "dark" ? "light" : "dark";
      root.setAttribute("data-theme", next);
      try { localStorage.setItem("mavitrine-theme", next); } catch (e) {}
    });
  }

  /* ------------------------------------------------------- Apparition */

  function initReveal() {
    if (!("IntersectionObserver" in window)) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    var targets = document.querySelectorAll(".section-title, .steps, .tiers, .pledges, .facts, .compositor, .faq");
    var obs = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) {
          e.target.classList.add("is-in");
          obs.unobserve(e.target);
        }
      });
    }, { rootMargin: "0px 0px -8% 0px", threshold: .08 });

    Array.prototype.forEach.call(targets, function (t) {
      t.classList.add("reveal");
      obs.observe(t);
    });
  }

  /* ------------------------------------------------------------- Départ */

  document.addEventListener("DOMContentLoaded", function () {
    buildChips("chips-categorie", CATEGORIES, "cat");
    buildChips("chips-ambiance", VIBES, "vibe");
    renderPreview();
    initTheme();
    initReveal();
  });
})();
