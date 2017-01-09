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
/**
 * Created by Administrator on 2016/12/7.
 */

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
/**
 * Created by Administrator on 2016/12/2.
 */
angular.module('myApp.news',[]).config(['$stateProvider','$urlRouterProvider',function ($stateProvider,$urlRouterProvider) {
    $stateProvider.state('tabs.news',{
        url:'/news',
        views:{
            'tabs-news':{
                templateUrl:'news.html',
                controller:'newsController'
            }
        }
    }).state('tabs.search',{
        url:'/search',
        views:{
            'tabs-news':{
                templateUrl:'search.html'
                // controller:'searchController'
            }
        }
    });
}]).controller('newsController',['$scope','$ionicPopup','$ionicSlideBoxDelegate','$ionicViewSwitcher','$state','HttpFactory',function ($scope,$ionicPopup,$ionicSlideBoxDelegate,$ionicViewSwitcher,$state,HttpFactory) {
    //网易副标题
    var url = "http://c.m.163.com/nc/topicset/ios/subscribe/manage/listspecial.html";

    HttpFactory.getData(url).then(function (result) {
        $scope.tous = result.tList;

        console.log($scope.tous);


    });
    $scope.news = {
        newsArray:[],
        adsArray:[],
        index:0,
        isFirst:true
    };

    $scope.goToDetailView = function () {
        // $state.go('newsDetail');
    };

    $scope.$on('updateNews0',function (evt,msg) {
        $scope.news.adsArray = [];
        $scope.news.newsArray = [];
        $scope.news.index = 0;
        console.log('view0,' + msg);
        if(msg == "清理"){
            return;
        }
        $scope.loadMore(UrlArray[msg]);
    });

    $scope.loadMore = function (str) {
        $scope.show();
        var url = '';
        if (str){
            url = str;
            url = url.replace('@',$scope.news.index);

        }else {
            url = "http://c.m.163.com/recommend/getSubDocPic?from=toutiao&prog=LMA1&open=&openpath=&fn=1&passport=&devId=%2BnrKMbpU9ZDPUOhb9gvookO3HKJkIOzrIg%2BI9FhrLRStCu%2B7ZneFbZ30i61TL9kY&offset=" + $scope.news.index +"&size=10&version=17.1&spever=false&net=wifi&lat=&lon=&ts=1480666192&sign=yseE2FNVWcJVjhvP48U1nPHyzZCKpBKh%2BaOhOE2d6GR48ErR02zJ6%2FKXOnxX046I&encryption=1&canal=appstore";
        }
        if ($scope.news.index === 0){
            $scope.news.index += 11;
        }else {
            $scope.news.index += 10;
        }

        HttpFactory.getData(url).then(function (result) {
            $scope.hide();
            if (!result){
                alert("没有更多数据!");
                return;
            }
            if (!$scope.news.adsArray.length){
                if(result[0].ads){
                    //由于网易新闻有时候除了第一次之外没有头条用个数组存着
                    $scope.news.adsArray = result[0].ads;
                }
            }
            $scope.news.newsArray = $scope.news.newsArray.concat(result);
            if ($scope.news.index === 0){
                $scope.news.newsArray.splice(0,1);
            }
            $scope.$broadcast('scroll.infiniteScrollComplete');
            if ($scope.news.isFirst){
                for(var i = 3;i < UrlArray.length;i++){
                    HttpFactory.getData(UrlArray[i]);
                }
            }

        },function () {
            $scope.hide();
        });
    };
    $scope.doRefresh = function (str) {
        console.log(11111);
        var url = '';
        if (str){
            url = str;
            url = url.replace('@',$scope.news.index);

        }else {
            url = "http://c.m.163.com/recommend/getSubDocPic?from=toutiao&prog=LMA1&open=&openpath=&fn=1&passport=&devId=%2BnrKMbpU9ZDPUOhb9gvookO3HKJkIOzrIg%2BI9FhrLRStCu%2B7ZneFbZ30i61TL9kY&offset=" + $scope.news.index +"&size=10&version=17.1&spever=false&net=wifi&lat=&lon=&ts=1480666192&sign=yseE2FNVWcJVjhvP48U1nPHyzZCKpBKh%2BaOhOE2d6GR48ErR02zJ6%2FKXOnxX046I&encryption=1&canal=appstore";
        }
        HttpFactory.getData(url).then(function (result) {
            if (!result){
                alert("没有更多数据!");
                return;
            }
            if (!$scope.news.adsArray.length){
                if(result[0].ads){
                    //由于网易新闻有时候除了第一次之外没有头条用个数组存着
                    $scope.news.adsArray = result[0].ads;
                }
            }
            $scope.news.newsArray = result;
            if ($scope.news.index === 0){
                $scope.news.newsArray.splice(0,1);
            }
            $scope.$broadcast('scroll.refreshComplete');

        });
    }

    $scope.dragOpenSlide = function () {
        //滑动content的时候能滑动页面
        $ionicSlideBoxDelegate.$getByHandle('mainSlideBox').enableSlide(true);
    };
    $scope.slideChanged = function () {
        //滑动页面完毕关闭底层mainSlideBox的滑动
        $ionicSlideBoxDelegate.$getByHandle('mainSlideBox').enableSlide(false);

    };
    //网易详情页
    $scope.goToNewsDetail= function (index) {
        console.log(index);
        var zx = $scope.items1[index].docid;
        // console.log(zx);
        $state.go('newsSummary',{'data':zx});

        $ionicViewSwitcher.nextDirection("back")
    }

}]);
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
/**
 * Created by Administrator on 2016/12/15.
 */
