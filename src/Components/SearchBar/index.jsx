import React, { useState } from "react";

function SearchBar(props) {
  const [jobCriteria, setJobCriteria] = useState({
    title: "",
    location: "",
    experience: "",
    type: "",
  });

  const handleChange =(e)=>{
    setJobCriteria((prevState)=>({
      ...prevState,
      [e.target.name]:e.target.value
    }))

  }

  const search = async()=>{
    await props.fetchJobsCostum(jobCriteria)

  }

 
  return (
    <div className="flex flex-col md:flex-row gap-4 my-10 justify-center px-5 md:px-10">
      <select
      onChange={handleChange}
        name="title"
        value={jobCriteria.title}
        className="w-full md:w-64 py-3 pl-4 bg-zinc-200 font-semibold rounded-md"
      >
        <option value="" disabled selected hidden>
          Job Role
        </option>
        <option value="IOS Developer">IOS Developer</option>
        <option value="Frontend Developer">Frontend Developer</option>
        <option value="web Developer">web Developer</option>
        <option value="Backend Developer">Backend Developer</option>
        <option value="Android Developer">Android Developer</option>
        <option value="DevOps">DevOps</option>
      </select>
      <select
       onChange={handleChange}
        name="type"
        value={jobCriteria.type}
        className="w-full md:w-64 py-3 pl-4 bg-zinc-200 font-semibold rounded-md"
      >
        <option value="" disabled selected hidden>
          Job Type
        </option>
        <option value="Full-time">Full-time</option>
        <option value="Part-time">Part-time</option>
        <option value="Contract">Contract</option>
        <option value="Internship">Internship</option>
      </select>
      <select
       onChange={handleChange}
        value={jobCriteria.location}
        className="w-full md:w-64 py-3 pl-4 bg-zinc-200 font-semibold rounded-md"
        name="location"
        id=""
      >
        <option value="" disabled selected hidden>
          Location
        </option>
        <option value="Remote">Remote</option>
        <option value="Gwalior">Gwalior</option>
        <option value="Pune">Pune</option>
        <option value="Indore">Indore</option>
        <option value="Begluru">Begluru</option>
      </select>
      <select
       onChange={handleChange}
        value={jobCriteria.experience}
        className="w-full md:w-64 py-3 pl-4 bg-zinc-200 font-semibold rounded-md"
        name="experience"
        id=""
      >
        <option value="" disabled selected hidden>
          Experience
        </option>
        <option value="Fresher">Fresher</option>
        <option value="1-2 years">1-2 years</option>
        <option value="3-5 years">3-5 years</option>
        <option value="5+ years">5+ years</option>
      </select>
      <button  onClick={search} className="w-full md:w-64 bg-white text-black font-bold py-3 rounded-md">
        Search
      </button>
    </div>
  );
}

export default SearchBar;
