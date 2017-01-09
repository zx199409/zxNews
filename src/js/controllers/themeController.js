/**
 * Created by Administrator on 2016/12/2.
 */
angular.module('myApp.theme',[]).config(['$stateProvider','$urlRouterProvider',function ($stateProvider,$urlRouterProvider) {
    $stateProvider.state('tabs.theme',{
        url:'/theme',
        views:{
            'tabs-theme':{
                templateUrl:'theme.html',
                controller:'themeController'
            }
        }
    });
}]).controller('themeController',['$scope','HttpFactory',function ($scope,HttpFactory) {
    var url = "http://c.m.163.com/newstopic/list/classification.html";
        HttpFactory.getData(url).then(function (result) {
            $scope.items2 = result.data;

            // console.log(result);


        });
    var myDiv =document.querySelector('#row');
    var btn = document.querySelector('.float');
    btn.onclick=function () {
        if(myDiv.style.height == '300px'){
            myDiv.style.height = '100px';
            btn.style.transform = 'rotate(0deg)';

        }else{
            myDiv.style.height = '300px';
            btn.style.transform = 'rotate(180deg)';
        }
    }
    var url = "http://c.m.163.com/newstopic/list/expert/5YyX5Lqs/0-10.html";
    HttpFactory.getData(url).then(function (result) {
        $scope.its = result.data.expertList;

        console.log(result);


    });

}]);