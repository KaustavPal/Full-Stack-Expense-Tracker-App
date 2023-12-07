const path = require("path");

const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const expenseRoutes = require("./routes/epense");
const sequelize = require("./utils/database");

const app = express();

app.use(cors());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

app.use("/user", expenseRoutes);

sequelize
  .sync()
  .then((result) => {
    app.listen(3000);
  })
  .catch((err) => {
    console.log(err);
  });
