document.addEventListener("DOMContentLoaded", () => {
  /* =====================================================
     LOAD NAVBAR & FOOTER
  ===================================================== */
  const navbarPlaceholder = document.getElementById("navbar-placeholder");
  if (navbarPlaceholder) {
    fetch("navbar.html")
      .then((res) => res.text())
      .then((html) => {
        navbarPlaceholder.innerHTML = html;

        // Highlight active link
        const currentPage =
          window.location.pathname.split("/").pop() || "index.html";
        document.querySelectorAll(".nav-link").forEach((link) => {
          if (link.getAttribute("href") === currentPage) {
            link.classList.add("active");
          }
        });
      })
      .catch((err) => console.error("Error loading navbar:", err));
  }

  const footerPlaceholder = document.getElementById("footer-placeholder");
  if (footerPlaceholder) {
    fetch("footer.html")
      .then((res) => res.text())
      .then((html) => {
        footerPlaceholder.innerHTML = html;
      })
      .catch((err) => console.error("Error loading footer:", err));
  }

  /* =====================================================
     FADE-IN ANIMATION ON SCROLL
  ===================================================== */
  const fadeSections = document.querySelectorAll(".fade-section, .timeline-item");

  function revealOnScroll() {
    fadeSections.forEach((section) => {
      const rect = section.getBoundingClientRect();
      if (rect.top < window.innerHeight - 100) {
        section.classList.add("visible");
      }
    });
  }

  window.addEventListener("scroll", revealOnScroll);
  revealOnScroll(); // trigger once on load

  /* =====================================================
     CAROUSEL PLAY/PAUSE CONTROLS (for index.html)
  ===================================================== */
  const carouselElement = document.querySelector("#carouselNav");
  const pauseBtn = document.querySelector("#pauseCarousel");
  const playBtn = document.querySelector("#playCarousel");

  if (carouselElement && pauseBtn && playBtn) {
    const carousel = new bootstrap.Carousel(carouselElement, { interval: 4000 });

    pauseBtn.addEventListener("click", () => {
      carousel.pause();
      pauseBtn.classList.add("active");
      playBtn.classList.remove("active");
    });

    playBtn.addEventListener("click", () => {
      carousel.cycle();
      playBtn.classList.add("active");
      pauseBtn.classList.remove("active");
    });
  }
});
