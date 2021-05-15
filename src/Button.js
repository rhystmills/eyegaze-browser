import React, { useEffect, useState, useRef } from 'react';
import { ProgressBar } from './Progress';

export const Button = (props) => {
    const { 
        id, 
        label,
        buttonsActive,
        size,
        progress,
        color
    } = props;

    return (
        <>
        <div 
            id={id} 
            className={buttonsActive ? "bigButton bigButtonActive" : "bigButton bigButtonInactive"}
        >   
            <ProgressBar 
                size={size} 
                progress={progress}
                color={color}
            />
            <span>{label}</span>
        </div>
        </>
    )
}
