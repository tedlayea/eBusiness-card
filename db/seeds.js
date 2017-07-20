var Schema = require("./schema.js")

var Person = Schema.Person

Person.remove({},err=>{
  if (err){
    console.log(err);
  }
})


var x = new Person ({name: "Mr. aaa",email: "aaa@gmail.com", phone: 123456789, businessCard:"img01",location:"DC", rating: "8", comment: "met him on GA"})
var y = new Person ({name: "Ms. bbb",email: "bbb@yahoo.com", phone: 987654321, businessCard:"img02",location:"Virgina", rating: "9", comment: "met him on GA"})
var z = new Person ({name: "Dr. ccc",email: "ccc@hotmail.com", phone: 023456789, businessCard:"img03",location:"Maryland", rating: "7", comment: "met him on GA"})

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
