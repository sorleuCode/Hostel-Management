const express = require("express");
const { register, login, getAdmin, deleteAdmin, getAllAdmins, updateAdmin, logoutAdmin } = require("../controller/adminController");
const router = express.Router();
const {protect} = require("../middleware/authMiddleware");

router.post("/register", register);
router.post("/login", login);
router.get("/:adminId", getAdmin);
router.delete("/:adminId", deleteAdmin);
router.get("/", getAllAdmins);
router.patch("/:adminId", updateAdmin);
router.post("/logout", logoutAdmin);
module.exports = router;
