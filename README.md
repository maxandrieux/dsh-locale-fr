# dsh-locale-fr

Pack de langue **français** pour DSH, compatible avec DeepSeek Harness (testé sur la version Desktop `0.2.1-rc.5`).
Projet communautaire, sans lien officiel avec DeepSeek.

*French interface language pack for DSH, compatible with DeepSeek Harness (tested on Desktop `0.2.1-rc.5`). Community project, not affiliated with DeepSeek. English instructions below.*

## Installation

1. Dans l'app : **Plugins** › **Ajouter un plugin** (*Add plugin*).
2. Collez `github:maxandrieux/dsh-locale-fr`, puis **Installer** et **Activer maintenant**.
3. Si Windows ou macOS est en français, l'interface bascule seule. Sinon : **Réglages** › **Général** › **Langue** › **Français**.

Pour désinstaller : page **Plugins**, ligne « Pack de langue français ».

## Ce qui est traduit

2 786 chaînes réparties dans 55 espaces de noms : conversation, barre latérale, réglages, plugins, tâches planifiées, terminal,
inspecteur de session, raccourcis… Les textes non traduits retombent sur l'anglais.

Non couvert : les descriptions des plugins intégrés (elles viennent des paquets eux-mêmes) et les rares textes écrits en dur dans le code.

Conventions : vouvoiement, casse de phrase, espaces insécables de la typographie française. Le vocabulaire est fixé dans
[`locales/glossaire-fr.md`](locales/glossaire-fr.md).

## Après une mise à jour de DSH

Les identifiants de textes changent parfois d'une version à l'autre. Les nouveaux textes s'affichent alors en anglais
jusqu'à la mise à jour du pack.

## Contribuer

- `locales/en/` : textes anglais d'origine, extraits de l'app (référence, ne pas modifier).
- `locales/fr/` : traductions, même structure et mêmes clés.
- `npm run build` vérifie chaque fichier (clés identiques, mêmes `{variables}`, aucun caractère chinois résiduel) puis régénère `client.js`.

Corrections et propositions bienvenues par pull request.

---

## English

**Install**: in the app, open **Plugins** › **Add plugin**, paste `github:maxandrieux/dsh-locale-fr`, then **Install** and **Enable now**.
The UI switches automatically on a French system; otherwise choose **Settings** › **General** › **Language** › **Français**.

`npm run build` validates `locales/fr/` against `locales/en/` (same keys, same `{placeholders}`) and regenerates `client.js`.

## Licence

MIT. Les textes anglais d'origine (`locales/en/`) proviennent de DeepSeek Harness, sous licence MIT (© 2026 DeepSeek).
