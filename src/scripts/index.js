import { api } from "./api.js";
import { Section } from "./components/Section.js";
import { Card } from "./components/card.js";
import { PopupWithImage } from "./components/PopupWithImage.js";
import { PopupWithForm } from "./components/PopupWithForm.js";
import { PopupWithConfirmation } from "./components/PopupWithConfirmation.js";
import { FormValidator } from "./components/FormValidator.js";
import { validationConfig } from "./config.js";
import { UserInfo } from "./components/UserInfo.js";

// Função para corrigir dados incompletos dos cards vindos da API
function fixCardData(card) {
  return {
    ...card,
    likes: Array.isArray(card.likes) ? card.likes : [],
    link: card.link?.trim() || "./images/vetores/image-default.png",
  };
}

// === Popup Imagem ===
// Selector "#popupImageContainer" bate com o id do seu HTML para popup de imagem
const imagePopup = new PopupWithImage("#popupImageContainer");
imagePopup.setEventListeners();

// Abre popup imagem quando clica na imagem do card
function handleCardClick(name, link) {
  imagePopup.open(name, link);
}

// API Like e Unlike
function handleCardLike(cardId, like) {
  return like ? api.likeCard(cardId) : api.unlikeCard(cardId);
}

// === Popup Confirmar Exclusão ===
const confirmPopup = new PopupWithConfirmation("#popupDeleteCard");
confirmPopup.setEventListeners();

let cardDeleteAction = null;

function openConfirmPopup(deleteAction) {
  cardDeleteAction = deleteAction;
  confirmPopup.setSubmitAction(() => {
    if (cardDeleteAction) {
      cardDeleteAction();
    }
    confirmPopup.close();
  });
  confirmPopup.open();
}

function handleCardDelete(cardId, cardElement) {
  api
    .deleteCard(cardId)
    .then(() => cardElement.remove())
    .catch((err) => console.error("Erro ao deletar card:", err));
}

// === User Info ===
// Seletores BEM do HTML usados aqui para alterar nome, descrição e avatar
const userInfo = new UserInfo({
  nameSelector: ".profile__text-name",
  aboutSelector: ".profile__text-about",
  avatarSelector: ".profile__avatar",
});

let currentUserId = null;
let section;

// Cria e adiciona um card na seção
function createCard(cardData) {
  const card = new Card(
    cardData,
    "#card-template", // Template do card no HTML
    handleCardClick,
    handleCardLike,
    handleCardDelete,
    currentUserId,
    openConfirmPopup
  );
  const cardElement = card.generateCard();
  section.addItem(cardElement);
}

// Carrega dados do usuário e cards da API, renderiza tudo
api
  .getUserInfo()
  .then((userData) => {
    currentUserId = userData._id;
    userInfo.setUserInfo({
      name: userData.name,
      about: userData.about,
      avatar: userData.avatar,
    });

    section = new Section({ renderer: createCard }, ".elements");

    return api.getInitialCards();
  })
  .then((cardsFromServer) => {
    const fixedCards = cardsFromServer.map(fixCardData);
    section.setItems(fixedCards);
    section.renderItems();
  })
  .catch((err) => console.error("Erro ao carregar dados iniciais:", err));

// === Popup Editar Perfil ===
// Usa seletor da classe do seu HTML (BEM) para abrir popup correto
const profilePopup = new PopupWithForm(".popup_type_profile", (formData) => {
  api
    .setUserInfo({ name: formData.username, about: formData.about })
    .then((updatedUserData) => {
      userInfo.setUserInfo(updatedUserData);
      profilePopup.close();
    })
    .catch((err) => console.error("Erro ao atualizar perfil:", err));
});
profilePopup.setEventListeners();

// Abre o popup de edição de perfil e preenche inputs com dados atuais do usuário

document.querySelector(".profile__edit-open").addEventListener("click", () => {
  const currentUser = userInfo.getUserInfo();
  document.querySelector("#profile-name").value = currentUser.name;
  document.querySelector("#profile-about").value = currentUser.about;
  editFormValidator.resetValidation();
  profilePopup.open();
});

// === Popup Adicionar Card ===
// Seletores corrigidos para seu HTML BEM

const cardAddPopup = new PopupWithForm(".popup_type_new-card", (formData) => {
  api
    .addCard({ name: formData.title, link: formData.link })
    .then((newCardData) => {
      const fixedCardData = fixCardData(newCardData);
      createCard(fixedCardData);
      cardAddPopup.close();
    })
    .catch((err) => console.error("Erro ao adicionar card:", err));
});
cardAddPopup.setEventListeners();

document
  .querySelector(".profile__add-button") // botão + no perfil
  .addEventListener("click", () => {
    addFormValidator.resetValidation();
    cardAddPopup.open();
  });

// === Popup Editar Avatar ===
const avatarPopup = new PopupWithForm("#popupAvatar", (formData) => {
  avatarPopup.renderLoading(true);
  api
    .updateAvatar(formData.avatar)
    .then((updatedUserData) => {
      userInfo.setUserInfo(updatedUserData);
      avatarPopup.close();
    })
    .catch((err) => console.error("Erro ao atualizar avatar:", err))
    .finally(() => avatarPopup.renderLoading(false));
});
avatarPopup.setEventListeners();

document
  .querySelector(".profile__avatar-edit-button")
  .addEventListener("click", () => {
    avatarPopup.open();
  });

// === Validações dos formulários ===
const editFormValidator = new FormValidator(
  validationConfig,
  document.forms["edit-profile"]
);
editFormValidator.enableValidation();

const addFormValidator = new FormValidator(
  validationConfig,
  document.forms["add-place"]
);
addFormValidator.enableValidation();

const avatarFormValidator = new FormValidator(
  validationConfig,
  document.forms["form-avatar"]
);
avatarFormValidator.enableValidation();
