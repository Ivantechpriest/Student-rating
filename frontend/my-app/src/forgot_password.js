import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const navigate = useNavigate();

  function back() {
        navigate("/login");
    }

  const handleSubmit = (e) => {
    e.preventDefault();

    axios.get(`http://127.0.0.1:5000/student/forgot_password/${email}`)
      .then(responce => {
        console.log(responce);
        alert("New password sent on your email");
      })
      .catch(error => console.error(error));
  };
  return(
      <div className="login">
                <h2>Get new password</h2>
                <form id="login-form">
                    <label htmlFor="email-input">Your email:</label>
                    <input type="text" id="email-input" name="email" placeholder="Enter email" required
                           value={email} onChange={(e) => setEmail(e.target.value)} />
                    <div className="buttons">
                     <button type="button" className="cancel-button" onClick={back}>Back</button>
                    <button type="submit" className="ok-button" onClick={handleSubmit}>OK</button>
                 </div>
                </form>
      </div>
  )
};


export default ForgotPassword;
