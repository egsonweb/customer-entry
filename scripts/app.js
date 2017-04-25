angular
  .module('app', ['ngMessages', 'employees'])
  .directive('app', app)

function app() {
  return {
    restrict: 'E',
    templateUrl: 'scripts/app.html'
  }
}
