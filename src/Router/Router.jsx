import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from "../Pages/Home";
import About from "../Pages/About";
import CreatePlans from "../Pages/CreatePlans";
import MyPlans from "../Pages/MyPlans";
import UpdatePlan from "../Pages/UpdatePlan";
import PlanDetails from "../Pages/PlanDetails";
import RequestPlan from "../Pages/RequestPlan";
import ReplyRequest from "../Pages/ReplyRequest";
import ReceivedPlans from "../Pages/ReceivedPlans";
//import Login from "../"
// ✅ Correct

const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children: [
            { path: "/", element: <Home /> },
            { path: "/trainer-dashboard/postplans", element: <CreatePlans /> },
            { path: "/trainer-dashboard", element: <MyPlans /> }, // ✅ Ensure correct route
            {
                path: "/trainer-dashboard/edit-plans/:id",
                element: <UpdatePlan />,
                loader: ({ params }) => fetch(`http://localhost:3000/plans/${params.id}`),
            },
            { path: "/plan/:id", element: <PlanDetails /> }, // ✅ Fixed route
            {
                path: "/request-plan",
                element: <RequestPlan />,
            },
            {
                path: "/request-plan/:id",
                element: <ReplyRequest />,
            },
            {
                path: "/myplans",
                element: <ReceivedPlans />,
            },
        ],
    },
]);

export default router;
