import React from "react";
import Tag from "../../gift-certificates/tags/Tag";

function AdminGiftCertificate(props) {
    //todo actions
    return (
        <tr>
            <th scope="row">{props.id}</th>
            <td>{props.name}</td>
            <td>{props.description}</td>
            <td>{props.price}</td>
            <td>{props.duration}</td>
            <td>{props.createDate}</td>
            <td>{props.lastUpdateDate}</td>
            <td>
                {props.tags.map(tag => (<Tag key={tag.id} {...tag}/>))}
            </td>
            <td>
                <div className="d-flex justify-content-around align-items-baseline gap-2">
                    <button type="button" className="btn btn-sm btn-outline-primary">View</button>
                    <button type="button" className="btn btn-sm btn-outline-warning">Edit</button>
                    <button type="button" className="btn btn-sm btn-outline-danger">Delete</button>
                </div>
            </td>
        </tr>
    );
}

export default AdminGiftCertificate;