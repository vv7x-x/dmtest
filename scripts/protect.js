/**
 * DMBooks Protection Build Script
 * - Obfuscates all JS files (javascript-obfuscator)
 * - Minifies CSS (clean-css)
 * - Minifies HTML (html-minifier)
 * - Encodes all href links to /go/<base64> format
 */

const fs = require('fs');
const path = require('path');
const JavaScriptObfuscator = require('javascript-obfuscator');
const CleanCSS = require('clean-css');
const { minify } = require('html-minifier');

const ROOT = path.resolve(__dirname, '..');
const BACKUP_DIR = path.join(ROOT, 'originals');

const HTML_FILES = [
  'index.html', 'catalog.html', 'book-details.html', 'checkout.html',
  'contact.html', 'admin.html', 'privacy.html', 'terms.html',
  'auth/login.html', 'auth/register.html', 'auth/reset-password.html',
  'account/profile.html', 'account/orders.html', 'pages/order-confirmation.html'
];

const JS_FILES = [
  'js/security.js', 'js/crypto-utils.js', 'js/router.js',
  'js/supabase-config.js', 'js/api-guard.js', 'js/books-store.js',
  'js/session.js', 'js/main.js', 'js/details.js', 'js/checkout.js',
  'js/auth.js', 'js/contact.js', 'js/admin.js'
];

const CSS_FILES = ['css/style.css', 'css/admin.css'];

const SKIP_DIRS = ['node_modules', 'originals', 'dm-main', 'scripts'];

// ── Helpers ──

function backup() {
  console.log('[backup] Creating originals backup...');
  if (!fs.existsSync(BACKUP_DIR)) fs.mkdirSync(BACKUP_DIR, { recursive: true });

  const allFiles = [...HTML_FILES, ...JS_FILES, ...CSS_FILES];
  allFiles.forEach(f => {
    const src = path.join(ROOT, f);
    const dst = path.join(BACKUP_DIR, f);
    if (fs.existsSync(src)) {
      fs.mkdirSync(path.dirname(dst), { recursive: true });
      fs.copyFileSync(src, dst);
    }
  });
  console.log(`[backup] Backed up ${allFiles.length} files to ${BACKUP_DIR}`);
}

// ── JS Obfuscation ──

function obfuscateJS(filePath) {
  const code = fs.readFileSync(filePath, 'utf8');
  const result = JavaScriptObfuscator.obfuscate(code, {
    compact: true,
    controlFlowFlattening: true,
    controlFlowFlatteningThreshold: 1,
    deadCodeInjection: true,
    deadCodeInjectionThreshold: 0.6,
    debugProtection: true,
    debugProtectionInterval: 2000,
    disableConsoleOutput: false,
    identifierNamesGenerator: 'hexadecimal',
    log: false,
    numbersToExpressions: true,
    renameGlobals: false,
    selfDefending: true,
    simplify: true,
    splitStrings: true,
    splitStringsChunkLength: 3,
    stringArray: true,
    stringArrayCallsTransform: true,
    stringArrayEncoding: ['rc4', 'base64'],
    stringArrayIndexShift: true,
    stringArrayRotate: true,
    stringArrayShuffle: true,
    stringArrayWrappersCount: 5,
    stringArrayWrappersChainedCalls: true,
    stringArrayWrappersParametersMaxCount: 5,
    stringArrayWrappersType: 'function',
    stringArrayThreshold: 1,
    transformObjectKeys: true,
    unicodeEscapeSequence: false
  });
  fs.writeFileSync(filePath, result.getObfuscatedCode(), 'utf8');
  console.log(`  [JS] Obfuscated: ${path.relative(ROOT, filePath)}`);
}

// ── CSS Minification ──

