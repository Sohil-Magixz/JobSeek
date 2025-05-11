import React from "react";

function JobDetails({title, company, description}){
    return (
        <div className="container">
            <h1>{title}</h1>
            <h6>{company}</h6>
            <p>{description}</p>
            <button>Apply Now</button>
        </div>
    );
}
export default JobDetails;