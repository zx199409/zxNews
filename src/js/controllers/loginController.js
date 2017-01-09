/**
 * Created by Administrator on 2016/12/8.
 */
angular.module('myApp.login',[]).config(['$stateProvider','$urlRouterProvider',function ($stateProvider,$urlRouterProvider) {
    $stateProvider.state('login',{
        url:'/login',
        templateUrl:'login.html',
        controller:'loginController'
    });
}]).controller('loginController',['$scope',function ($scope) {

}]);