"use strict";

/* =========================================
   BOLDMETRIC — FRONTEND INTERACTIONS
========================================= */

document.documentElement.classList.add("js-ready");

/* =========================================
   MOBILE NAVIGATION
========================================= */

const menuToggle = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".nav-links");
const navItems = document.querySelectorAll(".nav-links a");

function closeMenu() {
  if (!menuToggle || !navLinks) return;

  menuToggle.setAttribute("aria-expanded", "false");
  menuToggle.setAttribute("aria-label", "Open navigation menu");

  navLinks.classList.remove("open");
  document.body.classList.remove("menu-open");
}

if (menuToggle && navLinks) {
  menuToggle.addEventListener("click", () => {
    const isOpen = menuToggle.getAttribute("aria-expanded") === "true";

    menuToggle.setAttribute("aria-expanded", String(!isOpen));

    menuToggle.setAttribute(
      "aria-label",
      isOpen ? "Open navigation menu" : "Close navigation menu"
    );

    navLinks.classList.toggle("open", !isOpen);
    document.body.classList.toggle("menu-open", !isOpen);
  });

  navItems.forEach((link) => {
    link.addEventListener("click", closeMenu);
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      closeMenu();
    }
  });

  window.addEventListener("resize", () => {
    if (window.innerWidth > 760) {
      closeMenu();
    }
  });
}

/* =========================================
   SCROLL REVEAL ANIMATIONS
========================================= */

const revealElements = document.querySelectorAll(".reveal");

const prefersReducedMotion = window.matchMedia(
  "(prefers-reduced-motion: reduce)"
).matches;

if ("IntersectionObserver" in window && !prefersReducedMotion) {
  const revealObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.12,
      rootMargin: "0px 0px -35px 0px"
    }
  );

  revealElements.forEach((element) => {
    revealObserver.observe(element);
  });
} else {
  revealElements.forEach((element) => {
    element.classList.add("is-visible");
  });
}

/* =========================================
   FAQ ACCORDION
   Only one FAQ opens at a time.
========================================= */

const faqItems = document.querySelectorAll(".faq-item");

faqItems.forEach((item) => {
  item.addEventListener("toggle", () => {
    if (!item.open) return;

    faqItems.forEach((otherItem) => {
      if (otherItem !== item) {
        otherItem.open = false;
      }
    });
  });
});

/* =========================================
   PRICING ENGAGEMENT TOGGLE
========================================= */

const pricingButtons = document.querySelectorAll(".pricing-option");
const priceValues = document.querySelectorAll(".price-value");

function updatePricing(plan) {
  pricingButtons.forEach((button) => {
    const isActive = button.dataset.plan === plan;

    button.classList.toggle("active", isActive);
    button.setAttribute("aria-pressed", String(isActive));
  });

  priceValues.forEach((price) => {
    const nextValue = price.dataset[plan];

    if (nextValue) {
      price.textContent = nextValue;
    }
  });
}

pricingButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const selectedPlan = button.dataset.plan;

    if (selectedPlan === "project" || selectedPlan === "monthly") {
      updatePricing(selectedPlan);
    }
  });
});

/* =========================================
   CONTACT FORM VALIDATION
========================================= */

const contactForm = document.querySelector("#contact-form");
const formStatus = document.querySelector("#form-status");

if (contactForm && formStatus) {
  contactForm.addEventListener("submit", (event) => {
    event.preventDefault();

    formStatus.textContent = "";
    formStatus.removeAttribute("data-type");

    if (!contactForm.checkValidity()) {
      contactForm.reportValidity();

      formStatus.textContent =
        "Please check the required fields and try again.";

      formStatus.dataset.type = "error";

      return;
    }

    const formData = new FormData(contactForm);

    const name = String(formData.get("name") || "").trim();
    const email = String(formData.get("email") || "").trim();
    const service = String(formData.get("service") || "").trim();
    const message = String(formData.get("message") || "").trim();

    if (
      name.length < 2 ||
      email.length === 0 ||
      service.length === 0 ||
      message.length < 10
    ) {
      formStatus.textContent =
        "Please provide valid information in all required fields.";

      formStatus.dataset.type = "error";

      return;
    }

    /*
      FRONTEND DEMO ONLY

      This form does not send information to a server.
      No database or email service is connected yet.

      A backend API can be integrated here later.
    */

    formStatus.textContent =
      "Frontend demo only: your inquiry has NOT been sent or saved. " +
      "A backend connection is needed to submit it.";

    formStatus.dataset.type = "success";

    formStatus.scrollIntoView({
      behavior: prefersReducedMotion ? "auto" : "smooth",
      block: "nearest"
    });
  });
}

/* =========================================
   FOOTER YEAR
========================================= */

const currentYear = document.querySelector("#current-year");

if (currentYear) {
  currentYear.textContent = new Date().getFullYear();
}