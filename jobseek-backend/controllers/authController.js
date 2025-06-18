import User from '../models/User.js';
import bcrypt from "bcrypt";
import sendMail from '../utils/sendEmail.js';

export const register = async (req, res) => {
    try{
        const {username ,email, password} = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        const testUser = await User.findOne({email: email});
        const testUsername = await User.findOne({username: username});
        if ((!testUser && !testUsername) || (testUser && !testUsername && !testUser.isVerified)) {
            if (testUser && !testUser.isVerified) {
                await User.deleteOne({ email: testUser.email });
            }
            const otp = Math.floor(100000+Math.random()*900000).toString();
            const otpExpiry = new Date(Date.now() + 10 * 60 * 1000);
            const user = await User.create({username, email, password: hashedPassword, otp, otpExpiry});
            await sendMail(email, "Verify your account",`Your OTP is ${otp}, Do not share it with anyone.`);
            return res.status(201).json({message:"User registered, Check Email for OTP Verification of Account"});
        }
        else{
            return res.status(409).json({message: "User already exists"});
        }
    } catch(err){
        return res.status(400).json({error: err.message});
    }
};

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: "Incorrect Password" });
        }
        if (!user.isVerified) {
             return res.status(403).json({ message: "Please verify your email before logging in." });
        }

        res.status(200).json({
            message: "Login Successful",
            user: {
                id: user._id,
                username: user.username,
                email: user.email
            }
        });
    } catch (err) {
        // console.error("Error:", err);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};

export const verifyOtp = async (req, res) => {
    const {email,otp, purpose} = req.body;
    const user = await User.findOne({email});
    // if(!user) return res.status(404).json({message:"User not found"});
    // console.log(otp+" "+email+" "+purpose+" \n");

    // console.log(user+" "+user.email+" "+user.otp+" ");
    if(user.otp!==otp || user.otpExpiry<Date.now()) return res.status(400).json({error:"OTP is Invalid or Expired"});
    if(purpose==="register"){
        user.isVerified = true;
        user.otp = null;
        user.otpExpiry = null;
        await user.save();
        return res.status(200).json({message:"User has been verified"});

    }else{
        return res.status(200).json({message:"OTP Verified, can redirect to /reset-password"});
    }
};
export const resendOtp = async (req,res) =>{
        const {email} = req.body;
        const user = await User.findOne({email});
        if(!user) return res.status(404).json({error:"User not found"});
        const otp = Math.floor(100000+Math.random()*900000).toString();
        user.otp = otp;
        user.otpExpiry = new Date(Date.now()+10*60*1000);
        await sendMail(email, "OTP Resent for Verification",`Your OTP is ${otp}`);
        await user.save();
        return res.status(200).json({message:"OTP Resent."});
}
export const resetPassword = async(req, res) =>{
    const {email, otp,newpassword} = req.body;
    const user = await User.findOne({email:email});
    if(!user) return res.status(404).json({message:"User not found"});
    if (user.otp !== otp || user.otpExpiry < Date.now()) {
        return res.status(400).json({ message: "OTP is invalid or expired" });
    }
    user.password = await bcrypt.hash(newpassword,10);
    await user.save();
    user.otp = null;
    user.otpExpiry = null;
    return res.status(200).json("Password has been changed successfully");
}