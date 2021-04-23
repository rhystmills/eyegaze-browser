import React, { useEffect, useState } from 'react';

export function Null(props) {
    useEffect(() => console.log("props", props))
    return (
        <>
            <title>Eyegaze Browser</title>
        </>
    );
}