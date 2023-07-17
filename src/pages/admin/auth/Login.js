import React, {useEffect, useState} from "react";
import {Link, useNavigate} from 'react-router-dom';
import axios from "axios";

function Login() {
    const navigate = useNavigate();
    const apiLoginPath = process.env.REACT_APP_API_URL + "/auth/login";
    const [loginServerData, setLoginServerData] = useState(null);
    const [token, setToken] = useState(null);
    const [formData, setFormData] = useState({
        username: "",
        password: ""
    });
    const [error, setError] = useState(null);
    const [successLogin, setSuccessLogin] = useState(false);

    function handleChange(event) {
        const {name, value} = event.target;
        setFormData(prevState => (
            {
                ...prevState,
                [name]: value
            }
        ));
    }

    const login = (event) => {
        event.preventDefault();
        let valid = validateForm();
        if (valid) {
            sendForm().then(() => {
                if (loginServerData) {
                    fetchToken();
                }
            });
        }
    }

    const sendForm = async () => {
        try {
            const response = await axios.post(apiLoginPath, formData);
            if (response.status === 200) {
                const serverData = await response.data;
                setLoginServerData(serverData);
            } else if (response.status === 400) {
                setError("Incorrect password or username.");
            } else {
                throw new Error();
            }
        } catch (error) {
            console.log(error);
            const message = error.response.data.message;
            console.log(message);

            if (message) {
                setError(message);
            } else {
                setError("Something went wrong, try again later.");
            }
        }
    };

    function fetchToken() {
        const isAdmin = loginServerData.user.roles.some(role => role.name === "admin");

        if (isAdmin) {
            const bearerToken = "Bearer " + loginServerData.jwtToken;
            setToken(bearerToken);
        } else {
            setError("You need to be an admin for this action.");
        }
    }

    function validateForm() {
        let appendMessage = "";
        let result = true;

        if (formData.username.length > 50 || formData.username.length < 2) {
            appendMessage += "Username should range between 2 and 50 characters. ";
            result = false;
        }

        if (formData.password.length > 50 || formData.password.length < 8) {
            appendMessage += "Password should range between 8 and 50 characters.";
            result = false;
        }

        setError(appendMessage);
        return result;
    }

    useEffect(() => {
        if (token !== null && token !== undefined) {
            localStorage.setItem("authToken", token);
            setSuccessLogin(true);
            navigate("/admin");
        }
    }, [token]);

    useEffect(() => {
        const token = localStorage.getItem("authToken");

        if (token !== undefined && token !== null) {
            setSuccessLogin(true);
        }
    }, []);

    return (
        <>
            {successLogin && (
                <div className="alert alert-success m-5" role="alert">
                    <p>
                        Your last log in was successful, click the button to go to dashboard or login again to
                        use another account.
                    </p>
                    <Link to="/admin" className="btn btn-outline-success btn-sm">Dashboard</Link>
                </div>
            )}
            {error && (
                <div className="alert alert-danger d-flex align-items-center m-5" role="alert">
                    {error}
                </div>
            )}
            <div id="login" className="container py-5 my-5">
                <div className="row justify-content-center align-items-center">
                    <div className="col-md-5">
                        <div className="form-signin w-100 m-auto">
                            <form className="d-flex flex-column gap-2">
                                <h1 className="h3 mb-3 fw-normal">Please sign in</h1>

                                <div className="form-floating">
                                    <input type="text" name="username" className="form-control" id="floatingInput"
                                           value={formData.username} onChange={handleChange}
                                           placeholder="name@example.com"/>
                                    <label htmlFor="floatingInput">Username</label>
                                </div>
                                <div className="form-floating">
                                    <input type="password" name="password" className="form-control"
                                           value={formData.password} onChange={handleChange}
                                           id="floatingPassword" placeholder="Password"/>
                                    <label htmlFor="floatingPassword">Password</label>
                                </div>

                                <button className="btn btn-primary w-100 py-2" type="submit" onClick={login}>Sign in
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Login;