import React, {useEffect, useState} from "react";
import Modal from "react-modal";
import axios from "axios";

function GiftCertificateCreate(props) {
    const giftCertificateCreateUrl = process.env.REACT_APP_API_URL + "/gift-certificates";
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [authToken, setAuthToken] = useState(null);
    const [giftCertificateData, setGiftCertificateData] = useState(initGiftCertificateData());
    const [error, setError] = useState(null);

    function mapTagsToString(tags) {
        let result = '';
        for (let i = 0; i < tags.length; i++) {
            result += tags[i].name;
            if (i + 1 !== tags.length) {
                result += ',';
            }
        }
        return result;
    }

    function mapStringToTags(string) {
        let names = string.split(",");
        let result = [];

        for (let i = 0; i < names.length; i++) {
            result.push({
                name: names[i]
            });
        }

        setGiftCertificateData(
            {
                ...giftCertificateData,
                tags: result
            }
        );
    }

    function updateGiftCertificateField(event) {
        setGiftCertificateData({
            ...giftCertificateData,
            [event.target.name]: event.target.value
        });
    }

    function initGiftCertificateData() {
        return {
            name: "",
            description: "",
            price: "",
            duration: "",
            tags: []
        };
    }

    function createGiftCertificate() {
        sendToServer().then(() => {});
    }

    const sendToServer = async () => {
        try {
            console.log(giftCertificateData);
            const response = await axios.post(giftCertificateCreateUrl, giftCertificateData, {
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
            console.log(error);
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
                            <h5 className="modal-title">{`Creating new Gift Certificate`}</h5>
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
                                <div className="mb-5">
                                    <label htmlFor="giftcertificateDuration" className="form-label">Tags</label>
                                    <input type="text" value={mapTagsToString(giftCertificateData.tags)} className="form-control" id="giftCertificateTags" name="tags" onChange={(e) => {mapStringToTags(e.target.value)}} placeholder="Enter tags, separated by coma"/>
                                </div>
                            </form>
                        </div>
                        <div className="modal-footer gap-2">
                            <button type="button" className="btn btn-secondary" aria-label="Close" data-bs-dismiss="modal" onClick={props.onClose}>Close</button>
                            <button type="button" className={`btn btn-primary ${authToken ? '' : 'disabled'}`} onClick={createGiftCertificate}>Save Changes</button>
                        </div>
                    </div>
                </div>
            </div>
        </Modal>
    );
}

export default GiftCertificateCreate;