angular.module('myApp.news2',[]).controller('newsController2',['$scope','$ionicPopup','$ionicSlideBoxDelegate','$state','HttpFactory','UrlArray',function ($scope,$ionicPopup,$ionicSlideBoxDelegate,$state,HttpFactory,UrlArray) {
    $scope.news = {
        newsArray2:[],
        adsArray2:[],
        index:0
    };
    $scope.$on('updateNews2',function (evt,msg) {
        $scope.news.adsArray2 = [];
        $scope.news.newsArray2 = [];
        $scope.news.index = 0;
        console.log('view2,'+ msg);
        if(msg == "清理"){
            return;
        }
        $scope.loadMore2(UrlArray[msg]);
    });
    $scope.loadMore2 = function (str) {
        var url = '';
        if (str){
            url = str;
            url = url.replace('@',$scope.news.index);

        }else {
            url = "http://c.m.163.com/recommend/getChanListNews?channel=T1456112189138&size=10&offset="+ $scope.news.index +"&fn=2&passport=&devId=XTl7WnrkEuBfasUNdPC49g%3D%3D&lat=&lon=&version=17.2&net=wifi&ts=1480640855&sign=n%2BRpzwR4DEI0MaavyBhQlpZaxlFxQdWjn0Ty7qOYWaB48ErR02zJ6%2FKXOnxX046I&encryption=1&canal=oppo_store2014_news&mac=0qxu7nRwUAReuUxKr3NiFzDz%2FWJ7EEOtyLA2BsvQqp8%3D";
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
            if (!$scope.news.adsArray2.length){
                if(result[0].ads){
                    //由于网易新闻有时候除了第一次之外没有头条用个数组存着
                    $scope.news.adsArray2 = result[0].ads;
                }
            }
            $scope.news.newsArray2 = $scope.news.newsArray2.concat(result);
            if ($scope.news.index === 0){
                $scope.news.newsArray2.splice(0,1);
            }
            $scope.$broadcast('scroll.infiniteScrollComplete');

        });
    };


}]);
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
/**
 * Created by Administrator on 2016/12/2.
 */
angular.module('myApp.tabs',[]).controller('tabsController',['$scope',function ($scope) {

}]);
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
/**
 * Created by qingyun on 16/12/2.
 */
angular.module('myApp.httpFactory',[]).factory('HttpFactory',['$http','$q',function ($http,$q) {
    return {
        getData:function (url,type) {
            if (url){
                var promise = $q.defer();
                // url = "http://192.168.0.100:3000/?myUrl=" + encodeURIComponent(url);
                url = "http://59.110.139.104:3000/wy?myUrl=" + encodeURIComponent(url);
                type = type ? type:"GET";
                $http({
                    url:url,
                    method:type,
                    timeout:20000
                }).then(function (reslut) {
                    // if (reslut.data.message == "操作成功"){
                    //     reslut = reslut.data;
                    // }else{
                        reslut =reslut.data;
                        // reslut = reslut[Object.keys(reslut)[0]];
                    // }

                    promise.resolve(reslut);
                },function (err) {
                    promise.reject(err);
                });
                return promise.promise;
            }
        }
    };
}]);
/**
 * Created by qingyun on 16/12/2.
 */
