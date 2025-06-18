import axios from "axios";
import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const BASE_URL = import.meta.env.VITE_API_BASE_URL;
    const navigate = useNavigate();

    async function handleForgot (e){
        e.preventDefault();
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if(!emailRegex.test(email)){
            return alert("Enter a valid email");
        }
        setIsLoading(true);
        try{
            const res = await axios.post(`${BASE_URL}/api/auth/resendOtp`, {email});
            localStorage.setItem("purpose","reset-password");
            localStorage.setItem("pendingemail",email);
            const purpose = localStorage.getItem("purpose");
            console.log(purpose+" "+email);
            navigate("/verify");
        }catch(e){
            console.error(e);
        }finally{
            setIsLoading(false);
        }
    }

    async function handleSubmit(e) {
        if (isLoading) return;
        e.preventDefault();
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (emailRegex.test(email) && password.length >= 8) {
            setIsLoading(true);
            try {
                const res = await axios.post(`${BASE_URL}/api/auth/login`, { email, password });
                console.log("Logged in: ", res.data);
                alert("Login Successful");
                localStorage.setItem("user", JSON.stringify(res.data.user));
                setEmail("");
                setPassword("");
                navigate("/")
                window.location.reload();
            } catch (err) {
                console.error(err);

                if (err.response && err.response.data && err.response.data.message) {
                    alert(err.response.data.message);
                } else {
                    alert("Login failed. Please try again.");
                }
            } finally {
                setIsLoading(false);
            }
        } else {
            alert("email not valid");
        }
        setPassword("");

    }

    return (

        <div className="flex flex-col justify-center items-center h-[100vh] mt-[70px]">
            {isLoading && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-[rgba(0,0,0,0.3)] bg-opacity-40 backdrop-blur-sm">
                    <div className="loader animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500 border-solid"></div>
                </div>
            )}

            <form action="" onSubmit={handleSubmit} className="sm:min-w-[400px] p-3 flex flex-col  justify-start text-white bg-cyan-700 h-auto pb-22 w-[90%] sm:w-[20%] rounded-[20px]">
                <div className="w-full text-center bg-amber100  mb-14 mt-14">
                    <h1 className="py-3 text-2xl">Login</h1>
                </div>
                <div className="flex flex-col justify-start bg-amber300">
                    Email :<input value={email} onChange={(e) => { setEmail(e.target.value) }} type="email" name="" required className="px-3 py-1 mb-3 bg-white text-black rounded-[10px] mx-1" />
                    Password: <input value={password} onChange={(e) => { setPassword(e.target.value) }} type="password" name="" required className="px-3 py-1 mb-3 bg-white text-black rounded-[10px] mx-1" />
                    <button type="submit" className="bg-white text-cyan-700 rounded-[20px] mt-6 py-4 cursor-pointer">Submit</button>
                    <div className="flex justify-between pt-3">
                        <button onClick={handleForgot} className="text-blue-300 hover:underline cursor-pointer">Forgot your password?</button>
                        <button onClick={()=>navigate("/register")} className="text-blue-300 hover:underline">Create a new account?</button>
                    </div>
                </div>
            </form>
        </div>
    );
}
export default Login;