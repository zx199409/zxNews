/**
 * Created by Administrator on 2016/12/6.
 */
angular.module('myApp.newsSummary',[]).config(['$stateProvider','$urlRouterProvider',function ($stateProvider,$urlRouterProvider) {
    $stateProvider.state('newsSummary', {
        url: '/newsSummary',
        templateUrl: 'newsSummary.html',
        controller: 'newsSummaryController',
        params:{'data':null}
    });
}]).controller('newsSummaryController',['$scope','$sce','$stateParams','$ionicPopup','$ionicLoading','$timeout','HttpFactory',function ($scope,$sce,$stateParams,$ionicPopup,$ionicLoading, $timeout,HttpFactory) {
    $scope.show = function () {
        $ionicLoading.show({
            template:'Loading...'
        });
    };
    $scope.hide =function () {
        $ionicLoading.hide();
    };
    $scope.show();

    $scope.newsSummary = {
        detail:'',
        body:''
    };
    var docid = $stateParams.data;
    // console.log(docid);
    var url = "http://localhost:3000/?myUrl=http://c.m.163.com/nc/article/" + docid +"/full.html";
    HttpFactory.getData(url).then(function (result) {
        $scope.hide();
        $scope.newsSummary.detail = result[docid];
        // console.log(result);
        var newsObj = $scope.newsSummary.detail;
        // console.log(newsObj);
        if (newsObj.img && newsObj.img.length){
            for(var i = 0;i < newsObj.img.length;i++){
                var imgWidth = newsObj.img[i].pixel.split('*')[0];
                if(imgWidth > document.body.offsetWidth){
                    imgWidth = document.body.offsetWidth;
                }
                var imgStyle = 'width:' + imgWidth + "px";
                var imgStr = "<img" + " style='" + imgStyle + "'" + " src=" + newsObj.img[i].src + '>';
                newsObj.body = newsObj.body.replace(newsObj.img[i].ref,imgStr);
            }
        }


    });
    // $scope.goShare = function() {
    //     $scope.data = {}
    //
    //     // 一个精心制作的自定义弹窗
    //     var myPopup = $ionicPopup.show({
    //         template: '<input type="password" ng-model="data.wifi">',
    //         title: 'Enter Wi-Fi Password',
    //         subTitle: 'Please use normal things',
    //         scope: $scope,
    //         buttons: [
    //             { text: 'Cancel' },
    //             {
    //                 text: '<b>Save</b>',
    //                 type: 'button-positive',
    //                 onTap: function(e) {
    //                     if (!$scope.data.wifi) {
    //                         //不允许用户关闭，除非他键入wifi密码
    //                         e.preventDefault();
    //                     } else {
    //                         return $scope.data.wifi;
    //                     }
    //                 }
    //             },
    //         ]
    //     });
    //     myPopup.then(function(res) {
    //         console.log('Tapped!', res);
    //     });
    //     $timeout(function() {
    //         myPopup.close(); //由于某种原因3秒后关闭弹出
    //     }, 3000);

        // 一个确认对话框
        // $scope.showConfirm = function() {
        //     var confirmPopup = $ionicPopup.confirm({
        //         title: 'Consume Ice Cream',
        //         template: 'Are you sure you want to eat this ice cream?'
        //     });
        //     confirmPopup.then(function(res) {
        //         if(res) {
        //             console.log('You are sure');
        //         } else {
        //             console.log('You are not sure');
        //         }
        //     });
        // };

        // 一个提示对话框
        $scope.goShare = function() {
            var alertPopup = $ionicPopup.alert({
                title: '分享领红包',
                template: '<div class="tan"><a class="button button-clear"><i class="button icon ion-chatbubbles"><span>微信</span></i></a><a class="button button-clear"><i class="button icon ion-aperture">友圈</i></a><a class="button button-clear"><i class="button icon ion-ios-star">收藏</i></a><a class="button button-clear"><i class="button icon ion-social-chrome"><span>空间</span></i></a><a class="button button-clear"><i class="button icon ion-ios-email"><span>邮箱</span></i></a><a class="button button-clear"><i class="button icon ion-android-more-vertical"><span>更多</span></i></a></div>'
            });
            alertPopup.then(function(res) {
            });
        };



}]);