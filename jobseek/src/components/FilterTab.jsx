import React from "react";
import { useState } from "react";

function FilterTab({ selectedRoles, setSelectedRoles }) {
    const roles = [
      "Favorites",
      "Full Stack",
      "Frontend",
      "Backend",
      "HR",
      "SDE",
      "Data Scientist",
      "AI/ML"
    ];


    function handleCheckboxChange(role) {
      if (selectedRoles.includes(role)) {
        setSelectedRoles(selectedRoles.filter(r => r !== role));
      } else {
        setSelectedRoles([...selectedRoles, role]);
      }
    }
  
    return (
      <div className="text-gray-200 h-auto sm:h-[310px] w-[80vw] sm:w-[15vw] bg-[#007595] flex flex-col justify-center items-center rounded-2xl px-2">
        <h1 className="sm:text-xl text-2xl sm:mb-1 mb-2 text-amber-50">Filter Jobs</h1>
        <ul className="grid grid-cols-2 sm:grid-cols-4 sm:block gap-2 sm:pt-2 sm:mb-0 mb-6">
          {roles.map(role => (
            <label key={role} className="block">
              {/* <input type="checkbox" className="mr-2" checked={selectedRoles.includes("Favorites")} onChange={()=>handleCheckboxChange("Favorites")} />Favourites */}
              <input
                type="checkbox"
                checked={selectedRoles.includes(role)}
                onChange={() => handleCheckboxChange(role)}
                className="mr-2"
              />
              {role}
            </label>
          ))}
        </ul>
      </div>
    );
  }
  
  export default FilterTab;
  