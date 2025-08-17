import "./index.css";

import {
  enableValidation,
  resetValidation,
  disableButton,
} from "../scripts/validation.js";

import Api from "../utils/Api.js";

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

const api = new Api({
  baseUrl: "https://around-api.en.tripleten-services.com/v1",
  headers: {
    authorization: "73b45784-19b2-4053-852d-56fa72f710be",
    "Content-Type": "application/json",
  },
});

const cardsList = document.querySelector(".cards__list");
const cardTemplate = document
  .querySelector("#card-template")
  .content.querySelector(".card");

const profileNameEl = document.querySelector(".profile__name");
const profileDescriptionEl = document.querySelector(".profile__description");
const profileAvatarEl = document.querySelector(".profile__avatar");

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

const avatarModal = document.querySelector("#edit-avatar-modal");
const avatarForm = avatarModal.querySelector(".modal__form");
const avatarSubmitBtn = avatarModal.querySelector(".modal__button");
const avatarModalCloseBtn = avatarModal.querySelector(".modal__close-button");
const avatarInput = avatarModal.querySelector("#avatar-name-input");
const avatarEditButton = document.querySelector(".profile__avatar-edit-btn");

const deleteModal = document.querySelector("#delete-modal");
const deleteModalCloseBtn = deleteModal.querySelector(".modal__close-button");
const deleteCancelBtn = document.querySelector("#delete-cancel-button");

let cardIdToDelete = null;
let cardToDelete = null;

const deleteConfirmBtn = deleteModal.querySelector(
  ".modal__button_type_delete"
);

function openModal(modal) {
  modal.classList.add("modal_is-opened");
  document.addEventListener("keydown", closeModalByEscape);
  modal.addEventListener("mousedown", closeModalByOverlay);
}

function closeModal(modal) {
  modal.classList.remove("modal_is-opened");
  document.removeEventListener("keydown", closeModalByEscape);
  modal.removeEventListener("mousedown", closeModalByOverlay);
}

function closeModalByEscape(evt) {
  if (evt.key === "Escape") {
    const modalIsOpened = document.querySelector(".modal_is-opened");
    closeModal(modalIsOpened);
  }
}

function closeModalByOverlay(evt) {
  if (evt.target === evt.currentTarget) {
    closeModal(evt.target);
  }
}

function handleDeleteCard(cardElement, data) {
  cardToDelete = cardElement;
  cardIdToDelete = data._id;
  openModal(deleteModal);
}

function handleDeleteSubmit(evt) {
  evt.preventDefault();
  api
    .deleteCard(cardIdToDelete)
    .then(() => {
      if (cardToDelete) {
        cardToDelete.remove();
      }
      closeModal(deleteModal);
    })
    .catch((err) => {
      console.error("Failed to delete card:", err);
    });
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
    const isLiked = cardLikeBtnEl.classList.contains(
      "card__like-button_active"
    );

    if (isLiked) {
      api
        .unlikeCard(data._id)
        .then(() => {
          cardLikeBtnEl.classList.remove("card__like-button_active");
        })
        .catch(console.error);
    } else {
      api
        .likeCard(data._id)
        .then(() => {
          cardLikeBtnEl.classList.add("card__like-button_active");
        })
        .catch(console.error);
    }
  });

  cardDeleteBtnEl.addEventListener("click", () =>
    handleDeleteCard(cardElement, data)
  );

  cardImageEl.addEventListener("click", () => {
    previewImageEl.src = data.link;
    previewImageEl.alt = data.name;
    previewCaptionEl.textContent = data.name;
    openModal(previewModal);
  });

  if (data.isLiked) {
    cardLikeBtnEl.classList.add("card__like-button_active");
  }

  return cardElement;
}

function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  api
    .editUserInfo({
      name: editProfileNameInput.value,
      about: editProfileDescriptionInput.value,
    })
    .then((data) => {
      profileNameEl.textContent = data.name;
      profileDescriptionEl.textContent = data.about;
      closeModal(editProfileModal);
    })
    .catch((err) => {
      console.error(err);
    });
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

avatarEditButton.addEventListener("click", () => openModal(avatarModal));
avatarModalCloseBtn.addEventListener("click", () => closeModal(avatarModal));

function handleAvatarSubmit(evt) {
  evt.preventDefault();
  api
    .editAvatarInfo({ avatar: avatarInput.value })
    .then((data) => {
      profileAvatarEl.src = data.avatar;
      closeModal(avatarModal);
    })
    .catch(console.error);
}

avatarForm.addEventListener("submit", handleAvatarSubmit);

deleteModalCloseBtn.addEventListener("click", () => closeModal(deleteModal));

deleteCancelBtn.addEventListener("click", () => closeModal(deleteModal));

deleteConfirmBtn.addEventListener("click", handleDeleteSubmit);

api
  .getAppInfo()
  .then(([cards, user]) => {
    cards.forEach((item) => {
      const cardElement = getCardElement(item);
      cardsList.append(cardElement);
    });
    profileAvatarEl.src = user.avatar;
    profileNameEl.textContent = user.name;
    profileDescriptionEl.textContent = user.about;
  })
  .catch((err) => {
    console.error(err);
  });

enableValidation(settings);
