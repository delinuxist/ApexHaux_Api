const router = require("express").Router();
const propertyControllers = require("../controllers/property.controller");

router.get("/search", propertyControllers.searchByType);

router.delete("/:id", propertyControllers.deletePropertyById);

module.exports = router;
