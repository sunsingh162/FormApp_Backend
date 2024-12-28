const express = require("express");
const router = express.Router();
const userActionController = require("../controllers/userActionController");

//Route to create a new user action
router.post("/add-new-sharedLink/", userActionController.addNewSharedLink);

//Route to add formFiller Registration details to the user
router.post(
  "/add-new-user-to-shared-link/",
  userActionController.addUserToFormFillerData
);

//Route to add FormFiller response to the FormDeatils
router.post(
  "/add-new-user-form-details/",
  userActionController.addUserInputToFormDetails
);

//Get all the details related to shared link
router.get(
  "/get-shared-link-details/",
  userActionController.getUserActionsBySharedLink
);

module.exports = router;
