import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Swal from "sweetalert2";
import PageHeader from "../components/PageHeader"; // Adjust the path if needed

const PlanDetails = () => {
    const { id } = useParams();
    const [plan, setPlan] = useState({}); // Initialize as an empty object instead of an array

    useEffect(() => {
        fetch(`http://localhost:3000/all-plans/${id}`)
            .then((res) => res.json())
            .then((data) => setPlan(data))
            .catch((error) => console.error("Error fetching plan:", error));
    }, [id]); // Add 'id' as a dependency
    const handleApply = async () => {
        const { value: email } = await Swal.fire({
            title: "Input email address",
            input: "email",
            inputLabel: "Your email address",
            inputPlaceholder: "Enter your email address",
        });
        if (email) {
            Swal.fire(`Entered email: ${email}`);
        }
    };

    return (
        <div className="max-2-screen-2xl container mx-auto xl:px-24 px-4">
            <PageHeader title={"Single Plan Page"} path={"single Page"} />
            <h2>Plan Details: {id}</h2>
            <h1>{plan.workoutName || "Loading..."}</h1> {/* Handle loading state */}
            <button className="bg-blue px-8 py-2 text-white" onClick={handleApply}>
                Allocate Now
            </button>
        </div>
    );
};

export default PlanDetails;
