import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import ProtectedRoutes from "./ProtectedRoutes";
import LoginView from "../Pages/LoginPage/LoginView";

//Admin
import HomecookView from "../Pages/AdminView/ProductView/HomecookView";
import SideBarAdmin from "../Component/SidebarComponent/SideBarComponentAdmin";
import HampersView from "../Pages/AdminView/ProductView/Hampers";
import TitipanView from "../Pages/AdminView/ProductView/Titipan";
import ResepView from "../Pages/AdminView/ResepView/ResepView";

//MO
import MOMainView from "../Pages/MOView/MOMainView";
import RUDSKaryawan from "../Pages/MOView/RUDSKaryawan";
import ModalAddKaryawan from "../Pages/MOView/ModalAddKaryawan";

//Owner
import OwnerMainView from "../Pages/OwnerView/OwnerMainView";
import ViewGajiBonus from "../Pages/OwnerView/ViewGajiBonus";

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
                path: "/admin/Resep",
                element: <ResepView />
            }
        ]
    },
    {
        path: "/MO",
        element: (
            <ProtectedRoutes roles={'MO'}>
                <MOMainView />
            </ProtectedRoutes>
        ),
        children: [
            {
                path: "/MO",
                // element: <Dashboard MO />
            },
            {
                path: "/MO/Tambah Karyawan",
                element: <RUDSKaryawan />,
            },
            {
                path: "/MO/Tambah Karyawan/Tambah",
                element: <ModalAddKaryawan />,
            }
        ]
    },
    {
        path: "/owner",
        element: (
            <ProtectedRoutes roles={'Owner'}>
                <OwnerMainView/>
            </ProtectedRoutes>
        ),
        children: [
            {
                path: "/owner/Gaji & Bonus",
                element: <ViewGajiBonus />,
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