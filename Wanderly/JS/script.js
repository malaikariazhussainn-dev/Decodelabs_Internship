"use strict";


/* =========================================
   WANDERLY NAVIGATION
========================================= */

const menuToggle = document.getElementById("menuToggle");
const navMenu = document.getElementById("navMenu");


if (menuToggle && navMenu) {

    const navigationLinks =
        navMenu.querySelectorAll(".nav-link, .nav-cta");


    /* -----------------------------------------
       OPEN / CLOSE MOBILE MENU
    ----------------------------------------- */

    menuToggle.addEventListener("click", () => {

        const isOpen =
            navMenu.classList.toggle("active");

        menuToggle.classList.toggle(
            "active",
            isOpen
        );

        menuToggle.setAttribute(
            "aria-expanded",
            isOpen
        );

        menuToggle.setAttribute(
            "aria-label",
            isOpen
                ? "Close navigation menu"
                : "Open navigation menu"
        );

    });


    /* -----------------------------------------
       CLOSE MENU AFTER NAVIGATION
    ----------------------------------------- */

    navigationLinks.forEach((link) => {

        link.addEventListener("click", () => {

            closeNavigation();

        });

    });


    /* -----------------------------------------
       CLOSE WITH ESCAPE KEY
    ----------------------------------------- */

    document.addEventListener("keydown", (event) => {

        if (
            event.key === "Escape" &&
            navMenu.classList.contains("active")
        ) {

            closeNavigation();

            menuToggle.focus();

        }

    });


    /* -----------------------------------------
       CLOSE WHEN RETURNING TO DESKTOP
    ----------------------------------------- */

    window.addEventListener("resize", () => {

        if (window.innerWidth > 800) {

            closeNavigation();

        }

    });


    /* -----------------------------------------
       NAVIGATION CLOSE FUNCTION
    ----------------------------------------- */

    function closeNavigation() {

        navMenu.classList.remove("active");

        menuToggle.classList.remove("active");

        menuToggle.setAttribute(
            "aria-expanded",
            "false"
        );

        menuToggle.setAttribute(
            "aria-label",
            "Open navigation menu"
        );

    }

}


/* =========================================
   WANDERLY ACTIVE NAVIGATION
========================================= */

const sections = document.querySelectorAll("main section[id]");
const navLinks = document.querySelectorAll(".nav-link");

if (sections.length && navLinks.length) {

    let ticking = false;

    const updateActiveLink = () => {

        const scrollPosition = window.scrollY + 120;

        sections.forEach((section) => {

            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute("id");

            if (
                scrollPosition >= sectionTop &&
                scrollPosition < sectionTop + sectionHeight
            ) {

                navLinks.forEach((link) => {
                    link.classList.remove("active");
                });

                const activeLink =
                    document.querySelector(
                        `.nav-link[href="#${sectionId}"]`
                    );

                if (activeLink) {
                    activeLink.classList.add("active");
                }

            }

        });

        ticking = false;
    };

    window.addEventListener(
        "scroll",
        () => {

            if (!ticking) {

                window.requestAnimationFrame(
                    updateActiveLink
                );

                ticking = true;
            }

        },
        { passive: true }
    );

    updateActiveLink();
}
