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
        delayMs: isMobile ? 70 : 110
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

  function positionIndicator(targetElement, animate = true) {
    if (!indicator || !targetElement || !navLinks) return;

    const rect = targetElement.getBoundingClientRect();
    const navRect = navLinks.getBoundingClientRect();
    const isMobile = window.innerWidth <= 768;
    const horizontalPadding = isMobile ? 0 : 12;
    const verticalPadding = isMobile ? 4 : 6;
    const left = isMobile ? 0 : rect.left - navRect.left - horizontalPadding;
    const top = rect.top - navRect.top - verticalPadding;
    const width = isMobile ? '' : `${rect.width + (horizontalPadding * 2)}px`;
    const height = `${rect.height + (verticalPadding * 2)}px`;

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
    indicator.classList.remove('active');
    positionIndicator(currentNavItem, false);

    waitForStableNavLayout().then(() => {
      if (!currentNavItem || !indicator) return;

      positionIndicator(currentNavItem, false);
      window.requestAnimationFrame(() => {
        positionIndicator(currentNavItem, false);
        indicator.classList.add('active');
      });
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

    const currentRect = currentNavItem.getBoundingClientRect();
    const nextRect = nextItem.getBoundingClientRect();
    const navRect = navLinks.getBoundingClientRect();
    const padding = 12;
    const verticalPadding = 6;

    const currentLeft = currentRect.left - navRect.left - padding;
    const nextLeft = nextRect.left - navRect.left - padding;
    const currentTop = currentRect.top - navRect.top - verticalPadding;
    const nextTop = nextRect.top - navRect.top - verticalPadding;
    const currentWidth = currentRect.width + (padding * 2);
    const nextWidth = nextRect.width + (padding * 2);
    const currentHeight = currentRect.height + (verticalPadding * 2);
    const nextHeight = nextRect.height + (verticalPadding * 2);

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
