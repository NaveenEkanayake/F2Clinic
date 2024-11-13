import * as React from "react";
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableFooter from "@mui/material/TableFooter";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import IconButton from "@mui/material/IconButton";
import FirstPageIcon from "@mui/icons-material/FirstPage";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import LastPageIcon from "@mui/icons-material/LastPage";
import Button from "@mui/material/Button";
import { useEffect, useState } from "react";
import {
  getAllAppointments,
  verifyCustomer,
  deleteAppointment,
} from "@/Api/config";
import { useNavigate } from "react-router-dom";
import PuffLoader from "@/components/PuffLoader/PuffLoader";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";

function TablePaginationActions(props) {
  const theme = useTheme();
  const { count, page, rowsPerPage, onPageChange } = props;

  const handleFirstPageButtonClick = (event) => {
    onPageChange(event, 0);
  };

  const handleBackButtonClick = (event) => {
    onPageChange(event, page - 1);
  };

  const handleNextButtonClick = (event) => {
    onPageChange(event, page + 1);
  };

  const handleLastPageButtonClick = (event) => {
    onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  };

  return (
    <Box sx={{ flexShrink: 0, ml: 1.5 }}>
      <IconButton
        onClick={handleFirstPageButtonClick}
        disabled={page === 0}
        aria-label="first page"
      >
        {theme.direction === "rtl" ? <LastPageIcon /> : <FirstPageIcon />}
      </IconButton>
      <IconButton
        onClick={handleBackButtonClick}
        disabled={page === 0}
        aria-label="previous page"
      >
        {theme.direction === "rtl" ? (
          <KeyboardArrowRight />
        ) : (
          <KeyboardArrowLeft />
        )}
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="next page"
      >
        {theme.direction === "rtl" ? (
          <KeyboardArrowLeft />
        ) : (
          <KeyboardArrowRight />
        )}
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="last page"
      >
        {theme.direction === "rtl" ? <FirstPageIcon /> : <LastPageIcon />}
      </IconButton>
    </Box>
  );
}

const AppointmentTable = () => {
  const navigate = useNavigate();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - appointments.length) : 0;

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleDelete = async (rowIndex) => {
    const appointmentsToDelete = appointments[rowIndex];
    try {
      await deleteAppointment(appointmentsToDelete._id);
      setAppointments((prev) => prev.filter((_, index) => index !== rowIndex));
      console.log("Deleted Appointment:", appointmentsToDelete);
      toast.success("Appointment deleted successfully!", {
        autoClose: 3000,
      });
    } catch (error) {
      console.error("Error deleting Appointment:", error);
      toast.error("Failed to delete Appointment. Please try again.", {
        autoClose: 3000,
      });
    }
  };

  const handleUpdate = (rowIndex) => {
    const appointmentToUpdate = appointments[rowIndex];
    navigate(`/UpdateAppointment/${appointmentToUpdate._id}`);
  };

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const UserResponse = await verifyCustomer();
        if (!UserResponse) {
          console.error("User verification failed.");
          return;
        }

        const results = await getAllAppointments();
        if (results && results.retrievedData) {
          const formattedRows = results.retrievedData.map((Data) => ({
            _id: Data._id,
            Doctorname: Data.Doctorname,
            Date: Data.Date,
            Time: Data.Time,
            SpecialConcern: Data.SpecialConcern,
            OwnerName: Data.OwnerName,
            OwnerEmail: Data.OwnerEmail,
            Status: Data.Status,
          }));
          setAppointments(formattedRows);
        } else {
          console.error("No appointments found.");
        }
      } catch (err) {
        console.error("Error fetching appointments:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchAppointments();
  }, []);
  if (loading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="100vh"
      >
        <PuffLoader size={80} color="#5BAAEC" loading={loading} />
      </Box>
    );
  }

  return (
    <TableContainer component={Paper}>
      <ToastContainer position="top-right" />
      <Table sx={{ minWidth: 700 }} aria-label="custom pagination table">
        <TableBody>
          {appointments.length === 0 ? (
            <TableRow>
              <TableCell colSpan={5} align="center">
                <p>No appointments to display.</p>
              </TableCell>
            </TableRow>
          ) : (
            (rowsPerPage > 0
              ? appointments.slice(
                  page * rowsPerPage,
                  page * rowsPerPage + rowsPerPage
                )
              : appointments
            ).map((appointment, index) => (
              <TableRow key={appointment._id}>
                <TableCell component="th" scope="row">
                  {` ${appointment.Doctorname.join(", ")}`}
                </TableCell>
                <TableCell align="right">{appointment.Date}</TableCell>
                <TableCell align="right">{appointment.Time}</TableCell>
                <TableCell align="right">
                  {appointment.SpecialConcern}
                </TableCell>
                <TableCell
                  align="right"
                  style={{
                    color: appointment.Status ? "green" : "red",
                    fontWeight: "bold",
                  }}
                >
                  {appointment.Status ? "Approved" : "Not Approved"}
                </TableCell>
                <TableCell align="right">
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => handleUpdate(index)}
                    style={{ marginRight: 10 }}
                  >
                    Update
                  </Button>
                  <Button
                    variant="contained"
                    color="secondary"
                    onClick={() => handleDelete(index)}
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))
          )}

          {emptyRows > 0 && (
            <TableRow style={{ height: 53 * emptyRows }}>
              <TableCell colSpan={5} />
            </TableRow>
          )}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TablePagination
              rowsPerPageOptions={[5, 10, 25, { label: "All", value: -1 }]}
              colSpan={6}
              count={appointments.length}
              rowsPerPage={rowsPerPage}
              page={page}
              SelectProps={{
                inputProps: {
                  "aria-label": "rows per page",
                },
                native: true,
              }}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
              ActionsComponent={TablePaginationActions}
            />
          </TableRow>
        </TableFooter>
      </Table>
    </TableContainer>
  );
};

export default AppointmentTable;
