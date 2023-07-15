import React, {useEffect, useRef, useState} from "react";
import Masonry from 'masonry-layout';
import GiftCertificate from "./GiftCertificate";

function GiftCertificates() {
    const giftCertificatesApiUrl = process.env.REACT_APP_API_URL + "/gift-certificates";
    const [giftCertificates, setGiftCertificates] = useState([]);

    function fetchGiftCertificates() {
        fetch(giftCertificatesApiUrl)
            .then(response => response.json())
            .then(data => setGiftCertificates(data._embedded.giftCertificateList)).catch(() => {
            setGiftCertificates([]);
        });
    }

    const masonryRef = useRef(null);

    useEffect(() => {
        fetchGiftCertificates();

        if (masonryRef.current) {
            new Masonry(masonryRef.current, {});
        }
    }, []);

    return (
        <div id="gift-certificates">
            <div className="container my-5">
                {giftCertificates.length === 0 ?
                    (
                        <div className="row justify-content-around align-content-center">
                            <div className="col-md-8 align-self-center text-center">
                                <h2>No gift certificates are found yet(..</h2>
                            </div>
                        </div>
                    )
                :
                    (
                        <div className="row" ref={masonryRef}>
                            {
                                giftCertificates.map(giftCertificate => (
                                    <GiftCertificate key={giftCertificate.id} {...giftCertificate}/>
                                ))
                            }
                        </div>
                    )
                }
            </div>
        </div>
    );
}

export default GiftCertificates;