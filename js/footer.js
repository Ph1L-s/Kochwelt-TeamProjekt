/**
 * footer.js - JavaScript Top-Scroll funktion!
 */
document.addEventListener("DOMContentLoaded", function () {
  // Finde den Footer-Logo-Link
  const footerLogoLink = document.querySelector(".footer_logo a");

  if (footerLogoLink) {
    // Ändere den href-Attributwert zu '#', damit die Seite nicht neu geladen wird
    footerLogoLink.setAttribute("href", "#");

    // Füge eine Klasse für Stilisierung hinzu
    footerLogoLink.classList.add("scroll-to-top");

    // Event-Listener für das Klick-Event
    footerLogoLink.addEventListener("click", function (event) {
      // Verhindern der Standard-Link-Aktion
      event.preventDefault();

      // Smooth-Scroll zum Anfang der Seite
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    });
  }
});
