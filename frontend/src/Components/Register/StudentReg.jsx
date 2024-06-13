import React, { useState } from "react";
import "./Register.css";
import { Link, useNavigate } from "react-router-dom"
import { toast } from "react-toastify";
import axios from "axios";

const initialState = {
    name: "",
    age: "",
    room: "",
    email: "",
    g_name: "",
    g_email: "",
    gender: "",
    nationality: ""
}

const StudentReg = () => {

    const [formData, setFormData] = useState(initialState);
    const [formValidMessage, setFormValidMessage] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);

    const { email, name, age, nationality, g_name, g_email, gender, roomNum } = formData;

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value })
    };

    const registerStudent = async (e) => {
        e.preventDefault();
        if (!email || !name || !age || !nationality || !g_name || !g_email || !gender || !roomNum) {
            toast.error("All fields are required")
            return;
        }
        setIsSubmitting(true);

        axios
            .post("https://hostel-management-3ztc.vercel.app/student/register-student", formData)
            .then((response) => {
                setIsSubmitting(false);
                toast.success("Registration successful");
                navigate("/studentdash");
                console.log(response)

            }).catch((error) => {
                setIsSubmitting(false);
                const message =
                    error.response?.status === 400
                        ? "A student with same email already exist."
                        : "Server error, unable to process the registration";
                setFormValidMessage(message);
                toast.error("Error registering student")
            })


    }

    const navigate = useNavigate();




    return (
        <div className=" form__ --100vh">
            <div className="form-container">
                <p className="title">Register a new student</p>
                <form className="form" onSubmit={registerStudent}>
                    <div className="--dir-column">
                        <label htmlFor="name">Students Name:</label>
                        <input
                            type="text"
                            className="input"
                            name="name"
                            placeholder="Enter name"
                            onChange={handleInputChange}
                            value={formData.name}
                            required
                        />
                    </div>

                    <div className="--dir-column">
                        <label htmlFor="email">Contact Email:</label>
                        <input
                            type="email"
                            className="input"
                            name="email"
                            placeholder="Enter email"
                            onChange={handleInputChange}
                            value={formData.email}
                            required
                        />
                    </div>

                    <div className="--dir-column">
                        <label htmlFor="age">Age:</label>
                        <input
                            type="text"
                            className="input"
                            name="age"
                            placeholder="Enter age"
                            onChange={handleInputChange}
                            value={formData.age}
                            required
                            min={0}
                        />
                    </div>


                    <div className="--dir-column">
                        <label htmlFor="roomNum">Room Number:</label>
                        <input
                            type="number"
                            className="input"
                            name="roomNum"
                            placeholder="Enter room number"
                            onChange={handleInputChange}
                            value={formData.roomNum}
                            required
                        />
                    </div>
                

                    <div className="--dir-column">
                        <label htmlFor="g_name">Guardian&apos;s Name:</label>
                        <input
                            type="text"
                            className="input"
                            name="g_name"
                            placeholder="Enter name"
                            onChange={handleInputChange}
                            value={formData.g_name}
                            required
                        />
                    </div>

                    <div className="--dir-column">
                        <label htmlFor="g_email">Guardian&apos;s Contact Email:</label>
                        <input
                            type="email"
                            className="input"
                            name="g_email"
                            placeholder="Enter email"
                            onChange={handleInputChange}
                            value={formData.g_email}
                            required
                        />
                    </div>
                    <div className="--dir-column">
                        <label htmlFor="gender">Gender:</label>
                        <input
                            type="text"
                            className="input"
                            name="gender"
                            placeholder="Enter your gender"
                            onChange={handleInputChange}
                            value={formData.gender}
                            required
                        />
                    </div>
                    <div className="--dir-column">
                        <label htmlFor="nationality">Nationality:</label>
                        <input
                            type="text"
                            className="input"
                            name="nationality"
                            placeholder="Enter your nationality"
                            onChange={handleInputChange}
                            value={formData.nationality}
                            required
                        />
                    </div>

                    <button className="--btn" disabled={isSubmitting}>{isSubmitting ? "Adding student..." : "Add student"}</button>
                </form>
                {formValidMessage && (
                    <p className="error-message">{formValidMessage}</p>
                )}
            </div>
        </div>
    );
};

export default StudentReg;
