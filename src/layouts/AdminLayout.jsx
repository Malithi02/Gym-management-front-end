import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AdminLayout = ({ sidebarOpen, setSidebarOpen }) => {
    return (
        <div className="bg-gray-900 min-h-screen text-gray-200">
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
                theme="dark"
            />
            <div className="flex pt-16">
                <Sidebar open={sidebarOpen} setOpen={setSidebarOpen} />
                <div className={`transition-all duration-300 min-h-[calc(100vh-4rem)] ${sidebarOpen ? "ml-64" : "ml-20"} w-full p-6`}>
                    <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
                        <Outlet />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminLayout;
