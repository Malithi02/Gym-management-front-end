import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const ReplyRequest = () => {
    const { id } = useParams(); // Get the id from URL parameters
    const [requestDetails, setRequestDetails] = useState(null);
    const [reply, setReply] = useState("");

    useEffect(() => {
        // Fetch the request details using the id
        const fetchRequestDetails = async () => {
            try {
                const response = await fetch(`http://localhost:3000/requests/${id}`);
                const data = await response.json();
                setRequestDetails(data);
            } catch (error) {
                console.error("Error fetching request details:", error);
            }
        };

        fetchRequestDetails();
    }, [id]);

    const handleReplySubmit = async () => {
        try {
            const response = await fetch(`/api/requests/${id}/reply`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ reply }),
            });
            if (response.ok) {
                alert("Reply sent successfully!");
                setReply("");
            } else {
                alert("Failed to send reply.");
            }
        } catch (error) {
            console.error("Error sending reply:", error);
        }
    };

    return (
        <div className="p-6 bg-gray-100 min-h-screen">
            <h1 className="text-2xl font-bold mb-4">Request Details</h1>
            {requestDetails ? (
                <div className="bg-white p-4 rounded shadow mb-6">
                    <p className="mb-2">
                        <strong>ID:</strong> {requestDetails._id}
                    </p>
                    <p className="mb-2">
                        <strong>Name:</strong> {requestDetails.name}
                    </p>
                    <p className="mb-2">
                        <strong>Email:</strong> {requestDetails.email}
                    </p>
                    <p className="mb-2">
                        <strong>Phone:</strong> {requestDetails.phone}
                    </p>
                    <p className="mb-2">
                        <strong>Goal:</strong> {requestDetails.goal}
                    </p>
                    <p className="mb-2">
                        <strong>Preferred Days:</strong> {requestDetails.preferredDays}
                    </p>
                    <p className="mb-2">
                        <strong>Message:</strong> {requestDetails.additionalInfo}
                    </p>
                </div>
            ) : (
                <p className="text-gray-500">Loading...</p>
            )}
            <div className="bg-white p-4 rounded shadow">
                <h2 className="text-xl font-semibold mb-4">Send a Reply</h2>
                <textarea
                    className="w-full p-2 border border-gray-300 rounded mb-4"
                    value={reply}
                    onChange={(e) => setReply(e.target.value)}
                    placeholder="Type your reply here..."
                />
                <button className="bg-blue-500 text-white bg-black px-4 py-2 rounded hover:bg-blue-600" onClick={handleReplySubmit}>
                    Send Reply
                </button>
            </div>
        </div>
    );
};

export default ReplyRequest;
