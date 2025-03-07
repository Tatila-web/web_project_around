// Array com os cartões iniciais
const initialCards = [
  {
    name: "Field, BC, Canadá",
    link: "https://images.pexels.com/photos/1598075/pexels-photo-1598075.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
  },
  {
    name: "Lago Louise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_lake-louise.jpg",
  },
  {
    name: "Flores em sapatos",
    link: "https://images.pexels.com/photos/21620213/pexels-photo-21620213/free-photo-of-flowers-in-shoes-hanging-on-tree.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
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
    link: "https://images.pexels.com/photos/30990375/pexels-photo-30990375/free-photo-of-vibrant-yellow-daylily-in-sunlit-garden.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
  },
];

// Seleciona os elementos
let modal = document.querySelector(".profile__popup-container");
let openButton = document.querySelector(".profile__edit-open");
let closeButton = document.querySelector(".profile__close");

// Função para abrir o modal
function openModal() {
  modal.classList.add("profile__popup-opened");
}

// Função para fechar o modal
function closeModal() {
  modal.classList.remove("profile__popup-opened");
}

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

// Funções para o popup de adicionar novo local
let addPopup = document.querySelector(".popup__cards");
let openAddButton = document.querySelector(".popup__add-button");
let closeAddButton = document.querySelector(".popup__cards .popup__close");
let addFormElement = document.querySelector(".popup__form"); // Seleciona o formulário de adicionar novo local

// Função para abrir o popup de adicionar novo local
function openAddPopup() {
  addPopup.style.display = "flex"; // Exibe o popup
}

// Função para fechar o popup de adicionar novo local
function closeAddPopup() {
  addPopup.style.display = "none"; // Esconde o popup
}

// Adiciona eventos de clique para abrir e fechar o popup de adicionar novo local
openAddButton.addEventListener("click", openAddPopup);
closeAddButton.addEventListener("click", closeAddPopup);

// Seleciona o contêiner onde os cards serão adicionados
let cardContainer = document.querySelector(".elements");

// Função para criar um novo card
function criarCartao(titulo, imagem) {
  let card = document.createElement("div");
  card.classList.add("elements__card");
  card.style.position = "relative"; // Adiciona posição relativa ao cartão para posicionar o botão dentro dele

  let img = document.createElement("img");
  img.classList.add("elements__image");
  img.src = imagem;
  img.alt = `Imagem de ${titulo}`;

  let desc = document.createElement("div");
  desc.classList.add("elements__description");

  let text = document.createElement("p");
  text.classList.add("elements__text-description");
  text.textContent = titulo;

  let button = document.createElement("button");
  button.classList.add("elements__btn-like");
  button.type = "button";

  let likeIcon = document.createElement("img");
  likeIcon.src = "./images/vetores/Vector_like.png"; // Inicializa com o coração branco
  likeIcon.alt = "Curtir";
  likeIcon.classList.add("elements__like");

  // Criar o botão de exclusão
  let deleteButton = document.createElement("button");
  deleteButton.classList.add("elements__btn-delete");
  deleteButton.type = "button";

  let deleteIcon = document.createElement("img");
  deleteIcon.src = "./images/vetores/Vector_delete.png"; // Adicione o caminho para o ícone de lixeira
  deleteIcon.alt = "Excluir";
  deleteIcon.classList.add("elements__delete-icon");

  // Adiciona o ícone de excluir no botão
  deleteButton.appendChild(deleteIcon);

  // Adiciona o botão de excluir ao card
  desc.appendChild(deleteButton);

  // Adiciona o evento de clique para excluir o card

  deleteButton.addEventListener("click", function () {
    card.remove(); // Remove o card da interface
  });

  button.appendChild(likeIcon);
  desc.appendChild(text);
  desc.appendChild(button);
  card.appendChild(img);
  card.appendChild(desc);

  // Adiciona evento de clique para alternar o estado de curtir
  button.addEventListener("click", function () {
    // Adiciona ou remove a classe 'liked' no ícone de coração
    likeIcon.classList.toggle("liked");
    if (likeIcon.classList.contains("liked")) {
      likeIcon.src = "./images/vetores/Vector_like_black.png"; // Coração preto
    } else {
      likeIcon.src = "./images/vetores/Vector_like.png"; // Coração branco
    }
  });

  return card;
}

// Função para adicionar os eventos de curtir aos botões
function addLikeButtonListeners() {
  // Seleciona todos os botões de curtir
  let likeButtons = document.querySelectorAll(".elements__btn-like");

  // Adiciona o evento de clique a cada botão
  likeButtons.forEach(function (button) {
    button.addEventListener("click", function () {
      let likeIcon = button.querySelector(".elements__like"); // Seleciona o ícone de coração dentro do botão

      // Verifica o estado atual do ícone e alterna entre as imagens
      if (likeIcon.src.includes("Vector_like.png")) {
        likeIcon.src = "./images/vetores/Vector_like_black.png"; // Define imagem preta
      } else {
        likeIcon.src = "./images/vetores/Vector_like.png"; // Define imagem branca
      }
    });
  });
}

// Função para adicionar os cartões iniciais ao carregar a página
function renderInitialCards() {
  initialCards.forEach((card) => {
    let novoCard = criarCartao(card.name, card.link);
    cardContainer.appendChild(novoCard); // Adiciona ao final do contêiner
  });

  // Após renderizar os cartões, adicionar o evento de clique nas imagens
  addImagePopupListeners();
}

// Função para abrir o popup de imagem
function openImagePopup(name, imageUrl) {
  let popup = document.getElementById("popupImageContainer");
  let image = document.getElementById("popupImage");
  let imageName = document.getElementById("popupImageName");

  // Exibe o popup
  popup.classList.remove("popup-image__hidden");

  // Atualiza a imagem e o nome no popup
  image.src = imageUrl;
  imageName.textContent = name;

  // Evento de clique para fechar o popup
  let closeButton = document.getElementById("popupCloseButton");
  closeButton.addEventListener("click", () => {
    popup.classList.add("popup-image__hidden"); // Esconde o popup
  });
}

// Adiciona evento de clique nas imagens dos cartões para abrir o popup
function addImagePopupListeners() {
  let cardImages = document.querySelectorAll(".elements__image"); // Seleciona todas as imagens dos cartões

  cardImages.forEach((img) => {
    img.addEventListener("click", function () {
      let title = img.alt.replace("Imagem de ", ""); // Obtém o título da imagem
      let imageUrl = img.src;

      openImagePopup(title, imageUrl); // Abre o popup com a imagem e o título
    });
  });
}

document.addEventListener("DOMContentLoaded", renderInitialCards);

// Adiciona um novo cartão ao topo do contêiner

addFormElement.addEventListener("submit", function (event) {
  event.preventDefault();

  let titulo = document.querySelector("[name='title']").value.trim();
  let imagem = document.querySelector("[name='link']").value.trim();

  if (titulo && imagem) {
    let novoCard = criarCartao(titulo, imagem);
    cardContainer.prepend(novoCard); // Adiciona no topo

    // Adiciona eventos para os novos cartões
    addImagePopupListeners(); // Para expandir a imagem ao clicar
  }

  closeAddPopup(); // Fecha o popup
  addFormElement.reset(); // Limpa o formulário
});
