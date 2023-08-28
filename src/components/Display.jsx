import React from "react";
import './Display.css'

function wrapSpecialCharacters(value) {
    const specialCharacters = ["x", "%", "/", "-", "+"];
    const valueArray = value.split('');

    return valueArray.map((char, index) => (
        specialCharacters.includes(char) ? <span key={index} className="highlight">{char}</span> : char
    ));
}

export default props =>
    <div className="display">
        <div className="main">{wrapSpecialCharacters(props.value)}</div>
        <div className="results">{props.resultValue}</div>
    </div>
