require('dotenv').config();
const express = require('express');
const sequelize = require('./config/database');
const gadgetRoutes = require('./routes/gadgets');

const app = express();
app.use(express.json());

// Root route
app.get("/", (req, res) => {
    res.send("IMF Gadget API is Running!");
});

// Gadget routes
app.use('/gadgets', gadgetRoutes);

const PORT = process.env.PORT || 3000;

// Database Sync Error Handling
sequelize.sync({ alter: true }) 
  .then(() => {
      console.log("✅ Database synced successfully!");
      app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
  })
  .catch(err => {
      console.error("❌ Database Sync Error:", err);
      process.exit(1);
  });

module.exports = app; // for testing
