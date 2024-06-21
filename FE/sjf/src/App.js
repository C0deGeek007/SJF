import React, { useState } from "react";
import JobList from "./components/JobList";
import JobForm from "./components/JobForm";
import WebSocketComponent from "./components/WebSocketComponent";

function App() {
  const [jobs, setJobs] = useState([]);

  const updateJobs = (jobData) => {
    setJobs((prevJobs) => {
      const existingJob = prevJobs.find((job) => job.id === jobData.id);
      if (existingJob) {
        return prevJobs.map((job) => (job.id === jobData.id ? jobData : job));
      } else {
        return [...prevJobs, jobData];
      }
    });
  };

  return (
    <div>
      <JobForm updateJobs={updateJobs} />
      <JobList jobs={jobs} setJobs={setJobs} />
      <WebSocketComponent updateJobs={updateJobs} />
    </div>
  );
}

export default App;
