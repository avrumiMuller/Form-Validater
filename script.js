const form = document.getElementById("form");
const username = document.getElementById("username");
const email = document.getElementById("email");
const password = document.getElementById("password");
const password2 = document.getElementById("password2");

class MainForm {
  constructor() {
    form.addEventListener("submit", this.eventListener.bind(this));
  }

  // Show error
  showError(input, message) {
    const formControl = input.parentElement;
    formControl.classList = "form-control error";
    formControl.querySelector("small").innerText = message;
  }
  // Show success
  showSuccess(input) {
    input.parentElement.classList = "form-control success";
  }

  //Get fieldname
  getFieldName(input) {
    return `${input.id[0].toUpperCase()}${input.id.substring(1)}`;
  }

  // Check if there is value
  chechValue(input) {
    input.forEach((inp) => {
      if (inp.value.trim() === "") {
        this.showError(inp, `${this.getFieldName(inp)} is required`);
      } else {
        this.showSuccess(inp);
      }
    });
  }

  //Check input length
  checkLength(input, min, max) {
    const value = input.value;

    if (value && value.length > max) {
      this.showError(
        input,
        `${this.getFieldName(input)} must be less then ${max} characters`
      );
    }
    if (value && value.length < min) {
      this.showError(
        input,
        `${this.getFieldName(input)} must be at least ${min} characters`
      );
    }
  }

  // check password match
  isPasswordMatch() {
    if (password2.value && password2.value !== password.value) {
      this.showError(password2, `${this.getFieldName(password)} do not match`);
    }
  }

  // check email is valid
  isValidEmail(email) {
    const check = String(email.value)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
    if (email.value && !check) {
      return this.showError(email, "Email is not valid");
    }
  }

  eventListener(e) {
    e.preventDefault();
    this.chechValue([username, email, password, password2]);
    this.isValidEmail(email);
    this.checkLength(username, 5, 15);
    this.checkLength(password, 5, 10);
    this.isPasswordMatch();
  }
}

new MainForm();
