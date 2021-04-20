import React, { useEffect, useState } from 'react';

export function Tabs(props) {
    useEffect(() => console.log("props", props))
    return (
        <ul>
            { props.tabs.map((el, i) => { return <li key={i}><button type="submit" onClick={(e) => {e.preventDefault(); console.log("focusing",el); el.focus()}}>{el.childNodes[0].nodeValue.toString()}</button></li> }) }
        </ul>
    );
}