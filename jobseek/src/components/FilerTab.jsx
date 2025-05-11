import React from "react";

function FilterTab(){
    
    return(
        <div className="h-auto sm:h-[310px] w-[90vw] sm:w-auto sm:bg-white bg-gray-200 p-3 rounded-2xl shadow-xl">
            <h1 className="sm:text-xl text-2xl sm:mb-1 mb-2">Filter Jobs</h1>
            <ul className="grid grid-cols-4 sm:block gap-2 sm:pt-2">
                <input type="checkbox" placeholder="Full Stack"/> Full Stack<br/>
                <input type="checkbox" /> Frontend<br/>
                <input type="checkbox" /> Backend<br/>
                <input type="checkbox" /> HR<br/>
                <input type="checkbox" /> SDE<br/>
                <input type="checkbox" /> Data Scientist<br/>
                <input type="checkbox" /> AI/ML<br/>
            </ul>
        </div>
    );
}
export default FilterTab;