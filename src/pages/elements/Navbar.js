import { Link } from 'react-router-dom';
import React from "react";

export default function Navbar() {
    return (
        <div id="navbar">
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark shadow-sm fixed-top">
                <div className="container">
                    <a className="navbar-brand" href="#">Gift Shop</a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse"
                            data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
                            aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <Link className="nav-link" to="/">Home</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/gift-certificates">Certificates</Link>
                            </li>
                            <li className="nav-item dropdown">
                                <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown"
                                   aria-expanded="false">
                                    Account
                                </a>
                                <ul className="dropdown-menu rounded rounded-4">
                                    <li><Link className="dropdown-item" to="/register">Register</Link></li>
                                    <li><Link className="dropdown-item" to="/login">Login</Link></li>
                                    <li>
                                        <hr className="dropdown-divider"/>
                                    </li>
                                    <li><Link className="dropdown-item" to="/logout">Logout</Link></li>
                                </ul>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </div>
    );
}