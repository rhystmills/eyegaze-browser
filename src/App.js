import React, { useEffect, useState, useRef } from 'react';
import { tabbable } from 'tabbable';
import { within } from './utils/within'
import { getButtonRGB, baseShade } from './utils/getButtonRGB'


function useInterval(callback, delay) {
    const savedCallback = useRef();
  
    // Remember the latest callback.
    useEffect(() => {
      savedCallback.current = callback;
    }, [callback]);
  
    // Set up the interval.
    useEffect(() => {
      function tick() {
        savedCallback.current();
      }
      if (delay !== null) {
        let id = setInterval(tick, delay);
        return () => clearInterval(id);
      }
    }, [delay]);
}

export function App() {
    const [tabbableElements, setTabbableElements] = useState([])
    const [currentTab, setCurrentTab] = useState(0)
    const [url, setUrl] = useState('')
    const [dot, setDot] = useState()
    const [dotPosition, setDotPosition] = useState({x: 0,y: 0})
    const [count, setCount] = useState({
        select: 0,
        back: 0,
        next: 0,
        prev: 0,
    })
    const [clicksActive, setClicksActive] = useState(false)
    const [buttonsActive, setButtonsActive] = useState(false)

    const keyHandler = (e) => {
        if (e.code === 'Space'){
            setButtonsActive(true)
            console.log("Activating")
        }
    }
    
    const clickHandler = (e) => {
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
        }
    }

    const thresholds = {
        next: 100,
        prev: 100,
        select: 100,
        back: 100
    }

    const initGazeDot = () => {
        const gazeDot = document.getElementById('webgazerGazeDot')
        if (!dot){
            setDot(gazeDot)
        }
    }

    useInterval(() => {
        if (clicksActive){
            const currentDotPosition = {
                x: dot.getBoundingClientRect().x,
                y: dot.getBoundingClientRect().y
            }
            setDotPosition(currentDotPosition);

            if (buttonsActive){
                const newCount = { ...count };
                const buttonIds = ['select','back','prev','next'];

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
            const eyedoc = eyeframe.contentDocument ? eyeframe.contentDocument : eyeframe.contentWindow.document;
            const tabs = tabbable(eyedoc, [])
            setTabbableElements(tabs)
            tabs[0].focus()
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
                    <p style={{marginLeft: '250px', position: 'absolute', width: '150px'}}>
                    <br/>Watch the mouse around the screen and repeatedly click to calibrate
                    <br/><br/>{!buttonsActive? 'Then, press space to activate the buttons' : ''}
                    </p>
                    <iframe src={url} unselectable="on" tabIndex={-1} id="eyeframe" width={1000} height={1000}/>
                </div>
                <div>
                    <ul className="buttonBox">
                        <li className="buttonRow">
                            <div 
                                id="select" 
                                className={buttonsActive?"bigButton":"bigButtonInactive"}
                                style={{
                                    backgroundColor: `rgb(${getButtonRGB(count.select, thresholds.select).join(", ")})`
                                }}
                            >SELECT</div>
                            <div 
                                id="back" 
                                className={buttonsActive?"bigButton":"bigButtonInactive"}
                                style={{
                                    backgroundColor: `rgb(${getButtonRGB(count.back, thresholds.back).join(", ")})`
                                }}
                            >BACK</div>
                        </li>
                        <li className="buttonRow">
                            <div 
                                id="prev" 
                                className={buttonsActive?"bigButton":"bigButtonInactive"}
                                style={{
                                    backgroundColor: `rgb(${getButtonRGB(count.prev, thresholds.prev).join(", ")})`
                                }}
                            >PREVIOUS</div>
                            <div 
                                id="next" 
                                className={buttonsActive?"bigButton":"bigButtonInactive"}
                                style={{
                                    backgroundColor: `rgb(${getButtonRGB(count.next, thresholds.next).join(", ")})`
                                }}
                            >NEXT</div>
                        </li>
                    </ul>
                </div>
            </main>
        </>
    );
}