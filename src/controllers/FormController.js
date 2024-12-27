const Form = require("../models/formSchema");
const Folder = require("../models/folderSchema");

const FormController = {
  createForm: async (req, res) => {
    try {
      const { userId, folderId, formName, sharedLink, formDetails } = req.body;

      if (folderId) {
        const folder = await Folder.findById(folderId);
        if (!folder) {
          return res.status(404).json({ error: "Folder not found" });
        }
      }

      const newForm = new Form({
        userId,
        folderId: folderId || null,
        formName: formName || "Untitled Form",
        sharedLink,
        formDetails,
      });

      const savedForm = await newForm.save();

      res.status(201).json(savedForm);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  getFormsByUser: async (req, res) => {
    try {
      const { userId } = req.params;

      const forms = await Form.find({ userId });

      res.status(200).json(forms);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  getFormsByFolder: async (req, res) => {
    try {
      const { folderId, userId } = req.params;
      console.log(folderId, userId);

      const query = folderId
        ? { folderId, userId }
        : { folderId: null, userId };

      const forms = await Form.find(query);

      console.log(`Found ${forms.length} forms`);

      res.status(200).json(forms);
    } catch (error) {
      console.error("Error fetching forms:", error);
      res.status(500).json({ error: "Something went wrong" });
    }
  },

  getFormById: async (req, res) => {
    try {
      const { formId } = req.params;

      const form = await Form.findById(formId);

      if (!form) {
        return res.status(404).json({ error: "Form not found" });
      }
      res.status(200).json(form);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  updateForm: async (req, res) => {
    try {
      const { formId } = req.params;
      const { formName, sharedLink, formDetails } = req.body;

      const updatedForm = await Form.findByIdAndUpdate(
        formId,
        { formName, sharedLink, formDetails },
        { new: true }
      );

      if (!updatedForm) {
        return res.status(404).json({ error: "Form not found" });
      }

      res.status(200).json(updatedForm);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  deleteForm: async (req, res) => {
    try {
      const { formId } = req.params;

      const deletedForm = await Form.findByIdAndDelete(formId);

      if (!deletedForm) {
        return res.status(404).json({ error: "Form not found" });
      }
      res.status(200).json({ message: "Form deleted successfully" });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  updateFormDetails: async (req, res) => {
    try {
      const { formId } = req.params;
      const { formDetails } = req.body;

      const form = await Form.findById(formId);

      if (!form) {
        return res.status(404).json({ error: "Form not found" });
      }
      form.formDetails = formDetails;

      const updatedForm = await form.save();
      res.status(200).json(updatedForm);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  getFormsWithoutFolder: async (req, res) => {
    try {
      const { userId } = req.params;
      const forms = await Form.find({ folderId: null, userId });

      res.status(200).json(forms);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  updateFormTheme: async (req, res) => {
    try {
      const { formId } = req.params;
      const { theme } = req.body;

      const updatedForm = await Form.findByIdAndUpdate(
        formId,
        { theme },
        { new: true }
      );

      if (!updatedForm) {
        return res.status(404).json({ error: "Form not found" });
      }
      res.status(200).json(updatedForm);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
};

module.exports = FormController;
