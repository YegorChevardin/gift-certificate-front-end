import React from "react";
import Navbar from "../elements/Navbar";
import {Outlet} from "react-router-dom";
import Footer from "../elements/Footer";

function Layout() {
    return (
        <div id="layout">
            <Navbar/>
            <div id="content" className="mt-5 mb-5 pt-1 pb-1">
                <Outlet />
            </div>
            <Footer/>
        </div>
    );
}

export default Layout;