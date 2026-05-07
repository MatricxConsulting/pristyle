// Imports the 44 new images from C:/Users/bbiendou/Downloads/pri
// into Supabase Storage + DB. Idempotent on re-run via storage upsert
// and explicit product UUIDs (deterministic via productKey).

import sharp from 'sharp';
import fs from 'node:fs/promises';
import path from 'node:path';
import crypto from 'node:crypto';

const SUPABASE_URL = 'https://hycvllacbcyetrvogpdl.supabase.co';
const SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
if (!SERVICE_KEY) { console.error('SUPABASE_SERVICE_ROLE_KEY missing'); process.exit(1); }
const BUCKET = 'catalog-media';
const SOURCE_DIR = 'C:\\Users\\bbiendou\\Downloads\\pri';

const SUBCAT = {
  chemises:                                     { id: '88a8de3b-ee0d-40b9-98a7-885f7f80527f', cat: 'homme' },
  'ensemble-homme':                             { id: '12d76659-955f-4f5b-bd34-5b142137987e', cat: 'homme' },
  'boubou-femme':                               { id: 'a55ec669-5778-4d2f-9d8a-d7380532c1f3', cat: 'femme' },
  robes:                                        { id: '4690da19-f548-48ad-aa93-786005ae9be3', cat: 'femme' },
  jupes:                                        { id: 'b3408770-efc8-431b-acfb-64778fb091c9', cat: 'femme' },
  hauts:                                        { id: '053cdf66-eeba-4d02-a7ed-a65b21e78a52', cat: 'femme' },
  'combinaison-wax-pantalon-large-elegante':    { id: 'adbc6121-1396-4d99-ab64-935caca7e115', cat: 'femme' },
  tenues:                                       { id: '88cff4ed-1723-471d-90e3-406993932459', cat: 'enfant' },
  'tenues-couple':                              { id: '51d0b51d-7271-40f9-a7c3-74f93a3a4d46', cat: 'tenue-mariage' },
};

