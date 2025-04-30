import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const TrainerLayout = () => {
    return (
        <div className="min-h-screen bg-gray-100">
            <ToastContainer
                position="top-right"
                autoClose={3000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
            />
            <Navbar />
            <div className="pt-16 p-6">
                <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
                    <Outlet />
                </div>
            </div>
        </div>
    );
};

export default TrainerLayout;