angular.module('myApp.slideBox',[]).directive('mgSlideBox',[function () {
    return{
        restrict:"E",
        scope:{sourceArray:'='},
        template:'<div class="topCarousel"><ion-slide-box delegate-handle="topCarouselSlideBox" on-slide-changed="slideHasChanged($index)" auto-play="true" slide-interval="1000" show-pager="true" does-continue="true" ng-if="isShowSlideBox" on-drag="drag($event)"> <ion-slide ng-repeat="ads in sourceArray track by $index" ng-click="goToDetailView($index)"><img ng-src="{{ads.imgsrc}}" class="topCarouselImg"></ion-slide> </ion-slide-box><div class="slideBottomDiv"></div></div>',
        controller:['$scope','$element','$ionicSlideBoxDelegate',function ($scope,$element,$ionicSlideBoxDelegate) {
            $scope.goToDetailView = function (index) {
                console.log('进入详情页' + index);
            };
            var lastSpan = $element[0].lastElementChild;

            $scope.$watch('sourceArray',function (newVal,oldVal) {
                if (newVal && newVal.length){
                    /*
                     * 两种方案解决轮播不能立刻显示或者显示错位的bug 改bug由于ng-repeat和slideBox的特性造成
                     * 完美的解决方案是使用添加ng-if 另一种是用update 和 loop
                     * */
                    $scope.isShowSlideBox = true;
                    // $ionicSlideBoxDelegate.$getByHandle('topCarouselSlideBox').update();
                    // $ionicSlideBoxDelegate.$getByHandle('topCarouselSlideBox').loop(true);
                    // lastSpan.innerText = $scope.sourceArray[0].title;
                }
            });
            $scope.slideHasChanged = function (index) {
                lastSpan.innerText = $scope.sourceArray[index].title;
            };
            //页面刚加载出来的时候禁止滑动
            $ionicSlideBoxDelegate.$getByHandle('mainSlideBox').enableSlide(false);
            //拖拽轮播图的时候也要禁止底层的slideBox滑动
            $scope.drag = function (event) {
                $ionicSlideBoxDelegate.$getByHandle('mainSlideBox').enableSlide(false);
                //阻止事件冒泡
                event.stopPropagation();
            };

        }],
        replace:true,
        link:function (scope,tElement,tAtts) {
        }
    };
}]);

/**
 * Created by qingyun on 16/12/7.
 */
