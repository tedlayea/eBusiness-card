var mongoose = require("mongoose")

var Schema = require("./connection.js")

var Schema = mongoose.Schema

var PersonSchema = new Schema ({
  catagory:{
    type:String,
    required: true
  },
  name:String,
  email:String,
  phone:{
    type:String,
    validate:[
      function(phone){
        return phone.length==10;
      },
      'Phone number must be 10 digit'
    ]
  },
  url:String,
  location:String,
  rating:String,
  comment:String,
  img:{
    data:Buffer,
    contentType:String
  }
})

var Person = mongoose.model("Person", PersonSchema)

module.exports = {
  Person: Person
}
