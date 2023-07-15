import React from "react";
import {Link} from "react-router-dom";

function Footer() {
    let currentYear = new Date().getFullYear();

    return (
        <div id="footer" className="fixed-bottom bg-light">
            <div className="container">
                <footer className="py-3 my-4">
                    <ul className="nav justify-content-center border-bottom pb-3 mb-3">
                        <li className="nav-item"><a href="#" className="nav-link px-2 text-body-secondary">Account</a>
                        </li>
                        <li className="nav-item"><a href="#" className="nav-link px-2 text-body-secondary">Orders</a>
                        </li>
                        <li className="nav-item">
                            <Link to="/gift-certificates"
                                  className="nav-link px-2 text-body-secondary">
                                Gift Certificates
                            </Link>
                        </li>
                        <li className="nav-item"><a href="#" className="nav-link px-2 text-body-secondary">Tags</a></li>
                    </ul>
                    <p className="text-center text-body-secondary">&copy; <span>{currentYear}</span> Yehor Chevardin</p>
                </footer>
            </div>
        </div>
    );
}

export default Footer;