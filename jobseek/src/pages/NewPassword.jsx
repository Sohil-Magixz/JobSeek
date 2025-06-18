import React from "react";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
function NewPassword(){
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [isLoading,setIsLoading] = useState(false);
    const navigate = useNavigate();
    const BASE_URL = import.meta.env.VITE_API_BASE_URL;


    async function handleSubmit(e){
        e.preventDefault();
        const email = localStorage.getItem("pendingemail");
        const otp = localStorage.getItem("otp");
        if(newPassword.length>7 && newPassword===confirmPassword){
            console.log(email+" "+otp+" "+ newPassword);
            setIsLoading(true);
            try{
                const res = await axios.post(`${BASE_URL}/api/auth/resetPassword`, {email, otp, newpassword: newPassword});
                alert("Password has been updated, You can login now with your New Password");
                localStorage.removeItem("pendingemail");
                localStorage.removeItem("otp");
                navigate("/login");
            }catch(err){
                console.log(err);
            }finally{
                localStorage.removeItem("pendingemail");
                localStorage.removeItem("otp");
                setIsLoading(false);
            }
        }else{
            return alert("Passwords do not match");
        }
        return ;
    }
    return (
        <div className="h-screen flex justify-center items-center">
            {isLoading && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-[rgba(0,0,0,0.2)] bg-opacity-40 backdrop-blur-sm">
                    <div className="h-12 w-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                </div>
            )}
            <form onSubmit={handleSubmit} className="flex flex-col justify-evenly bg-cyan-700 h-auto min-h-[200px] w-[300px] py-4 px-3 text-white rounded-[16px]">
                <h1 className="text-xl">Enter your <b>New Password</b></h1>
                <input placeholder="New Password" className="pl-2 border-2 h-9 rounded-[16px] bg-cyan-800" type="password" onChange={(e)=>{setNewPassword(e.target.value)}} name="newPassword"/>
                <input  placeholder="Confirm Password" className="pl-2 border-2 h-9 rounded-[16px] bg-cyan-800" type="password" onChange={(e)=>{setConfirmPassword(e.target.value)}} name="confirmPassword"/>
                <div className="flex justify-center items-center text-cyan-700">
                    <button type="submit" className="bg-white w-[100px] rounded-[16px] mt-2 px-3 py-1">Submit</button>
                </div>
            </form>
        </div>
    );
}

export default NewPassword;