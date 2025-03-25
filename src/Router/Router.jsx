import { createBrowserRouter } from "react-router-dom";
import App from "../App";  
import Home from "../Pages/Home";
import About from "../Pages/About"; 
import CreatePlans from "../Pages/CreatePlans";
import MyPlans from "../Pages/MyPlans";
import UpdatePlan from "../Pages/UpdatePlan";
import PlanDetails from "../Pages/planDetails";
//import Login from "../"
// ✅ Correct

const router = createBrowserRouter([
    {
      path: "/",
      element: <App />,
      children: [
        { path: "/", element: <Home /> },
        { path: "/postplans", element: <CreatePlans /> },
        { path: "/my-workout-plans", element: <MyPlans /> } ,// ✅ Ensure correct route
        { path:  "/edit-plans/:id", element: <UpdatePlan/>,
          loader:({params}) => fetch(`http://localhost:3000/all-plans/${params.id}`),
        },
        { path: "/plan/:id", element: <PlanDetails /> }, // ✅ Fixed route
      ],
    },
]);

export default router;
