(function() {
    'use strict';

    var app = angular.module('jsPrimer', []);

    app.run(function () {
        console.log('Hello, world!!!');

        var string = 'Sergio Fernández González Iñárritu';
        console.log(angular.lowercase(string));
        console.log(string.toLowerCase());

        // Extending objects
        var myData = {
            name: 'Sergio',
            weather: 'partly cloudy',
            printMessages: function() {
                console.log('Hello ' + this.name + '.');
                console.log('Today is ' + this.weather + '.');
            }
        };

        var myExtendedObject = {
            city: 'Madrid',
            printMessages: function () {
                console.log('Hello ' + this.name + '.');
                console.log('Today in ' + this.city + ' it is ' + this.weather + '.');    
            }
        };

        angular.extend(myExtendedObject, myData);

        myExtendedObject.printMessages();

        console.log('*** angular.forEach(obj, func):');
        angular.forEach(myExtendedObject, function(value, key) {
            console.log(key + ': ' + value);
        });


        console.log('*** JavaScript Array.forEach():');
        var array = [100, 'Adam', true];
        array.forEach(function(elem){
            console.log(elem);
        });

        console.log('*** JavaScript angular.forEach():');
        angular.forEach(array, function(elem) {
            console.log(elem);
        });
        console.log('*** JavaScript angular.forEach() with keys:');
        angular.forEach(array, function(elem, index) {
            console.log('[' + index + ']=' + elem);
        });

        console.log('*** angular.isDefined():');
        var myVar; // undefined
        var myVar2 = null;

        console.log(angular.isDefined(myVar));
        console.log(angular.isDefined(myVar2));
        console.log(angular.isUndefined(myVar));
        console.log(angular.isUndefined(myVar2));

    });

})();
