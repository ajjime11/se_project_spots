const settings = {
  formSelector: ".modal__form",
  inputSelector: ".modal__input",
  submitButtonSelector: ".modal__button",
  inactiveButtonClass: "modal__button_disabled",
  inputErrorClass: "modal__input_type_error",
  errorClass: "modal__error_visible",
};

const initialCards = [
  {
    name: "Golden Gate Bridge",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/7-photo-by-griffin-wooldridge-from-pexels.jpg",
  },
  {
    name: "Val Thorens",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/1-photo-by-moritz-feldmann-from-pexels.jpg",
  },
  {
    name: "Restaurant terrace",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/2-photo-by-ceiline-from-pexels.jpg",
  },
  {
    name: "An outdoor cafe",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/3-photo-by-tubanur-dogan-from-pexels.jpg",
  },
  {
    name: "A very long bridge, over the forest and through the trees",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/4-photo-by-maurice-laschet-from-pexels.jpg",
  },
  {
    name: "Tunnel with morning light",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/5-photo-by-van-anh-nguyen-from-pexels.jpg",
  },
  {
    name: "Mountain house",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/6-photo-by-moritz-feldmann-from-pexels.jpg",
  },
];

const cardsList = document.querySelector(".cards__list");
const cardTemplate = document
  .querySelector("#card-template")
  .content.querySelector(".card");

const profileNameEl = document.querySelector(".profile__name");
const profileDescriptionEl = document.querySelector(".profile__description");

const editProfileModal = document.querySelector("#edit-profile-modal");
const editProfileButton = document.querySelector(".profile__edit-button");
const editProfileCloseButton = editProfileModal.querySelector(
  ".modal__close-button"
);
const editProfileFormEl = editProfileModal.querySelector(".modal__form");
const editProfileNameInput = document.querySelector("#profile-name-input");
const editProfileDescriptionInput = document.querySelector(
  "#profile-description-input"
);

const newPostModal = document.querySelector("#new-post-modal");
const newPostButton = document.querySelector(".profile__add-button");
const newPostCloseButton = newPostModal.querySelector(".modal__close-button");
const newPostFormEl = newPostModal.querySelector(".modal__form");
const newPostImageLinkInput = document.querySelector("#card-image-input");
const newPostCaptionInput = document.querySelector(
  "#caption-description-input"
);

const previewModal = document.querySelector("#preview-modal");
const previewModalCloseBtn = previewModal.querySelector(".modal__close-button");
const previewImageEl = previewModal.querySelector(".modal__image");
const previewCaptionEl = previewModal.querySelector(".modal__caption");

const cardSubmitBtn = document.querySelector(".modal__button");

function openModal(modal) {
  modal.classList.add("modal_is-opened");
}

function closeModal(modal) {
  modal.classList.remove("modal_is-opened");
}

function getCardElement(data) {
  const cardElement = cardTemplate.cloneNode(true);
  const cardTitleEl = cardElement.querySelector(".card__title");
  const cardImageEl = cardElement.querySelector(".card__image");
  const cardLikeBtnEl = cardElement.querySelector(".card__like-button");
  const cardDeleteBtnEl = cardElement.querySelector(".card__delete-button");

  cardImageEl.src = data.link;
  cardImageEl.alt = data.name;
  cardTitleEl.textContent = data.name;

  cardLikeBtnEl.addEventListener("click", () => {
    cardLikeBtnEl.classList.toggle("card__like-button_active");
  });

  cardDeleteBtnEl.addEventListener("click", () => {
    cardDeleteBtnEl.closest(".card").remove();
  });

  cardImageEl.addEventListener("click", () => {
    previewImageEl.src = data.link;
    previewImageEl.alt = data.name;
    previewCaptionEl.textContent = data.name;
    openModal(previewModal);
  });

  return cardElement;
}

function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  profileNameEl.textContent = editProfileNameInput.value;
  profileDescriptionEl.textContent = editProfileDescriptionInput.value;
  closeModal(editProfileModal);
}

function handleAddCardSubmit(evt) {
  evt.preventDefault();
  const name = newPostCaptionInput.value;
  const link = newPostImageLinkInput.value;
  const cardElement = getCardElement({ name, link });
  cardsList.prepend(cardElement);
  evt.target.reset();
  disableButton(cardSubmitBtn, settings);
  closeModal(newPostModal);
}

editProfileButton.addEventListener("click", () => {
  editProfileNameInput.value = profileNameEl.textContent;
  editProfileDescriptionInput.value = profileDescriptionEl.textContent;
  const editProfileInputList = [
    editProfileNameInput,
    editProfileDescriptionInput,
  ];
  const editProfileSubmitBtn =
    editProfileFormEl.querySelector(".modal__button");
  resetValidation(
    editProfileFormEl,
    editProfileInputList,
    editProfileSubmitBtn,
    settings
  );

  openModal(editProfileModal);
});

editProfileCloseButton.addEventListener("click", () =>
  closeModal(editProfileModal)
);

editProfileFormEl.addEventListener("submit", handleProfileFormSubmit);

newPostButton.addEventListener("click", () => {
  const newPostInputList = [newPostImageLinkInput, newPostCaptionInput];
  const newPostSubmitBtn = newPostFormEl.querySelector(".modal__button");
  resetValidation(newPostFormEl, newPostInputList, newPostSubmitBtn, settings);
  openModal(newPostModal);
});

newPostCloseButton.addEventListener("click", () => closeModal(newPostModal));

newPostFormEl.addEventListener("submit", handleAddCardSubmit);

previewModalCloseBtn.addEventListener("click", () => {
  closeModal(previewModal);
});

initialCards.forEach((card) => {
  const cardElement = getCardElement(card);
  cardsList.append(cardElement);
});

enableValidation(settings);
