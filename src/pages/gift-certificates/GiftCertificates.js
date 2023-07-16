import React, {useEffect, useRef, useState} from "react";
import Masonry from 'masonry-layout';
import GiftCertificate from "./GiftCertificate";

function GiftCertificates() {
    const giftCertificatesApiUrl = process.env.REACT_APP_API_URL + "/gift-certificates";
    const [giftCertificates, setGiftCertificates] = useState(null);
    const [error, setError] = useState(null);

    const masonryRef = useRef(null);

    useEffect(() => {
        const fetchGiftCertificates = async () => {
            try {
                const response = await fetch(giftCertificatesApiUrl);
                if (response.ok) {
                    const giftCertificatesData = await response.json();
                    setGiftCertificates(giftCertificatesData._embedded.giftCertificateList);
                } else {
                    throw new Error();
                }
            } catch (error) {
                setError("Something went wrong, try again later");
            }
        };

        fetchGiftCertificates().then(() => {});

        if (masonryRef.current) {
            new Masonry(masonryRef.current, {});
        }
    }, []);

    return (
        <div id="gift-certificates">
            <div className="container my-5">
                {error &&
                    (
                        <div className="row justify-content-around align-content-center">
                            <div className="col-md-8 align-self-center text-center">
                                <h2>{error}</h2>
                            </div>
                        </div>
                    )
                }
                {!error && !giftCertificates &&
                    (
                        <div className="row justify-content-around align-content-center">
                            <div className="col-md-8 align-self-center text-center">
                                <h2>Loading...</h2>
                            </div>
                        </div>
                    )
                }
                {(!error && giftCertificates !== null && giftCertificates.length === 0) &&
                    (
                        <div className="row justify-content-around align-content-center">
                            <div className="col-md-8 align-self-center text-center">
                                <h2>No gift certificates are found yet(..</h2>
                            </div>
                        </div>
                    )
                }
                {(!error && giftCertificates !== null && giftCertificates.length > 0) && (
                        <div className="row" ref={masonryRef}>
                            {
                                giftCertificates.map(giftCertificate => (
                                    <div key={giftCertificate.id} className="col-sm-6 col-lg-4 mb-4">
                                        <GiftCertificate {...giftCertificate}/>
                                    </div>
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