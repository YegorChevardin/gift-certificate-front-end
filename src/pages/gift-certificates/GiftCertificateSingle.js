import {useParams} from "react-router-dom";
import React, {useEffect, useState} from 'react';
import Tag from "./tags/Tag";
import axios from "axios";

function GiftCertificateSingle() {
    const {index} = useParams();
    const giftCertificateApiUrl = process.env.REACT_APP_API_URL + "/gift-certificates/" + index;
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchGiftCertificate = async () => {
            try {
                const response = await axios.get(giftCertificateApiUrl);
                if (response.status === 200) {
                    const giftCertificateData = response.data;
                    setData(giftCertificateData);
                } else {
                    setError('This gift certificate does not exist.');
                }
            } catch (error) {
                setError('Something went wrong, try again later.');
            }
        };

        fetchGiftCertificate().then(() => {});
    }, [index]);

    return (
        <div id="gift-certificate-sigle">
            <div className="container py-5">
                <div className="row justify-content-center align-items-center">
                    <div className="col-md-8 text-center">
                        {error && (<h2 className="text-center">{error}</h2>)}
                        {!data && !error && (<h2 className="text-center">Loading...</h2>)}
                        {data &&
                            (
                                <div className="card rounded rounded-4">
                                    <div className="card-body">
                                        <div className="d-flex flex-column justify-content-center align-items-start">
                                            <p className="card-text">
                                                {data.description}
                                            </p>
                                            <h4 className="card-title">
                                                {data.name}
                                            </h4>
                                        </div>
                                        <div className="card-text">
                                            <div className="d-flex justify-content-between align-items-center">
                                                <p className="p-0 m-0">
                                                    Price:
                                                    <small className="text-primary">{data.price}</small>
                                                </p>
                                                <p className="p-0 m-0">
                                                    Duration:
                                                    <span className="text-primary">{data.duration}</span>
                                                </p>
                                            </div>
                                            <small className="text-body-secondary">Last updated:
                                                <strong>{data.lastUpdateDate}</strong>
                                            </small>
                                            <br/>
                                            <small className="text-body-secondary">Last created:
                                                <strong>{data.createDate}</strong></small>
                                        </div>
                                        <div className="card-text mt-2 mb-2">
                                            <div className="d-flex flex-wrap">
                                                {data.tags.map(
                                                    tag => (
                                                        <Tag key={tag.id} {...tag}/>
                                                    )
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )
                        }
                    </div>
                </div>
            </div>
        </div>
    );
}

export default GiftCertificateSingle;