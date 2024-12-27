const Folder = require("../models/folderSchema");
const Form = require("../models/formSchema");

const FolderController = {
  createFolder: async (req, res) => {
    try {
      const { folderName, userId } = req.body;

      const newFolder = new Folder({
        folderName,
        userId,
      });

      const savedFolder = await newFolder.save();

      res.status(201).json(savedFolder);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  getFoldersByUser: async (req, res) => {
    try {
      const { userId } = req.params;

      const folders = await Folder.find({ userId });

      res.status(200).json(folders);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  getFolderById: async (req, res) => {
    try {
      const { folderId } = req.params;

      const folder = await Folder.findById(folderId);

      if (!folder) {
        return res.status(404).json({ error: "Folder not found" });
      }

      res.status(200).json(folder);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  updateFolder: async (req, res) => {
    try {
      const { folderId } = req.params;
      const { folderName } = req.body;

      // Finding the folder by its ID and updating its name
      const updatedFolder = await Folder.findByIdAndUpdate(
        folderId,
        { folderName },
        { new: true }
      );

      if (!updatedFolder) {
        return res.status(404).json({ error: "Folder not found" });
      }

      res.status(200).json(updatedFolder);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  deleteFolder: async (req, res) => {
    try {
      const { folderId } = req.params;

      const deletedFolder = await Folder.findByIdAndDelete(folderId);

      if (!deletedFolder) {
        return res.status(404).json({ error: "Folder not found" });
      }

      await Form.deleteMany({ folderId });
      res
        .status(200)
        .json({ message: "Folder and associated forms deleted successfully" });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
};

module.exports = FolderController;
