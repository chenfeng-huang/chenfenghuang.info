// Theme Toggle Functionality
(function() {
    'use strict';
    
    const THEME_KEY = 'theme-preference';
    const LIGHT_THEME = 'light';
    const DARK_THEME = 'dark';
    
    // Get DOM elements
    const themeToggle = document.getElementById('theme-toggle');
    const themeThumb = document.querySelector('.theme-toggle-thumb');
    
    // Get stored theme or default to light
    function getStoredTheme() {
        return localStorage.getItem(THEME_KEY) || LIGHT_THEME;
    }
    
    // Store theme preference
    function storeTheme(theme) {
        localStorage.setItem(THEME_KEY, theme);
    }
    
    // Update toggle visuals and meta
    function updateThemeToggle(theme) {
        if (themeToggle) {
            themeToggle.setAttribute('aria-pressed', theme === DARK_THEME ? 'true' : 'false');
        }
        if (themeThumb) {
            themeThumb.dataset.theme = theme;
        }
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
        
        if (themeToggle) {
            themeToggle.addEventListener('click', toggleTheme);
            themeToggle.addEventListener('keydown', function(e) {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    toggleTheme();
                }
            });
        }
    }
    
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
