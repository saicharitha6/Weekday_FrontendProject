import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

const App = () => {
  const [jobs, setJobs] = useState([]);
  const [expandedDescriptionId, setExpandedDescriptionId] = useState(null);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await axios.post("https://api.weekday.technology/adhoc/getSampleJdJSON", {
          limit: 10,
          offset: 0
        });
        if (response.status === 200) {
          setJobs(response.data.jdList); // Assuming response.data contains the list of jobs
        } else {
          throw new Error('Failed to fetch jobs');
        }
      } catch (error) {
        console.error('Error fetching jobs:', error);
      }
    };

    fetchJobs();
  }, []);

  const toggleDescription = (id) => {
    setExpandedDescriptionId(expandedDescriptionId === id ? null : id);
  };

  return (
    <div>
      <div className="job-cards-container">
        {jobs.map(job => (
          <div className="job-card" key={job.id}>
            <div className="top-card">
              <h2>{job.jobRole}</h2>
              <p>{job.companyName}</p>
              <p>{job.location}</p>
            </div>
            <h3>Estimated Salary</h3>
            <p>{job.minJdSalary}-{job.maxJdSalary} {job.salaryCurrencyCode}</p>
            <h3>Description</h3>
            <p>
              {expandedDescriptionId === job.id
                ? job.jobDetailsFromCompany // Show full description if expanded
                : `${job.jobDetailsFromCompany.slice(0, 150)}...`} {/* Truncate description if not expanded */}
              <button onClick={() => toggleDescription(job.id)}>
                {expandedDescriptionId === job.id ? "Collapse" : "Expand"}
              </button>
            </p>
            <h3>Experience Required</h3><p> {job.minExp}</p>
            <div className="button-container">
              <button>Apply Now</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;
