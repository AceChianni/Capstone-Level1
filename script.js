document.addEventListener("DOMContentLoaded", () => {
  // Load Navbar
  const navbarPlaceholder = document.getElementById("navbar-placeholder");
  if (navbarPlaceholder) {
    fetch("navbar.html")
      .then((res) => res.text())
      .then((html) => {
        navbarPlaceholder.innerHTML = html;

        // Highlight active link
        const currentPage = window.location.pathname.split("/").pop() || "index.html";
        document.querySelectorAll(".nav-link").forEach((link) => {
          if (link.getAttribute("href") === currentPage) {
            link.classList.add("active");
          }
        });
      })
      .catch((err) => console.error("Error loading navbar:", err));
  }

  // Load Footer
  const footerPlaceholder = document.getElementById("footer-placeholder");
  if (footerPlaceholder) {
    fetch("footer.html")
      .then((res) => res.text())
      .then((html) => {
        footerPlaceholder.innerHTML = html;
      })
      .catch((err) => console.error("Error loading footer:", err));
  }
});
