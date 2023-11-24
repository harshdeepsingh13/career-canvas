const dotenv = require("dotenv");
//env init
let env_file_path = "./.env"
dotenv.config({path: env_file_path});
/*if (process.env.MODE === "dev") env_file_path = "./.env.development"
dotenv.config({path: env_file_path});*/

const express = require('express');
const fs = require('fs');
const Morgan = require("morgan");

const config = require('./config/config');
const v1Routes = require('./api/v1');
const errorMiddleware = require('./middlewares/errorMiddleware');
const mongooseConnection = require('./config/mongoose');

const port = process.env.PORT || 8081;
const app = express();
const {logger} = config;

//middlewares
app.use(Morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: true}));

//mongodb connection
mongooseConnection();

app.use("/api/v1/static", express.static('temp'));

//API routes
app.use("/api/v1", v1Routes)

//error handler
app.use(errorMiddleware);

//React
if (process.env.MODE === 'production') {
    app.use(express.static('./build'));
    app.get('/*', (req, res) => {
        res.sendFile(path.join(__dirname, './build/index.html'))
    })
}

app.listen(port, () => logger.info(`Server is running on port - ${port}`));
