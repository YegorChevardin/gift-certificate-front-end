import {useParams} from "react-router-dom";
import React from 'react';

function GiftCertificateSingle() {
    const {index} = useParams();

    return (
        <div id="gift-certificate-single">
            GiftCertificatesSingle
        </div>
    );
}

export default GiftCertificateSingle;