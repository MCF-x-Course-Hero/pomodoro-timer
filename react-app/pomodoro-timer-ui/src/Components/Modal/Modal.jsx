import * as React from "react";

export default function Modal({children}) {
    return(
        <div style={{
            background: "rgba(255,255,255,.6)",
            position: "absolute",
            width: "100%",
            height: "100%",
            zIndex: "10000"}}
        >
            {children}
        </div>
    )
}