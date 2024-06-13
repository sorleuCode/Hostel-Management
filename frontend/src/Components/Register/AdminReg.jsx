import React, { useCallback, useContext, useState, useEffect } from 'react';
import "./Register.css"
import { Link, useNavigate } from "react-router-dom";
import Loader from "../Loader/Loader"
import PasswordInput from '../PasswordInput/PasswordInput';
import { UserContext } from '../../../context/userContext';
import axios from "axios";
import { toast } from "react-toastify";
import { FaTimes } from 'react-icons/fa';
import { BsCheck2All } from 'react-icons/bs';

const AdminReg = () => {
    const [loading, setLoading] = useState(true);

    const { setUser } = useContext(UserContext);
    const [formValidMessage, setFormValidMessage] = useState(false);
    const [formCompleted, setFormCompleted] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [formData, setFormData] = useState({
        fullname: "",
        email: "",
        password: "",
        password2: ""
    });

    const [uCase, setUCase] = useState(false);
    const [num, setNum] = useState(false);
    const [sChar, setSChar] = useState(false);
    const [passLength, setPassLength] = useState(false)

    const navigate = useNavigate();
    const timesIcon = <FaTimes color="red" size={20} />;
    const checkIcon = <BsCheck2All color="green" size={20} />;

    const switchIcon = (condition) => {
        return condition ? checkIcon : timesIcon;
    }

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: value
        }))

    }




    useEffect(() => {
        const { password } = formData;

        setUCase(/([a-z].[A-Z])|([A-Z].[a-z])/.test(password));
        setNum(/[0-9]/.test(password));
        setSChar(/[!,%,&,@,#,$,^,*,?,_,~]/.test(password));
        setPassLength(password.length > 5)
    }, [formData.password]);

    const handleSubmit = useCallback(
        (event) => {
            event.preventDefault();


            const { fullname, email, password, password2 } = formData;

            if (!fullname || !email || !password || !password2) {
                setFormValidMessage("Oops!! All fields are required 🙂")
                return;
            }

            if (password !== password2) {
                setFormValidMessage("Password does not match")
            }

            setIsSubmitting(true);

            axios
            .post("https://hostel-management-3ztc.vercel.app/admin/register", formData)
                .then((response) => {
                    setUser(response.data);
                    setIsSubmitting(false);
                    setFormCompleted(true);
                    toast.success("Registration successful");
                    navigate("/homedash", {state: {user: response.data}})
                }).catch((error) => {
                    setIsSubmitting(false);
                    const message = 
                    error.response?.status === 400
                    ? "A user with the same email already exists"
                    : "Server  error, unable to register";

                    setFormValidMessage(message);
                })

        }


    )

    useEffect(() => {
        setTimeout(() => {
            setLoading(false)
        }, 2000)
    }, []
    )


    return (
        <>
            {loading ? (<Loader />) : (
                <div className='container form__ --100vh'>
                    <div className='form-container'>
                        <p className='title'>Create an account</p>
                        <form className='form' onSubmit={handleSubmit}>
                            <div className='--dir-column'>
                                <label htmlFor='fullname'>Full name:</label>
                                <input
                                    type="text"
                                    name='fullname'
                                    className='input'
                                    placeholder='Enter your name'
                                    onChange={handleInputChange}
                                    required
                                    value={formData.fullname}

                                />
                            </div>
                            <div className='--dir-column'>
                                <label htmlFor='email'>Email:</label>
                                <input
                                    type="email"
                                    name='email'
                                    className='input'
                                    placeholder='example@gmail.com'
                                    value={formData.email}
                                    onChange={handleInputChange}
                                    required

                                />
                            </div>
                            <div className='--dir-column'>
                                <label htmlFor='password'>Password:</label>
                                <PasswordInput
                                    placeholder="password"
                                    name="password" 
                                    value={formData.password}
                                    onChange={handleInputChange}


                                />
                            </div>
                            <div className='--dir-column'>
                                <label htmlFor='password2'>Confirm password:</label>
                                <PasswordInput
                                    placeholder="password"
                                    name="password2"
                                    value={formData.password2}
                                    onChange={handleInputChange}
                                    onPaste={(e) => {e.preventDefault();
                                     toast.error("Cannot paste into the input field");
                                     return false}}
                                />
                            </div>

                            <div className='card'>
                                <ul className='form-list'>
                                    <li>
                                        <span className='indicator'>
                                            {switchIcon(uCase)} &nbsp; Lowercase & Uppercase
                                        </span>
                                    </li>

                                    <li>
                                        <span className='indicator'>
                                            {switchIcon(num)} &nbsp; Number(0-9)
                                        </span>
                                    </li>

                                    <li>
                                        <span className='indicator'>
                                            {switchIcon(sChar)} &nbsp; Special Character(!@#$%^&*)
                                        </span>
                                    </li>

                                    <li>
                                        <span className='indicator'>
                                            {switchIcon(passLength)} &nbsp; At least 6 Characters.
                                        </span>
                                    </li>
                                </ul>
                            </div>

                            <button className='--btn' disabled={isSubmitting}>
                            {isSubmitting ? "Signing you up..." : "Create account"}</button>
                        </form>

                        {formValidMessage && <p>
                            {formValidMessage}
                        </p>}
                        <p>
                            Already have an account? <Link to="/login">Login</Link> || {" "}
                        </p>
                    </div>
                </div>
            )}

        </>

    )
}

export default AdminReg
