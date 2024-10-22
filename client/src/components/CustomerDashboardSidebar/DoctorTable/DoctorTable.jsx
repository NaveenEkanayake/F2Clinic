import React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

function createData(id, firstName, lastName, age) {
  return { id, firstName, lastName, age };
}

const rows = [
  createData(1, "John", "Doe", 25),
  createData(2, "Jane", "Smith", 30),
  createData(3, "Mike", "Johnson", 35),
  createData(4, "Emily", "Davis", 28),
  createData(5, "Sarah", "Wilson", 22),
  createData(6, "Chris", "Brown", 27),
  createData(7, "Angela", "White", 34),
  createData(8, "David", "Garcia", 29),
  createData(9, "Laura", "Martinez", 31),
  createData(10, "Steve", "Harris", 40),
];

export default function DoctorTable() {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="doctor table">
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell align="right">First Name</TableCell>
            <TableCell align="right">Last Name</TableCell>
            <TableCell align="right">Age</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.id}>
              <TableCell component="th" scope="row">
                {row.id}
              </TableCell>
              <TableCell align="right">{row.firstName}</TableCell>
              <TableCell align="right">{row.lastName}</TableCell>
              <TableCell align="right">{row.age}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
