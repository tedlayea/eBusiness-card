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
 this.searchFunction = function(){
   console.log("clicked");
 }
}
function IndexControllerFunction(Factory,$state){
  console.log("Index controller started");
  this.contacts = Factory.query()

 this.newContact = new Factory()
 this.create = function(){
   console.log(this.newContact);
   this.newContact.$save().then(function(contact){
     $state.go("show", {name: contact.name})
   }).catch(err=>{
     console.log(err);
   }
   )
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
