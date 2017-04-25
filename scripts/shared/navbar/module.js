angular
  .module('app')
  .directive('navbar', navbar)
  .controller('NavbarCtrl', NavbarCtrl)

function navbar() {
  return {
    restrict: 'E',
    templateUrl: 'scripts/shared/navbar/navbar.html',
    controller: 'NavbarCtrl',
    controllerAs: 'vm'
  }
}

function NavbarCtrl() {
  var vm = this;
  vm.brand = "Customer Entry Spec"
}
