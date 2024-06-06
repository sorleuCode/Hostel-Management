const express =  require("express");
const { registerStudent, getAllStudents, getStudent, updateStudentProfile, changeStudentRoom, updateCheckInstatus, deleteStudent } = require("../controller/studentController");
const router = express.Router();
const {protect} = require("../middleware/authMiddleware");


router.post("/register-student", registerStudent)
router.get("/", getAllStudents)
router.get("/:_id", protect, getStudent)
router.patch("/:_id", protect, updateStudentProfile)
router.post("/change-room", protect, changeStudentRoom)
router.post("/check-in-status", protect, updateCheckInstatus)
router.delete("/delete-student/:_id", deleteStudent);

module.exports = router;