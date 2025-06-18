import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
function VerifyOTP() {
    const BASE_URL = import.meta.env.VITE_API_BASE_URL;
    const [otp, setOtp] = useState("");
    const [email, setEmail] = useState(() => localStorage.getItem("pendingemail") || "");
    const [purpose, setPurpose] = useState(() => localStorage.getItem("purpose"));
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const handleVerify = async () => {
        if (isLoading) return;
        setIsLoading(true);
        try {
            // console.log(purpose);
            const res = await axios.post(`${BASE_URL}/api/auth/verify`, { email, otp, purpose });
            alert("Your account has been Verified Successfully!");
            if (purpose === "reset-password") {
                localStorage.setItem("otp", otp);
                localStorage.setItem("pendingemail", email);

                navigate("/newpassword");
            } else {
                localStorage.removeItem("pendingemail");
                navigate("/login");
            }
        } catch (err) {
            const errorMsg =
                err.response?.data?.message ||  // custom error message from backend
                err.response?.data?.error ||    // fallback for `error` field
                err.message ||                  // generic Axios error
                "Something went wrong!";        // fallback

            alert(errorMsg);
            console.error("Error details:", err);
        } finally {
            setIsLoading(false);
        }
    };
    const handleResend = async () => {
        try {
            await axios.post(`${BASE_URL}/api/auth/resendOtp`, { email });
            alert("OTP resent to your email.");
        } catch (err) {
            console.error("Resend error", err);
        }
    };
    return (
        <div className="flex flex-col justify-start pt-[200px] items-center mt-[70px] h-[100vh]">
            {isLoading && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-[rgba(0,0,0,0.2)] bg-opacity-40 backdrop-blur-sm">
                    <div className="h-12 w-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                </div>
            )}
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