import { post } from 'jquery';
import React, { useEffect, useState, useRef } from 'react';
import ReactDOM from "react-dom";
import { compose } from 'redux';
import { isTabbable, tabbable } from 'tabbable';
import { Calibration } from './calibration'

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

function App() {
    const [tabbableElements, setTabbableElements] = useState([])
    const [currentTab, setCurrentTab] = useState(0)
    const [url, setUrl] = useState('')
    const [dot, setDot] = useState()
    const [dotPos, setDotPos] = useState([0,0])
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
        // console.log(tabbableElements)
        // console.log(currentTab)
        // console.log(tabbableElements)
        // console.log(currentTab)
        // console.log(tabbableElements[0])
        tabbableElements[currentTab + 1].focus()
        setCurrentTab(currentTab + 1)
    }
    const prevTab = () => {
        tabbableElements[currentTab - 1].focus()
        setCurrentTab(currentTab - 1)
    }
    
    const selectTab = () => {
        // console.log(url)
        tabbableElements[currentTab].click()
        setUrl(tabbableElements[currentTab].href)
        // console.log(url)

    }

    const initGazeDot = () => {
        const gazeDot = document.getElementById('webgazerGazeDot')
        // console.log(gazeDot)
        // console.log(gazeDot.getBoundingClientRect())
        if (!dot){
            setDot(gazeDot)
            
        }
        // setDotPos([gazeDot.getBoundingClientRect().x,gazeDot.getBoundingClientRect().y])
    }

    useInterval(() => {
        // Your custom logic here
        if (clicksActive){
        const curDotPos = [dot.getBoundingClientRect().x,dot.getBoundingClientRect().y]
        setDotPos(curDotPos);
        if (buttonsActive){
            const newCount = {...count}

            const select = document.getElementById('select');
            let selectPos = select.getBoundingClientRect()
            if (selectPos.left < dotPos[0] && selectPos.right > dotPos[0] && selectPos.bottom > dotPos[1] && selectPos.top < dotPos[1]){
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
            if (nextPos.left < dotPos[0] && nextPos.right > dotPos[0] && nextPos.bottom > dotPos[1] && nextPos.top < dotPos[1]){
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
            if (prevPos.left < dotPos[0] && prevPos.right > dotPos[0] && prevPos.bottom > dotPos[1] && prevPos.top < dotPos[1]){
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
    })

    useEffect(() => {
        console.log("recalculating tabs")
        const eyeframe = document.getElementById("eyeframe")
        setTimeout(() => {   
            const eyedoc = eyeframe.contentDocument ? eyeframe.contentDocument : eyeframe.contentWindow.document;
            // console.log(eyedoc)
            const tabs = tabbable(eyedoc, [])
            // console.log(tabs)
            setTabbableElements(tabs)
            // console.log("tabbable", tabbableElements)
            tabs[0].focus()
            // console.log(tabs[0])
            // tabs.forEach(element => element.setAttribute("style","border: solid 1px #448844"))
        }, 2500)
    }, [url])

    useEffect(() => {
        setUrl(window.location.href)
        window.addEventListener("keydown", keyHandler);
        window.addEventListener("click", clickHandler);

        //   return () => clearInterval(interval);
    }, [])


    return (
        <>
            {/* <head>
            </head>
            <body> */}
                <main style={mainStyle} onClick={initGazeDot}>
                    <div>
                        <p style={{marginLeft: '250px', position: 'absolute', width: '150px'}}>
                        <br/>Watch the mouse around the screen and repeatedly click to calibrate
                        <br/><br/>{!buttonsActive? 'Then, press space to activate the buttons' : ''}
                        </p>
                        <iframe src={url} style={eyeframeStyle} unselectable="on" tabIndex={-1} id="eyeframe" width={1000} height={1000}/>
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
            {/* </body> */}
        </>
    );
}

const eyeframeStyle = {
    pointerEvents: "none", 
    userSelect: 'none', 
    WebkitTapHighlightColor:'transparent',
    height: '80%',
    width: '40vw',
    boxSizing: 'border-box',
    marginTop: '180px'
}

const mainStyle = {
    display: 'flex',
    flexDirection: 'horizontal',
}

export default App;