angular
  .module('employees')
  .service('EmployeeService', EmployeeService)

function EmployeeService(DatabaseService) {
  this.db = DatabaseService;
  this.employees = this.db.model('employees')

  this.find = find;
  this.findById = findById;
  this.create = create;
  this.update = update;
  this.remove = remove;

  function find() {
    const query = this.employees.value(); 
    return this.db.resolve(query);
	}

  function findById(id) {
    const query = this.employees.findIndex({
      employeeId: id
    }).value();

    return this.db.resolve(query);
  }

  function create(employee) {
    const newEmployee = Object.assign(employee, {
      employeeId: faker.random.uuid(),
      avatar: faker.internet.avatar(),
      job: {
          title: faker.name.jobTitle(),
          type: faker.name.jobType()
      }
    });
    const query = this.employees.unshift(newEmployee).write();

    return this.db.resolve(query[0]);
 }

  function update(employee) {
    const query = this.employees.find({
      employeeId: employee.employeeId
    }).assign(employee).write();

    return this.db.resolve(query);
  }

  function remove(employeeId) {
    const query = this.employees.remove({
      employeeId: employeeId
    }).write();

    return this.db.resolve(query);
  }
}

EmployeeService.$inject = ["DatabaseService"];
