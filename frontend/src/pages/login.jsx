import { useState, useEffect } from "react";
import { FaSignInAlt } from "react-icons/fa";
import axios from "../api/axios";
import { useUserContext } from "../contexts/userContext";
import { useNavigate } from 'react-router-dom';

const LOGIN_URL = '/users/login';

const Login = () => {

    const { auth, setAuth } = useUserContext();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    const [isError, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);



    const { email, password } = formData

    useEffect(() => {
        setIsLoggedIn(auth ? true : false)
    }, [auth])

    const onChange = (e) => {
        setFormData(state => ({
            ...state,
            [e.target.name]: e.target.value,
        }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            setIsLoading(true);

            const response = await axios.post(LOGIN_URL, JSON.stringify({ email: email, password: password }),
                {
                    headers: { 'Content-Type': 'application/json' }
                });

            if (response.status === 200) {
                console.log("success");
            }

            const token = response?.data?.token;
            const name = response?.data?.name;
            const id = response?.data?.id;

            setAuth({
                id,
                token,
                name,
                email
            })

            localStorage.setItem("user", JSON.stringify({
                id,
                token,
                name,
                email
            }));

            setIsLoading(false);
            navigate('/', { replace: true });

        } catch (error) {
            setIsLoading(false)
            if (error.response?.status === 401) {
                setError("Invalid credentials");
            } else if (error.response?.status === 500) {
                setError("Internal server error");
            } else if (error.response?.status === 400) {
                setError("Incorrect Username or Password");
            } else {
                setError("Login failed");
            }
        }
    }

    return (
        <>
            <section className="heading">
                <h1>
                    <FaSignInAlt /> Login
                </h1>
                <p>Login and start setting goals</p>

                {isError && <p className="error" style={{
                    color: "red",
                    fontSize: "0.7rem",
                }}>{isError}</p>}

            </section>
            {isLoggedIn ? <p>You are already logged in as {auth.name}</p> : <section className="form">

                {isLoading ?
                    <div className="loadingSpinnerContainer">
                        <div className="loadingSpinner"></div>
                    </div>
                    :
                    <form onSubmit={handleSubmit}>
                        <div className="form-group" >

                            <input required type="text" className="form-control" id="email" name="email" value={email} placeholder="Enter your email " onChange={onChange} />
                            <input required type="password" className="form-control" id="password" name="password" value={password} placeholder="Enter your password" onChange={onChange} />
                        </div>
                        <div className="form-group">
                            <input type="submit" className="btn btn-block" />
                        </div>
                    </form>
                }

            </section>}
        </>
    );
}

export default Login;
