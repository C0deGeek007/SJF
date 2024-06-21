import React, { useEffect } from "react";
import axios from "axios";
import "./JobList.css"; 

function JobList({ jobs, setJobs }) {
  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/api/jobs/")
      .then((response) => setJobs(response.data))
      .catch((error) => console.error(error));
  }, [setJobs]);

  return (
    <div className="job-list-container">
      <h1>Job List</h1>
      <div className="table-container">
        <table className="job-table">
          <thead>
            <tr>
              <th>Job Name</th>
              <th>Duration</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {jobs.map((job) => (
              <tr key={job.id}>
                <td>{job.name}</td>
                <td>{job.duration}</td>
                <td>{job.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default JobList;
