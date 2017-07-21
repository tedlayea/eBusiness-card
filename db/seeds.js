var Schema = require("./schema.js")

var Person = Schema.Person

Person.remove({},err=>{
  if (err){
    console.log(err);
  }
})

var x = new Person ({catagory: "Devlopers", name: "Mr. aaa",email: "aaa@gmail.com", phone: 1234567890, url:"www.sample.jpg",location:"DC", rating: "8", comment: "met him on Spotlight"})
var y = new Person ({catagory: "Car | Home | Insurance", name: "Ms. bbb",email: "bbb@yahoo.com", phone: 9787642492, url:"www.sample.jpg",location:"Virgina", rating: "9", comment: "met him on DC hacking"})
var z = new Person ({catagory: "Engineers", name: "Dr. ccc",email: "ccc@hotmail.com", phone: 2348375209, url:"www.sample.jpg",location:"Maryland", rating: "7", comment: "met him on GA"})

var persons = [x, y, z]

for (var i=0;i<persons.length;i++){
  persons[i].save((err,person)=>{
    if (err){
      console.log(err);
    }
    else {
      console.log(person);
    }
  })
}
