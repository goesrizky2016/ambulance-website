/* =========================================================
   MOBILE MENU
========================================================= */

const mobileMenuButton =
    document.getElementById("mobileMenuButton");

const mainNav =
    document.getElementById("mainNav");


if (mobileMenuButton && mainNav) {

    mobileMenuButton.addEventListener("click", () => {

        const isOpen =
            mainNav.classList.toggle("open");

        mobileMenuButton.setAttribute(
            "aria-expanded",
            isOpen
        );

    });


    mainNav.querySelectorAll("a").forEach(link => {

        link.addEventListener("click", () => {

            mainNav.classList.remove("open");

            mobileMenuButton.setAttribute(
                "aria-expanded",
                "false"
            );

        });

    });

}


/* =========================================================
   FAQ
========================================================= */

const faqQuestions =
    document.querySelectorAll(".faq-question");


faqQuestions.forEach(question => {

    question.addEventListener("click", () => {

        const currentItem =
            question.closest(".faq-item");

        const isOpen =
            currentItem.classList.contains("open");


        document
            .querySelectorAll(".faq-item")
            .forEach(item => {

                item.classList.remove("open");

                const answer =
                    item.querySelector(".faq-answer");

                if (answer) {
                    answer.style.maxHeight = null;
                }

            });


        if (!isOpen) {

            currentItem.classList.add("open");

            const answer =
                currentItem.querySelector(".faq-answer");

            if (answer) {

                answer.style.maxHeight =
                    answer.scrollHeight + "px";

            }

        }

    });

});


/* =========================================================
   BACK TO TOP
========================================================= */

const backToTop =
    document.getElementById("backToTop");


if (backToTop) {

    window.addEventListener("scroll", () => {

        if (window.scrollY > 500) {

            backToTop.classList.add("show");

        } else {

            backToTop.classList.remove("show");

        }

    });


    backToTop.addEventListener("click", () => {

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });

    });

}


/* =========================================================
   ORDER FORM -> WHATSAPP
========================================================= */

const orderForm =
    document.getElementById("orderForm");


if (orderForm) {

    orderForm.addEventListener("submit", function(event) {

        event.preventDefault();


        const nama =
            document.getElementById("nama").value.trim();

        const telepon =
            document.getElementById("telepon").value.trim();

        const lokasi =
            document.getElementById("lokasi").value.trim();

        const tujuan =
            document.getElementById("tujuan").value.trim();

        const layanan =
            document.getElementById("layanan-select").value;

        const tanggal =
            document.getElementById("tanggal").value;

        const jam =
            document.getElementById("jam").value;

        const catatan =
            document.getElementById("catatan").value.trim();


        const message =

`Halo Ambulance Care,

Saya ingin memesan layanan ambulans.

Nama: ${nama}
No. WhatsApp: ${telepon}
Lokasi Jemput: ${lokasi}
Tujuan: ${tujuan}
Layanan: ${layanan}
Tanggal: ${tanggal}
Jam: ${jam}

Catatan:
${catatan || "-"}

Mohon informasi ketersediaan dan estimasi biaya. Terima kasih.`;


        const whatsappNumber =
            "6281219727254";


        const whatsappURL =
            `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;


        window.open(
            whatsappURL,
            "_blank",
            "noopener"
        );

    });

}


/* =========================================================
   ACTIVE NAVIGATION
========================================================= */

const sections =
    document.querySelectorAll("main section[id]");

const navLinks =
    document.querySelectorAll(
        '.main-nav a[href^="#"]'
    );


function updateActiveNavigation() {

    const scrollPosition =
        window.scrollY + 150;


    sections.forEach(section => {

        const sectionTop =
            section.offsetTop;

        const sectionBottom =
            sectionTop + section.offsetHeight;

        const id =
            section.getAttribute("id");


        if (
            scrollPosition >= sectionTop &&
            scrollPosition < sectionBottom
        ) {

            navLinks.forEach(link => {

                link.classList.remove("active");

                if (
                    link.getAttribute("href") ===
                    `#${id}`
                ) {

                    link.classList.add("active");

                }

            });

        }

    });

}


window.addEventListener(
    "scroll",
    updateActiveNavigation
);


/* =========================================================
   HERO IMAGE ERROR HANDLER
========================================================= */

const heroImage =
    document.querySelector(".hero-ambulance");


if (heroImage) {

    heroImage.addEventListener("error", () => {

        console.warn(
            "Gambar ambulance tidak ditemukan. Pastikan file berada di images/ambulan1.png"
        );

    });

}


/* =========================================================
   FLEET / ARMADA SLIDER
========================================================= */

