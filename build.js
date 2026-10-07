import { readFileSync, existsSync } from 'fs';

const files = ['index.html', 'privacy-policy.html', 'return-policy.html'];
let ok = true;

for (const file of files) {
  if (!existsSync(file)) {
    console.error(`FAIL: ${file} not found`);
    ok = false;
    continue;
  }
  const content = readFileSync(file, 'utf-8');
  const hasDoctype = content.trimStart().startsWith('<!doctype html>');
  const hasClosingHtml = content.trimEnd().endsWith('</html>');
  if (!hasDoctype) {
    console.error(`FAIL: ${file} missing <!doctype html>`);
    ok = false;
  }
  if (!hasClosingHtml) {
    console.error(`FAIL: ${file} missing </html>`);
    ok = false;
  }
  console.log(`OK: ${file} (${content.length} bytes)`);
}

if (!ok) {
  console.error('Build failed');
  process.exit(1);
}
console.log('Build succeeded — all files validated.');
