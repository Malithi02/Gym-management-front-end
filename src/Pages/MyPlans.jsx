import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const MyPlans = () => {
    const [plans, setPlans] = useState([]);
    const [filteredPlans, setFilteredPlans] = useState([]); // Store original data separately
    const [isLoading, setIsLoading] = useState(true);
    const [searchText, setSearchText] = useState("");
    const [requestedPlans, setRequestedPlans] = useState([]); // State for requested plans

    // Pagination
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 4;

    const [requestedCurrentPage, setRequestedCurrentPage] = useState(1); // Pagination for requested plans
    const requestedItemsPerPage = 4; // Items per page for requested plans

    useEffect(() => {
        setIsLoading(true);
        fetch(`http://localhost:3000/plans`)
            .then((res) => res.json())
            .then((data) => {
                setPlans(data);
                setFilteredPlans(data); // Store a copy for search functionality
                setIsLoading(false);
            })
            .catch((err) => {
                console.error("Error fetching plans:", err);
                setIsLoading(false);
            });
    }, []);

    useEffect(() => {
        // Fetch requested plans
        fetch(`http://localhost:3000/requests`)
            .then((res) => res.json())
            .then((data) => {
                setRequestedPlans(data);
            })
            .catch((err) => console.error("Error fetching requested plans:", err));
    }, []);

    useEffect(() => {
        // Filter plans when searching
        const handleSearch = () => {
            if (searchText.trim() === "") {
                setFilteredPlans(plans);
            } else {
                const filtered = plans.filter((plan) => {
                    // Search by workout name and trainer name
                    return (
                        plan.workoutName.toLowerCase().includes(searchText.toLowerCase()) ||
                        plan.trainerName.toLowerCase().includes(searchText.toLowerCase())
                    );
                });
                setFilteredPlans(filtered);
            }
        };
        handleSearch(); // Trigger search whenever searchText changes
    }, [plans, searchText]);

    // Pagination calculations
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentPlans = filteredPlans.slice(indexOfFirstItem, indexOfLastItem);

    // Pagination calculations for requested plans
    const requestedIndexOfLastItem = requestedCurrentPage * requestedItemsPerPage;
    const requestedIndexOfFirstItem = requestedIndexOfLastItem - requestedItemsPerPage;
    const currentRequestedPlans = requestedPlans.slice(requestedIndexOfFirstItem, requestedIndexOfLastItem);

    // Next and Previous page handlers
    const nextPage = () => {
        if (indexOfLastItem < filteredPlans.length) {
            setCurrentPage(currentPage + 1);
        }
    };

    const prePage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    // Next and Previous page handlers for requested plans
    const nextRequestedPage = () => {
        if (requestedIndexOfLastItem < requestedPlans.length) {
            setRequestedCurrentPage(requestedCurrentPage + 1);
        }
    };

    const preRequestedPage = () => {
        if (requestedCurrentPage > 1) {
            setRequestedCurrentPage(requestedCurrentPage - 1);
        }
    };

    const handleDelete = (id) => {
        const confirmDelete = window.confirm("Are you sure you want to delete this workout plan?");
        if (!confirmDelete) return;

        fetch(`http://localhost:3000/plans/${id}`, {
            method: "DELETE",
        })
            .then((res) => res.json())
            .then((data) => {
                console.log("Plan deleted successfully:", data);
                // Remove the deleted plan from the UI
                const updatedPlans = plans.filter((plan) => plan._id !== id);
                setPlans(updatedPlans);
                setFilteredPlans(updatedPlans);
            })
            .catch((err) => console.error("Error deleting plan:", err));
    };

    return (
        <div className="max-w-screen-2xl container mx-auto xl:px-24 px-4">
            <h1 className="text-center p-4 text-lg font-bold">All My Plans</h1>

            {/* Search Box */}
            <div className="flex justify-center items-center gap-2 mb-4">
                <input
                    onChange={(e) => setSearchText(e.target.value)}
                    type="text"
                    placeholder="Search workout plans"
                    className="py-2 px-4 border border-gray-300 focus:outline-none w-2/5 bg-gray-100 rounded-md"
                />
                <button
                    className="bg-gray-700 text-white font-semibold px-4 py-2 rounded-md"
                    // onClick={handleSearch} // Trigger search on button click
                >
                    Search
                </button>
            </div>

            {isLoading ? <p>Loading...</p> : <p className="text-center mb-2">My Plans: {filteredPlans.length}</p>}

            <section className="py-1">
                <div className="w-full xl:w-10/12 mx-auto mt-6">
                    <div className="relative flex flex-col bg-white w-full mb-6 shadow-md rounded-lg">
                        <div className="rounded-t px-4 py-3 border-b flex justify-between items-center">
                            <h3 className="font-semibold text-lg">All Plans</h3>
                            <Link to="/trainer-dashboard/postplans">
                                <button className="bg-green-600 text-white text-xs font-bold uppercase px-4 py-2 rounded">Post A New Plan</button>
                            </Link>
                        </div>

                        {/* Table */}
                        <div className="block w-full overflow-x-auto">
                            <table className="items-center bg-transparent w-full border-collapse">
                                <thead>
                                    <tr className="bg-gray-200">
                                        <th className="px-6 py-3 text-xs uppercase font-semibold text-left">No:</th>
                                        <th className="px-6 py-3 text-xs uppercase font-semibold text-left">Workout Name</th>
                                        <th className="px-6 py-3 text-xs uppercase font-semibold text-left">Min Duration (min)</th>
                                        <th className="px-6 py-3 text-xs uppercase font-semibold text-left">Max Duration (min)</th>
                                        <th className="px-6 py-3 text-xs uppercase font-semibold text-left">Trainer Name</th>
                                        <th className="px-6 py-3 text-xs uppercase font-semibold text-left">Edit</th>
                                        <th className="px-6 py-3 text-xs uppercase font-semibold text-left">Delete</th>
                                    </tr>
                                </thead>

                                <tbody>
                                    {currentPlans.map((plan, index) => (
                                        <tr key={plan._id} className="border-b hover:bg-gray-100">
                                            <td className="px-6 py-4 text-sm">{indexOfFirstItem + index + 1}</td>
                                            <td className="px-6 py-4 text-sm">{plan.workoutName}</td>
                                            <td className="px-6 py-4 text-sm">{plan.minDuration}</td>
                                            <td className="px-6 py-4 text-sm">{plan.maxDuration}</td>
                                            <td className="px-6 py-4 text-sm">{plan.trainerName}</td>
                                            <td className="px-6 py-4 text-sm">
                                                <Link to={`/trainer-dashboard/edit-plans/${plan._id}`}>
                                                    <button className="bg-yellow-500 text-white px-4 py-1 rounded-md">Edit</button>
                                                </Link>
                                            </td>
                                            <td className="px-6 py-4 text-sm">
                                                <button className="bg-red-600 py-2 px-4 text-white rounded-md" onClick={() => handleDelete(plan._id)}>
                                                    Delete
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div className="flex justify-center text-black space-x-8 mt-4">
                        {currentPage > 1 && (
                            <button className="hover:underline" onClick={prePage}>
                                Previous
                            </button>
                        )}
                        {indexOfLastItem < filteredPlans.length && (
                            <button className="hover:underline" onClick={nextPage}>
                                Next
                            </button>
                        )}
                    </div>
                </div>

                {/* New table for requested plans */}
                <div className="w-full xl:w-10/12 mx-auto mt-6">
                    <div className="relative flex flex-col bg-white w-full mb-6 shadow-md rounded-lg">
                        <div className="rounded-t px-4 py-3 border-b flex justify-between items-center">
                            <h3 className="font-semibold text-lg">Requested Plans</h3>
                        </div>

                        <div className="block w-full overflow-x-auto">
                            <table className="items-center bg-transparent w-full border-collapse">
                                <thead>
                                    <tr className="bg-gray-200">
                                        <th className="px-6 py-3 text-xs uppercase font-semibold text-left">No:</th>
                                        <th className="px-6 py-3 text-xs uppercase font-semibold text-left">Workout Name</th>
                                        <th className="px-6 py-3 text-xs uppercase font-semibold text-left">Requested By</th>
                                        <th className="px-6 py-3 text-xs uppercase font-semibold text-left">Goal</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {currentRequestedPlans.map((plan, index) => (
                                        <tr key={plan._id} className="border-b hover:bg-gray-100">
                                            <td className="px-6 py-4 text-sm">{requestedIndexOfFirstItem + index + 1}</td>
                                            <td className="px-6 py-4 text-sm">{plan.name}</td>
                                            <td className="px-6 py-4 text-sm">{plan.email}</td>
                                            <td className="px-6 py-4 text-sm">{plan.goal}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div className="flex justify-center text-black space-x-8 mt-4">
                        {requestedCurrentPage > 1 && (
                            <button className="hover:underline" onClick={preRequestedPage}>
                                Previous
                            </button>
                        )}
                        {requestedIndexOfLastItem < requestedPlans.length && (
                            <button className="hover:underline" onClick={nextRequestedPage}>
                                Next
                            </button>
                        )}
                    </div>
                </div>
            </section>
        </div>
    );
};

export default MyPlans;
