import * as React from 'react';
import { ProgressBar } from './Progress';

type ButtonProps = {
    id: string,
    label: string,
    buttonsActive: boolean,
    size: number,
    progress:number,
    color: string // css rgb() value
}
export const Button = (props: ButtonProps) => {
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
