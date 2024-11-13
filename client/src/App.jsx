import React, { useState, useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import PuffLoader from "./components/PuffLoader/PuffLoader";
import { useSelector } from "react-redux";
import MainHome from "./pages/MainHome/MainHome";
import CustomerLogin from "./pages/CustomerLogin/CustomerLogin";
import CustomerRegister from "./pages/CustomerRegister/CustomerRegister";
import HomePage from "./pages/Homepage/HomePage";
import CustomerDashboard from "./pages/CustomerDashboard/CustomerDashboard";
import AppointmentForm from "./components/CustomerDashboardSidebar/AppointmentForm/AppointmentForm";
import ViewAppointment from "./components/ViewAppointment/ViewAppointments";
import PetRecordForm from "./components/PetRecordForm/PetRecordForm";
import ViewPetRecords from "./components/PetRecordForm/ViewPetRecords/ViewPetRecords";
import CustomerNotification from "./components/CustomerNotification/CustomerNotification";
import CustomerContactUs from "./components/CustomerContactus/Customercontactus";
import AdminDashboard from "./pages/AdminDashboard/AdminDashboard";
import AddConsultantForm from "./components/AdminContents/AddConsultantForm/AddConsultantForm";
import ViewConsultant from "./components/AdminContents/ViewConsultant/ViewConsultant";
import InventoryForm from "./components/AdminContents/AddInventory/InventoryForm";
import ViewInventory from "./components/AdminContents/ViewInventory/ViewInventory";
import ConsultantDashboard from "./pages/ConsultantDashboard/ConsultantDasahboard";
import ConsultantPetRecord from "./components/AdminPetRecords/ConsultantPetRecord";
import AdminLogin from "./pages/AdminLogin/AdminLogin";
import ConsultantLogin from "./pages/ConsultantLogin/ConsultantLogin";
import UpdateConsultantForm from "./components/UpdateConsultantForm/UpdateConsultantForm";
import UpdateInventoryForm from "./components/UpdateInventoryForm/UpdateInventoryForm";
import UpdatePetCareForm from "./components/UpdatePetCareSupply/UpdatePetCareForm";
import CreateNotificationForm from "./components/AdminCreateNotification/CreateNotificationForm";
import UpdatePetRecordForm from "./components/UpdatePetRecordForm/UpdatePetRecordForm";
import PaymentForm from "./components/CustomerDashboardSidebar/AppointmentForm/Payment/PaymentForm";
import UpdateAppointmentContent from "./components/UpdateAppointment/UpdateAppointmentContent/UpdateAppointmentContent";
import ConsultantNotification from "./components/ConsultantNotifiaction/Notifiaction";
import ForgotPassword from "./components/CustomerLoginContents/ForgotPassword/ForgotPassword";
import PasswordForm from "./components/CustomerLoginContents/UpdatePasswordForm/PasswordForm";
import AdminSendEmail from "./components/AdminLogin/AdminLoginContents/AdminSendEmail/AdminSendEmail";
import AdminResetForm from "./components/AdminLogin/AdminLoginContents/UpdatePassword/UpdateForm";
import ConsultantSendEmail from "./components/ConsultantLogin/ConsultantLoginContent/ConsultantSendEmail/ConsultantSendEmail";
import ConsultantResetForm from "./components/ConsultantLogin/ConsultantLoginContent/UpdateForm/UpdateForm";
import ViewAdminNotification from "./components/AdminCreateNotification/ViewNotification/ViewAdminNotification";
const withLoading = (Component) => {
  return function WithLoadingComponent(props) {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
      const timer = setTimeout(() => setLoading(false), 3000);
      return () => clearTimeout(timer);
    }, []);

    return loading ? (
      <PuffLoader loading={loading} />
    ) : (
      <Component {...props} />
    );
  };
};

