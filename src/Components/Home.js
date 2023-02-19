import "./Home.css";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { isLogged } from "../actions";
import axios from "axios";
import CircularProgress from '@mui/material/CircularProgress';

const Home = () => {
    const [loginDetails, setLoginDetails] = useState();
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    const logged = useSelector((state) => state.login);
    const dispatch = useDispatch();

    //Fetch all the user login data
    const fetchData = async() => {
        try{
            setLoading(true);
            const data = await axios.get(
            "https://dailyworks-login-backend.onrender.com");
            setLoginDetails(data.data);
            setLoading(false);
        }catch(error){
            console.log(error);
        }
    }

    //Once logout clicked details are removed from store
    const handleClick = () => {
        dispatch(
            isLogged({
                type : "logout", 
                name : "",
                email: "",
                password: ""
            })
        );
        navigate('/');
    }

    useEffect(() => {
        //Initailly checked whether user loggedin if not redirected to login page
        if(!logged.logged)
            navigate('/');
        fetchData();
    }, []);


    return (
        <div className="home">
            <button
            onClick={handleClick}
            >Logout</button>
            <div style={{overflowX:"auto"}}>
                <table>
                    <thead>
                        <tr>
                            <th>S.No.</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Password</th>
                        </tr>
                    </thead>
                    {loading ? (
                    <div className="loading">
                        <CircularProgress /> Loading!..
                    </div>
                    ) : (
                    <tbody>
                        {loginDetails.map((user, index) => {
                            return (
                            <tr key={index}>
                                <td>{index + 1}</td>
                                <td>{user.name}</td>
                                <td>{user.email}</td>
                                <td>{user.password}</td>
                            </tr>
                        );
                        })}
                    </tbody>)}
                </table>
            </div>
        </div>
    )
}

export default Home;