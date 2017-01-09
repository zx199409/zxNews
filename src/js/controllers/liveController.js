/**
 * Created by Administrator on 2016/12/2.
 */
angular.module('myApp.live',[]).config(['$stateProvider','$urlRouterProvider',function ($stateProvider,$urlRouterProvider) {
    $stateProvider.state('tabs.live',{
        url:'/live',
        views:{
            'tabs-live':{
                templateUrl:'live.html',
                controller:'liveController'
            }
        }

    });
}]).controller('liveController',['$scope','$sce','$ionicLoading','HttpFactory',function ($scope,$sce,$ionicLoading,HttpFactory) {
    $scope.show = function () {
        $ionicLoading.show({
            template:'Loading...'
        });
    };
    $scope.hide =function () {
        $ionicLoading.hide();
    };
    $scope.show();

    $scope.live = {
        slideSource:[]
    };
    var url = "http://data.live.126.net/livechannel/previewlist.json";
    HttpFactory.getData(url).then(function (result) {
        $scope.hide();
        var img_title_Array = [];
        if (result.top.length){
            for (var i = 0;i < result.top.length;i++){
                var obj = {
                    title:result.top[i].roomName,
                    imgsrc:result.top[i].image
                };
                img_title_Array.push(obj);

            }
            console.log(img_title_Array);
            $scope.live.slideSource = img_title_Array;
        }
    });
    var url ="http://data.live.126.net/livechannel/previewlist.json";
       HttpFactory.getData(url).then(function (result) {
           // console.log(result);
           $scope.lives =result.sublives;
           $scope.loves =result.live_review;
           $scope.likes =result.future;
           console.log($scope.likes);
       })

}]);