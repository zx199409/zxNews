/**
 * Created by Administrator on 2016/12/15.
 */
angular.module('myApp.news1',[]).controller('newsController1',['$scope','$ionicPopup','$ionicSlideBoxDelegate','$state','HttpFactory','UrlArray',function ($scope,$ionicPopup,$ionicSlideBoxDelegate,$state,HttpFactory,UrlArray) {
    $scope.news = {
        newsArray1:[],
        adsArray1:[],
        index:0
    };
    $scope.$on('updateNews1',function (evt,msg) {
        $scope.news.adsArray1 = [];
        $scope.news.newsArray1 = [];
        $scope.news.index = 0;
        console.log('view1,' + msg);
        if(msg == "清理"){
            return;
        }
        $scope.loadMore1(UrlArray[msg]);
    });
    $scope.loadMore1 = function (str) {
        var url = '';
        if (str){
            url = str;
            url = url.replace('@',$scope.news.index);

        }else {
            url = "http://c.m.163.com/dlist/article/dynamic?from=T1348648517839&offset=" + $scope.news.index + "&size=10&fn=7&passport=&devId=XTl7WnrkEuBfasUNdPC49g%3D%3D&lat=&lon=&version=17.2&net=wifi&ts=1480639275&sign=ENAtFozNgGugOq3e1UL6hWbkeBqF24b8ECZ%2FOg2OGlZ48ErR02zJ6%2FKXOnxX046I&encryption=1&canal=oppo_store2014_news&mac=0qxu7nRwUAReuUxKr3NiFzDz%2FWJ7EEOtyLA2BsvQqp8%3D";
        }
        if ($scope.news.index === 0){
            $scope.news.index += 11;
        }else {
            $scope.news.index += 10;
        }
        HttpFactory.getData(url).then(function (result) {
            if (!result){
                alert("没有更多数据!");
                return;
            }
            if (!$scope.news.adsArray1.length){
                if(result[0].ads){
                    //由于网易新闻有时候除了第一次之外没有头条用个数组存着
                    $scope.news.adsArray1 = result[0].ads;
                }
            }
            $scope.news.newsArray1 = $scope.news.newsArray1.concat(result);
            if ($scope.news.index === 0){
                $scope.news.newsArray1.splice(0,1);
            }
            $scope.$broadcast('scroll.infiniteScrollComplete');

        });
    };


}]);