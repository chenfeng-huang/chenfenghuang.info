/**
 * Apple-style Navigation Indicator
 * Animates a rounded rectangle behind the current navigation item
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

    // Find the current navigation item
    currentNavItem = navLinks.querySelector('.current');
    
    if (currentNavItem) {
      // Position the indicator initially
      positionIndicator(currentNavItem);
      
      // Show the indicator after positioning
      setTimeout(() => {
        indicator.classList.add('active');
      }, 100);
    }

    // Add click handlers to navigation links
    const allNavLinks = navLinks.querySelectorAll('a[data-nav-index]');
    allNavLinks.forEach(link => {
      link.addEventListener('click', handleNavClick);
    });

    // Update indicator on window resize
    window.addEventListener('resize', debounce(() => {
      if (currentNavItem) {
        positionIndicator(currentNavItem);
      }
    }, 150));
  }

  function handleNavClick(e) {
    const clickedLink = e.currentTarget;
    
    // Don't animate if clicking the current page
    if (clickedLink.classList.contains('current')) {
      return;
    }

    // Prevent immediate navigation
    e.preventDefault();
    
    // Determine swipe direction based on navigation indices
    const currentIndex = currentNavItem ? parseInt(currentNavItem.getAttribute('data-nav-index')) : 0;
    const targetIndex = parseInt(clickedLink.getAttribute('data-nav-index'));
    const direction = targetIndex > currentIndex ? 'left' : 'right';
    
    // Animate indicator to the clicked item
    positionIndicator(clickedLink, true);
    
    // Add a scaling effect for feedback
    clickedLink.style.transform = 'scale(0.95)';
    setTimeout(() => {
      clickedLink.style.transform = '';
    }, 150);
    
    // Add page swipe animation
    addPageSwipeAnimation(direction);
    
    // Navigate after animation
    const href = clickedLink.getAttribute('href');
    setTimeout(() => {
      window.location.href = href;
    }, 400);
  }

  function addPageSwipeAnimation(direction) {
    const pageBody = document.querySelector('.page-body');
    if (!pageBody) return;
    
    // Add the swipe animation class
    pageBody.classList.add('page-swipe-out', `swipe-out-${direction}`);
    
    // Remove classes after animation
    setTimeout(() => {
      pageBody.classList.remove('page-swipe-out', `swipe-out-${direction}`);
    }, 400);
  }

  function positionIndicator(targetElement, animate = true) {
    if (!indicator || !targetElement) return;

    // Get the position and size of the target element
    const rect = targetElement.getBoundingClientRect();
    const navRect = navLinks.getBoundingClientRect();
    
    // Calculate position relative to nav-links container
    const left = rect.left - navRect.left;
    const width = rect.width;
    
    // Add some padding to the indicator
    const padding = 12;
    
    // Apply the position and size
    indicator.style.left = `${left - padding}px`;
    indicator.style.width = `${width + (padding * 2)}px`;
    
    if (!animate) {
      indicator.style.transition = 'none';
      setTimeout(() => {
        indicator.style.transition = '';
      }, 0);
    }
  }

  // Animate indicator during swipe
  function animateIndicatorSwipe(direction, progress = 0) {
    if (!currentNavItem || !indicator) return;

    const currentIndex = parseInt(currentNavItem.getAttribute('data-nav-index'));
    const nextIndex = currentIndex + direction;
    
    // Get all nav items
    const navItems = Array.from(navLinks.querySelectorAll('a[data-nav-index]'));
    const nextItem = navItems[nextIndex];
    
    if (!nextItem) return;

    // Get positions of current and next items
    const currentRect = currentNavItem.getBoundingClientRect();
    const nextRect = nextItem.getBoundingClientRect();
    const navRect = navLinks.getBoundingClientRect();
    
    const padding = 12;
    
    // Calculate interpolated position
    const currentLeft = currentRect.left - navRect.left - padding;
    const nextLeft = nextRect.left - navRect.left - padding;
    const currentWidth = currentRect.width + (padding * 2);
    const nextWidth = nextRect.width + (padding * 2);
    
    const interpolatedLeft = currentLeft + (nextLeft - currentLeft) * progress;
    const interpolatedWidth = currentWidth + (nextWidth - currentWidth) * progress;
    
    // Apply the interpolated position
    indicator.style.transition = 'none';
    indicator.style.left = `${interpolatedLeft}px`;
    indicator.style.width = `${interpolatedWidth}px`;
  }

  // Reset indicator to current position
  function resetIndicator() {
    if (currentNavItem) {
      indicator.style.transition = '';
      positionIndicator(currentNavItem);
    }
  }

  // Debounce helper
  function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  }

  // Expose functions for use by swipe navigation
  window.navIndicator = {
    animateSwipe: animateIndicatorSwipe,
    reset: resetIndicator,
    reposition: () => {
      if (currentNavItem) positionIndicator(currentNavItem);
    }
  };

  // Initialize when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