document.addEventListener("DOMContentLoaded", function () {

    const fleetSlider =
        document.querySelector(".fleet-slider");

    const fleetTrack =
        document.querySelector(".fleet-track");

    const fleetCards =
        document.querySelectorAll(".fleet-card");

    const fleetPrev =
        document.querySelector(".fleet-prev");

    const fleetNext =
        document.querySelector(".fleet-next");

    const fleetDots =
        document.querySelectorAll(".fleet-dot");


    /* ---------------------------------------------------------
       CEK ELEMENT SLIDER
    --------------------------------------------------------- */

    if (
        !fleetSlider ||
        !fleetTrack ||
        fleetCards.length === 0
    ) {

        return;

    }


    let currentIndex = 0;


    /* ---------------------------------------------------------
       JUMLAH CARD YANG DITAMPILKAN
    --------------------------------------------------------- */

    function getSlidesPerView() {

        const width =
            window.innerWidth;


        // HP
        if (width <= 768) {

            return 1;

        }


        // TABLET
        if (width <= 1024) {

            return 2;

        }


        // DESKTOP
        return 3;

    }


    /* ---------------------------------------------------------
       INDEX MAKSIMAL
    --------------------------------------------------------- */

    function getMaxIndex() {

        const slidesPerView =
            getSlidesPerView();


        return Math.max(
            0,
            fleetCards.length - slidesPerView
        );

    }


    /* ---------------------------------------------------------
       UPDATE SLIDER
    --------------------------------------------------------- */

    function updateFleetSlider() {

        const slidesPerView =
            getSlidesPerView();


        const maxIndex =
            getMaxIndex();


        /* -----------------------------------------------------
           PASTIKAN INDEX TIDAK MELEBIHI BATAS
        ----------------------------------------------------- */

        currentIndex =
            Math.min(
                currentIndex,
                maxIndex
            );


        /* -----------------------------------------------------
           DESKTOP & TABLET
        ----------------------------------------------------- */

        if (slidesPerView > 1) {

            const cardWidth =
                fleetCards[0].getBoundingClientRect().width;


            const trackStyle =
                window.getComputedStyle(
                    fleetTrack
                );


            const gap =
                parseFloat(
                    trackStyle.columnGap
                ) ||
                parseFloat(
                    trackStyle.gap
                ) ||
                0;


            const moveDistance =
                cardWidth + gap;


            fleetTrack.style.transform =
                `translate3d(-${currentIndex * moveDistance}px, 0, 0)`;

        }


        /* -----------------------------------------------------
           MOBILE
        ----------------------------------------------------- */

        else {

            const sliderWidth =
                fleetSlider.clientWidth;


            fleetTrack.style.transform =
                `translate3d(-${currentIndex * sliderWidth}px, 0, 0)`;

        }


        /* -----------------------------------------------------
           UPDATE DOT
        --------------------------------------------------------- */

        fleetDots.forEach((dot, index) => {

            dot.classList.toggle(
                "active",
                index === currentIndex
            );

        });


        /* -----------------------------------------------------
           BUTTON PREVIOUS
        ----------------------------------------------------- */

        if (fleetPrev) {

            fleetPrev.disabled =
                currentIndex <= 0;

        }


        /* -----------------------------------------------------
           BUTTON NEXT
        ----------------------------------------------------- */

        if (fleetNext) {

            fleetNext.disabled =
                currentIndex >= maxIndex;

        }

    }


    /* =========================================================
       NEXT BUTTON
    ========================================================= */

    if (fleetNext) {

        fleetNext.addEventListener(
            "click",
            function () {

                const maxIndex =
                    getMaxIndex();


                if (
                    currentIndex <
                    maxIndex
                ) {

                    currentIndex++;

                    updateFleetSlider();

                }

            }
        );

    }


    /* =========================================================
       PREVIOUS BUTTON
    ========================================================= */

    if (fleetPrev) {

        fleetPrev.addEventListener(
            "click",
            function () {

                if (
                    currentIndex > 0
                ) {

                    currentIndex--;

                    updateFleetSlider();

                }

            }
        );

    }


    /* =========================================================
       DOT NAVIGATION
    ========================================================= */

    fleetDots.forEach((dot, index) => {

        dot.addEventListener(
            "click",
            function () {

                const maxIndex =
                    getMaxIndex();


                currentIndex =
                    Math.min(
                        index,
                        maxIndex
                    );


                updateFleetSlider();

            }
        );

    });


    /* =========================================================
       RESPONSIVE RESIZE
    ========================================================= */

    let resizeTimer;


    window.addEventListener(
        "resize",
        function () {

            clearTimeout(
                resizeTimer
            );


            resizeTimer =
                setTimeout(
                    function () {

                        const maxIndex =
                            getMaxIndex();


                        currentIndex =
                            Math.min(
                                currentIndex,
                                maxIndex
                            );


                        updateFleetSlider();

                    },
                    150
                );

        }
    );


    /* =========================================================
       SWIPE UNTUK HP
    ========================================================= */

    let touchStartX = 0;
    let touchEndX = 0;


    fleetSlider.addEventListener(
        "touchstart",
        function (event) {

            touchStartX =
                event.changedTouches[0].screenX;

        },
        {
            passive: true
        }
    );


    fleetSlider.addEventListener(
        "touchend",
        function (event) {

            touchEndX =
                event.changedTouches[0].screenX;


            const difference =
                touchStartX - touchEndX;


            /* -------------------------------------------------
               SWIPE KIRI
            ------------------------------------------------- */

            if (difference > 50) {

                const maxIndex =
                    getMaxIndex();


                if (
                    currentIndex <
                    maxIndex
                ) {

                    currentIndex++;

                    updateFleetSlider();

                }

            }


            /* -------------------------------------------------
               SWIPE KANAN
            ------------------------------------------------- */

            if (difference < -50) {

                if (
                    currentIndex > 0
                ) {

                    currentIndex--;

                    updateFleetSlider();

                }

            }

        },
        {
            passive: true
        }
    );


    /* =========================================================
       INITIALIZE SLIDER
    ========================================================= */

    updateFleetSlider();

});