const {getUser} = require("../api/v1/User/user.model");
const {getPayload} = require("../services/jwt.service");
const {logger} = require("../config/config");

const normalizeIp = (ipAddress = "") => ipAddress.replace("::ffff:", "");

const getClientIp = (req) => {
    const forwardedFor = req.headers["x-forwarded-for"];
    if (forwardedFor) {
        return normalizeIp(forwardedFor.split(",")[0].trim());
    }
    return normalizeIp(req.ip || req.socket?.remoteAddress || "unknown");
};

const isLegacySecretEnabled = () => process.env.ALLOW_LEGACY_SECRET_AUTH === "true";

const isLegacySecretExpired = () => {
    if (!process.env.LEGACY_SECRET_AUTH_EXPIRES_AT) {
        return false;
    }
    const expiresAt = new Date(process.env.LEGACY_SECRET_AUTH_EXPIRES_AT).getTime();
    if (Number.isNaN(expiresAt)) {
        return true;
    }
    return Date.now() > expiresAt;
};

const isAllowedLegacySource = (req) => {
    const configuredIps = (process.env.LEGACY_SECRET_ALLOWED_IPS || "127.0.0.1,::1")
        .split(",")
        .map((ipAddress) => ipAddress.trim())
        .filter(Boolean)
        .map(normalizeIp);

    if (configuredIps.includes("*")) {
        return true;
    }

    return configuredIps.includes(getClientIp(req));
};

const canUseLegacySecretAuth = (req) => {
    if (!req.query.secret) {
        return false;
    }

    const configuredSecret = process.env.LEGACY_SECRET_AUTH_SECRET || "thisIsHd";
    if (req.query.secret !== configuredSecret) {
        return false;
    }

    if (!isLegacySecretEnabled()) {
        logger.warn(`[auth] Legacy secret bypass blocked for IP=${getClientIp(req)} reason=disabled`);
        return false;
    }

    if (isLegacySecretExpired()) {
        logger.warn(`[auth] Legacy secret bypass blocked for IP=${getClientIp(req)} reason=expired`);
        return false;
    }

    if (!isAllowedLegacySource(req)) {
        logger.warn(`[auth] Legacy secret bypass blocked for IP=${getClientIp(req)} reason=source_not_allowed`);
        return false;
    }

    return true;
};

module.exports = async (req, res, next) => {
    if (canUseLegacySecretAuth(req)) {
        try {
            const legacyEmail = process.env.LEGACY_SECRET_USER_EMAIL || "harshdeepsingh13@gmail.com";
            const user = await getUser(legacyEmail);
            if (!user) {
                req.error = {
                    status: 401,
                    message: "Invalid token."
                }
                next(new Error());
            }
            req.user = user;
            logger.warn(`[auth] Legacy secret bypass used by IP=${getClientIp(req)} for ${legacyEmail}`);
            next();
        } catch (e) {
            if (e.name === "JsonWebTokenError") {
                req.error = {
                    status: 401,
                    message: "Invalid token."
                }
                return next(new Error());
            }
            req.error = {status: 500, message: "An Error occurred!"}
            return next(new Error());
        }
    } else {
        if (!req.headers.authorization) {
            req.error = {
                status: 401,
                message: "Authentication token required."
            };
            return next(new Error());
        }
        try {
            const {email, mode} = getPayload(req.headers.authorization.split('Bearer ')[1]);
            const user = await getUser(email);
            if (!user) {
                req.error = {
                    status: 401,
                    message: "Invalid token."
                }
                return next(new Error());
            }
            req.user = {...user._doc, mode};
            next();
        } catch (e) {
            console.log("e", e);
            if (e.name === "JsonWebTokenError") {
                req.error = {
                    status: 401,
                    message: "Invalid token."
                }
                return next(new Error());
            }
            req.error = {status: 500, message: "An Error occurred!"}
            return next(new Error());
        }
    }
};
