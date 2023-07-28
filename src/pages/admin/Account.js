import React, {useEffect, useState} from "react";
import CheckAuth from "../../utils/CheckAuth";
import axios from "axios";

function Account() {
    const accountURL = process.env.REACT_APP_API_URL + "/auth";
    const [authToken] = useState(initToken());
    const [user, setUser] = useState(null);
    const [error, setError] = useState(null);

    function initToken() {
        const token = localStorage.getItem("authToken");
        if (checkAuthToken(token)) {
            return token;
        }
        return null;
    }

    function checkAuthToken(token) {
        return token !== null && token !== undefined && token !== "";
    }

    const fetchUserData = async () => {
        try {
            const response = await axios.get(accountURL, {
                headers: {
                    Authorization: authToken
                }
            });

            if (response.status === 200) {
                setUser(await response.data);
            } else {
                throw new Error();
            }
        } catch (error) {
            const message = error.response.data.message;

            if (message) {
                setError(message);
            } else {
                setError("Something went wrong, try again later.");
            }
        }
    };

    useEffect(() => {
        fetchUserData().then(() => {});
    }, []);

    return (
        <>
            <CheckAuth/>
            {error &&
                (
                    <div className="row justify-content-around align-content-center">
                        <div className="col-md-8 align-self-center text-center">
                            <h2>{error}</h2>
                        </div>
                    </div>
                )
            }
            {!error && !user &&
                (
                    <div className="row justify-content-around align-content-center">
                        <div className="col-md-8 align-self-center text-center">
                            <h2>Loading...</h2>
                        </div>
                    </div>
                )
            }
            {!error && user && (
                <div className="container py-5 my-5">
                    <div className="row justify-content-center align-items-center">
                        <div className="col-md-6">
                            <h2 className="text-center">{`Hi, ${user.username}!`}</h2>
                            <hr/>
                            <div className="d-flex justify-content-between align-items-baseline flex-wrap">
                                <p>Your roles:</p>
                                <div className="d-flex justify-content-end align-items-baseline flex-wrap gap-4">
                                    {user.roles.map((role, roleIndex) => (
                                        <p key={roleIndex}>{`${role.name}` }</p>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

export default Account;