import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { App } from './App';
import webgazer from 'webgazer'
import { Null } from './Null';

const viewer = {
    width: 240,
    height: 180
}

webgazer.params.showVideoPreview = true;
webgazer.params.videoViewerWidth = viewer.width;
webgazer.params.videoViewerHeight = viewer.height;
webgazer.setGazeListener(function(data, elapsedTime) {
    if (data == null) {
        return;
    }
    var xprediction = data.x; //these x coordinates are relative to the viewport
    var yprediction = data.y; //these y coordinates are relative to the viewport
}).begin();

const body = document.getElementsByTagName('body')[0]
body.setAttribute('id','body')

ReactDOM.render(<App />, document.getElementById('body'));
ReactDOM.render(<Null />, document.getElementsByTagName('head')[0])
