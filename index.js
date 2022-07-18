let express = require("express");
let mongoose = require("mongoose");
var { amqp } = require("amqplib/callback_api");
let bodyParser = require("body-parser");
let cors = require("cors");
let rabbit = require("./rabbitMq.js");
const multer = require("multer");

let route = require("./app/router");
let app = express();
let port = process.env.PORT || 3002;
// app.use(express.urlencoded({ extended: false }));
// app.use(express.json({ extended: false }));
app.use(bodyParser.json({ limit: "30mb" }));
app.use(bodyParser.urlencoded({ extended: true, limit: "30mb" }));
app.use(cors());


// amqp.connect("amqp://localhost", function (error0, connection) {
//   if (error0) {
//     throw error0;
//   }
//   connection.createChannel(function (error1, channel) {
//     if (error1) {
//       throw error1;
//     }
//     var queue = "hello";
//     var msg = "Hello nha may 1 world";

//     channel.assertQueue(queue, {
//       durable: false,
//     });

//     channel.sendToQueue(queue, Buffer.from(msg));
//     console.log(" [x] Sent %s", msg);

//     channel.assertQueue("product", {
//       durable: false,
//     });

//     channel.sendToQueue(queue, Buffer.from(msg));
//     console.log(" [x] Sent %s", msg);
//   });
// });

// setTimeout(function () {
//   connection.close();
//   process.exit(0);
// }, 500);

mongoose.connect(
  "mongodb+srv://udptbackend:udpt123456@cluster0.uohe5.mongodb.net/UDPT_backend?retryWrites=true&w=majority",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  (err) => {
    if (err) throw err;
    console.log("Connected to MongoDB!!!");
  }
);

app.use(express.json());

app.use("/", route);

app.listen(port);

console.log("RESTful API server started on: " + port);
