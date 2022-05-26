const router = require("express").Router();
const propertyControllers = require("../controllers/property.controller");
const upload = require("../utils/multer");

router.get("/search", propertyControllers.searchByType);

router.delete("/:id", propertyControllers.deletePropertyById);

router.get("/:id", propertyControllers.productsById);

router.get("/", propertyControllers.allProperties);

router.post("/", upload.single("image"), propertyControllers.createProperty);

module.exports = router;
