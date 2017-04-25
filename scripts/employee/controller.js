angular
  .module('employees')
  .controller('EmployeeSeedCtrl', EmployeeSeedCtrl)
  .controller('EmployeeCtrl', EmployeeCtrl)

function EmployeeSeedCtrl($window, DatabaseService) {
  var vm = this;

  vm.seeded = $window.localStorage.getItem('db.status') || false;
  vm.seed = seed;

  function seed() {
    DatabaseService.seed().then(function(response) {
      console.log('Database seeded!');
    });
  }
}

EmployeeSeedCtrl.$inject = ["$window", "DatabaseService"];

function EmployeeCtrl($scope, EmployeeService) {
  var vm = this;
  vm.employees = [];
  vm.employee = {};

  vm.checkAll = false;
  vm.showModal = false;
  vm.editing = false;
  vm.submit = false;

  vm.reset = reset;
  vm.cancel = cancel;
  vm.edit = edit;
  vm.show = show;
  vm.selected = selected;
  vm.select = select;
  vm.selectAll = selectAll;
  vm.isValid = isValid;

  vm.add = add;
  vm.update = update;
  vm.remove = remove;
  vm.removeSelected = removeSelected

  var unsubscribe = $scope.$on('seeded', (scope, data) => {
    $scope.$applyAsync(function() {
      vm.employees = data.employees;
      if (data.status) {
        unsubscribe();
      }
    });
  });

  EmployeeService.find().then(function(employees) {
    $scope.$applyAsync(function() {
      vm.employees = employees;
      vm.reset();
    });
  });

  function show() {
    vm.showModal = true;
  }
  
  function reset() {
    vm.newEmployee = angular.copy(vm.employee);
    vm.showModal = false;
    vm.editing = false;
    vm.submit = false;
  }

  function cancel() {
    $scope.$applyAsync(() => {
      vm.reset();
    });
  }

  function edit(employee) {
    vm.editing = true;
    vm.showModal = true;
    vm.newEmployee = angular.copy(employee);
  }

  function selected() {
    return vm.employees.filter(function(employee) {
      return employee.selected;
    }).length;
  }

  function select(employeeId) {
    EmployeeService.findById(employeeId).then(function(employeeIdx) {
      var allEmployees = vm.employees.length;
      var selectedEmployees = vm.selected();

      $scope.$applyAsync(function() {
        vm.checkAll = allEmployees === selectedEmployees ? true : false;
        if (vm.employees[employeeIdx].selected) {
          vm.employees[employeeIdx].selected = true;
        } else {
          vm.employees[employeeIdx].selected = false;
        }
      });
    });
  }

  function selectAll() {
    if (vm.checkAll) {
      vm.employees
        .filter(function(employee) {
          return !employee.selected;
        })
        .forEach(function(employee) {
          employee.selected = !employee.selected;
        });
    } else {
      vm.employees.forEach(function(employee) {
        employee.selected = !employee.selected;
      });
    }
  }

  function isValid() {
    return vm.employeeForm.$dirty && vm.employeeForm.$valid;
  }

  function add() {
    vm.submit = true;
    if (vm.isValid()) {
      EmployeeService.create(vm.newEmployee).then(function() {
        $scope.$applyAsync(function() {
          vm.submit = false;
          vm.reset();
        });
      });
    }

    return false;
  }

  function update() {
    vm.submit = true;
    if (vm.isValid()) {
      EmployeeService.update(vm.newEmployee).then(function() {
        $scope.$applyAsync(function() {
          vm.submit = false;
          vm.reset();
        });
      });
    }

    return false;
  }

  function remove(id) {
    EmployeeService.remove(id).then(function() {
      $scope.$applyAsync();
    });
  }

  function removeSelected() {
    var selectedEmployees = vm.employees.filter(
      employee => employee.selected
    );

    selectedEmployees.forEach(function(employee) {
      vm.remove(employee.employeeId);
    });
  }
}

EmployeeCtrl.$inject = ["$scope", "EmployeeService"];
