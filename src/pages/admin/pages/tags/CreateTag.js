import React, {useEffect, useState} from "react";
import axios from "axios";
import Modal from "react-modal";

function CreateTag(props) {
    const createTagURL = process.env.REACT_APP_API_URL + "/tags";
    const [error, setError] = useState(null);
    const [authToken] = useState(initAuthToken());
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [tagData, setTagData] = useState({
        name: ""
    });

    function initAuthToken() {
        const token = localStorage.getItem("authToken");

        if (token !== null && token !== undefined && token !== "") {
            return token;
        }

        return null;
    }

    const createTag = async (tagName) => {
        try {
            if (authToken === null || authToken === undefined || authToken === "") {
                throw new Error();
            }

            const response = await axios.post(createTagURL,
                {
                    name: tagName
                },
                {
                    headers: {
                        Authorization: authToken
                    }
                }
            );
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

    const createTagEntity = () => {
        createTag(tagData.name).then(() => {
        });
    }

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
                            <h5 className="modal-title">Creating new tag</h5>
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
                                    <input type="text" value={tagData.name} className="form-control"
                                           id="giftCertificateName" name="name" onChange={(e) => {
                                        setTagData({name: e.target.value})
                                    }} placeholder="Enter Tag name"/>
                                </div>
                            </form>
                        </div>
                        <div className="modal-footer gap-2">
                            <button type="button" className="btn btn-secondary" aria-label="Close"
                                    data-bs-dismiss="modal" onClick={props.onClose}>Close
                            </button>
                            <button type="button" className={`btn btn-primary ${authToken ? '' : 'disabled'}`}
                                    onClick={createTagEntity}>Save Changes
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </Modal>
    );
}

export default CreateTag;