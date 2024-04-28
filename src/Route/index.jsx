import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ToastContainer } from "react-toastify";

// View Public
import LoginView from "../Pages/LoginPage/LoginView";

// View Admin
import HomecookView from "../Pages/AdminView/ProductView/HomecookView";
import SideBarAdmin from "../Component/SidebarComponent/SideBarComponentAdmin";
import HampersView from "../Pages/AdminView/ProductView/Hampers";
import TitipanView from "../Pages/AdminView/ProductView/Titipan";
import CreateResep from "../Pages/AdminView/ProductView/CreateHomecookView";
import EditResep from "../Pages/AdminView/ProductView/EditHomecookView";
import CreateTitipan from "../Pages/AdminView/ProductView/CreateTitipanView";
import EditTitipan from "../Pages/AdminView/ProductView/EditTitipanView";
import CreateHampers from "../Pages/AdminView/ProductView/CreateHampersView";
import EditHampers from "../Pages/AdminView/ProductView/EditHampersView";
import ProtectedRoutes from "./ProtectedRoutes";

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
            <ProtectedRoutes roles={'Admin'}>
                <SideBarAdmin />
            </ProtectedRoutes>
        ),
        children: [
            {
                path: "/admin",
                // element: <Dashboard Admin />
            },
            {
                path: "/admin/Homecook",
                element: <HomecookView />
            },
            {
                path: "/admin/Hampers",
                element: <HampersView />
            },
            {
                path: "/admin/Titipan",
                element: <TitipanView />
            },
            {
                path: "/admin/create-resep",
                element: <CreateResep />
            },
            {
                path: "/admin/edit-resep",
                element: <EditResep />
            },
            {
                path: "/admin/create-titipan",
                element: <CreateTitipan />
            },
            {
                path: "/admin/edit-titipan",
                element: <EditTitipan />
            },
            {
                path: "/admin/create-hampers",
                element: <CreateHampers />
            },
            {
                path: "/admin/edit-hampers",
                element: <EditHampers />
            }
        ]
    },
    {
        path: "/MO",
        element: (
            <ProtectedRoutes roles={'MO'}>
                {/* Sidebar MO */}
            </ProtectedRoutes>
        ),
        children: [
            {
                path: "/MO",
                // element: <Dashboard MO />
            }
        ]
    },
    {
        path: "/owner",
        element: (
            <ProtectedRoutes roles={'Owner'}>
                {/* Sidebar Owner */}
            </ProtectedRoutes>
        ),
        children: [
            {
                path: "/owner",
                // element: <Dashboard Owner />
            }
        ]
    },
    {
        path: "/customer",
        element: (
            <ProtectedRoutes roles={'Customer'}>
                {/* Sidebar Customer */}
            </ProtectedRoutes>
        ),
        children: [
            {
                path: "/customer",
                // element: <Dashboard Customer />
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