import React from 'react'
import Sidebar from './Sidebar'
import './Dashboard.css'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { RiDeleteBin6Line } from "react-icons/ri";
import { FaBars, FaTimes } from "react-icons/fa";



const studentsData = [
  {
    id: 1,
    name: "Jessica Smith",
    email: "Jessica.smith@gamil.com",
    idNumber: "1234",
    gender: "Female",
    age: 20,
    nationality: "American"
  },
  {
    id: 2,
    name: "Abdullahi Hayzed",
    email: "hayzed.abudu@gamil.com",
    idNumber: "1254",
    gender: "Male",
    age: 25,
    nationality: "Nigerian"
  },
  {
    id: 1,
    name: "Dolu Doluwamu",
    email: "dolu.doluwamu@gamil.com",
    idNumber: "1222",
    gender: "Female",
    age: 30,
    nationality: "British"
  }
]

const StudentDashboard = () => {

  const [searchTerm, setSearchTerm] = useState("");
  const [students, setStudents] = useState(studentsData);
  const [filteredData, setFilteredData] = useState(studentsData);
  const [isSideBarToggle, setIsSideBarToggle] = useState(false)

  const handleSearchChange = (e) => {
    const term = e.target.value.toLowerCase()
    setSearchTerm(term)

    const filtered = studentsData.filter(
      (student) =>

        student.name.toLowerCase().includes(term) ||
        student.email.toLowerCase().includes(term)
    );

    setFilteredData(filtered)
  }

  const handleDelete = (studentId) => {
    const updatedStudents = students.filter(
      (student) => student.id !== studentId
    );
    setStudents(updatedStudents);
    const updatedFilteredData = filteredData.filter(
      (student) => student.id !== studentId
    )
    setFilteredData(updatedFilteredData);
  }


  return (
    <div>
      {isSideBarToggle && (<div className='mobile-side-nav'>
        <Sidebar />
      </div>)}
      

      <div className='--flex --overflow-hidden'>
        <div className='desktop-side-nav'>
          <Sidebar />
        </div>
        <div className=' --flex-dir-column --overflow-y-auto  --flex-1 --overflow-x-hidden'>

          <main className='--flex-justify-center w-full'>
            <div className='right --dash-main'>

              <div className='--flex-justify-between'>
                <p>Students</p>
                {isSideBarToggle ? (<FaTimes className='sidebar-toggle-iconb' onClick={() => setIsSideBarToggle(false)} />) :
                  (<FaBars className='sidebar-toggle-iconb' onClick={() => setIsSideBarToggle(true)} />)}


              </div>

              <p>Search students</p>

              <input placeholder='Search by name, email, or ID Number'
                type='text'
                className='search'
                value={searchTerm}
                onChange={handleSearchChange}
              />

              <div className='table'>

                <table className='table_wrapper'>
                  <thead className='table__head'>
                    <tr className='table__row'>
                      <th className='same_class'>Student Name</th>
                      <th className='same_class'>Email</th>
                      <th className='same_class'>ID Number</th>
                      <th className='same_class'>Gender</th>
                      <th className='same_class'>Age</th>
                      <th className='same_class'>Nationality</th>
                      <th className='same_class'>Actions</th>
                    </tr>
                  </thead>

                  <tbody className='table__body'>
                    {filteredData.map((student, index) =>

                      <tr key={index} className='table__row'>
                        <td className='same_class'>{student.name}</td>
                        <td className='same_class'>{student.email}</td>
                        <td className='same_class'>{student.idNumber}</td>
                        <td className='same_class'>{student.gender}</td>
                        <td className='same_class'>{student.age}</td>
                        <td className='same_class'>{student.nationality}</td>
                        <td className='same_class'>
                          <RiDeleteBin6Line

                            size={25}
                            color="red"
                            onClick={() => handleDelete(student.id)}
                          />
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>

              <button className='btn-secondary'>

                <Link to="/student-reg">Add a student</Link>
              </button>

            </div>
          </main>

        </div>
      </div>
    </div>





  )
}

export default StudentDashboard