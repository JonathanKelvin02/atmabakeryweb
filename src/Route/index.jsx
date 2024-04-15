import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import ProtectedRoutes from "./ProtectedRoutes";

const router = createBrowserRouter([
    {
        path: "*",
        element: <div>Routes Not Found!</div>,
    },
    {
        children: [
            {
                path: "/",
                // element: <LoginPage />,
            },
            {
                path: "/register",
                // element: <RegisterPage />,
            },
        ],
    },
    {
        path: "/user",
        element: (
            <ProtectedRoutes>
                {/* <UserLayout /> */}
            </ProtectedRoutes>
        ),
        children: [
            {
                path: "/user",
                // element: <DashboardPage />,
            },
            {
                path: "/user/content",
                // element: <ContentPage />,
            },
            {
                path: "/user/content/review",
                // element: <ReviewPage />,
            },
            {
                path: "/user/profile",
                // element: <MyProfilePage />,
            },
        ],
    },
]);

const AppRouter = () => {
    return (
        <>
            <RouterProvider router={router} />
        </>
    );
};

export default AppRouter;