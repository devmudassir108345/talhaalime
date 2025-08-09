






/****************************************************
 *
 * ?         smooth scrll lenis
 *
 ****************************************************/

 const lenis = new Lenis({
      lerp: 0.1,
      wheelMultiplier: 1,
      smooth: true
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    // ✅ Tell ScrollTrigger to update on smooth scroll
    lenis.on('scroll', ScrollTrigger.update);







/****************************************************
 *
 * ?         hero slick slider
 *
 ****************************************************/


  gsap.registerPlugin(ScrollTrigger);

      window.addEventListener("load", () => {
        const slider = document.querySelector(".process__slider");

        // Detect screen width
        const isMobile = window.innerWidth <= 767;

        gsap.to(slider, {
          x: "-90%",
          ease: "power2.inOut", // Smooth easing
          scrollTrigger: {
            trigger: isMobile ? ".process__slider" : ".process",
            start: "top 20%",
            end: "bottom -105%",
            scrub: true,
            pin: true,
          },
        });

        ScrollTrigger.refresh(); // ensure correct pin after load
      });






      //////////////////////////////


















      ////////////////////////






        document.addEventListener("DOMContentLoaded", function () {
        const splide = new Splide("#testimonial-slider", {
          type: "loop",
          perPage: 3,
          focus: "center",
          autoplay: true, // 🔁 Enable autoplay
          interval: 3000,
          speed: 800, // Default is 400ms, increase for smoother glide
          easing: "ease",
          gap: "2rem",
          padding: { left: "10%", right: "10%" },
          pagination: false,
          arrows: false,
          resetProgress: false,
          breakpoints: {
            // 992: { perPage: 1, padding: { left: "5%", right: "5%" } },
            1240: { perPage: 2, padding: { left: "5%", right: "5%" } },
            768: { perPage: 1, padding: { left: "5%", right: "5%" } },
          },
        });

        document
          .querySelector(".custom-prev")
          .addEventListener("click", function () {
            splide.go("<"); // go to previous slide
          });

        document
          .querySelector(".custom-next")
          .addEventListener("click", function () {
            splide.go(">"); // go to next slide
          });

        splide.on("mounted move", function () {
          const currentIndex = splide.index % splide.length;
          document
            .querySelectorAll(".custom-pagination img")
            .forEach((img, i) => {
              img.classList.toggle("active", i === currentIndex);
            });
        });

        document.querySelectorAll(".custom-pagination img").forEach((img) => {
          img.addEventListener("click", () => {
            const index = parseInt(img.getAttribute("data-slide"));
            splide.go(index);
          });
        });

        splide.mount();
      });






























        document.addEventListener("DOMContentLoaded", function () {
        const splide = new Splide("#wordSlides__slider", {
          type: "loop",
          perPage: 1,
          focus: "center",
          padding: { left: 0, right: "20%" },
          gap: "1rem",
          pagination: false,
          arrows: false,

          breakpoints: {
            992: {
              perPage: 2,
              padding: 0,
              focus: "start", // Use "start" instead of false
            },
            767: {
              perPage: 1,
              focus: "center",
              padding: { left: 0, right: "20%" },
            },

            576: {
              perPage: 1,
              padding: 0,
              focus: "start", // Use "start" instead of false
            },
          },
        });

        // Mount the splide instance
        splide.mount();

        // Custom buttons event handlers
        document
          .querySelector(".workSlides__prev")
          .addEventListener("click", function () {
            splide.go("<"); // go to previous slide
          });

        document
          .querySelector(".workSlides__next")
          .addEventListener("click", function () {
            splide.go(">"); // go to next slide
          });
      });
