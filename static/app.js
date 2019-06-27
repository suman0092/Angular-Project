var app = angular.module('angularApp', ['angularUtils.directives.dirPagination']);
app.controller('angularController', function ($scope, $http, $rootScope) {
    $scope.items = [];
    var token = [];
    $scope.resultsPerPage = 12;
    $scope.myVar = 'home';
    $scope.activeHome = 'active';

    $scope.getItems = function () {
        $http({ method: 'GET', url: 'https://vast-shore-74260.herokuapp.com/banks?city=' + $scope.citymodel, cache: true })
            .then(function (data) {
                $scope.items = angular.fromJson(data);
                $scope.savedData = localStorage.getItem("token");
            }, function (data) {
                alert("Error");
            });
        };

    $scope.setFavourite = function (x) {
        if (!localStorage.getItem("token")) {
            localStorage.setItem("token", JSON.stringify(token));
        }
        token = angular.fromJson(localStorage.getItem("token"));
        if ((token.find(array => array.x.ifsc === x.ifsc)) == undefined) {
            token.push({ x });
            localStorage.setItem("token", JSON.stringify(token));
            $scope.savedData = angular.fromJson(localStorage.getItem("token"));
        } else {
            token.splice(token.findIndex(array => array.x.ifsc === x.ifsc), 1);
            localStorage.setItem("token", JSON.stringify(token));
            $scope.savedData = angular.fromJson(localStorage.getItem("token"));
            token = localStorage.getItem("token");
        }
    }

    $scope.getFavourite = function () {
        if ($scope.savedData != undefined) {
            $scope.savedData = angular.fromJson(localStorage.getItem("token"));
        } else {
            $scope.savedData = angular.fromJson(localStorage.getItem("token"));
        }
    }

    $scope.ifNotExists = function (x) {
        if (!localStorage.getItem("token")) {
            localStorage.setItem("token", JSON.stringify(token));
        }
       token = angular.fromJson(localStorage.getItem("token"));
        if ((token.find(array => array.x.ifsc === x)) == undefined) {
            return true;
        }
    }

    $scope.ifExists = function (x) {
        if (!localStorage.getItem("token")) {
        localStorage.setItem("token", JSON.stringify(token));
            }
       token = angular.fromJson(localStorage.getItem("token"));
        if ((token.find(array => array.x.ifsc === x)) == undefined) {
      
        } else {
            return true;
        }    
    }

    $scope.searchItem = function (row) {
        return (angular.lowercase(row.ifsc).indexOf(angular.lowercase($scope.bankName) || '') !== -1 ||
                angular.lowercase(row.bank_name).indexOf(angular.lowercase($scope.bankName) || '') !== -1 ||
                angular.lowercase(row.branch).indexOf(angular.lowercase($scope.bankName) || '') !== -1 ||
                angular.lowercase(row.city).indexOf(angular.lowercase($scope.bankName) || '') !== -1);
    }
});