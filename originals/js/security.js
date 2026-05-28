(function () {
  var KEY = '_dmSecure';
  if (window[KEY]) return;
  window[KEY] = true;

  // ── Anti-Copy, Right-Click, Selection ──
  document.addEventListener('contextmenu', function (e) { e.preventDefault(); return false; });
  document.addEventListener('copy', function (e) { e.preventDefault(); return false; });
  document.addEventListener('cut', function (e) { e.preventDefault(); return false; });
  document.addEventListener('selectstart', function (e) { e.preventDefault(); return false; });
  document.addEventListener('dragstart', function (e) { e.preventDefault(); return false; });
  document.addEventListener('drop', function (e) { e.preventDefault(); return false; });

  // ── Keyboard shortcuts for DevTools ──
  document.addEventListener('keydown', function (e) {
    if (
      e.keyCode === 123 ||
      (e.ctrlKey && e.shiftKey && (e.keyCode === 73 || e.keyCode === 74 || e.keyCode === 67)) ||
      (e.ctrlKey && e.keyCode === 85) ||
      (e.ctrlKey && e.shiftKey && e.keyCode === 74)
    ) {
      e.preventDefault();
      return false;
    }
  });

  // ── Anti-DevTools: detect open tools ──
  function detectDevTools() {
    var threshold = 160;
    var start = new Date();
    debugger;
    var elapsed = new Date() - start;
    if (elapsed > threshold) {
      return true;
    }
    return false;
  }

  function scanDevTools() {
    if (detectDevTools()) {
      document.title = '[Protected]';
      document.body.innerHTML = '<h1 style="text-align:center;margin-top:20vh;color:#c00;">\u062A\u0645 \u062D\u0645\u0627\u064A\u0629 \u0627\u0644\u0635\u0641\u062D\u0629</h1>';
      throw new Error('DevTools detected');
    }
  }

  // ── DevTools detection via element ghost ──
  (function detectDevToolsElement() {
    var el = document.createElement('div');
    Object.defineProperty(el, 'id', {
      get: function () {
        document.title = '[Protected]';
        document.body.innerHTML = '<h1 style="text-align:center;margin-top:20vh;color:#c00;">\u062A\u0645 \u062D\u0645\u0627\u064A\u0629 \u0627\u0644\u0635\u0641\u062D\u0629</h1>';
        throw new Error('DevTools detected via element');
      }
    });
    setInterval(function () { console.log(el); }, 4000);
  })();

  // ── Anti-Debugging: override console ──
  if (typeof window._consoleRestored === 'undefined') {
    window._consoleRestored = true;
    var noop = function () {};
    var methods = ['log', 'info', 'warn', 'error', 'debug', 'trace', 'dir', 'table', 'group', 'groupEnd'];
    methods.forEach(function (m) {
      try {
        var original = console[m];
        console[m] = function () {
          if (detectDevTools()) {
            document.title = '[Protected]';
            document.body.innerHTML = '<h1 style="text-align:center;margin-top:20vh;color:#c00;">\u062A\u0645 \u062D\u0645\u0627\u064A\u0629 \u0627\u0644\u0635\u0641\u062D\u0629</h1>';
            throw new Error('Console tampered');
          }
          return original.apply(console, arguments);
        };
      } catch (e) {}
    });
  }

  // ── Periodic scanner ──
  scanDevTools();
  setInterval(scanDevTools, 3000);

  // ── Anti-Firebug ──
  if (window.console && console.firebug) {
    document.title = '[Protected]';
    document.body.innerHTML = '<h1 style="text-align:center;margin-top:20vh;color:#c00;">\u062A\u0645 \u062D\u0645\u0627\u064A\u0629 \u0627\u0644\u0635\u0641\u062D\u0629</h1>';
  }

  // ── Check if page was loaded in iframe (clickjacking) ──
  if (window.top !== window.self) {
    window.top.location = window.location;
  }
})();
