import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const MyPlans = () => {
    const [plans, setPlans] = useState([]);
    const [filteredPlans, setFilteredPlans] = useState([]); // Store original data separately
    const [isLoading, setIsLoading] = useState(true);
    const [searchText, setSearchText] = useState("");
    const email = "gthd@gmail.com";

    // Pagination
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 4;

    useEffect(() => {
        setIsLoading(true);
        fetch(`http://localhost:3000/my-workout-plans/${email}`)
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

    // Filter plans when searching
    const handleSearch = () => {
        if (searchText.trim() === "") {
            setFilteredPlans(plans);
        } else {
            const filtered = plans.filter((plan) => plan.workoutName.toLowerCase().includes(searchText.toLowerCase()));
            setFilteredPlans(filtered);
        }
    };

    useEffect(() => {
        handleSearch(); // Trigger search whenever searchText changes
    }, [searchText]);

    // Pagination calculations
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentPlans = filteredPlans.slice(indexOfFirstItem, indexOfLastItem);

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

    const handleDelete = (id) => {
        const confirmDelete = window.confirm("Are you sure you want to delete this workout plan?");
        if (!confirmDelete) return;

        fetch(`http://localhost:3000/my-workout-plans/${id}`, {
            method: "DELETE",
        })
            .then((res) => {
                res.json();
                window.location.reload();
            })
            .then((data) => {
                if (data.acknowledged) {
                    alert("Workout Plan Deleted Successfully!");
                    setPlans(plans.filter((plan) => plan._id !== id));
                }
            })
            .catch((err) => {
                console.error("Error deleting plan:", err);
                alert("Failed to delete the workout plan. Please try again.");
            });
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
                    onClick={handleSearch} // Trigger search on button click
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
                            <Link to="/postplans">
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
                                                <Link to={`/edit-plans/${plan._id}`}>
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
                </div>

                {/* Pagination Controls */}
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
            </section>
        </div>
    );
};

export default MyPlans;
