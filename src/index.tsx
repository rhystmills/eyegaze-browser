import * as React from 'react';
import * as ReactDOM from 'react-dom';
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
webgazer.setGazeListener(function(data: { x: number; y: number; }) {
    if (data == null) {
        return;
    }
}).begin();

ReactDOM.render(<App />, document.body);
ReactDOM.render(<Null />, document.head)
