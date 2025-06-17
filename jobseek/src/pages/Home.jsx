import React, { useState } from "react";
import JobCard from "../components/JobCard.jsx";
import FilterTab from "../components/FilterTab.jsx";
// import dummyJobs from "../data/dummyJobs.json";
import { useEffect } from "react";

function Home() {
    let matchesRole;
    var notFound = "hidden";
    const [data, setData] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [location, setLocation] = useState("All");
    const [type, setType] = useState("All");
    const [selectedRoles, setSelectedRoles] = useState([])
    const [selectedJob, setSelectedJob] = useState();
    const [like, setLike] = useState([]);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(function(){
        fetch("http://192.168.1.2:9000/api/jobs")
        .then((res)=>res.json())
        .then((jobs)=>{
             setData(jobs);
            // console.log("Data fetched successfully from the Backend !!");
            // console.log(data);
        }).catch((err)=>console.error("Server Error, Failed to Fetch the jobs ", err)
    )
    }, []);

    useEffect(function(){
        const tuser = localStorage.getItem("user");
        // console.log(typeof(tuser))
        // console.log("tuser raw value:", tuser, "typeof:", typeof tuser);
        if (tuser && tuser !== "undefined" && tuser !== "null" && tuser.trim() !== ""){
            setIsLoggedIn(true);
            const user = JSON.parse(tuser);
            fetch(`http://192.168.1.2:9000/api/user/${user.username}`).then(res => res.json()).then(data => {
                setLike(data.likedJobs || []);
            }).catch((err)=>{
                console.error(err);
            }, []);
        }else{
            setIsLoggedIn(false);
        }
    }, []);

    const filteredData = data.filter((job) => {
        const query = searchQuery.toLowerCase();

        const matchesSearch =
            job.title.toLowerCase().includes(query) ||
            job.company.toLowerCase().includes(query) ||
            job.type.toLowerCase().includes(query) ||
            job.location.toLowerCase().includes(query);

        const matchesType = type === "All" || job.type === type;
        const matchesLocation = location === "All" || job.location === location;
        var bool = false;
    
    let matchesRole = true;
    if (selectedRoles.length > 0) {
        matchesRole = selectedRoles.some(role => {
            if (role === "Favorites") {
                return like.includes(job.id);
            }
            return job.title.includes(role);
        });
    }
        return matchesSearch && matchesType && matchesLocation && matchesRole;
    });
    // console.log("selectedRoles:", selectedRoles);

    if (filteredData.length === 0) {
        notFound = "block";
    }

    return (
        <>
        {selectedJob && (
            <div className="fixed inset-0 z-1 flex justify-center items-center backdrop-blur-lg">
                <div className="box h-[300px] w-[600px] bg-white rounded-[20px] p-6  mx-4 drop-shadow-2xl">
                    <button className="text-3xl" onClick={()=>setSelectedJob(null)}>&times;</button>
                    <h1 className="text-[30px] bold flex flex-col justify-evenly">{selectedJob.title}</h1>
                    <h6 className="text-xl mb-6">{selectedJob.company}</h6>
                    <p className="mb-2">{selectedJob.description}</p>
                    <a href={selectedJob.applyLink} target="_blank" className="px-3 py-1 bg-blue-400 rounded-[8px]">Apply Now</a>
                </div>
            </div>
        )}
        {/* (
                                    <div className="fixed inset-0 z-50 flex justify-center items-center backdrop-blur-sm bg-black/40">
                                        <div className="bg-white p-6 rounded-2xl w-[90%] sm:w-[500px] shadow-lg relative">
                                            <button
                                                className="absolute top-2 right-4 text-gray-600 text-2xl"
                                                onClick={() => setSelectedJob(null)}
                                            >
                                                &times;
                                            </button>
                                            <h2 className="text-2xl font-bold mb-2">{selectedJob.title}</h2>
                                            <p className="text-sm text-gray-500 mb-2">
                                                {selectedJob.companyType}
                                            </p>
                                            <p className="mb-4">{selectedJob.description}</p>
                                            <button className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700">
                                                Apply Now
                                            </button>
                                        </div>
                                    </div>
                                )} */}
            <div className="Home h-auto w-screen 2xl-container mt-[70px]">
                <div className="satefy-container w-[90%] mx-auto flex flex-col justify-evenly items-center ">
                    <h1 className="my-12 text-2xl sm:text-4xl text-center bg--100">Find your next Job.</h1>

                    <div className="mb-10 bg-gray700 w-full flex flex-col justify-evenly items-center">

                        <div className="w-full flex items-center justify-center mb-6">
                            <input
                                type="text"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                placeholder="Search"
                                className="px-6 h-[40px] sm:w-[40%] border border-gray-200 rounded-l-3xl"
                            />
                            <button className="bg-cyan-700 text-white rounded-r-3xl h-[40px] w-[100px]">Search</button>
                        </div>

                        <div className="bg-amber100 sm:w-[40%] flex justify-between gap-4">
                            <select
                                value={location}
                                onChange={(e) => setLocation(e.target.value)}
                                className="border border-gray-300 rounded-[4px]"
                            >
                                <option value="All">All Locations</option>
                                <option value="Chennai">Chennai</option>
                                <option value="Bangalore">Bangalore</option>
                                <option value="Hyderabad">Hyderabad</option>
                                <option value="Mumbai">Mumbai</option>
                            </select>

                            <select
                                value={type}
                                onChange={(e) => setType(e.target.value)}
                                className="border border-gray-300 rounded-[4px]"
                            >
                                <option value="All">All Job Types</option>
                                <option value="Full-Time">Full Time</option>
                                <option value="On-Site">On-Site</option>
                                <option value="Hybrid">Hybrid</option>
                                <option value="Remote">Remote</option>
                                <option value="Internship">Internship</option>
                            </select>
                        </div>
                    </div>
                    <div className="sm:hidden">
                        <FilterTab
                            selectedRoles={selectedRoles}
                            setSelectedRoles={setSelectedRoles}
                            like={like}
                            setLike={setLike}
                        />                    </div>
                    <div className="flex justify-between">
                        <div className="flex flex-col ">
                            <div className="bg-gray-100 overflow-auto h-[70vh] w-[80vw] md:w-[50vw] sm:mr-6 rounded-2xl flex flex-col my-1 mt-3 p-2 drop-shadow-xl">
                                {filteredData.map((item) => (
                                    <JobCard
                                        key={item.id}
                                        jobRole={item.title}
                                        company={item.company}
                                        jDescription={item.description}
                                        logo={item.logoUrl}
                                        type={item.type}
                                        location={item.location}
                                        onChangeJob={()=>setSelectedJob(item)}
                                        like={like}
                                        setLike={setLike}
                                        jobId={item.id}
                                    />
                                ))}
                                
                                <div className={notFound}>
                                    <h1>No Jobs Found</h1>
                                </div>
                            </div>
                        </div>
                        <div className="sm:flex hidden">
                            <FilterTab
                                selectedRoles={selectedRoles}
                                setSelectedRoles={setSelectedRoles}
                                like={like}
                                setLike={setLike}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Home;
