const express = require("express")
const router = express.Router()
const {createNewRoom, getAllRoom, updateRoom, deleteRoom, getRoom} = require("../controller/roomController");
const {protect} = require("../middleware/authMiddleware");


router.post("/create", protect, createNewRoom);
router.get("/", protect, getAllRoom);
router.patch("/:roomId", protect, updateRoom);
router.delete("/:roomId", protect, deleteRoom);
router.get("/:roomId", protect, getRoom);




module.exports = router