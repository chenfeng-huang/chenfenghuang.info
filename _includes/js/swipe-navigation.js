/**
 * Swipe Navigation for Home, Publications & Competitions, and Blogs
 * Allows users to swipe left/right to navigate between main sections
 */

(function() {
  'use strict';

  // Page order configuration
  const pages = [
    { path: '/', name: 'Home' },
    { path: '/publications/', name: 'Publications & Competitions' },
    { path: '/blog/', name: 'Blogs' }
  ];

  // Get current page index
  function getCurrentPageIndex() {
    const currentPath = window.location.pathname.replace(/\/$/, '') || '/';
    const normalizedPath = currentPath === '' ? '/' : currentPath;
    
    for (let i = 0; i < pages.length; i++) {
      const pagePath = pages[i].path.replace(/\/$/, '') || '/';
      if (normalizedPath === pagePath || 
          (pagePath !== '/' && normalizedPath.startsWith(pagePath))) {
        return i;
      }
    }
    return -1; // Not on a main navigation page
  }

  // Navigate to adjacent page
  function navigateToPage(direction) {
    const currentIndex = getCurrentPageIndex();
    if (currentIndex === -1) return; // Not on a main page

    const nextIndex = currentIndex + direction;
    if (nextIndex >= 0 && nextIndex < pages.length) {
      const nextPage = pages[nextIndex];
      
      // Save mobile menu state if open
      if (window.innerWidth <= 768) {
        const navLinks = document.getElementById('nav-links');
        if (navLinks && navLinks.classList.contains('active')) {
          sessionStorage.setItem('mobileMenuOpen', 'true');
        }
      }
      
      // Add page transition animation
      addPageTransition(direction);
      
      // Navigate after a short delay to show animation
      setTimeout(() => {
        window.location.href = nextPage.path;
      }, 150);
    }
  }

  // Add visual transition effect
  function addPageTransition(direction) {
    const body = document.querySelector('.page-body') || document.body;
    const transitionClass = direction > 0 ? 'swipe-left' : 'swipe-right';
    
    body.classList.add('page-transitioning', transitionClass);
    
    setTimeout(() => {
      body.classList.remove('page-transitioning', transitionClass);
    }, 300);
  }

  // Touch event handling
  let touchStartX = 0;
  let touchStartY = 0;
  let touchEndX = 0;
  let touchEndY = 0;
  let isSwiping = false;
  let swipeDirection = 0;

  const minSwipeDistance = 50; // Minimum distance for a swipe (in pixels)
  const maxVerticalDistance = 100; // Maximum vertical distance to still count as horizontal swipe
  const swipeThreshold = 150; // Distance to trigger navigation

  function handleTouchStart(e) {
    // Don't interfere with scrolling or if touching interactive elements
    const target = e.target;
    if (target.closest('a, button, input, textarea, select')) {
      return;
    }

    touchStartX = e.touches[0].clientX;
    touchStartY = e.touches[0].clientY;
    touchEndX = touchStartX;
    touchEndY = touchStartY;
    isSwiping = true;
    swipeDirection = 0;
  }

  function handleTouchMove(e) {
    if (!isSwiping) return;
    
    touchEndX = e.touches[0].clientX;
    touchEndY = e.touches[0].clientY;
    
    const deltaX = touchEndX - touchStartX;
    const deltaY = touchEndY - touchStartY;
    const absDeltaX = Math.abs(deltaX);
    const absDeltaY = Math.abs(deltaY);
    
    // Only process if it's primarily horizontal
    if (absDeltaX > absDeltaY && absDeltaY < maxVerticalDistance) {
      // Determine direction
      const direction = deltaX > 0 ? -1 : 1; // Swipe right = previous, swipe left = next
      
      // Calculate progress (0 to 1)
      const progress = Math.min(Math.abs(deltaX) / swipeThreshold, 1);
      
      // Animate the indicator if available
      if (window.navIndicator && absDeltaX > 20) {
        window.navIndicator.animateSwipe(direction, progress);
        swipeDirection = direction;
      }
    }
  }

  function handleTouchEnd(e) {
    if (!isSwiping) return;
    isSwiping = false;

    const deltaX = touchEndX - touchStartX;
    const deltaY = touchEndY - touchStartY;
    const absDeltaX = Math.abs(deltaX);
    const absDeltaY = Math.abs(deltaY);

    // Check if it's a horizontal swipe
    if (absDeltaX > minSwipeDistance && absDeltaX > absDeltaY && absDeltaY < maxVerticalDistance) {
      if (deltaX > 0) {
        // Swipe right - go to previous page
        navigateToPage(-1);
      } else {
        // Swipe left - go to next page
        navigateToPage(1);
      }
    } else {
      // Reset indicator if swipe was cancelled
      if (window.navIndicator) {
        window.navIndicator.reset();
      }
    }
    
    swipeDirection = 0;
  }

  // Mouse/trackpad swipe handling (for mobile only)
  let mouseStartX = 0;
  let mouseStartY = 0;
  let isMouseSwiping = false;
  let mouseSwipeDirection = 0;

  // Check if device is mobile
  function isMobileDevice() {
    return window.innerWidth <= 768;
  }

  function handleMouseDown(e) {
    // Only enable mouse swipe on mobile devices
    if (!isMobileDevice()) return;
    
    // Only handle left mouse button
    if (e.button !== 0) return;
    
    // Don't interfere with text selection or interactive elements
    const target = e.target;
    if (target.closest('a, button, input, textarea, select, img')) {
      return;
    }

    mouseStartX = e.clientX;
    mouseStartY = e.clientY;
    isMouseSwiping = true;
    mouseSwipeDirection = 0;
  }

  function handleMouseMove(e) {
    if (!isMouseSwiping || !isMobileDevice()) return;
    
    const deltaX = e.clientX - mouseStartX;
    const deltaY = e.clientY - mouseStartY;
    const absDeltaX = Math.abs(deltaX);
    const absDeltaY = Math.abs(deltaY);
    
    // Only process if it's primarily horizontal
    if (absDeltaX > absDeltaY * 2 && absDeltaX > 10) {
      document.body.style.cursor = deltaX > 0 ? 'w-resize' : 'e-resize';
      
      // Determine direction
      const direction = deltaX > 0 ? -1 : 1;
      
      // Calculate progress
      const progress = Math.min(absDeltaX / swipeThreshold, 1);
      
      // Animate the indicator if available
      if (window.navIndicator && absDeltaX > 20) {
        window.navIndicator.animateSwipe(direction, progress);
        mouseSwipeDirection = direction;
      }
    }
  }

  function handleMouseUp(e) {
    if (!isMouseSwiping) return;
    isMouseSwiping = false;
    document.body.style.cursor = '';

    // Only navigate on mobile devices
    if (!isMobileDevice()) return;

    const deltaX = e.clientX - mouseStartX;
    const deltaY = e.clientY - mouseStartY;
    const absDeltaX = Math.abs(deltaX);
    const absDeltaY = Math.abs(deltaY);

    // Check if it's a horizontal swipe
    if (absDeltaX > minSwipeDistance && absDeltaX > absDeltaY * 2) {
      if (deltaX > 0) {
        // Swipe right - go to previous page
        navigateToPage(-1);
      } else {
        // Swipe left - go to next page
        navigateToPage(1);
      }
    } else {
      // Reset indicator if swipe was cancelled
      if (window.navIndicator) {
        window.navIndicator.reset();
      }
    }
    
    mouseSwipeDirection = 0;
  }

  function handleMouseLeave() {
    if (isMouseSwiping) {
      isMouseSwiping = false;
      document.body.style.cursor = '';
      
      // Reset indicator
      if (window.navIndicator) {
        window.navIndicator.reset();
      }
    }
    mouseSwipeDirection = 0;
  }

  // Keyboard navigation (optional - left/right arrow keys)
  function handleKeyDown(e) {
    // Only on main content area and not in input fields
    if (document.activeElement.tagName === 'INPUT' || 
        document.activeElement.tagName === 'TEXTAREA') {
      return;
    }

    if (e.altKey || e.ctrlKey || e.metaKey) {
      if (e.key === 'ArrowLeft') {
        e.preventDefault();
        navigateToPage(-1);
      } else if (e.key === 'ArrowRight') {
        e.preventDefault();
        navigateToPage(1);
      }
    }
  }

  // Initialize
  function init() {
    // Only activate on main navigation pages
    if (getCurrentPageIndex() === -1) return;

    // Touch events
    document.addEventListener('touchstart', handleTouchStart, { passive: true });
    document.addEventListener('touchmove', handleTouchMove, { passive: true });
    document.addEventListener('touchend', handleTouchEnd, { passive: true });

    // Mouse events (for desktop trackpad gestures)
    document.addEventListener('mousedown', handleMouseDown);
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('mouseleave', handleMouseLeave);

    // Keyboard navigation
    document.addEventListener('keydown', handleKeyDown);

    // Add CSS for transitions
    addTransitionStyles();
  }

  // Add transition styles dynamically
  function addTransitionStyles() {
    const styleId = 'swipe-navigation-styles';
    if (document.getElementById(styleId)) return;

    const style = document.createElement('style');
    style.id = styleId;
    style.textContent = `
      /* Page transition animations */
      .page-body {
        transition: transform 0.3s cubic-bezier(0.4, 0.0, 0.2, 1), 
                    opacity 0.3s ease;
      }

      .page-body.page-transitioning {
        transition: transform 0.15s cubic-bezier(0.4, 0.0, 1, 1), 
                    opacity 0.15s ease;
      }

      .page-body.page-transitioning.swipe-left {
        transform: translateX(-20px);
        opacity: 0.7;
      }

      .page-body.page-transitioning.swipe-right {
        transform: translateX(20px);
        opacity: 0.7;
      }
    `;
    document.head.appendChild(style);
  }

  // Start when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
