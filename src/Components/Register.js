import "./Register.css";
import Divider from '@mui/material/Divider';
import { Link } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import { useSnackbar } from "notistack";
import CircularProgress from '@mui/material/CircularProgress';
import { useDispatch } from "react-redux";
import {isLogged } from "../actions";

const Register = () => {
    const { enqueueSnackbar } = useSnackbar();//snackbar a notification like an alert
    const navigate = useNavigate();//to navigate between pages
    const [payload, setPayload] = useState({
        name: "",
        email: "",
        password: ""
    })
    const [loading, setLoading] = useState(false);

    const dispatch = useDispatch();
    
    //handler function to handle changes in the form input
    const handleChange = (event) => {
        const newObj = {};
        Object.assign(newObj, payload);
        const value = event.target.value;
        const elementName = event.target.name;
        if(elementName === "name")
            newObj.name = value;
        else if(elementName === "email")
            newObj.email = value;
        else
            newObj.password = value;
        setPayload(newObj);
    }

    //handler function to register user
    const handleRegister = async() => {
        //Initially check whether the user has entered all inputs
        if(payload.name.length === 0){
            enqueueSnackbar("Enter your name", { variant: "warning" });
            return;
        }else if(payload.email.length === 0){
            enqueueSnackbar("Enter your email", { variant: "warning" });
            return;
        }else if(payload.password.length === 0){
            enqueueSnackbar("Enter password", { variant: "warning" });
            return;
        }
        try{
            setLoading(true);
            await axios.post(
                "https://dailyworks-login-backend.onrender.com/register", 
                payload
            );
            dispatch(
                isLogged({
                    type : "log", 
                    name : payload.name, 
                    email: payload.email, 
                    password: payload.password
                })
            );
            setLoading(false);
            navigate('/');
        }catch(error){
            console.log(error);
        }
    }

    return (
        <div className="register">
            <div className="register-container">
                <div className="form">
                    <h2>Register</h2>
                    <Divider></Divider>
                    <br />
                    <label htmlFor="name">Name</label>
                    <input 
                    onChange={handleChange}
                    type="text" 
                    id="name" 
                    name="name" 
                    placeholder="Enter your name"/>
                    <label htmlFor="email">Email</label>
                    <input 
                    onChange={handleChange}
                    type="text" 
                    id="email" 
                    name="email" 
                    placeholder="Enter your email"/>
                    <label htmlFor="password">Password</label>
                    <input 
                    onChange={handleChange}
                    type="password" 
                    id="password" 
                    name="password" 
                    placeholder="Enter your password"/>
                    {loading ?(
                    <div 
                    style={{display: "flex", justifyContent: "center"}}
                    >
                        <CircularProgress />
                    </div>
                    ) : (
                    <button onClick={handleRegister}>
                        Register
                    </button>)}
                    <div>Already have an account? 
                        <Link 
                        to="/" 
                        style={{color : "#17738f", 
                        textDecoration : "none",
                        fontWeight: "bold"}}>
                            Login
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Register;
