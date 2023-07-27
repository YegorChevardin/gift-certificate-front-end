import React, {useEffect} from "react";
import {useNavigate} from "react-router-dom";

function Logout() {
    const navigate = useNavigate();

    useEffect(() => {
        const authToken = localStorage.getItem("authToken");

        if (authToken !== null && authToken !== undefined && authToken !== "") {
            localStorage.removeItem("authToken");
        } else {
            alert("You need to login to do this action");
        }
        navigate("/");
        window.location.reload();
    }, []);

    return (
        <div className="container py-5 my-5">
            <div className="row justify-content-center align-items-center">
                <div className="col-md-6">
                    <h2 className="text-center">Logging out...</h2>
                </div>
            </div>
        </div>
    );
}

export default Logout;