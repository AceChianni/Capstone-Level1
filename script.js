// script.js
document.addEventListener("DOMContentLoaded", () => {
// ============================
// LOAD NAVBAR + ACTIVE STATE
// ============================
const navbarPlaceholder = document.getElementById("navbar-placeholder");

if (navbarPlaceholder) {
  fetch("navbar.html")
    .then(res => res.text())
    .then(html => {
      navbarPlaceholder.innerHTML = html;

      const currentPage = window.location.pathname.split("/").pop() || "index.html";

      document.querySelectorAll(".nav-link").forEach(link => {
        const linkHref = link.getAttribute("href");

        if (linkHref === currentPage) {
          link.classList.add("active");
        } else {
          link.classList.remove("active");
        }
      });
    })
    .catch(err => console.error("Navbar load failed:", err));
}

// ============================
// LOAD FOOTER
// ============================
const footerPlaceholder = document.getElementById("footer-placeholder");

if (footerPlaceholder) {
  fetch("footer.html")
    .then(res => res.text())
    .then(html => {
      footerPlaceholder.innerHTML = html;
    })
    .catch(err => console.error("Footer load failed:", err));
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
  revealOnScroll();

  /* =====================================================
     HERO CAROUSEL PLAY/PAUSE
  ===================================================== */
  const carouselElement = document.querySelector("#carouselNav");
  const pauseBtn = document.querySelector("#pauseCarousel");
  const playBtn = document.querySelector("#playCarousel");

  if (carouselElement && pauseBtn && playBtn && window.bootstrap) {
    const heroCarousel = new bootstrap.Carousel(carouselElement, {
      interval: 4000,
    });

    pauseBtn.addEventListener("click", () => {
      heroCarousel.pause();
      pauseBtn.classList.add("active");
      playBtn.classList.remove("active");
    });

    playBtn.addEventListener("click", () => {
      heroCarousel.cycle();
      playBtn.classList.add("active");
      pauseBtn.classList.remove("active");
    });
  }

  /* =====================================================
     LIGHTBOX FOR PHOTOSHOP / ART
  ===================================================== */
  const lightbox = document.getElementById("lightbox");
  const lightboxImg = document.getElementById("lightbox-img");

  if (lightbox && lightboxImg) {
    document.querySelectorAll(".case-image img, .thumb-img").forEach((img) => {
      img.style.cursor = "zoom-in";
      img.addEventListener("click", () => {
        lightboxImg.src = img.src;
        lightbox.classList.add("active");
      });
    });

    lightbox.addEventListener("click", () => {
      lightbox.classList.remove("active");
      lightboxImg.src = "";
    });
  }

  /* =====================================================
     WEB PROJECT CASE STUDY MODAL + CAROUSEL
  ===================================================== */
  const projectModal = document.getElementById("project-modal");
  const modalTitle = document.getElementById("modal-title");
  const modalDescription = document.getElementById("modal-description");
  const modalMeta = document.getElementById("modal-meta");
  const slideCaption = document.getElementById("slide-caption");
  const modalClose = projectModal ? projectModal.querySelector(".modal-close") : null;

  const carouselElementProjects = document.getElementById("projectCarousel");
  const carouselInner = document.getElementById("project-carousel-inner");
  const indicators = document.getElementById("project-carousel-indicators");

  if (
    projectModal &&
    modalTitle &&
    modalDescription &&
    modalMeta &&
    slideCaption &&
    carouselElementProjects &&
    carouselInner &&
    indicators
  ) {
    const projects = {
      anniime: {
        title: "AnniiMe Finder",
        overview:
          "An anime discovery experience designed to gently onboard new viewers through a short quiz, curated recommendations, and mood-based navigation.",
        meta:
          "Role: Product Designer & Front-End Developer · Stack: React, JavaScript, Jikan API",
        slides: [
          {
            src: "images/anniime/home-light.jpg",
            heading: "Landing — Light Mode",
            caption:
              "A welcoming, low-stimulation entry point to reduce decision fatigue.",
          },
          {
            src: "images/anniime/home-dark.jpg",
            heading: "Landing — Dark Mode",
            caption:
              "Optimized contrast and legibility for nighttime browsing.",
          },
          {
            src: "images/anniime/search-light.jpg",
            heading: "Search Results — Light Mode",
            caption:
              "Key metadata surfaced to help new viewers choose with confidence.",
          },
          {
            src: "images/anniime/search-dark.jpg",
            heading: "Search Results — Dark Mode",
            caption: "Parallel layout optimized for dark viewing environments.",
          },
          {
            src: "images/anniime/quiz-dark.jpg",
            heading: "Onboarding Quiz",
            caption:
              "Guides users through tone, vibe, and pacing to recommend matching anime.",
          },
        ],
      },

      inkspresso: {
        title: "Inkspresso — Fuel Your Imagination",
        overview:
          "A cozy café-inspired full-stack eCommerce and book exploration experience.",
        meta:
          "Role: UX/UI Designer & Full-Stack Developer · Stack: Node.js, Express, MongoDB",
        slides: [
          {
            src: "images/inkspresso/dashboard.png",
            heading: "Dashboard Overview",
            caption:
              "Central hub connecting library, café menu, and curated recommendations.",
          },
          {
            src: "images/inkspresso/home.png",
            heading: "Café Menu",
            caption: "Coffee-shop inspired browsing of drinks & treats.",
          },
          {
            src: "images/inkspresso/library.png",
            heading: "Library View",
            caption: "Explore books, filter genres, and save favorite reads.",
          },
        ],
      },

      inkspression: {
        title: "Inkspression",
        overview:
          "A neurodivergent-friendly journaling and self-reflection platform.",
        meta:
          "Role: Product Designer & Front-End Developer · Stack: React, Tailwind, Firebase",
        slides: [
          {
            src: "images/inkspression/dashboard.jpg",
            heading: "Dashboard",
            caption: "Gentle overview of mood, prompts, and recent entries.",
          },
          {
            src: "images/inkspression/theme.jpg",
            heading: "Theme Selection",
            caption:
              "Sensory-friendly interface themes designed for comfort & clarity.",
          },
          {
            src: "images/inkspression/entry.jpg",
            heading: "Entry Screen",
            caption: "A focused writing space for expressive journaling.",
          },
        ],
      },
    };

    /* -----------------------------
       VIEW CASE STUDY BUTTONS
    ----------------------------- */
    document.querySelectorAll(".btn-web[data-project]").forEach((btn) => {
      btn.addEventListener("click", (e) => {
        e.preventDefault();
        const key = btn.dataset.project;
        const project = projects[key];
        if (!project) return;

        modalTitle.textContent = project.title;
        modalDescription.textContent = project.overview;
        modalMeta.textContent = project.meta;

        carouselInner.innerHTML = "";
        indicators.innerHTML = "";

        project.slides.forEach((slide, index) => {
          const item = document.createElement("div");
          item.className = "carousel-item" + (index === 0 ? " active" : "");
          item.innerHTML = `
            <img src="${slide.src}" class="d-block w-100 modal-slide-img" alt="${slide.heading}">
            <div class="carousel-caption d-md-block">
              <h5>${slide.heading}</h5>
              <p>${slide.caption}</p>
            </div>
          `;
          carouselInner.appendChild(item);

          const indicator = document.createElement("button");
          indicator.type = "button";
          indicator.dataset.bsTarget = "#projectCarousel";
          indicator.dataset.bsSlideTo = index;
          if (index === 0) indicator.classList.add("active");
          indicators.appendChild(indicator);
        });

        let projCarousel = bootstrap.Carousel.getInstance(carouselElementProjects);
        if (projCarousel) {
          projCarousel.to(0);
        } else {
          projCarousel = new bootstrap.Carousel(carouselElementProjects, {
            interval: false,
            ride: false,
            keyboard: true,
          });
        }

        slideCaption.textContent = project.slides[0].caption;

        carouselElementProjects.addEventListener("slid.bs.carousel", (ev) => {
          slideCaption.textContent = project.slides[ev.to].caption;
        });

        projectModal.classList.add("active");
        projectModal.setAttribute("aria-hidden", "false");
        document.body.style.overflow = "hidden";

        setTimeout(() => {
          carouselElementProjects.setAttribute("tabindex", "0");
          carouselElementProjects.focus();
        }, 50);
      });
    });

    /* -----------------------------
       MODAL CLOSE
    ----------------------------- */
    if (modalClose) {
      modalClose.addEventListener("click", () => {
        projectModal.classList.remove("active");
        projectModal.setAttribute("aria-hidden", "true");
        document.body.style.overflow = "";
      });
    }

    projectModal.addEventListener("click", (e) => {
      if (e.target === projectModal) {
        projectModal.classList.remove("active");
        projectModal.setAttribute("aria-hidden", "true");
        document.body.style.overflow = "";
      }
    });

    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && projectModal.classList.contains("active")) {
        projectModal.classList.remove("active");
        projectModal.setAttribute("aria-hidden", "true");
        document.body.style.overflow = "";
      }
    });
  }
});
