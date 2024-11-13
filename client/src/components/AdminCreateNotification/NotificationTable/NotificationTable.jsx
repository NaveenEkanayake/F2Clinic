import React, { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  TableSortLabel,
} from "@mui/material";
import {
  getAllCustomerAndConsultantEmails,
  verifyadmin,
} from "../../../Api/config";

const NotificationTable = () => {
  const [emails, setEmails] = useState([]);
  const [orderDirection, setOrderDirection] = useState("asc");
  const [orderBy, setOrderBy] = useState("email");

  useEffect(() => {
    const fetchAllEmails = async () => {
      try {
        const adminResponse = await verifyadmin();
        if (!adminResponse) {
          console.error("Admin verification failed.");
          return;
        }

        const results = await getAllCustomerAndConsultantEmails();
        if (results) {
          const formattedEmails = [
            ...results.formattedCustomers.map((customer) => ({
              email: customer.email,
              role: customer.role,
            })),
            ...results.formattedConsultants.map((consultant) => ({
              email: consultant.email,
              role: "consultant",
            })),
          ];
          setEmails(formattedEmails);
        } else {
          console.error("No data found.");
        }
      } catch (err) {
        console.error("Error fetching customer and consultant emails:", err);
      }
    };

    fetchAllEmails();
  }, []);

  const handleSort = (property) => {
    const isAscending = orderBy === property && orderDirection === "asc";
    setOrderDirection(isAscending ? "desc" : "asc");
    setOrderBy(property);
  };

  // Sorting logic
  const sortedEmails = [...emails].sort((a, b) => {
    if (a[orderBy] < b[orderBy]) {
      return orderDirection === "asc" ? -1 : 1;
    }
    if (a[orderBy] > b[orderBy]) {
      return orderDirection === "asc" ? 1 : -1;
    }
    return 0;
  });

  return (
    <TableContainer
      component={Paper}
      sx={{
        maxWidth: "100%", // Ensure it takes full width
        height: 680,
        margin: "20px auto",
        boxShadow: 3,
        overflowX: "auto", // Allows horizontal scrolling on small screens
      }}
    >
      <Typography
        variant="h6"
        align="center"
        sx={{ padding: "16px 0", fontWeight: "bold", color: "#3f51b5" }}
      >
        Consultant and Customer Emails
      </Typography>
      <Table sx={{ minWidth: 650 }}>
        <TableHead>
          <TableRow>
            <TableCell align="center">
              <TableSortLabel
                active={orderBy === "email"}
                direction={orderBy === "email" ? orderDirection : "asc"}
                onClick={() => handleSort("email")}
              >
                <strong>Email</strong>
              </TableSortLabel>
            </TableCell>
            <TableCell align="center">
              <TableSortLabel
                active={orderBy === "role"}
                direction={orderBy === "role" ? orderDirection : "asc"}
                onClick={() => handleSort("role")}
              >
                <strong>Role</strong>
              </TableSortLabel>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {sortedEmails.map((entry, index) => (
            <TableRow key={index} hover>
              <TableCell align="center">{entry.email}</TableCell>
              <TableCell align="center">{entry.role}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default NotificationTable;