function minifyCSS(filePath) {
  const code = fs.readFileSync(filePath, 'utf8');
  const result = new CleanCSS({ level: 2 }).minify(code);
  if (result.errors.length) {
    console.error(`  [CSS] Errors: ${result.errors.join(', ')}`);
    return;
  }
  fs.writeFileSync(filePath, result.styles, 'utf8');
  console.log(`  [CSS] Minified: ${path.relative(ROOT, filePath)} (${result.stats.originalSize} → ${result.stats.minifiedSize} bytes)`);
}

// ── HTML Minification + Link Encoding ──

function encodeLinks(html) {
  // Replace href="page.html" with href="/go/<base64>"
  return html.replace(/href="([^"]*\.html[^"]*)"/gi, (match, url) => {
    const encoded = Buffer.from(url, 'utf8').toString('base64');
    return `href="/go/${encoded}"`;
  });
}

function minifyHTML(filePath) {
  let html = fs.readFileSync(filePath, 'utf8');

  // Encode links first
  html = encodeLinks(html);

  const result = minify(html, {
    collapseWhitespace: true,
    removeComments: true,
    removeRedundantAttributes: true,
    removeScriptTypeAttributes: true,
    removeStyleLinkTypeAttributes: true,
    useShortDoctype: true,
    minifyCSS: true,
    minifyJS: true,
    sortAttributes: true,
    sortClassName: true
  });
  fs.writeFileSync(filePath, result, 'utf8');
  console.log(`  [HTML] Minified + links encoded: ${path.relative(ROOT, filePath)}`);
}

// ── Router update ──

function patchRouter() {
  const routerPath = path.join(ROOT, 'js', 'router.js');
  if (!fs.existsSync(routerPath)) return;
  let code = fs.readFileSync(routerPath, 'utf8');
  // /go/ decoding is already built into the source router.js
  if (code.indexOf('decodeGoHref') >= 0) {
    console.log('  [ROUTER] /go/ decoder already present, skipping patch');
    return;
  }
  // Add /go/ decoding support
  const goHandler = `
  function decodeGoHref(href) {
    if (href && href.indexOf('/go/') === 0) {
      try {
        return atob(href.substring(4));
      } catch(e) { return null; }
    }
    return href;
  }
`;

  // Insert after the first var statement
  code = code.replace(/var PAGE_SCRIPTS/, goHandler + '\n  var PAGE_SCRIPTS');

  // Patch the click handler to decode /go/ links
  code = code.replace(
    /var href = a\.getAttribute\('href'\);/,
    `var href = a.getAttribute('href');
    href = decodeGoHref(href);`
  );

  fs.writeFileSync(routerPath, code, 'utf8');
  console.log('  [ROUTER] Patched with /go/ decoder');
}

// ── Main ──

function main() {
  console.log('=== DMBooks Protection Build ===\n');

  // Step 1: Backup originals
  backup();

  // Step 2: Patch router with /go/ decoder
  console.log('\n[step] Patching router with /go/ support...');
  patchRouter();

  // Step 3: Obfuscate JS files
  console.log('\n[step] Obfuscating JS files...');
  JS_FILES.forEach(f => {
    const fullPath = path.join(ROOT, f);
    if (fs.existsSync(fullPath)) obfuscateJS(fullPath);
    else console.warn(`  [WARN] Not found: ${f}`);
  });

  // Step 4: Minify CSS files
  console.log('\n[step] Minifying CSS files...');
  CSS_FILES.forEach(f => {
    const fullPath = path.join(ROOT, f);
    if (fs.existsSync(fullPath)) minifyCSS(fullPath);
    else console.warn(`  [WARN] Not found: ${f}`);
  });

  // Step 5: Minify + encode HTML files
  console.log('\n[step] Processing HTML files...');
  HTML_FILES.forEach(f => {
    const fullPath = path.join(ROOT, f);
    if (fs.existsSync(fullPath)) minifyHTML(fullPath);
    else console.warn(`  [WARN] Not found: ${f}`);
  });

  console.log('\n=== Build complete ===');
  console.log(`Originals saved in: ${BACKUP_DIR}`);
}

main();
