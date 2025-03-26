import React, { useEffect, useState } from "react";

const ReceivedPlans = () => {
    const [plans, setPlans] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const userEmail = "snru@gm.com"; // Replace with dynamic email when available

    useEffect(() => {
        const fetchPlans = async () => {
            try {
                const response = await fetch(`http://localhost:3000/reply/${userEmail}`);
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
        <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
            <h1 style={{ textAlign: "center", color: "#333" }}>Received Plans</h1>
            {plans.length === 0 ? (
                <p style={{ textAlign: "center", color: "#777" }}>No plans received yet.</p>
            ) : (
                <ul style={{ listStyleType: "none", padding: 0 }}>
                    {plans.map((plan) => (
                        <li
                            key={plan.id}
                            style={{
                                border: "1px solid #ddd",
                                borderRadius: "8px",
                                padding: "15px",
                                marginBottom: "10px",
                                backgroundColor: "#f9f9f9",
                            }}
                        >
                            <h3 style={{ margin: "0 0 10px", color: "#555" }}>{plan.title}</h3>
                            <p style={{ margin: "5px 0", color: "#666" }}>{plan.description}</p>
                            <p style={{ margin: "5px 0", color: "#666" }}>
                                <strong>Trainer:</strong> {plan.trainerName}
                            </p>
                            <p style={{ margin: "5px 0", color: "#666" }}>
                                <strong>Date:</strong> {plan.date}
                            </p>
                            <p style={{ margin: "5px 0", color: "#666" }}>
                                <strong>Plan Details:</strong> {plan.replyMessage}
                            </p>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default ReceivedPlans;
