import React from 'react';
import {Navigate, Routes, Route} from 'react-router-dom';


import Login from './login';
import Main, { Student, Teacher } from './main';
import Addstudent from './addstudent';
import DeleteStudent from './deletestudent';
import Editstudent from './editstudent';
import ForgotPassword from './forgot_password'
import ChangePassword from './change_password';

const App = () =>{
    return(
        <div>
            <Routes>
                <Route path="" element={<Login/>}/>
                <Route path="/login" element={<Login/>}/>
                <Route path="/main" element={
                    <>
                        <Student/>
                        <Main/>
                    </>}/>
                <Route path="/main/teacher" element={
                    <>
                        <Teacher/>
                        <Main/>
                    </>}/>
                <Route path="main/addstudent" element={<Addstudent/>}/>
                <Route path="main/deletestudent" element={<DeleteStudent/>}/>
                <Route path="main/editstudent" element={<Editstudent/>}/>
                <Route path="forgot_password" element={<ForgotPassword/>}/>
                <Route path="change_password" element={<ChangePassword/>}/>
            </Routes>
        </div>
    );
}

export default App;
