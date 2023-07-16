import { Link } from 'react-router-dom';
import React from "react";

export default function Navbar() {
    return (
        <div id="navbar">
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark shadow-sm fixed-top">
                <div className="container">
                    <Link className="navbar-brand" to="/">Gift Shop</Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse"
                            data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
                            aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                            <li className="nav-item me-3">
                                <Link className="nav-link" to="/gift-certificates">
                                    Gifts<i className="bi bi-gift-fill ms-1"></i>
                                </Link>
                            </li>
                            <li className="nav-item dropdown me-3">
                                <Link className="nav-link dropdown-toggle" to="#" role="button" data-bs-toggle="dropdown"
                                   aria-expanded="false">
                                    Account<i className="bi bi-person-fill ms-1"></i>
                                </Link>
                                <ul className="dropdown-menu rounded rounded-4">
                                    <li><Link className="dropdown-item" to="/account">Account</Link></li>
                                    <li><Link className="dropdown-item" to="/login">Login</Link></li>
                                    <li><Link className="dropdown-item" to="/logout">Logout</Link></li>
                                    <li>
                                        <hr className="dropdown-divider"/>
                                    </li>
                                    <li><Link className="dropdown-item" to="/users">Tags</Link></li>
                                    <li><Link className="dropdown-item" to="/users">Users</Link></li>
                                    <li><Link className="dropdown-item" to="/roles">Roles</Link></li>
                                </ul>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </div>
    );
}