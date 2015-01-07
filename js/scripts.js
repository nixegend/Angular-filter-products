var productsFilterModule = angular.module('productsAppFilter', ['ngAnimate']);

productsFilterModule.controller('ProductsFilterCtrl', ['$scope', function ($scope){
  
//==============================================================
    $scope.productsFilters = function (obj) {
      var newObj = new Object();
      var filterCriteria = ['color', 'manufacture', 'memory'];

      for (var i = 0; i < filterCriteria.length; i++) {
          var arrCriteria = obj.map(function (m) {
            for (var p in m) {
              return m[filterCriteria[i]];
            }
              }).filter(function (m, idx, arr) {
                  return arr.indexOf(m) == idx;
              });

        if(isNaN(arrCriteria[0])){
          newObj[filterCriteria[i]] = arrCriteria.sort();
        } else {
          newObj[filterCriteria[i]] = arrCriteria.sort(function(a, b){return a-b});
        }
      }

      $scope.filterCriteria = newObj;
    }
//==============================================================

$scope.products = [
    {name:'iPhone 4', manufacture:'Apple', color:'black', memory: '8'},
    {name:'iPhone 4', manufacture:'Apple', color:'white', memory: '16'},
    {name:'iPhone 4S', manufacture:'Apple', color:'black', memory: '8'},
    {name:'iPhone 4S', manufacture:'Apple', color:'white', memory: '16'},
    {name:'iPhone 4S', manufacture:'Apple', color:'white', memory: '32'},
    {name:'iPhone 5', manufacture:'Apple', color:'black', memory: '8'},
    {name:'iPhone 5', manufacture:'Apple', color:'white', memory: '16'},
    {name:'iPhone 5', manufacture:'Apple', color:'black', memory: '32'},
    {name:'iPhone 5S', manufacture:'Apple', color:'black', memory: '16'},
    {name:'iPhone 5S', manufacture:'Apple', color:'white', memory: '32'},
    {name:'iPhone 5S', manufacture:'Apple', color:'black', memory: '64'},
    {name:'One', manufacture:'HTC', color:'black', memory: '8'},
    {name:'One V', manufacture:'HTC', color:'white', memory: '8'},
    {name:'One X', manufacture:'HTC', color:'black', memory: '16'},
    {name:'Lumia 530', manufacture:'Nokia', color:'black', memory: '4'},
    {name:'Lumia 630', manufacture:'Nokia', color:'white', memory: '4'},
    {name:'N9', manufacture:'Nokia', color:'white', memory: '8'},
    {name:'N95', manufacture:'Nokia', color:'black', memory: '8'}
];

//==============================================================

  $scope.count = function (value, prop) {
    return function (obj) {
      return obj[prop] == value;
    }
  }

//==============================================================
      var criteriaObj = {};
    $scope.filterProducts = function (param, prop) {
      var arrProducts = [];

      function getProductsObj (scopeArr) {
        arrProducts = [];
        return (scopeArr.length == 0) ? $scope.products : scopeArr;
      }

      if (criteriaObj.hasOwnProperty(prop)) {
        var x = criteriaObj[prop].indexOf(param);
        if (x > -1) {
          criteriaObj[prop].splice(x, 1);
          if (criteriaObj[prop].length == 0) 
          delete(criteriaObj[prop]);
        } else {
          criteriaObj[prop].push(param);
        }
      } else {
        criteriaObj[prop] = [param];
      }

      for (var p in criteriaObj) {
        getProductsObj(arrProducts).map(function (obj) {
          if (criteriaObj[p].indexOf(obj[p]) > -1) 
            arrProducts.push(obj);
        });
      }

      var retakeProducts = (arrProducts.length == 0) ? $scope.products : arrProducts;

      $scope.scopeProducts(retakeProducts);
    }
//==============================================================

  $scope.scopeProducts = function (arrProductsObj) {
   $scope.displayProducts = arrProductsObj;
  }

//==============================================================
  $scope.scopeProducts($scope.products);
  $scope.productsFilters($scope.products);

}]);