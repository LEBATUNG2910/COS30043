const username = q("#input__username");
const email = q("#input__email");
const password = q("#input__password");
const repassword = q("#input__re-password");
const postcode = q("#input__postcode");
const form = q(".main--register__form__container");

// vietnamsese phone Regex
const emailRegex =
  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

const checkUsername = () => username.value.trim().length > 0;
const checkEmail = () =>
  email.value.trim().length > 0 && email.value.trim().match(emailRegex);
const checkPassword = () => password.value.length >= 8;
const checkRePassword = () => repassword.value === password.value && repassword.value.length > 0;
const checkPostCode = () => postcode.value.trim().length === 4;

const validate = () => {
  let errMsg = "";
  if (!checkUsername()) {
    errMsg += "Please fill in the username\n";
    username.parentNode.classList.add("input__wrapper--error");
  }
  if (!checkPassword()) {
    errMsg += "Please fill in at least 8 characters for the password\n";
    password.parentNode.classList.add("input__wrapper--error");
  }
  if (!checkRePassword()) {
    errMsg += "Please type the same password twice\n";
    repassword.parentNode.classList.add("input__wrapper--error");
  }
  if (!checkEmail()) {
    errMsg += "Please recheck your Email\n";
    email.parentNode.classList.add("input__wrapper--error");
  }
  if (!checkPostCode()) {
    errMsg += "Pleaes recheck your postcode's format";
    postcode.parentNode.classList.add("input__wrapper--error");
  }
  if (errMsg !== "") {
    alert(errMsg);
    return false;
  }
  return true;
};

form.onsubmit = validate;
