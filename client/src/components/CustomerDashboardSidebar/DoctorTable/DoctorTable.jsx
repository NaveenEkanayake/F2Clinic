import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TablePagination,
  Checkbox,
} from "@mui/material";

const doctors = [
  {
    id: 1,
    name: "Dr. John Doe",
    img: "https://via.placeholder.com/100",
    specialty: "Cardiology",
    email: "john.doe@example.com",
  },
  {
    id: 2,
    name: "Dr. Jane Smith",
    img: "https://via.placeholder.com/100",
    specialty: "Neurology",
    email: "jane.smith@example.com",
  },
  {
    id: 3,
    name: "Dr. Emily Johnson",
    img: "https://via.placeholder.com/100",
    specialty: "Pediatrics",
    email: "emily.johnson@example.com",
  },
  {
    id: 4,
    name: "Dr. Mike Brown",
    img: "https://via.placeholder.com/100",
    specialty: "Dermatology",
    email: "mike.brown@example.com",
  },
  {
    id: 5,
    name: "Dr. Sarah Connor",
    img: "https://via.placeholder.com/100",
    specialty: "Orthopedics",
    email: "sarah.connor@example.com",
  },
];

const DoctorTable = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [selected, setSelected] = useState([]);

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = doctors.map((doctor) => doctor.id);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (id) => {
    const selectedIndex = selected.indexOf(id);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }

    setSelected(newSelected);
  };

  const isSelected = (id) => selected.indexOf(id) !== -1;

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <>
      <Paper>
        <TableContainer className="bg-slate-700 rounded-sm">
          <Table>
            <TableHead>
              <TableRow>
                <TableCell padding="checkbox">
                  <Checkbox
                    onChange={handleSelectAllClick}
                    checked={selected.length === doctors.length}
                    color="success"
                  />
                </TableCell>
                <TableCell style={{ color: "white", textAlign: "center" }}>
                  Image
                </TableCell>
                <TableCell style={{ color: "white", textAlign: "center" }}>
                  Doctor Name
                </TableCell>
                <TableCell style={{ color: "white", textAlign: "center" }}>
                  Specialty
                </TableCell>
                <TableCell style={{ color: "white", textAlign: "center" }}>
                  Email
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {doctors
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((doctor) => {
                  const isItemSelected = isSelected(doctor.id);
                  return (
                    <TableRow
                      key={doctor.id}
                      hover
                      onClick={() => handleClick(doctor.id)}
                      role="checkbox"
                      aria-checked={isItemSelected}
                      selected={isItemSelected}
                    >
                      <TableCell padding="checkbox">
                        <Checkbox checked={isItemSelected} color="primary" />
                      </TableCell>
                      <TableCell
                        style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        <img
                          src={doctor.img}
                          alt={doctor.name}
                          style={{ width: "50px", borderRadius: "50%" }}
                        />
                      </TableCell>

                      <TableCell
                        style={{ color: "white", textAlign: "center" }}
                      >
                        {doctor.name}
                      </TableCell>
                      <TableCell
                        style={{ color: "white", textAlign: "center" }}
                      >
                        {doctor.specialty}
                      </TableCell>
                      <TableCell
                        style={{ color: "white", textAlign: "center" }}
                      >
                        {doctor.email}
                      </TableCell>
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={doctors.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </>
  );
};

export default DoctorTable;
