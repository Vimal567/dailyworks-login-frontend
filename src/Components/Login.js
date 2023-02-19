import "./Login.css";
import { useState } from "react";
import Divider from '@mui/material/Divider';
import CircularProgress from '@mui/material/CircularProgress';
import { Link } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import { useSnackbar } from "notistack";
import { useSelector} from "react-redux";

const Login = () => {
    const { enqueueSnackbar } = useSnackbar();
    const navigate = useNavigate();
    const [payload, setPayload] = useState({
        email: "",
        password: ""
    })
    const [loading, setLoading] = useState(false);

    const logged = useSelector((state) => state.login);
    
    //handler function to handle changes in the form input
    const handleChange = (event) => {
        const newObj = {};
        Object.assign(newObj, payload);
        const value = event.target.value;
        const elementName = event.target.name;
        if(elementName === "email")
            newObj.email = value;
        if(elementName === "password")
            newObj.password = value;
        setPayload(newObj);
    }

    //handler function to login user
    const handleLogin = () => {
        if(payload.email.length === 0){
            enqueueSnackbar("Enter your email", { variant: "warning" });
            return;
        }else if(payload.password.length === 0){
            enqueueSnackbar("Enter password", { variant: "warning" });
            return;
        }
        setLoading(true);
        //Authentication against redux store
        if(logged.email === payload.email && logged.password === payload.password)
            navigate('/home');
        else
            enqueueSnackbar("Enter correct email and password", { variant: "warning" });
        setLoading(false);
    }

    return (
        <div className="login">
            <div className="login-container">
                <div className="form">
                    <h2>Login</h2>
                    <Divider></Divider>
                    <br />
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
                    <button onClick={handleLogin}>
                        Login
                    </button>)}
                    <div>Don't have an account? 
                        <Link 
                        to="/register" 
                        style={{color : "#17738f", 
                        textDecoration : "none",
                        fontWeight: "bold"}}>
                            Sign up
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login;
