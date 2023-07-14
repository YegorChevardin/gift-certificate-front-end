import { Link } from 'react-router-dom';
import React from "react";

export default function Navbar() {
    return (
        <div id="navbar">
            <nav>
                <ul>
                    <li>
                        <Link to="/">Home</Link>
                    </li>
                    <li>
                        <Link to="/gift-certificates">Certificates</Link>
                    </li>
                </ul>
            </nav>
        </div>
    );
}