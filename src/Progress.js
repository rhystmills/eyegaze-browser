import React, { useEffect, useState, useRef } from 'react';


export const ProgressBar = (props) => {
    const { 
        size, 
        progress,
        color
    } = props;

    const [offset, setOffset] = useState(0);
    const circleRef = useRef(null);
    useEffect(() => {
        const progressOffset = ((100 - progress) / 100) * circumference;
        setOffset(progressOffset);
        // circleRef.current.style = 'transition: stroke-dashoffset 850ms ease-in-out;';
    }, [setOffset, circumference, progress, offset]);

    const strokeWidth = 8;
    const center = size / 2;
    const radius = size / 2 - strokeWidth / 2;
    const circumference = 2 * Math.PI * radius;
    return (
        <>
            <svg 
                className="svg" 
                width={size} 
                height={size} 
                style={{position: 'absolute', left: '50%', top:'50%', marginLeft: `-${size/2}px`, marginTop: `-${size/2}px`}}
>
                <circle
                    className="svg-circle"
                    ref={circleRef}
                    cx={center}
                    cy={center}
                    r={radius}
                    fill="none"
                    stroke={color}
                    strokeWidth={strokeWidth}
                    strokeDasharray={circumference}
                    strokeDashoffset={offset}
                />
            </svg>
        </>
    );
}
