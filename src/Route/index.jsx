import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import TopNavBar from "../Component/TopNavBarComponent/TopNavbarForAuth";

// General Access View
import LoginView from "../Pages/LoginPage/LoginView";
import RegisterForm from "../Pages/LoginPage/FormRegister"
import LoginForm from "../Pages/LoginPage/FormLogin";
import ForgotForm from "../Pages/ForgotPage/FormForgot";
import ResetForm from "../Pages/ResetPasswordPage/ResetForm";

import CustomerHomeView from "../Pages/CustomerView/HomepageView/Homepage";
import MainHomepageContent from "../Pages/CustomerView/HomepageView/ContentHomepageView";
import ShowPesananViewCustomer from "../Pages/CustomerView/PesananView/ShowPesananView";

import TempPDF from "../Component/PDF/tempPdf";

// Admin Access View
import HomecookView from "../Pages/AdminView/ProductView/HomecookView";
import SideBarAdmin from "../Component/SidebarComponent/SideBarComponentAdmin";
import HampersView from "../Pages/AdminView/ProductView/Hampers";
import TitipanView from "../Pages/AdminView/ProductView/Titipan";

import BahanBakuView from "../Pages/AdminView/BahanBakuView/BahanBaku";
import PenitipView from "../Pages/AdminView/PenitipPage/Penitip";

import CreateResep from "../Pages/AdminView/ProductView/CreateHomecookView";
import EditResep from "../Pages/AdminView/ProductView/EditHomecookView";
import CreateTitipan from "../Pages/AdminView/ProductView/CreateTitipanView";
import EditTitipan from "../Pages/AdminView/ProductView/EditTitipanView";
import CreateHampers from "../Pages/AdminView/ProductView/CreateHampersView";
import EditHampers from "../Pages/AdminView/ProductView/EditHampersView";

import ResepView from "../Pages/AdminView/ResepView/ResepView";

import CustomerAdminView from "../Pages/AdminView/CustomerView/Customer";
import OrderHistoryView from "../Pages/AdminView/CustomerView/OrderHistory";
import SaldoView from "../Pages/AdminView/SaldoView/SaldoView";

import ShowAlamatCustomer from "../Pages/AdminView/AlamatView/ShowAllAlamatCustomer";
import ShowAllAlamatNoJarak from "../Pages/AdminView/AlamatView/ShowAllAlamatNoJarak";

import ConfirmPesanan from "../Pages/AdminView/PesananView/ConfirmPesanan";
import ShowProcessPesanan from "../Pages/AdminView/PesananView/ShowProcessPesanan";

// MO Access View
import MOMainView from "../Pages/MOView/MOMainView";
import RUDSKaryawan from "../Pages/MOView/RUDSKaryawan";
import ModalAddKaryawan from "../Pages/MOView/ModalAddKaryawan";

import ProcessingPesananView from "../Pages/MOView/ProcessingPage/ProcessingView";
import MaterialView from "../Pages/MOView/MaterialPage/MaterialView";

import PengeluaranView from "../Pages/MOView/PengeluaranPage/Pengeluaran";
import KonfirmasiPesananView from "../Pages/MOView/KonfirmasiPesananPage/KonfirmasiPesanan";
import ListLaporanView from "../Pages/MOView/LaporanPage/Laporan";
import LaporanPBBView from "../Pages/MOView/Laporan/LaporanPenggunaanBahanBaku/LaporanPBBView";
import LaporanPKView from "../Pages/MOView/Laporan/LaporanPenjualanKeseluruhan/LaporanPKView";
import LaporanBulananView from "../Pages/MOView/Laporan/LaporanPenjualanProdukPerBulan/LaporanBulananView";
import LaporanStokBahan from "../Pages/MOView/Laporan/LaporanStokBahan/LaporanStokBahanView";

// Owner Access View
import OwnerMainView from "../Pages/OwnerView/OwnerMainView";
import ViewGajiBonus from "../Pages/OwnerView/ViewGajiBonus";
import LaporanPBBOwnerView from "../Pages/OwnerView/Laporan/LaporanPenggunaanBahanBaku/LaporanPBBOwnerView";
import LaporanPKOwnerView from "../Pages/OwnerView/Laporan/LaporanPenjualanKeseluruhan/LaporanPKOwnerView";

import OwnerLaporanBulananView from "../Pages/OwnerView/Laporan/LaporanPenjualanProdukPerBulan/LaporanBulananView";
import OwnerLaporanStokBahan from "../Pages/OwnerView/Laporan/LaporanStokBahan/LaporanStokBahanView";

//Customer View
import CustomerView from "../Pages/CustomerView/CustomerView";
import ShowProfileCustomer from "../Pages/CustomerView/ProfileView/ShowProfileCustomer";
import ShowHistoryCustomer from "../Pages/CustomerView/HistoryView/ShowHistoryCustomer";
import ShowAlamat from "../Pages/CustomerView/AlamatView/ShowAlamat";

