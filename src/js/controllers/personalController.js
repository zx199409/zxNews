/**
 * Created by Administrator on 2016/12/2.
 */
angular.module('myApp.personal',[]).config(['$stateProvider','$urlRouterProvider',function ($stateProvider,$urlRouterProvider) {
    $stateProvider.state('tabs.personal',{
        url:'/personal',
        views:{
            'tabs-personal':{
                templateUrl:'personal.html',
                controller:'personalController'
            }
        }
    });
}]).controller('personalController',['$scope','$ionicActionSheet',function ($scope,$ionicActionSheet) {
    $scope.show = function() {

        var hideSheet = $ionicActionSheet.show({
            buttons: [
                { text: '<b>Share</b> This' },
                { text: '离开' }
            ],
            destructiveText: 'Delete',
            titleText: 'Modify your album',
            cancelText: '签到',
            cancel: function() {
            },
            buttonClicked: function(index) {
                return true;
            }
        });



    };
}]);