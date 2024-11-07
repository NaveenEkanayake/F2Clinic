import AppointmentExpenses from "../AppointmentExpenses/AppointmentExpenses";
import OtherExpenses from "../OtherExpenses/OtherExpenses";
import DoctorTable from "../DoctorTable/DoctorTable";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { useState, useEffect } from "react";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import TotalExpenses from "../TotalExpenses/TotalExpenses";
import {
  getAppointmentCount,
  verifyCustomer,
  getPetRecordCount,
} from "../../../Api/config";

const DashboardContents = ({ isSidebarOpen }) => {
  const [countedAppointments, setCountedAppointments] = useState({
    totalCount: 0,
  });
  const [countedpetRecords, setCountedpetRecords] = useState({
    totalCount: 0,
  });
  useEffect(() => {
    const fetchPetRecordCount = async () => {
      try {
        const UserId = verifyCustomer();
        if (!UserId) {
          console.log("User ID not found.");
        }

        const PetRecordCount = await getPetRecordCount();
        console.log("PetRecord Count Response:", PetRecordCount);
        setCountedpetRecords({ totalCount: PetRecordCount.petRecordCount });
      } catch (err) {
        console.error("Error fetching Customercount:", err);
      }
    };

    fetchPetRecordCount();
  }, []);

  useEffect(() => {
    const fetchAppointmentCount = async () => {
      try {
        const UserId = verifyCustomer();
        if (!UserId) {
          console.log("User ID not found.");
        }

        const AppointmentCount = await getAppointmentCount();
        console.log("Appointment Count Response:", AppointmentCount);
        setCountedAppointments({
          totalCount: AppointmentCount.appointmentCount,
        });
      } catch (err) {
        console.error("Error fetching Customercount:", err);
      }
    };

    fetchAppointmentCount();
  }, []);
  return (
    <>
      <Box sx={{ height: 20 }} />
      <Box sx={{ flexGrow: 1, p: 3 }}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={4}>
            <Card
              sx={{
                maxWidth: 450,
                background: "linear-gradient(to right, #00C853, #1E88E5)",
                color: "white",
              }}
              style={{
                height: "180px",
                borderRadius: "20px",
              }}
            >
              <CardContent>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <PeopleAltIcon sx={{ mr: 1 }} />
                  <Typography
                    gutterBottom
                    variant="h5"
                    component="div"
                    align="center"
                  >
                    Total Appointments
                  </Typography>
                </Box>
                <Typography
                  variant="h6"
                  align="center"
                  sx={{ color: "text.secondary" }}
                  mt={4}
                >
                  {countedAppointments.totalCount || 0}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={4}>
            <Card
              sx={{
                maxWidth: 450,
                background: "linear-gradient(to right, #1E88E5, #90CAF9)",
                color: "white",
              }}
              style={{
                height: "180px",
                borderRadius: "20px",
              }}
            >
              <CardContent>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <PeopleAltIcon />
                  <Typography
                    gutterBottom
                    variant="h5"
                    align="center"
                    component="div"
                  >
                    Total Pet Records
                  </Typography>
                </Box>
                <Typography
                  variant="h6"
                  align="center"
                  mt={4}
                  sx={{ color: "text.secondary" }}
                >
                  {countedpetRecords.totalCount || 0}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={4}>
            <Card
              sx={{
                maxWidth: 450,
                background: "linear-gradient(to right, #3F51B5, #2196F3)",
                color: "white",
              }}
              style={{
                height: "887px",
                borderRadius: "20px",
              }}
            >
              <CardContent>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <AttachMoneyIcon />
                  <Typography
                    gutterBottom
                    variant="h5"
                    align="center"
                    component="div"
                  >
                    Total Appointment Expenses
                  </Typography>
                </Box>
                <AppointmentExpenses />
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    marginTop: "70px",
                  }}
                >
                  <AttachMoneyIcon />
                  <Typography
                    gutterBottom
                    variant="h5"
                    align="center"
                    component="div"
                  >
                    Total Expenses
                  </Typography>
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyItems: "center",
                    marginTop: "-50px",
                  }}
                >
                  <TotalExpenses />
                </Box>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
        <Grid item xs={12} md={4} mt={-87}>
          <Card
            sx={{ maxWidth: 960 }}
            style={{
              height: "680px",
              borderRadius: "20px",
            }}
          >
            <CardContent>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <PeopleAltIcon />
                <Typography
                  gutterBottom
                  variant="h5"
                  align="center"
                  component="div"
                >
                  Our Doctors
                </Typography>
              </Box>
              <DoctorTable />
            </CardContent>
          </Card>
        </Grid>
      </Box>
    </>
  );
};

export default DashboardContents;
