import React, { useState } from "react";
import axios from "axios";
import "./JobForm.css"; // Import the CSS file

function JobForm({ updateJobs }) {
  const [name, setName] = useState("");
  const [duration, setDuration] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    axios
      .post("http://127.0.0.1:8000/api/jobs/", { name, duration })
      .then((response) => {
        setName("");
        setDuration("");
        updateJobs(response?.data);
      })
      .catch((error) => console.error(error));
  };

  return (
    <div className="form-wrapper">
      <div className="form-container">
        <form onSubmit={handleSubmit} className="job-form">
          <h2 className="form-title">Create Job</h2>
          <div className="form-group">
            <label>
              Job Name:
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="form-input"
              />
            </label>
          </div>
          <div className="form-group">
            <label>
              Duration (seconds):
              <input
                type="text"
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
                className="form-input"
              />
            </label>
          </div>
          <button type="submit" className="form-button">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}

export default JobForm;
