const {emailRegex, passwordRegex, phoneRegex} = require("./config");

/**
 * Escapes special regex metacharacters in a user-supplied string so it is
 * safe to embed inside a RegExp or a MongoDB $regex query.
 */
exports.escapeRegex = (str) =>
    String(str).replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

/**
 * Recursively removes keys that start with "$" (MongoDB operators) or are
 * dangerous prototype-polluting keys from a plain object. Arrays are left
 * intact but their object elements are sanitized. Primitives are returned
 * as-is.
 */
const DISALLOWED_KEYS = new Set(["__proto__", "constructor", "prototype"]);
exports.sanitizeDocument = function sanitizeDocument(doc) {
    if (!doc || typeof doc !== "object") return doc;
    if (Array.isArray(doc)) return doc.map(sanitizeDocument);
    return Object.fromEntries(
        Object.entries(doc)
            .filter(([key]) => !key.startsWith("$") && !DISALLOWED_KEYS.has(key))
            .map(([key, value]) => [
                key,
                value && typeof value === "object" ? sanitizeDocument(value) : value
            ])
    );
};

exports.checkEmail = (email) => {
  return email.trim().toLowerCase().match(emailRegex);
}
exports.checkPassword = password => {
  return password.trim().match(passwordRegex);
}
exports.checkPhoneNumber = phone => {
  return phone.trim().match(phoneRegex);
}
