import React, { useState } from "react";

const RequestPlan = () => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        goal: "",
        preferredDays: "",
        additionalInfo: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Send form data to the server
        fetch("http://localhost:3000/requests/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
        })
            .then((res) => res.json())
            .then((data) => {
                console.log("Request submitted:", data);
                alert("Request submitted successfully!");
                setFormData({
                    name: "",
                    email: "",
                    phone: "",
                    goal: "",
                    preferredDays: "",
                    additionalInfo: "",
                });
                window.location.href = "/";
            })
            .catch((err) => {
                console.error("Error submitting request:", err);
                alert("An error occurred. Please try again.");
            });
    };

    return (
        <div className="request-plane p-10 max-w-2xl mx-auto m-10 bg-white shadow-md rounded-md">
            <h2 className="text-2xl font-bold mb-6 text-center">Request a Workout Plan</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                        Name:
                    </label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                    />
                </div>
                <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                        Email:
                    </label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                    />
                </div>
                <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                        Phone:
                    </label>
                    <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        required
                        className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                    />
                </div>
                <div>
                    <label htmlFor="goal" className="block text-sm font-medium text-gray-700">
                        Fitness Goal:
                    </label>
                    <input
                        type="text"
                        id="goal"
                        name="goal"
                        value={formData.goal}
                        onChange={handleChange}
                        required
                        className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                    />
                </div>
                <div>
                    <label htmlFor="preferredDays" className="block text-sm font-medium text-gray-700">
                        Preferred Workout Days:
                    </label>
                    <input
                        type="text"
                        id="preferredDays"
                        name="preferredDays"
                        value={formData.preferredDays}
                        onChange={handleChange}
                        required
                        className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                    />
                </div>
                <div>
                    <label htmlFor="additionalInfo" className="block text-sm font-medium text-gray-700">
                        Additional Information:
                    </label>
                    <textarea
                        id="additionalInfo"
                        name="additionalInfo"
                        value={formData.additionalInfo}
                        onChange={handleChange}
                        className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                    ></textarea>
                </div>
                <button
                    type="submit"
                    className="w-full py-2 px-4 bg-blue-600 text-white bg-black font-semibold rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                >
                    Submit Request
                </button>
            </form>
        </div>
    );
};

export default RequestPlan;
