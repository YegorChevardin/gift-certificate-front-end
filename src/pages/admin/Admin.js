import React from "react";
import CheckAuth from "../../utils/CheckAuth";

function Admin() {


    return (
        <>
            <CheckAuth/>
            <div id="admin-dashboard" className="py-5 my-5 container">
                <div className="row justify-content-center align-items-center">
                    <div className="col-md-6">
                        <h3 className="text-center">Admin!</h3>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Admin;