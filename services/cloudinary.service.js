const config = require("../config/config");

const avatar = {
	folder: "User%20Avatar/"
};
const {cloudinary} = config;

exports.getAvatarLink = publicId =>
	`${cloudinary.defaultResponseURL}${avatar.folder}${publicId}`;
