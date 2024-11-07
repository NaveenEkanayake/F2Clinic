const ApprovalModel = require("../models/approvalmodel");
const AppointmentModel = require("../models/appointment");

const approveAppointment = async(req, res) => {
    const Consultantname = req.fullname;
    const { Status, Description } = req.body;

    try {
        if (!Consultantname) {
            return res.status(400).json({ message: "Invalid Consultant ID." });
        }
        console.log("Consultantname:", Consultantname);
        const appointment = await AppointmentModel.findOne({
            Doctorname: { $in: [`Dr. ${Consultantname}`] },
        });

        if (!appointment) {
            return res.status(404).json({ message: "Appointment not found." });
        }
        appointment.Status = Status;
        await appointment.save();

        let approval = await ApprovalModel.findOne({
            appointmentId: appointment._id,
        });

        if (!approval) {
            approval = new ApprovalModel({
                appointmentId: appointment._id,
                Status: appointment.Status,
                Description: Description,
            });
        } else {
            approval.Status = appointment.Status;
            approval.Description = Description;
        }
        await approval.save();

        res.status(200).json({
            message: "Appointment  approval updated successfully.",
            data: approval,
        });
    } catch (error) {
        console.error("Error approving appointment:", error);
        res.status(500).json({ message: "Error approving appointment.", error });
    }
};

const getApprovalCount = async(req, res) => {
    const Consultantname = req.fullname; // Extracted from middleware

    try {
        if (!Consultantname) {
            return res.status(400).json({ message: "Consultant Not Found" });
        }

        // Find all appointments associated with the consultant
        const appointments = await AppointmentModel.find({
            Doctorname: `Dr. ${Consultantname}`,
        });

        // Extract appointment IDs
        const appointmentIds = appointments.map((appointment) => appointment._id);

        if (appointmentIds.length === 0) {
            return res
                .status(404)
                .json({ message: "No appointments found for this consultant." });
        }

        // Find approval records based on the appointment IDs
        const approvalRecords = await ApprovalModel.find({
            appointmentId: { $in: appointmentIds },
        });

        // Initialize counts
        let ApprovalCount = 0;
        let RejectCount = 0;

        // Count approvals and rejections
        approvalRecords.forEach((record) => {
            if (record.Status === "true") {
                ApprovalCount++;
            } else if (record.Status === "false") {
                RejectCount++;
            } else {
                console.log("Invalid Status value:", record.Status);
            }
        });
        res.status(200).json({
            message: "Approval and rejection count fetched successfully.",
            ApprovalCount,
            RejectCount,
        });
    } catch (error) {
        console.error("Error fetching approval counts:", error);
        res.status(500).json({ message: "Error fetching approval counts.", error });
    }
};

module.exports = {
    approveAppointment,
    getApprovalCount,
};