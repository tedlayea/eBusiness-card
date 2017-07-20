var mongoose = require("mongoose")

var Schema = require("./connection.js")

var Schema = mongoose.Schema

var PersonSchema = new Schema ({
  name:String,
  email:String,
  phone:String,
  businessCard:String,
  location:String,
  rating:String,
  comment:String,
})

var Person = mongoose.model("Person", PersonSchema)

module.exports = {
  Person: Person
}
