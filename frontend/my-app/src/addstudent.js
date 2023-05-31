import React, { useState } from 'react';
import axios from 'axios'

import { useNavigate } from 'react-router-dom';

const Addstudent = () => {
    const navigate = useNavigate();

    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');
    const [confirm, setConfirm] = useState('');
    const [fullname, setFullname] = useState('');
    const [birthdate, setBirthdate] = useState('');
    const [group, setGroup] = useState('');
    const [rating, setRating] = useState('');
    const [score, setScore] = useState('');


    function addstudent(e){
        e.preventDefault();

        const student = {
            login: login,
            password: password,
            full_name: fullname,
            birth_date: birthdate,
            group: group,
            rating: rating,
            score: score
        }

        axios.post('http://127.0.0.1:5000/student', student,
            {headers: {"Authorization" : `Bearer ${localStorage.getItem("token")}`}})
            .then(function (response) {
                console.log(response);
                alert("Student created successfully");
            })
            .catch(error => {
            alert('Please try again.');
            });
    }


    function back() {
        navigate("/main/teacher");
    }

    return(
        <div className="add_student">
            <form>
                <h2>Add Student</h2>
                <label htmlFor="login">Login</label>
                <input type="text" id="login" name="login" required
                       value={login} onChange={(e) => setLogin(e.target.value)}/>
                <label htmlFor="password">Password</label>
                <input type="password" id="password" name="password" required
                       value={password} onChange={(e) => setPassword(e.target.value)}/>
                {/*<label htmlFor="confirm-password">Confirm Password</label>*/}
                {/*<input type="password" id="confirm-password" name="confirm-password" required*/}
                {/*value={confirm} onChange={(e) => setConfirm(e.target.value)}/>*/}
                <label htmlFor="full-name">Full Name</label>
                <input type="text" id="full-name" name="full-name" required
                value={fullname} onChange={(e) => setFullname(e.target.value)}/>
                <label htmlFor="birth-date">Birth Date</label>
                <input type="date" id="birth-date" name="birth-date" required
                value={birthdate} onChange={(e) => setBirthdate(e.target.value)}/>
                <label htmlFor="group">Group</label>
                <input type="text" id="group" name="group" required
                value={group} onChange={(e) => setGroup(e.target.value)}/>
                <label htmlFor="score">Score</label>
                <input type="number" id="score" name="score" min="0" max="100" required
                value={score} onChange={(e) => setScore(e.target.value)}/>
                <label htmlFor="rating">Rating</label>
                <input type="number" id="rating" name="rating" min="0" required
                value={rating} onChange={(e) => setRating(e.target.value)}/>
                <div className="buttons">
                    <button type="button" className="cancel-button" onClick={back}>Back</button>
                    <button type="submit" className="ok-button" onClick={addstudent}>OK</button>
                </div>
            </form>
        </div>
    )
}

export default Addstudent;
