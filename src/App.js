import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchJobsSuccess, updateFilters } from './actions/jobActions';
import axios from 'axios';
import './App.css';

const App = () => {
  const dispatch = useDispatch();
  // const jobs = useSelector(state => state.jobs.jobs);
  const filteredJobs = useSelector(state => state.jobs.filteredJobs);
  const filters = useSelector(state => state.jobs.filters);
  const [expandedDescriptionId, setExpandedDescriptionId] = useState(null);

  useEffect(() => {
    const fetchAndFilterJobs = async () => {
      try {
        const response = await axios.post("https://api.weekday.technology/adhoc/getSampleJdJSON", {
          limit: 10,
          offset: 0
        });

        if (response.status === 200) {
          dispatch(fetchJobsSuccess(response.data.jdList));

          // Apply filters to the fetched jobs
          const filtered = response.data.jdList.filter(job => applyFilters(job));
          dispatch(fetchJobsSuccess(filtered));
        } else {
          throw new Error('Failed to fetch jobs');
        }
      } catch (error) {
        console.error('Error fetching jobs:', error);
      }
    };

    fetchAndFilterJobs();
  }, [dispatch, filters]); // Depend on filters to refetch and apply filters

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    dispatch(updateFilters({ ...filters, [name]: value }));
  };

  const applyFilters = (job) => {
    // Check for null values in the fields and exclude the job if any field is null
    if (
      job.companyName === null ||
      job.location === null ||
      job.jobRole === null ||
      job.minExp === null ||
      job.minJdSalary === null
    ) {
      return false;
    }

    return (
      job.companyName.toLowerCase().includes(filters.companyName.toLowerCase()) &&
      job.location.toLowerCase().includes(filters.location.toLowerCase()) &&
      job.jobRole.toLowerCase().includes(filters.jobRole.toLowerCase()) &&
      (filters.minExp === '' || job.minExp >= parseInt(filters.minExp)) &&
      (filters.minJdSalary === '' || parseInt(filters.minJdSalary) <= job.minJdSalary) &&
      // Filter for remote/onsite based on selected option
      (filters.remote === '' || (filters.remote === 'remote' && job.location.toLowerCase() === 'remote') ||
        (filters.remote === 'on-site' && job.location.toLowerCase() !== 'remote'))
    );
  };

  const toggleDescription = (id) => {
    setExpandedDescriptionId(expandedDescriptionId === id ? null : id);
  };

  return (
    <div>
      <div className="filters">
        <input
          type="text"
          name="companyName"
          placeholder="Company Name"
          value={filters.companyName}
          onChange={handleFilterChange}
        />
        <input
          type="text"
          name="location"
          placeholder="Location"
          value={filters.location}
          onChange={handleFilterChange}
        />
        <input
          type="text"
          name="jobRole"
          placeholder="Job Role"
          value={filters.jobRole}
          onChange={handleFilterChange}
        />
        <input
          type="number"
          name="minExp"
          placeholder="Min Exp"
          value={filters.minExp}
          onChange={handleFilterChange}
        />
        <input
          type="number"
          name="minJdSalary"
          placeholder="Min JD Salary"
          value={filters.minJdSalary}
          onChange={handleFilterChange}
        />
        {/* Select dropdown for remote/onsite */}
        <select
          name="remote"
          value={filters.remote}
          onChange={handleFilterChange}
        >
          <option value="">Remote/On-site</option>
          <option value="remote">Remote</option>
          <option value="on-site">On-site</option>
        </select>
      </div>
      <div className="job-cards-container">
        {filteredJobs.map(job => (
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
