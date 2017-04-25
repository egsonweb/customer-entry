angular
  .module('employees', [])
  .directive('employees', employees)
  .directive('employeesSeed', employeesSeed)
  // .directive('employeesList', employeesList)
  // .directive('employeesControls', employeesControls)

function employees() {
  return {
    restrict: 'E',
    templateUrl: 'scripts/employee/employee.html',
    controller: 'EmployeeCtrl',
    controllerAs: 'ec'
  }
}

function employeesSeed() {
  return {
    restrict: 'E',
    templateUrl: 'scripts/employee/employee-seed.html',
    controller: 'EmployeeSeedCtrl',
    controllerAs: 'esc',
    bindToController: true
  }
}

// function employeesList() {
//   return {
//     restrict: 'E',
//     scope: {
//       employees: '=',
//       checkall: '=',
//       selectedmin: '=',
//       select: '&',
//       selectall: '&'
//     },
//     templateUrl: 'scripts/employee/employee-list.html'
//   }
// }

// function employeesControls() {
//   return {
//     restrict: 'E',
//     scope: {
//       'count': '=',
//       'selected': '&',
//       'removeselected': '&',
//       'show': '&'
//     },
//     templateUrl: 'scripts/employee/employee-controls.html'
//   }
// }
