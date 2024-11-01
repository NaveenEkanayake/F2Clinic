import React, { useState, useEffect } from "react";
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
import PuffLoader from "@/components/PuffLoader/PuffLoader";
import {
  getAllPetcareSupply,
  verifyadmin,
  deletepetcaresupply,
} from "../../../../../Api/config";
import { toast, ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom"; // Import navigate

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

const SupplyTable = () => {
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
    const PetCareToDelete = rows[rowIndex];

    if (!PetCareToDelete) {
      console.error("No PetCare Supply found at this index.");
      return;
    }

    try {
      console.log("Deleting PetCare Supply:", PetCareToDelete);
      const response = await deletepetcaresupply(PetCareToDelete._id);
      console.log("Delete response:", response);
      const newRows = rows.filter((_, index) => index !== rowIndex);
      setRows(newRows);
      toast.success(" PetCare Supply deleted successfully!", {
        autoClose: 3000,
      });
    } catch (error) {
      console.error("Error deleting PetCare Supply:", error);
      toast.error("Failed to delete PetCare Supply. Please try again.", {
        autoClose: 3000,
      });
    }
  };

  const handleUpdate = (rowIndex) => {
    const PetcareSupplyToUpdate = rows[rowIndex];
    navigate(`/updatePetcareSupply/${PetcareSupplyToUpdate._id}`);
  };

  useEffect(() => {
    const fetchPetcareSupply = async () => {
      try {
        const adminResponse = await verifyadmin();
        console.log("Admin Response:", adminResponse);
        if (!adminResponse) {
          console.error("Admin ID not found, failed.");
          return;
        }

        const results = await getAllPetcareSupply();
        console.log("PetCare Results:", results);

        if (results && results.retrievedData) {
          const formattedRows = results.retrievedData.map((CareSupply) => ({
            _id: CareSupply._id,
            SupplyImg: CareSupply.SupplyImg,
            Supplyname: CareSupply.Supplyname,
            price: CareSupply.price,
            SupplyDescription: CareSupply.SupplyDescription,
          }));
          setRows(formattedRows);
        } else {
          console.error("No Pet Care Supply found in the results.");
        }
      } catch (err) {
        console.error("Error fetching Pet Care Supply:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchPetcareSupply();
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
          {rows.length === 0 ? (
            <TableRow>
              <TableCell colSpan={5} align="center">
                <p>There are no Pet care Supply Items to display.</p>
              </TableCell>
            </TableRow>
          ) : (
            rows.map((row, index) => (
              <TableRow key={index}>
                <TableCell component="th" scope="row">
                  <img
                    src={row.SupplyImg}
                    alt={row.Supplyname}
                    style={{ width: 50, height: 50 }}
                  />
                </TableCell>
                <TableCell component="th" scope="row">
                  {row.Supplyname}
                </TableCell>
                <TableCell component="th" scope="row">
                  {`LKR ${row.price}`}
                </TableCell>
                <TableCell align="right">{row.SupplyDescription}</TableCell>
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
            />
          </TableRow>
        </TableFooter>
      </Table>
    </TableContainer>
  );
};

export default SupplyTable;
