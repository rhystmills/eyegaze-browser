import { useEffect, useState, useRef } from 'react';
import { tabbable } from 'tabbable';
import { within } from './utils/within';
import { getButtonRGB, baseShade } from './utils/getButtonRGB';
import { Button } from './Button';
import * as React from 'react';


type SavedCallback = {
    current?: () => void;
}

type ButtonId = 'select' | 'back' | 'next' | 'prev' | 'up' | 'down'

type Count = Record<ButtonId, number>

const isIFrame = (input: HTMLElement | null): input is HTMLIFrameElement =>
    true

const useInterval = (callback: () => void, delay: number[]) => {
    const savedCallback = useRef() as SavedCallback;
  
    // Remember the latest callback.
    useEffect(() => {
      savedCallback.current = callback;
    }, [callback]);
  
    // Set up the interval.
    useEffect(() => {
      function tick() {
        savedCallback?.current();
      }
      if (delay !== null) {
        let id = setInterval(tick, 0);
        return () => clearInterval(id);
      }
    }, [delay]);
}

export const App = () => {
    const [tabbableElements, setTabbableElements] = useState([])
    const [currentTab, setCurrentTab] = useState(0)
    const [url, setUrl] = useState('')
    const [dot, setDot] = useState<HTMLElement>()
    const [dotPosition, setDotPosition] = useState({x: 0,y: 0})
    const [count, setCount] = useState<Count>({
        select: 0,
        back: 0,
        next: 0,
        prev: 0,
        up: 0,
        down: 0
    })
    const [clicksActive, setClicksActive] = useState(false)
    const [buttonsActive, setButtonsActive] = useState(false)

    const keyHandler = (e: KeyboardEvent) => {
        if (e.code === 'Space'){
            setButtonsActive(true)
            console.log("Activating")
        }
    }
    
    const clickHandler = () => {
        if (!clicksActive){
            setClicksActive(true)
        }
    }

    const handlers = { 
        next: () => {
            tabbableElements[currentTab + 1].focus()
            setCurrentTab(currentTab + 1)
        },
        prev: () => {
            tabbableElements[currentTab - 1].focus()
            setCurrentTab(currentTab - 1)
        },
        select: () => {
            tabbableElements[currentTab].click()
            setUrl(tabbableElements[currentTab].href)
        },
        back: () => {
            console.log("back selected")
        },
        up: () => {
            const eyeframe = document.getElementById("eyeframe");
            if (isIFrame(eyeframe)){
                eyeframe.contentWindow.scrollBy(0,-100)
            }
        },
        down: () => {
            const eyeframe = document.getElementById("eyeframe");
            if (isIFrame(eyeframe)){
                eyeframe.contentWindow.scrollBy(0,100)
            }
        }
    }

    const thresholds = {
        next: 50,
        prev: 50,
        select: 50,
        back: 50,
        up: 50,
        down: 50
    }

    const initGazeDot = () => {
        const gazeDot = document.getElementById('webgazerGazeDot')
        if (!dot){
            setDot(gazeDot)
        }
    }

    useInterval(() => {
        if (dot && clicksActive){
            const currentDotPosition = {
                x: dot.getBoundingClientRect().x,
                y: dot.getBoundingClientRect().y
            }
            setDotPosition(currentDotPosition);

            if (buttonsActive){
                const newCount = { ...count };
                const buttonIds = ['select','back','prev','next','up','down'] as ButtonId[];

                buttonIds.forEach((id) => {
                    const button = document.getElementById(id);
                    if (within(currentDotPosition, button)){
                        newCount[id] += 1;
                        if (newCount[id] >= thresholds[id]){
                            handlers[id]();
                            newCount[id] = 0;
                        }
                    } else if (newCount[id] > 0) newCount[id] -= 1;
                });

                setCount(newCount);
            }
        }
    }, [10])

    useEffect(() => {
        console.log("recalculating tabs")
        const eyeframe = document.getElementById("eyeframe")
        setTimeout(() => {   
            if (isIFrame(eyeframe)) {
                const eyedoc = eyeframe.contentDocument ? eyeframe.contentDocument : eyeframe.contentWindow.document;
                const tabs = tabbable(eyedoc as unknown as Element)
            setTabbableElements(tabs)
            tabs[0].focus()
            }
        
        }, 2500)
    }, [url])

    useEffect(() => {
        setUrl(window.location.href)
        window.addEventListener("keydown", keyHandler);
        window.addEventListener("click", clickHandler);
    }, [])

    return (
        <>
            <main onClick={initGazeDot}>
                <div>
                    <p className="instructions">
                        Watch the mouse around the screen and repeatedly click to calibrate
                        <br/>
                        <br/>
                        {!buttonsActive? 'Then, press space to activate the buttons' : ''}
                    </p>
                    <iframe src={url} unselectable="on" tabIndex={-1} id="eyeframe"/>
                </div>
                <div>
                    <ul className="buttonBox">
                        <li className="buttonRow">
                            <Button 
                                id="select"
                                label="Select link"
                                buttonsActive={buttonsActive}
                                size={250}
                                progress={count.select > 0 ? count.select/thresholds.select * 100 : 0}
                                color={`rgb(${getButtonRGB(count.select, thresholds.select).join(", ")})`}
                            />
                            <Button 
                                id="back"
                                label="Back"
                                buttonsActive={buttonsActive}
                                size={250}
                                progress={count.back > 0 ? count.back/thresholds.back * 100 : 0}
                                color={`rgb(${getButtonRGB(count.back, thresholds.back).join(", ")})`}
                            />
                        </li>
                        <li className="buttonRow">
                            <Button 
                                id="prev"
                                label="Previous link"
                                buttonsActive={buttonsActive}
                                size={250}
                                progress={count.prev > 0 ? count.prev/thresholds.prev * 100 : 0}
                                color={`rgb(${getButtonRGB(count.prev, thresholds.prev).join(", ")})`}
                            />
                            <Button 
                                id="next"
                                label="Next link"
                                buttonsActive={buttonsActive}
                                size={250}
                                progress={count.next > 0 ? count.next/thresholds.next * 100 : 0}
                                color={`rgb(${getButtonRGB(count.next, thresholds.next).join(", ")})`}
                            />
                        </li>
                        <li className="buttonRow">
                            <Button 
                                id="up"
                                label="Scroll up"
                                buttonsActive={buttonsActive}
                                size={250}
                                progress={count.up > 0 ? count.up/thresholds.up * 100 : 0}
                                color={`rgb(${getButtonRGB(count.up, thresholds.up).join(", ")})`}
                            />
                            <Button 
                                id="down"
                                label="Scroll down"
                                buttonsActive={buttonsActive}
                                size={250}
                                progress={count.down > 0 ? count.down/thresholds.down * 100 : 0}
                                color={`rgb(${getButtonRGB(count.down, thresholds.down).join(", ")})`}
                            />
                        </li>
                    </ul>
                </div>
            </main>
        </>
    );
}