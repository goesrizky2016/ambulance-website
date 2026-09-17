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