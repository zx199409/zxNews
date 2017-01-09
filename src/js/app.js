/**
 * Created by Administrator on 2016/12/2.
 */
angular.module('myApp',['ionic','myApp.urls','myApp.httpFactory','myApp.slideBox','myApp.tabs','myApp.news','myApp.live','myApp.theme','myApp.personal','myApp.newsSummary','myApp.login','myApp.setting','myApp.news1','myApp.news2']).config(['$stateProvider','$urlRouterProvider',function ($stateProvider,$urlRouterProvider) {
    $stateProvider.state('tabs',{
        url:'/tabs',
        abstract:true,
        templateUrl:'tabs.html',
        controller:'tabsController'
    });
    $urlRouterProvider.otherwise('tabs/news');
}]);