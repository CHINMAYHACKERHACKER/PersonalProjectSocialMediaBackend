require('dotenv').config()
const express = require("express");
const cluster = require('node:cluster');
const numCPUs = require('node:os').availableParallelism();
const process = require('node:process');
const cors = require("cors");
const DB = require("./Database/Connection.js");
const cookieParser = require('cookie-parser');
DB();

const app = express();

app.use(cors({
    origin: true,
    credentials: true
}));

app.use(cookieParser());
app.use(express.json());

app.use("/sign", require("./routes/signUpRoute.js"));
app.use("/login", require("./routes/loginRoute.js"));
app.use("/home", require("./routes/homePageRoute.js"));

if (cluster.isPrimary) {
    console.log(`Primary ${process.pid} is running`);

    //^ Fork workers.
    for (let i = 0; i < numCPUs; i++) {
        cluster.fork();
    }

    cluster.on('exit', (worker, code, signal) => {
        console.log(`worker ${worker.process.pid} died`);
    });
} else {
    const port = process.env.PORT;
    app.listen(port, () => {
        console.log(`server started on port ${port}`);
    })
    console.log(`Worker ${process.pid} started`);
}   