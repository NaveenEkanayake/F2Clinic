import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { HiMenuAlt3, HiBell } from "react-icons/hi";
import { IoHomeOutline } from "react-icons/io5";
import { FaUserAlt, FaEnvelope, FaSearch } from "react-icons/fa";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import Logo from "../assets/logo.png";
import "./AdminDash.css";
import Clock from "../Clock.jsx";
import backgroundImage from "../assets/backadmin.jpg";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Icon } from "@iconify/react";
import axios from "axios";
import { saveAs } from "file-saver";
import {
  PDFViewer,
  Document,
  Page,
  pdf,
  Text,
  Image,
  View,
  StyleSheet,
} from "@react-pdf/renderer";
import Sidebar from "../AdminSidebar/Sidebar.jsx";
import Navbar from "../AdminNav/Navbar.jsx";

const AdminDashboard = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [date, setDate] = useState(new Date());
  const [consultants, setConsultants] = useState([]);
  const [deletedConsultant, setDeletedConsultant] = useState(null);
  const [error, setError] = useState(null);
  const [recentActivity, setRecentActivity] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);
  const inputRef = useRef(null);
  const hour = date.getHours() * 30;
  const minute = date.getMinutes() * 6;
  const second = date.getSeconds() * 6;
  const [isSearchExpanded, setIsSearchExpanded] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setDate(new Date());
    }, 1000);

    return () => clearInterval(interval);
  }, [date]);

  setTimeout(() => see(true)), [1500];

  const toggleSearch = () => {
    setIsSearchExpanded(!isSearchExpanded);
  };

  const handleSearchClick = async () => {
    const email = inputRef.current.value.trim();
    if (email) {
      try {
        setLoading(true);
        const response = await fetch(
          `http://localhost:3000/api/consultants/email/${email}`
        );
        const data = await response.json();
        if (!response.ok) {
          throw new Error(data.error);
        }
        setConsultants([data]);
        setError(null);
      } catch (error) {
        setConsultants([]);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    }
  };
  useEffect(() => {
    fetchConsultants();
  }, []);
  const fetchConsultants = async () => {
    try {
      setLoading(true);
      const response = await fetch("http://localhost:3000/api/consultants");
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      setTimeout(() => {
        setLoading(false);
      }, [1000]);

      if (data.length > consultants.length) {
        const addedConsultants = data.filter(
          (consultant) => !consultants.some((c) => c.id === consultant.id)
        );

        const recentActivities = addedConsultants.map((consultant) => {
          return (
            <div
              key={consultant.id}
              className="recent-activity justify-center flex flex-row "
            >
              <div className="dot green-dot mr-2"></div>
              <p>You have added a new Consultant!!!</p>
            </div>
          );
        });

        setRecentActivity([...recentActivity, ...recentActivities]);
      }
      setConsultants(data);
    } catch (error) {
      console.error("Error fetching consultants:", error);
    }
  };

  const sendDeletionNotificationEmail = async (email, firstName, lastName) => {
    try {
      setLoading(true);
      console.log("email", email, firstName, lastName);
      const emailResponse = await axios.post(
        "http://localhost:3000/api/sendEmail",
        {
          userEmail: email,
          subject: "Profile Deletion Notification",
          html: `
          <html>
            <head>
              <style>
                /* Email styling */
                body {
                  font-family: Arial, sans-serif;
                  line-height: 1.6;
                  color: #333;
                }
                .container {
                  max-width: 600px;
                  margin: 0 auto;
                  padding: 20px;
                  border: 1px solid #ccc;
                  border-radius: 5px;
                  background-color: #ffffff;
                }
                h1 {
                  color: #333;
                }
                p {
                  margin-bottom: 15px;
                }
                .footer {
                  margin-top: 30px;
                  padding-top: 20px;
                  border-top: 1px solid #ccc;
                }
              </style>
            </head>
            <body>
              <div class="container">
                <!-- Logo -->
                <img src="https://firebasestorage.googleapis.com/v0/b/furrypetclinic.appspot.com/o/logo.png?alt=media&token=b5630494-77ec-486a-9374-8611de5f0756" alt="Furry Pet Clinic Logo" style="max-width: 40px;">
                <!-- End of Logo -->
                <h1>Profile Deletion Notification</h1>
                <!-- Inside the body of the email -->
                <p>Dear ${firstName} ${lastName},</p>              
                <p>We regret to inform you that your profile has been deleted from our system. If you have any questions or concerns regarding this action, please don't hesitate to contact us.</p>
                <p>Thank you for your understanding.</p>
                <div class="footer">
                  <p>Best regards,</p>
                  <p>The Furry Pet Clinic Team</p>
                </div>
              </div>
            </body>
          </html>
          `,
        }
      );

      console.log(
        "Deletion notification email sent successfully:",
        emailResponse.data
      );
    } catch (error) {
      console.error("Error sending deletion notification email:", error);
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  const deleteConsultant = async (id, email, firstName, lastName) => {
    try {
      setIsLoading(true);

      sendDeletionNotificationEmail(email, firstName, lastName);

      const response = await fetch(
        `http://localhost:3000/api/consultants/${id}`,
        {
          method: "DELETE",
        }
      );
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || data.message);
      }

      toast.success("Consultant deleted successfully");

      const deletedConsultant = consultants.find(
        (consultant) => consultant._id === id
      );

      const deletionMessage = (
        <div
          key={deletedConsultant.id}
          className="recent-activity justify-center flex flex-row no-border"
        >
          <div className="dot red-dot mr-2"></div>
          <p>
            You have deleted {deletedConsultant.firstName}{" "}
            {deletedConsultant.lastName} successfully!!!
          </p>
        </div>
      );

      setRecentActivity([...recentActivity, deletionMessage]);
      setConsultants(consultants.filter((consultant) => consultant._id !== id));

      setError(null);
    } catch (error) {
      toast.error(`Error deleting consultant: ${error.message}`);
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handlePDFDownnload = async (
    id,
    email,
    Speciality,
    Telephone,
    From,
    To
  ) => {
    const pdfContent = (
      <Document>
        <Page size="A4" style={styles.page}>
          <View style={styles.section}>
            <View style={styles.headerSection}>
              <Image src={Logo} style={styles.logo} />
              <Text style={styles.header}>Add Consultant</Text>
            </View>
            <hr />
            <View style={styles.infoSection}>
              <View style={styles.table}>
                <View style={styles.row}>
                  <View style={styles.colLabel}>
                    <Text style={styles.label}>ID:</Text>
                  </View>
                  <View style={styles.colValue}>
                    <Text style={styles.text}>#{id}</Text>
                  </View>
                </View>
                <View style={styles.row}>
                  <View style={styles.colLabel}>
                    <Text style={styles.label}>email:</Text>
                  </View>
                  <View style={styles.colValue}>
                    <Text style={styles.text}>{email}</Text>
                  </View>
                </View>
                <View style={styles.row}>
                  <View style={styles.colLabel}>
                    <Text style={styles.label}>Speciality:</Text>
                  </View>
                  <View style={styles.colValue}>
                    <Text style={styles.text}>{Speciality}</Text>
                  </View>
                </View>
                <View style={styles.row}>
                  <View style={styles.colLabel}>
                    <Text style={styles.label}>Telephone :</Text>
                  </View>
                  <View style={styles.colValue}>
                    <Text style={styles.text}>{Telephone}</Text>
                  </View>
                </View>
                <View style={styles.row}>
                  <View style={styles.colLabel}>
                    <Text style={styles.label}>From :</Text>
                  </View>
                  <View style={styles.colValue}>
                    <Text style={styles.text}>{From}</Text>
                  </View>
                </View>
                <View style={styles.row}>
                  <View style={styles.colLabel}>
                    <Text style={styles.label}>To :</Text>
                  </View>
                  <View style={styles.colValue}>
                    <Text style={styles.text}>{To}</Text>
                  </View>
                </View>
              </View>
            </View>
          </View>
        </Page>
      </Document>
    );
    console.log(pdfContent.toString());

    const blob = await pdf(pdfContent).toBlob();
    saveAs(blob, `${email} Inventory Data.pdf`);
  };
  const styles = StyleSheet.create({
    page: {
      flexDirection: "column",
      backgroundColor: "#ffffff",
      padding: 60,
      border: "1px solid #000",
    },
    section: {
      marginBottom: 10,
    },
    headerSection: {
      flexDirection: "row",
      alignItems: "center",
      marginBottom: 20,
    },
    logo: {
      width: 50,
      height: 50,
      marginRight: 10,
    },
    header: {
      fontSize: 32,
      fontWeight: "extrabold",
      marginBottom: 10,
    },
    infoSection: {
      marginBottom: 20,
    },
    table: {
      border: "1px solid #000",
    },
    row: {
      flexDirection: "row",
      borderBottom: "1px solid #000",
    },
    colLabel: {
      width: "50%",
      borderRight: "1px solid #000",
      padding: 5,
    },
    colValue: {
      width: "40%",
      padding: 5,
    },
    label: {
      fontWeight: "bold",
    },
    text: {},
  });
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (inputRef.current && !inputRef.current.contains(event.target)) {
        setIsSearchExpanded(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="flex flex-col h-screen w-full">
      <Navbar />
      <div
        className="flex-grow flex"
        style={{
          backgroundImage: `url('${backgroundImage}')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <Sidebar />
        <div className="flex-shrink-0 w- p-4">
          <h2
            className="heading text-white"
            style={{ fontSize: "63px", fontFamily: "Times New Roman , serif" }}
          >
            Welcome Admin!!!
          </h2>
          <div className="flex flex-row">
            <div className="calendar-container flex-grow pl-10 pr-20">
              <Calendar
                className="mb-4 shadow-lg rounded-3xl"
                onChange={handleDateChange}
                value={selectedDate}
              />
            </div>
            <div className="flex-shrink-0 mr-20 box">
              <h2
                className="text-lg font-semibold mb-2"
                style={{ textAlign: "center", fontFamily: "Times New Roman " }}
              >
                Recent Activities
              </h2>
              <div className="recent-activities mx-auto w-full">
                {loading ? (
                  <div
                    className="text-white bg-none w-full mx-auto "
                    colSpan={9}
                  >
                    <Icon
                      icon="eos-icons:bubble-loading"
                      className="text-center text-3xl text-black mx-auto"
                    />
                  </div>
                ) : (
                  recentActivity.map((message, index) => (
                    <div
                      key={index}
                      className="recent-activity justify-center flex flex-row"
                    >
                      {message}
                    </div>
                  ))
                )}
              </div>
            </div>
            <div
              className="flex justify-center items-center mt-8 ml-24  mb-26 "
              style={{ marginBottom: "47px" }}
            >
              <Clock datediff={0} />
            </div>
          </div>
          <div className="search-bar-container relative">
            <input
              ref={inputRef}
              type="text"
              placeholder="Search By Email..."
              className={`search-input rounded-xl p-1 pl-12 w-full`}
              style={{
                position: "relative",
                padding: "15px 40px 15px 40px",
                width: "250px",
                color: "#525252",
                textTransform: "uppercase",
                fontSize: "16px",
                fontWeight: "100",
                letterSpacing: "2px",
                border: "1px solid #ccc",
                borderRadius: "5px",
                background:
                  "linear-gradient(to right, #FFFFFF 0%, #464747 #F9F9F9 100%)",
                outline: "none",
              }}
            />
            <div
              className={`search-icon absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500`}
              onClick={handleSearchClick}
            >
              <FaSearch size={20} style={{ pointerEvents: "none" }} />
            </div>
          </div>

          <div
            className="mt-8 pl-10"
            style={{
              fontFamily: "Times New Roman ",
            }}
          >
            <table className="table ml-12">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Speciality</th>
                  <th>Telephone Number</th>
                  <th>From hours</th>
                  <th>To hours</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody className="mr-5">
                {loading ? (
                  <th className="text-white bg-none" colSpan={7}>
                    <Icon
                      icon="eos-icons:bubble-loading"
                      className="text-center text-3xl text-black mx-auto"
                    />
                  </th>
                ) : (
                  consultants.map((consultant) => (
                    <tr key={consultant._id} className="text-white">
                      <td>
                        {consultant.firstName} {consultant.lastName}
                      </td>
                      <td>{consultant.email}</td>
                      <td>{consultant.specialty}</td>
                      <td>{consultant.telephoneNumber}</td>
                      <td>{consultant.from}</td>
                      <td>{consultant.to}</td>
                      <td>
                        <Link to={`/Update/${consultant._id}`}>
                          <button className="mr-3 hover:text-blue-400 transition duration-300">
                            Edit
                          </button>
                        </Link>
                        <button
                          className="mr-3 hover:text-blue-400 transition duration-300"
                          onClick={(e) => {
                            handlePDFDownnload(
                              consultant._id,
                              consultant.email,
                              consultant.specialty,
                              consultant.telephoneNumber,
                              consultant.from,
                              consultant.to
                            );
                          }}
                        >
                          Download
                        </button>
                        <button
                          onClick={() =>
                            deleteConsultant(
                              consultant._id,
                              consultant.email,
                              consultant.firstName,
                              consultant.lastName
                            )
                          }
                          className="hover:text-red-500 transition duration-300"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default AdminDashboard;
