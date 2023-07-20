import Popup from "./Popup.js";
export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._popupImg = this._popup.querySelector(".popup__image");
    this._popupImgDescription = this._popup.querySelector(".popup__title-img");
  }

  _setImageProperties() {
    this._popupImg.setAttribute("src", this._imgSrc);
    this._popupImg.setAttribute("alt", `image of ${this._imgAlt}`);
    this._popupImgDescription.textContent = this._imgAlt;
  }
  open({ name, link }) {
    this._imgSrc = name;
    this._imgAlt = link;
    this._setImageProperties();
    super.open();
  }
}
