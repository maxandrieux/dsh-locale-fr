// Construit le pack de langue français (client.js) à partir de locales/fr/*.json,
// après contrôle contre locales/en/*.json : mêmes clés, mêmes {variables}, pas de caractère chinois résiduel.
// Usage : npm run build
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), '..')
const read = (p) => JSON.parse(fs.readFileSync(path.join(root, p), 'utf8'))
const flat = (o, pre = '') => Object.entries(o).flatMap(([k, v]) => (v && typeof v === 'object' ? flat(v, `${pre}${k}.`) : [[pre + k, v]]))
const vars = (s) => (String(s).match(/\{[\w.]+\}/g) ?? []).sort().join()

const dicts = {}
const problems = []
let strings = 0
for (const file of fs.readdirSync(path.join(root, 'locales', 'en')).sort()) {
  if (file.startsWith('_')) continue
  const ns = file.replace(/\.json$/, '')
  const frPath = path.join('locales', 'fr', file)
  if (!fs.existsSync(path.join(root, frPath))) { problems.push(`${ns} : pas de traduction`); continue }
  const en = Object.fromEntries(flat(read(path.join('locales', 'en', file))))
  const frRaw = read(frPath)
  const fr = Object.fromEntries(flat(frRaw))
  for (const k of Object.keys(en)) {
    if (!(k in fr)) problems.push(`${ns}.${k} : manquante`)
    else if (vars(en[k]) !== vars(fr[k])) problems.push(`${ns}.${k} : variables ${vars(en[k])} ≠ ${vars(fr[k])}`)
    else if (/[一-鿿]/.test(fr[k])) problems.push(`${ns}.${k} : caractères chinois`)
  }
  for (const k of Object.keys(fr)) if (!(k in en)) problems.push(`${ns}.${k} : clé inconnue en anglais`)
  dicts[ns] = frRaw
  strings += Object.keys(en).length
}
if (problems.length) {
  console.error(`${problems.length} problème(s) :\n  ${problems.slice(0, 40).join('\n  ')}`)
  process.exit(1)
}

const client = `// Généré par scripts/build-locale-fr.mjs depuis locales/fr/*.json : ne pas éditer à la main.
// Moitié Client du bundle dsh-locale-fr : ajoute le français comme langue d'interface (repli sur l'anglais).
window.__ModuleLoader__.load({
  id: 'dsh-locale-fr',
  factory() {
    const DICTS = ${JSON.stringify(dicts)};
    return {
      inject: ['locale'],
      apply(ctx) {
        ctx.effect(() => ctx.locale.addLanguage({ id: 'fr', label: 'Français', fallback: 'en' }), 'dsh-locale-fr: language');
        for (const [ns, dict] of Object.entries(DICTS)) {
          ctx.effect(() => ctx.locale.register(ns, 'fr', dict), \`dsh-locale-fr: \${ns}\`);
        }
      },
    };
  },
});
`
fs.writeFileSync(path.join(root, 'client.js'), client)
console.log(`OK : ${Object.keys(dicts).length} namespaces, ${strings} chaînes → client.js (${Math.round(client.length / 1024)} Ko)`)
