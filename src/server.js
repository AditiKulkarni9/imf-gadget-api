require('dotenv').config();
const express = require('express');
const sequelize = require('./config/database');
const gadgetRoutes = require('./routes/gadgets');

const app = express();
app.use(express.json());
app.get("/", (req, res) => {
    res.send("IMF Gadget API is Running!");
});

app.use('/gadgets', gadgetRoutes);

const PORT = process.env.PORT || 3000;
sequelize.sync().then(() => {
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});
