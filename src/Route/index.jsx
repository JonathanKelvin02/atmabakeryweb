import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import LoginView from "../LoginPage/LoginView";
import HomecookView from "../AdminView/ProductView/HomecookView";
import AdminLayout from "../AdminView/AdminLayout";

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
            }
        ]
    },
    {
        path: "/admin",
        element: (
            <AdminLayout />
        ),
        children: [
            {
                path: "/admin/homecook",
                element: <HomecookView />
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