import TransaksiBahan from "../Pages/MOView/ShopBahanView/ListTransaksiBK";

import ShowProductCust from "../Pages/CustomerView/ListProductView/ShowAllProduct";
import ProductDetails from "../Pages/CustomerView/ListProductView/ProductDetails";
import Cart from "../Pages/CustomerView/CartView/Cart";
import ShoppingView from "../Pages/CustomerView/ShopView/Shop";
import YourOrderView from "../Pages/CustomerView/CompleteOrderView/YourOrder";

import ProtectedRoutes from "./ProtectedRoutes";




const router = createBrowserRouter([
    {
        path: "*",
        element: <div>Routes Not Found!</div>
    },
    {
        path: "/tempPdf",
        element: (
            <TempPDF />
        )
    },
    {
        path: "/",
        element:(
            <TopNavBar />
        ),
        children: [
            {
                path: "/",
                element: <LoginView />,
                children: [
                    {
                        path: "/",
                        element: <LoginForm />
                    },
                    {
                        path: "/register",
                        element: <RegisterForm/>
                    },
                    {
                        path: "/forgot-password",
                        element: <ForgotForm />
                    },
                    {
                        path: "/reset-password",
                        element: <ResetForm />
                    }
                ]
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
                path: "/admin/BahanBaku",
                element: <BahanBakuView />
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
            },
            {
                path :"/admin/Resep",
                element: <ResepView />
            },
            {
                path :"/admin/Customer",
                element: <CustomerAdminView />
            },
            {
                path: "/admin/Customer/OrderHistory",
                element: <OrderHistoryView />
            },
            {
                path: "/admin/Saldo",
                element: <SaldoView />
            },
            {
                path:"/admin/Tampil Alamat",
                element: <ShowAlamatCustomer />
            },
            {
                path: "/admin/Jarak dan Biaya",
                element: <ShowAllAlamatNoJarak />
            },
            {
                path: "/admin/Ubah Status",
                element: <ConfirmPesanan />
            },
            {
                path: "/admin/Tampil Pesanan",
                element: <ShowProcessPesanan />
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
            },
            {
                path: "/MO/Pengeluaran",
                element: <PengeluaranView />,
            },
            {
                path: "/MO/Pasokan",
                element: <TransaksiBahan />,
            },
            {
                path: "/MO/Penitip",
                element: <PenitipView />
            },
            {
                path: "/MO/Pesanan",
                element: <KonfirmasiPesananView />
            },
            {
                path: "/MO/Laporan",
                element: <ListLaporanView />
            },
            {
                path : "/MO/Penjualan Keseluruhan",
                element: <LaporanPKView />
            },
            {
                path :"/MO/Penggunaan Bahan Baku",
                element: <LaporanPBBView />
            },
            {
                path :"/MO/Processing",
                element: <ProcessingPesananView />
            },
            {
                path :"/MO/Material",
                element: <MaterialView />
            },
            {
                path :"/MO/Laporan Bulanan",
                element: <LaporanBulananView />
            },
            {
                path :"/MO/Laporan Stok Bahan",
                element: <LaporanStokBahan />
            },
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
            },
            {
                path: "/owner/Penjualan Keseluruhan",
                element: <LaporanPKOwnerView/>
            },
            {
                path: "/owner/Penggunaan Bahan Baku",
                element: <LaporanPBBOwnerView/>
            },
            {
                path :"/owner/Laporan Bulanan",
                element: <OwnerLaporanBulananView />
            },
            {
                path :"/owner/Laporan Stok Bahan",
                element: <OwnerLaporanStokBahan />
            },
        ]
    },
    {
        path: "/customer",
        element: (
            <ProtectedRoutes roles={'Customer'}>
                <CustomerHomeView/>
            </ProtectedRoutes>
        ),
        children: [
            {
                path: "/customer",
                element: <MainHomepageContent />
            },
            {
                path: "/customer/Profile",
                element: <ShowProfileCustomer/>
            },
            {
                path: "/customer/History",
                element: <ShowHistoryCustomer/>
            },
            {
                path: "/customer/Produk",
                element: <ShowProductCust />
            },
            {
                path: "/customer/Produk-details",
                element: <ProductDetails />
            },
            {
                path: "/customer/Cart",
                element: <Cart />
            },
            {
                path: "/customer/Shopping",
                element: <ShoppingView />
            },
            {
                path: "/customer/Nota",
                element: <YourOrderView />
            },
            {
                path: "/customer/Alamat",
                element: <ShowAlamat/>
            },
            {
                path: "/customer/Pesanan",
                element: <ShowPesananViewCustomer />
            }
        ]
    },
    {
        path: "/AtmaBakery",
        element: <CustomerHomeView/>,
        children: [
            {
                path: "/AtmaBakery",
                element: <MainHomepageContent />
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