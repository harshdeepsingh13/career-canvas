const requestBuckets = new Map();

const normalizeIp = (ipAddress = "") => ipAddress.replace("::ffff:", "");

const getClientIp = (req) => {
    const forwardedFor = req.headers["x-forwarded-for"];
    if (forwardedFor) {
        return normalizeIp(forwardedFor.split(",")[0].trim());
    }
    return normalizeIp(req.ip || req.socket?.remoteAddress || "unknown");
};

const cleanupExpiredBuckets = () => {
    const now = Date.now();
    for (const [key, value] of requestBuckets.entries()) {
        if (value.resetAt <= now) {
            requestBuckets.delete(key);
        }
    }
};

exports.createRateLimiter = ({
    windowMs = 60 * 1000,
    maxRequests = 30,
    message = "Too many requests"
} = {}) => {
    return (req, res, next) => {
        if (requestBuckets.size > 10000) {
            cleanupExpiredBuckets();
        }

        const now = Date.now();
        const key = `${getClientIp(req)}:${req.baseUrl || ""}:${req.path || ""}`;
        const existingBucket = requestBuckets.get(key);

        if (!existingBucket || existingBucket.resetAt <= now) {
            requestBuckets.set(key, {
                count: 1,
                resetAt: now + windowMs
            });
            return next();
        }

        existingBucket.count += 1;
        requestBuckets.set(key, existingBucket);

        if (existingBucket.count > maxRequests) {
            const retryAfter = Math.ceil((existingBucket.resetAt - now) / 1000);
            res.setHeader("Retry-After", String(Math.max(retryAfter, 1)));
            return res.status(429).json({
                status: 429,
                message
            });
        }

        return next();
    };
};
