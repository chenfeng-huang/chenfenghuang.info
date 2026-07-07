/**
 * Apple-style Navigation Indicator
 * Animates a rounded rectangle behind the current navigation item.
 */

(function() {
  'use strict';

  let indicator = null;
  let navLinks = null;
  let currentNavItem = null;

  function init() {
    indicator = document.getElementById('nav-indicator');
    navLinks = document.getElementById('nav-links');

    if (!indicator || !navLinks) return;

    currentNavItem = navLinks.querySelector('.current');

    if (currentNavItem) {
      showInitialIndicator();
    }

    const allNavLinks = navLinks.querySelectorAll('a[data-nav-index]');
    allNavLinks.forEach(link => {
      link.addEventListener('click', handleNavClick);
      link.addEventListener('pointerenter', () => prefetchLink(link));
      link.addEventListener('focus', () => prefetchLink(link));
      link.addEventListener('touchstart', () => prefetchLink(link), { passive: true });
    });

    const homeLogoLinks = document.querySelectorAll('[data-home-logo-link]');
    homeLogoLinks.forEach(link => {
      link.addEventListener('click', handleHomeLogoClick);
      link.addEventListener('pointerenter', () => prefetchLink(link));
      link.addEventListener('focus', () => prefetchLink(link));
      link.addEventListener('touchstart', () => prefetchLink(link), { passive: true });
    });

    window.addEventListener('resize', debounce(() => {
      if (currentNavItem) {
        positionIndicator(currentNavItem, false);
      }
    }, 150));

    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.type !== 'attributes' || mutation.attributeName !== 'class') return;

        const isActive = navLinks.classList.contains('active');
        const isMobile = window.innerWidth <= 768;

        if (isActive && isMobile && currentNavItem) {
          indicator.classList.add('active');
          window.setTimeout(() => {
            positionIndicator(currentNavItem, false);
          }, 180);
        }
      });
    });

    observer.observe(navLinks, {
      attributes: true,
      attributeFilter: ['class']
    });
  }

  function handleNavClick(e) {
    const clickedLink = e.currentTarget;

    if (clickedLink.classList.contains('current') || isModifiedClick(e)) {
      return;
    }

    e.preventDefault();

    const isMobile = window.innerWidth <= 768;

    if (isMobile && navLinks.classList.contains('active')) {
      sessionStorage.setItem('mobileMenuOpen', 'true');
    }

    const currentIndex = currentNavItem ? parseInt(currentNavItem.getAttribute('data-nav-index'), 10) : 0;
    const targetIndex = parseInt(clickedLink.getAttribute('data-nav-index'), 10);
    const direction = targetIndex > currentIndex ? 'left' : 'right';
    const href = clickedLink.getAttribute('href');

    if (!isMobile) {
      positionIndicator(clickedLink, true);

      clickedLink.style.transform = 'scale(0.97)';
      window.setTimeout(() => {
        clickedLink.style.transform = '';
      }, 120);
    }

    if (window.pageTransition) {
      window.pageTransition.navigate(href, direction, {
        mobile: isMobile,
        // Hold the reload until the indicator's glide (see .nav-indicator
        // transition in _navigation.scss) has essentially completed, so the pill
        // arrives at its destination before the page swaps instead of snapping
        // the final few px across the reload.
        delayMs: isMobile ? 70 : 170
      });
    } else {
      window.location.href = href;
    }
  }

  function prefetchLink(link) {
    if (window.pageTransition) {
      window.pageTransition.prefetch(link.getAttribute('href'));
    }
  }

  function handleHomeLogoClick(e) {
    const clickedLink = e.currentTarget;

    if (isModifiedClick(e)) {
      return;
    }

    e.preventDefault();

    const href = clickedLink.getAttribute('href');
    if (isCurrentUrl(href)) {
      return;
    }

    const isMobile = window.innerWidth <= 768;

    if (isMobile && navLinks.classList.contains('active')) {
      sessionStorage.setItem('mobileMenuOpen', 'true');
    }

    if (window.pageTransition) {
      window.pageTransition.navigate(href, 'right', {
        mobile: isMobile,
        delayMs: isMobile ? 70 : 110
      });
    } else {
      window.location.href = href;
    }
  }

  function isCurrentUrl(href) {
    try {
      const targetUrl = new URL(href, window.location.href);
      const currentPath = window.location.pathname.replace(/\/$/, '') || '/';
      const targetPath = targetUrl.pathname.replace(/\/$/, '') || '/';
      return targetUrl.origin === window.location.origin &&
        targetPath === currentPath &&
        targetUrl.search === window.location.search &&
        !targetUrl.hash;
    } catch (e) {
      return false;
    }
  }

  function isModifiedClick(e) {
    return e.defaultPrevented ||
      e.button !== 0 ||
      e.metaKey ||
      e.ctrlKey ||
      e.shiftKey ||
      e.altKey ||
      (e.currentTarget.target && e.currentTarget.target !== '_self');
  }

  // Cumulative CSS zoom applied to the page (see `body { zoom }` in _base.scss).
  // getBoundingClientRect() returns zoom-scaled pixels, whereas the indicator's
  // left/width/height/transform are applied in un-zoomed layout px (then scaled
  // by the same zoom at paint). Divide measured geometry by this to stay aligned.
  // Derive it empirically from navLinks' visual width (rect, zoom-scaled) over its
  // layout width (offsetWidth, not zoom-scaled) — robust across browsers and to
  // where `zoom` is declared. Fall back to the declared value, then to 1.
  function getEffectiveZoom() {
    if (navLinks && navLinks.offsetWidth > 0) {
      const r = navLinks.getBoundingClientRect().width / navLinks.offsetWidth;
      if (r && isFinite(r) && r > 0) return r;
    }
    const z = parseFloat(getComputedStyle(document.body).zoom);
    return (z && isFinite(z) && z > 0) ? z : 1;
  }

  function positionIndicator(targetElement, animate = true) {
    if (!indicator || !targetElement || !navLinks) return;

    const zoom = getEffectiveZoom();
    const rect = targetElement.getBoundingClientRect();
    const navRect = navLinks.getBoundingClientRect();
    const isMobile = window.innerWidth <= 768;
    const horizontalPadding = isMobile ? 0 : 12;
    const verticalPadding = isMobile ? 4 : 6;
    const left = isMobile ? 0 : (rect.left - navRect.left) / zoom - horizontalPadding;
    const top = (rect.top - navRect.top) / zoom - verticalPadding;
    const width = isMobile ? '' : `${rect.width / zoom + (horizontalPadding * 2)}px`;
    const height = `${rect.height / zoom + (verticalPadding * 2)}px`;

    if (!animate) {
      indicator.classList.add('is-positioning');
    }

    indicator.style.top = '0px';
    indicator.style.left = isMobile ? '' : '0px';
    indicator.style.right = isMobile ? '' : 'auto';
    indicator.style.width = width;
    indicator.style.height = height;
    indicator.style.transform = `translate3d(${left}px, ${top}px, 0)`;

    if (!animate) {
      indicator.offsetHeight;
      indicator.classList.remove('is-positioning');
    }
  }

  function showInitialIndicator() {
    // Position AND reveal the pill immediately, with no opacity fade. Tab widths
    // are fixed, so the position is correct on the first frame — waiting for
    // fonts (as before) left the pill invisible for ~150ms after each tab
    // navigation, so it blinked out and faded back in. Revealing it instantly,
    // at the spot it already occupied on the previous page, makes the hand-off
    // across the page reload seamless (no flash).
    positionIndicator(currentNavItem, false);
    indicator.classList.add('is-positioning'); // suppress the opacity transition
    indicator.classList.add('active');
    indicator.offsetHeight;                     // commit opacity:1 with no fade
    indicator.classList.remove('is-positioning');

    // Re-verify position once fonts/layout settle (tab heights can shift a hair).
    // It's already visible, so this only nudges geometry — it can't flash.
    waitForStableNavLayout().then(() => {
      if (!currentNavItem || !indicator) return;
      positionIndicator(currentNavItem, false);
    });
  }

  function waitForStableNavLayout() {
    const fontReady = document.fonts && document.fonts.ready
      ? Promise.race([
          document.fonts.ready,
          new Promise(resolve => window.setTimeout(resolve, 400))
        ])
      : Promise.resolve();

    return fontReady
      .then(nextFrame)
      .then(nextFrame);
  }

  function nextFrame() {
    return new Promise(resolve => window.requestAnimationFrame(resolve));
  }

  function animateIndicatorSwipe(direction, progress = 0) {
    if (!currentNavItem || !indicator || !navLinks) return;

    const currentIndex = parseInt(currentNavItem.getAttribute('data-nav-index'), 10);
    const nextIndex = currentIndex + direction;
    const navItems = Array.from(navLinks.querySelectorAll('a[data-nav-index]'));
    const nextItem = navItems[nextIndex];

    if (!nextItem) return;

    const zoom = getEffectiveZoom();
    const currentRect = currentNavItem.getBoundingClientRect();
    const nextRect = nextItem.getBoundingClientRect();
    const navRect = navLinks.getBoundingClientRect();
    const padding = 12;
    const verticalPadding = 6;

    const currentLeft = (currentRect.left - navRect.left) / zoom - padding;
    const nextLeft = (nextRect.left - navRect.left) / zoom - padding;
    const currentTop = (currentRect.top - navRect.top) / zoom - verticalPadding;
    const nextTop = (nextRect.top - navRect.top) / zoom - verticalPadding;
    const currentWidth = currentRect.width / zoom + (padding * 2);
    const nextWidth = nextRect.width / zoom + (padding * 2);
    const currentHeight = currentRect.height / zoom + (verticalPadding * 2);
    const nextHeight = nextRect.height / zoom + (verticalPadding * 2);

    const interpolatedLeft = currentLeft + (nextLeft - currentLeft) * progress;
    const interpolatedTop = currentTop + (nextTop - currentTop) * progress;
    const interpolatedWidth = currentWidth + (nextWidth - currentWidth) * progress;
    const interpolatedHeight = currentHeight + (nextHeight - currentHeight) * progress;

    indicator.classList.add('is-positioning');
    indicator.style.top = '0px';
    indicator.style.left = '0px';
    indicator.style.right = 'auto';
    indicator.style.transform = `translate3d(${interpolatedLeft}px, ${interpolatedTop}px, 0)`;
    indicator.style.width = `${interpolatedWidth}px`;
    indicator.style.height = `${interpolatedHeight}px`;
  }

  function resetIndicator() {
    if (currentNavItem) {
      indicator.classList.remove('is-positioning');
      positionIndicator(currentNavItem);
    }
  }

  function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
      window.clearTimeout(timeout);
      timeout = window.setTimeout(() => {
        func(...args);
      }, wait);
    };
  }

  window.navIndicator = {
    animateSwipe: animateIndicatorSwipe,
    reset: resetIndicator,
    reposition: () => {
      if (currentNavItem) positionIndicator(currentNavItem, false);
    }
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
