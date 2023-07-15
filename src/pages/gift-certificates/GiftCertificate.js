import React from "react";

function GiftCertificate(props) {
    return (
        <div className="col-sm-6 col-lg-4 mb-4">
            <div className="card">
                <div className="card-body">
                    <div className="d-flex flex-column justify-content-center align-items-start">
                        <p className="card-text">
                            {props.description}
                        </p>
                        <h4 className="card-title">
                            {props.name}
                        </h4>
                    </div>
                    <div className="card-text">
                        <div className="d-flex justify-content-between align-items-center">
                            <p className="p-0 m-0">
                                Price:
                                <small className="text-primary">{props.price}</small>
                            </p>
                            <p className="p-0 m-0">
                                Duration:
                                <span className="text-primary">
                                    {props.duration}
                                </span>
                            </p>
                        </div>
                        <small className="text-body-secondary">Last updated:
                            <strong>{props.lastUpdateDate}</strong>
                        </small>
                        <br/>
                        <small className="text-body-secondary">Last created:
                            <strong >{props.createDate}</strong></small>
                    </div>
                    <div className="d-flex align-items-center">
                        <a
                           className="btn btn-sm btn-primary m-2 flex-fill">
                            <span className="me-1"><i className="bi bi-eye"></i></span>
                            View
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default GiftCertificate