// [sourceFilename, subcatSlug, productKey, imageIndex]
const MAP = [
  ['WhatsApp Image 2026-05-03 at 21.46.40.jpeg',     'chemises',                                  'chemise-blanche-broderie-wax-bleu-jaune', 1],
  ['WhatsApp Image 2026-05-03 at 21.46.41.jpeg',     'chemises',                                  'chemise-bleu-clair-broderie-wax-doree', 1],
  ['WhatsApp Image 2026-05-03 at 21.46.42.jpeg',     'chemises',                                  'chemise-bleu-marine-broderie-wax-doree', 1],
  ['WhatsApp Image 2026-05-03 at 21.46.43.jpeg',     'chemises',                                  'chemise-blanche-applications-wax-noir-orange', 1],
  ['WhatsApp Image 2026-05-03 at 21.46.44.jpeg',     'ensemble-homme',                            'ensemble-homme-noir-safari-poches', 1],
  ['WhatsApp Image 2026-05-03 at 21.46.44 (1).jpeg', 'ensemble-homme',                            'ensemble-homme-noir-safari-poches', 2],
  ['WhatsApp Image 2026-05-03 at 21.46.44 (2).jpeg', 'hauts',                                     'haut-femme-wax-orange-blanc-noir-manches-evasees', 1],
  ['WhatsApp Image 2026-05-03 at 21.46.46.jpeg',     'combinaison-wax-pantalon-large-elegante',   'combinaison-bleu-royal-uni-soyeux', 1],
  ['WhatsApp Image 2026-05-03 at 21.46.46 (1).jpeg', 'robes',                                     'robe-rouge-sirene-bustier-wax-kente', 1],
  ['WhatsApp Image 2026-05-03 at 21.46.47.jpeg',     'robes',                                     'robe-jaune-courte-manches-bouffantes', 1],
  ['WhatsApp Image 2026-05-03 at 21.46.47 (1).jpeg', 'tenues-couple',                             'tenue-couple-mariage-blanc-broderie-verte', 1],
  ['WhatsApp Image 2026-05-03 at 21.46.48.jpeg',     'ensemble-homme',                            'ensemble-homme-bleu-marine-tunique-longue', 1],
  ['WhatsApp Image 2026-05-03 at 21.46.48 (1).jpeg', 'robes',                                     'robe-doree-broderie-traditionnelle-cameroun', 1],
  ['WhatsApp Image 2026-05-03 at 21.46.49.jpeg',     'robes',                                     'robe-sirene-blanche-doree-sequins-tulle', 1],
  ['WhatsApp Image 2026-05-03 at 21.46.50.jpeg',     'ensemble-homme',                            'ensemble-homme-bleu-jaune-wax-rond', 1],
  ['WhatsApp Image 2026-05-03 at 21.46.50 (1).jpeg', 'boubou-femme',                              'boubou-femme-bazin-blanc-broderie-bleue', 1],
  ['WhatsApp Image 2026-05-03 at 21.46.51.jpeg',     'robes',                                     'robe-longue-blanche-ceinture-rouge', 1],
  ['WhatsApp Image 2026-05-03 at 21.46.52.jpeg',     'robes',                                     'robe-rose-tulle-courte-bustier', 1],
  ['WhatsApp Image 2026-05-03 at 21.46.53.jpeg',     'jupes',                                     'jupe-crayon-kaki-wax-multicolore', 1],
  ['WhatsApp Image 2026-05-03 at 21.46.53 (1).jpeg', 'ensemble-homme',                            'ensemble-homme-blanc-casual-uni', 1],
  ['WhatsApp Image 2026-05-03 at 21.46.54.jpeg',     'robes',                                     'robe-rose-courte-col-noeud', 1],
  ['WhatsApp Image 2026-05-03 at 21.46.55.jpeg',     'jupes',                                     'jupe-crayon-noire-wax-volants-rouge', 1],
  ['WhatsApp Image 2026-05-03 at 21.46.55 (1).jpeg', 'combinaison-wax-pantalon-large-elegante',   'combinaison-bleu-royal-uni-soyeux', 2],
  ['WhatsApp Image 2026-05-03 at 21.46.56.jpeg',     'chemises',                                  'chemise-bleu-applications-rectangles-rouges', 1],
  ['WhatsApp Image 2026-05-03 at 21.46.56 (1).jpeg', 'tenues',                                    'tenue-enfant-garcon-blanche-poches-uni', 1],
  ['WhatsApp Image 2026-05-03 at 21.46.57.jpeg',     'chemises',                                  'chemise-bleu-marine-col-mao-broderie-pliee', 1],
  ['WhatsApp Image 2026-05-03 at 21.46.57 (1).jpeg', 'chemises',                                  'chemise-noir-col-mao-gris-bicolore', 1],
  ['WhatsApp Image 2026-05-03 at 21.46.57 (2).jpeg', 'chemises',                                  'chemise-bleu-marine-manches-wax-orange', 1],
  ['WhatsApp Image 2026-05-03 at 21.46.59.jpeg',     'hauts',                                     'bustier-femme-dentelle-bleu-marine-strass', 1],
  ['WhatsApp Image 2026-05-03 at 21.46.59 (1).jpeg', 'chemises',                                  'chemise-bicolore-blanche-manches-bordeaux', 1],
  ['WhatsApp Image 2026-05-03 at 21.47.00.jpeg',     'robes',                                     'robe-courte-florale-bustier-rose', 1],
  ['WhatsApp Image 2026-05-03 at 21.47.00 (1).jpeg', 'hauts',                                     'bustier-femme-noir-dore-ailes-organza-orange', 1],
  ['WhatsApp Image 2026-05-03 at 21.47.00 (2).jpeg', 'hauts',                                     'bustier-femme-noir-dore-ailes-organza-orange', 2],
  ['WhatsApp Image 2026-05-03 at 21.47.01.jpeg',     'hauts',                                     'haut-femme-rose-blanc-motifs-greenlife', 1],
  ['WhatsApp Image 2026-05-03 at 21.47.02.jpeg',     'robes',                                     'robe-velours-noir-broderie-rouge-orange-vert', 1],
  ['WhatsApp Image 2026-05-03 at 21.47.02 (1).jpeg', 'hauts',                                     'bustier-femme-blanc-jaune-broderie-peplum', 1],
  ['WhatsApp Image 2026-05-03 at 21.47.03.jpeg',     'hauts',                                     'chemise-femme-rose-pliee-broderie-greenlife', 1],
  ['WhatsApp Image 2026-05-03 at 21.47.04.jpeg',     'hauts',                                     'bustier-femme-corail-turquoise-broderie-floral', 1],
  ['WhatsApp Image 2026-05-03 at 21.47.05.jpeg',     'robes',                                     'robe-wax-courte-manches-bouffantes-turquoise', 1],
  ['WhatsApp Image 2026-05-03 at 21.47.05 (1).jpeg', 'boubou-femme',                              'boubou-femme-bogolan-indigo-blanc-frange', 1],
  ['WhatsApp Image 2026-05-03 at 21.47.06.jpeg',     'robes',                                     'robe-longue-rose-pale-bustier-sequins', 1],
  ['WhatsApp Image 2026-05-03 at 21.47.06 (1).jpeg', 'boubou-femme',                              'boubou-femme-bleu-or-motifs-craqueles', 1],
  ['WhatsApp Image 2026-05-03 at 21.47.06 (2).jpeg', 'robes',                                     'robe-longue-vert-jaune-broderie-kente-bicolore', 1],
  ['WhatsApp Image 2026-05-03 at 21.47.07.jpeg',     'hauts',                                     'chemise-femme-rose-dentelle-greenlife', 1],
];

