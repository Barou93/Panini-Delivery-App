const router = require("express").Router();

const categoryController = require("../controllers/category.controller");
const upload = require("../middleware/upload.middleware");

//Categories Routes

router.post("/", upload.single("category"), categoryController.createCategory);

router.get("/:id", categoryController.getCategory);

router.get("/", categoryController.getAllCategory);

router.put("/:id", categoryController.updateCategory);

router.delete("/:id", categoryController.deleteCategory);

module.exports = router;
