const jwt = require("jsonwebtoken");
const cryptojs = require("crypto-js");

const jwtConfig = {
    issuer: "Harshdeep Singh",
    audience: "",
    expiresIn: "12h",
    algorithm: "RS256"
};

const signOptions = {
    issuer: jwtConfig.issuer,
    audience: jwtConfig.audience,
    // expiresIn: jwtConfig.expiresIn,
    // algorithm: jwtConfig.algorithm
};

const verifyOptions = {
    issuer: jwtConfig.issuer,
    audience: jwtConfig.audience,
    // expiresIn: jwtConfig.expiresIn,
    // algorithm: [jwtConfig.algorithm]
};

exports.getToken = payload => jwt.sign(payload, process.env.PRIVATE_KEY, signOptions)

exports.getPayload = token => jwt.verify(token, process.env.PRIVATE_KEY, verifyOptions)
