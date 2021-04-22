import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { tabbable } from 'tabbable';
import webgazer from 'webgazer'


webgazer.begin()
webgazer.params.showVideoPreview = true
webgazer.setGazeListener(function(data, elapsedTime) {
    if (data == null) {
        return;
    }
    var xprediction = data.x; //these x coordinates are relative to the viewport
    var yprediction = data.y; //these y coordinates are relative to the viewport
    // console.log(elapsedTime); //elapsed time is based on time since begin was called
    console.log(data)
}).begin();
webgazer.showVideo(true)
console.log(webgazer)
webgazer.params.showVideoPreview = true
// ReactDOM.render(<App />, document.getElementsByTagName('body')[0]);



const tabbableElements = tabbable(document.documentElement, []);
console.log(tabbableElements)

// tabbableElements.forEach(
//     element => element.attributes.setNamedAttribute("color")
// )