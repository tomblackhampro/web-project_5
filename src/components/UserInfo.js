export default class UserInfo {
  constructor({ nameSelector, descriptionSelector }) {
    this._nameElement = document.querySelector(nameSelector);
    this._descriptionElement = document.querySelector(descriptionSelector);
  }

  getUserInfo() {
    return {
      nameSelector: this._nameElement.textContent,
      descriptionSelector: this._descriptionElement.textContent,
    };
  }

  setUserInfo({ name, jobTitle }) {
    this._nameElement.textContent = name;
    this._descriptionElement.textContent = jobTitle;
  }
}
