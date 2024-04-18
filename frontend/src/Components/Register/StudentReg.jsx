import React from 'react'

const StudentReg = () => {
    return (
        <div className='container form__ --100vh'>
            <div className='form-container'>
                <p className='title'>Student Reg Page</p>
                <form className='form'>
                    <div className='--dir-column'>
                        <label htmlFor='name'>Full name:</label>
                        <input
                            type="text"
                            name='name'
                            className='input'
                            placeholder='Enter your name'
                            required

                        />
                    </div>
                    <div className='--dir-column'>
                        <label htmlFor='age'>Age:</label>
                        <input
                            type="text"
                            name='age'
                            className='input'
                            placeholder='input your age'
                            required

                        />
                    </div>
                    <div className='--dir-column'>
                        <label htmlFor='roomNum'>Room Number:</label>
                        <input
                            type="number"
                            name='roomNum'
                            className='input'
                            placeholder='input room number'
                            required

                        />
                    </div>
                    <div className='--dir-column'>
                        <label htmlFor='email'>Contact Email:</label>
                        <input
                            type="email"
                            name='email'
                            className='input'
                            placeholder='example@gmail.com'
                            required

                        />
                    </div>

                    <div className='--dir-column'>
                        <label htmlFor='name'>Guardian&apos;s Name:</label>
                        <input
                            type="text"
                            name='name'
                            className='input'
                            placeholder='Enter your name'
                            required

                        />
                    </div>

                    <div className='--dir-column'>
                        <label htmlFor='email'>Guardian&apos;s Email:</label>
                        <input
                            type="email"
                            name='email'
                            className='input'
                            placeholder='example@gmail.com'
                            required

                        />
                    </div>

                    <button className='--btn'>Register</button>
                </form>

            </div>

        </div>
    )
}

export default StudentReg
