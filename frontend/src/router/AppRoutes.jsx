import { createBrowserRouter, Route, Routes } from "react-router-dom";
import Order from "../pages/Order";
import TheMapComponent from "../components/TheMapComponent";
import Listings from "../pages/Listings";
import ListingDetail from "../pages/ListingDetail";
import ListingOwnerDetail from "../pages/ListingOwnerDetail";
import HomePage from "../pages/HomePage";
import CustomerSignup from "../pages/authentication/CustomerSignup";
import OwnerSignup from "../pages/authentication/OwnerSignup";
import Login from "../pages/authentication/Login";
import ListingAdd from "../pages/ListingsAdd";
import ListingUpdate from "../pages/ListingUpdate";
import ProfileOwner from "../pages/ProfileCostOwner";
import Register from "../pages/authentication/Register";
import ProfileCustomer from "../pages/ProfileCustomer";
import DataTable from "../pages/DataKos.jsx";
import DataTableApprove from "../pages/DataKosApprove";
import DataTableUser from "../pages/DataKosUser";
import CustomerHome from "../pages/HomeCustomer";
import OwnerHome from "../pages/HomeOwner";
import RiwayatTransaksi from "../pages/RiwayatTransaksi";
import ResetPassword from "../pages/authentication/PasswordReset";
import SendPasswordResetEmail from "../pages/authentication/SendPasswordResetEmail";
import ChangePassword from "../pages/authentication/PasswordChange";
import RulesPage from "../pages/RulesPage";
import Kamar from "../pages/Kamar";
import DataKamar from "../pages/DataKamar";
import KamarUpdate from "../pages/KamarUpdate";
import KamarDetail from "../pages/KamarDetail";
import KamarAdd from "../pages/KamarAdd";


const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/customer/signup" element={<CustomerSignup />} />
      <Route path="/owner/signup" element={<OwnerSignup />} />
      <Route path="/customer/home" element={<CustomerHome />} />
      <Route path="/owner/home" element={<OwnerHome />} />
      <Route path="/login" element={<Login />} />
      <Route path="/syarat_ketentuan" element={<RulesPage />} />
      <Route path="/pesan_kamar/:id" element={<Kamar />} />
      <Route path="/data-kamar/:id" element={<DataKamar />} />
      <Route path="/kamar-update/:id" element={<KamarUpdate />} />
      <Route path="/kamar-detail/:id" element={<KamarDetail />} />
      <Route path="/kamar-add/:id" element={<KamarAdd />} />

      <Route path="api/user/reset/:id/:token" element={<ResetPassword />} />
      <Route
        path="/sendpasswordresetemail"
        element={<SendPasswordResetEmail />}
      />
      <Route path="/changePassword" element={<ChangePassword />} />

      <Route path="/listings" element={<Listings />} />
      <Route path="/register" element={<Register />} />
      <Route path="/coba" element={<TheMapComponent />} />
      <Route path="/order/:id/:rumah" element={<Order />} />
      <Route path="/profileOwner" element={<ProfileOwner />} />
      <Route path="/profileCustomer" element={<ProfileCustomer />} />
      <Route path="/listings/:id" element={<ListingDetail />} />
      <Route path="/listingadd" element={<ListingAdd />} />
      <Route path="/listingupdate/:id" element={<ListingUpdate />} />
      <Route path="/listingsOwner/:id" element={<ListingOwnerDetail />} />
      <Route path="/datakos" element={<DataTable />} />
      <Route path="/datakosApprove/:id" element={<DataTableApprove />} />
      <Route path="/datakosUser/:id" element={<DataTableUser />} />
      <Route path="/riwayatTransaksi" element={<RiwayatTransaksi />} />
    </Routes>
  );
};

export default AppRoutes;
