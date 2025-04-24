import { Card } from "./card.js";
import { FormValidator } from "./FormValidator.js";
import { validationConfig } from "./config.js";
import { openModal, closeModal } from "./utils.js";

// Dados iniciais dos cards
const initialCards = [
  {
    name: "Rio Amazonas",
    link: "https://images.unsplash.com/photo-1663637473190-4b4310da8659?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    name: "Àrvore de flores",
    link: "https://images.unsplash.com/photo-1642079003624-5a12dd46837b?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    name: "Flores em sapatos",
    link: "https://images.pexels.com/photos/21620213/pexels-photo-21620213/free-photo-of-flowers-in-shoes-hanging-on-tree.jpeg",
  },
  {
    name: "Casal de Araras",
    link: "https://images.unsplash.com/photo-1606815487684-9ca5b69c98a7?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    name: "Beija-flor",
    link: "https://images.unsplash.com/photo-1636660599781-af866eb7556c?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    name: "Hermerocallis amarelo",
    link: "https://images.pexels.com/photos/30990375/pexels-photo-30990375/free-photo-of-vibrant-yellow-daylily-in-sunlit-garden.jpeg",
  },
];

// Elementos DOM
const cardContainer = document.querySelector(".elements");
const formEdit = document.querySelector(".profile__form");
const formAdd = document.querySelector(".popup__form");
const nameInput = document.querySelector(".profile__input-name");
const aboutInput = document.querySelector(".profile__input-about");
const profileName = document.querySelector(".profile__text-name");
const profileAbout = document.querySelector(".profile__text-about");

const modal = document.querySelector(".profile__popup-container");
const openButton = document.querySelector(".profile__edit-open");
const closeButton = document.querySelector(".profile__close");

const addPopup = document.querySelector(".popup__cards");
const openAddButton = document.querySelector(".popup__add-button");
const closeAddButton = addPopup.querySelector(".popup__close");

// Abrir/Fechar popups
openButton.addEventListener("click", () => openModal(modal));
closeButton.addEventListener("click", () => closeModal(modal));
openAddButton.addEventListener("click", () => openModal(addPopup));
closeAddButton.addEventListener("click", () => closeModal(addPopup));

// Enviar formulário de perfil
formEdit.addEventListener("submit", (event) => {
  event.preventDefault();
  profileName.textContent = nameInput.value;
  profileAbout.textContent = aboutInput.value;
  closeModal(modal);
});

// Render cards iniciais
function renderInitialCards() {
  initialCards.forEach((item) => {
    const card = new Card(item.name, item.link, "#card-template");
    const cardElement = card.generateCard();
    cardContainer.appendChild(cardElement);
  });
}
renderInitialCards();

// Submeter novo card
formAdd.addEventListener("submit", (event) => {
  event.preventDefault();

  const title = formAdd.querySelector("[name='title']").value.trim();
  const link = formAdd.querySelector("[name='link']").value.trim();

  if (title && link) {
    const card = new Card(title, link, "#card-template");
    const cardElement = card.generateCard();
    cardContainer.prepend(cardElement);
  }

  closeModal(addPopup);
  formAdd.reset();
});

// Validação de formulários
const editFormValidator = new FormValidator(validationConfig, formEdit);
editFormValidator.enableValidation();

const addFormValidator = new FormValidator(validationConfig, formAdd);
addFormValidator.enableValidation();
