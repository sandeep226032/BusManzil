import React from 'react';
import "./signup.css"
import axios from "axios";
import { useState } from "react";

function Signup() {
    const [ details, setdetail ] = useState("");
    const register = async (e) => {
         e.preventDefault()
        try {
            let uname = document.getElementById("uname").value;
            let uemail = document.getElementById("uemail").value;
            let uphone = document.getElementById("uphone").value;
            let upass = document.getElementById("upass").value;
            await axios.post('http://localhost:5000/home/signup',
                { name: uname, email: uemail, phonenumber: uphone, password: upass }).then((res) => {
                    const de = res.data
                    setdetail(de.message)

                })
        } catch (error) {
            console.log("error in sign up function",error)
        }
    }
    return (
        <div>
    
<div class="signup-container">
        <h2>Sign Up</h2>
        <form>
            <input type="text" className='sin' id='uname' placeholder="Username" required></input>
            <input type="email" className='sin' id='uemail' placeholder="Email" required></input>
            <input type="tel" className='sin' id='uphone' placeholder="Phone Number" pattern="[0-9]{10}" required></input>
            <input type="password" className='sin' id='upass' placeholder="Password" required></input>
            <button type="submit" onClick={register} className='sign'>Sign Up</button>
                </form>
                            <h3>
                {details}
           </h3>

            </div>
        </div>
    )
    
}
export default Signup;