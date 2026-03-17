const dotenv = require("dotenv");
//env init
let env_file_path = "./.env"
dotenv.config({path: env_file_path});
/*if (process.env.MODE === "dev") env_file_path = "./.env.development"
dotenv.config({path: env_file_path});*/

const express = require('express');
const Morgan = require("morgan");
const path = require("path");
const cors = require("cors");

const config = require('./config/config');
const v1Routes = require('./api/v1');
const errorMiddleware = require('./middlewares/errorMiddleware');
const mongooseConnection = require('./config/mongoose');

const port = process.env.SERVER_PORT || process.env.PORT || 8081;
const app = express();
const {logger} = config;

const resolveTrustProxy = () => {
    if (typeof process.env.TRUST_PROXY === "undefined") return 1;
    if (process.env.TRUST_PROXY === "true") return 1;
    if (process.env.TRUST_PROXY === "false") return false;
    const numericValue = Number(process.env.TRUST_PROXY);
    return Number.isNaN(numericValue) ? process.env.TRUST_PROXY : numericValue;
};

const defaultAllowedOrigins = ["http://localhost:3000", "http://127.0.0.1:3000"];
const configuredOrigins = (process.env.CORS_ALLOWED_ORIGINS || "")
    .split(",")
    .map((origin) => origin.trim())
    .filter(Boolean);
const allowedOrigins = new Set(configuredOrigins.length ? configuredOrigins : defaultAllowedOrigins);
const bodyLimit = process.env.REQUEST_BODY_LIMIT || "100kb";

const corsOptions = {
    origin: (origin, callback) => {
        if (!origin) {
            return callback(null, true);
        }
        if (allowedOrigins.has(origin)) {
            return callback(null, true);
        }
        return callback(null, false);
    },
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS", "HEAD"],
    credentials: true,
    optionsSuccessStatus: 204
};

const allowedMethods = new Set(["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS", "HEAD"]);

//middlewares
app.disable("x-powered-by");
app.set("trust proxy", resolveTrustProxy());
app.use(Morgan('dev'));
app.use(cors(corsOptions));
app.options("*", cors(corsOptions));
app.use((req, res, next) => {
    if (allowedMethods.has(req.method)) {
        return next();
    }
    req.error = {
        status: 405,
        message: "Method Not Allowed"
    };
    return next(new Error());
});
app.use(express.json({limit: bodyLimit}));
app.use(express.urlencoded({extended: true, limit: bodyLimit}));

//mongodb connection
mongooseConnection();

app.use(
    "/api/v1/static",
    (req, res, next) => {
        if (req.path !== "/temp.pdf") {
            req.error = {
                status: 404,
                message: "Not Found"
            };
            return next(new Error());
        }
        return next();
    },
    express.static("temp", {
        index: false,
        dotfiles: "deny",
        fallthrough: false,
        setHeaders: (res) => {
            res.setHeader("Cache-Control", "no-store, no-cache, must-revalidate, proxy-revalidate");
            res.setHeader("Pragma", "no-cache");
            res.setHeader("Expires", "0");
            res.setHeader("X-Content-Type-Options", "nosniff");
        }
    })
);

//API routes
app.use("/api/v1", v1Routes)

app.all(["/api/v1", "/api/v1/*"], (req, res) => {
    res.status(404).json({
        status: 404,
        message: "Not Found"
    });
});

//error handler
app.use(errorMiddleware);

//React
if (process.env.MODE === 'production') {
    app.use(express.static('./build'));
    app.get(/^\/(?!api\/).*/, (req, res) => {
        res.sendFile(path.join(__dirname, './build/index.html'))
    })
}

app.listen(port, () => logger.info(`Server is running on port - ${port}`));
