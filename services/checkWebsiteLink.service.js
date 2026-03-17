const VALID_URL_REGEX = /^(https?:\/\/)?(www\.)?([a-zA-Z0-9]+(-?[a-zA-Z0-9])*\.)+[\w]{2,}(\/\S*)?$/;

const PRIVATE_HOST_PATTERNS = [
    /^localhost$/i,
    /^127\./,
    /^10\./,
    /^172\.(1[6-9]|2\d|3[01])\./,
    /^192\.168\./,
    /^169\.254\./,
    /^::1$/,
    /^0\.0\.0\.0$/,
    /^fc00:/i,
    /^fe80:/i,
];

const isPrivateHost = (hostname) =>
    PRIVATE_HOST_PATTERNS.some((pattern) => pattern.test(hostname));

module.exports = (websiteLink) => {
    if (!websiteLink || !websiteLink.match(VALID_URL_REGEX)) {
        return true;
    }
    try {
        const normalized = websiteLink.startsWith("http") ? websiteLink : `https://${websiteLink}`;
        const { hostname } = new URL(normalized);
        if (isPrivateHost(hostname)) {
            return true;
        }
    } catch {
        return true;
    }
    return false;
};

