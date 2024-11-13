import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import React, { useState, useEffect } from "react";
import BookOnlineIcon from "@mui/icons-material/BookOnline";
import {
  verifyconsultant,
  getAllConsultantAppointment,
  getAppointmentStatus,
} from "../../Api/config";

import AppointmentTable from "./AppointmentTable/AppointmentTable";
const ConsultantDashboardContents = () => {
  const [countedAppointments, setCountedAppointments] = useState({
    totalCount: 0,
  });
  const [countedApprovalCount, setCountedApprovalCount] = useState({
    totalCount: 0,
  });
  const [countedRejectedCount, setCountedRejectedCount] = useState({
    totalCount: 0,
  });
  useEffect(() => {
    const fetchAllAppointmentCount = async () => {
      try {
        const ConsultantId = verifyconsultant();
        if (!ConsultantId) {
          console.log("Consultant ID not found.");
        }

        const AppointmentCount = await getAllConsultantAppointment();
        console.log("Appointment Count Response:", AppointmentCount);
        setCountedAppointments({
          totalCount: AppointmentCount.appointmentCount,
        });
      } catch (err) {
        console.error("Error fetching Customercount:", err);
      }
    };

    fetchAllAppointmentCount();
  }, []);

  useEffect(() => {
    const fetchAllAppointmentStatus = async () => {
      try {
        const ConsultantId = verifyconsultant();
        if (!ConsultantId) {
          console.log("Consultant ID not found.");
          return;
        }
        const AppointmentStatus = await getAppointmentStatus();
        console.log("Appointment Status Response:", AppointmentStatus);
        setCountedApprovalCount({
          totalCount: AppointmentStatus.ApprovalCount || 0,
        });

        setCountedRejectedCount({
          totalCount: AppointmentStatus.RejectCount || 0,
        });
      } catch (err) {
        console.error("Error fetching AppointmentStatus:", err);
      }
    };

    fetchAllAppointmentStatus();
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
                  <BookOnlineIcon sx={{ mr: 1 }} />
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
                  <BookOnlineIcon />
                  <Typography
                    gutterBottom
                    variant="h5"
                    align="center"
                    component="div"
                  >
                    Approved Appointments
                  </Typography>
                </Box>
                <Typography
                  variant="h6"
                  align="center"
                  mt={4}
                  sx={{ color: "text.secondary" }}
                >
                  {countedApprovalCount.totalCount || 0}
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
                  <BookOnlineIcon />
                  <Typography
                    gutterBottom
                    variant="h5"
                    align="center"
                    component="div"
                  >
                    Rejected Appointments
                  </Typography>
                </Box>
                <Typography
                  variant="h6"
                  align="center"
                  sx={{ color: "text.secondary" }}
                  mt={4}
                >
                  {countedRejectedCount.totalCount || 0}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
        <Grid item xs={12} md={4} mt={2}>
          <Card
            sx={{ maxWidth: 1600 }}
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
                <BookOnlineIcon />
                <Typography
                  gutterBottom
                  variant="h5"
                  align="center"
                  component="div"
                >
                  Total Appointment
                </Typography>
              </Box>
              <AppointmentTable />
            </CardContent>
          </Card>
        </Grid>
      </Box>
    </>
  );
};

export default ConsultantDashboardContents;
