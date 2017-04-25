angular
  .module('app')
  .service('DatabaseService', DatabaseService)

function DatabaseService($window, $rootScope, FakerService) {
  this.models = low('db.json');
  this.status = false;
  this.models.defaults({employees: []}).write();

  this.model = function(entity) {
    return this.models.get(entity);
  };

  this.resolve = function(query, delay) {
    var ms = delay || 0;
    return new Promise(function(resolve) {
      setTimeout(function() {
        resolve(query);
      }, ms)
    });
  }

  this.seed = function() {
    var self = this;
    return new Promise(function(resolve) {
      var status = JSON.parse($window.localStorage.getItem('db.status')) || false;
      if (!status) {
        FakerService.generate().then(function(employees) {
          self.models.set('employees', employees).write();
          $window.localStorage.setItem('db.status', true);
          $rootScope.$broadcast('seeded', {
            employees: self.models.get('employees').value(),
            status: $window.localStorage.getItem('db.status')
          });
          resolve(true);
        });
      } else {
        resolve(false);
      }
    });
  }
}

DatabaseService.$inject = ["$window", "$rootScope", "FakerService"];