angular.module('myApp.urls',[]).constant('UrlArray',["http://c.m.163.com/recommend/getSubDocPic?from=toutiao&prog=LMA1&open=&openpath=&fn=1&passport=&devId=%2BnrKMbpU9ZDPUOhb9gvookO3HKJkIOzrIg%2BI9FhrLRStCu%2B7ZneFbZ30i61TL9kY&offset=@&size=10&version=17.1&spever=false&net=wifi&lat=&lon=&ts=1480666192&sign=yseE2FNVWcJVjhvP48U1nPHyzZCKpBKh%2BaOhOE2d6GR48ErR02zJ6%2FKXOnxX046I&encryption=1&canal=appstore","http://c.m.163.com/dlist/article/dynamic?from=T1348648517839&offset=@&size=10&fn=7&passport=&devId=XTl7WnrkEuBfasUNdPC49g%3D%3D&lat=&lon=&version=17.2&net=wifi&ts=1480639275&sign=ENAtFozNgGugOq3e1UL6hWbkeBqF24b8ECZ%2FOg2OGlZ48ErR02zJ6%2FKXOnxX046I&encryption=1&canal=oppo_store2014_news&mac=0qxu7nRwUAReuUxKr3NiFzDz%2FWJ7EEOtyLA2BsvQqp8%3D","http://c.m.163.com/recommend/getChanListNews?channel=T1456112189138&size=10&offset=@&fn=2&passport=&devId=XTl7WnrkEuBfasUNdPC49g%3D%3D&lat=&lon=&version=17.2&net=wifi&ts=1480640855&sign=n%2BRpzwR4DEI0MaavyBhQlpZaxlFxQdWjn0Ty7qOYWaB48ErR02zJ6%2FKXOnxX046I&encryption=1&canal=oppo_store2014_news&mac=0qxu7nRwUAReuUxKr3NiFzDz%2FWJ7EEOtyLA2BsvQqp8%3D","http://c.m.163.com/dlist/article/dynamic?from=T1348649079062&offset=@&size=10&fn=2&passport=&devId=XTl7WnrkEuBfasUNdPC49g%3D%3D&lat=&lon=&version=17.2&net=wifi&ts=1480639446&sign=cZqFpGcYxIM23Mk0zlBq8ziD1sRlb1GqZlwcRLb38aZ48ErR02zJ6%2FKXOnxX046I&encryption=1&canal=oppo_store2014_news&mac=0qxu7nRwUAReuUxKr3NiFzDz%2FWJ7EEOtyLA2BsvQqp8%3D","http://c.m.163.com/recommend/getSubDocPic?from=netease_h&size=10&offset=@&fn=4&passport=&devId=XTl7WnrkEuBfasUNdPC49g%3D%3D&lat=&lon=&version=17.2&net=wifi&ts=1480639599&sign=JIfO0JDD%2Bn9%2BAUDPwiCVNSwML5QPD%2BO1KSZcsmDfw2948ErR02zJ6%2FKXOnxX046I&encryption=1&canal=oppo_store2014_news&mac=0qxu7nRwUAReuUxKr3NiFzDz%2FWJ7EEOtyLA2BsvQqp8%3D","http://c.m.163.com/dlist/article/local/dynamic?from=6YOR5bee&offset=@&size=10&fn=2&passport=&devId=XTl7WnrkEuBfasUNdPC49g%3D%3D&lat=&lon=&version=17.2&net=wifi&ts=1480639679&sign=fibH0nYFS5ZqfhTkz%2Fctkn1b%2B%2B7UaCWuMhwPOm2XAxN48ErR02zJ6%2FKXOnxX046I&encryption=1&canal=oppo_store2014_news&mac=0qxu7nRwUAReuUxKr3NiFzDz%2FWJ7EEOtyLA2BsvQqp8%3D","http://c.m.163.com/recommend/getChanListNews?channel=T1457068979049&size=10&offset=@&fn=2&passport=&devId=XTl7WnrkEuBfasUNdPC49g%3D%3D&lat=&lon=&version=17.2&net=wifi&ts=1480639724&sign=uklrBnfDnFoSS86%2B44xw0tzktOhz8ek4D2b6Uh0bXk148ErR02zJ6%2FKXOnxX046I&encryption=1&canal=oppo_store2014_news&mac=0qxu7nRwUAReuUxKr3NiFzDz%2FWJ7EEOtyLA2BsvQqp8%3D","http://c.m.163.com/dlist/article/dynamic?from=T1348648756099&offset=@&size=10&fn=2&passport=&devId=XTl7WnrkEuBfasUNdPC49g%3D%3D&lat=&lon=&version=17.2&net=wifi&ts=1480639780&sign=PqlXEtC2KZaOX7vOO17uHuo4duhmWIxQqoQ4rBKRsQh48ErR02zJ6%2FKXOnxX046I&encryption=1&canal=oppo_store2014_news&mac=0qxu7nRwUAReuUxKr3NiFzDz%2FWJ7EEOtyLA2BsvQqp8%3D",'http://c.m.163.com/dlist/article/dynamic?from=T1348649580692&offset=@&size=10&fn=2&passport=&devId=XTl7WnrkEuBfasUNdPC49g%3D%3D&lat=&lon=&version=17.2&net=wifi&ts=1480639824&sign=BENvYqDl9cYKiJh2irUV5%2Biue8PV%2FKHdFs3tQWGzBqd48ErR02zJ6%2FKXOnxX046I&encryption=1&canal=oppo_store2014_news&mac=0qxu7nRwUAReuUxKr3NiFzDz%2FWJ7EEOtyLA2BsvQqp8%3D','http://c.m.163.com/dlist/article/dynamic?from=T1348650593803&offset=@&size=10&fn=1&passport=&devId=XTl7WnrkEuBfasUNdPC49g%3D%3D&lat=&lon=&version=17.2&net=wifi&ts=1480639994&sign=L2rYDnEjMRXqgyoBwjDOU9%2FuAlHKEvkGbCcbOw0egKp48ErR02zJ6%2FKXOnxX046I&encryption=1&canal=oppo_store2014_news&mac=0qxu7nRwUAReuUxKr3NiFzDz%2FWJ7EEOtyLA2BsvQqp8%3D','http://c.m.163.com/recommend/getChanListNews?channel=T1419316284722&size=10&offset=@&fn=1&passport=&devId=XTl7WnrkEuBfasUNdPC49g%3D%3D&lat=&lon=&version=17.2&net=wifi&ts=1480640349&sign=kuB1wmMK3BIofo29zp1u%2FCelBxwQVclBPY2jLDS6PfV48ErR02zJ6%2FKXOnxX046I&encryption=1&canal=oppo_store2014_news&mac=0qxu7nRwUAReuUxKr3NiFzDz%2FWJ7EEOtyLA2BsvQqp8%3D','http://c.m.163.com/dlist/article/dynamic?from=T1473054348939&offset=@&size=10&fn=2&passport=&devId=XTl7WnrkEuBfasUNdPC49g%3D%3D&lat=&lon=&version=17.2&net=wifi&ts=1480640251&sign=TxI1npNtFDs5QSgpQr%2FOTwXPVB%2FvuqHD5Vj7E5Ul5t948ErR02zJ6%2FKXOnxX046I&encryption=1&canal=oppo_store2014_news&mac=0qxu7nRwUAReuUxKr3NiFzDz%2FWJ7EEOtyLA2BsvQqp8%3D','http://c.m.163.com/dlist/article/dynamic?from=T1348648141035&offset=@&size=10&fn=1&passport=&devId=XTl7WnrkEuBfasUNdPC49g%3D%3D&lat=&lon=&version=17.2&net=wifi&ts=1480640432&sign=LeTem6ZlcSys0TMWqSD%2FkavFP%2BW7CKnHNX3zs%2B6m3l548ErR02zJ6%2FKXOnxX046I&encryption=1&canal=oppo_store2014_news&mac=0qxu7nRwUAReuUxKr3NiFzDz%2FWJ7EEOtyLA2BsvQqp8%3D','http://c.m.163.com/dlist/article/dynamic?from=T1348654151579&offset=@&size=10&fn=1&passport=&devId=XTl7WnrkEuBfasUNdPC49g%3D%3D&lat=&lon=&version=17.2&net=wifi&ts=1480640614&sign=Ey6%2F0Qyd7pxjaaWUoZLQYriGwqX0xzmATqe6CpZ0C2x48ErR02zJ6%2FKXOnxX046I&encryption=1&canal=oppo_store2014_news&mac=0qxu7nRwUAReuUxKr3NiFzDz%2FWJ7EEOtyLA2BsvQqp8%3D','http://c.m.163.com/dlist/article/dynamic?from=T1414389941036&offset=@&size=10&fn=1&passport=&devId=XTl7WnrkEuBfasUNdPC49g%3D%3D&lat=&lon=&version=17.2&net=wifi&ts=1480640649&sign=DXY4efOR3JOAgU6ePvFftxYD41PHsjGxZdWGM5quV0x48ErR02zJ6%2FKXOnxX046I&encryption=1&canal=oppo_store2014_news&mac=0qxu7nRwUAReuUxKr3NiFzDz%2FWJ7EEOtyLA2BsvQqp8%3D','http://c.m.163.com/dlist/article/dynamic?from=T1348649145984&offset=@&size=10&fn=2&passport=&devId=XTl7WnrkEuBfasUNdPC49g%3D%3D&lat=&lon=&version=17.2&net=wifi&ts=1480641094&sign=m32ovzEGXTpUeq0kQ%2BXNMNXg9B6bGu2D0vfF3xrFwjF48ErR02zJ6%2FKXOnxX046I&encryption=1&canal=oppo_store2014_news&mac=0qxu7nRwUAReuUxKr3NiFzDz%2FWJ7EEOtyLA2BsvQqp8%3D']);