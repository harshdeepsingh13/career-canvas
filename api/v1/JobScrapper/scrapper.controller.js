const linkedinScrapper = require("../../../services/linkedin-scrapper.service");

exports.scrapperController = async (req, res, next) => {
    try {
        const {
            q: keyword,
            location,
            dateSincePosted,
            remoteFilter,
            start = 0,
            limit = 9
        } = req.query;
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
