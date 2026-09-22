/* ============================================================
   JS — comportamentos da página (menu, ano, galeria, vídeos)
   Não precisa mudar nada aqui no dia a dia.
   Instagram e WhatsApp agora estão nos links do HTML.
   ============================================================ */

/* Ano automático no rodapé (© 2026, etc.) */
const year = document.querySelector("#year");
if (year) {
  year.textContent = new Date().getFullYear();
}

/* Menu hambúrguer no celular: abre/fecha a lista de seções */
const header = document.querySelector(".nav");
const toggle = document.querySelector(".nav__toggle");
const menu = document.querySelector("#menu");

toggle.addEventListener("click", () => {
  const open = header.classList.toggle("is-open");
  toggle.setAttribute("aria-expanded", String(open));
  toggle.setAttribute("aria-label", open ? "Fechar menu" : "Abrir menu");
});

/* Ao clicar em um item do menu, fecha o painel (mobile) */
menu.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    header.classList.remove("is-open");
    toggle.setAttribute("aria-expanded", "false");
    toggle.setAttribute("aria-label", "Abrir menu");
  });
});

/* Galeria: clique na foto abre o zoom em tela cheia */
const lightbox = document.querySelector("#lightbox");
const lightboxImg = lightbox.querySelector("img");
const lightboxCaption = lightbox.querySelector(".lightbox__caption");

document.querySelectorAll("[data-lightbox]").forEach((btn) => {
  btn.addEventListener("click", () => {
    lightboxImg.src = btn.dataset.lightbox;
    lightboxImg.alt = btn.querySelector("img")?.alt || "";
    lightboxCaption.textContent = btn.dataset.caption || "";
    lightbox.hidden = false;
    document.body.style.overflow = "hidden";
  });
});

function closeLightbox() {
  lightbox.hidden = true;
  lightboxImg.src = "";
  document.body.style.overflow = "";
}

lightbox.querySelector(".lightbox__close").addEventListener("click", closeLightbox);
lightbox.addEventListener("click", (event) => {
  if (event.target === lightbox) closeLightbox();
});
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && !lightbox.hidden) closeLightbox();
});

/* Vídeos: se um começar a tocar, o outro pausa */
document.querySelectorAll("video").forEach((video) => {
  video.addEventListener("play", () => {
    document.querySelectorAll("video").forEach((other) => {
      if (other !== video) other.pause();
    });
  });
});
