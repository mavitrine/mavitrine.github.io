/* ==========================================================================
   mavitrine — système d'illustration
   Dessiné à la main, entièrement en SVG local, nourri aux mêmes jetons que la
   page hôte (--il-* que le contexte fait pointer vers --p-* dans l'aperçu ou
   vers les jetons de page ailleurs). Aucune requête externe.

   Métaphore de marque : la vitrine. Chaque catégorie a sa devanture et ses
   motifs ; les motifs se réutilisent dans la vitrine, la galerie et les
   portraits. Un changement d'ambiance ou de thème les redessine tous, sans
   retoucher un seul fichier — c'est le repli « sans photo » du pipeline.

   Les illustrations sont décoratives : le sens passe par le texte adjacent,
   donc aria-hidden partout.

   Expose window.MV_ILLUS = { motif, storefront, avatar, MOTIF }.
   ========================================================================== */
(function (root) {
  "use strict";

  /* Trois motifs de métier par catégorie (viewBox 0 0 64 64), en trait. */
  var MOTIF = {
    restaurant: [
      /* verre */ '<path class="il-line" d="M22 13h20c-1 12-5 19-10 19S23 25 22 13Z"/><path class="il-line" d="M32 32v15M25 47h14"/><path class="il-accent" d="M24 20h16"/>',
      /* assiette + fourchette */ '<circle class="il-line" cx="27" cy="33" r="15"/><circle class="il-soft" cx="27" cy="33" r="8"/><path class="il-line" d="M51 13v38M47 13v10a4 4 0 0 0 8 0V13"/>',
      /* tasse + vapeur */ '<path class="il-line" d="M15 27h27v7a13 13 0 0 1-27 0Z"/><path class="il-line" d="M42 29h4a6 6 0 0 1 0 12h-3"/><path class="il-line" d="M14 50h29"/><path class="il-accent" d="M24 11c-3 4 3 6 0 10M32 11c-3 4 3 6 0 10"/>'
    ],
    salon: [
      /* ciseaux */ '<circle class="il-line" cx="19" cy="45" r="6"/><circle class="il-line" cx="33" cy="47" r="6"/><path class="il-line" d="M24 41 51 14M29 42 45 24"/><circle class="il-fill" cx="37" cy="33" r="1.6"/>',
      /* miroir à main */ '<circle class="il-line" cx="30" cy="23" r="13"/><circle class="il-glass" cx="30" cy="23" r="8.5"/><path class="il-line" d="M30 36v16M25 52h10"/>',
      /* flacon */ '<path class="il-line" d="M25 27h14v22a4 4 0 0 1-4 4h-6a4 4 0 0 1-4-4Z"/><path class="il-line" d="M28 19h8v8h-8ZM27 15h10"/><path class="il-accent" d="M25 41h14"/>'
    ],
    metiers: [
      /* clé à molette */ '<path class="il-line" d="M45 12a9 9 0 0 0-11 14L16 44a5 5 0 0 0 7 7l18-18a9 9 0 0 0 14-11l-7 7-6-1-1-6Z"/>',
      /* goutte d\'eau */ '<path class="il-line" d="M32 12s14 18 14 28a14 14 0 0 1-28 0c0-10 14-28 14-28Z"/><path class="il-accent" d="M39 42a7 7 0 0 1-7 6"/>',
      /* casque */ '<path class="il-line" d="M13 41a19 13 0 0 1 38 0Z"/><path class="il-line" d="M9 41h46"/><path class="il-accent" d="M32 22v6M24 24l1 5M40 24l-1 5"/>'
    ],
    clinique: [
      /* croix */ '<rect class="il-line" x="14" y="14" width="36" height="36" rx="8"/><path class="il-fill" d="M29 21h6v7h7v6h-7v7h-6v-7h-7v-6h7Z"/>',
      /* dent */ '<path class="il-line" d="M32 15c-8-5-18-1-18 11 0 8 3 13 5 19 2 6 6 6 7 0l3-9c0-2 3-2 4 0l3 9c1 6 5 6 7 0 2-6 5-11 5-19 0-12-10-16-18-11Z"/>',
      /* cœur + pouls */ '<path class="il-line" d="M32 47C16 36 14 24 22 19c5-3 9 0 10 4 1-4 5-7 10-4 8 5 6 17-10 28Z"/><path class="il-accent" d="M18 33h6l3-6 4 12 3-6h13"/>'
    ],
    boutique: [
      /* sac */ '<path class="il-line" d="M18 24h28l3 28H15Z"/><path class="il-line" d="M26 24a6 6 0 0 1 12 0"/><path class="il-accent" d="M16 43h32"/>',
      /* étiquette */ '<path class="il-line" d="M13 31 30 14h18v18L31 49Z"/><circle class="il-line" cx="40" cy="24" r="3"/><path class="il-accent" d="M42 22 49 15"/>',
      /* boîte-cadeau */ '<rect class="il-line" x="16" y="28" width="32" height="24"/><rect class="il-line" x="12" y="20" width="40" height="8"/><path class="il-line" d="M32 20v32"/><path class="il-accent" d="M32 20c-7-9-15-1 0 0 15-1 7-9 0 0"/>'
    ],
    services: [
      /* document */ '<rect class="il-line" x="18" y="12" width="28" height="40" rx="2"/><path class="il-accent" d="M24 22h16"/><path class="il-soft" d="M24 30h16M24 38h10"/>',
      /* mallette */ '<rect class="il-line" x="11" y="24" width="42" height="27" rx="3"/><path class="il-line" d="M25 24v-4h14v4"/><path class="il-accent" d="M11 37h42"/>',
      /* plante */ '<path class="il-line" d="M23 44h18l-3 10H26Z"/><path class="il-line" d="M32 44V27"/><path class="il-accent" d="M32 40c0-9-5-13-11-13 0 8 4 13 11 13ZM32 38c0-8 5-12 11-12 0 7-4 12-11 12Z"/>'
    ]
  };

  function motif(catId, i) {
    var set = MOTIF[catId] || MOTIF.services;
    return '<svg class="il" viewBox="0 0 64 64" aria-hidden="true" focusable="false">'
         + set[i % set.length] + '</svg>';
  }

  /* Volet de galerie : une vitre à petits carreaux, calme, avec un reflet.
     Trois découpages de meneaux pour varier sans crier. Décoratif. Remplit le
     cadre (preserveAspectRatio none) comme une vraie fenêtre. viewBox 100×75. */
  function pane(i) {
    var mull = [
      'M50 0v75M0 38h100',              /* 2 × 2 */
      'M33 0v75M67 0v75',               /* 3 hautes */
      'M50 0v75M0 25h100M0 50h100'      /* 2 × 3 */
    ][i % 3];
    return '<svg class="il" viewBox="0 0 100 75" preserveAspectRatio="none" aria-hidden="true" focusable="false">'
      + '<rect class="il-glass" x="0" y="0" width="100" height="75"/>'
      + '<path class="il-line" d="' + mull + '"/>'
      + '<rect class="il-line" x="1" y="1" width="98" height="73"/>'
      + '</svg>';
  }

  /* Un feston d'auvent : n arches de largeur w à partir de x0, base y. */
  function scallops(x0, y, w, n) {
    var d = 'M' + x0 + ' ' + y, i;
    for (i = 0; i < n; i++) { d += 'q' + (w / 2) + ' 8 ' + w + ' 0'; }
    return d;
  }

  /* La devanture, comme une petite scène de rue : boutique éclairée, porte
     entrouverte d'où la lumière déborde, un arbre et un lampadaire. Les motifs
     de la catégorie sont les articles en vitrine. viewBox 360×156, sol en bas. */
  function storefront(catId) {
    var set = MOTIF[catId] || MOTIF.services;
    var bx = 26, bw = 196, g = 140, roofY = 22;      // bâtiment / sol
    var awY = 40, n = 13, sw = 204 / n;
    var winX = 40, winY = 66, winW = 92, winH = 66;   // vitrine
    var dX = 150, dY = 52, dW = 64, dH = g - dY;       // porte
    var hinge = dX + dW * 0.62;
    var g1 = '<g transform="translate(46 74) scale(0.66)">' + set[0] + '</g>';
    var g2 = '<g transform="translate(82 82) scale(0.5)">' + set[1] + '</g>';
    return '<svg class="il" viewBox="0 0 360 156" preserveAspectRatio="xMidYMax meet" aria-hidden="true" focusable="false">'
      + '<path class="il-soft" d="M8 140h344"/>'
      // bâtiment + enseigne + auvent festonné
      + '<rect class="il-surface" x="' + bx + '" y="' + roofY + '" width="' + bw + '" height="' + (g - roofY) + '"/>'
      + '<rect class="il-glass" x="' + bx + '" y="' + roofY + '" width="' + bw + '" height="16"/>'
      + '<rect class="il-fill" x="22" y="' + awY + '" width="204" height="10"/>'
      + '<path class="il-fill" d="' + scallops(22, awY + 10, sw, n) + 'V' + (awY + 10) + 'H22Z"/>'
      // vitrine + articles
      + '<rect class="il-glass" x="' + winX + '" y="' + winY + '" width="' + winW + '" height="' + winH + '"/>'
      + '<rect class="il-line" x="' + winX + '" y="' + winY + '" width="' + winW + '" height="' + winH + '"/>'
      + '<path class="il-line" d="M' + (winX + winW / 2) + ' ' + winY + 'v' + winH + 'M' + winX + ' ' + (winY + winH / 2) + 'h' + winW + '"/>'
      + g1 + g2
      // porte entrouverte + lumière qui déborde
      + '<path class="il-primary" opacity="0.42" d="M' + dX + ' ' + g + 'L' + (dX - 30) + ' ' + g + 'L' + (dX + dW * 0.58) + ' ' + dY + 'Z"/>'
      + '<rect class="il-line" x="' + dX + '" y="' + dY + '" width="' + dW + '" height="' + dH + '"/>'
      + '<path class="il-glass" d="M' + dX + ' ' + dY + 'L' + hinge + ' ' + (dY + 8) + 'V' + (g - 8) + 'L' + dX + ' ' + g + 'Z"/>'
      + '<path class="il-line" d="M' + dX + ' ' + dY + 'L' + hinge + ' ' + (dY + 8) + 'V' + (g - 8) + 'L' + dX + ' ' + g + '"/>'
      + '<circle class="il-fill" cx="' + (dX + dW * 0.52) + '" cy="' + (dY + dH / 2) + '" r="2.6"/>'
      // enseigne suspendue
      + '<path class="il-line" d="M' + (bx + bw) + ' 44h14"/>'
      + '<rect class="il-line" x="' + (bx + bw + 4) + '" y="46" width="18" height="14" rx="2"/>'
      + '<path class="il-accent" d="M' + (bx + bw + 9) + ' 53h8"/>'
      // mobilier de rue : lampadaire + arbre
      + '<path class="il-line" d="M254 140V70m0 0h12"/>'
      + '<circle class="il-accent" cx="267" cy="70" r="4"/>'
      + '<path class="il-line" d="M312 140v-30"/>'
      + '<circle class="il-primary" cx="300" cy="106" r="12"/>'
      + '<circle class="il-primary" cx="322" cy="106" r="12"/>'
      + '<circle class="il-primary" cx="312" cy="94" r="14"/>'
      + '</svg>';
  }

  /* Portraits d'équipe : géométriques et honnêtement dessinés (pas de fausses
     photos). Cinq variantes, cyclées par position. */
  function avatar(i) {
    var hair = [
      '<path class="il-fill" d="M15 26a17 17 0 0 1 34 0v3H15Z"/>',                 /* courts */
      '<path class="il-fill" d="M13 30c0-14 38-14 38 0v10l-6-4V29H19v7l-6 4Z"/>',  /* mi-longs */
      '<path class="il-fill" d="M17 22a15 15 0 0 1 30 3l-4 3a11 11 0 0 0-22 0l-4-3Z"/>', /* dégarni */
      '<path class="il-fill" d="M14 28c2-16 34-16 36 0l-4 6c-1-8-27-8-28 0Z"/><path class="il-fill" d="M46 28c3 6 3 14 0 20"/>', /* bouclés */
      '<path class="il-fill" d="M16 27a16 16 0 0 1 32 0v2l-5-2a20 20 0 0 0-22 0l-5 2Z"/>' /* longs */
    ];
    return '<svg class="il" viewBox="0 0 64 64" aria-hidden="true" focusable="false">'
      + '<circle class="il-glass" cx="32" cy="32" r="30"/>'
      + '<path class="il-fill" d="M14 60a18 18 0 0 1 36 0Z"/>'
      + '<path class="il-accent" d="M27 51 32 60 37 51"/>'
      + '<circle class="il-line" cx="32" cy="30" r="12"/>'
      + hair[i % hair.length]
      + '</svg>';
  }

  root.MV_ILLUS = { motif: motif, pane: pane, storefront: storefront, avatar: avatar, MOTIF: MOTIF };
})(window);
