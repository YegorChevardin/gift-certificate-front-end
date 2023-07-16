import {BrowserRouter, Route, Routes} from "react-router-dom";
import React from "react";
import Layout from "./pages/templates/Layout";
import GiftCertificates from "./pages/gift-certificates/GiftCertificates";
import Main from "./pages/Main";
import Error404 from "./pages/errors/Error404";
import GiftCertificateSingle from "./pages/gift-certificates/GiftCertificateSingle";

function App() {
  return (
    <div id="app">
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Layout />}>
                    <Route index element={<Main/>}/>
                    <Route path="gift-certificates" element={<GiftCertificates />}/>
                    <Route path="gift-certificates/:index" element={<GiftCertificateSingle />}/>
                    <Route path="*" element={<Error404/>}/>
                </Route>
            </Routes>
        </BrowserRouter>
    </div>
  );
}

export default App;
