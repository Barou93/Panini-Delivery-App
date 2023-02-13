const router = require("express").Router();

const authController = require("../controllers/auth.controller");

const { checkAdmin } = require('../middleware/auth.middleware');

const adminController = require("../controllers/admin.controller");
const uploadController = require("../controllers/upload.controller");
const upload = require("../middleware/upload.middleware");
//Authentification

router.post("/register", authController.register);
router.post("/login", checkAdmin, authController.login);
router.put("/forgot-password", authController.changePassword);

router.post("/logout", authController.logout);

//Admin Panel
router.get("/:id", checkAdmin, adminController.adminInfos);
//router.put('/:id', adminController.updateProfil);
router.delete("/:id", checkAdmin,  adminController.deleteAdmin);

//Upload File

router.post(
  "/:id/upload",
  upload.single("profil"),
  checkAdmin,
  uploadController.uploadProfil
);

module.exports = router;
