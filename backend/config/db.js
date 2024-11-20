const mongoose = require("mongoose");

// Function to connect to the MongoDB database
const connectDB = async () => {
    try {
        // Attempt to connect to the MongoDB server using the specified connection URI
        await mongoose.connect("mongodb://127.0.0.1:27017/Travel-tourism", {
            useNewUrlParser: true,  // Option to use the new URL parser
            useUnifiedTopology: true,  // Option to use the new unified topology
        });
        console.log("MongoDB connected successfully"); // Log success message if connection is successful
    } catch (err) {
        // Catch any errors during the connection attempt
        console.error("MongoDB connection failed:", err.message);  // Log error message
        process.exit(1);  // Exit the process with an error code
    }
};

// Export the connectDB function so it can be used in other parts of the app
module.exports = connectDB;
