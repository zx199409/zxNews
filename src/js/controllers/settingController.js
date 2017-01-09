/**
 * Created by Administrator on 2016/12/9.
 */
angular.module('myApp.setting',[]).config(['$stateProvider','$urlRouterProvider',function ($stateProvider,$urlRouterProvider) {
    $stateProvider.state('setting',{
        url:'/setting',
        templateUrl:'setting.html',
        controller:'settingController'
    });
}]).controller('settingController',['$scope','$ionicBackdrop',function ($scope,$ionicBackdrop) {
    var a= 1;
    $scope.Change =function () {
        a++;
        if(a%2==0){
            $ionicBackdrop.retain();

        }else{
            $ionicBackdrop.release();
        }
    }
}]);