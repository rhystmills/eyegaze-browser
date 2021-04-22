import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { tabbable } from 'tabbable';

ReactDOM.render(<App />, document.getElementsByTagName('html')[0]);



const tabbableElements = tabbable(document.documentElement, []);
console.log(tabbableElements)

// tabbableElements.forEach(
//     element => element.attributes.setNamedAttribute("color")
// )