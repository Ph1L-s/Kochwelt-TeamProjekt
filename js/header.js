/**
 * header.js - Mit wechselnden Unterstricheffekten für die Navigation "Bürgermenu"
 */
document.addEventListener('DOMContentLoaded', function() {
    // Menü-Toggle-Funktionalität für mobile Ansicht
    const menuToggle = document.querySelector('.menu-toggle');
    const compactNavbar = document.querySelector('.compact-navbar');
    
    if (menuToggle && compactNavbar) {
        // Klick-Event für Menü-Toggle
        menuToggle.addEventListener('click', function(e) {
            e.stopPropagation();
            this.classList.toggle('active');
            compactNavbar.classList.toggle('active');
        });
        
        // Klick auf Links im Menü sollte das Menü schließen
        const navLinks = compactNavbar.querySelectorAll('a');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                menuToggle.classList.remove('active');
                compactNavbar.classList.remove('active');
            });
        });
        
        // Klick außerhalb des Menüs schließt es
        document.addEventListener('click', function(e) {
            if (!compactNavbar.contains(e.target) && !menuToggle.contains(e.target)) {
                menuToggle.classList.remove('active');
                compactNavbar.classList.remove('active');
            }
        });
    }
    
    // Bewegliche Unterstriche für Desktop-Navigation
    const navbar = document.querySelector('.navbar');
    const navbarLinks = navbar ? navbar.querySelectorAll('a') : [];
    
    if (navbar && navbarLinks.length > 0) {
        // Erstelle den beweglichen Unterstrich-Element
        const hoverUnderline = document.createElement('div');
        hoverUnderline.className = 'hover-underline';
        navbar.appendChild(hoverUnderline);
        
        // Finde den aktiven Link
        let activeLink = null;
        navbarLinks.forEach(link => {
            if (link.classList.contains('active') || link.id === 'start') {
                activeLink = link;
            }
        });
        
        // Mouse-Enter-Event für alle Links
        navbarLinks.forEach(link => {
            link.addEventListener('mouseenter', function() {
                // Zeige den Hover-Unterstrich für ALLE Links - auch für den aktiven
                moveHoverUnderline(this);
                hoverUnderline.style.opacity = '1';
            });
        });
        
        // Mouse-Enter für die Navbar - versteckt automatisch den festen Unterstrich über CSS
        navbar.addEventListener('mouseenter', function() {
            // Der feste Unterstrich wird über CSS-Regel .navbar:hover a.active::after ausgeblendet
        });
        
        // Mouse-Leave-Event für die gesamte Navbar
        navbar.addEventListener('mouseleave', function() {
            // Verstecke den Hover-Unterstrich, wenn die Maus die Navbar verlässt
            hoverUnderline.style.opacity = '0';
            
            // Der feste Unterstrich wird automatisch wieder sichtbar, da hover nicht mehr gilt
        });
        
        /**
         * Bewegt den Hover-Unterstrich unter den angegebenen Link
         * @param {HTMLElement} link - Der Link, unter dem der Unterstrich angezeigt werden soll
         */
        function moveHoverUnderline(link) {
            if (!link) return;
            
            const linkRect = link.getBoundingClientRect();
            const navRect = navbar.getBoundingClientRect();
            
            // Berechne die Position und Breite des Unterstrichs
            const leftPosition = linkRect.left - navRect.left;
            const width = linkRect.width;
            
            // Bewege den Hover-Unterstrich
            hoverUnderline.style.width = `${width}px`;
            hoverUnderline.style.left = `${leftPosition}px`;
            hoverUnderline.style.bottom = '-1px'; // Exakt auf der Trennlinie
        }
    }
    
    // Setze den aktiven Menüpunkt basierend auf dem aktuellen Pfad
    setActiveMenuItem();
    
    /**
     * Setzt den aktiven Menüpunkt basierend auf dem aktuellen Pfad
     */
    function setActiveMenuItem() {
        const currentPath = window.location.pathname;
        const allNavLinks = document.querySelectorAll('.navbar a, .compact-navbar a');
        let activeFound = false;
        
        // Entferne zuerst alle aktiven Klassen
        allNavLinks.forEach(link => {
            link.classList.remove('active');
        });
        
        // Setze .active-Klasse basierend auf dem Pfad
        allNavLinks.forEach(link => {
            const linkPath = link.getAttribute('href');
            
            // Spezialfall für Start-Link
            if (linkPath.includes('main.html') && (currentPath.endsWith('/') || currentPath.includes('main.html') || currentPath === '')) {
                link.classList.add('active');
                activeFound = true;
            }
            // Rezept des Tages
            else if (linkPath.includes('rezepte.html') && (currentPath.includes('rezepte.html') || currentPath.includes('recipe.html'))) {
                link.classList.add('active');
                activeFound = true;
            }
            // Kontakt
            else if (linkPath.includes('kontakt.html') && currentPath.includes('kontakt.html')) {
                link.classList.add('active');
                activeFound = true;
            }
            // Impressum
            else if (linkPath.includes('impressum.html') && currentPath.includes('impressum.html')) {
                link.classList.add('active');
                activeFound = true;
            }
        });
        
        // Für Rezeptseiten
        if (!activeFound && (currentPath.includes('/recips/') || currentPath.includes('/html/'))) {
            const recipeDayLinks = document.querySelectorAll('a[href*="rezepte.html"]');
            recipeDayLinks.forEach(link => {
                link.classList.add('active');
            });
        }
    }
    
    // Touch-Geräte-Erkennung
    function isTouchDevice() {
        return 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    }
    
    if (isTouchDevice() && document.querySelector('.menu-container')) {
        document.querySelector('.menu-container').classList.add('touch-device');
    }
});