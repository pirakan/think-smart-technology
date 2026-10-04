/* =========================================================
   THINK SMART TECHNOLOGY
   HOME PAGE JAVASCRIPT
   ========================================================= */

function initHome() {

    /* =====================================================
       MOBILE NAVIGATION
    ====================================================== */

    const menuButton = document.querySelector(".mobile-menu-button");
    const mobileNavigation = document.querySelector(".mobile-navigation");
    const closeButton = document.querySelector(".mobile-navigation-close");

    if (menuButton && mobileNavigation) {

        menuButton.addEventListener("click", () => {

            mobileNavigation.classList.add("active");

            menuButton.setAttribute("aria-expanded", "true");

            document.body.style.overflow = "hidden";

        });
    }


    if (closeButton && mobileNavigation) {

        closeButton.addEventListener("click", () => {

            mobileNavigation.classList.remove("active");

            if (menuButton) {
                menuButton.setAttribute("aria-expanded", "false");
            }

            document.body.style.overflow = "";

        });
    }


    /* Close mobile menu when clicking a link */

    const mobileLinks =
        document.querySelectorAll(".mobile-navigation a");

    mobileLinks.forEach((link) => {

        link.addEventListener("click", () => {

            mobileNavigation?.classList.remove("active");

            if (menuButton) {
                menuButton.setAttribute("aria-expanded", "false");
            }

            document.body.style.overflow = "";

        });

    });


    /* =====================================================
       CLOSE MOBILE MENU WITH ESCAPE KEY
    ====================================================== */

    document.addEventListener("keydown", (event) => {

        if (event.key === "Escape") {

            mobileNavigation?.classList.remove("active");

            if (menuButton) {
                menuButton.setAttribute("aria-expanded", "false");
            }

            document.body.style.overflow = "";

        }

    });


    /* =====================================================
       HEADER SCROLL EFFECT
    ====================================================== */

    const header = document.querySelector(".site-header");

    const handleHeaderScroll = () => {

        if (!header) {
            return;
        }

        if (window.scrollY > 30) {

            header.classList.add("header-scrolled");

        } else {

            header.classList.remove("header-scrolled");

        }

    };

    window.addEventListener(
        "scroll",
        handleHeaderScroll,
        { passive: true }
    );

    handleHeaderScroll();


    /* =====================================================
       SCROLL REVEAL
    ====================================================== */

    const revealElements = document.querySelectorAll(
        ".section-heading, " +
        ".service-card, " +
        ".about-visual, " +
        ".about-content, " +
        ".capability-item, " +
        ".process-item, " +
        ".project-card, " +
        ".cta-content, " +
        ".cta-action"
    );


    if ("IntersectionObserver" in window) {

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
                rootMargin: "0px 0px -50px 0px"
            }
        );


        revealElements.forEach((element) => {

            element.classList.add("reveal-on-scroll");

            revealObserver.observe(element);

        });

    } else {

        revealElements.forEach((element) => {

            element.classList.add("is-visible");

        });

    }


    /* =====================================================
       SERVICE CARD STAGGER
    ====================================================== */

    const serviceCards =
        document.querySelectorAll(".service-card");

    serviceCards.forEach((card, index) => {

        card.style.setProperty(
            "--reveal-delay",
            `${index * 70}ms`
        );

    });


    /* =====================================================
       CAPABILITY CARD STAGGER
    ====================================================== */

    const capabilityItems =
        document.querySelectorAll(".capability-item");

    capabilityItems.forEach((item, index) => {

        item.style.setProperty(
            "--reveal-delay",
            `${index * 60}ms`
        );

    });


    /* =====================================================
       PROCESS ITEM STAGGER
    ====================================================== */

    const processItems =
        document.querySelectorAll(".process-item");

    processItems.forEach((item, index) => {

        item.style.setProperty(
            "--reveal-delay",
            `${index * 80}ms`
        );

    });


    /* =====================================================
       PROJECT CARD STAGGER
    ====================================================== */

    const projectCards =
        document.querySelectorAll(".project-card");

    projectCards.forEach((card, index) => {

        card.style.setProperty(
            "--reveal-delay",
            `${index * 90}ms`
        );

    });


    /* =====================================================
       SMOOTH INTERNAL ANCHOR SCROLL
    ====================================================== */

    const anchorLinks =
        document.querySelectorAll('a[href^="#"]');

    anchorLinks.forEach((link) => {

        link.addEventListener("click", (event) => {

            const targetId =
                link.getAttribute("href");

            if (!targetId || targetId === "#") {
                return;
            }

            const target =
                document.querySelector(targetId);

            if (!target) {
                return;
            }

            event.preventDefault();

            target.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });

        });

    });


    /* =====================================================
       SEARCH BUTTON
    ====================================================== */

    const searchButton =
        document.querySelector(".search-button");

    if (searchButton) {

        searchButton.addEventListener("click", () => {

            /*
             * Search functionality will be connected later
             * when the Search page / search overlay is created.
             */

            document.body.classList.toggle(
                "search-active"
            );

        });

    }


    /* =====================================================
       CURRENT YEAR
    ====================================================== */

    const yearElements =
        document.querySelectorAll("[data-current-year]");

    const currentYear =
        new Date().getFullYear();

    yearElements.forEach((element) => {

        element.textContent = currentYear;

    });


    /* =====================================================
       IMAGE LOAD OPTIMIZATION
    ====================================================== */

    const images =
        document.querySelectorAll("img");

    images.forEach((image) => {

        if (
            !image.hasAttribute("loading") &&
            !image.closest(".hero-section")
        ) {

            image.setAttribute(
                "loading",
                "lazy"
            );

        }

    });


    /* =====================================================
       MOBILE NAVIGATION — OUTSIDE CLICK
    ====================================================== */

    document.addEventListener("click", (event) => {

        if (!mobileNavigation?.classList.contains("active")) {
            return;
        }

        const clickedInsideMenu =
            mobileNavigation.contains(event.target);

        const clickedMenuButton =
            menuButton?.contains(event.target);

        if (!clickedInsideMenu && !clickedMenuButton) {

            mobileNavigation.classList.remove("active");

            if (menuButton) {
                menuButton.setAttribute(
                    "aria-expanded",
                    "false"
                );
            }

            document.body.style.overflow = "";

        }

    });

}

document.addEventListener("DOMContentLoaded", () => {
    if (document.querySelector("[data-include]")) {
        document.addEventListener("site:includes-ready", initHome, { once: true });
    } else {
        initHome();
    }
});
