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
import CreateMealPlan from "../Pages/CreateMealPlan";
import DeleteMealPlan   from "../Pages/DeleteMealPlan";
 import EditMealPlan from  "../Pages/EditMealPlan";
 import ShowMealPlan from "../Pages/ShowMealPlan";
import MealPlans from "../Pages/MealPlans";
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
            {
                path:"mealplans/create",
                element:<CreateMealPlan/>,      },

              {
                path:"mealplans/details/:id",
                element:<ShowMealPlan/>,
              } , 
              {
                path: "mealplans/edit/:id",
                element:<EditMealPlan/>,
            },
            {
                path: "mealplans/delete/:id",
                element:<DeleteMealPlan/>,
            },
            {
                path: "/trainer-dashboard/mealplans",
                element:<MealPlans/>,
            },
        ],
    },
]);

export default router;
