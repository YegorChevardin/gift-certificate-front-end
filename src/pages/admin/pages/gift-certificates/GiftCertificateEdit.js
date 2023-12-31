import React, {useEffect, useState} from "react";
import Modal from "react-modal";
import axios from "axios";
import CreateTagWindow from "./CreateTagWindow";

function GiftCertificateEdit(props) {
    const giftCertificateUpdateUrl = process.env.REACT_APP_API_URL + "/gift-certificates";
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [authToken, setAuthToken] = useState(null);
    const [giftCertificateData, setGiftCertificateData] = useState(initGiftCertificateData());
    const [error, setError] = useState(null);
    const [isTagsCreationWindowOpen, setIsTagsCreationWindowOpen] = useState(false);

    function openTagsCreationWindow() {
        setIsTagsCreationWindowOpen(true);
    }

    function closeTagsCreationWindow() {
        setIsTagsCreationWindowOpen(false);
    }

    function updateGiftCertificateField(event) {
        setGiftCertificateData({
            ...giftCertificateData,
            [event.target.name]: event.target.value
        });
    }

    function initGiftCertificateData() {
        return {
            id: props.id,
            name: props.name,
            description: props.description,
            price: props.price,
            duration: props.duration,
            tags: props.tags
        };
    }

    function removeTagFromCertificate(tagName) {
        if (tagName !== "" && tagName !== undefined && tagName !== null) {
            setGiftCertificateData({
                ...giftCertificateData,
                tags: giftCertificateData.tags.filter(tag => tag.name !== tagName)
            })
        }
    }

    function updateGiftCertificate() {
        sendToServer().then(() => {});
    }

    const sendToServer = async () => {
        try {
            const response = await axios.put(giftCertificateUpdateUrl, giftCertificateData, {
                headers: {
                    Authorization: authToken
                }
            });
            if (response.status === 200) {
                const data = await response.data;
                setGiftCertificateData(data);
                window.location.reload();
            } else {
                throw new Error();
            }
        } catch (error) {
            const errorData = error.response.data;
            let message = '';

            for (const key in errorData) {
                if (Object.hasOwnProperty.call(errorData, key) && key !== "errorCode") {
                    const value = errorData[key];
                    message += `${value}. `;
                }
            }

            if (message) {
                setError(message);
            } else {
                setError("Something went wrong, try again later.");
            }
        }
    };

    useEffect(() => {
        const token = localStorage.getItem("authToken");

        if (token !== null && token !== undefined && token !== "") {
            setAuthToken(token);
        } else {
            setError("Cannot authenticate user, please, try to log in again. ");
        }
    }, []);

    useEffect(() => {
        if (props.isOpen) {
            setModalIsOpen(true);
            document.body.classList.add('no-scroll');
        } else {
            setModalIsOpen(false);
            document.body.classList.remove('no-scroll');
        }

        return () => {
            document.body.classList.remove('no-scroll');
        };
    }, [props.isOpen]);

    return (
        <Modal
            isOpen={modalIsOpen}
            onRequestClose={props.onClose}
            contentLabel={`Gift certificates #${props.id}`}
            ariaHideApp={false}
            className="h-100 w-100 bg-blured"
        >
            <div className="row h-100 justify-content-center align-items-center">
                <div className="col-md-6">
                    <div className="modal-content p-4 rounded rounded-4 bg-dark text-light shadow-sm">
                        <div className="modal-header mb-3">
                            <h5 className="modal-title">{`Editing Gift Certificate #${props.id}`}</h5>
                        </div>
                        {error && (
                            <p className="small text-danger mb-2">
                                {error}
                            </p>
                        )}
                        <div className="modal-body">
                            <form>
                                <div className="mb-3">
                                    <label htmlFor="giftCertificateName" className="form-label">Name</label>
                                    <input type="text" value={giftCertificateData.name} className="form-control" id="giftCertificateName" name="name" onChange={updateGiftCertificateField} placeholder="Enter Gift Certificate name"/>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="giftCertificateDescription" className="form-label">Description</label>
                                    <input type="text" value={giftCertificateData.description} className="form-control" id="giftCertificateDescription" name="description" onChange={updateGiftCertificateField} placeholder="Enter Gift Certificate description"/>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="giftCertificatePrice" className="form-label">Price</label>
                                    <input type="number" value={giftCertificateData.price} className="form-control" id="giftCertificatePrice" name="price" onChange={updateGiftCertificateField} placeholder="Enter Gift Certificate price"/>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="giftcertificateDuration" className="form-label">Duration</label>
                                    <input type="number" value={giftCertificateData.duration} className="form-control" id="giftCertificateDuration" name="duration" onChange={updateGiftCertificateField} placeholder="Enter Gift Certificate Duration"/>
                                </div>
                                <div className="mb-5 mt-5">
                                    <div className="d-flex flex-wrap align-items-baseline justify-content-between">
                                        <p className="form-label mb-2">Tags</p>
                                        <button className="btn btn-sm btn-primary" type="button"
                                                onClick={openTagsCreationWindow}>Add tag
                                        </button>
                                        <CreateTagWindow isOpen={isTagsCreationWindowOpen}
                                                         onClose={closeTagsCreationWindow} tags={giftCertificateData.tags}/>
                                    </div>
                                    <div className="table-responsive">
                                        <table
                                            className="table table-striped table-bordered table-sm table-dark border-dark">
                                            <thead>
                                            <tr>
                                                <th scope="col">#</th>
                                                <th scope="col">Name</th>
                                                <th scope="col">Action</th>
                                            </tr>
                                            </thead>
                                            <tbody>
                                            {giftCertificateData.tags.length === 0 && (
                                                <tr>
                                                    <td scope="row" colSpan="3" className="text-center">
                                                        <h3>No tags in this gift certificate yet.</h3>
                                                    </td>
                                                </tr>
                                            )}
                                            {giftCertificateData.tags.length !== 0 && giftCertificateData.tags.map((element, indexElement) => (
                                                <tr key={indexElement}>
                                                    <th scope="row">{indexElement}</th>
                                                    <td>{element.name}</td>
                                                    <td className="text-center">
                                                        <button type="button"
                                                                className="btn w-100 btn-sm btn-outline-danger"
                                                                onClick={() => removeTagFromCertificate(element.name)}>
                                                            <i className="bi bi-trash3"></i>
                                                        </button>
                                                    </td>
                                                </tr>
                                            ))}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </form>
                            <p className="mb-1">
                                <span>Last created at: {props.createDate}</span>
                            </p>
                            <p>
                                <span>Last update at: {props.lastUpdateDate}</span>
                            </p>
                        </div>
                        <div className="modal-footer gap-2">
                            <button type="button" className="btn btn-secondary" aria-label="Close" data-bs-dismiss="modal" onClick={props.onClose}>Close</button>
                            <button type="button" className={`btn btn-primary ${authToken ? '' : 'disabled'}`} onClick={updateGiftCertificate}>Save Changes</button>
                        </div>
                    </div>
                </div>
            </div>
        </Modal>
    );
}

export default GiftCertificateEdit;