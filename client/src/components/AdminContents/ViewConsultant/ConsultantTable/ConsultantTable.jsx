import React, { useEffect, useState } from "react";
import PuffLoader from "../../../PuffLoader/PuffLoader";
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
import { ToastContainer, toast } from "react-toastify";
import Button from "@mui/material/Button";
import {
  getAllConsultant,
  verifyadmin,
  deleteConsultant,
} from "../../../../Api/config";
import { useNavigate } from "react-router-dom";

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

const ConsultantTable = () => {
  const navigate = useNavigate();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [consultants, setConsultants] = useState([]);
  const [loading, setLoading] = useState(true);

  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - consultants.length) : 0;

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleDelete = async (rowIndex) => {
    const consultantToDelete = consultants[rowIndex];
    try {
      await deleteConsultant(consultantToDelete._id);
      setConsultants((prev) => prev.filter((_, index) => index !== rowIndex));
      console.log("Deleted consultant:", consultantToDelete);
      toast.success("Consultant deleted successfully!", {
        autoClose: 3000,
      });
    } catch (error) {
      console.error("Error deleting consultant:", error);
      toast.error("Failed to delete consultant. Please try again.", {
        autoClose: 3000,
      });
    }
  };

  const handleUpdate = (rowIndex) => {
    const consultantToUpdate = consultants[rowIndex];
    navigate(`/updateConsultantForm/${consultantToUpdate._id}`);
  };

  useEffect(() => {
    const fetchConsultants = async () => {
      try {
        const adminResponse = await verifyadmin();
        console.log("Admin Response:", adminResponse);
        if (!adminResponse) {
          console.error("Admin ID not found failed.");
          return;
        }

        const results = await getAllConsultant();
        console.log("Consultant Results:", results);
        if (results) {
          setConsultants(results.retrievedData);
        } else {
          console.error("No consultants found in the results.");
        }
      } catch (err) {
        console.error("Error fetching consultants:", err);
      } finally {
        setTimeout(() => setLoading(false), 3000);
      }
    };

    fetchConsultants();
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
    <TableContainer component={Paper} className="overflow-x-auto">
      <ToastContainer position="top-right" />
      <Table sx={{ minWidth: 700 }} aria-label="custom pagination table">
        <TableBody>
          {consultants.length === 0 ? (
            <TableRow>
              <TableCell colSpan={5} align="center">
                <p>There are no consultants to display.</p>
              </TableCell>
            </TableRow>
          ) : (
            (rowsPerPage > 0
              ? consultants.slice(
                  page * rowsPerPage,
                  page * rowsPerPage + rowsPerPage
                )
              : consultants
            ).map((consultant, index) => (
              <TableRow key={consultant._id}>
                <TableCell component="th" scope="row">
                  {`DR. ${consultant.firstname} ${consultant.lastname}`}
                </TableCell>
                <TableCell align="right">{consultant.speciality}</TableCell>
                <TableCell align="right">{consultant.email}</TableCell>
                <TableCell align="right">
                  {consultant.telephoneNumber}
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
              count={consultants.length}
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

export default ConsultantTable;
