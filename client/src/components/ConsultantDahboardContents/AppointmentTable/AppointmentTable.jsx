import React, { useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import ActionModel from "../ActionModel/ActionModel";

function createData(Doctorname, Date, Time, Status, UserId, OwnerName, Email) {
  return { Doctorname, Date, Time, Status, UserId, OwnerName, Email };
}
const rows = [
  createData(
    "Dr. John Doe",
    "2024-10-22",
    "10:00 AM",
    false,
    "12345",
    "Alice Smith",
    "alice@example.com"
  ),
  createData(
    "Dr. Jane Smith",
    "2024-10-23",
    "11:00 AM",
    false,
    "67890",
    "Bob Johnson",
    "bob@example.com"
  ),
  createData(
    "Dr. Mike Johnson",
    "2024-10-24",
    "09:00 AM",
    false,
    "54321",
    "Cathy Lee",
    "cathy@example.com"
  ),
  createData(
    "Dr. Emily Davis",
    "2024-10-25",
    "02:00 PM",
    false,
    "98765",
    "David Brown",
    "david@example.com"
  ),
  createData(
    "Dr. Sarah Wilson",
    "2024-10-26",
    "03:00 PM",
    false,
    "11223",
    "Ella White",
    "ella@example.com"
  ),
];
export default function AppointmentTable() {
  const [openModal, setOpenModal] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);

  const handleOpenModal = (row) => {
    setSelectedRow(row);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setSelectedRow(null);
  };

  const handleFormSubmit = (formData) => {
    console.log("Form Data Submitted:", formData, "For Row:", selectedRow);
    handleCloseModal();
  };

  return (
    <>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="doctor table">
          <TableHead>
            <TableRow>
              <TableCell>Doctor Name</TableCell>
              <TableCell align="right">Date</TableCell>
              <TableCell align="right">Time</TableCell>
              <TableCell align="right">Status</TableCell>
              <TableCell align="right">Owner Name</TableCell>
              <TableCell align="right">Email</TableCell>
              <TableCell align="right">Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow key={row.UserId}>
                <TableCell>{row.Doctorname}</TableCell>
                <TableCell align="right">{row.Date}</TableCell>
                <TableCell align="right">{row.Time}</TableCell>
                <TableCell align="right">
                  {row.Status ? "Approved" : "Pending"}
                </TableCell>
                <TableCell align="right">{row.OwnerName}</TableCell>
                <TableCell align="right">{row.Email}</TableCell>
                <TableCell align="right">
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => handleOpenModal(row)}
                  >
                    Action
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {openModal && (
        <ActionModel
          open={openModal}
          onClose={handleCloseModal}
          onSubmit={handleFormSubmit}
          selectedRow={selectedRow}
        />
      )}
    </>
  );
}
