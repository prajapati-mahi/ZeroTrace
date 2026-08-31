const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      serverSelectionTimeoutMS: 5000,
    });
    console.log(`[MongoDB] Connected to database: ${conn.connection.host}`);
  } catch (error) {
    console.warn("\n==========================================================================");
    console.warn("⚠️  [MongoDB] Connection Failed to MongoDB Atlas!");
    console.warn("Reason: " + error.message);
    console.warn("Fix: Make sure your current IP address is whitelisted in MongoDB Atlas:");
    console.warn("1. Go to cloud.mongodb.com -> Security -> Network Access");
    console.warn("2. Click 'Add IP Address' -> Choose 'Allow Access from Anywhere' (0.0.0.0/0) or add your current IP");
    console.warn("3. Click Confirm");
    console.warn("==========================================================================\n");
  }
};

module.exports = connectDB;
