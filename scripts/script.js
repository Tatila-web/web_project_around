// Seleciona os elementos
let modal = document.querySelector(".profile__popup-container");
let openButton = document.querySelector(".profile__open");
let closeButton = document.querySelector(".profile__close");

// Função para abrir o modal
function openModal() {
  modal.classList.add("profile__popup-opened");
}

// Função para fechar o modal
function closeModal() {
  modal.classList.remove("profile__popup-opened");
}
// Formulário su

// Adiciona eventos de clique apenas nos botões
openButton.addEventListener("click", openModal);
closeButton.addEventListener("click", closeModal);

let formElement = document.querySelector(".profile__form");
let nameInput = document.querySelector(".profile__input-name");
let aboutInput = document.querySelector(".profile__input-about");
let profileName = document.querySelector(".profile__text-name");
let profileAbout = document.querySelector(".profile__text-about");

function handlerFormSubmit(event) {
  event.preventDefault();
  profileName.textContent = nameInput.value;
  profileAbout.textContent = aboutInput.value;

  closeModal();
}

formElement.addEventListener("submit", handlerFormSubmit);
