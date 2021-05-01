const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const config = require("./config");
const PORT = 3000;
const routes = require("./routes");
const cors = require("cors");
const { mongoUrl } = require("./config");
const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// app.use(cors(origin = 'http:localhost:3000'));
routes(app);
mongoose.connect(mongoUrl, { useNewUrlParser: true },  { useFindAndModify: false },() => {
  console.log("connected to database");
});
// mongoose.set('useFindAndModify', false)
app.listen(PORT, () => {
  console.log("Server listening on port: " + PORT);
});
