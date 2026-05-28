(function () {
  'use strict';

  function b64u(str) {
    return btoa(str).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
  }
  function b64d(str) {
    str = str.replace(/-/g, '+').replace(/_/g, '/');
    while (str.length % 4) str += '=';
    return atob(str);
  }

  function getDeviceKey() {
    var cached = sessionStorage.getItem('_dm_key');
    if (cached) return cached;
    var stored = localStorage.getItem('_dm_key');
    if (stored) {
      sessionStorage.setItem('_dm_key', stored);
      return stored;
    }
    var arr = new Uint8Array(32);
    crypto.getRandomValues(arr);
    var key = Array.from(arr, function (b) { return String.fromCharCode(b); }).join('');
    localStorage.setItem('_dm_key', key);
    sessionStorage.setItem('_dm_key', key);
    return key;
  }

  function xorCrypt(text, key) {
    var result = '';
    for (var i = 0; i < text.length; i++) {
      result += String.fromCharCode(
        text.charCodeAt(i) ^ key.charCodeAt(i % key.length)
      );
    }
    return result;
  }

  window.dmCrypto = {
    encryptParam: function (value) {
      var str = String(value);
      var key = getDeviceKey();
      var salt = Array.from({ length: 8 }, function () {
        return String.fromCharCode(Math.floor(Math.random() * 256));
      }).join('');
      var mixedKey = '';
      for (var i = 0; i < key.length; i++) {
        mixedKey += String.fromCharCode(
          key.charCodeAt(i) ^ salt.charCodeAt(i % salt.length)
        );
      }
      var encrypted = salt + xorCrypt(str, mixedKey);
      return b64u(encrypted);
    },

    decryptParam: function (encoded) {
      try {
        var raw = b64d(encoded);
        var salt = raw.slice(0, 8);
        var ciphertext = raw.slice(8);
        var key = getDeviceKey();
        var mixedKey = '';
        for (var i = 0; i < key.length; i++) {
          mixedKey += String.fromCharCode(
            key.charCodeAt(i) ^ salt.charCodeAt(i % salt.length)
          );
        }
        return xorCrypt(ciphertext, mixedKey);
      } catch (e) {
        console.warn('[dmCrypto] decryptParam failed:', e);
        return null;
      }
    },

    encryptData: function (data) {
      var json = JSON.stringify(data);
      var key = getDeviceKey();
      var salt = Array.from({ length: 8 }, function () {
        return String.fromCharCode(Math.floor(Math.random() * 256));
      }).join('');
      var mixedKey = '';
      for (var i = 0; i < key.length; i++) {
        mixedKey += String.fromCharCode(
          key.charCodeAt(i) ^ salt.charCodeAt(i % salt.length)
        );
      }
      return salt + xorCrypt(json, mixedKey);
    },

    decryptData: function (encoded) {
      try {
        var salt = encoded.slice(0, 8);
        var ciphertext = encoded.slice(8);
        var key = getDeviceKey();
        var mixedKey = '';
        for (var i = 0; i < key.length; i++) {
          mixedKey += String.fromCharCode(
            key.charCodeAt(i) ^ salt.charCodeAt(i % salt.length)
          );
        }
        var decrypted = xorCrypt(ciphertext, mixedKey);
        return JSON.parse(decrypted);
      } catch (e) {
        console.warn('[dmCrypto] decryptData failed:', e);
        return null;
      }
    }
  };

  window.dmStorage = {
    get: function (key, fallback) {
      if (fallback === undefined) fallback = null;
      try {
        var raw = localStorage.getItem(key);
        if (!raw) return fallback;
        if ((raw.indexOf('{') === 0 || raw.indexOf('[') === 0) && window.dmCrypto) {
          var parsed = JSON.parse(raw);
          localStorage.setItem(key, '_e:' + dmCrypto.encryptData(parsed));
          return parsed;
        }
        if (raw.indexOf('_e:') === 0) {
          if (!window.dmCrypto) {
            console.warn('[dmStorage] dmCrypto not available, using raw data');
            return fallback;
          }
          var decrypted = dmCrypto.decryptData(raw.slice(3));
          return decrypted !== null ? decrypted : fallback;
        }
        return JSON.parse(raw);
      } catch (e) {
        console.warn('[dmStorage] get(' + key + ') failed:', e);
        return fallback;
      }
    },
    set: function (key, data) {
      try {
        if (window.dmCrypto) {
          localStorage.setItem(key, '_e:' + dmCrypto.encryptData(data));
        } else {
          localStorage.setItem(key, JSON.stringify(data));
        }
      } catch (e) {
        console.warn('[dmStorage] set(' + key + ') failed:', e);
      }
    },
    remove: function (key) {
      localStorage.removeItem(key);
    }
  };
})();
