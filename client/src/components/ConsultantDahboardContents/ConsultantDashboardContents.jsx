import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import * as React from "react";
import BookOnlineIcon from "@mui/icons-material/BookOnline";

import AppointmentTable from "./AppointmentTable/AppointmentTable";
const ConsultantDashboardContents = () => {
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
                  1
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
                  1
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
                  1
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
        <Grid item xs={12} md={4} mt={2}>
          <Card
            sx={{ maxWidth: 1460 }}
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
