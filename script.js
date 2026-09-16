const WA_NUMBER = "6281234567890";

const menuToggle = document.getElementById("menuToggle");
const navMenu = document.getElementById("navMenu");

menuToggle.addEventListener("click", () => {
  navMenu.classList.toggle("open");
  menuToggle.textContent = navMenu.classList.contains("open") ? "✕" : "☰";
});

document.querySelectorAll(".nav a").forEach(link => {
  link.addEventListener("click", () => {
    navMenu.classList.remove("open");
    menuToggle.textContent = "☰";
  });
});

document.querySelectorAll(".faq-item button").forEach(button => {
  button.addEventListener("click", () => {
    button.parentElement.classList.toggle("active");
  });
});

document.querySelectorAll(".fleet-btn").forEach(button => {
  button.addEventListener("click", () => {
    const armada = button.dataset.armada;
    const message =
      `Halo Ambulance Care, saya ingin memesan ${armada}.%0A%0A` +
      `Mohon informasi mengenai ketersediaan dan harga layanan.`;
    window.open(`https://wa.me/${WA_NUMBER}?text=${message}`, "_blank");
  });
});

document.querySelectorAll(".service-card a").forEach(link => {
  link.addEventListener("click", () => {
    document.getElementById("lokasi")?.focus();
  });
});

const orderForm = document.getElementById("orderForm");

orderForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const nama = document.getElementById("nama").value.trim();
  const telepon = document.getElementById("telepon").value.trim();
  const lokasi = document.getElementById("lokasi").value.trim();
  const tujuan = document.getElementById("tujuan").value.trim();
  const layanan = document.getElementById("layananSelect").value;
  const tanggal = document.getElementById("tanggal").value;
  const jam = document.getElementById("jam").value;
  const catatan = document.getElementById("catatan").value.trim() || "-";

  const message =
`Halo Ambulance Care, saya ingin melakukan pemesanan ambulans.

Nama: ${nama}
No. WhatsApp: ${telepon}
Layanan: ${layanan}
Lokasi penjemputan: ${lokasi}
Tujuan: ${tujuan}
Tanggal: ${tanggal}
Jam: ${jam}
Catatan: ${catatan}

Mohon dibantu untuk konfirmasi ketersediaan dan estimasi biaya.`;

  window.open(`https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(message)}`, "_blank");
});

const backTop = document.getElementById("backTop");

window.addEventListener("scroll", () => {
  backTop.classList.toggle("show", window.scrollY > 500);
});

const observer = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12 }
);

document.querySelectorAll(".reveal").forEach(el => observer.observe(el));

const today = new Date();
const localDate = new Date(today.getTime() - today.getTimezoneOffset() * 60000)
  .toISOString().split("T")[0];
document.getElementById("tanggal").min = localDate;
