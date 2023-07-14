import React from "react";
import Navbar from "../elements/Navbar";
import {Outlet} from "react-router-dom";
import Footer from "../elements/Footer";

function Layout() {
    return (
        <div id="layout">
            <Navbar/>
            <Outlet/>
            <Footer/>
        </div>
    );
}

export default Layout;