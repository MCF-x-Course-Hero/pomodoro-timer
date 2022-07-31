import * as React from "react";
import "./Modal.css";

export default function Modal({children}) {
    return(
        <div className="modal">
            {children}
        </div>
    )
}