import React from "react";

function Tag(props) {
    return (
        <div>
            <span className="badge bg-light m-1 shadow-sm text-dark">{props.name}</span>
        </div>
    );
}

export default Tag;