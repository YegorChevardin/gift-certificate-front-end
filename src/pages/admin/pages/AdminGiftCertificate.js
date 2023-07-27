import React, {useState} from "react";
import Tag from "../../gift-certificates/tags/Tag";
import {Link} from "react-router-dom";
import GiftCertificateEdit from "./GiftCertificateEdit";
import GiftCertificateDelete from "./GiftCertificateDelete";

function AdminGiftCertificate(props) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isModalDeleteOpen, setIsModalDeleteOpen] = useState(false);

    const handleOpenModal = () => {
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    const handleCloseDeleteModal = () => {
        setIsModalDeleteOpen(false);
    };

    const handleOpenDeleteModal = () => {
        setIsModalDeleteOpen(true);
    }

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
                    <Link to={`/gift-certificates/${props.id}`} type="button" className="btn btn-sm btn-outline-primary">View</Link>
                    <button type="button" className="btn btn-sm btn-outline-warning" onClick={handleOpenModal}>Edit</button>
                    <GiftCertificateEdit
                        isOpen={isModalOpen}
                        onClose={handleCloseModal}
                        {...props}
                    />
                    <button type="button" className="btn btn-sm btn-outline-danger" onClick={handleOpenDeleteModal}>Delete</button>
                    <GiftCertificateDelete
                        isOpen={isModalDeleteOpen}
                        onClose={handleCloseDeleteModal}
                        {...props}
                    />
                </div>
            </td>
        </tr>
    );
}

export default AdminGiftCertificate;