import "./index.css";
import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import {
  initialCards,
  profileEditButton,
  cardCreateButton,
  nameTitle,
  nameDescription,
  formValidators,
  containerSelector,
} from "../scripts/constants.js";
import Section from "../components/Section.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from "../components/PopupWithImage.js";
import UserInfo from "../components/UserInfo.js";

const cardList = new Section(
  {
    items: initialCards,
    renderer: (item) => {
      const cardElement = createCard(item.link, item.name);
      return cardElement;
    },
  },
  containerSelector
);

cardList.renderItems();

const profileFormPopup = new PopupWithForm(".popup-profile", (formData) => {
  renderUserProfileInfo.setUserInfo({
    name: formData.name,
    jobTitle: formData.aboutme,
  });
});
profileFormPopup.setEventListeners();

const addCardForm = new PopupWithForm(".popup-add", (formData) => {
  const cardElement = createCard(formData.imagelink, formData.title);
  cardList.addItem(cardElement);
});
addCardForm.setEventListeners();

const popupWithImage = new PopupWithImage(".popup-image");
popupWithImage.setEventListeners();

const enableValidation = (settings) => {
  const formList = Array.from(document.querySelectorAll(settings.formSelector));
  formList.forEach((formInput) => {
    const validator = new FormValidator(settings, formInput);
    const formName = formInput.getAttribute("name");
    formValidators[formName] = validator;
    validator.enableValidation();
  });
};

enableValidation({
  errorSelector: ".popup__error",
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button-save",
  inputErrorClass: "popup__input_type_error",
  inactiveButtonClass: "popup__button_disabled",
  errorClass: "popup__error_visible",
});

const renderUserProfileInfo = new UserInfo({
  nameSelector: ".profile__title",
  descriptionSelector: ".profile__description",
});

renderUserProfileInfo.setUserInfo({
  name: "Jacques Cousteau",
  jobTitle: "Explorer",
});

function createCard(link, name) {
  const cardObject = new Card(
    { imgUrl: link, title: name },
    "#card-template",
    ({ imgSrc, imgAlt }) => {
      popupWithImage.open({
        name: imgSrc,
        link: imgAlt,
      });
    }
  );
  const newCard = cardObject.generateCard();
  return newCard;
}

profileEditButton.addEventListener("click", () => {
  const userInfo = renderUserProfileInfo.getUserInfo();
  nameTitle.value = userInfo.nameSelector;
  nameDescription.value = userInfo.descriptionSelector;
  profileFormPopup.open();
});

cardCreateButton.addEventListener("click", () => {
  formValidators[formadd.getAttribute("name")].resetValidation();
  addCardForm.open();
});

///Api
api.getUserInfo().then((res) => {
  //console.log(res)
  userInfo.setUserInfo({ name: res.name, aboutMe: res.about, userId: res._id });
  //console.log("check", api)
});
api.getInitialCards().then((res) => {
  section.renderItems(res);
  //console.log("res", res)
});
