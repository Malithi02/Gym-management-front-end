import React, { useEffect, useState } from "react";

const ReceivedPlans = () => {
    const [plans, setPlans] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const userEmail = "placeholder@example.com"; // Replace with dynamic email when available

    useEffect(() => {
        const fetchPlans = async () => {
            try {
                const response = await fetch(`http://localhost:3000/requests/received?email=${userEmail}`);
                if (!response.ok) {
                    throw new Error("Network response was not ok");
                }
                const data = await response.json();
                setPlans(data);
            } catch (err) {
                setError("Failed to fetch plans. Please try again later.");
            } finally {
                setLoading(false);
            }
        };

        fetchPlans();
    }, [userEmail]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div>
            <h1>Received Plans</h1>
            {plans.length === 0 ? (
                <p>No plans received yet.</p>
            ) : (
                <ul>
                    {plans.map((plan) => (
                        <li key={plan.id}>
                            <h3>{plan.title}</h3>
                            <p>{plan.description}</p>
                            <p>
                                <strong>Trainer:</strong> {plan.trainerName}
                            </p>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default ReceivedPlans;
