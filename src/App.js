import {BrowserRouter, Route, Routes} from "react-router-dom";
import React from "react";
import Layout from "./pages/templates/Layout";
import GiftCertificates from "./pages/gift-certificates/GiftCertificates";
import Main from "./pages/Main";
import Error404 from "./pages/errors/Error404";
import GiftCertificateSingle from "./pages/gift-certificates/GiftCertificateSingle";
import Login from "./pages/admin/auth/Login";
import Admin from "./pages/admin/Admin";
import Logout from "./utils/Logout";
import Account from "./pages/admin/Account";
import AdminGiftCertificates from "./pages/admin/pages/AdminGiftCertificates";

function App() {
  return (
    <div id="app">
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Layout />}>
                    <Route index element={<Main/>}/>
                    <Route path="gift-certificates" element={<GiftCertificates />}/>
                    <Route path="gift-certificates/:index" element={<GiftCertificateSingle />}/>
                    <Route path="/admin" element={<Admin/>}/>
                    <Route path="/admin/gift-certificates" element={<AdminGiftCertificates/>}/>
                    <Route path="/account" element={<Account/>}/>
                    <Route path="/login" element={<Login/>}/>
                    <Route path="/logout" element={<Logout/>}/>
                    <Route path="*" element={<Error404/>}/>
                </Route>
            </Routes>
        </BrowserRouter>
    </div>
  );
}

export default App;
