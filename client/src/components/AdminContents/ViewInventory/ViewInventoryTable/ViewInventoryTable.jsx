import React, { useEffect, useState } from "react";
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
import { useNavigate } from "react-router-dom";
import {
  getAllInventories,
  verifyadmin,
  deleteInventory,
} from "../../../../Api/config";
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

const ViewInventoryTable = () => {
  const navigate = useNavigate();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);

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
    const inventoryToDelete = rows[rowIndex];

    if (!inventoryToDelete) {
      console.error("No inventory item found at this index.");
      return;
    }

    try {
      console.log("Deleting inventory:", inventoryToDelete);
      const response = await deleteInventory(inventoryToDelete._id);
      console.log("Delete response:", response);
      const newRows = rows.filter((_, index) => index !== rowIndex);
      setRows(newRows);
      toast.success("Inventory deleted successfully!", {
        autoClose: 3000,
      });
    } catch (error) {
      console.error("Error deleting inventory:", error);
      toast.error("Failed to delete inventory. Please try again.", {
        autoClose: 3000,
      });
    }
  };

  const handleUpdate = (rowIndex) => {
    const inventoryToUpdate = rows[rowIndex];
    navigate(`/updateInventory/${inventoryToUpdate._id}`);
  };

  useEffect(() => {
    const fetchInventory = async () => {
      try {
        const adminResponse = await verifyadmin();
        console.log("Admin Response:", adminResponse);
        if (!adminResponse) {
          console.error("Admin ID not found failed.");
          return;
        }

        const results = await getAllInventories();
        console.log("Inventory Results:", results);
        if (results && results.retrieveditems) {
          const formattedRows = results.retrieveditems.map((item) => ({
            _id: item._id,
            imagepath: item.imagepath,
            itemName: item.ItemName,
            Category: item.Category,
            Quantity: item.Quantity,
            Description: item.Description,
          }));
          setRows(formattedRows);
        } else {
          console.error("No Inventory found in the results.");
        }
      } catch (err) {
        console.error("Error fetching Inventory:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchInventory();
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
              <TableCell colSpan={6} align="center">
                <p>There are no Inventory Items to display.</p>
              </TableCell>
            </TableRow>
          ) : (
            (rowsPerPage > 0
              ? rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              : rows
            ).map((row, index) => (
              <TableRow key={row._id}>
                <TableCell component="th" scope="row">
                  <img
                    src={row.imagepath}
                    alt={row.itemName}
                    style={{ width: 50, height: 50 }}
                  />
                </TableCell>
                <TableCell component="th" scope="row">
                  {row.itemName}
                </TableCell>
                <TableCell align="right">{row.Category}</TableCell>
                <TableCell align="right">{row.Quantity}</TableCell>
                <TableCell align="right">{row.Description}</TableCell>
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
              <TableCell colSpan={6} />
            </TableRow>
          )}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TablePagination
              rowsPerPageOptions={[5, 10, 25]}
              colSpan={3}
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

export default ViewInventoryTable;
