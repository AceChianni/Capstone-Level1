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

// ------------------------------
// Project Modal Logic
// ------------------------------
document.addEventListener("DOMContentLoaded", () => {
  const modal = document.getElementById("project-modal");
  const modalImg = document.getElementById("modal-image");
  const modalTitle = document.getElementById("modal-title");
  const modalDesc = document.getElementById("modal-description");
  const modalMeta = document.getElementById("modal-meta");
  const modalClose = document.querySelector(".modal-close");

  const projects = [
    {
      title: "AnniiMe Finder",
      img: "images/anniime-thumb.jpg",
      desc: "A front-end anime discovery app built using React and an open Anime API. It provides a clean, responsive interface where users can explore shows, view ratings, and build watchlists.",
      meta: "Tools: React, JavaScript, REST API · Focus: UI Design, API Integration"
    },
    {
      title: "Inkspresso — Fuel Your Imagination",
      img: "images/inkspresso-thumb.jpg",
      desc: "A full-stack eCommerce concept that merges creativity, books, and brews. Features include a product catalog for coffee and tea, a book API integration, and dark mode accessibility.",
      meta: "Tools: Node.js, Express, MongoDB · Focus: Full-Stack Architecture, Accessibility"
    },
    {
      title: "Inkspression",
      img: "images/inkspression-thumb.jpg",
      desc: "A journaling and productivity web app designed for neurodivergent users. Combines psychology and UI/UX design to create a calming, customizable space for reflection.",
      meta: "Tools: React, Tailwind, Firebase · Focus: UX Research, Mental Wellness Design"
    }
  ];

  document.querySelectorAll(".btn-web").forEach((btn, i) => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      const project = projects[i];
      modalImg.src = project.img;
      modalTitle.textContent = project.title;
      modalDesc.textContent = project.desc;
      modalMeta.textContent = project.meta;
      modal.style.display = "flex";
    });
  });

  modalClose.addEventListener("click", () => {
    modal.style.display = "none";
  });

  modal.addEventListener("click", (e) => {
    if (e.target === modal) modal.style.display = "none";
  });
});
