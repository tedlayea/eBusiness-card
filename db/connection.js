var mongoose = require("mongoose")

mongoose.connect('mongodb://localhost/eBusiness_card');

var db =mongoose.connection;
db.on('error',err=>{
  console.log(err);
})
db.once('open',()=>{
  console.log("Databse connected!");
})
