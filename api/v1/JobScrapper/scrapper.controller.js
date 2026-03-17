const linkedinScrapper = require("../../../services/linkedin-scrapper.service");

exports.scrapperController = async (req, res, next) => {
    try {
        const {
            q: keyword,
            location,
            dateSincePosted,
            remoteFilter,
            start: startParam = 0,
            limit: limitParam = 9
        } = req.query;

        const parsedStart = Number.parseInt(startParam, 10);
        const parsedLimit = Number.parseInt(limitParam, 10);
        const start = Number.isNaN(parsedStart) ? 0 : Math.max(0, parsedStart);
        const limit = Number.isNaN(parsedLimit) ? 9 : Math.min(25, Math.max(1, parsedLimit));

        const jobs = await linkedinScrapper.query({
            keyword,
            location,
            dateSincePosted,
            start,
            remoteFilter,
            limit,
            sortBy: "recent"
        });
        res.status(200).json({message: "Jobs Linkedin Search", data: {jobs}})
    } catch (e) {
        req.error = {status: 500, message: "An Error occurred!"}
        return next(new Error());
    }
}
