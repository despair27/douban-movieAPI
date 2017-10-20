"use strict";angular.module("movieApp",["ui.router"]).config(["$stateProvider","$urlRouterProvider",function(e,t){t.otherwise("home"),e.state({name:"home",url:"/home",templateUrl:"module/home/home.html"})}]).service("jsonpServe",["$document","$window",function(e,t){this.jsonp=function(o,a,i){var n="my_jsonp_"+Math.random().toString().replace(".",""),l=o.indexOf("?")==-1?"?":"&";t[n]=i;for(var m in a)l+=m+"="+a[m]+"&";l+="callback="+n;var r=e[0].createElement("script");r.type="text/javaScript",r.src=o+l,e[0].body.appendChild(r)}}]).directive("loading",[function(){return{restrict:"AE",replace:!0,templateUrl:"template/loading.html"}}]),angular.module("movieApp").config(["$stateProvider",function(e){e.state({name:"america-movie",url:"/america-movie",parent:"home",templateUrl:"module/america-movie/america-movie.html"})}]).controller("americaMovie",["$scope","jsonpServe",function(e,t){e.loading=!0,t.jsonp("http://api.douban.com/v2/movie/us_box",{},function(t){e.loading=!1,e.americaMovie=t.subjects,e.americaMovieTitle=t.title,console.log(t.subjects.subject),e.$apply()})}]),angular.module("movieApp").controller("home",["$scope","$location",function(e,t){e.location=t,e.$watch("location.path()",function(t){t.indexOf("in_theaters")!=-1?e.type="in_theaters":t.indexOf("coming_soon")!=-1?e.type="coming_soon":t.indexOf("top250")!=-1?e.type="top250":t.indexOf("america-movie")!=-1?e.type="america-movie":e.type="home"})}]),angular.module("movieApp").config(["$stateProvider",function(e){e.state({name:"top250",url:"/{url}/{page}",parent:"home",templateUrl:"module/movie-list/movie-list.html"}).state({name:"in_theaters",url:"/{url}/{page}",parent:"home",templateUrl:"module/movie-list/movie-list.html"}).state({name:"coming_soon",url:"/{url}/{page}",parent:"home",templateUrl:"module/movie-list/movie-list.html"})}]).controller("movieList",["$scope","jsonpServe","$stateParams",function(e,t,o){e.page=o.page,e.url=o.url;var a=5,i=5;e.pageLi=[],e.loading=!0,t.jsonp("http://api.douban.com/v2/movie/"+e.url,{start:(e.page-1)*a,count:a},function(t){e.loading=!1,e.movieList=t.subjects,e.movieListTitle=t.title,e.movieListTotal=t.total,e.pages=Math.ceil(e.movieListTotal/a),e.pageGroup=Math.ceil(e.pages/i);for(var o=1;o<=e.pages;o++)e.pageLi.push(o);e.pageNums=Math.ceil(e.page/i),e.pre=function(){e.pageNums>1&&e.pageNums--},e.next=function(){e.pageNums<Math.ceil(e.pages/i)&&e.pageNums++},e.$apply()})}]);