import React from "react";

function Footer(){
    return (
        <div className="h-[100px] w-screen bg-cyan-800 mt-3 flex justify-evenly items-center py-3">
            <p className="text-white text-sm ml-6 hidden sm:block">Job Seek. © 2025 <br></br>Your gateway to the best career opportunities. <br />Quick Links Home About Contact Follow Us Instagram LinkedIn Twitter GitHub Contact 📧 support@jobseek.com 📍 Chennai, India</p>
            <p className="text-white sm:hidden">Job Seek. © 2025</p>
            <p className="text-white ml-3">Contact <a className="text-blue-300" href="https://www.linkedin.com/in/sohil-lochan" target="_blank">Developer</a></p>
        </div>
    );
}

export default Footer;