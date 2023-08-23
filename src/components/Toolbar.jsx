import React from "react"
import "./Toolbar.css"

export default props =>
    <div className="toolbar">
        <button className="backspace" onClick={props.backSpaceClick}>&lt;&lt;</button>
    </div>