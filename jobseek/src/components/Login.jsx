import axios from "axios";
import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    async function handleSubmit(e) {
        if (isLoading) return;
        e.preventDefault();
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (emailRegex.test(email) && password.length >= 8) {
            setIsLoading(true);
            try {
                const res = await axios.post("http://192.168.1.2:9000/api/auth/login", { email, password });
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
                    alert(err.response.data.message); // ✅ this shows "User not found" or "Incorrect password"
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

            <form action="" onSubmit={handleSubmit} className=" p-3 flex flex-col  justify-start text-white bg-cyan-700 h-auto pb-22 w-[90%] sm:w-[20%] rounded-[20px]">
                <div className="w-full text-center bg-amber100  mb-14 mt-14">
                    <h1 className="py-3 text-2xl">Login</h1>
                </div>
                <div className="flex flex-col justify-start bg-amber300">
                    Email :<input value={email} onChange={(e) => { setEmail(e.target.value) }} type="email" name="" required className="px-3 py-1 mb-3 bg-white text-black rounded-[10px] mx-1" />
                    Password: <input value={password} onChange={(e) => { setPassword(e.target.value) }} type="password" name="" required className="px-3 py-1 mb-3 bg-white text-black rounded-[10px] mx-1" />
                    <button type="submit" className="bg-white text-cyan-700 rounded-[20px] mt-6 py-4 cursor-pointer">Submit</button>
                    <a href="/verify">Forgot your password?</a>
                </div>
            </form>
        </div>
    );
}
export default Login;