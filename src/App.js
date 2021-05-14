import React, { useEffect, useState, useRef } from 'react';
import { tabbable } from 'tabbable';

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
    const [dotPos, setDotPos] = useState({x: 0,y: 0})
    const [count, setCount] = useState({
        select: 0,
        back: 0,
        next: 0,
        prev: 0,
    })
    const [clicksActive, setClicksActive] = useState(false)
    const [buttonsActive, setButtonsActive] = useState(false)

    const keyHandler = (e) => {
        console.log(e.code)
        if (e.code === 'Space'){
            setButtonsActive(true)
            console.log("activating")
        }
        console.log(buttonsActive)
    }
    
    const clickHandler = (e) => {
        if (!clicksActive){
            setClicksActive(true)
        }
    }

    const nextTab = () => {
        tabbableElements[currentTab + 1].focus()
        setCurrentTab(currentTab + 1)
    }
    const prevTab = () => {
        tabbableElements[currentTab - 1].focus()
        setCurrentTab(currentTab - 1)
    }
    
    const selectTab = () => {
        tabbableElements[currentTab].click()
        setUrl(tabbableElements[currentTab].href)
    }

    const initGazeDot = () => {
        const gazeDot = document.getElementById('webgazerGazeDot')
        if (!dot){
            setDot(gazeDot)
        }
    }

    useInterval(() => {
        if (clicksActive){
        const curDotPos = {x: dot.getBoundingClientRect().x,y: dot.getBoundingClientRect().y}
        setDotPos(curDotPos);
        if (buttonsActive){
            const newCount = {...count}
            const select = document.getElementById('select');
            let selectPos = select.getBoundingClientRect()
            if (selectPos.left < dotPos.x && selectPos.right > dotPos.x && selectPos.bottom > dotPos.y && selectPos.top < dotPos.y){
                newCount.select += 1
                if (newCount.select > 100){
                    selectTab()
                    newCount.select = 0
                }
            } else {
                if (newCount.select > 1){
                    newCount.select -= 1
                }
            }

            const next = document.getElementById('next');
            let nextPos = next.getBoundingClientRect()
            if (nextPos.left < dotPos.x && nextPos.right > dotPos.x && nextPos.bottom > dotPos.y && nextPos.top < dotPos.y){
                newCount.next += 1
                if (newCount.next > 25){
                    nextTab()
                    newCount.next = 0
                }
            } else {
                if (newCount.next > 1){
                    newCount.next -= 1
                }
            }

            const prev = document.getElementById('prev');
            let prevPos = prev.getBoundingClientRect()
            if (prevPos.left < dotPos.x && prevPos.right > dotPos.x && prevPos.bottom > dotPos.y && prevPos.top < dotPos.y){
                newCount.prev += 1
                if (newCount.prev > 50){
                    prevTab()
                    newCount.prev = 0
                }
            } else {
                if (newCount.prev > 1){
                    newCount.prev -= 1
                }
            }
            

            setCount(newCount)
        }}
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
                            <div id="select" className={buttonsActive?"bigButton":"bigButtonInactive"}>SELECT</div>
                            <div id="back" className={buttonsActive?"bigButton":"bigButtonInactive"}>BACK</div>
                        </li>
                        <li className="buttonRow">
                            <div id="prev" className={buttonsActive?"bigButton":"bigButtonInactive"}>PREVIOUS</div>
                            <div id="next" className={buttonsActive?"bigButton":"bigButtonInactive"}>NEXT</div>
                        </li>
                    </ul>
                </div>
            </main>
        </>
    );
}

// const eyeframeStyle = {
//     pointerEvents: "none", 
//     userSelect: 'none', 
//     WebkitTapHighlightColor:'transparent',
//     height: '80%',
//     width: '40vw',
//     boxSizing: 'border-box',
//     marginTop: '180px'
// }

// const mainStyle = {
//     display: 'flex',
//     flexDirection: 'horizontal',
// }