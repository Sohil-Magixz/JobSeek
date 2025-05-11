import React, { useState } from "react";
import JobCard from "../components/JobCard.jsx";
import FilterTab from "../components/FilterTab.jsx";
import dummyJobs from "../data/dummyJobs.json";
import JobDetails from "../components/JobDetails.jsx";
function Home() {
    var notFound = "hidden";
    const data = dummyJobs;
    const [searchQuery, setSearchQuery] = useState("");
    const [location, setLocation] = useState("All");
    const [type, setType] = useState("All");
    const [selectedRoles, setSelectedRoles] = useState([])
    const [selectedJob, setSelectedJob] = useState();

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
        for (let i = 0; i < selectedRoles.length; i++) {
            if (job.title.includes(selectedRoles[i])) {
                bool = true;
            }
        }

        const matchesRole = selectedRoles.length === 0 || bool;

        return matchesSearch && matchesType && matchesLocation && matchesRole;
    });

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
                    <button className="px-3 py-1 bg-blue-400 rounded-[8px]">Apply Now</button>
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
            <div className="Home h-auto w-screen 2xl-container">
                <div className="satefy-container h-full w-[90%] mx-auto flex flex-col justify-evenly items-center">
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
                        />                    </div>
                    <div className="flex justify-between">
                        <div className="flex flex-col">
                            <div className="bg-gray-100 h-[100vh] overflow-auto w-[98vw] sm:w-[50vw] sm:mr-6 rounded-2xl flex flex-col justify-start items-center my-1 mt-3 p-2 drop-shadow-xl">
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
                            />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Home;
