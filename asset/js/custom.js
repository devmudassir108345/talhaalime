/****************************************************
 *
 * ?            TOOL TIPS
 *
 ****************************************************/

const tooltip = document.createElement("div");
tooltip.className = "custom-tooltip";
document.body.appendChild(tooltip);

let mouseX = 0,
  mouseY = 0,
  currentX = 0,
  currentY = 0;

document.querySelectorAll("[data-tooltip]").forEach((el) => {
  el.addEventListener("mouseenter", (e) => {
    tooltip.textContent = el.getAttribute("data-tooltip");
    tooltip.style.opacity = "1";
  });

  el.addEventListener("mousemove", (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
  });

  el.addEventListener("mouseleave", () => {
    tooltip.style.opacity = "0";
    // tooltip.style.transition = "all                     "
  });
});

function animateTooltip() {
  currentX += (mouseX - currentX) * 0.1;
  currentY += (mouseY - currentY) * 0.1;
  tooltip.style.left = `${currentX}px`;
  tooltip.style.top = `${currentY}px`;
  requestAnimationFrame(animateTooltip);
}

animateTooltip();

//////////////////////////////

///////////////////////////////////////

const toggleBtn = document.querySelector(".header__menu-btn");
const links = document.querySelector(".header__links");
const linkItems = document.querySelectorAll(".header__links a");
const overlay = document.querySelector(".overlay");
const html = document.querySelector("html");

const isMobile = () => window.innerWidth < 992;

function collapseMenu() {
  links.style.height = `${links.scrollHeight}px`;
  requestAnimationFrame(() => (links.style.height = "0"));
  links.classList.remove("active");
  overlay.classList.add("overlay__hidden");
  toggleBtn.classList.remove("header__close");
}

function expandMenu() {
  html.classList.toggle("overflow-hidden");
  links.style.height = `${links.scrollHeight}px`;
  links.classList.add("active");

  links.addEventListener("transitionend", function handler() {
    links.style.height = "auto";
    links.removeEventListener("transitionend", handler);
  });
  toggleBtn.classList.add("header__close");
  overlay.classList.remove("overlay__hidden");
}

// Toggle menu on button click
toggleBtn.addEventListener("click", () => {
  if (!isMobile()) return;

  const isActive = links.classList.contains("active");
  isActive ? collapseMenu() : expandMenu();
});

// Close menu on overlay click
overlay.addEventListener("click", () => {
  if (isMobile() && links.classList.contains("active")) {
    collapseMenu();
  }
});

// Collapse menu on nav link click (only for mobile)
linkItems.forEach((item) =>
  item.addEventListener("click", () => {
    if (isMobile() && links.classList.contains("active")) {
      collapseMenu();
    }
  })
);

///////////////////////////////////////////

function initAccordion(scope) {
  const items = scope.querySelectorAll(".accordion-item");

  items.forEach((item) => {
    const header = item.querySelector(".accordion-header");
    const content = item.querySelector(".accordion-content");
    const inner = item.querySelector(".accordion-inner");
    const arrow = item.querySelector(".accordion-arrow");

    header.addEventListener("click", () => {
      const isOpen = content.style.height && content.style.height !== "0px";

      // Close all items first
      items.forEach((i) => {
        i.querySelector(".accordion-content").style.height = 0;
        i.querySelector(".accordion-arrow").classList.remove("rotate");
        i.classList.remove("active"); // ❌ Remove active class from all
      });

      // Open current if it was closed
      if (!isOpen) {
        content.style.height = inner.scrollHeight + "px";
        arrow.classList.add("rotate");
        item.classList.add("active"); // ✅ Add active class to current item
      }
    });
  });

  window.addEventListener("resize", () => {
    items.forEach((item) => {
      const content = item.querySelector(".accordion-content");
      const inner = item.querySelector(".accordion-inner");
      const isOpen = content.style.height && content.style.height !== "0px";
      if (isOpen) {
        content.style.height = inner.scrollHeight + "px";
      }
    });
  });
}

document.querySelectorAll(".accordion").forEach((acc) => initAccordion(acc));

///////////////////////

function updateVerticalLines() {
  const container = document.querySelector(".container");
  const verticalLines = document.querySelector(".vertical-lines");
  const stopper = 64; // 4rem

  if (container && verticalLines) {
    const rect = container.getBoundingClientRect();
    const windowWidth = window.innerWidth;

    const left = Math.max(rect.left, stopper);
    const right = Math.max(windowWidth - rect.right, stopper);

    verticalLines.style.setProperty("--left-line", `${left}px`);
    verticalLines.style.setProperty("--right-line", `${right}px`);
  }
}

window.addEventListener("load", updateVerticalLines);
window.addEventListener("resize", updateVerticalLines);

const sections = document.querySelectorAll(".data__title");
const heading = document.getElementById("dynamic-heading");

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        heading.textContent = entry.target.getAttribute("data-title");
      }
    });
  },
  {
    root: null,
    rootMargin: "-30% 0px -50% 0px", // this slows the switch until more visible
    threshold: 0.5, // reduced from 0.5
  }
);

sections.forEach((section) => {
  observer.observe(section);
});

///////////////////////////////////
//!         TYPING EFFECT
///////////////////////////////////

const words = [
  "freelancer",
  "developer",
  "project manager",
  "designer",
  "content creator",
];

const effectElement = document.getElementById("effect");

let wordIndex = 0;
let charIndex = 0;
let isDeleting = false;
let typingSpeed = 100;
let deletingSpeed = 50;
let delayBetweenWords = 2500;

function typeEffect() {
  const currentWord = words[wordIndex];

  if (!isDeleting) {
    effectElement.textContent = currentWord.substring(0, charIndex + 1);
    charIndex++;

    if (charIndex === currentWord.length) {
      isDeleting = true;
      setTimeout(typeEffect, delayBetweenWords);
      return;
    }
  } else {
    effectElement.textContent = currentWord.substring(0, charIndex - 1);
    charIndex--;

    if (charIndex === 0) {
      isDeleting = false;
      wordIndex = (wordIndex + 1) % words.length;
    }
  }

  setTimeout(typeEffect, isDeleting ? deletingSpeed : typingSpeed);
}

typeEffect();

///////////////////////////////////
const tabs = document.querySelectorAll(".tab-btn");
const panes = document.querySelectorAll(".tab-pane");

tabs.forEach((tab) => {
  tab.addEventListener("click", () => {
    const target = tab.dataset.tab;

    // Remove active class from all tab buttons
    tabs.forEach(t => t.classList.remove("active"));
    // Add active class to clicked tab button
    tab.classList.add("active");

    // Hide all panes
    panes.forEach((pane) => pane.classList.remove("active"));
    // Show target pane
    document.getElementById(target).classList.add("active");
  });
});
