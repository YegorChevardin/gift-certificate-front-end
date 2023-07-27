import React, {useEffect, useState} from "react";
import Modal from "react-modal";
import axios from "axios";

function GiftCertificateDelete(props) {
    const giftCertificateDeleteUrl = process.env.REACT_APP_API_URL + "/gift-certificates/";
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [authToken, setAuthToken] = useState(null);
    const [error, setError] = useState(null);

    function deleteGiftCertificate() {
        handleDeleteAction().then(() => {
        });
    }

    const handleDeleteAction = async () => {
        try {
            const response = await axios.delete(giftCertificateDeleteUrl + props.id, {
                headers: {
                    Authorization: authToken
                }
            });
            if (response.status === 200) {
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
    }

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

    return <Modal
        isOpen={modalIsOpen}
        onRequestClose={props.onClose}
        contentLabel={`Gift certificates #${props.id}`}
        ariaHideApp={false}
        className="h-100 w-100 bg-blured">
        <div className="row h-100 justify-content-center align-items-center">
            <div className="col-md-6">
                <div className="modal-content p-4 rounded rounded-4 bg-light border border-3 border-danger shadow-sm">
                    <div className="modal-header mb-3">
                        <h5 className="modal-title">{`Deleting Gift Certificate #${props.id}`}</h5>
                    </div>
                    {error && (
                        <p className="small text-danger mb-2">
                            {error}
                        </p>
                    )}
                    <div className="modal-footer gap-2">
                        <button type="button" className="btn btn-secondary" aria-label="Close" data-bs-dismiss="modal"
                                onClick={props.onClose}>Close
                        </button>
                        <button type="button" className={`btn btn-outline-danger ${authToken ? '' : 'disabled'}`}
                                onClick={deleteGiftCertificate}>Delete
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </Modal>
}

export default GiftCertificateDelete;