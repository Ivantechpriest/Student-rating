import React, { useState } from 'react';
import axios from 'axios'

import { useNavigate } from 'react-router-dom';

const DeleteStudent = () =>{
    const navigate = useNavigate();
    const [fullname, setFullname] = useState('');

    function handleDelete(e){
        e.preventDefault()

        axios.delete(`http://127.0.0.1:5000/student/${fullname}`,
            {headers: {"Authorization" : `Bearer ${localStorage.getItem("token")}`}})
            .then(function (response) {
                console.log(response);
                alert("Student deleted successfully");
            })
            .catch(error => {
            alert(error);
            });
    }

    function back() {
        navigate("/main/teacher");
    }

    return(
        <div className="delete_student">
            <form>
                <h2>Delete Student</h2>
                <label htmlFor="login">Student`s Full Name</label>
                <input type="text" id="login" name="login" required
                value={fullname} onChange={(e) => setFullname(e.target.value)}/>
                 <div className="buttons">
                     <button type="button" className="cancel-button" onClick={back}>Back</button>
                    <button type="submit" className="ok-button" onClick={handleDelete}>OK</button>
                 </div>
            </form>
        </div>
    )
}

export default DeleteStudent;
