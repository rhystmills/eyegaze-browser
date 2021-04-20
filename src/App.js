import React, { useEffect, useState } from 'react';
import { tabbable } from 'tabbable';
import { Tabs } from './tabs'

function App() {
    const [tabbableElements, setTabbableElements] = useState([])
    
    useEffect(() => {
        const eyeframe = document.getElementById("eyeframe")
        setTimeout(() => {   
            const eyedoc = eyeframe.contentDocument ? eyeframe.contentDocument : eyeframe.contentWindow.document;
            console.log(eyedoc)
            const tabs = tabbable(eyedoc, [])
            // console.log(tabs)
            setTabbableElements(tabs)
            // console.log("tabbable", tabbableElements)
            tabs.forEach(element => element.setAttribute("style","border: solid 1px #448844"))
        }, 4000)
        
        
    }, [])

    return (
        <div>
            <h1>Hello World!</h1>
            <button onClick={() => console.log("Clicking the first button")}>Click me</button>
            <p><a href="https://www.rhysmills.com">Link</a></p>
            {/* <Tabs tabs={tabbableElements}/> */}
            <iframe src={window.location.href} id="eyeframe" width={1000} height={1000}/>
        </div>
    );
}

export default App;