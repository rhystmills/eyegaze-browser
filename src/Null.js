import React, { useEffect, useState } from 'react';

export function Null(props) {
    useEffect(() => console.log("props", props))
    return (
        <>
            <title>Eyegaze Browser</title>
            <link rel="preconnect" href="https://fonts.gstatic.com" />
            <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300&display=swap" rel="stylesheet" />
        </>
    );
}