import React from "react"
import "./Button.css"

export default props =>
    <button 
        onClick={e => props.click && props.click(props.label)}
        className={`button
        ${props.operation ? 'operation' : ''}
        ${props.clear ? 'clear' : ''}
        ${props.equal ? 'equal' : ''}
    `}>
        {props.label}
    </button>