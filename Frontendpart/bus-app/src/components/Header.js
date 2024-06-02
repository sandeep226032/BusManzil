import React from 'react';
import { useState } from "react";
// import { BiBusFront } from "bootstrap-icons";
import './header.css'; // Import CSS file

import Bustemplate from "./Bustemplate.js";

// import { Link } from "react-router-dom";

import Footer from "./Footer.js";
import axios from 'axios';



function Header() {
    const [bus, setdata] = useState([]);
    const f = async () => {
    
    try {
        let from = document.querySelector("#from").value;
        let to = document.querySelector("#to").value;
        await axios.post('http://localhost:5000/home/bus', { from: from, to: to }).then((res) => {
            setdata(res.data);
        });
    } catch (error) {
        console.error('Error:', error);
    }
    }
   
    return (
        
        <div>
            <header>
    
                
                    
    <div className="searchbx">
        <div className="imglg">
            <img src="https://thumbs.dreamstime.com/b/print-173687664.jpg" alt=""></img>
        
        </div>
        <div className="searchbx1">
        <div className="bx1">
        <h1>From  </h1>
        <input type="text" id='from' placeholder="Enter Your Location"></input>
        
        <h1>To <i className="bi bi-arrow-left-right"></i> </h1>
        <input type="text"  id='to' placeholder="Enter Your Destination"></input>
        </div>
        <div className="bx2">
        <h1>Date &nbsp;</h1>
        
        <input type="text" placeholder="Select Date For Traveling"></input>
        <button onClick={f}>Search</button>
        </div>
    </div>
                </div>
           
                </header>
                
    

            {
                bus.map((e) => {
                    return <Bustemplate sk={e}></Bustemplate>
                })
            }
             
        <Footer></Footer>
        
        </div>
    );
}

export default Header;
