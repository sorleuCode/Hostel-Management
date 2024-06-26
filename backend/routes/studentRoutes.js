const express =  require("express");
const { registerStudent, getAllStudents, getStudent, updateStudentProfile, changeStudentRoom, updateCheckInstatus, deleteStudent } = require("../controller/studentController");
const router = express.Router();
const {protect} = require("../middleware/authMiddleware");


router.post("/register-student", registerStudent)
router.get("/", getAllStudents)
router.get("/:_id", getStudent)
router.patch("/:_id", updateStudentProfile)
router.post("/change-room", changeStudentRoom)
router.post("/check-in-status", updateCheckInstatus)
router.delete("/delete-student/:_id", deleteStudent);

module.exports = router;