/**
 * Lightweight page transitions for same-origin navigation.
 * Keeps the current page visible while the next document is requested.
 */
(function() {
  'use strict';

  const TRANSITION_KEY = 'page-transition-direction';
  const ENTER_CLASSES = ['page-transition-primed', 'page-enter-from-left', 'page-enter-from-right'];
  const prefetched = new Set();

  function prefersReducedMotion() {
    return window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  }

  function getDocumentUrl(href) {
    if (!href) return null;

    let url;
    try {
      url = new URL(href, window.location.href);
    } catch (e) {
      return null;
    }

    if (url.origin !== window.location.origin) return null;

    const sameDocument =
      url.pathname === window.location.pathname &&
      url.search === window.location.search &&
      url.hash;

    return sameDocument ? null : url;
  }

  function setStoredDirection(direction) {
    try {
      sessionStorage.setItem(TRANSITION_KEY, direction);
    } catch (e) {
      // Ignore storage failures; navigation should still work.
    }
  }

  function getStoredDirection() {
    try {
      return sessionStorage.getItem(TRANSITION_KEY);
    } catch (e) {
      return null;
    }
  }

  function clearStoredDirection() {
    try {
      sessionStorage.removeItem(TRANSITION_KEY);
    } catch (e) {
      // Ignore storage failures.
    }
  }

  function clearEnterClasses() {
    document.documentElement.classList.remove(...ENTER_CLASSES);
  }

  function prefetch(href) {
    const url = getDocumentUrl(href);
    if (!url || prefetched.has(url.href)) return;

    prefetched.add(url.href);

    const link = document.createElement('link');
    link.rel = 'prefetch';
    link.as = 'document';
    link.href = url.href;
    document.head.appendChild(link);
  }

  function navigate(href, direction, options = {}) {
    const url = getDocumentUrl(href);
    if (!url) {
      window.location.href = href;
      return;
    }

    const normalizedDirection = direction === 'right' ? 'right' : 'left';
    const pageBody = document.querySelector('.page-body');

    prefetch(url.href);
    setStoredDirection(normalizedDirection);

    if (!pageBody || prefersReducedMotion()) {
      window.location.href = url.href;
      return;
    }

    const distance = options.mobile ? 14 : 18;
    const offset = normalizedDirection === 'left' ? -distance : distance;
    const delay = typeof options.delayMs === 'number' ? options.delayMs : (options.mobile ? 80 : 110);

    pageBody.style.setProperty('--page-leave-x', `${offset}px`);
    pageBody.classList.add('page-leaving');

    window.setTimeout(() => {
      window.location.href = url.href;
    }, delay);
  }

  function finishEnter() {
    const direction = getStoredDirection();
    const pageBody = document.querySelector('.page-body');

    clearStoredDirection();

    if (!direction || !pageBody || prefersReducedMotion()) {
      clearEnterClasses();
      return;
    }

    const enterClass = direction === 'left' ? 'page-enter-from-right' : 'page-enter-from-left';
    document.documentElement.classList.add('page-transition-primed', enterClass);

    window.requestAnimationFrame(() => {
      pageBody.classList.add('page-enter-active');
      clearEnterClasses();

      window.setTimeout(() => {
        pageBody.classList.remove('page-enter-active');
      }, 260);
    });
  }

  window.pageTransition = {
    navigate,
    prefetch,
    finishEnter
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', finishEnter);
  } else {
    finishEnter();
  }
})();
