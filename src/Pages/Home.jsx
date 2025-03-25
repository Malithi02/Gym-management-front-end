import React, { useEffect, useState } from "react";
import Banner from "../components/Banner";
import Card from "../components/Card";
import Jobs from "./Jobs";
import SideBar from "../sidebar/sidebar"; // Ensure correct import
import SessionType from "../sidebar/sessionType";
import RequestPlan from "../components/requestPlan";
//import Login from "./Login"
//import UpdatePlan from './UpdatePlan'; // ✅ Correct

const Home = () => {
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [jobs, setJobs] = useState([]);
    const [query, setQuery] = useState("");
    const [isLoading, setIsLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 6;

    useEffect(() => {
        setIsLoading(true);
        fetch("http://localhost:3000/plans/").then((res) => {
            res.json().then((data) => {
                console.log(data);
                setJobs(data);
                setIsLoading(false);
            });
        });
    }, []);

    // Handle search input change
    const handleInputChange = (event) => {
        setQuery(event.target.value);
    };

    // Handle filter change
    const handleChange = (event) => {
        setSelectedCategory(event.target.value);
    };

    // Handle click event
    const handleClick = () => {
        console.log("Filter button clicked");
    };

    // Function to filter jobs based on search and selected category
    const filteredData = () => {
        let filteredJobs = jobs;

        if (query) {
            filteredJobs = filteredJobs.filter((job) => job.workoutName.toLowerCase().includes(query.toLowerCase()));
        }

        if (selectedCategory) {
            filteredJobs = filteredJobs.filter(
                ({ difficultyLevel, maxDuration, durationType, sessionType }) =>
                    difficultyLevel.toLowerCase() === selectedCategory.toLowerCase() ||
                    (parseInt(maxDuration) <= parseInt(selectedCategory) && !isNaN(selectedCategory)) ||
                    durationType.toLowerCase() === selectedCategory.toLowerCase() ||
                    sessionType.toLowerCase() === selectedCategory.toLowerCase()
            );
        }

        return filteredJobs.map((data, i) => <Card key={i} data={data} />);
    };

    const result = filteredData();

    return (
        <div>
            <Banner query={query} handleInputChange={handleInputChange} />

            {/* Main Content Layout */}
            <div className="bg-[#FAFAFA] md:grid grid-cols-4 gap-8 lg:px-24 px-4 py-12">
                {/* Sidebar (Filters) */}
                <div className="bg-bg-purple-100 p-4 rounded col-span-1">
                    <SideBar handleChange={handleChange} handleClick={handleClick} />
                </div>

                {/* Job Listings */}
                <div className="col-span-2 bg-white p-4 rounded-sm">
          {/* Loading or results display */}
          {isLoading ? (
            <p>Loading...</p>
          ) : (
            <>
              {/* Display number of available jobs after filtering */}
              <h3>{result.length} Plans</h3>
              
              {/* Show jobs if available */}
              {result.length > 0 ? (
                <Jobs result={result} />
              ) : (
                <p>No Plans Available</p>
              )}
            </>
          )}
        </div>


                {/* Extra Space (Right Side) */}
                <div className="bg-white p-4 rounded col-span-1">
                    <RequestPlan />
                </div>
            </div>
        </div>
    );
};

export default Home;
