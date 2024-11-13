import React, { useState, useEffect } from "react";
import { useTheme } from "@mui/material/styles";
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableFooter,
  TablePagination,
  TableRow,
  Paper,
  IconButton,
  Button,
} from "@mui/material";
import {
  FirstPage as FirstPageIcon,
  KeyboardArrowLeft,
  KeyboardArrowRight,
  LastPage as LastPageIcon,
} from "@mui/icons-material";
import PuffLoader from "react-spinners/PuffLoader";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  verifyCustomer,
  deletepetRecords,
  getAllPetRecords,
} from "@/Api/config";
import { useNavigate } from "react-router-dom";

const TablePaginationActions = ({ count, page, rowsPerPage, onPageChange }) => {
  const theme = useTheme();

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
};

const ViewPetTable = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleDelete = async (rowIndex) => {
    const petRecordToDelete = rows[rowIndex];

    if (!petRecordToDelete) {
      console.error("No Pet Record found at this index.");
      return;
    }

    try {
      console.log("Deleting Pet Record:", petRecordToDelete);
      const response = await deletepetRecords(petRecordToDelete._id);
      if (response && response.message) {
        console.log(response.message);
      }
      const newRows = rows.filter((_, index) => index !== rowIndex);
      setRows(newRows);
      toast.success("Pet Record deleted successfully!", { autoClose: 3000 });
    } catch (error) {
      console.error("Error deleting Pet Record:", error);
      toast.error("Failed to delete Pet Record. Please try again.", {
        autoClose: 3000,
      });
    }
  };

  const handleUpdate = (rowIndex) => {
    const petRecordToUpdate = rows[rowIndex];
    navigate(`/updatePetRecord/${petRecordToUpdate._id}`);
  };

  useEffect(() => {
    const fetchPetRecords = async () => {
      setLoading(true);
      try {
        const customerResponse = await verifyCustomer();
        console.log("Customer Response:", customerResponse);

        if (!customerResponse) {
          console.error("Customer verification failed.");
          return;
        }
        const userId = customerResponse.id;
        const results = await getAllPetRecords(userId);
        console.log("Pet Record Results:", results);

        if (
          results &&
          results.Retrieveddata &&
          results.Retrieveddata.length > 0
        ) {
          const formattedRows = results.Retrieveddata.map((record) => ({
            _id: record._id,
            Petname: record.Petname,
            Petimage: record.Petimage,
            Breed: record.Breed,
            Age: record.Age,
          }));
          setRows(formattedRows);
        } else {
          console.error("No Pet Records found.");
        }
      } catch (error) {
        console.error("Error fetching Pet Records:", error.response || error);
      } finally {
        setLoading(false);
      }
    };

    fetchPetRecords();
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
      <Table
        sx={{
          minWidth: 700,
          "@media (max-width: 600px)": {
            minWidth: "100%",
            fontSize: "0.875rem",
          },
        }}
        aria-label="custom pagination table"
      >
        <TableBody>
          {rows.length === 0 ? (
            <TableRow>
              <TableCell colSpan={5} align="center">
                <p>There are no Pet Records to display.</p>
              </TableCell>
            </TableRow>
          ) : (
            rows.map((row, index) => (
              <TableRow key={row._id}>
                <TableCell component="th" scope="row" sx={{ padding: "8px" }}>
                  <img
                    src={row.Petimage}
                    alt={row.Petname}
                    style={{ width: 50, height: 50 }}
                  />
                </TableCell>
                <TableCell component="th" scope="row" sx={{ padding: "8px" }}>
                  {row.Petname}
                </TableCell>
                <TableCell component="th" scope="row" sx={{ padding: "8px" }}>
                  {row.Breed}
                </TableCell>
                <TableCell align="right" sx={{ padding: "8px" }}>
                  {row.Age}
                </TableCell>
                <TableCell align="right" sx={{ padding: "8px" }}>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => handleUpdate(index)}
                    sx={{ marginRight: 2 }}
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
        </TableBody>
        <TableFooter>
          <TableRow>
            <TablePagination
              rowsPerPageOptions={[5, 10, 25, { label: "All", value: -1 }]}
              colSpan={5}
              count={rows.length}
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
              sx={{
                "@media (max-width: 600px)": {
                  fontSize: "0.75rem",
                },
              }}
            />
          </TableRow>
        </TableFooter>
      </Table>
    </TableContainer>
  );
};

export default ViewPetTable;
