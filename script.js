
document.addEventListener("DOMContentLoaded", function () {

    /* =========================================================
       MOBILE MENU
    ========================================================= */

    const mobileMenuButton =
        document.getElementById("mobileMenuButton");

    const mainNav =
        document.getElementById("mainNav");


    if (mobileMenuButton && mainNav) {

        mobileMenuButton.addEventListener("click", function () {

            const isActive =
                mainNav.classList.toggle("active");

            mobileMenuButton.classList.toggle(
                "active",
                isActive
            );

            mobileMenuButton.setAttribute(
                "aria-expanded",
                isActive ? "true" : "false"
            );

        });


        const navLinksMobile =
            mainNav.querySelectorAll("a");


        navLinksMobile.forEach(function (link) {

            link.addEventListener("click", function () {

                mainNav.classList.remove("active");

                mobileMenuButton.classList.remove("active");

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


    faqQuestions.forEach(function (question) {

        question.addEventListener("click", function () {

            const item =
                question.closest(".faq-item");

            if (!item) {
                return;
            }


            const answer =
                item.querySelector(".faq-answer");

            if (!answer) {
                return;
            }


            const isActive =
                item.classList.contains("active");


            /* Tutup FAQ lainnya */

            document
                .querySelectorAll(".faq-item")
                .forEach(function (faqItem) {

                    faqItem.classList.remove("active");

                    const faqAnswer =
                        faqItem.querySelector(".faq-answer");

                    if (faqAnswer) {
                        faqAnswer.style.maxHeight = null;
                    }

                });


            /* Buka FAQ yang dipilih */

            if (!isActive) {

                item.classList.add("active");

                answer.style.maxHeight =
                    answer.scrollHeight + "px";

            }

        });

    });



    /* =========================================================
       BACK TO TOP
    ========================================================= */

    const backToTop =
        document.getElementById("backToTop");


    if (backToTop) {

        window.addEventListener("scroll", function () {

            if (window.scrollY > 400) {

                backToTop.classList.add("show");

            } else {

                backToTop.classList.remove("show");

            }

        });


        backToTop.addEventListener("click", function () {

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

        orderForm.addEventListener(
            "submit",
            function (event) {

                event.preventDefault();


                /*
                 * ID DISESUAIKAN DENGAN HTML
                 */

                const nameInput =
                    document.getElementById("nama");

                const phoneInput =
                    document.getElementById("telepon");

                const serviceInput =
                    document.getElementById("layanan-select");

                const dateInput =
                    document.getElementById("tanggal");

                const locationInput =
                    document.getElementById("lokasi");

                const destinationInput =
                    document.getElementById("tujuan");

                const messageInput =
                    document.getElementById("catatan");


                const name =
                    nameInput
                        ? nameInput.value.trim()
                        : "";

                const phone =
                    phoneInput
                        ? phoneInput.value.trim()
                        : "";

                const service =
                    serviceInput
                        ? serviceInput.value.trim()
                        : "";

                const date =
                    dateInput
                        ? dateInput.value.trim()
                        : "";

                const location =
                    locationInput
                        ? locationInput.value.trim()
                        : "";

                const destination =
                    destinationInput
                        ? destinationInput.value.trim()
                        : "";

                const message =
                    messageInput
                        ? messageInput.value.trim()
                        : "";


                const whatsappNumber =
                    "6281219727254";


                let whatsappMessage =
                    "Halo Ambulance Care,\n\n" +
                    "Saya ingin melakukan pemesanan layanan ambulans.\n\n" +
                    "Nama: " + name + "\n" +
                    "No. WhatsApp: " + phone + "\n" +
                    "Layanan: " + service + "\n" +
                    "Tanggal: " + date + "\n" +
                    "Lokasi Jemput: " + location + "\n" +
                    "Tujuan: " + destination;


                if (message) {

                    whatsappMessage +=
                        "\n\nCatatan:\n" +
                        message;

                }


                const whatsappURL =
                    "https://wa.me/" +
                    whatsappNumber +
                    "?text=" +
                    encodeURIComponent(whatsappMessage);


                window.open(
                    whatsappURL,
                    "_blank"
                );

            }
        );

    }



    /* =========================================================
       ACTIVE NAVIGATION
    ========================================================= */

    const sections =
        document.querySelectorAll(
            "main section[id]"
        );


    const navLinks =
        document.querySelectorAll(
            '.main-nav a[href^="#"]'
        );


    function updateActiveNavigation() {

        let currentSection = "";


        sections.forEach(function (section) {

            const sectionTop =
                section.offsetTop - 150;

            const sectionHeight =
                section.offsetHeight;


            if (
                window.scrollY >= sectionTop &&
                window.scrollY <
                    sectionTop + sectionHeight
            ) {

                currentSection =
                    section.getAttribute("id");

            }

        });


        navLinks.forEach(function (link) {

            link.classList.remove("active");


            const href =
                link.getAttribute("href");


            if (
                href === "#" + currentSection
            ) {

                link.classList.add("active");

            }

        });

    }


    window.addEventListener(
        "scroll",
        updateActiveNavigation
    );


    updateActiveNavigation();



    /* =========================================================
       HERO IMAGE ERROR HANDLER
    ========================================================= */

    const heroImage =
        document.querySelector(
            ".hero-ambulance"
        );


    if (heroImage) {

        heroImage.addEventListener(
            "error",
            function () {

                console.warn(
                    "Gambar hero ambulance tidak ditemukan."
                );

            }
        );

    }



    /* =========================================================
       FLEET SLIDER
    ========================================================= */

    const fleetSlider =
        document.querySelector(
            ".fleet-slider"
        );

    const fleetTrack =
        document.querySelector(
            ".fleet-track"
        );

    const fleetCards =
        document.querySelectorAll(
            ".fleet-card"
        );

    const fleetPrev =
        document.querySelector(
            ".fleet-prev"
        );

    const fleetNext =
        document.querySelector(
            ".fleet-next"
        );

    const fleetDots =
        document.querySelectorAll(
            ".fleet-dot"
        );


    /*
     * Kalau slider tidak ada,
     * jangan hentikan script lainnya.
     */

    if (
        fleetSlider &&
        fleetTrack &&
        fleetCards.length > 0
    ) {

        let fleetCurrentIndex = 0;


        /* =====================================================
           JUMLAH CARD PER VIEW
        ===================================================== */

        function getFleetSlidesPerView() {

            const width =
                window.innerWidth;


            /* HP */

            if (width <= 768) {
                return 1;
            }


            /* Tablet */

            if (width <= 992) {
                return 2;
            }


            /* Desktop */

            return 3;

        }



        /* =====================================================
           MAX INDEX
        ===================================================== */

        function getFleetMaxIndex() {

            const slidesPerView =
                getFleetSlidesPerView();


            return Math.max(
                0,
                fleetCards.length -
                    slidesPerView
            );

        }



        /* =====================================================
           HITUNG GAP
        ===================================================== */

        function getFleetGap() {

            const style =
                window.getComputedStyle(
                    fleetTrack
                );


            const gap =
                parseFloat(style.gap);


            if (!isNaN(gap)) {
                return gap;
            }


            return 0;

        }



        /* =====================================================
           UPDATE SLIDER
        ===================================================== */

        function updateFleetSlider() {

            const slidesPerView =
                getFleetSlidesPerView();


            const maxIndex =
                getFleetMaxIndex();


            /* Pastikan index aman */

            if (
                fleetCurrentIndex >
                maxIndex
            ) {

                fleetCurrentIndex =
                    maxIndex;

            }


            if (
                fleetCurrentIndex < 0
            ) {

                fleetCurrentIndex = 0;

            }



            /* =================================================
               MOBILE
               1 CARD = 1 SLIDE
            ================================================= */

            if (slidesPerView === 1) {

                fleetTrack.style.transform =
                    "translate3d(" +
                    (-fleetCurrentIndex * 100) +
                    "%, 0, 0)";

            }


            /* =================================================
               TABLET / DESKTOP
            ================================================= */

            else {

                const cardWidth =
                    fleetCards[0]
                        .getBoundingClientRect()
                        .width;


                const gap =
                    getFleetGap();


                const moveDistance =
                    cardWidth + gap;


                fleetTrack.style.transform =
                    "translate3d(" +
                    (
                        -fleetCurrentIndex *
                        moveDistance
                    ) +
                    "px, 0, 0)";

            }



            /* =================================================
               DOT
            ================================================= */

            fleetDots.forEach(
                function (dot, index) {

                    const visible =
                        index <= maxIndex;


                    dot.style.display =
                        visible
                            ? ""
                            : "none";


                    dot.classList.toggle(
                        "active",
                        index ===
                            fleetCurrentIndex
                    );

                }
            );



            /* =================================================
               PREVIOUS
            ================================================= */

            if (fleetPrev) {

                fleetPrev.disabled =
                    fleetCurrentIndex === 0;

            }



            /* =================================================
               NEXT
            ================================================= */

            if (fleetNext) {

                fleetNext.disabled =
                    fleetCurrentIndex ===
                    maxIndex;

            }

        }



        /* =====================================================
           NEXT BUTTON
        ===================================================== */

        if (fleetNext) {

            fleetNext.addEventListener(
                "click",
                function () {

                    const maxIndex =
                        getFleetMaxIndex();


                    if (
                        fleetCurrentIndex <
                        maxIndex
                    ) {

                        fleetCurrentIndex++;

                        updateFleetSlider();

                    }

                }
            );

        }



        /* =====================================================
           PREVIOUS BUTTON
        ===================================================== */

        if (fleetPrev) {

            fleetPrev.addEventListener(
                "click",
                function () {

                    if (
                        fleetCurrentIndex > 0
                    ) {

                        fleetCurrentIndex--;

                        updateFleetSlider();

                    }

                }
            );

        }



        /* =====================================================
           DOT BUTTON
        ===================================================== */

        fleetDots.forEach(
            function (dot, index) {

                dot.addEventListener(
                    "click",
                    function () {

                        const maxIndex =
                            getFleetMaxIndex();


                        fleetCurrentIndex =
                            Math.min(
                                index,
                                maxIndex
                            );


                        updateFleetSlider();

                    }
                );

            }
        );



        /* =====================================================
           TOUCH SWIPE HP
        ===================================================== */

        let touchStartX = 0;
        let touchStartY = 0;

        let touchEndX = 0;
        let touchEndY = 0;


        fleetSlider.addEventListener(
            "touchstart",
            function (event) {

                if (
                    !event.touches ||
                    event.touches.length === 0
                ) {
                    return;
                }


                touchStartX =
                    event.touches[0].clientX;

                touchStartY =
                    event.touches[0].clientY;

                touchEndX =
                    touchStartX;

                touchEndY =
                    touchStartY;

            },
            {
                passive: true
            }
        );



        fleetSlider.addEventListener(
            "touchmove",
            function (event) {

                if (
                    !event.touches ||
                    event.touches.length === 0
                ) {
                    return;
                }


                touchEndX =
                    event.touches[0].clientX;

                touchEndY =
                    event.touches[0].clientY;

            },
            {
                passive: true
            }
        );



        fleetSlider.addEventListener(
            "touchend",
            function () {

                handleFleetSwipe();

            },
            {
                passive: true
            }
        );



        function handleFleetSwipe() {

            /*
             * Hanya aktif untuk HP.
             */

            if (
                window.innerWidth > 768
            ) {
                return;
            }


            const deltaX =
                touchEndX -
                touchStartX;


            const deltaY =
                touchEndY -
                touchStartY;


            /*
             * Kalau gerakan lebih banyak
             * ke atas/bawah, anggap sebagai
             * scroll halaman biasa.
             */

            if (
                Math.abs(deltaY) >
                Math.abs(deltaX)
            ) {

                return;

            }


            /*
             * Jarak minimal swipe.
             */

            const minimumSwipe =
                40;


            if (
                Math.abs(deltaX) <
                minimumSwipe
            ) {

                return;

            }



            /* ================================================
               SWIPE KIRI
               ================================================ */

            if (deltaX < 0) {

                const maxIndex =
                    getFleetMaxIndex();


                if (
                    fleetCurrentIndex <
                    maxIndex
                ) {

                    fleetCurrentIndex++;

                    updateFleetSlider();

                }

            }



            /* ================================================
               SWIPE KANAN
               ================================================ */

            else {

                if (
                    fleetCurrentIndex > 0
                ) {

                    fleetCurrentIndex--;

                    updateFleetSlider();

                }

            }

        }



        /* =====================================================
           RESIZE
        ===================================================== */

        let fleetResizeTimer;


        window.addEventListener(
            "resize",
            function () {

                clearTimeout(
                    fleetResizeTimer
                );


                fleetResizeTimer =
                    setTimeout(
                        function () {

                            updateFleetSlider();

                        },
                        150
                    );

            }
        );



        /* =====================================================
           PREVENT IMAGE DRAG
        ===================================================== */

        fleetCards.forEach(
            function (card) {

                const image =
                    card.querySelector("img");


                if (image) {

                    image.setAttribute(
                        "draggable",
                        "false"
                    );

                }

            }
        );



        /* =====================================================
           INITIALIZE
        ===================================================== */

        updateFleetSlider();

    }


});
