# mavitrine.github.io

Site vitrine du service **mavitrine** — sites web pour petites entreprises du
Québec. Français (`fr-CA`), audience québécoise.

Publié par GitHub Pages depuis `main`, à la racine.
→ <https://mavitrine.github.io/> (puis `mavitrine.ca` une fois le domaine enregistré).

## Structure

```
index.html          la page, en une seule vue
assets/styles.css   le système de jetons + les 5 ambiances
assets/app.js       le compositeur (catégorie × ambiance) + thème + apparition
.nojekyll           sert les fichiers tels quels, sans passer par Jekyll
```

## Ce que la page démontre

Le site est lui-même une démonstration du système décrit dans les documents de
vision (dépôt privé `mavitrine`) :

- **Le compositeur** — deux axes, exactement comme le moteur de génération.
  `catégorie` choisit les sections, leur ordre et l'appel à l'action ;
  `ambiance` choisit le jeu de jetons. Les six catégories et les cinq ambiances
  viennent de `vision/design-system.md` §2 et §3.
- **Jetons partout** — aucune couleur codée en dur hors des blocs `:root` /
  `[data-vibe]`. Changer d'ambiance = remplacer un bloc de propriétés.
- **Aucune requête externe** — polices système uniquement, images remplacées par
  des dégradés CSS, aucun script tiers. Conforme à la contrainte du §7.
- **Thème clair et sombre** — via `prefers-color-scheme`, avec une bascule
  manuelle qui l'emporte dans les deux sens et persiste dans `localStorage`.

## La barrière de contraste

`design-system.md` §4 traite le contraste comme une **barrière, pas une
préférence**. Chaque paire texte/fond réellement utilisée dans la feuille de
style a été vérifiée WCAG AA (4,5:1 pour le texte courant) — les 5 ambiances,
les deux thèmes de la page, et le texte du pied de page une fois son opacité
aplatie sur le fond. Les scripts de vérification sont hors dépôt ; deux paires
ont échoué au premier passage et ont été corrigées (`--muted` assombri,
opacité du pied relevée) plutôt que tolérées.

## Contenu

Les commerces montrés dans l'aperçu (Le Comptoir Saint-Jean, Studio Mireille,
Plomberie Bellevue, Clinique dentaire Rivard, Papeterie Marguerite, Lavoie
Comptabilité) sont **fictifs** et identifiés comme tels sur la page. Aucun vrai
client, aucun témoignage réel, aucune statistique inventée — la même règle
« faits seulement » que le service applique aux sites qu'il génère.

Les prix affichés sont **préliminaires** (voir `vision/pricing-tiers.md`, dont
les montants sont des propositions à valider). La page le mentionne.

## À faire avant le vrai lancement

- [ ] Enregistrer `mavitrine.ca`, ajouter un fichier `CNAME` ici, pointer le DNS
- [ ] Rendre `bonjour@mavitrine.ca` fonctionnel (Cloudflare Email Routing)
- [ ] Confirmer les prix définitifs et retirer la mention « préliminaires »
- [ ] Remplacer le lien `mailto:` par le vrai formulaire d'admission quand il existe
