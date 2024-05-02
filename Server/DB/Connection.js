const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    // MongoDB connection string
    const con = await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true, // Corrected option name
      useUnifiedTopology: true,
    });

    console.log(`MongoDB connected: ${con.connection.host}`);
  } catch (err) {
    console.error(err); // Changed to console.error for better visibility
    process.exit(1);
  }
};

module.exports = connectDB;
