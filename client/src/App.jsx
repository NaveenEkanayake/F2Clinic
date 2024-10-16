import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainHome from "./pages/MainHome/MainHome";
import CustomerLogin from "./pages/CustomerLogin/CustomerLogin";
import CustomerRegister from "./pages/CustomerRegister/CustomerRegister";
import HomePage from "./pages/Homepage/HomePage";
import CustomerDashboard from "./pages/CustomerDashboard/CustomerDashboard";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainHome />} />
        <Route path="/customerlogin" element={<CustomerLogin />} />
        <Route path="/customersignup" element={<CustomerRegister />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/customerdashboard" element={<CustomerDashboard />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
