import React from "react";

function JobCard({jobRole, company, jDescription, jType, logo, type, location}){

    return (
            <div className="sampleBoxCard h-[180px] w-[90%] m-auto my-3 bg-white flex justify-evenly items-center rounded-[20px] shadow-lg drop-shadow-lg overflow-auto ">
                <img src={logo} className="h-[100px] w-[100px] mx-2" alt="" />
                <div className="w-[60%]">
                    <a href=""><h1 className="font-bold text-xl pb-3 hover:scale-105 duration-200 hover:translate-x-4">{jobRole}</h1></a>
                    <div className="flex items-center pb-3">
                        <h6 className="text-[14px] px-2 bg-gray-300 inline rounded-[20px] mr-2">{company}</h6>
                        <h6 className="text-[14px] px-2 bg-gray-300 inline rounded-[20px] mr-2">{type}</h6>
                        <h6 className="text-[14px] px-2 bg-gray-300 inline rounded-[20px] mr-2">{location}</h6>
                    </div>
                    <p className="mt-3 text-[14px] overflow-auto max-h-[180px]">{jDescription}</p>
                </div>
            </div>
    );
}

export default JobCard;