import React, { useEffect, useState } from 'react';
import axios from 'axios'

import "./style_main.css";
import { useNavigate } from 'react-router-dom';


function handleLogout(){
        localStorage.clear();
    }


const Main = () =>{
    const [result, setResult] = useState([]);
    const [score, setScore] = useState('');
    const [rating, setRating] = useState('');


    useEffect(() => {
    axios.get('http://127.0.0.1:5000/students/findall',
            {headers: {"Authorization" : `Bearer ${localStorage.getItem("token")}`}})
      .then(responce => setResult(responce.data.students))
      .catch(error => console.error(error));
    }, []);

    function handleFilter(e){
        e.preventDefault();

        if (score){
            axios.get(`http://127.0.0.1:5000/students/findByScore/${score}`,
            {headers: {"Authorization" : `Bearer ${localStorage.getItem("token")}`}})
      .then(responce => setResult(responce.data.students))
      .catch(error => console.error(error));
        }else {
            axios.get(`http://127.0.0.1:5000/students/findByRating/${rating}`,
            {headers: {"Authorization" : `Bearer ${localStorage.getItem("token")}`}})
      .then(responce => setResult(responce.data.students))
      .catch(error => console.error(error));
        }

    }


    return(
        <>
            <div className="main_page">
            <main className="main_page">
                <section>
                    <h2>Filter Students</h2>
                    <form className="main">
                        <label className="main" htmlFor="best-score">Score:</label>
                        <input type="number" id="best-score" name="best-score"
                               placeholder="Min score" required
                           value={score} onChange={(e) => setScore(e.target.value)}/>
                        <label className="main" htmlFor="best-rated">Rating:</label>
                        <input type="number" id="best-rated" name="best-rated"
                                   placeholder="Max rating" required
                           value={rating} onChange={(e) => setRating(e.target.value)}/>
                        <button type="submit" id="filter-btn" onClick={handleFilter}>Filter</button>
                    </form>
                </section>
                <section>
                    <table id="students-table">
                        <thead>
                        <tr>
                            <th>Full Name</th>
                            <th>Birth Date</th>
                            <th>Group</th>
                            <th>Rating</th>
                            <th>Score</th>
                        </tr>
                        </thead>
                        <tbody>
                        {result?.map((student) => {
                            return(<tr key={student.full_name}>
                                <td>{student.full_name}</td>
                                <td>{student.birth_date}</td>
                                <td>{student.group}</td>
                                <td>{student.rating}</td>
                                <td>{student.score}</td>
                            </tr>)
                        })}
                        </tbody>
                    </table>
                </section>
            </main>
            </div>
            <footer>
                <div className="container">
                    <p>Contact information:</p>
                    <ul>
                        <li><a href="mailto:contact@example.com">contact@example.com</a></li>
                        <li><a href="tel:+1234567890">+1234567890</a></li>
                        <li><a href="#">123 Example St, City, State Zip</a></li>
                    </ul>
                </div>
            </footer>
        </>
    );
}

const Student = () =>{
    const navigate = useNavigate();


    return(
        <header>
                <h1>Student Rating</h1>
                <nav>
                    <ul>
                        {/*<li><a href="#">My Profile</a></li>*/}
                        {/*<li><a href="#">Edit Profile</a></li>*/}
                        <li><a href="http://localhost:3000/login" onClick={handleLogout}>Log Out</a></li>
                    </ul>
                </nav>
            </header>
    )
}

const Teacher = () =>{
    return(
      <header>
        <h1>Student Rating</h1>
        <nav>
          <ul>
            <li><a href="http://localhost:3000/main/addstudent">Add Student</a></li>
            {/*<li><a href="http://localhost:3000/main/deletestudent">Delete Student</a></li>*/}
            <li><a href="http://localhost:3000/main/editstudent">Edit Student`s Profile</a></li>
            {/*<li><a href="#">My profile</a></li>*/}
            <li><a href="http://localhost:3000/login" onClick={handleLogout}>Log Out</a></li>
          </ul>
        </nav>
      </header>
    )
}

export default Main;
export {Student, Teacher};
