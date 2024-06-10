import { Route, Routes } from "react-router-dom"
import AdminReg from "./Components/Register/AdminReg"
import Login from "./Components/Register/Login"
import StudentReg from "./Components/Register/StudentReg"
import HomeDash from "./Components/Dashboard/HomeDash"
import Layout from "./Components/Layout/Layout"
import StudentDashboard from "./Components/Dashboard/StudentDashboard";
import Room from "./Components/Dashboard/Room";
import AdminPreview from "./Components/AdminPreview/AdminPreview";
import Attendance from "./Components/Attendance/Attendance"



function App() {


  return (
    <>
      <Routes>

        <Route path="/" element={<AdminReg />} />
        <Route path="/login" element={<Login />} />
        {/* <Route path="/login" element={<Login />} /> */}
        <Route path="/student-reg" element={<StudentReg />} />
        <Route path="/homedash" element={<Layout><HomeDash /></Layout>} />
        <Route path="/studentdash" element={<StudentDashboard />} />
        <Route path="/room" element={<Room />} />
        <Route path="/adminPrev" element={<AdminPreview />} />
        <Route path="/attendance" element={<Layout><Attendance /></Layout>} />
      </Routes>



    </>
  )
}

export default App
