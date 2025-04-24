// Abrir modal de perfil
export function openModal(modal) {
  modal.classList.add("popup_opened");

  // Adiciona evento de clique na sobreposição para fechar o modal
  const overlay = modal.querySelector(".popup__overlay");
  overlay.addEventListener("click", (event) => {
    // Verifica se o clique foi na sobreposição, e não no conteúdo do modal
    if (event.target === overlay) {
      closeModal(modal);
    }
  });
}

// Fechar modal de perfil
export function closeModal(modal) {
  modal.classList.remove("popup_opened");
}

// Fechar modal ao pressionar a tecla Escape
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    const modal = document.querySelector(".popup_opened"); // Seleciona o modal que está aberto
    if (modal) {
      closeModal(modal); // Chama a função de fechar o modal
    }

    const imagePopup = document.querySelector(".popup-image"); // Seleciona o modal de imagem
    if (imagePopup && !imagePopup.classList.contains("popup-image__hidden")) {
      imagePopup.classList.add("popup-image__hidden"); // Fecha o popup de imagem
    }
  }
});

// Função global para abrir o popup de imagem
export function openImagePopup(name, imageUrl) {
  const popup = document.getElementById("popupImageContainer");
  const image = document.getElementById("popupImage");
  const imageName = document.getElementById("popupImageName");

  popup.classList.remove("popup-image__hidden");
  image.src = imageUrl;
  imageName.textContent = name;

  // Fechar popup de imagem ao clicar no botão de fechar
  const closeButton = document.getElementById("popupCloseButton");
  closeButton.addEventListener("click", () => {
    popup.classList.add("popup-image__hidden");
  });

  // Fechar popup de imagem ao clicar na sobreposição
  const overlay = popup.querySelector(".popup__overlay");
  overlay.addEventListener("click", () => {
    popup.classList.add("popup-image__hidden");
  });
}

// Torna a função de abrir o popup de imagem acessível globalmente (para Card.js)
window.openImagePopup = openImagePopup;
