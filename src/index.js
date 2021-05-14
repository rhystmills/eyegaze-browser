import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import webgazer from 'webgazer'
import { Null } from './Null';

webgazer.begin()
webgazer.params.showVideoPreview = true
webgazer.params.videoViewerHeight = 180
webgazer.params.videoViewerWidth = 240
webgazer.setGazeListener(function(data, elapsedTime) {
    if (data == null) {
        return;
    }
    var xprediction = data.x; //these x coordinates are relative to the viewport
    var yprediction = data.y; //these y coordinates are relative to the viewport
}).begin();
webgazer.showVideo(true)

const body = document.getElementsByTagName('body')[0]
body.setAttribute('id','body')
// const root = document.createElement('div')
// root.setAttribute('id','root')
// body.appendChild(root)
ReactDOM.render(<App />, document.getElementById('body'));
ReactDOM.render(<Null />, document.getElementsByTagName('head')[0])


// const tabbableElements = tabbable(document.documentElement, []);
// console.log(tabbableElements)

// tabbableElements.forEach(
//     element => element.attributes.setNamedAttribute("color")
// )