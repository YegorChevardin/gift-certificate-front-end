import React from "react";
import {Link} from "react-router-dom";

function Error403() {
    return (
        <div id="403-error" className="d-flex align-items-center justify-content-center py-5 my-5">
            <div className="text-center">
                <h1 className="display-1 fw-bold">403</h1>
                <p className="fs-3">Access denied.</p>
                <p className="lead">
                    Access for this page is denied for your account, please contact administrator if something went
                    wrong.
                </p>
                <Link to="/" className="btn btn-primary">Home page</Link>
            </div>
        </div>
    );
}

export default Error403;