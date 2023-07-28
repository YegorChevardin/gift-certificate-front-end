import React from "react";

function Tag(props) {
    return (
        <div>
            <span className="badge bg-light m-1 shadow-sm text-dark" data-bs-toggle="tooltip"
                  data-bs-placement="right"
                  title={props.id}
            >{props.name}</span>
        </div>
    );
}

export default Tag;