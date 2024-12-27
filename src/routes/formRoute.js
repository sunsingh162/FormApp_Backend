const express = require("express");
const router = express.Router();
const FormController = require("../controllers/FormController");
const verifyToken = require("../middlewares/verifyToken");

router.post("/createform", verifyToken, FormController.createForm);

router.get("/user/form/:userId", verifyToken, FormController.getFormsByUser);

router.get(
  "/folder/forms/:userId/:folderId?",
  verifyToken,
  FormController.getFormsByFolder
);

router.get("/form/:formId", verifyToken, FormController.getFormById);

router.put("/form/update/:formId", verifyToken, FormController.updateForm);

router.delete("/form/delete/:formId", verifyToken, FormController.deleteForm);

router.put("/form/update/:formId", FormController.updateFormDetails);

router.get(
  "/form/withoutfolderId/:userId",
  FormController.getFormsWithoutFolder
);

router.put("/:formId/theme", FormController.updateFormTheme);

module.exports = router;
