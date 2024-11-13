import React, { useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { verifyCustomer, getAllDoctors } from "../../../Api/config";

export default function DoctorTable() {
  const [doctors, setDoctors] = useState([]);

  useEffect(() => {
    const fetchAllDoctors = async () => {
      try {
        const UserId = verifyCustomer();
        if (!UserId) {
          console.log("User ID not found.");
          return;
        }

        const response = await getAllDoctors();
        if (response && response.retrievedData) {
          setDoctors(response.retrievedData);
        } else {
          console.log("Failed to fetch doctor data.");
        }
      } catch (err) {
        console.error("Error fetching doctors:", err);
      }
    };

    fetchAllDoctors();
  }, []);

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 550 }} aria-label="doctor table">
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell align="right">First Name</TableCell>
            <TableCell align="right">Last Name</TableCell>
            <TableCell align="right">Speciality</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {doctors.map((doctor) => (
            <TableRow key={doctor._id}>
              <TableCell component="th" scope="row">
                {doctor._id}
              </TableCell>
              <TableCell align="right">{doctor.firstname}</TableCell>
              <TableCell align="right">{doctor.lastname}</TableCell>
              <TableCell align="right">{doctor.speciality}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
