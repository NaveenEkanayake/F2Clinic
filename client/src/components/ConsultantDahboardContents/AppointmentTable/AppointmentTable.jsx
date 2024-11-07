import React, { useState, useEffect } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import ActionModel from "../ActionModel/ActionModel";
import {
  verifyconsultant,
  getConsultantAppointment,
} from "../../../Api/config";

export default function AppointmentTable() {
  const [openModal, setOpenModal] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);
  const [appointments, setAppointments] = useState([]); // New state to store appointments

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

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const ConsultantId = verifyconsultant();
        if (!ConsultantId) {
          console.log("ConsultantId not found.");
        }

        const appointmentsData = await getConsultantAppointment();
        console.log("Appointments  Response:", appointmentsData);
        setAppointments(appointmentsData);
      } catch (err) {
        console.error("Error fetching Appointments:", err);
      }
    };

    fetchAppointments();
  }, []);

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
              <TableCell align="right">Owner Email</TableCell>
              <TableCell align="right">Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {appointments.map((row) => (
              <TableRow key={row.UserId}>
                <TableCell>{row.Doctorname}</TableCell>
                <TableCell align="right">{row.Date}</TableCell>
                <TableCell align="right">{row.Time}</TableCell>
                <TableCell align="right">
                  {row.Status === true
                    ? "Approved"
                    : row.Status === false
                    ? "Rejected"
                    : "Pending"}
                </TableCell>
                <TableCell align="right">{row.OwnerName}</TableCell>
                <TableCell align="right">{row.OwnerEmail}</TableCell>
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
