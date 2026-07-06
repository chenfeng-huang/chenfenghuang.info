(function () {
  function updateGitHubStarsOnPage() {
    var elements = document.querySelectorAll('.gh-stars[data-repo]');
    if (!elements.length) return;

    elements.forEach(function (el) {
      var repo = el.getAttribute('data-repo');
      var countEl = el.querySelector('.count');
      if (!repo || !countEl) return;

      countEl.textContent = '...';

      try {
        var raw = localStorage.getItem('gh-stars-v5:' + repo);
        if (raw) {
          var cached = JSON.parse(raw);
          if (cached && Date.now() - cached.timestamp < 3600000) {
            countEl.textContent = String(cached.count);
            return;
          }
        }
      } catch (e) { /* ignore */ }

      if (typeof fetch === 'undefined') {
        countEl.textContent = '?';
        return;
      }

      fetch('https://api.github.com/repos/' + repo)
        .then(function (r) {
          if (!r.ok) throw new Error('HTTP ' + r.status);
          return r.json();
        })
        .then(function (data) {
          var stars = data.stargazers_count || 0;
          countEl.textContent = String(stars);
          try {
            localStorage.setItem('gh-stars-v5:' + repo, JSON.stringify({
              count: stars,
              timestamp: Date.now()
            }));
          } catch (e) { /* ignore */ }
        })
        .catch(function () {
          countEl.textContent = '0';
        });
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', updateGitHubStarsOnPage);
  } else {
    updateGitHubStarsOnPage();
  }
})();
