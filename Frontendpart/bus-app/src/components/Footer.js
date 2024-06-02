import "./Footerstyle.css";
function Footer() {
    return (
        <div>
<footer>
    <div className="foot">
        <div className="contact">
        <h1>Contact Us <i class="bi bi-person-rolodex"></i></h1>
        <ul>
            <li><i className="bi bi-whatsapp"></i>&nbsp; +91 9998887771</li>
            <li><i className="bi bi-instagram"></i>&nbsp; BusManzil_987</li>
            <li><i className="bi bi-envelope-at-fill"></i>&nbsp; busmanzil987@gmail.com</li>
        </ul>
        </div>
        <div className="feedback">
        <h1> Enter Your Feedback</h1>
        <div className="submit">
            <div className="ans">
            <input type="Test" value="" placeholder="Enter Your Feedback"></input>
            </div>
            <div className="btn">
                <button>Submit</button>
            </div>
        </div>
        </div>
        <div className="aboutus">
        <div className="logo">
            {/* <img src="bus-manzil-high-resolution-logo.png" alt="" srcset=""></img>
      */}
        </div >
               <h2>India's most trusted bus ticket company,<br></br> where you can book any type of <br></br>private or Government owned buses.<br></br>BusManzil allows you to find the different<br></br> types of buses.</h2>
        </div>
    </div>
    </footer>

    </div>
    )
}
export default Footer;