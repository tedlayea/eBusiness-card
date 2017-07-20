var Schema = require ("../db/schema.js")

var Person = Schema.Person

var contactController ={
  index(req,res){
    Person.find({},(err,contacts)=>{
      // console.log(contacts);
      res.send(contacts)
    })
  },
  show(req,res){
    Person.findOne({name: req.params.name},(err,contact)=>{
      // console.log(contact);
      res.send(contact)
    })
  },
  create(req,res){
    Person.create({name: req.body.name},(err,contact)=>{
      if (err){
        // console.log(err);
        res.send(err)
      }
      else {
        // console.log(contact);
        res.send(contact)
      }
    })
  },
  update(req,update,res){
    Person.findOneAndUpdate({name: req.body.name}, {name: update.body.name}, {new:true}, (err, result)=>{
      if (err){
        // console.log(err);
        res.send(err)
      }

      else {
        // console.log(result);
        res.send(resulr)
      }
    })
  },
  destroy(req,res){
    Person.findOneAndRemove(req,(err,docs)=>{
      if(err){
        // console.log(err);
        res.send(err)
      }
      else {
        // console.log(docs);
        res.send(docs)
      }
    })
  }
}

// contactController.index();
// contactController.show({name: "Dr. ccc"})
// contactController.create({name:"www"})
// contactController.update({name: "www"}, {name: "zzz"});
// contactController.destroy({name:"zzz"})

module.exports = contactController
