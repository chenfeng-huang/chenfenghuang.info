// Theme Toggle Functionality
(function() {
    'use strict';
    
    const THEME_KEY = 'theme-preference';
    const LIGHT_THEME = 'light';
    const DARK_THEME = 'dark';
    
    // Get DOM elements
    const themeToggle = document.getElementById('theme-toggle');
    const themeThumb = document.querySelector('.theme-toggle-thumb');
    const themeTrack = document.querySelector('.theme-toggle-track');
    
    // Get stored theme or default to light
    function getStoredTheme() {
        return localStorage.getItem(THEME_KEY) || LIGHT_THEME;
    }
    
    // Store theme preference
    function storeTheme(theme) {
        localStorage.setItem(THEME_KEY, theme);
    }
    
    // Update theme icon and update meta theme-color for mobile UI
    function updateThemeToggle(theme) {
        if (themeToggle) {
            themeToggle.setAttribute('aria-pressed', theme === DARK_THEME ? 'true' : 'false');
        }
        if (themeThumb) {
            themeThumb.dataset.theme = theme;
        }
        if (themeTrack) {
            themeTrack.dataset.theme = theme;
        }
        // Update theme-color meta so iOS/Android top bars match theme immediately
        const meta = document.querySelector('meta[name="theme-color"]');
        const bg = getComputedStyle(document.documentElement)
            .getPropertyValue('--header-bg') || getComputedStyle(document.body).backgroundColor;
        if (meta) {
            meta.setAttribute('content', bg.trim());
        }
    }
    
    // Apply theme to document
    function applyTheme(theme) {
        if (theme === DARK_THEME) {
            document.documentElement.setAttribute('data-theme', 'dark');
        } else {
            document.documentElement.removeAttribute('data-theme');
        }
        updateThemeToggle(theme);
        storeTheme(theme);
    }
    
    // Toggle between themes
    function toggleTheme() {
        const currentTheme = getStoredTheme();
        const newTheme = currentTheme === DARK_THEME ? LIGHT_THEME : DARK_THEME;
        applyTheme(newTheme);
    }
    
    // Initialize theme on page load
    function initTheme() {
        const storedTheme = getStoredTheme();
        
        // Check for system preference if no stored theme
        if (!localStorage.getItem(THEME_KEY)) {
            const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
            const initialTheme = prefersDark ? DARK_THEME : LIGHT_THEME;
            applyTheme(initialTheme);
        } else {
            applyTheme(storedTheme);
        }
    }
    
    // Listen for system theme changes
    function watchSystemTheme() {
        if (window.matchMedia) {
            const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
            mediaQuery.addEventListener('change', function(e) {
                // Only auto-switch if user hasn't manually set a preference
                if (!localStorage.getItem(THEME_KEY)) {
                    const newTheme = e.matches ? DARK_THEME : LIGHT_THEME;
                    applyTheme(newTheme);
                }
            });
        }
    }
    
    // Initialize when DOM is ready
    function init() {
        initTheme();
        watchSystemTheme();
        
        // Add click event listener to toggle button
        if (themeToggle) {
            themeToggle.addEventListener('click', toggleTheme);
        }
        
        // Add keyboard support
        if (themeToggle) {
            themeToggle.addEventListener('keydown', function(e) {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    toggleTheme();
                }
            });
        }
    }
    
    // Initialize immediately if DOM is already loaded, otherwise wait
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
