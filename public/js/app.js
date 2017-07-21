angular
.module ("app",[
  "ngResource",
  "ui.router"])
.config([
   "$stateProvider",
   Router
 ])
 .factory("Factory", [
  "$resource",
  FactoryFunction
])
 .controller("GeneralController",[GeneralControllerFunction])
 .controller("IndexController",["Factory","$state",IndexControllerFunction])
 .controller("ShowController",["Factory","$state","$stateParams",ShowControllerFunction])

function GeneralControllerFunction(){
  console.log("GeneralController started" );
}
function IndexControllerFunction(Factory,$state){
  console.log("Index controller started");
  this.contacts = Factory.query()

 this.newContact = new Factory()
 this.create = function(){
   console.log(this.newContact);
   this.newContact.$save().then(function(contact){
     console.log("created");
     $state.go("show", {name: contact.name})
   }).catch(err=>{
     console.log(err);
   }
   )
 }
 this.filterCarHomeInsurance = function(){
    this.filterCriteria = "Car | Home | Insurance"
 }
 this.filterHealth = function(){
    this.filterCriteria = "Health"
 }
 this.filterDevlopers = function(){
    this.filterCriteria = "Devloper"
 }
 this.filterEngineers = function(){
    this.filterCriteria = "Engineers"
 }
 this.filterMarketingManagment = function(){
    this.filterCriteria = "Marketing | Managment"
 }
 this.filterUniversitiesCollegesBootcamp = function(){
    this.filterCriteria = "Universities | Colleges | Boot-camp'"
 }
 this.filterdevlopers = function(){
    this.filterCriteria = "Other'"
 }
}
function ShowControllerFunction(Factory, $state, $stateParams){
  console.log("Show controller started");
  this.contact = Factory.get({name: $stateParams.name})

  this.update = function(){
    console.log("update started");
    this.contact.$update({name: $stateParams.name}).then(function(contact) {
      console.log(catagory);
      // $state.go("show", {name: catagory.name});
    })
  }
  this.destroy = function(){
    console.log("destroy started");
    this.contact.$delete({name: $stateParams.name}).then(function(contact) {
      console.log("Deleted!!!");
      $state.go("index");
    })
  }

}

function Router($stateProvider){
  $stateProvider
  .state("index",{
    url: '/',
    templateUrl: '/assets/ng-views/index.html',
    controller: "IndexController",
    controllerAs: "vm"
  })
  .state("show",{
    url: '/:name',
    templateUrl: '/assets/ng-views/show.html',
    controller: "ShowController",
    controllerAs: "vm"
  })
}
function FactoryFunction($resource){
  return $resource("/backend/:name", {}, {
    update: {method:"PUT"}
  })
}
