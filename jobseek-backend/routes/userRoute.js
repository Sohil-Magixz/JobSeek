import express from 'express';
import User from '../models/User.js';

const router = express.Router();

router.get('/:username', async(req, res)=>{
    try{
        const user=await User.findOne({username:req.params.username}).select("likedJobs");
        if(!user) return res.status(404).json({error: "User not found"});
        res.json({likedJobs: user.likedJobs});
    }catch (error){
        return res.status(400).json({message:"Error Liking the jobs"});
    }
});
router.post('/', async(req, res)=>{
    try{
        const {userId, jobId} = req.body;
        const user = await User.findOne({username:userId});
        if(!user) return res.status(404).json({error:"User not found"});
        const index = user.likedJobs.indexOf(jobId);
        if(index>-1){
            // console.log("REMOVE");
            user.likedJobs.splice(index,1);
        }else{
            // console.log("ADD");
            user.likedJobs.push(jobId);
        }
        await user.save();
        res.json({likedJobs: user.likedJobs});
    }catch(error){
        console.log(error);
    }
})
export default router;