// Deterministic UUID per productKey so re-running doesn't duplicate.
const NS = 'pristyle-pri-import-2026-05';
function productUuid(key) {
  // SHA-1 of NS+key truncated to 16 bytes, formatted as UUID v5-ish.
  const h = crypto.createHash('sha1').update(NS + ':' + key).digest();
  const b = Buffer.from(h.subarray(0, 16));
  b[6] = (b[6] & 0x0f) | 0x50; // version 5
  b[8] = (b[8] & 0x3f) | 0x80; // variant
  const hex = b.toString('hex');
  return `${hex.slice(0,8)}-${hex.slice(8,12)}-${hex.slice(12,16)}-${hex.slice(16,20)}-${hex.slice(20,32)}`;
}

async function sb(method, url, body, extraHeaders = {}) {
  const r = await fetch(SUPABASE_URL + url, {
    method,
    headers: {
      apikey: SERVICE_KEY,
      Authorization: 'Bearer ' + SERVICE_KEY,
      'Content-Type': 'application/json',
      ...extraHeaders,
    },
    body: body ? (typeof body === 'string' ? body : JSON.stringify(body)) : undefined,
  });
  const text = await r.text();
  if (!r.ok) throw new Error(`${method} ${url} → ${r.status}: ${text}`);
  return text ? JSON.parse(text) : null;
}

async function uploadWebp(storagePath, buffer) {
  const r = await fetch(`${SUPABASE_URL}/storage/v1/object/${BUCKET}/${storagePath}`, {
    method: 'POST',
    headers: {
      apikey: SERVICE_KEY,
      Authorization: 'Bearer ' + SERVICE_KEY,
      'Content-Type': 'image/webp',
      'x-upsert': 'true',
    },
    body: buffer,
  });
  if (!r.ok) throw new Error(`Upload ${storagePath} → ${r.status}: ${await r.text()}`);
}

function titleFromKey(key) {
  return key.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
}

async function main() {
  // Group rows per productKey for product creation
  const byKey = new Map();
  for (const row of MAP) {
    const [, , key] = row;
    if (!byKey.has(key)) byKey.set(key, []);
    byKey.get(key).push(row);
  }

  console.log(`→ ${MAP.length} images, ${byKey.size} distinct products`);

  const pilot = process.env.PILOT === '1';
  let n = 0;
  let processed = 0;
  for (const [key, rows] of byKey) {
    if (pilot && processed >= 1) break;
    processed++;
    const [, subcatSlug] = rows[0];
    const subcat = SUBCAT[subcatSlug];
    if (!subcat) throw new Error('Unknown subcat: ' + subcatSlug);

    const productId = productUuid(key);
    const productName = titleFromKey(key);
    const slug = key; // productKey is already kebab-case and globally unique within this batch

    // Upsert product on id
    await sb('POST', '/rest/v1/products?on_conflict=id', {
      id: productId,
      name: productName,
      slug,
      subcategory_id: subcat.id,
      is_active: true,
      is_best_seller: false,
      is_featured: false,
      display_order: 0,
    }, { Prefer: 'resolution=merge-duplicates,return=minimal' });

    // Drop existing product_images for this product so re-running is clean
    await sb('DELETE', `/rest/v1/product_images?product_id=eq.${productId}`);

    // Convert + upload + insert product_images
    for (const [src, , , idx] of rows) {
      const idx2 = String(idx).padStart(2, '0');
      const fileBase = `${key}-${idx2}.webp`;
      const storagePath = `${subcat.cat}/${subcatSlug}/${fileBase}`;
      const srcPath = path.join(SOURCE_DIR, src);

      const inputBuffer = await fs.readFile(srcPath);
      const webp = await sharp(inputBuffer)
        .rotate()
        .resize({ width: 1080, withoutEnlargement: true })
        .webp({ quality: 82 })
        .toBuffer();

      await uploadWebp(storagePath, webp);

      await sb('POST', '/rest/v1/product_images', {
        product_id: productId,
        image_url: storagePath,
        display_order: idx,
        is_primary: idx === 1,
      }, { Prefer: 'return=minimal' });

      n++;
      console.log(`  [${n}/${MAP.length}] ${storagePath} (${(webp.length/1024).toFixed(0)} KB)`);
    }
  }

  console.log('\n✓ Done.');
}

main().catch(e => { console.error('FAILED:', e); process.exit(1); });
