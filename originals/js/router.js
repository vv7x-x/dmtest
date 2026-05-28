(function () {
  var PAGE_SCRIPTS = {
    'catalog.html': 'initMain',
    'index.html': 'initMain',
    'about.html': 'initMain',
    'details.html': 'initDetails',
    'checkout.html': 'initCheckout',
    'order-confirmation.html': '',
    'contact.html': 'initContact',
    'auth/login.html': 'initAuth',
    'auth/register.html': 'initAuth',
    'account/profile.html': 'initAuth',
    'account/orders.html': 'initAuth',
    'admin.html': 'initAdmin',
    'pages/order-confirmation.html': 'initOrderConfirmation'
  };

  window.initOrderConfirmation = function () {
    var qs = window._dmRouteQueryString != null ? window._dmRouteQueryString : location.search;
    var params = new URLSearchParams(qs.replace(/^\?/, ''));
    var orderId = params.get('o');
    if (orderId && window.dmCrypto) orderId = dmCrypto.decryptParam(orderId);
    if (!orderId) orderId = params.get('order');
    var el = document.getElementById('orderIdDisplay');
    if (orderId && el) el.textContent = '\u0631\u0642\u0645 \u0627\u0644\u0637\u0644\u0628: ' + orderId;
    else if (el) el.textContent = '\u062A\u0645 \u062A\u0633\u062C\u064A\u0644 \u0637\u0644\u0628\u0643.';
  };

  async function loadPage(fullPath) {
    try {
      var qIdx = fullPath.indexOf('?');
      var path = qIdx >= 0 ? fullPath.substring(0, qIdx) : fullPath;
      var queryString = qIdx >= 0 ? fullPath.substring(qIdx) : '';
      window._dmRouteQueryString = queryString;

      var resp = await fetch(path);
      var html = await resp.text();
      var tmp = document.createElement('div');
      tmp.innerHTML = html;

      var titleEl = tmp.querySelector('title');
      if (titleEl) document.title = titleEl.textContent;

      var oldContent = document.getElementById('app-content');
      var newContent = tmp.querySelector('#app-content');
      if (!newContent) {
        newContent = tmp.querySelector('[class*="page-"], [class*="section"], [class*="container"], [class*="grid"], main, .auth-page, .confirm-page, .details-container, .profile-card');
      }
      if (!newContent) {
        newContent = tmp.querySelector('body > main, body > section, body > .container, body > .page-hero');
      }

      if (oldContent && newContent) {
        oldContent.innerHTML = newContent.outerHTML;
      }

      var fnName = PAGE_SCRIPTS[path];
      if (fnName && window[fnName]) {
        setTimeout(function () {
          window[fnName]();
          if (window.initSession) window.initSession();
        }, 10);
      }
    } catch (err) {
      console.error('[router] loadPage error:', path || fullPath, err);
    }
  }

  function handleRoute() {
    var hash = location.hash.slice(1);
    if (!hash) {
      window._dmRouteQueryString = '';
      if (window.initMain) setTimeout(function () { window.initMain(); if (window.initSession) window.initSession(); }, 10);
      return;
    }
    var fullPath = window.dmCrypto ? dmCrypto.decryptParam(hash) : null;
    if (fullPath && (fullPath.endsWith('.html') || fullPath.indexOf('/') >= 0)) {
      loadPage(fullPath);
    } else {
      loadPage('index.html');
    }
  }

  function decodeGoHref(href) {
    if (href && href.indexOf('/go/') === 0) {
      try {
        return atob(href.substring(4));
      } catch (e) { return null; }
    }
    return href;
  }

  document.addEventListener('click', function (e) {
    var a = e.target.closest('a');
    if (!a) return;
    if (a.hasAttribute('onclick')) return;
    var href = a.getAttribute('href');
    href = decodeGoHref(href);
    if (!href || href === '#' || href.indexOf('http') === 0 || href.indexOf('//') === 0 || href.indexOf('javascript:') === 0 || href.indexOf('tel:') === 0 || href.indexOf('mailto:') === 0 || href.indexOf('whatsapp:') === 0) return;
    if (a.hasAttribute('target')) return;
    if (href.indexOf('.html') === -1 && href.indexOf('/') === -1) return;

    e.preventDefault();
    window.dmRouter.navigate(href);
  });

  window.dmRouter = {
    navigate: function (path) {
      if (!window.dmCrypto) {
        location.href = path;
        return;
      }
      var encrypted = dmCrypto.encryptParam(path);
      location.hash = encrypted;
    },
    init: function () {
      // Handle /go/ paths on initial load
      var goPath = decodeGoHref(location.pathname + location.search);
      if (goPath && goPath !== location.pathname && goPath.indexOf('.html') >= 0) {
        if (window.dmCrypto) {
          location.hash = dmCrypto.encryptParam(goPath);
          return;
        }
      }
      window.addEventListener('hashchange', handleRoute);
      handleRoute();
    }
  };
})();
