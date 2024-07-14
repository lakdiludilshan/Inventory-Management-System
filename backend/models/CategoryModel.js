const mongoose = require("mongoose");

const CategorySchema = new mongoose.Schema(
    {
        name: {
        type: String,
        required: [true, "Please provide a name"],
        min: 6,
        max: 255,
        },
    },
    { timestamps: true }
    );
    
    module.exports = mongoose.model("Category", CategorySchema);