import { Card } from "./card.js";
import { FormValidator } from "./FormValidator.js";
import { validationConfig } from "./config.js";
import { openModal, closeModal } from "./utils.js";

// Dados iniciais dos cards
const initialCards = [
  {
    name: "Field, BC, Canadá",
    link: "https://images.pexels.com/photos/1598075/pexels-photo-1598075.jpeg",
  },
  {
    name: "Lago Louise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_lake-louise.jpg",
  },
  {
    name: "Flores em sapatos",
    link: "https://images.pexels.com/photos/21620213/pexels-photo-21620213/free-photo-of-flowers-in-shoes-hanging-on-tree.jpeg",
  },
  {
    name: "Latemar",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_latemar.jpg",
  },
  {
    name: "Parque Nacional da Vanoise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_vanoise.jpg",
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
