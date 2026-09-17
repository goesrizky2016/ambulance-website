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

    const slider =
        document.querySelector(".fleet-slider");

    const track =
        document.querySelector(".fleet-track");

    const cards =
        document.querySelectorAll(".fleet-card");

    const prevButton =
        document.querySelector(".fleet-prev");

    const nextButton =
        document.querySelector(".fleet-next");

    const dots =
        document.querySelectorAll(".fleet-dot");


    /* ---------------------------------------------------------
       CEK ELEMENT
    --------------------------------------------------------- */

    if (
        !slider ||
        !track ||
        cards.length === 0
    ) {
        return;
    }


    let currentIndex = 0;

    let touchStartX = 0;
    let touchEndX = 0;


    /* ---------------------------------------------------------
       JUMLAH CARD PER VIEW
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
       JUMLAH POSISI SLIDER
    --------------------------------------------------------- */

    function getMaxIndex() {

        const slidesPerView =
            getSlidesPerView();


        return Math.max(
            0,
            cards.length - slidesPerView
        );
    }


    /* ---------------------------------------------------------
       UPDATE SLIDER
    --------------------------------------------------------- */

    function updateSlider() {

        const slidesPerView =
            getSlidesPerView();


        const maxIndex =
            getMaxIndex();


        /* Pastikan index aman */

        if (currentIndex < 0) {
            currentIndex = 0;
        }


        if (currentIndex > maxIndex) {
            currentIndex = maxIndex;
        }


        /* =====================================================
           HP
           1 CARD PER SLIDE
        ===================================================== */

        if (slidesPerView === 1) {

            const sliderWidth =
                slider.clientWidth;


            track.style.transform =
                `translate3d(-${currentIndex * sliderWidth}px, 0, 0)`;

        }


        /* =====================================================
           TABLET / DESKTOP
        ===================================================== */

        else {

            const cardWidth =
                cards[0].getBoundingClientRect().width;


            const style =
                window.getComputedStyle(track);


            const gap =
                parseFloat(style.gap) || 0;


            const moveDistance =
                cardWidth + gap;


            track.style.transform =
                `translate3d(-${currentIndex * moveDistance}px, 0, 0)`;

        }


        /* =====================================================
           DOT
        ===================================================== */

        dots.forEach(function (dot, index) {

            dot.classList.toggle(
                "active",
                index === currentIndex
            );

        });


        /* =====================================================
           PREVIOUS BUTTON
        ===================================================== */

        if (prevButton) {

            prevButton.disabled =
                currentIndex === 0;

        }


        /* =====================================================
           NEXT BUTTON
        ===================================================== */

        if (nextButton) {

            nextButton.disabled =
                currentIndex === maxIndex;

        }

    }


    /* =========================================================
       NEXT
    ========================================================= */

    if (nextButton) {

        nextButton.addEventListener(
            "click",
            function () {

                const maxIndex =
                    getMaxIndex();


                if (
                    currentIndex <
                    maxIndex
                ) {

                    currentIndex++;

                    updateSlider();

                }

            }
        );

    }


    /* =========================================================
       PREVIOUS
    ========================================================= */

    if (prevButton) {

        prevButton.addEventListener(
            "click",
            function () {

                if (currentIndex > 0) {

                    currentIndex--;

                    updateSlider();

                }

            }
        );

    }


    /* =========================================================
       DOT CLICK
    ========================================================= */

    dots.forEach(function (dot, index) {

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


                updateSlider();

            }
        );

    });


    /* =========================================================
       TOUCH START
       DIPASANG PADA SLIDER, BUKAN TRACK
    ========================================================= */

    slider.addEventListener(
        "touchstart",
        function (event) {

            touchStartX =
                event.touches[0].clientX;

            touchEndX =
                touchStartX;

        },
        {
            passive: true
        }
    );


    /* =========================================================
       TOUCH MOVE
    ========================================================= */

    slider.addEventListener(
        "touchmove",
        function (event) {

            touchEndX =
                event.touches[0].clientX;

        },
        {
            passive: true
        }
    );


    /* =========================================================
       TOUCH END
    ========================================================= */

    slider.addEventListener(
        "touchend",
        function () {

            if (window.innerWidth > 768) {
                return;
            }


            const swipeDistance =
                touchEndX - touchStartX;


            /* ---------------------------------------------
               SWIPE KIRI
            --------------------------------------------- */

            if (swipeDistance < -50) {

                const maxIndex =
                    getMaxIndex();


                if (
                    currentIndex <
                    maxIndex
                ) {

                    currentIndex++;

                    updateSlider();

                }

            }


            /* ---------------------------------------------
               SWIPE KANAN
            --------------------------------------------- */

            else if (swipeDistance > 50) {

                if (
                    currentIndex > 0
                ) {

                    currentIndex--;

                    updateSlider();

                }

            }


            touchStartX = 0;
            touchEndX = 0;

        },
        {
            passive: true
        }
    );


    /* =========================================================
       RESIZE
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

                        updateSlider();

                    },
                    150
                );

        }
    );


    /* =========================================================
       INITIALIZE
    ========================================================= */

    updateSlider();

});