const errorFunction = require("./ErrorFunction");

const defaultController = async (req, res, next) => {
        res.status(200);
        res.json(errorFunction(false, "Home Page", "Welcome from seeder"));
};

module.exports = defaultController;