import { api } from "./api.js";
import { CardsList } from "./components/CardsList.js";
import { Card } from "./components/card.js";
import { PopupWithImage } from "./components/PopupWithImage.js";
import { PopupWithForm } from "./components/PopupWithForm.js";
import { PopupWithConfirmation } from "./components/PopupWithConfirmation.js";
import { FormValidator } from "./components/FormValidator.js";
import { validationConfig } from "./config.js";
import { UserInfo } from "./components/UserInfo.js";

// Função para corrigir dados dos cards recebidos da API
function fixCardData(card) {
  return {
    ...card,
    likes: Array.isArray(card.likes) ? card.likes : [],
    link: card.link?.trim() || "./images/vetores/image-default.png",
  };
}

// Debug cards e likes
function debugCardsAndLikes(cards, currentUserId) {
  console.log("Debug dos cards recebidos e IDs:");
  cards.forEach((card, i) => {
    const cardId = card._id || card.id;
    const likes = Array.isArray(card.likes) ? card.likes : [];
    const likedByUser = likes.some((user) => user._id === currentUserId);
    console.log(
      `Card #${i + 1}: id="${cardId}", nome="${
        card.name
      }", likedByUser=${likedByUser}`
    );
  });
}

// Popup imagem
const imagePopup = new PopupWithImage("#popupImageContainer");
imagePopup.setEventListeners();

function handleCardClick(name, link) {
  imagePopup.open(name, link);
}

// Like/deslike API
function handleCardLike(cardId, like) {
  console.log("Tentando curtir/descurtir card id:", cardId, "like:", like);
  return like ? api.likeCard(cardId) : api.unlikeCard(cardId);
}

// Popup confirmação exclusão
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
    .then(() => {
      cardElement.remove();
    })
    .catch((err) => console.error("Erro ao deletar card:", err));
}

// UserInfo
const userInfo = new UserInfo({
  nameSelector: ".profile__text-name",
  aboutSelector: ".profile__text-about",
  avatarSelector: ".profile__avatar",
});

let cardsList;
let currentUserId = null;

api
  .getUserInfo()
  .then((userData) => {
    currentUserId = userData._id;
    userInfo.setUserInfo({
      name: userData.name,
      about: userData.about,
      avatar: userData.avatar,
    });

    cardsList = new CardsList(
      ".elements",
      handleCardClick,
      handleCardLike,
      handleCardDelete,
      currentUserId,
      openConfirmPopup
    );

    return api.getInitialCards();
  })
  .then((cardsFromServer) => {
    debugCardsAndLikes(cardsFromServer, currentUserId);

    // Corrige os dados para garantir que likes seja array e link válido
    const fixedCards = cardsFromServer.map(fixCardData);

    cardsList.setCards(fixedCards);
    cardsList.render();
  })
  .catch((err) => console.error("Erro ao carregar dados iniciais:", err));

// Popup editar perfil
const profilePopup = new PopupWithForm(
  ".profile__popup-container",
  (formData) => {
    api
      .setUserInfo({ name: formData.username, about: formData.about })
      .then((updatedUserData) => {
        userInfo.setUserInfo({
          name: updatedUserData.name,
          about: updatedUserData.about,
          avatar: updatedUserData.avatar,
        });
        profilePopup.close();
      })
      .catch((err) => console.error("Erro ao atualizar perfil:", err));
  }
);
profilePopup.setEventListeners();

document.querySelector(".profile__edit-open").addEventListener("click", () => {
  const currentUser = userInfo.getUserInfo();
  document.querySelector("#profile-name").value = currentUser.name;
  document.querySelector("#profile-about").value = currentUser.about;
  editFormValidator.resetValidation();
  profilePopup.open();
});

// Popup adicionar card
const cardAddPopup = new PopupWithForm(".popup__cards", (formData) => {
  api
    .addCard({ name: formData.title, link: formData.link })
    .then((newCardData) => {
      const fixedCardData = fixCardData(newCardData);
      const card = new Card(
        fixedCardData,
        "#card-template",
        handleCardClick,
        handleCardLike,
        handleCardDelete,
        currentUserId,
        openConfirmPopup
      );
      const cardElement = card.generateCard();
      cardsList.addCard(cardElement);
      cardAddPopup.close();
    })
    .catch((err) => console.error("Erro ao adicionar card:", err));
});
cardAddPopup.setEventListeners();

document.querySelector(".popup__add-button").addEventListener("click", () => {
  addFormValidator.resetValidation();
  cardAddPopup.open();
});

// Popup editar avatar
const avatarPopup = new PopupWithForm("#popupAvatar", (formData) => {
  avatarPopup.renderLoading(true);
  api
    .updateAvatar(formData.avatar)
    .then((updatedUserData) => {
      userInfo.setUserInfo(updatedUserData);
      avatarPopup.close();
    })
    .catch((err) => console.error("Erro ao atualizar avatar:", err))
    .finally(() => {
      avatarPopup.renderLoading(false);
    });
});
avatarPopup.setEventListeners();

document
  .querySelector(".profile__avatar-edit-button")
  .addEventListener("click", () => {
    avatarPopup.open();
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

const avatarFormValidator = new FormValidator(
  validationConfig,
  document.forms["form-avatar"]
);
avatarFormValidator.enableValidation();
