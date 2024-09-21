import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./Homepage/Home.jsx";
import Regi from "./Register/Register.jsx";
import Admin from "../src/AdminDashboard/AdminDash.jsx";
import AddConsultant from "./AddConsultant/Addconsultant.jsx";
import Inventory from "../src/Inventory/Inventory.jsx";
import Update from "../src/UpdateConsultant/Update.jsx";
import Login from "./Login/login.jsx";
import Viewinventory from "../src/ViewInventory/ViewInventory";
import UpdateInventory from "../src/Updateinventory/Updateinventory.jsx";
import Adminlogin from "../src/Adminlogin/Adminlogin.jsx";
import Dash from "../src/UserDashboard/Dash.jsx";
import Addinfo from "../src/Useradddetails/Addinfo.jsx";
import Settings from "../src/UserSettings/Settings.jsx";
import Makeanappointment from "./MakeanAppointment/index.jsx";
import ViewAppointment from "./ViewAppointment/index.jsx";
import Payment from "./Payment/index.jsx";
import Consultantlogin from "./Consultantlogin/index.jsx";
import ConsultantDashboard from "./ConsultantDashboard/index.jsx";
import ConsultantSettings from "./SettingsConsultant/index.jsx";
import PetRecord from "../src/ConsultantTable2/index.jsx";
import ContactUs from "./Contactus/index.jsx";
import { initializeApp } from "firebase/app";

import firebase from "firebase/compat/app";

import "firebase/storage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/Home",
    element: <Home />,
  },
  {
    path: "/About",
    element: <Home />,
  },
  {
    path: "/Register",
    element: <Regi />,
  },
  {
    path: "/Admin",
    element: <Admin />,
  },
  {
    path: "/Addconsultant",
    element: <AddConsultant />,
  },
  {
    path: "/Inventory",
    element: <Inventory />,
  },
  {
    path: "/Update/:id",
    element: <Update />,
  },
  {
    path: "/loginCustomer",
    element: <Login />,
  },
  {
    path: "/Viewinventory",
    element: <Viewinventory />,
  },
  {
    path: "/UpdateInventory/:id",
    element: <UpdateInventory />,
  },
  {
    path: "/Adminlogin",
    element: <Adminlogin />,
  },
  {
    path: "/Dash",
    element: <Dash />,
  },
  {
    path: "/Addinfo",
    element: <Addinfo />,
  },
  {
    path: "/Settings",
    element: <Settings />,
  },
  {
    path: "/ConsultantDashboard",
    element: <ConsultantDashboard />,
  },
  {
    path: "/Makeappoint",
    element: <Makeanappointment />,
  },
  {
    path: "/View",
    element: <ViewAppointment />,
  },
  {
    path: "/Payment",
    element: <Payment />,
  },
  {
    path: "/Consultantlogin",
    element: <Consultantlogin />,
  },
  {
    path: "/ConsultantSettings",
    element: <ConsultantSettings />,
  },
  {
    path: "/PetRecord",
    element: <PetRecord />,
  },
  {
    path: "/contactus",
    element: <ContactUs />,
  },
]);

const firebaseConfig = {
  apiKey: "AIzaSyAXhfcMmfQBS8k44i1OKJ1DfPhVcOWnkSE",
  authDomain: "furrypetclinic.firebaseapp.com",
  projectId: "furrypetclinic",
  storageBucket: "furrypetclinic.appspot.com",
  messagingSenderId: "420072492385",
  appId: "1:420072492385:web:bb4089e6fc84f5ff0f8920",
  measurementId: "G-LYRG1GGPMM",
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
