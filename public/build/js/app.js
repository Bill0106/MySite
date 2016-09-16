angular.module("myApp",["ui.router","appRoutes","homeApp","gamesApp","gourmetsApp","hearthStoneApp","myServices","myConfig"]).run(function($rootScope,$location,$state,$http){$http.defaults.headers.common.auth="ljpon3UUVTMMmIhE6Kcf",$rootScope.$on("$stateChangeSuccess",function(){$rootScope.bodyClass=$state.current.controller,$rootScope.title=$state.current.title})}).service("imageLoading",function(){return this.images=[],this.addImage=function(image){this.images.push(image)},this.getImages=function(){return this.images},this}).directive("ngMySite",function(){return{restrict:"A",replace:!0,link:function(scope,element,attrs){$(document).on("swipeleft.my.index.swipe","#indexCarousel",function(){$(this).carousel("next")}),$(document).on("swiperight.my.index.swipe","#indexCarousel",function(){$(this).carousel("prev")})}}}).directive("ngLoading",function(imageLoading){return{restrict:"A",replace:!0,require:"ngModel",link:function(scope,element,attrs,ngModel){function progressIncrease(total){var circle=$("circle",element),radius=circle.attr("r"),length=Math.ceil(2*radius*Math.PI),count=$("svg",element).data("count");count++;var progress=length-length*(count/total);circle.css("stroke-dashoffset",progress),$("svg",element).data("count",count),count==total&&setTimeout(function(){element.fadeOut(),ngModel.$setViewValue(!0),ngModel.$render()},1e3)}function loadImage(item,total){var image=new Image,path=scope.$root.imagePath,src=path+item;$(image).attr("src",src).bind("load",function(){progressIncrease(total)})}scope.$watch(function(){return imageLoading.getImages()},function(newVal){newVal&&angular.forEach(imageLoading.getImages(),function(value){loadImage(value,newVal.length)})})}}}).filter("imageUrl",function(){return function(image){if("undefined"!=typeof image)return JSON.parse(image).url}});
angular.module("gamesApp",["infinite-scroll"]).controller("gamesController",function($scope,Game){$scope.show=!0;var page=1,limit=20;Game.get({limit:limit},function(data){$scope.games=data.list,$scope.total=data.total,page++}),$scope.$watch("total",function(newVal){if(newVal){var totalPage=Math.ceil($scope.total/limit);$scope.loadMore=function(){return $scope.busy=!0,!(page>totalPage)&&(Game.get({page:page,limit:limit},function(data){angular.forEach(data.list,function(value){$scope.games.push(value)}),$scope.busy=!1}),page++,void(page>totalPage&&($scope.show=!1)))}}}),$scope.getNumber=function(num){return new Array(num)}}).controller("gameController",function($scope,$rootScope,$state,$filter,Game,GameTrophy,GAME_PLATFORMS,GAME_GENRES,GAME_TROPHY_RARITY){Game.get({url:$state.params.url},function(data){$rootScope.title=data.name+"_My Games",$scope.game=data}),$scope.platforms=GAME_PLATFORMS,$scope.genres=GAME_GENRES,$scope.trophy_rarity=GAME_TROPHY_RARITY,$scope.rateText=["Terrible","Poor","Fair","Good","Great"],$scope.getParagraph=function(text){if(text)return text.split("\n")},$scope.$watch("game.trophies",function(trophy_id){trophy_id&&GameTrophy.get({id:trophy_id},function(data){$scope.trophies=data.trophies,$scope.trophies_completed=$filter("number")(data.earned/data.total*100,0)})})});
angular.module("gourmetsApp",["infinite-scroll"]).controller("gourmetsController",function($scope,Gourmet){$scope.show=!0;var page=1,limit=24;Gourmet.get({limit:limit},function(data){$scope.total=data.total,$scope.gourmets=data.list,page++}),$scope.$watch("total",function(newValue){if(newValue){var totalPage=Math.ceil($scope.total/limit);$scope.loadMore=function(){return $scope.busy=!0,!(page>totalPage)&&(Gourmet.get({page:page,limit:limit},function(data){angular.forEach(data.list,function(value){$scope.gourmets.push(value)}),$scope.busy=!1}),page++,void(page>totalPage&&($scope.show=!1)))}}})});
angular.module("hearthStoneApp",[]).controller("hsSeasonsController",function($scope,HSSeason,imageLoading){HSSeason.query(function(data){$scope.seasons=data,angular.forEach(data,function(value){imageLoading.addImage(value.image)})}),$scope.loadComplete=function(complete){complete&&($scope.complete=!0)}}).controller("hsSeasonController",function($rootScope,$scope,$state,$filter,HSSeason,HSDeck,HSMatch,hearthStoneMatches,HS_PLAYER_CLASSES){$scope.playerClasses=HS_PLAYER_CLASSES,HSSeason.get({url:$state.params.url},function(data){$rootScope.title=data.title+"_My HearthStone Seasons",$scope.season=data}),$scope.$watch("season.month",function(newValue){if(newValue){var month=$filter("date")(newValue,"yyyyMM");HSMatch.get({season:month},function(data){hearthStoneMatches.addMatches(data.list)}),$scope.season.month=new Date(newValue).getTime()}}),$scope.$watch(function(){return hearthStoneMatches.getMatches()},function(newValue){if(newValue.length>0){var ids=hearthStoneMatches.getMatchDecks();HSDeck.query({ids:ids.join()},function(data){$scope.decks={},angular.forEach(data,function(value){$scope.decks[value._id]=value})})}}),$scope.$watch("decks",function(newValue){newValue&&($scope.stats=hearthStoneMatches.getMatchesStats("deck",$scope.decks))})}).controller("hsDeckController",function($rootScope,$scope,$state,$filter,HSDeck,HSSeason,HSMatch,hearthStoneMatches,HS_PLAYER_CLASSES){$scope.playerClasses=HS_PLAYER_CLASSES,HSDeck.get({id:$state.params.id},function(data){$scope.deck=data;var cards={};angular.forEach(data.cards,function(value){Object.keys(cards).indexOf(value._id)<0?cards[value._id]={card:value,count:1}:cards[value._id].count=2}),$scope.deck.cards=cards}),$scope.$watch("deck._id",function(newValue){newValue&&HSMatch.get({deck:newValue},function(data){hearthStoneMatches.addMatches(data.list)})}),$scope.$watch(function(){return hearthStoneMatches.getMatches()},function(newValue){var months=hearthStoneMatches.getMatchSeasons();newValue.length>0&&HSSeason.query({months:months.join()},function(data){$scope.seasons=data})}),$scope.$watch("seasons",function(newValue){newValue&&($scope.stats=hearthStoneMatches.getMatchesStats("season",$scope.seasons))})}).service("hearthStoneMatches",function($filter,HS_PLAYER_CLASSES){function byDeck(id){return function(value){return value.deck_id==id}}function byResult(result){return 1==result?function(value){return value.result==result}:function(value){return 1!=value.result}}function byOpponent(opponent){return function(value){return value.opponent==opponent}}function bySeason(season){return function(value){return $filter("date")(value.time,"yyyyMM")==season}}return this.matches=[],this.addMatches=function(matches){this.matches=matches},this.getMatches=function(){return this.matches},this.getMatchDecks=function(){var ids=[];return this.matches.length<0?ids:(angular.forEach(this.matches,function(value){ids.indexOf(value.deck_id)<0&&ids.push(value.deck_id)}),ids)},this.getMatchSeasons=function(){var months=[];return this.matches.length<0?months:(angular.forEach(this.matches,function(value){var month=$filter("date")(value.time,"yyyyMM");months.indexOf(month)<0&&months.push(month)}),months)},this.getMatchesStats=function(filter,list){var matches=this.matches,main={};main.total={win:matches.filter(byResult(1)).length,lose:matches.filter(byResult(0)).length},main.detail={},angular.forEach(HS_PLAYER_CLASSES,function(value){main.detail[value.value]={win:matches.filter(byOpponent(value.value)).filter(byResult(1)).length,lose:matches.filter(byOpponent(value.value)).filter(byResult(0)).length}});var array={};return angular.forEach(list,function(value){var item={},filteredMatches=[];"deck"==filter?filteredMatches=matches.filter(byDeck(value._id)):"season"==filter&&(filteredMatches=matches.filter(bySeason(value.month)));var detail={};angular.forEach(HS_PLAYER_CLASSES,function(val){detail[val.value]={win:filteredMatches.filter(byOpponent(val.value)).filter(byResult(1)).length,lose:filteredMatches.filter(byOpponent(val.value)).filter(byResult(0)).length}}),item.total={win:filteredMatches.filter(byResult(1)).length,lose:filteredMatches.filter(byResult(0)).length},item.detail=detail,array[value._id]=item}),{main:main,list:array}},this});
angular.module("homeApp",[]).directive("ngHome",function(){return{restrict:"A",replace:!0,link:function(scope,element,attrs){$(document).on("swipeleft.my.index.swipe",element,function(){element.carousel("next")}),$(document).on("swiperight.my.index.swipe",element,function(){element.carousel("prev")})}}});
angular.module("appRoutes",[]).config(function($stateProvider,$urlRouterProvider,$locationProvider){$urlRouterProvider.otherwise("/"),$stateProvider.state("index",{url:"/",templateUrl:"/views/app/index.html",title:"Home"}).state("games",{url:"/games",templateUrl:"/views/app/games.html",controller:"gamesController",title:"My Games"}).state("game",{url:"/games/:url.html",templateUrl:"/views/app/game.html",controller:"gameController",title:"Game"}).state("gourmets",{url:"/gourmets",templateUrl:"/views/app/gourmets.html",controller:"gourmetsController",title:"My Gourmets Tour"}).state("hsSeasons",{url:"/hearth-stone",templateUrl:"/views/app/hearth-stone/seasons.html",controller:"hsSeasonsController",title:"My HearthStone Seasons"}).state("hsSeason",{url:"/hearth-stone/seasons/:url",templateUrl:"/views/app/hearth-stone/season.html",controller:"hsSeasonController",title:"My HearthStone Season"}).state("hsDeck",{url:"/hearth-stone/deck/:id",templateUrl:"/views/app/hearth-stone/deck.html",controller:"hsDeckController",title:"My HearthStone Deck"}),$locationProvider.html5Mode({enabled:!0,requireBase:!1})});
angular.module("myServices",["ngResource"]).factory("Count",function($resource){return $resource("/api/count/:model")}).factory("Game",function($resource){return $resource("/api/games/:url",{url:"@url"},{update:{method:"POST"}})}).factory("GameTrophy",function($resource){return $resource("/api/games/trophy/:id",{id:"@_id"},{update:{method:"POST"}})}).factory("Gourmet",function($resource){return $resource("/api/gourmets/:id",{id:"@_id"},{update:{method:"POST"}})}).factory("HSCard",function($resource){return $resource("/api/hearth-stone/cards")}).factory("HSDeck",function($resource){return $resource("/api/hearth-stone/decks/:id",{id:"@_id"},{update:{method:"POST"}})}).factory("HSSeason",function($resource){return $resource("/api/hearth-stone/seasons/:url",{url:"@url"},{update:{method:"POST"}})}).factory("HSMatch",function($resource){return $resource("/api/hearth-stone/matches/:id",{id:"@_id"},{"delete":{method:"POST"}})}).factory("saibanGame",function($resource){return $resource("/api/saiban/games/:url",{url:"@url"},{update:{method:"POST"}})});
angular.module("myConfig",[]).constant("GAME_PLATFORMS",[{value:0,name:"PlayStation 3"},{value:1,name:"PlayStation Vita"},{value:2,name:"PlayStation 4"}]).constant("GAME_GENRES",[{value:0,name:"Action"},{value:1,name:"Adventure"},{value:2,name:"Fighting"},{value:3,name:"Racing"},{value:4,name:"Role-Playing"},{value:5,name:"Sports"},{value:6,name:"Third-person shooter"},{value:7,name:"Strategy"}]).constant("GAME_TROPHY_RARITY",[{value:0,name:"Bronze"},{value:1,name:"Gold"},{value:2,name:"Silver"},{value:3,name:"Platinum"}]).constant("HS_PLAYER_CLASSES",[{value:0,name:"Druid"},{value:1,name:"Hunter"},{value:2,name:"Mage"},{value:3,name:"Paladin"},{value:4,name:"Priest"},{value:5,name:"Rogue"},{value:6,name:"Shaman"},{value:7,name:"Warlock"},{value:8,name:"Warrior"}]).constant("SAIBAN_PLATFORM",[{value:0,name:"GBA"},{value:1,name:"NDS"},{value:2,name:"3DS"}]).constant("SAIBAN_SERIES",[{value:0,name:"逆转裁判"},{value:1,name:"逆转检事"},{value:2,name:"其他"}]);