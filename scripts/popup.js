// Seleciona o popup, o botão de fechar e a sobreposição
const popup = document.getElementById("popupImageContainer");
const popupCloseButton = document.getElementById("popupCloseButton");

// Função para fechar o popup
function closePopup() {
  popup.classList.add("popup-image__hidden");
}

// Fecha o popup quando o botão de fechar é clicado
popupCloseButton.addEventListener("click", closePopup);

// Fecha o popup se a sobreposição (background) for clicada
popup.addEventListener("click", (event) => {
  if (event.target === popup) {
    closePopup();
  }
});

// Fecha o popup se a tecla ESC for pressionada
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    closePopup();
  }
});
