const initialCards = [
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

// Keep scrolling for Stage 6
// Edit Profile open/close
const editProfileButton = document.querySelector(".profile__edit-button");
const editProfileModal = document.querySelector("#edit-profile-modal");
const editProfileCloseButton = editProfileModal.querySelector(
  ".modal__close-button"
);

editProfileButton.addEventListener("click", function () {
  openModal(editProfileModal);
  editProfileNameInput.value = profileNameEl.textContent;
  editProfileDescriptionInput.value = profileDescriptionEl.textContent;
});

editProfileCloseButton.addEventListener("click", function () {
  closeModal(editProfileModal);
});

// New Post open/close
const newPostButton = document.querySelector(".profile__add-button");
const newPostModal = document.querySelector("#new-post-modal");
const newPostCloseButton = newPostModal.querySelector(".modal__close-button");

newPostButton.addEventListener("click", function () {
  openModal(newPostModal);
});

newPostCloseButton.addEventListener("click", function () {
  closeModal(newPostModal);
});

// Stage 6
// Edit Profile form submission
const editProfileNameInput = document.querySelector("#profile-name-input");
const profileNameEl = document.querySelector(".profile__name");
const editProfileDescriptionInput = document.querySelector(
  "#profile-description-input"
);
const profileDescriptionEl = document.querySelector(".profile__description");
const editProfileFormEl = editProfileModal.querySelector(".modal__form");

function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  profileNameEl.textContent = editProfileNameInput.value;
  profileDescriptionEl.textContent = editProfileDescriptionInput.value;
  closeModal(editProfileModal);
}
editProfileFormEl.addEventListener("submit", handleProfileFormSubmit);

// New Post form submission
const editImageLinkInput = document.querySelector("#card-image-input");
const editCaptionInput = document.querySelector("#caption-description-input");
const newPostFormEl = newPostModal.querySelector(".modal__form");

function handleAddCardSubmit(evt) {
  evt.preventDefault();
  console.log(editImageLinkInput.value); // logs the value to the console
  console.log(editCaptionInput.value); // logs the value to the console
  closeModal(newPostModal);
  evt.target.reset(); // resets the form after submission
}
newPostFormEl.addEventListener("submit", handleAddCardSubmit);

// Stage 5 forEach function
initialCards.forEach(function (card) {
  console.log(card.name);
  console.log(card.link);
});

function openModal(modal) {
  modal.classList.add("modal_is-opened");
}

function closeModal(modal) {
  modal.classList.remove("modal_is-opened");
}
