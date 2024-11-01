const express = require("express");
const {
    getAllEmails,
    sendNotificationToCustomer,
    sendNotificationToConsultant,
    getNotificationsByEmail,
    updateNotification,
} = require("../controllers/notificationcontroller");
const { verifyAdminToken } = require("../controllers/admincontroller");
const {
    verifyConsultantToken,
} = require("../controllers/consultantlogincontroller");
const { verifyUserToken } = require("../controllers/customercontroller");
const router = express.Router();
router.get("/getAllEmails", verifyAdminToken, getAllEmails);
router.post(
    "/SendnotificationCustomer",
    verifyAdminToken,
    sendNotificationToCustomer
);
router.post(
    "/SendnotificationConsultant",
    verifyAdminToken,
    sendNotificationToConsultant
);
router.get(
    "/getAllConsultantMessages",
    verifyConsultantToken,
    getNotificationsByEmail
);
router.get("/getAllCustomerMessages", verifyUserToken, getNotificationsByEmail);
router.patch(
    "/updateConsultantNotifications",
    verifyConsultantToken,
    updateNotification
);
router.patch(
    "/updateCustomerNotifications",
    verifyUserToken,
    updateNotification
);

module.exports = router;