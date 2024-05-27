const express = require("express");
const { register, login, getAdmin, deleteAdmin, getAllAdmins } = require("../controller/adminController");
const router = express.Router();
router.post("/register", register)
router.post("/login", login)
router.get("/:adminId", getAdmin)
router.delete("/:adminId", deleteAdmin)
router.get("/", getAllAdmins)
module.exports = router
