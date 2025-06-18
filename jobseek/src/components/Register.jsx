import axios from "axios";
import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate

function Register() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [username, setUsername] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const BASE_URL = import.meta.env.VITE_API_BASE_URL;
    const navigate = useNavigate();
    async function handleSubmit(e) {
        
        if(isLoading) return;
        
        e.preventDefault();
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (emailRegex.test(email) && password.length >= 8 && !username.includes(" ") && username.length>2 && username.length<16) {
            setIsLoading(true);
            try {
                const res = await axios.post(`${BASE_URL}/api/auth/register`, { username, email, password });
                localStorage.setItem("pendingemail", email);
                localStorage.setItem("purpose","register");
                navigate("/verify");
            } catch (err) {
                if (err.response && err.response.data && err.response.data.message) {
                    alert(err.response.data.message);
                } else {
                    alert("Login failed. Please try again.");
                }
            }finally{
                setIsLoading(false);
                setEmail("");setUsername("");
                setPassword("");
            }
        } else {
            if(!emailRegex.test(email)){  alert("Invalid Email"); setEmail("");}
            if(password.length<8){  alert("Invalid Password Minimum 8 Characters Required"); }
            if(username.includes(" ") || username.length<3 || username.length>16){alert("Invalid Username [3-16] Characters allowed"); setUsername("");}
        }

    }

    return (

        <div className="flex flex-col justify-center items-center h-[100vh] mt-[70px]">
            {isLoading && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40 backdrop-blur-sm">
                    <div className="h-12 w-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                </div>
            )}
            <form action="" onSubmit={handleSubmit} className="sm:min-w-[400px] p-3 flex flex-col  justify-start text-white bg-cyan-700 h-auto pb-22 w-[90%] sm:w-[20%] rounded-[20px]">
                <div className="w-full text-center bg-amber100  mb-14 mt-14">
                    <h1 className="py-3 text-2xl">Register</h1>
                </div>
                <div className="flex flex-col justify-start bg-amber300">
                    Username:<input value={username} onChange={(e) => { setUsername(e.target.value) }} type="text" required className="px-3 py-1 mb-3 bg-white rounded-[10px] mx-1 text-black" />
                    Email :<input value={email} onChange={(e) => { setEmail(e.target.value) }} type="email" name="" required className="px-3 py-1 mb-3 bg-white text-black rounded-[10px] mx-1" />
                    Password: <input value={password} onChange={(e) => { setPassword(e.target.value) }} type="password" name="" required className="px-3 py-1 mb-3 bg-white text-black rounded-[10px] mx-1" />
                    <button type="submit" className="bg-white text-cyan-700 rounded-[20px] mt-6 py-4 cursor-pointer">Submit</button>
                </div>
                <a href="jobseek-in.vercel.app/register" className="text-blue-300 hover:underline mt-3 inline-block w-[200px]">Already have an account?</a>
            </form>
        </div>
    );
}
export default Register;