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
      </Routes>
    </BrowserRouter>
  );
}

export default App;
