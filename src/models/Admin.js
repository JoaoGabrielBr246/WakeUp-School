const mongoose = require("mongoose");

const AdminSchema = new mongoose.Schema({
    senha: { type: String, required: true }
});

module.exports = mongoose.model("Admin", AdminSchema);
