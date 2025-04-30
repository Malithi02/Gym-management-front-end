import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import "./App.css";
import { AuthProvider, useAuth } from "./context/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import Login from "./components/Login";
import AdminLayout from "./layouts/AdminLayout";
import TrainerLayout from "./layouts/TrainerLayout";

// Admin Pages
import Appointment from "./Pages/Appointment";
import Feedback from "./Pages/Feedback";
import Plan from "./Pages/Plan";
import Stock from "./Pages/Stock";
import User from "./Pages/User";
import Add from "./Pages/Add";
import List from "./Pages/List";
import EditTrainer from "./Pages/EditTrainer";

// Trainer Pages
import Home from "./Pages/Home";
import CreatePlans from "./Pages/CreatePlans";
import MyPlans from "./Pages/MyPlans";
import UpdatePlan from "./Pages/UpdatePlan";
import PlanDetails from "./Pages/PlanDetails";
import RequestPlan from "./Pages/RequestPlan";
import ReplyRequest from "./Pages/ReplyRequest";
import ReceivedPlans from "./Pages/ReceivedPlans";
import CreateMealPlan from "./Pages/CreateMealPlan";
import DeleteMealPlan from "./Pages/DeleteMealPlan";
import EditMealPlan from "./Pages/EditMealPlan";
import ShowMealPlan from "./Pages/ShowMealPlan";
import MealPlans from "./Pages/MealPlans";
import ProgressAnalysis from "./Pages/ProgressAnalysis";
import SubmitProgress from "./Pages/SubmitProgress";

function AppContent() {
    const { token, loading } = useAuth();
    const [sidebarOpen, setSidebarOpen] = React.useState(true);

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <Routes>
            {/* Public Routes */}
            <Route path="/login" element={<Login />} />

            {/* Protected Admin Routes */}
            {token && (
                <Route
                    path="/admin/*"
                    element={
                        <ProtectedRoute>
                            <AdminLayout sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
                        </ProtectedRoute>
                    }
                >
                    <Route index element={<Navigate to="feedback" />} />
                    <Route path="appointment" element={<Appointment />} />
                    <Route path="feedback" element={<Feedback />} />
                    <Route path="plans" element={<Plan />} />
                    <Route path="stock" element={<Stock />} />
                    <Route path="users" element={<User />} />
                    <Route path="add" element={<Add />} />
                    <Route path="list" element={<List />} />
                    <Route path="edit-trainer/:id" element={<EditTrainer />} />
                </Route>
            )}

            {/* Protected Trainer Routes */}
            {token && (
                <Route
                    path="/trainer/*"
                    element={
                        <ProtectedRoute>
                            <TrainerLayout />
                        </ProtectedRoute>
                    }
                >
                    <Route index element={<Home />} />
                    <Route path="dashboard" element={<MyPlans />} />
                    <Route path="postplans" element={<CreatePlans />} />
                    <Route path="edit-plans/:id" element={<UpdatePlan />} />
                    <Route path="plan/:id" element={<PlanDetails />} />
                    <Route path="request-plan" element={<RequestPlan />} />
                    <Route path="request-plan/:id" element={<ReplyRequest />} />
                    <Route path="myplans" element={<ReceivedPlans />} />
                    <Route path="progress-analysis" element={<ProgressAnalysis />} />
                    <Route path="submit-progress" element={<SubmitProgress />} />
                    <Route path="submit-progress/email/:email" element={<SubmitProgress />} />
                    <Route path="mealplans/create" element={<CreateMealPlan />} />
                    <Route path="mealplans/details/:id" element={<ShowMealPlan />} />
                    <Route path="mealplans" element={<MealPlans />} />
                </Route>
            )}

            {/* Redirects */}
            <Route path="/" element={<Navigate to={token ? "/trainer/dashboard" : "/login"} />} />
            <Route path="*" element={<Navigate to={token ? "/trainer/dashboard" : "/login"} />} />
        </Routes>
    );
}

function App() {
    return (
        <AuthProvider>
            <AppContent />
        </AuthProvider>
    );
}

export default App;
