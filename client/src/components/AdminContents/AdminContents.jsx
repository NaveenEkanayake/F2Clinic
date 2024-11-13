import Box from "@mui/material/Box";
import { useEffect, useState } from "react";
import Grid from "@mui/material/Grid";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import LocalHospitalIcon from "@mui/icons-material/LocalHospital";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import AdminTable from "./AdminTable/AdminTable";
import {
  getInventoryCount,
  verifyadmin,
  getCustomerCount,
  getConsultantCount,
} from "../../Api/config";

const AdminContents = ({ isSidebarOpen }) => {
  const [count, setCount] = useState({});
  const [countedCustomer, setCountedCustomer] = useState({ totalCount: 0 });
  const [countedConsultants, setCountedConsultants] = useState({
    totalCount: 0,
  });
  useEffect(() => {
    const fetchData = async () => {
      try {
        const adminId = verifyadmin();
        if (!adminId) {
          console.log("Admin ID not found.");
        }

        const inventoryCount = await getInventoryCount();
        console.log("Inventory Count Response:", inventoryCount);
        setCount(inventoryCount);
      } catch (err) {
        console.error("Error fetching inventory count:", err);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchCustomerCount = async () => {
      try {
        const adminId = verifyadmin();
        if (!adminId) {
          console.log("Admin ID not found.");
        }

        const RegisteredCustomerCount = await getCustomerCount();
        console.log("Customer Count Response:", RegisteredCustomerCount);
        setCountedCustomer({ totalCount: RegisteredCustomerCount.customers });
      } catch (err) {
        console.error("Error fetching Customercount:", err);
      }
    };

    fetchCustomerCount();
  }, []);

  useEffect(() => {
    const fetchConsultantCount = async () => {
      try {
        const adminId = verifyadmin();
        if (!adminId) {
          console.log("Admin ID not found.");
        }

        const RegisteredConsultantCount = await getConsultantCount();
        console.log("Consultant Count Response:", RegisteredConsultantCount);
        setCountedConsultants({
          totalCount: RegisteredConsultantCount.Consultants,
        });
      } catch (err) {
        console.error("Error fetching Consultantcount:", err);
      }
    };

    fetchConsultantCount();
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
                    Total Registered Customers
                  </Typography>
                </Box>
                <Typography
                  variant="h6"
                  align="center"
                  sx={{ color: "text.secondary" }}
                  mt={4}
                >
                  {countedCustomer.totalCount || 0}
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
                    Total Registered Consultants
                  </Typography>
                </Box>
                <Typography
                  variant="h6"
                  align="center"
                  mt={4}
                  sx={{ color: "text.secondary" }}
                >
                  {countedConsultants.totalCount || 0}
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
                  <LocalHospitalIcon />
                  <Typography
                    gutterBottom
                    variant="h5"
                    align="center"
                    component="div"
                  >
                    Total Inventory Items
                  </Typography>
                </Box>
                <Typography
                  variant="h6"
                  align="center"
                  sx={{ color: "text.secondary" }}
                  mt={4}
                >
                  {count.totalCount || 0}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        <Grid item xs={12} sm={8} md={4} mt={2}>
          <Card
            sx={{
              maxWidth: { xs: "100%", sm: "500px", md: 1600 },
              width: { xs: "90%", sm: "420px", md: "100%" },
              height: { xs: "auto", sm: "480px", md: "680px" },
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
                  Total Income
                </Typography>
              </Box>
              <AdminTable />
            </CardContent>
          </Card>
        </Grid>
      </Box>
    </>
  );
};

export default AdminContents;
