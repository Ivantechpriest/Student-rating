import React, { useState } from 'react';
import axios from 'axios'

import { useNavigate } from 'react-router-dom';

const ChangePassword = () =>{
    const navigate = useNavigate();
    const [password, setPassword] = useState('');

    function handlePassword(e){
        e.preventDefault()

        const student = {
            iduser: localStorage.getItem("userid"),
            password: password
        }

        axios.put(`http://127.0.0.1:5000/student/change_password`, student,
            {headers: {"Authorization" : `Bearer ${localStorage.getItem("token")}`}})
            .then(function (response) {
                console.log(response);
                alert("Password changed successfully");
            })
            .catch(error => {
            alert(error);
            });
    }

    function back() {
        if (localStorage.getItem("role") === "Teacher"){
            navigate("/main/teacher");
        }else{
            navigate("/main");
        }
    }

    return(
        <div className="delete_student">
            <form>
                <h2>Change Password</h2>
                <label htmlFor="login">Enter new password:</label>
                <input type="text" id="login" name="login" required
                value={password} onChange={(e) => setPassword(e.target.value)}/>
                 <div className="buttons">
                     <button type="button" className="cancel-button" onClick={back}>Back</button>
                    <button type="submit" className="ok-button" onClick={handlePassword}>OK</button>
                 </div>
            </form>
        </div>
    )
}

export default ChangePassword;
