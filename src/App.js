import React, { useState, useEffect } from 'react';
import axios from 'axios';

const App = () => {
  const [jobs, setJobs] = useState([]);

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
  console.log('Jobs State:', jobs); 
  return (
    <div>
      <h1>List of Jobs</h1>
      <div className="job-cards-container">
        {jobs.map(job => (
          <div className="job-card" key={job.id}>
            <h2>{job.jobRole}</h2>
            <p>{job.description}</p>
            {/* Include more details from the job object */}
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;
