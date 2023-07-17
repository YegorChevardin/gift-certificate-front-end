import React, {useEffect, useState} from "react";

function Login() {
    const [formData, setFormData] = useState({
        username: "",
        password: ""
    });
    function handleChange(event) {
        const {name, value} = event.target;
        setFormData(prevState => (
            {
                ...prevState,
                [name]: value
            }
        ));
    }

    const [error, setError] = useState(null);

    const login = (event) => {
        event.preventDefault();

        let valid = validateForm();

        console.log(valid);
        if(valid) {
            console.log("Sending form with this data: ");
            console.log(formData);
        }
    }

    function validateForm() {
        setError(null);
        let appendMessage = "";
        let result = true;

        if (formData.username.length > 50 || formData.username.length < 2) {
            appendMessage += " Username should range between 2 and 50 characters. ";
            result = false;
        }

        if (formData.password.length > 50 || formData.password.length < 8) {
            appendMessage += "Password should range between 8 and 50 characters.";
            result = false;
        }

        setError(appendMessage);
        return result;
    }

    return (
        <>
            {error && (
                <div className="alert alert-danger d-flex align-items-center m-5" role="alert">
                    <strong>Be careful!</strong>{error}
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
                                           value={formData.username} onChange={handleChange} placeholder="name@example.com"/>
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