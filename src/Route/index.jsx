import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import LoginView from "../Pages/LoginPage/LoginView";
import ForgotView from "../Pages/ForgotPage/ForgotView";
import HomecookView from "../Pages/AdminView/ProductView/HomecookView";
import AdminLayout from "../Pages/AdminView/AdminLayout";
import HampersView from "../Pages/AdminView/ProductView/Hampers";
import TitipanView from "../Pages/AdminView/ProductView/Titipan";

const router = createBrowserRouter([
    {
        path: "*",
        element: <div>Routes Not Found!</div>
    },
    {
        children: [
            {
                path: "/",
                element: <LoginView />
            },
            {
                path: "/forgot-password",
                element: <ForgotView />
            }
        ]
    },
    {
        path: "/admin",
        element: (
            // Ntar di protect otentikasi sama role
            <AdminLayout />
        ),
        children: [
            {
                path: "/admin/homecook",
                element: <HomecookView />
            },
            {
                path: "/admin/hampers",
                element: <HampersView />
            },
            {
                path: "/admin/titipan",
                element: <TitipanView />
            }
        ]
    }
]);

const AppRouter = () => {
    return (
        <>
            <ToastContainer 
            position="top-right"
            autoClose={2000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="dark"
            />
            <RouterProvider router={router}/>
        </>
    );
};

export default AppRouter;