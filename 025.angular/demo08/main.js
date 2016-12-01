var PersonManager = function() {
    var fullNameSeparator = " ";

    return {
        setFullNameSeparator: function(separator) {
            fullNameSeparator = separator;
        },
        $get: function(person) {
            return {
                getPersonFirstName: function() {
                    return person.firstName;
                },
                getPersonLastName: function() {
                    return person.lastName;
                },
                getPersonFullName: function() {
                    return person.firstName + fullNameSeparator + person.lastName;
                }
            }
        }
    }
}

angular.module('app', [])

// register an object instance as a value and name it 'person'
.value('person', {
    firstName: '',
    lastName: ''
})

// register an provider width person management functions and name it personManager
.provider('personManager', PersonManager)

.config(function(personManagerProvider) {
    personManagerProvider.setFullNameSeparator('*');
})

.run(function(person) {
    person.firstName = "John";
    person.lastName = "Doe";
})

.controller('mainController', function($scope, person, personManager) {
    $scope.personInstance = person;
    $scope.personManagerInstance = personManager;
})
