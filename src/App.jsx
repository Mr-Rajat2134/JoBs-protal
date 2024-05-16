import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import Navbar from "./Components/Navbar/Index";
import Header from "./Components/Header";
import SearchBar from "./Components/SearchBar";
import JobCard from "./Components/JobCard";

import { db } from "./firebase.config";
import { collection, getDocs, orderBy, query, where } from "firebase/firestore";

function App() {
  const [jobs, setJobs] = useState([]);
const [customSearch,setCustomSearch] = useState(false)

  const fetchJobs = async () => {
    setCustomSearch(false)
    const jobsRef = collection(db, "JoBs");
    const q = query(jobsRef, orderBy("postedOn", "desc"));
    const querySnapshot = await getDocs(q);
    const jobsList = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
      postedOn: doc.data().postedOn.toDate(),
    }));
    setJobs(jobsList);
  };
  const fetchJobsCostum = async (jobCriteria) => {
    setCustomSearch(true)
    const jobsRef = collection(db, "JoBs");
    const q = query(jobsRef, where("type" ,"==" ,jobCriteria.type), where("title" ,"==" ,jobCriteria.title), where("experience" ,"==" ,jobCriteria.experience), where("location" ,"==" ,jobCriteria.location),orderBy("postedOn", "desc"));
    const querySnapshot = await getDocs(q);
    const jobsList = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
      postedOn: doc.data().postedOn.toDate(),
    }));
    setJobs(jobsList);
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  return (
    <>
      <Navbar />
      <Header />
      <SearchBar  fetchJobsCostum={fetchJobsCostum} />
     
     {customSearch && 
     <button  onClick={fetchJobs} className="flex pl-[1050px] mb-2">
      <p className="bg-white px-10 py-2 rounded-md text-black">Clear</p>
     </button>
     }
     
      {jobs.length > 0 ? (
        jobs.map((job) => <JobCard key={job.id} {...job} />)
      ) : (
        <p className="items-center">Loading jobs...</p>
      )}
    </>
  );
}

export default App;
