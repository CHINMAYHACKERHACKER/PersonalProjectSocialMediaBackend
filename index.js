require('dotenv').config()
const express = require("express");
const cluster = require('node:cluster');
const numCPUs = require('node:os').availableParallelism();
const process = require('node:process');
const cors = require("cors");
const DB = require("./Database/Connection.js");
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const path = require('path');
const {createServer}=require("http");
DB();

const app = express();
const http=createServer(app);

app.use(cors({
    origin: true,
    credentials: true
}));

app.use(cookieParser());
app.use(express.json());
app.use(bodyParser.json());
app.use('/public/data/uploads', express.static(path.join(__dirname, 'public/data/uploads')));

app.use("/sign", require("./routes/signUpRoute.js"));
app.use("/login", require("./routes/loginRoute.js"));
app.use("/home", require("./routes/homePageRoute.js"));
app.use("/getUser", require("./routes/getUserListRoute.js"));
app.use("/friendrequest", require("./routes/friendRequestRoute.js"));
app.use("/uploadImage", require("./routes/uploadImageRoute.js"));
app.use("/getSearchFriendList", require("./routes/getSearchFriendsListRoute.js"));
app.use("/userProfile", require("./routes/userProfileRoute.js"));
app.use("/acceptedChatFriends", require("./routes/getChatFriendsRoute.js"));
app.use("/chat", require("./routes/chatRoute.js"));




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
    http.listen(port, () => {
        console.log(`server started on port ${port}`);
    })
    console.log(`Worker ${process.pid} started`);
}