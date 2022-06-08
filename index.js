let express = require('express');
let mongoose = require('mongoose');
let bodyParser =  require("body-parser");
let cors =  require("cors");
const multer = require("multer");


let route = require("./app/router")
let app = express();
let port = process.env.PORT || 3000;
// app.use(express.urlencoded({ extended: false }));
// app.use(express.json({ extended: false }));
app.use(bodyParser.json({ limit: "30mb" }));
app.use(bodyParser.urlencoded({ extended: true, limit: "30mb" }));
app.use(cors());


mongoose.connect('mongodb+srv://udptbackend:udpt123456@cluster0.uohe5.mongodb.net/UDPT_backend?retryWrites=true&w=majority',
  {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }, err => {
    if(err) throw err;
    console.log('Connected to MongoDB!!!');
  }
);

app.use(express.json())

app.use("/", route)






app.listen(port);

console.log('RESTful API server started on: ' + port);
