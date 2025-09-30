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
        navLinks.style.top = (rect.bottom) + 'px';
      }
    }

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

    // Close menu when clicking on a navigation link
    const navItems = navLinks.querySelectorAll('a');
    navItems.forEach(function(item) {
      item.addEventListener('click', function() {
        menuToggle.classList.remove('active');
        navLinks.classList.remove('active');
        menuToggle.setAttribute('aria-expanded', 'false');
      });
    });

    // Close menu on escape key
    document.addEventListener('keydown', function(event) {
      if (event.key === 'Escape' && navLinks.classList.contains('active')) {
        menuToggle.classList.remove('active');
        navLinks.classList.remove('active');
        menuToggle.setAttribute('aria-expanded', 'false');
        menuToggle.focus(); // Return focus to toggle button
      }
    });

    // Handle window resize - close menu if switching to desktop view
    let resizeTimer;
    window.addEventListener('resize', function() {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(function() {
        if (window.innerWidth > 768 && navLinks.classList.contains('active')) {
          menuToggle.classList.remove('active');
          navLinks.classList.remove('active');
          menuToggle.setAttribute('aria-expanded', 'false');
        }
      }, 250);
    });
  }
})();
