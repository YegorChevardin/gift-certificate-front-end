import React from "react";
import Tag from "./tags/Tag";
import {Link} from "react-router-dom";

function GiftCertificate(props) {
    return (
        <div className="card rounded rounded-4 card-hover">
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
                        <strong>{props.createDate}</strong></small>
                </div>
                <div className="card-text mt-2 mb-2">
                    <div className="d-flex flex-wrap">
                        {props.tags.map(
                            tag => (
                                <Tag key={tag.id} {...tag}/>
                            )
                        )}
                    </div>
                </div>
                <div className="d-flex align-items-center">
                    <Link to={"/gift-certificates/" + props.id}
                          className="btn btn-sm btn-primary m-2 flex-fill">
                        <span className="me-1"><i className="bi bi-eye"></i></span>
                        View
                    </Link>
                    <Link to="#"
                          className="btn btn-sm btn-outline-success m-2 flex-fill">
                        <span className="me-1"><i className="bi bi-cart4"></i></span>
                        Add to basket
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default GiftCertificate