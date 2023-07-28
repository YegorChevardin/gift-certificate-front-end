import React, {useEffect, useState} from "react";
import axios from "axios";
import Modal from "react-modal";

function DeleteTag(props) {
    const createTagURL = process.env.REACT_APP_API_URL + "/tags";
    const [error, setError] = useState(null);
    const [authToken] = useState(initAuthToken());
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [tagData, setTagData] = useState({
        id: ""
    });

    function initAuthToken() {
        const token = localStorage.getItem("authToken");

        if (token !== null && token !== undefined && token !== "") {
            return token;
        }

        return null;
    }

    const deleteTag = async (tagId) => {
        try {
            if (authToken === null || authToken === undefined || authToken === "") {
                throw new Error();
            }

            const response = await axios.delete(createTagURL + `/${tagId}`,
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
    };

    const deleteTagEntity = () => {
        deleteTag(tagData.id).then(() => {
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
                    <div className="modal-content p-4 rounded rounded-4 bg-light border-3 border-danger shadow-sm">
                        <div className="modal-header mb-3">
                            <h5 className="modal-title">Deleting the tag</h5>
                        </div>
                        {error && (
                            <p className="small text-danger mb-2">
                                {error}
                            </p>
                        )}
                        <div className="modal-body">
                            <form>
                                <div className="mb-3">
                                    <label htmlFor="tagId" className="form-label">Name</label>
                                    <input type="number" value={tagData.name} className="form-control"
                                           id="tagId" name="id" onChange={(e) => {
                                        setTagData({id: e.target.value})
                                    }} placeholder="Enter Tag id you want to delete"/>
                                </div>
                            </form>
                        </div>
                        <div className="modal-footer gap-2">
                            <button type="button" className="btn btn-secondary" aria-label="Close"
                                    data-bs-dismiss="modal" onClick={props.onClose}>Close
                            </button>
                            <button type="button" className={`btn btn-outline-danger ${authToken ? '' : 'disabled'}`}
                                    onClick={deleteTagEntity}>Delete
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </Modal>
    );
}

export default DeleteTag;