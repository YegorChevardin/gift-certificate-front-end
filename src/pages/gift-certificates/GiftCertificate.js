import React from "react";
import {useParams} from "react-router-dom";

function GiftCertificate() {
    const { index } = useParams();

    return (
        <div id="gift-certificate">
            GiftCertificate : <span>{index}</span>
        </div>
    );
}

export default GiftCertificate