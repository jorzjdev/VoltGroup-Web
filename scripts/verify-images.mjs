import { imageUrlsToVerify } from '../src/data/content.js';

async function check(url) {
  const response = await fetch(url, { method: 'GET', redirect: 'follow' });
  const type = response.headers.get('content-type') || '';
  const ok = response.ok && type.startsWith('image/');
  return { url, status: response.status, type, ok };
}

const results = await Promise.all(imageUrlsToVerify.map(check));
const failed = results.filter((r) => !r.ok);

for (const r of results) {
  console.log(r.ok ? 'OK' : 'FAIL', r.status, r.type, r.url.slice(0, 90));
}

if (failed.length) {
  console.error(`\n${failed.length} image(s) unavailable`);
  process.exit(1);
}

console.log(`\nAll ${results.length} images are available.`);
