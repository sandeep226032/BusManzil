import React from 'react';
import { useState } from "react";
import './Bustemplate.css';
import axios from 'axios';

function Bustemplate({ sk }) {
    const [busstops, setdata] = useState([]);
    const find =async () => {
        let bus = sk.busno;
        try {
            await axios.post("http://localhost:5000/home/busstops", { busno: bus }).then((res) => {
                setdata(res.data);
            })
        } catch (error) {
            console.log(error, "Error");
        }
        
    }
    return (
        <div>
            <header>
                <div className="busopt">
     <div className="businfo">
     <div className="busno">
        <h1>Bus NO.</h1>
     </div>
     <div className="from">
     <h1>Beginning</h1>   
     </div>
     <div className="to">
    <h1>Destination</h1>
     </div>
     <div className="time">
        <h1>Duration</h1>
     </div>
     <div className="cost">
        <h1>Cost In Rs.</h1>
     </div>
     <div className="stops">
        <h1>Stops</h1>
     </div>
    </div>
    <div className="busrst">
        <div className="busno">
                            <h1>{ sk.busno}</h1>
         </div>
         <div className="from">
                            <h1>{ sk.beginning}</h1>   
         </div>
         <div className="to">
                            <h1>{ sk.destination}</h1>
         </div>
         <div className="time">
                            <h1>{ sk.time}</h1>
         </div>
         <div className="cost">
                            <h1>{ sk.cost}</h1>
         </div>
         <div className="stops">
         <button className="but" onClick={find}>show stops </button>
         </div>
    </div>
                </div>
                
    
  
   

            </header>
             
            {
                
                busstops.map(({bustops,busno,_id,bustime} ) => {
                    return   <div id="container">
                <div id="heading">
                    <div id="s">Stops</div>
                    <div id="t">Time</div>
                </div>
                <div id="content">
                    <div id="sc">
                                {bustops.map((element) => {
                                    return <div className='box1 ' key={_id}>{ element}</div>
                        })}
                    </div>
                    <div id="st">
                        <div>
                                    {bustime.map((element) => {
                                        return <div className='box2' key={_id}>{ element }</div>
                                    })}
    
                        </div>
                    </div>
                </div>
                
</div>
                        
                    
                })
            }
            
        </div>
    )
}
export default Bustemplate;