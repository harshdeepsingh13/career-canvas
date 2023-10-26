const config = require('../config/config');

const {logger} = config;

module.exports = (err, req, res, next) => {
  console.log("err", err, err?.message, err)
  logger.error(`[ errorMiddleware.js ] Error occurred --- ${err?.message || "Unexpected Error"}`)
  if (req.error) {
    const {
      status,
      message
    } = req.error;
    res.status(status).json({
      status,
      message
    })
  } else {
    res.status(500).json(
      {
        status: 500,
        message: "Internal Server Error"
      }
    )
  }
}
