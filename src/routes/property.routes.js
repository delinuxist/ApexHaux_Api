const router = require("express").Router();
const propertyControllers = require("../controllers/property.controller");

router.get("/search", propertyControllers.searchByType);

router.delete("/:id", propertyControllers.deletePropertyById);

router.get("/:id", propertyControllers.productsById);

module.exports = router;
