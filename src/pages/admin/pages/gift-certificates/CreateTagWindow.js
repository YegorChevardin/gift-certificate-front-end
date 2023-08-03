import React, {useEffect, useState} from "react";
import Modal from "react-modal";

function CreateTagWindow(props) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentTag, setCurrentTag] = useState(
        {
            "name": ""
        }
    );

    function addTag() {
        props.tags.push(currentTag);
        props.onClose();
    }

    useEffect(() => {
        if (props.isOpen) {
            setIsModalOpen(true);
        } else {
            setIsModalOpen(false);
        }
    }, [props.isOpen]);

    return (
        <Modal
            isOpen={isModalOpen}
            onRequestClose={props.onClose}
            contentLabel={`Gift certificates #${props.id}`}
            ariaHideApp={false}
            className="h-100 w-100 bg-blured"
        >
            <div className="row h-100 justify-content-center align-items-center">
                <div className="col-md-6">
                    <div className="modal-content p-4 rounded rounded-4 bg-dark text-light shadow-sm">
                        <div className="modal-header mb-3">
                            <h5 className="modal-title">{`Creating new Tag`}</h5>
                        </div>
                        <div className="modal-body">
                            <form>
                                <div className="mb-3">
                                    <label htmlFor="giftCertificateName" className="form-label">Name</label>
                                    <input type="text" value={currentTag.name} className="form-control" id="TagName"
                                           name="tagName" onChange={(e) => {
                                        setCurrentTag({...currentTag, name: e.target.value})
                                    }} placeholder="Enter Tag name"/>
                                </div>
                            </form>
                        </div>
                        <div className="modal-footer gap-2">
                            <button type="button" className="btn btn-secondary" aria-label="Close"
                                    data-bs-dismiss="modal" onClick={props.onClose}>Close
                            </button>
                            <button type="button" className="btn btn-primary" onClick={addTag}>Save Changes</button>
                        </div>
                    </div>
                </div>
            </div>
        </Modal>
    );
}

export default CreateTagWindow;