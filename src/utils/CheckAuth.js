import {useEffect, useState} from "react";
import {Navigate, useNavigate} from "react-router-dom";
import axios from "axios";
import React from "react";

function CheckAuth() {
    const navigate = useNavigate();
    const apiAuthPath = process.env.REACT_APP_API_URL + "/auth";

    const checkToken = async (authToken) => {
        try {
            const response = await axios.get(apiAuthPath, {
                headers: {
                    Authorization: authToken
                }
            });
            if (response.status !== 200) {
                throw new Error();
            }
        } catch (error) {
            console.log(error);
            let message = "Something went wrong, try to login again!";
            if (error.hasOwnProperty("response") && error.response.hasOwnProperty("data")) {
                message = error.response.data;
            }
            alert(message);
            localStorage.removeItem("authToken");
            navigate("/login");
        }
    };

    useEffect(() => {
        const authToken = localStorage.getItem("authToken");
        if (authToken !== null && authToken !== undefined && authToken !== "") {
            checkToken(authToken).then(() => {});
        }
    }, []);

    return (
        <>
        </>
    );
}

export default CheckAuth;