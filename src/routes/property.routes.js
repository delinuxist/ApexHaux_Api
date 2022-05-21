const router = require("express").Router();
const propertyControllers = require("../controllers/property.controller");

router.get("/search", propertyControllers.searchByType);

module.exports = router;
