import React from "react";
import Navigation from "../components/Navigation.jsx";
import JobCard from "../components/JobCard.jsx";
import FilterTab from "../components/FilerTab.jsx";
import Footer from "../components/Footer.jsx";
import dummyJobs from "../data/dummyJobs.json";
function Home() {

    const data = dummyJobs;
    console.log(data);
    

    return (
        <>
            <div className="Home h-auto w-screen 2xl-container ">
                <Navigation />

                <div className="satefy-container h-full w-[90%] mx-auto flex flex-col justify-evenly items-center">

                    <h1 className="my-12 text-2xl sm:text-4xl text-center bg--100">Find your next Job.</h1>
                    <div className="mb-10 bg-gray700 w-full flex flex-col justify-evenly items-center">
                        {/* <p className="bg-gray-400">search bar</p> */}
                        <div className="w-full flex items-center justify-center mb-6">
                            <input type="text" placeholder="Search" className="px-6 h-[40px] sm:w-[40%] border border-gray-200 rounded-l-3xl" />
                            <button className=" bg-cyan-700 text-white rounded-r-3xl h-[40px] w-[100px]">Search</button>
                        </div>
                        <div className="bg-amber100 sm:w-[40%] flex justify-between">
                            <select className="border border-gray-300 rounded-[4px]" placeholder="Location" name="Location" id="cars">
                                <option value="default">Location</option>
                                <option value="Chennai">Chennai</option>
                                <option value="Bangalore">Bangalore</option>
                                <option value="Hyderabad">Hyderabad</option>
                                <option value="Mumbai">Mumbai</option>
                            </select>
                            <select className="border border-gray-300 rounded-[4px]" placeholder="JobType" name="JobType" id="cars">
                                <option value="default">Job Type</option>
                                <option value="Chennai">On-Site</option>
                                <option value="Bangalore">Hybrid</option>
                                <option value="Hyderabad">Remote</option>
                                <option value="Hyderabad">Internship</option>
                            </select>
                        </div>
                    </div>
                    <div className="sm:hidden">

                        <FilterTab />
                    </div>
                    <div className="flex justify-between">
                        <div className="flex flex-col">
                            <div className="bg-gray-100 h-auto w-[98vw] sm:w-[70vw] sm:mr-6 rounded-2xl flex flex-col justify-center items-center my-1 py-2 drop-shadow-xl">
                                {data.map((item) => (
                                    <JobCard jobRole = {item.title} company = {item.company} jDescription = {item.description} logo = {item.logoUrl} type={item.type} location={item.location}></JobCard>
                                ))}
                            </div>
                        </div>
                        <div className="sm:flex hidden">
                            <FilterTab />
                        </div>
                    </div>

                </div>
                <Footer />
            </div>
        </>
    )
}

export default Home;