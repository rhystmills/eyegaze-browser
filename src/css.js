import React, { useEffect, useState } from 'react';

export function MyCss() {
    return (
        <>
        <style>
            {`
            body {
                position: relative;
                min-height: 2000px;
            }

            h3 {
                font-size: 1.5rem;
            }

            h4 {
                font-size: 1.2rem;
                margin-top: 10px;
            }

            .nobullets {
                list-style-type: none;
                padding-left: 0;
            }

            .jumbotron {
                background-color:transparent !important;
            }

            .padright {
                padding-top: 0px;
                margin-bottom: 22px;
            }
            .pad {
                padding-top: 10px;
                margin-bottom: 20px;
            }

            .jumbotron p {
                font-size: 16px;
            }

            .col-half-offset {
                margin-left: 4.166666667%
            }

            p > code.hljs { display: inline; }
            
            body {
                min-width:600px!important;
            }
            
            button {
                border-radius: 4px;
            }
            /* Video Feed Styling */
            #overlay {
            /* Video Feed Styling:
             * Include the !important keyword to override default styles applied by JS.
             * webgazer.js sets defaults for: display, position, top, left, width, height
             */
            }
            #webgazerVideoContainer {
                display: block !important; 
                position: fixed !important;
                top: 0px !important;
                left: 0px !important;
                width: 320px !important;
                height: 240px !important;
                z-index: 1;
            }
            
            /* Navbar styling */
            #webgazerNavbar {
                left: 320px;
                z-index: 0;
                box-shadow: 0px 3px 5px #ddd;
                border:0px;
                background-color: #fff;
            }
            
            #Accuracy a{
                background-color: #222;
                color: #eee;
                left: -15px;
                padding-left: 80px;
                padding-right: 40px;
            }
            #Accuracy {
                background-color: #222;
                padding-left: inherit;
            }
            
            li {
                padding-left: 50px;
            }
            .navbar-right li {
                padding-right: 20px;
            }
            
            .helpBtn {
                padding: 15px;
                border: none;
                background: none;
                color: #777;
            }
            .helpBtn a {
                background: none;
                color: #777;
            }
            .helpBtn a:hover {
                color: black!important;
                text-decoration: none;
            }
            .modal-header {
                border-bottom: none!important;
            }
            
            /* Calibration button styling */
            .Calibration{
                width: 20px;
                height: 20px;
                -webkit-border-radius: 25px;
                -moz-border-radius: 25px;
                border-radius: 25px;
                background-color: red;
                opacity: 0.2;
                border-color: black;
                border-style: solid;
                position:fixed;
            }
            
            /* Calibration point position */
            #Pt1{
                top: 70px;
                left:340px;
            }
            #Pt2{
                top: 70px;
                left:50vw;
                margin-left: 340;
            }
            #Pt3{
                top: 70px;
                right:2vw;
            }
            #Pt4{
                top:50vh;
                left:2vw;
            }
            #Pt5{
                top: 50vh;
                left: 50vw;
            }
            #Pt6{
                top: 50vh;
                right:2vw;
            }
            #Pt7{
                bottom:2vw;
                left: 2vw;
            }
            #Pt8{
                bottom:2vw;
                left:50vw;
            }
            #Pt9{
                bottom:2vw;
                right:2vw;
            }`}
        </style>
    </>
    );
}