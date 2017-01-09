/**
 * Created by qingyun on 16/11/30.
 */
angular.module('cftApp.news',[]).config(['$stateProvider',function ($stateProvider) {
    $stateProvider.state('tabs.news',{
        url:'/news',
        views:{
            'tabs-news':{
                templateUrl:'news.html',
                controller:'newsController'
            }
        }
    });
}]).controller('newsController',['$scope','$ionicPopup','$ionicSlideBoxDelegate','HttpFactory',function ($scope,$ionicPopup,$ionicSlideBoxDelegate,HttpFactory) {
    $scope.news = {
        newsArray:'',
        adsArray:[]
    };
    var url = "http://c.3g.163.com/recommend/getSubDocPic?tid=T1348647909107&from=toutiao&offset=0&size=10";
    HttpFactory.getData(url).then(function (result) {
        $scope.news.newsArray = result;
        $scope.news.adsArray = result[0].ads;
    });
    // 确认对话框
    $scope.showConfirm = function() {
        var myPopup = $ionicPopup.show({
            template:'<p style="text-align: center;padding: 20px;color: #555555">确定要删除该商品吗?</p>',
            scope: $scope,
            buttons: [
                { text: '取消',
                    type: 'button-clear button-dark'
                },
                {
                    text: '<b>确定</b>',
                    type: 'button-clear button-assertive',
                    onTap: function(e) {
                            // e.preventDefault();
                            console.log("点击了确定!");
                    }
                }
            ]
        });
    };

    $scope.dragOpenSlide = function () {
        //滑动content的时候能滑动页面
        $ionicSlideBoxDelegate.$getByHandle('mainSlideBox').enableSlide(true);
    };
    $scope.slideChanged = function () {
        //滑动页面完毕关闭底层mainSlideBox的滑动
        $ionicSlideBoxDelegate.$getByHandle('mainSlideBox').enableSlide(false);

    };

}]);