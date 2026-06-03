(function () {
  try {
    var k = 'voltgroup-theme';
    var t = localStorage.getItem(k);
    var d = document.documentElement;
    if (t === 'light' || t === 'dark') {
      d.setAttribute('data-theme', t);
    } else {
      d.setAttribute('data-theme', 'dark');
    }
  } catch (e) {
    document.documentElement.setAttribute('data-theme', 'dark');
  }
})();
