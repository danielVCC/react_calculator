import React from "react";
import './Display.css'

export default props =>
    <div className="display">
        <div className="main">{props.value}</div>
        <div className="results">{props.value}</div>
    </div>
