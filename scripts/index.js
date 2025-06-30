import { Card } from "./components/card.js";
import { Section } from "./components/Section.js";
import { PopupWithImage } from "./components/PopupWithImage.js";
import { PopupWithForm } from "./components/PopupWithForm.js";
import { FormValidator } from "./components/FormValidator.js";
import { validationConfig } from "./config.js";
import { UserInfo } from "./components/UserInfo.js";

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

// Instância do popup de imagem
const imagePopup = new PopupWithImage("#popupImageContainer");
imagePopup.setEventListeners();

function handleCardClick(name, link) {
  imagePopup.open(name, link);
}

// Renderiza os cards
const cardSection = new Section(
  {
    items: initialCards,
    renderer: (item) => {
      const card = new Card(
        item.name,
        item.link,
        "#card-template",
        handleCardClick
      );
      const cardElement = card.generateCard();
      cardSection.addItem(cardElement);
    },
  },
  ".elements"
);
cardSection.renderItems();

// Instância do UserInfo
const userInfo = new UserInfo({
  nameSelector: ".profile__text-name",
  aboutSelector: ".profile__text-about",
});

// Instância do popup editar perfil
const profilePopup = new PopupWithForm(
  ".profile__popup-container",
  (formData) => {
    userInfo.setUserInfo({ name: formData.username, about: formData.about });
    profilePopup.close(); // Fecha e limpa inputs
  }
);
profilePopup.setEventListeners();

// Abrir popup de editar perfil - preenchimento com getUserInfo
const openButton = document.querySelector(".profile__edit-open");
openButton.addEventListener("click", () => {
  const currentUser = userInfo.getUserInfo();
  document.querySelector("#profile-name").value = currentUser.name;
  document.querySelector("#profile-about").value = currentUser.about;
  editFormValidator.resetValidation(); // Limpa erros e habilita botão
  profilePopup.open();
});

// Instância do popup adicionar card
const cardAddPopup = new PopupWithForm(".popup__cards", (formData) => {
  const card = new Card(
    formData.title,
    formData.link,
    "#card-template",
    handleCardClick
  );
  const cardElement = card.generateCard();
  cardSection.addItem(cardElement);
  cardAddPopup.close();
});
cardAddPopup.setEventListeners();

// Abrir popup de adicionar card
const openAddButton = document.querySelector(".popup__add-button");
openAddButton.addEventListener("click", () => {
  cardAddPopup.open();
});

// Validação dos formulários
const editFormValidator = new FormValidator(
  validationConfig,
  document.querySelector(".profile__form")
);
editFormValidator.enableValidation();

const addFormValidator = new FormValidator(
  validationConfig,
  document.querySelector(".popup__form")
);
addFormValidator.enableValidation();
