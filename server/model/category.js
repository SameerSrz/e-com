const mongoose = require("mongoose");


const categorySchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, "Please enter your category name!"],
      },
      image: {
        type: String,
        required: [true, "Please enter your category image!"],
      },
      createdAt: {
        type: Date,
        default: Date.now(),
      },
})



module.exports = mongoose.model("Category", categorySchema);
