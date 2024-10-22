import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainHome from "./pages/MainHome/MainHome";
import CustomerLogin from "./pages/CustomerLogin/CustomerLogin";
import CustomerRegister from "./pages/CustomerRegister/CustomerRegister";
import HomePage from "./pages/Homepage/HomePage";
import CustomerDashboard from "./pages/CustomerDashboard/CustomerDashboard";
import AppointmentForm from "./components/CustomerDashboardSidebar/AppointmentForm/AppointmentForm";
import ViewAppointment from "./components/ViewAppointment/ViewAppointments";
import PetRecordForm from "./components/PetRecordForm/PetRecordForm";
import ViewPetRecords from "./components/PetRecordForm/ViewPetRecords/ViewPetRecords";
import PetCareSupplies from "./components/PetCareSupplies/PetCareSupplies";
import CustomerNotification from "./components/CustomerNotification/CustomerNotification";
import CustomerContactUs from "./components/CustomerContactus/Customercontactus";
import AdminDashboard from "./pages/AdminDashboard/AdminDashboard";
import AddConsultantForm from "./components/AdminContents/AddConsultantForm/AddConsultantForm";
import ViewConsultant from "./components/AdminContents/ViewConsultant/ViewConsultant";
import AdminNotification from "./components/AdminContents/AdminNotification/AdminNotification/AdminNotification";
import AddPetCareContent from "./components/AdminContents/AddPetCare/AddPetcareContent";
import AddPetCareMain from "./components/AdminContents/AddPetcareMain/AddPetCareMain";
import ViewPetCare from "./components/AdminContents/AddPetCare/ViewPetCare/ViewPetCare";
import InventoryForm from "./components/AdminContents/AddInventory/InventoryForm";
import ViewInventory from "./components/AdminContents/ViewInventory/ViewInventory";
import ConsultantDashboard from "./pages/ConsultantDashboard/ConsultantDasahboard";
import ConsultantPetRecord from "./components/AdminPetRecords/ConsultantPetRecord";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainHome />} />
        <Route path="/customerlogin" element={<CustomerLogin />} />
        <Route path="/customersignup" element={<CustomerRegister />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/customerdashboard" element={<CustomerDashboard />} />
        <Route path="/appointment" element={<AppointmentForm />} />
        <Route path="/viewappointment" element={<ViewAppointment />} />
        <Route path="/petRecord" element={<PetRecordForm />} />
        <Route path="/viewpetRecord" element={<ViewPetRecords />} />
        <Route path="/petcaresupplies" element={<PetCareSupplies />} />
        <Route path="/Notification" element={<CustomerNotification />} />
        <Route path="/contactus" element={<CustomerContactUs />} />
        <Route path="/admindashboard" element={<AdminDashboard />} />
        <Route path="/addconsultant" element={<AddConsultantForm />} />
        <Route path="/viewconsultant" element={<ViewConsultant />} />
        <Route path="/adminNotification" element={<AdminNotification />} />
        <Route path="/addpetcare" element={<AddPetCareMain />} />
        <Route path="/viewpetcare" element={<ViewPetCare />} />
        <Route path="/Inventory" element={<InventoryForm />} />
        <Route path="/ViewInventory" element={<ViewInventory />} />
        <Route path="/Consultantdashboard" element={<ConsultantDashboard />} />
        <Route path="/ConsultantpetRecord" element={<ConsultantPetRecord />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
