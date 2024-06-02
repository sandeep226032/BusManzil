import React from 'react';
import './login.css';
import { useState } from "react";
import axios from "axios";
function Login() {
    const [detail, setdetails] = useState("");
    const log = async (e) => {
    e.preventDefault()
       try {
         let lname = document.getElementById("lname").value;
         let lemail = document.getElementById("lemail").value;
         let lpassword = document.getElementById("lpassword").value;
         await axios.post('http://localhost:5000/home/login', { name: lname, email: lemail, password: lpassword }
         ).then((res) => {
             
             const d = res.data;
             setdetails(d.message)
         })
       } catch (error) {
        console.log("error in log in function",error)
       }
  }
    return (
       <div class="login-container">
        <h2>Login</h2>
        <form>
            <input type="text" className='in' id='lname' placeholder="Username" required></input>
            <input type="email" className='in' id='lemail' placeholder="Email" required ></input>
            <input type="password" className='in' id='lpassword' placeholder="Password" required ></input>
            <button type='submit'  onClick={log} className='log'>Login</button>
            </form>
            {/* {detail.map((p) => {
               return <h1>p</h1>
            })} */}
            <h3 >
                {detail}
            </h3>
    </div>
    )
}
export default Login