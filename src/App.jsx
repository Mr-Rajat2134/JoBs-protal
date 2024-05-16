


import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import Navbar from "./Components/Navbar/Index";
import Header from "./Components/Header";
import SearchBar from "./Components/SearchBar";
import JobCard from "./Components/JobCard";
import Loader from "./utility/Loader";
import { db } from "./firebase.config";
import { collection, getDocs, orderBy, query, where } from "firebase/firestore";

function App() {
  const [jobs, setJobs] = useState([]);
  const [customSearch, setCustomSearch] = useState(false);
  const [loading, setLoading] = useState(true);

  const fetchJobs = async () => {
    setCustomSearch(false);
    setLoading(true);
    try {
      const jobsRef = collection(db, "JoBs");
      const q = query(jobsRef, orderBy("postedOn", "desc"));
      const querySnapshot = await getDocs(q);
      const jobsList = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
        postedOn: doc.data().postedOn.toDate(),
      }));
      setJobs(jobsList);
    } catch (error) {
      console.error("Error fetching jobs: ", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchJobsCustom = async (jobCriteria) => {
    setCustomSearch(true);
    setLoading(true);
    try {
      const jobsRef = collection(db, "JoBs");
      const q = query(
        jobsRef,
        where("type", "==", jobCriteria.type),
        where("title", "==", jobCriteria.title),
        where("experience", "==", jobCriteria.experience),
        where("location", "==", jobCriteria.location),
        orderBy("postedOn", "desc")
      );
      const querySnapshot = await getDocs(q);
      const jobsList = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
        postedOn: doc.data().postedOn.toDate(),
      }));
      setJobs(jobsList);
    } catch (error) {
      console.error("Error fetching custom jobs: ", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  return (
    <>
      <Navbar />
      <Header />
      <SearchBar fetchJobsCustom={fetchJobsCustom} />

     {customSearch && 
     <button  onClick={fetchJobs} 
     className="flex   sm:pl-[1080px] pl-[100px] mb-2"
     >
      <p className="bg-white px-10 py-2 rounded-md text-black">Clear</p>
     </button>
     }
      {loading ? (
        <Loader />
      ) : (
        jobs.map((job) => <JobCard key={job.id} {...job} />)
      )}
    </>
  );
}

export default App;
