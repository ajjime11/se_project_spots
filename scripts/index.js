// --- Initial Data ---
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

// --- DOM Elements ---
// Edit Profile Modal
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
const profileNameEl = document.querySelector(".profile__name");
const profileDescriptionEl = document.querySelector(".profile__description");

// New Post Modal
const newPostModal = document.querySelector("#new-post-modal");
const newPostButton = document.querySelector(".profile__add-button");
const newPostCloseButton = newPostModal.querySelector(".modal__close-button");
const newPostFormEl = newPostModal.querySelector(".modal__form");
const editImageLinkInput = document.querySelector("#card-image-input");
const editCaptionInput = document.querySelector("#caption-description-input");

// --- Functions ---
function openModal(modal) {
  modal.classList.add("modal_is-opened");
}

function closeModal(modal) {
  modal.classList.remove("modal_is-opened");
}

function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  profileNameEl.textContent = editProfileNameInput.value;
  profileDescriptionEl.textContent = editProfileDescriptionInput.value;
  closeModal(editProfileModal);
}

function handleAddCardSubmit(evt) {
  evt.preventDefault();
  const name = editCaptionInput.value;
  const link = editImageLinkInput.value;
  // This is where you would call a function to create and add a new card to the page
  // For example: renderCard({ name, link });
  console.log({ name, link }); // logs the new card data as an object
  closeModal(newPostModal);
  evt.target.reset(); // resets the form after submission
}

function renderCard(cardData) {
  // This is where the logic to create a card element would go.
  // For now, it just logs the data as in the original code.
  console.log(cardData.name);
  console.log(cardData.link);
}

// --- Event Listeners ---
// Edit Profile
editProfileButton.addEventListener("click", () => {
  editProfileNameInput.value = profileNameEl.textContent;
  editProfileDescriptionInput.value = profileDescriptionEl.textContent;
  openModal(editProfileModal);
});
editProfileCloseButton.addEventListener("click", () =>
  closeModal(editProfileModal)
);
editProfileFormEl.addEventListener("submit", handleProfileFormSubmit);

// New Post
newPostButton.addEventListener("click", () => openModal(newPostModal));
newPostCloseButton.addEventListener("click", () => closeModal(newPostModal));
newPostFormEl.addEventListener("submit", handleAddCardSubmit);

// --- Initial Page Load ---
// Render initial cards on page load
initialCards.forEach((card) => {
  renderCard(card);
});
