const express = require("express")
const router = express.Router()
const {createNewRoom, getAllRoom, updateRoom, deleteRoom, getRoom} = require("../controller/roomController")

router.post("/create", createNewRoom)
router.get("/", getAllRoom)
router.patch("/:roomId", updateRoom)
router.delete("/:roomId", deleteRoom)
router.get("/:roomId", getRoom)




module.exports = router