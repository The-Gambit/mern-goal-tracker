const mongoose = require("mongoose");


const goal_schema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: [true, "User is required"]
    },
    text: {
        type: String,
        required: [true, 'Please add a text value'],
    },
}
    , {
        timeStamps: true,
    }
)


module.exports = mongoose.model("Goal", goal_schema);