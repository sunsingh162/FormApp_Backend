const mongoose = require("mongoose");
const { Schema } = mongoose;

const formDetailSchema = new Schema({
  inputType: {
    type: String,
    enum: ["Bubbles", "inputs"],
    required: true,
  },
  type: {
    type: String,
    enum: [
      "text",
      "number",
      "email",
      "date",
      "buttons",
      "phone",
      "rating",
      "gif",
      "video",
      "image",
    ],
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  showValue: {
    type: String,
    default: "",
  },
});

const formSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  folderId: {
    type: mongoose.Schema.Types.ObjectId,
    default: null,
  },
  formName: {
    type: String,
    default: "Untitled Form",
  },
  sharedLink: {
    type: String,
    unique: true,
    default: null,
  },
  formDetails: {
    type: [formDetailSchema],
    default: [],
  },
});

module.exports = mongoose.model("Form", formSchema);
