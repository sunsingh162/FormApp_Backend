const mongoose = require("mongoose");

const folderSchema = new mongoose.Schema({
  folderName: {
    type: String,
    required: true,
  },
  userId: {
    type: String,
    required: true,
  },
  folderId: {
    type: mongoose.Schema.Types.ObjectId,
    auto: true,
  },
});

const FolderModel = mongoose.model("Folder", folderSchema);

module.exports = FolderModel;
