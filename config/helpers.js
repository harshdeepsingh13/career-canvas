const {emailRegex, passwordRegex, phoneRegex} = require("./config");

exports.checkEmail = (email) => {
  return email.trim().toLowerCase().match(emailRegex);
}
exports.checkPassword = password => {
  return password.trim().match(passwordRegex);
}
exports.checkPhoneNumber = phone => {
  return phone.trim().match(phoneRegex);
}
