/**
 * Mobile Menu Toggle Handler
 * Manages the hamburger menu functionality for responsive navigation
 */
(function() {
  'use strict';

  // Wait for DOM to be fully loaded
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initMenuToggle);
  } else {
    initMenuToggle();
  }

  function initMenuToggle() {
    const menuToggle = document.getElementById('menu-toggle');
    const navLinks = document.getElementById('nav-links');
    const navContainer = document.querySelector('.nav-container');
    
    if (!menuToggle || !navLinks) {
      console.warn('Menu toggle elements not found');
      return;
    }

    // Function to position the dropdown menu
    function positionDropdown() {
      if (navContainer && window.innerWidth <= 768) {
        const rect = navContainer.getBoundingClientRect();
        const topPosition = rect.bottom + window.scrollY;
        navLinks.style.top = topPosition + 'px';
        
        // Update max-height to account for the actual header height
        const maxHeight = window.innerHeight - rect.bottom;
        navLinks.style.setProperty('--mobile-menu-max-height', maxHeight + 'px');
      }
    }

    // Restore menu state from sessionStorage on page load
    function restoreMenuState() {
      if (window.innerWidth <= 768) {
        const wasMenuOpen = sessionStorage.getItem('mobileMenuOpen') === 'true';
        if (wasMenuOpen) {
          // Disable transitions temporarily
          navLinks.style.transition = 'none';
          
          // Apply immediately without animation for instant visibility
          menuToggle.classList.add('active');
          navLinks.classList.add('active');
          menuToggle.setAttribute('aria-expanded', 'true');
          
          // Position the dropdown after DOM is ready
          requestAnimationFrame(() => {
            positionDropdown();
            
            // Re-enable transitions after a frame
            requestAnimationFrame(() => {
              navLinks.style.transition = '';
            });
          });
          
          // Clear the state after a short delay to ensure it's applied
          setTimeout(() => {
            sessionStorage.removeItem('mobileMenuOpen');
          }, 100);
        }
      }
    }

    // Restore menu state on page load (run immediately)
    restoreMenuState();

    // Toggle menu on button click
    menuToggle.addEventListener('click', function() {
      const isExpanded = menuToggle.getAttribute('aria-expanded') === 'true';
      
      // Position the dropdown before showing
      if (!isExpanded) {
        positionDropdown();
      }
      
      // Toggle classes
      menuToggle.classList.toggle('active');
      navLinks.classList.toggle('active');
      
      // Update aria-expanded for accessibility
      menuToggle.setAttribute('aria-expanded', !isExpanded);
    });

    // Close menu when clicking outside
    document.addEventListener('click', function(event) {
      const isClickInsideNav = event.target.closest('.main-navigation');
      
      if (!isClickInsideNav && navLinks.classList.contains('active')) {
        menuToggle.classList.remove('active');
        navLinks.classList.remove('active');
        menuToggle.setAttribute('aria-expanded', 'false');
      }
    });

    // Don't auto-close menu when clicking navigation links
    // Let the navigation handle the transition and keep menu open
    // (The page will navigate anyway, so menu closing is not needed)

    // Close menu on escape key
    document.addEventListener('keydown', function(event) {
      if (event.key === 'Escape' && navLinks.classList.contains('active')) {
        menuToggle.classList.remove('active');
        navLinks.classList.remove('active');
        menuToggle.setAttribute('aria-expanded', 'false');
        menuToggle.focus(); // Return focus to toggle button
      }
    });

    // Handle window resize - close menu if switching to desktop view and reposition if needed
    let resizeTimer;
    window.addEventListener('resize', function() {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(function() {
        if (window.innerWidth > 768) {
          // Reset mobile menu state and inline styles when switching to desktop
          if (navLinks.classList.contains('active')) {
            menuToggle.classList.remove('active');
            navLinks.classList.remove('active');
            menuToggle.setAttribute('aria-expanded', 'false');
          }
          // Clear any inline styles that were added for mobile
          navLinks.style.top = '';
          navLinks.style.removeProperty('--mobile-menu-max-height');
        } else if (window.innerWidth <= 768 && navLinks.classList.contains('active')) {
          // Reposition dropdown on resize when menu is open
          positionDropdown();
        }
      }, 250);
    });
    
    // Reposition on scroll (if needed on some mobile browsers)
    let scrollTimer;
    window.addEventListener('scroll', function() {
      if (window.innerWidth <= 768 && navLinks.classList.contains('active')) {
        clearTimeout(scrollTimer);
        scrollTimer = setTimeout(function() {
          positionDropdown();
        }, 50);
      }
    });
  }
})();
