import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
function VerifyOTP() {
    const [otp, setOtp] = useState("");
    const [email, setEmail] = useState(() => localStorage.getItem("pendingEmail") || "");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleVerify = async () => {
        try {
            console.log(email+" "+otp);
            const res = await axios.post("http://192.168.1.2:9000/api/auth/verify", { email, otp });
            alert("Your account has been Verified Successfully!");
            localStorage.setItem("user", JSON.stringify(res.data.user));
            localStorage.removeItem("pendingemail");
            navigate("/login");
        } catch (err) {
            console.error(err);
        }
    };
    const handleResend = async () => {
        try {
            await axios.post("http://192.168.1.2:5000/api/auth/resendOtp", { email });
            alert("OTP resent to your email.");
        } catch (err) {
            console.error("Resend error", err);
        }
    };
    return (
        <div className="flex flex-col justify-start pt-[200px] items-center mt-[70px] h-[100vh]">
            <h2 className="text-2xl font-bold mb-4 text-cyan-700">Verify your email</h2>
            <p className="mb-2 text-gray-600">We've sent an OTP to <span className="font-semibold">{email}</span></p>
            <input
                type="text"
                placeholder="Enter OTP"
                className="border p-2 rounded w-[200px] text-center my-3"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
            />
            <button
                className="bg-cyan-700 text-white px-4 py-2 rounded hover:scale-105 cursor-pointer"
                onClick={handleVerify}
            >
                Verify
            </button>
            <button onClick={handleResend} className="cursor-pointer hover:underline">Resend OTP</button>

            {error && <p className="text-red-500 mt-3">{error}</p>}
        </div>
    );
}
export default VerifyOTP;