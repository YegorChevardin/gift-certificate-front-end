import React from "react";
import CheckAuth from "../../utils/CheckAuth";
import {Link} from "react-router-dom";

function Admin() {
    return (
        <>
            <CheckAuth/>
            <div id="admin-dashboard" className="py-5 my-5 container">
                <div className="d-flex justify-content-around align-items-center mb-3">
                    <h1>Admin Dashboard</h1>
                </div>
                <div className="row justify-content-center align-items-baseline">
                    <div className="col-lg-5 mb-2">
                        <div className="card border-1 rounded rounded-3 card-hover">
                            <div className="card-body">
                                <h3 className="card-title">Gift-certificates</h3>
                                <hr/>
                                <p className="card-text">
                                    <Link to="/admin/gift-certificates" className="btn btn-sm btn-primary w-100">Browse</Link>
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-5 mb-2">
                        <div className="card border-1 rounded rounded-3 card-hover">
                            <div className="card-body">
                                <h3 className="card-title">Tags</h3>
                                <hr/>
                                <p className="card-text">
                                    <Link to="/admin/tags" className="btn btn-sm btn-primary w-100">Browse</Link>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Admin;