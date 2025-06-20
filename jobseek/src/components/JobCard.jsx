import React from "react";
import { useState } from "react";
import nheart from "../assets/nheart.png";
import heart from "../assets/heart.png";
import axios from "axios";
import { useEffect } from "react";
function JobCard({ jobRole, company, jDescription, jType, logo, type, location, onChangeJob, like, setLike, jobId }) {
  const BASE_URL = import.meta.env.VITE_API_BASE_URL;

  const [liked, setLiked] = useState(false);
  useEffect(()=>{
    setLiked(like.includes(jobId));
  },[like, jobId]);

  function changeLike() {
    const tuser = localStorage.getItem("user");
    if(tuser==="undefined" || tuser===null){
      alert("Login to like jobs");
      return ;
    }
    const user = JSON.parse(tuser);
    axios.post(`${BASE_URL}/api/user`, {
      userId:user.username,
      jobId,
    }).then((res)=>{
      setLike(res.data.likedJobs);
    }).catch((e)=>{
      console.error(e);
    });

}


  return (
      <div className="sampleBoxCard h-auto w-[100%] sm:w-[90%] m-auto my-3 bg-white flex flex-col sm:flex-row justify-evenly items-center rounded-[20px] shadow-lg drop-shadow-lg p-4 hover:scale-105 duration-200">
      {logo && (
        <img src={logo} alt={`${company} logo`} className="h-[100px] w-[100px] mx-2" />
      )}
      <div className="w-full sm:w-[60%]">
        <div className="flex justify-between items-center">
          <button onClick={onChangeJob} className="font-bold text-xl pb-3">

            {jobRole}
          </button>
          <button className="translate-y-[-5px]" onClick={changeLike}><img src={liked ? heart : nheart} alt="" className="sm:h-[20px] sm:w-[20px] h-[25px] w-[25px]" /></button>
        </div>
        <div className="flex flex-wrap items-center pb-3 gap-2">
          <h6 className="text-[14px] px-2 bg-gray-300 rounded-[20px]">{company}</h6>
          <h6 className="text-[14px] px-2 bg-gray-300 rounded-[20px]">{type}</h6>
          <h6 className="text-[14px] px-2 bg-gray-300 rounded-[20px]">{location}</h6>
        </div>
        <p className="mt-3 text-[14px] max-h-[180px] overflow-auto">{jDescription}</p>
      </div>
    </div>
  );
}

export default JobCard;
