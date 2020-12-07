const express = require("express");
const port = process.env.PORT || 3000;
const tracks = require("./routes/tracks");
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use("/api/collection", tracks);

//Listen for port
app.listen(port);