function App() {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const location = useLocation();

  const LoadingMainHome = () => <MainHome />;
  const LoadingCustomerLogin = withLoading(CustomerLogin);
  const LoadingUpdateConsultantForm = withLoading(UpdateConsultantForm);
  const LoadingCustomerRegister = withLoading(CustomerRegister);
  const LoadingHomePage = withLoading(HomePage);
  const LoadingCustomerDashboard = withLoading(CustomerDashboard);
  const LoadingAppointmentForm = withLoading(AppointmentForm);
  const LoadingViewAppointment = withLoading(ViewAppointment);
  const LoadingPetRecordForm = withLoading(PetRecordForm);
  const LoadingViewPetRecords = withLoading(ViewPetRecords);
  const LoadingCustomerNotification = withLoading(CustomerNotification);
  const LoadingCustomerContactUs = withLoading(CustomerContactUs);
  const LoadingAdminLogin = withLoading(AdminLogin);
  const LoadingAdminDashboard = withLoading(AdminDashboard);
  const LoadingAddConsultantForm = withLoading(AddConsultantForm);
  const LoadingViewConsultant = withLoading(ViewConsultant);
  const LoadingInventoryForm = withLoading(InventoryForm);
  const LoadingViewInventory = withLoading(ViewInventory);
  const LoadingConsultantLogin = withLoading(ConsultantLogin);
  const LoadingConsultantDashboard = withLoading(ConsultantDashboard);
  const LoadingConsultantPetRecord = withLoading(ConsultantPetRecord);
  const LoadingUpdateInventoryForm = withLoading(UpdateInventoryForm);
  const LoadingUpdatePetcareForm = withLoading(UpdatePetCareForm);
  const LoadingCreateNotificationForm = withLoading(CreateNotificationForm);
  const LoadingUpdatePetRecordForm = withLoading(UpdatePetRecordForm);
  const LoadingPaymentRecordForm = withLoading(PaymentForm);
  const LoadingUpdateAppointmentForm = withLoading(UpdateAppointmentContent);
  const LoadingNotification = withLoading(ConsultantNotification);
  const LoadingForgotPassword = withLoading(ForgotPassword);
  const LoadingResetPassword = withLoading(PasswordForm);
  const LoadingAdminEmail = withLoading(AdminSendEmail);
  const LoadingResetAdminPassword = withLoading(AdminResetForm);
  const LoadingConsultantEmail = withLoading(ConsultantSendEmail);
  const LoadingResetConsultantPassword = withLoading(ConsultantResetForm);
  const LoadingViewAdminNotification = withLoading(ViewAdminNotification);

  return (
    <Routes>
      <Route path="/" element={<LoadingMainHome />} />
      <Route path="/customerlogin" element={<LoadingCustomerLogin />} />
      <Route path="/customersignup" element={<LoadingCustomerRegister />} />
      <Route path="/home" element={<LoadingHomePage />} />
      <Route path="/customerdashboard" element={<LoadingCustomerDashboard />} />
      <Route path="/appointment" element={<LoadingAppointmentForm />} />
      <Route path="/viewappointment" element={<LoadingViewAppointment />} />
      <Route path="/petRecord" element={<LoadingPetRecordForm />} />
      <Route path="/viewpetRecord" element={<LoadingViewPetRecords />} />
      <Route path="/Notification" element={<LoadingCustomerNotification />} />
      <Route path="/contactus" element={<LoadingCustomerContactUs />} />
      <Route path="/adminlogin" element={<LoadingAdminLogin />} />
      <Route path="/admindashboard" element={<LoadingAdminDashboard />} />
      <Route path="/addconsultant" element={<LoadingAddConsultantForm />} />
      <Route path="/viewconsultant" element={<LoadingViewConsultant />} />
      <Route path="/Inventory" element={<LoadingInventoryForm />} />
      <Route path="/ViewInventory" element={<LoadingViewInventory />} />
      <Route path="/ConsultantLogin" element={<LoadingConsultantLogin />} />
      <Route
        path="/ConsultantforgotPassword"
        element={<LoadingConsultantEmail />}
      />
      <Route
        path="/CustomerForgotPassword"
        element={<LoadingForgotPassword />}
      />
      <Route path="/AdminForgotPassword" element={<LoadingAdminEmail />} />
      <Route
        path="/ResetPassword/:id/:token"
        element={<LoadingResetPassword />}
      />
      <Route
        path="/ResetConsultantPassword/:id/:token"
        element={<LoadingResetConsultantPassword />}
      />
      <Route
        path="/ResetAdminPassword/:id/:token"
        element={<LoadingResetAdminPassword />}
      />
      <Route
        path="/UpdateAppointment/:id"
        element={<LoadingUpdateAppointmentForm />}
      />
      <Route path="/ConsultantNotifiaction" element={<LoadingNotification />} />
      <Route
        path="/AppointmentPayment"
        element={<LoadingPaymentRecordForm />}
      />
      <Route
        path="/updateConsultantForm/:id"
        element={<LoadingUpdateConsultantForm />}
      />
      <Route
        path="/updateInventory/:id"
        element={<LoadingUpdateInventoryForm />}
      />
      <Route
        path="/updatePetcareSupply/:id"
        element={<LoadingUpdatePetcareForm />}
      />
      <Route
        path="/updatePetRecord/:id"
        element={<LoadingUpdatePetRecordForm />}
      />
      <Route
        path="/Consultantdashboard"
        element={<LoadingConsultantDashboard />}
      />
      <Route
        path="/createmessage"
        element={<LoadingCreateNotificationForm />}
      />
           <Route
        path="/adminviewnotification"
        element={<LoadingViewAdminNotification />}
      />
      <Route
        path="/ConsultantpetRecord"
        element={<LoadingConsultantPetRecord />}
      />
    </Routes>
  );
}

export default App;
