const express = require("express");
require("dotenv").config();
const cors = require("cors");
const { Connection } = require("./database_connection/connect");
const authRoute = require("./routers/auth");
const linksRouter=require("./routers/linksRoute");
const app = express();
const port = process.env.PORT || 5555;

// Middleware
app.use(cors());
app.use(express.json());

//routes
app.use("/auth", authRoute);
app.use("/links",linksRouter);
// Database Connection
Connection()
    .then(() => console.log("Database connected!"))
    .catch((e) => {
        console.error("Error connecting to database", e);
    });


app.get('/', (req, res) => {
    res.send("Server is started running.");
});



app.listen(port, () => {
    console.log(`Server is started running at PORT: ${port}`);
});
