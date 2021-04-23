import React, { useEffect, useState, useRef } from 'react';
import { compose } from 'redux';
import { isTabbable, tabbable } from 'tabbable';
import { Calibration } from './calibration'



function App() {
    const [tabbableElements, setTabbableElements] = useState([])
    const [currentTab, setCurrentTab] = useState(0)
    const [url, setUrl] = useState('')
    const [dot, setDot] = useState()
    const [dotPos, setDotPos] = useState([0,0])

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
    
    const select = () => {
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
            useInterval(() => {
                // Your custom logic here
                setDotPos([gazeDot.getBoundingClientRect().x,gazeDot.getBoundingClientRect().y]);
              }, 100);
        }
        console.log(dot)
        // setDotPos([gazeDot.getBoundingClientRect().x,gazeDot.getBoundingClientRect().y])
    }

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

        
        //   return () => clearInterval(interval);
    }, [])


    return (
        <>
            {/* <head>
            </head>
            <body> */}
                <main style={mainStyle} onClick={initGazeDot}>
                    <div>
                        <p style={{marginLeft: '250px'}}>{dotPos[0] + ' ' + dotPos[1]}</p>
                        <iframe src={url} style={eyeframeStyle} unselectable="on" tabIndex={-1} id="eyeframe" width={1000} height={1000}/>
                    </div>
                    <div>
                        <ul className="buttonBox">
                            <li className="buttonRow">
                                <div className="bigButton" onClick={select}>SELECT</div>
                                <div className="bigButton">BACK</div>
                            </li>
                            <li className="buttonRow">
                                <div className="bigButton" onClick={prevTab}>PREVIOUS</div>
                                <div className="bigButton" onClick={nextTab}>NEXT</div>
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