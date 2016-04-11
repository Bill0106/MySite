angular.module("myApp",["ui.router","appRoutes","homeApp","gamesApp","gourmetsApp","hearthStoneApp","myServices","myConfig"]).run(function($rootScope,$location,$state,$http){$http.defaults.headers.common.auth="ljpon3UUVTMMmIhE6Kcf",$rootScope.imagePath="http://zhuhaolin.com/images/",$rootScope.$on("$stateChangeSuccess",function(){$rootScope.bodyClass=$state.current.controller,$rootScope.title=$state.current.title})}).service("imageLoading",function(){return this.images=[],this.addImage=function(image){this.images.push(image)},this.getImages=function(){return this.images},this}).directive("ngLoading",function(imageLoading){return{restrict:"A",replace:!0,require:"ngModel",link:function(scope,element,attrs,ngModel){function progressIncrease(total){var circle=$("circle",element),radius=circle.attr("r"),length=Math.ceil(2*radius*Math.PI),count=$("svg",element).data("count");count++;var progress=length-length*(count/total);circle.css("stroke-dashoffset",progress),$("svg",element).data("count",count),count==total&&setTimeout(function(){element.fadeOut(),ngModel.$setViewValue(!0),ngModel.$render()},1e3)}function loadImage(item,total){var image=new Image,path=scope.$root.imagePath,src=path+item;$(image).attr("src",src).bind("load",function(){progressIncrease(total)})}scope.$watch(function(){return imageLoading.getImages()},function(newVal){newVal&&angular.forEach(imageLoading.getImages(),function(value){loadImage(value,newVal.length)})})}}});
angular.module("gamesApp",["infinite-scroll"]).controller("gamesController",function($scope,Game,Count,imageLoading){$scope.show=!0;var count=20,limit=12;Game.query({limit:count},function(data){$scope.games=data,angular.forEach(data,function(value){imageLoading.addImage(value.image)})}),Count.get({model:"games"},function(data){$scope.loadMore=function(){return $scope.busy=!0,count>=data.count?($scope.show=!1,!1):(Game.query({offset:count,limit:limit},function(data){$scope.moreImages=[],angular.forEach(data,function(value){$scope.games.push(value),$scope.moreImages.push(value.image)})}),void(count+=limit))}}),$scope.loadComplete=function(complete){complete&&($scope.complete=!0)},$scope.getNumber=function(num){return new Array(num)}}).controller("gameController",function($scope,$rootScope,$state,$filter,Game,GameTrophy,GAME_PLATFORMS,GAME_GENRES,GAME_TROPHY_RARITY){Game.get({url:$state.params.url},function(data){$rootScope.title=data.name+"_My Games",$scope.game=data}),$scope.platforms=GAME_PLATFORMS,$scope.genres=GAME_GENRES,$scope.trophy_rarity=GAME_TROPHY_RARITY,$scope.rateText=["Terrible","Poor","Fair","Good","Great"],$scope.getParagraph=function(text){return text?text.split("\n"):void 0},$scope.$watch("game.trophies",function(trophy_id){trophy_id&&GameTrophy.get({id:trophy_id},function(data){$scope.trophies=data.trophies,$scope.trophies_completed=$filter("number")(data.earned/data.total*100,0)})})}).directive("ngGames",function(){return{restrict:"A",replace:!0,scope:{busy:"=scrollBusy",val:"=gameImages",complete:"=loadComplete"},link:function(scope,element,attrs){function imageLoading(item,callback){var path=scope.$root.imagePath,src=path+item,image=new Image;$(image).attr("src",src).bind("load",function(){callback()})}scope.$watch("val",function(newValue){if(newValue){var count=0,total=newValue.length;angular.forEach(newValue,function(item){imageLoading(item,function(){count++,count==total&&($("[data-games-item]").removeClass("hidden"),scope.busy=!1,scope.$apply())})})}}),scope.$watch("complete",function(complete){complete&&$("[data-games-item]").removeClass("hidden")})}}});
angular.module("gourmetsApp",["infinite-scroll"]).controller("gourmetsController",function($scope,Gourmet,Count,imageLoading){$scope.show=!0;var count=24,limit=18;Gourmet.query({limit:count},function(data){$scope.gourmets=data,angular.forEach(data,function(item){imageLoading.addImage(item.image)})}),Count.get({model:"gourmets"},function(data){$scope.loadMore=function(){return $scope.busy=!0,count>=data.count?($scope.show=!1,!1):(Gourmet.query({offset:count,limit:limit},function(data){$scope.moreImages=[],angular.forEach(data,function(value){$scope.gourmets.push(value),$scope.moreImages.push(value.image)})}),void(count+=limit))}}),$scope.loadComplete=function(complete){complete&&($scope.complete=!0)}}).directive("ngGourmets",function($timeout){return{restrict:"A",replace:!0,scope:{complete:"=loadComplete",busy:"=scrollBusy",val:"=gourmetImages"},link:function(scope,element,attrs){function imageLoading(item,callback){var path=scope.$root.imagePath,src=path+item,image=new Image;$(image).attr("src",src).bind("load",function(){callback()})}scope.$watch("val",function(newValue){if(newValue){var count=0,total=newValue.length;angular.forEach(newValue,function(item){imageLoading(item,function(){count++,count==total&&($("[data-gourmet-item]").removeClass("hidden"),scope.busy=!1,scope.$apply())})})}}),scope.$watch("complete",function(complete){complete&&$("[data-gourmet-item]").removeClass("hidden")})}}});
angular.module("hearthStoneApp",[]).controller("hsSeasonsController",function($scope,HSSeason,HSWin,HS_PLAYER_CLASSES,imageLoading){$scope.playerClasses=HS_PLAYER_CLASSES,HSSeason.query(function(data){$scope.seasons=data,angular.forEach(data,function(value){imageLoading.addImage(value.image)})}),HSWin.query(function(data){function sum(i,array){var win=0,total=0;angular.forEach(data,function(value){value.detail[0][i]&&(win+=parseInt(value.detail[0][i].win),total+=parseInt(value.detail[0][i].total),array[i]={win:win,total:total},array.length==HS_PLAYER_CLASSES.length&&($scope.total=array,console.log($scope.total)))})}for(var array=[],i=0;i<HS_PLAYER_CLASSES.length;i++)sum(i,array);$scope.overall={win:0,total:0},angular.forEach(data,function(value){$scope.overall.win+=value.overall[0].win,$scope.overall.total+=value.overall[0].total})}),$scope.loadComplete=function(complete){complete&&($scope.complete=!0)}}).controller("hsSeasonController",function($rootScope,$scope,$state,HSSeason,HSSeasonWin,HSDeck,HS_PLAYER_CLASSES){$scope.playerClasses=HS_PLAYER_CLASSES,HSSeason.get({url:$state.params.url},function(data){$rootScope.title=data.title+"_My HearthStone Seasons",$scope.season=data}),$scope.$watch("season._id",function(newValue){newValue&&HSSeasonWin.query({id:newValue},function(data){$scope.wins=data,$scope.overall={win:0,total:0},angular.forEach(data,function(value){$scope.overall.win+=value.overall[0].win,$scope.overall.total+=value.overall[0].total})})}),$scope.$watch("season.decks",function(newValue){newValue&&($scope.decks=[],angular.forEach(newValue,function(value){$scope.decks[value]=HSDeck.get({id:value})}))}),$scope.$watch("wins",function(wins){function sum(i,array){var win=0,total=0;angular.forEach(wins,function(value){value.detail[0][i]&&(win+=parseInt(value.detail[0][i].win),total+=parseInt(value.detail[0][i].total),array[i]={win:win,total:total},array.length==HS_PLAYER_CLASSES.length&&($scope.total=array))})}if(wins)for(var array=[],i=0;i<HS_PLAYER_CLASSES.length;i++)sum(i,array)})}).controller("hsDeckController",function($rootScope,$scope,$state,HSDeck,HSDeckWin,HS_PLAYER_CLASSES){$scope.playerClasses=HS_PLAYER_CLASSES,HSDeck.get({id:$state.params.id},function(data){$scope.deck=data}),$scope.$watch("deck._id",function(newValue){newValue&&HSDeckWin.query({id:newValue},function(data){$scope.wins=data})}),$scope.$watch("wins",function(wins){function sum(i,array){var win=0,total=0;angular.forEach(winsArray,function(item){item.detail[0][i]?(win+=parseInt(item.detail[0][i].win),total+=parseInt(item.detail[0][i].total),array[i]={win:win,total:total}):array[i]={win:"--",total:"--"},array.length==HS_PLAYER_CLASSES.length&&($scope.total=array)})}if(wins){var winsArray=[];angular.forEach(wins,function(value){if(winsArray.push(value.win),winsArray.length==wins.length)for(var array=[],i=0;i<HS_PLAYER_CLASSES.length;i++)sum(i,array);$scope.overall={win:0,total:0},angular.forEach(winsArray,function(item){$scope.overall.win+=item.overall[0].win,$scope.overall.total+=item.overall[0].total})})}})});
angular.module("homeApp",[]).controller("homeController",function($scope,imageLoading){$scope.items=[{title:"Bill's Hobby - Write as a Interest",icon:"1b11d8d7a005a06b42514f5d9022e1df.jpg",background:"73ad5a84dcefe956276f1bd07c6316dd.jpg"},{title:"PlayStation Games",icon:"84abb1fdfd670845666ac89f712b539a.jpg",background:"66a7d162d0bdf9aa302e280cbb5d90d6.jpg",url:"games"},{title:"Gourmet Tour",icon:"09d6aeb87783661768b52c73f18c3069.jpg",background:"a15bc6b5656eb67d2e0cde3c2e7f583a.jpg",url:"gourmets"},{title:"HearthStone",icon:"fd7f11741da6dd01db206a29d0536427.jpg",background:"5233e5089e1ff5fff7a85c8aa13304ff.jpg",url:"hsSeasons"}],angular.forEach($scope.items,function(value){imageLoading.addImage(value.background),imageLoading.addImage(value.icon)}),$scope.loadComplete=function(complete){complete&&($scope.complete=!0)}}).directive("ngHome",function(){return{restrict:"A",replace:!0,scope:{complete:"=loadComplete"},link:function(scope,element,attrs){function startCarousel(){var carousel=$("[data-app-index='carousel']");carousel.carousel({pause:"false"}),$("[data-app-index='pauseCarousel']").hover(function(){carousel.carousel("pause")},function(){carousel.carousel("cycle")}),$("[data-slide]",carousel).click(function(e){e.preventDefault()})}scope.$watch("complete",function(complete){complete&&startCarousel()})}}});
angular.module("appRoutes",[]).config(function($stateProvider,$urlRouterProvider,$locationProvider){$urlRouterProvider.otherwise("/"),$stateProvider.state("index",{url:"/",templateUrl:"/views/app/index.html",controller:"homeController",title:"Home"}).state("games",{url:"/games",templateUrl:"/views/app/games.html",controller:"gamesController",title:"My Games"}).state("game",{url:"/games/:url.html",templateUrl:"/views/app/game.html",controller:"gameController",title:"Game"}).state("gourmets",{url:"/gourmets",templateUrl:"/views/app/gourmets.html",controller:"gourmetsController",title:"My Gourmets Tour"}).state("hsSeasons",{url:"/hearth-stone",templateUrl:"/views/app/hearth-stone/seasons.html",controller:"hsSeasonsController",title:"My HearthStone Seasons"}).state("hsSeason",{url:"/hearth-stone/seasons/:url",templateUrl:"/views/app/hearth-stone/season.html",controller:"hsSeasonController",title:"My HearthStone Season"}).state("hsDeck",{url:"/hearth-stone/deck/:id",templateUrl:"/views/app/hearth-stone/deck.html",controller:"hsDeckController",title:"My HearthStone Deck"}),$locationProvider.html5Mode({enabled:!0,requireBase:!1})});
angular.module("myServices",["ngResource"]).factory("Count",function($resource){return $resource("/api/count/:model")}).factory("Game",function($resource){return $resource("/api/games/:url",{url:"@url"},{update:{method:"POST"}})}).factory("GameTrophy",function($resource){return $resource("/api/games/trophy/:id",{id:"@_id"},{update:{method:"POST"}})}).factory("Gourmet",function($resource){return $resource("/api/gourmets/:id",{id:"@_id"},{update:{method:"POST"}})}).factory("HSCard",function($resource){return $resource("/api/hearth-stone/cards")}).factory("HSDeck",function($resource){return $resource("/api/hearth-stone/decks/:id",{id:"@_id"},{update:{method:"POST"}})}).factory("HSSeason",function($resource){return $resource("/api/hearth-stone/seasons/:url",{url:"@url"},{update:{method:"POST"}})}).factory("HSWin",function($resource){return $resource("/api/hearth-stone/wins/:id",{id:"@_id"},{update:{method:"POST"}})}).factory("HSSeasonWin",function($resource){return $resource("/api/hearth-stone/season_wins/:id")}).factory("HSDeckWin",function($resource){return $resource("/api/hearth-stone/deck_wins/:id")}).factory("HSMatch",function($resource){return $resource("/api/hearth-stone/matches",{id:"@_id"},{update:{method:"POST"}})}).factory("saibanGame",function($resource){return $resource("/api/saiban/games/:url",{url:"@url"},{update:{method:"POST"}})});
angular.module("myConfig",[]).constant("GAME_PLATFORMS",[{value:0,name:"PlayStation 3"},{value:1,name:"PlayStation Vita"},{value:2,name:"PlayStation 4"}]).constant("GAME_GENRES",[{value:0,name:"Action"},{value:1,name:"Adventure"},{value:2,name:"Fighting"},{value:3,name:"Racing"},{value:4,name:"Role-Playing"},{value:5,name:"Sports"},{value:6,name:"Third-person shooter"},{value:7,name:"Strategy"}]).constant("GAME_TROPHY_RARITY",[{value:0,name:"Bronze"},{value:1,name:"Gold"},{value:2,name:"Silver"},{value:3,name:"Platinum"}]).constant("HS_PLAYER_CLASSES",[{value:0,name:"Druid"},{value:1,name:"Hunter"},{value:2,name:"Mage"},{value:3,name:"Paladin"},{value:4,name:"Priest"},{value:5,name:"Rogue"},{value:6,name:"Shaman"},{value:7,name:"Warlock"},{value:8,name:"Warrior"}]).constant("SAIBAN_PLATFORM",[{value:0,name:"GBA"},{value:1,name:"NDS"},{value:2,name:"3DS"}]).constant("SAIBAN_SERIES",[{value:0,name:"逆转裁判"},{value:1,name:"逆转检事"},{value:2,name:"其他"}]);