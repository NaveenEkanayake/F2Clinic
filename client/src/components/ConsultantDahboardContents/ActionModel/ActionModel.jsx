import React, { useState } from "react";
import {
  Modal,
  Button,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import { ApproveStatus } from "../../../Api/config";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ActionForm = ({ open, onClose, onSubmit, selectedRow }) => {
  const [Status, setStatus] = useState(null); // Store as boolean
  const [Description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    ApproveStatus({ Status, Description })
      .then((result) => {
        console.log("Status changed successfully", result);
        toast.success("Status changed successfully!", {
          position: "top-right",
          autoClose: 3000,
        });
        window.location.reload();
      })
      .catch((err) => {
        console.error("Status change failed:", err);
        toast.error("Status change failed.", {
          position: "top-right",
          autoClose: 3000,
        });
      })
      .finally(() => {
        setTimeout(() => {
          setLoading(false);
        }, 3000);
      });
  };

  return (
    <Modal open={open} onClose={onClose}>
      <div
        style={{
          padding: "20px",
          backgroundColor: "white",
          margin: "20% auto",
          width: "400px",
        }}
      >
        <h2>Action for {selectedRow?.Doctorname}</h2>
        <ToastContainer position="top-right" />
        <form onSubmit={handleSubmit}>
          <FormControl fullWidth margin="normal">
            <InputLabel>Status</InputLabel>
            <Select
              value={Status}
              onChange={(e) => setStatus(e.target.value === "Approved")}
              label="Status"
            >
              <MenuItem value="Approved">Approved</MenuItem>
              <MenuItem value="Rejected">Rejected</MenuItem>
            </Select>
          </FormControl>
          <TextField
            label="Description"
            multiline
            rows={4}
            value={Description}
            onChange={(e) => setDescription(e.target.value)}
            fullWidth
            margin="normal"
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            disabled={loading}
          >
            {loading ? "Submitting..." : "Submit"}
          </Button>
        </form>
      </div>
    </Modal>
  );
};

export default ActionForm;
