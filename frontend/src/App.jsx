import { Route, Routes } from "react-router-dom"
import AdminReg from "./Components/Register/AdminReg"
import Login from "./Components/Register/Login"
import StudentReg from "./Components/Register/StudentReg"
import HomeDash from "./Components/Dashboard/HomeDash"
import Layout from "./Components/Layout/Layout"
import StudentDashboard from "./Components/Dashboard/StudentDashboard";
function App() {

  return (
    <>
      <div>
        <Routes>
          <Route path="/" element={<AdminReg />} />
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Login />} />
          <Route path="/student-reg" element={<StudentReg />} />
          <Route path="/homedash" element={<Layout><HomeDash /></Layout>} />
          <Route path="/studentdash" element={<StudentDashboard/>}/>
        </Routes>

      </div>
    </>
  )
}

export default App
