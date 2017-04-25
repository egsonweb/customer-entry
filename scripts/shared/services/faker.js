angular
  .module('app')
  .factory('FakerService', FakerService)

function FakerService() {
  var factoryObj = {
    generate: function(count) {
      var results = [];
      var numCount = count || 10;
      return new Promise(function(resolve) {
        for (var i=0; i<numCount; i++) {
          results.push({
              employeeId: faker.random.uuid(),
              firstname: faker.name.firstName(),
              lastname: faker.name.lastName(),
              phone: faker.phone.phoneNumberFormat(),
              email: faker.internet.email(),
              avatar: faker.internet.avatar(),
              address: {
                  streetName: faker.address.streetName(),
                  streetAddress: faker.address.streetAddress(),
                  city: faker.address.city(),
                  state: faker.address.stateAbbr(),
                  zipcode: faker.address.zipCode().split('-')[0]
              },
              job: {
                  title: faker.name.jobTitle(),
                  type: faker.name.jobType()
              }
          })
        }

        resolve(results)
      });
    }
  };

  return factoryObj;
}
