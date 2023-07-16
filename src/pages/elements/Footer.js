import React from "react";
import {Link} from "react-router-dom";

function Footer() {
    let currentYear = new Date().getFullYear();

    return (
        <div>
            <div id="footer-margins"></div>
            <div id="footer" className="fixed-bottom bg-light">
                <div className="container">
                    <footer className="mt-2">
                        <div className="d-flex flex-wrap justify-content-around align-items-baseline">
                            <ul className="nav justify-content-center">
                                <li className="nav-item">
                                    <Link to="/gift-certificates"
                                          className="nav-link px-2 text-body-secondary">
                                        Gifts
                                    </Link>
                                </li>
                                <li className="nav-item"><Link to="#"
                                                               className="nav-link px-2 text-body-secondary">Tags</Link>
                                </li>
                                <li className="nav-item"><Link to="#"
                                                               className="nav-link px-2 text-body-secondary">Account</Link>
                                </li>
                            </ul>
                            <p className="text-center text-body-secondary">&copy; <span>{currentYear}</span> Yehor
                                Chevardin</p>
                        </div>
                    </footer>
                </div>
            </div>
        </div>
    );
}

export default Footer;