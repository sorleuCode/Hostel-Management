import React, { useState } from 'react'
import "./Attendance.css";
import { lady } from "../../assets";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { LuChevronLeft, LuChevronRight } from 'react-icons/lu';
import { MdApps } from 'react-icons/md';

const Attendance = () => {
    const initialDate = new Date()

    const [year, setYear] = useState(initialDate.getFullYear())
    const [month, setMonth] = useState(initialDate.getMonth() + 1);

    const monthNames = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December"
    ];

    const createCalendar = () => {


        const firstDay = new Date(year, month - 1, 1).getDay()

        const numDays = new Date(year, month, 0).getDate();

        let days = [];

        for (let i = 0; i < firstDay; i++) {
            days.push(" ")
        }

        for (let day = 1; day <= numDays; day++) {
            days.push(day);
        };

        const daysOfWeek = [
            "Sun", "Mon", "Tue", "Wed", "Thur", "Fri", "Sat"
        ];
        // split the number of days into weeks


        let weeks = [];
        let week = [];


        days.forEach((day, index) => {
            week.push(day)

            if ((index + 1) % 7 === 0 || index === days.length - 1) {
                weeks.push(week);
                week = [];
            }
        })
        return (
            <div>
                <h2>{monthNames[month - 1]} {year}</h2>

                <div className='days-of-week'>
                    {daysOfWeek.map(day => (
                        <div key={day}>{day}</div>
                    ))}
                </div>

                {weeks.map((week, index) => (
                    <div key={index} className='week'>
                        {week.map((day, index) => (
                            <div key={index} className={`day ${day === "" ? "empty" : ""} ${isToday(year, month, day) ? "today" : ""}`}>
                                {day}
                            </div>
                        ))}
                    </div>
                ))}
            </div>
        )
    }

    const isToday = (checkYear, checkMonth, checkDay) => {
        const today = new Date();

        return (
            checkYear === today.getFullYear() &&
            checkMonth === today.getMonth() + 1 &&
            checkDay === today.getDate()
        )
    };

    const [activeIndex, setActiveIndex] = useState(-1);

    const handleToggleClick = (index) => {
        setActiveIndex(index === activeIndex) ? -1 : index
    }

    const studentData = [
        {
            name: "Aliyu Abdullahi",
            buttonText: "Go there",
            image: lady

        },
        {
            name: "Kenny Soliu",
            buttonText: "Assuming you are fine than this",
            image: lady

        },
        {
            name: "Zainabuuu MM",
            buttonText: "Software Dev.",
            image: lady

        }
    ];


    const handlePrevMonthClick = () => {
        if (month === 1) {
            setMonth(12)
            setYear(year - 1)
        } else (
            setMonth(month - 1)
        )
    }
    const handleNexMonthClick = () => {
        if (month === 12) {
            setMonth(1)
            setYear(year + 1)
        } else (
            setMonth(month + 1)
        )
    }
    const handlePrevYearClick = () => {
        setYear(year - 1)
    }
    const handleNextYearClick = () => {
        setYear(year + 1)
    }


    return (
        <div className="attCon">
            <div>
                <h2 className='dailyText'>Daily Attendance</h2>
                <p className='selectDay'>Select Day</p>
            </div>

            <div className='calendar'>
                <div className='controls'>
                    <button className='yearButton' onClick={handlePrevYearClick}>
                        <LuChevronLeft />
                    </button>
                    <button className='monthButton' onClick={handlePrevMonthClick}>
                        <FaChevronLeft />
                    </button>
                    {createCalendar()}
                    <button className='monthButton' onClick={handleNexMonthClick}>
                        <FaChevronRight />
                    </button>
                    <button className='yearButton' onClick={handleNextYearClick}>
                        <LuChevronRight />
                    </button>
                </div>

            </div>


            <div className='peopleDetail'>
                <h2 className='markText'>Mark Attendance</h2>
                {studentData.map((person, i) => (
                    <div className='peopleMov' key={i}>
                        <div>
                            <div className='image_st'>
                                <img src={person.image} alt={person.name} />
                            </div>
                            <div className='titleBox'>
                                <h3 className='titleText'>
                                    {person.name}
                                </h3>

                                <p className='titlePara'>
                                    {person.buttonText}
                                </p>
                            </div>
                        </div>

                        <div
                        className={`toggleSwitch ${activeIndex === i ? "active" : ""}`}

                        onClick={() => handleToggleClick(i)}
                        >
                        </div>

                    </div>
                ))}

                <div className='attendanceLas'>
                    <button className='attendancebtn'>Submit</button>
                </div>

            </div>
        </div>
    )



}


export default Attendance
