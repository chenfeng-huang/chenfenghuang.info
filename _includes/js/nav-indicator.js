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

    // Watch for mobile menu open/close to reposition indicator
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
          const isActive = navLinks.classList.contains('active');
          const isMobile = window.innerWidth <= 768;
          
          if (isActive && isMobile && currentNavItem) {
            // Ensure indicator is visible and positioned after menu animation
            indicator.classList.add('active');
            // Wait for menu animation to complete (350ms transition + buffer)
            setTimeout(() => {
              positionIndicator(currentNavItem, false);
            }, 400);
          }
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
    
    // Don't animate if clicking the current page
    if (clickedLink.classList.contains('current')) {
      return;
    }

    // Prevent immediate navigation
    e.preventDefault();
    
    // Check if we're in mobile view
    const isMobile = window.innerWidth <= 768;
    
    // Save mobile menu state if open
    if (isMobile) {
      const navLinks = document.getElementById('nav-links');
      if (navLinks && navLinks.classList.contains('active')) {
        sessionStorage.setItem('mobileMenuOpen', 'true');
      }
    }
    
    // Determine swipe direction based on navigation indices
    const currentIndex = currentNavItem ? parseInt(currentNavItem.getAttribute('data-nav-index')) : 0;
    const targetIndex = parseInt(clickedLink.getAttribute('data-nav-index'));
    const direction = targetIndex > currentIndex ? 'left' : 'right';
    
    // Animate indicator to the clicked item (desktop only)
    if (!isMobile) {
      positionIndicator(clickedLink, true);
      
      // Add a scaling effect for feedback
      clickedLink.style.transform = 'scale(0.95)';
      setTimeout(() => {
        clickedLink.style.transform = '';
      }, 150);
      
      // Add page swipe animation
      addPageSwipeAnimation(direction, false);
      
      // Navigate after animation
      const href = clickedLink.getAttribute('href');
      setTimeout(() => {
        window.location.href = href;
      }, 400);
    } else {
      // Mobile: Navigate immediately without animation
      const href = clickedLink.getAttribute('href');
      window.location.href = href;
    }
  }

  function addPageSwipeAnimation(direction, isMobile = false) {
    const pageBody = document.querySelector('.page-body');
    if (!pageBody) return;
    
    // Add the swipe animation class
    pageBody.classList.add('page-swipe-out', `swipe-out-${direction}`);
    
    // Faster animation for mobile
    if (isMobile) {
      pageBody.classList.add('mobile-swipe');
    }
    
    // Remove classes after animation
    const duration = isMobile ? 250 : 400;
    setTimeout(() => {
      pageBody.classList.remove('page-swipe-out', `swipe-out-${direction}`, 'mobile-swipe');
    }, duration);
  }

  function positionIndicator(targetElement, animate = true) {
    if (!indicator || !targetElement) return;

    // Get the position and size of the target element
    const rect = targetElement.getBoundingClientRect();
    const navRect = navLinks.getBoundingClientRect();
    
    // Check if we're in mobile view (vertical layout)
    const isMobile = window.innerWidth <= 768;
    
    if (isMobile) {
      // Mobile: vertical layout - position from top
      const top = rect.top - navRect.top;
      const height = rect.height;
      const verticalPadding = 4;
      
      // Clear desktop positioning
      indicator.style.left = '';
      indicator.style.width = '';
      
      // Apply mobile positioning
      indicator.style.top = `${top - verticalPadding}px`;
      indicator.style.height = `${height + (verticalPadding * 2)}px`;
    } else {
      // Desktop: horizontal layout - position from left
      const left = rect.left - navRect.left;
      const width = rect.width;
      const height = rect.height;
      const padding = 12;
      const verticalPadding = 6;
      
      // Clear mobile positioning
      indicator.style.top = '';
      
      // Apply desktop positioning
      indicator.style.left = `${left - padding}px`;
      indicator.style.width = `${width + (padding * 2)}px`;
      indicator.style.height = `${height + (verticalPadding * 2)}px`;
    }
    
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
    const verticalPadding = 6;
    
    // Calculate interpolated position
    const currentLeft = currentRect.left - navRect.left - padding;
    const nextLeft = nextRect.left - navRect.left - padding;
    const currentWidth = currentRect.width + (padding * 2);
    const nextWidth = nextRect.width + (padding * 2);
    const currentHeight = currentRect.height + (verticalPadding * 2);
    const nextHeight = nextRect.height + (verticalPadding * 2);
    
    const interpolatedLeft = currentLeft + (nextLeft - currentLeft) * progress;
    const interpolatedWidth = currentWidth + (nextWidth - currentWidth) * progress;
    const interpolatedHeight = currentHeight + (nextHeight - currentHeight) * progress;
    
    // Apply the interpolated position
    indicator.style.transition = 'none';
    indicator.style.left = `${interpolatedLeft}px`;
    indicator.style.width = `${interpolatedWidth}px`;
    indicator.style.height = `${interpolatedHeight}px`;
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
