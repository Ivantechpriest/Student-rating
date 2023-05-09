import React, { useState } from 'react';
import axios from 'axios'

import { useNavigate } from 'react-router-dom';

const Editstudent = () => {
    const navigate = useNavigate();

    const [fullname, setFullname] = useState('');
    const [birthdate, setBirthdate] = useState('');
    const [group, setGroup] = useState('');
    const [rating, setRating] = useState('');
    const [score, setScore] = useState('');


    function editstudent(e){
        e.preventDefault();

        const student = {
            full_name: fullname,
            birth_date: birthdate,
            group: group,
            rating: rating,
            score: score
        }

        axios.put('http://127.0.0.1:5000/student', student,
            {headers: {"Authorization" : `Bearer ${localStorage.getItem("token")}`}})
            .then(function (response) {
                console.log(response);
                alert("Student edited successfully");
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
                <h2>Edit Student</h2>
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
                    <button type="submit" className="ok-button" onClick={editstudent}>OK</button>
                </div>
            </form>
        </div>
    )
}

export default Editstudent;
