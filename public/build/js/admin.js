angular.module("myAdmin",["ui.router","ngFileUpload","adminRoutes","gamesAdmin","gourmetsAdmin","hearthStoneAdmin","saibanAdmin","myServices","myConfig"]).run(function($rootScope,$state,$http){$http.defaults.headers.common.auth="ljpon3UUVTMMmIhE6Kcf",$http.defaults.headers.post.auth="HNoHW7HUKEYxW5DFxaVj",$rootScope.$on("$stateChangeSuccess",function(){$rootScope.title=$state.current.title})}).filter("capitalize",function(){return function(str){return str.charAt(0).toUpperCase()+str.slice(1)}}).filter("imageUrl",function(){return function(image){return"undefined"!=typeof image?JSON.parse(image).url:void 0}});
angular.module("gamesAdmin",[]).controller("gamesController",function($scope,$stateParams,Game,GAME_PLATFORMS,GAME_GENRES){$scope.currentPage=parseInt($stateParams.page)?parseInt($stateParams.page):1,Game.get({page:$scope.currentPage,limit:30},function(data){$scope.games=data.list,$scope.totalPage=new Array(Math.ceil(data.total/30))}),$scope.platforms=GAME_PLATFORMS,$scope.genres=GAME_GENRES}).controller("gameCreateController",function($scope,$state,Game,Upload,GAME_FIELDS,GAME_PLATFORMS,GAME_GENRES){$scope.fields=GAME_FIELDS,$scope.platforms=GAME_PLATFORMS,$scope.genres=GAME_GENRES,$scope.$watch("file",function(file){file&&Upload.upload({url:"/api/images",file:file}).success(function(data,status,headers,config){$scope.game.image=JSON.stringify(data)}).error(function(data,status,headers,config){$scope.show=!0,$scope.result=data})}),$scope.game=new Game,$scope.saveGame=function(){$scope.game.$save(function(data){data.success?$state.go("games"):($scope.show=!0,$scope.result=data.msg)})}}).controller("gameUpdateController",function($scope,$filter,$state,Game,Upload,GAME_FIELDS,GAME_PLATFORMS,GAME_GENRES){$scope.fields=GAME_FIELDS,$scope.platforms=GAME_PLATFORMS,$scope.genres=GAME_GENRES,$scope.$watch("file",function(file){file&&Upload.upload({url:"/api/images",file:file}).success(function(data,status,headers,config){$scope.game.image=JSON.stringify(data)}).error(function(data,status,headers,config){$scope.show=!0,$scope.result=data})}),$scope.saveGame=function(){$scope.game.$update(function(data){data.success?$state.go("games"):($scope.show=!0,$scope.result=data.msg)})},$scope.loadGame=function(){$scope.game=Game.get({url:$state.params.url}),$scope.$watch("game.release_at",function(newValue){newValue&&($scope.game.release_at=$filter("date")(newValue,"yyyy-MM-dd"))}),$scope.$watch("game.buy_at",function(newValue){newValue&&($scope.game.buy_at=$filter("date")(newValue,"yyyy-MM-dd"))})},$scope.loadGame()}).controller("gameTrophiesController",function($scope,$state,$filter,GameTrophy,GAME_TROPHY_RARITY){$scope.rarities=GAME_TROPHY_RARITY,GameTrophy.get({id:$state.params.id},function(data){var format=[];angular.forEach(data.trophies,function(value){value.date&&(value.date=$filter("date")(value.date,"yyyy-MM-dd")),format.push(value),format.length==data.trophies.length&&(data.trophies=format,$scope.trophies=data)})}),$scope.saveTrophies=function(){$scope.trophies.$update(function(data){data.success?$state.go("games"):($scope.show=!0,$scope.result=data.msg)})},$scope.removeTrophy=function(index){$scope.trophies.trophies.splice(index,1)},$scope.addTrophy=function(){var trophy=new GameTrophy;$scope.trophies.trophies.push(trophy)}}).controller("gameTrophiesScrapController",function($scope,$state,$http){$scope.scrapGame=function(){$http.post("/api/games/scrap/"+$state.params.id,{url:$scope.url}).success(function(data){$state.go("gameTrophies",{id:data})}).error(function(error){$scope.show=!0,$scope.result=error})}}).constant("GAME_FIELDS",["title","name","developer","publisher","release_at","buy_at","rate","url","platform","genre","description"]);
angular.module("gourmetsAdmin",[]).controller("gourmetsController",function($scope,$stateParams,Gourmet){$scope.currentPage=parseInt($stateParams.page)?parseInt($stateParams.page):1,Gourmet.get({limit:30,page:$scope.currentPage},function(data){$scope.gourmets=data.list,$scope.totalPage=new Array(Math.ceil(data.total/30))})}).controller("gourmetCreateController",function($scope,$state,Gourmet,Upload,GOURMET_FIELDS){$scope.fields=GOURMET_FIELDS,$scope.$watch("file",function(file){file&&Upload.upload({url:"/api/images",file:file}).success(function(data,status,headers,config){$scope.gourmet.image=JSON.stringify(data)}).error(function(data,status,headers,config){$scope.show=!0,$scope.result=data})}),$scope.gourmet=new Gourmet,$scope.saveGourmet=function(){$scope.gourmet.$save(function(data){data.success?$state.go("gourmets"):($scope.show=!0,$scope.result=data.msg)})}}).controller("gourmetUpdateController",function($scope,$filter,$state,Gourmet,Upload,GOURMET_FIELDS){$scope.fields=GOURMET_FIELDS,$scope.$watch("file",function(file){file&&Upload.upload({url:"/api/images",file:file}).success(function(data,status,headers,config){$scope.game.image=JSON.stringify(data)}).error(function(data,status,headers,config){$scope.show=!0,$scope.result=data})}),$scope.saveGourmet=function(){$scope.gourmet.$update(function(data){data.success?$state.go("gourmets"):($scope.show=!0,$scope.result=data.msg)})},$scope.loadGourmet=function(){$scope.gourmet=Gourmet.get({id:$state.params.id}),$scope.$watch("gourmet.date",function(newValue){newValue&&($scope.gourmet.date=$filter("date")(newValue,"yyyy-MM-dd"))})},$scope.loadGourmet()}).constant("GOURMET_FIELDS",["food","restaurant","date","url"]);
angular.module("hearthStoneAdmin",[]).controller("hsDecksController",function($scope,HSDeck,HS_PLAYER_CLASSES){$scope.playerClasses=HS_PLAYER_CLASSES,$scope.decks=HSDeck.query()}).controller("hsDeckCreateController",function($scope,$state,$filter,HSDeck,hearthStoneCards){$scope.deck=new HSDeck,$scope.deck.playerClass=$state.params["class"],$scope.deck.cards=[],$scope.classCards=hearthStoneCards.getCards($state.params["class"]),$scope.neutralCards=hearthStoneCards.getCardsByCost(-1,1),$scope.getCardByCost=function(cost,event){event.preventDefault(),$scope.neutralCards=hearthStoneCards.getCardsByCost(-1,cost)},$scope.getNumber=function(num){return new Array(num)},$scope.addCard=function(card){$filter("checkCard")(card,$scope.deck.cards)&&$scope.deck.cards.push(card)},$scope.removeCard=function(card,event){event.preventDefault(),$scope.deck.cards.splice($scope.deck.cards.indexOf(card),1)},$scope.saveDeck=function(){$scope.deck.$save(function(data){data.success?$state.go("HSdecks"):($scope.show=!0,$scope.result=data.msg)})}}).controller("hsDeckUpdateController",function($scope,$state,$filter,HSDeck,hearthStoneCards){$scope.loadDeck=function(){HSDeck.get({id:$state.params.id},function(data){$scope.deck=data,$scope.classCards=hearthStoneCards.getCards(data.playerClass)})},$scope.loadDeck(),$scope.neutralCards=hearthStoneCards.getCardsByCost(-1,1),$scope.getCardByCost=function(cost,event){event.preventDefault(),$scope.neutralCards=hearthStoneCards.getCardsByCost(-1,cost)},$scope.getNumber=function(num){return new Array(num)},$scope.addCard=function(card){$filter("checkCard")(card,$scope.deck.cards)&&$scope.deck.cards.push(card)},$scope.removeCard=function(card,event){event.preventDefault(),$scope.deck.cards.splice($scope.deck.cards.indexOf(card),1)},$scope.saveDeck=function(){$scope.deck.$update(function(data){data.success?$state.go("HSdecks"):($scope.show=!0,$scope.result=data.msg)})}}).controller("hsSeasonsController",function($scope,HSSeason){$scope.seasons=HSSeason.query()}).controller("hsSeasonCreateController",function($scope,$state,HSSeason,SEASON_FIELDS,Upload){$scope.fields=SEASON_FIELDS,$scope.season=new HSSeason,$scope.$watch("file",function(file){file&&Upload.upload({url:"/api/images",file:file}).success(function(data,status,headers,config){$scope.season.image=JSON.stringify(data)}).error(function(data,status,headers,config){$scope.show=!0,$scope.result=data})}),$scope.saveSeason=function(){$scope.season.$save(function(data){data.success?$state.go("HSseasons"):($scope.show=!0,$scope.result=data.msg)})}}).controller("hsSeasonUpdateController",function($scope,$state,$filter,Upload,HSSeason,SEASON_FIELDS){$scope.fields=SEASON_FIELDS,$scope.$watch("file",function(file){file&&Upload.upload({url:"/api/images",file:file}).success(function(data,status,headers,config){$scope.season.image=JSON.stringify(data)}).error(function(data,status,headers,config){$scope.show=!0,$scope.result=data})}),$scope.$watch("season.month",function(newValue){newValue&&($scope.season.month=$filter("date")(newValue,"yyyy-MM"))}),$scope.saveSeason=function(){$scope.season.$update(function(data){data.success?$state.go("HSseasons"):($scope.show=!0,$scope.result=data.msg)})},$scope.loadSeason=function(){$scope.season=HSSeason.get({url:$state.params.url})},$scope.loadSeason()}).controller("hsMatchesController",function($scope,$stateParams,HSMatch,HSDeck,HS_PLAYER_CLASSES){$scope.playerClasses=HS_PLAYER_CLASSES,$scope.currentPage=parseInt($stateParams.page)?parseInt($stateParams.page):1,HSMatch.get({page:$scope.currentPage},function(data){$scope.matches=data.list,$scope.totalPage=new Array(Math.ceil(data.total/100))}),$scope.$watch("matches",function(newValue){if(newValue){var ids=[];angular.forEach(newValue,function(value){ids.indexOf(value.deck_id)<0&&ids.push(value.deck_id)}),HSDeck.query({ids:ids.join()},function(data){$scope.decks={},angular.forEach(data,function(value){$scope.decks[value._id]=value})})}}),$scope.deleteMatch=function(match){$scope.match=new HSMatch,$scope.match._id=match._id,$scope.match.$delete(function(data){if(data.success){var index=$scope.matches.indexOf(match);$scope.matches.splice(index,1)}else $scope.show=!0,$scope.result=data.data.errorMsg})}}).controller("hsMatchCreateController",function($scope,HSDeck,HSMatch,HS_PLAYER_CLASSES){$scope.match=new HSMatch,$scope.matches=[],$scope.decks=HSDeck.query({active:!0}),$scope.playerClasses=HS_PLAYER_CLASSES,$scope.total=0,$scope.win=0,$scope.saveMatch=function(result){$scope.match.result=result,$scope.match.$save(function(data){data.success?($scope.matches.push(data.data),$scope.total++,1==data.data.result&&$scope.win++):($scope.show=!0,$scope.result=data.data.errorMsg)})}}).filter("checkCard",function(){return function(item,object){if(0===object.length)return!0;if(30==object.length)return!1;for(var count=0,i=0;i<object.length;i++){if(item._id==object[i]._id&&count++,1==count&&4==item.rarity)return!1;if(2==count)return!1}return!0}}).filter("range",function(){return function(input,min,max){min=parseInt(min),max=parseInt(max);for(var i=min;max>i;i++)input.push(i);return input}}).service("hearthStoneCards",function(HSCard){return this.getCards=function(playerClass){return HSCard.query({playerClass:playerClass,standard:!0})},this.getCardsByCost=function(playerClass,cost){return HSCard.query({playerClass:playerClass,cost:cost,standard:!0})},this}).constant("SEASON_FIELDS",["title","month","rank","url","description"]);
angular.module("saibanAdmin",[]).controller("saibanGamesController",function($scope,saibanGame,SAIBAN_PLATFORM,SAIBAN_SERIES){$scope.platforms=SAIBAN_PLATFORM,$scope.serieses=SAIBAN_SERIES,saibanGame.query(function(data){$scope.games=data})}).controller("saibanGameCreateController",function($scope,$state,$filter,saibanGame,SAIBAN_PLATFORM,SAIBAN_SERIES){$scope.platforms=SAIBAN_PLATFORM,$scope.serieses=SAIBAN_SERIES,$scope.fields=["order","image","release_at"],$scope.game=new saibanGame,$scope.game.chapters=[],$scope.addChapter=function(){var newChapter={title:"",description:""};$scope.game.chapters.push(newChapter)},$scope.saveGame=function(){$scope.game.$save(function(data){data.success?$state.go("saibanGames"):($scope.show=!0,$scope.result=data.msg)})}}).controller("saibanGameUpdateController",function($scope,$state,$filter,saibanGame,SAIBAN_PLATFORM,SAIBAN_SERIES){$scope.platforms=SAIBAN_PLATFORM,$scope.serieses=SAIBAN_SERIES,$scope.fields=["order","image","release_at"],$scope.addChapter=function(){var newChapter={title:"",description:""};$scope.game.chapters.push(newChapter)},$scope.saveGame=function(){$scope.game.$update(function(data){data.success?$state.go("saibanGames"):($scope.show=!0,$scope.result=data.msg)})},$scope.loadGame=function(){$scope.game=saibanGame.get({url:$state.params.url}),$scope.$watch("game.release_at",function(date){date&&($scope.game.release_at=$filter("date")(date,"yyyy-MM-dd"))})},$scope.loadGame()});
angular.module("adminRoutes",[]).config(function($stateProvider,$urlRouterProvider,$locationProvider){$urlRouterProvider.otherwise("/"),$stateProvider.state("index",{url:"/admin",templateUrl:"/views/admin/index.html",title:"Home"}).state("games",{url:"/admin/games?page",templateUrl:"/views/admin/games/list.html",controller:"gamesController",title:"Games"}).state("gameCreate",{url:"/admin/games/add",templateUrl:"/views/admin/games/create.html",controller:"gameCreateController",title:"Game Create"}).state("gameUpdate",{url:"/admin/games/:url",templateUrl:"/views/admin/games/create.html",controller:"gameUpdateController",title:"Game Update"}).state("gameTrophiesScrap",{url:"/admin/scrap/:id",templateUrl:"/views/admin/games/scrap.html",controller:"gameTrophiesScrapController",title:"Game Trophies Scrap"}).state("gameTrophies",{url:"/admin/trophies/:id",templateUrl:"/views/admin/games/trophies.html",controller:"gameTrophiesController",title:"Game Trophies"}).state("gourmets",{url:"/admin/gourmets?page",templateUrl:"/views/admin/gourmets/list.html",controller:"gourmetsController",title:"Gourmets"}).state("gourmetCreate",{url:"/admin/gourmets/add",templateUrl:"/views/admin/gourmets/create.html",controller:"gourmetCreateController",title:"Gourmet Create"}).state("gourmetUpdate",{url:"/admin/gourmets/:id",templateUrl:"/views/admin/gourmets/create.html",controller:"gourmetUpdateController",title:"Gourmet Update"}).state("HSdecks",{url:"/admin/hearth-stone-decks",templateUrl:"/views/admin/hearthStone/deck_list.html",controller:"hsDecksController",title:"Hearth Stone Decks"}).state("HSdeckCreate",{url:"/admin/hearth-stone-decks/add?class",templateUrl:"/views/admin/hearthStone/deck_create.html",controller:"hsDeckCreateController",title:"Hearth Stone Deck Create"}).state("HSdeckUpdate",{url:"/admin/hearth-stone-decks/:id",templateUrl:"/views/admin/hearthStone/deck_create.html",controller:"hsDeckUpdateController",title:"Hearth Stone Deck Update"}).state("HSseasons",{url:"/admin/hearth-stone-seasons",templateUrl:"/views/admin/hearthStone/season_list.html",controller:"hsSeasonsController",title:"Hearth Stone Seasons"}).state("HSSeasonCreate",{url:"/admin/hearth-stone-seasons/add",templateUrl:"/views/admin/hearthStone/season_create.html",controller:"hsSeasonCreateController",title:"Hearth Stone Season Create"}).state("HSSeasonUpdate",{url:"/admin/hearth-stone-seasons/:url",templateUrl:"/views/admin/hearthStone/season_create.html",controller:"hsSeasonUpdateController",title:"Hearth Stone Season Update"}).state("HSMatches",{url:"/admin/hearth-stone-matches?page",templateUrl:"/views/admin/hearthStone/matches_list.html",controller:"hsMatchesController",title:"Hearth Stone Matches"}).state("HSMatchCreate",{url:"/admin/hearth-stone-matches/add",templateUrl:"/views/admin/hearthStone/match_create.html",controller:"hsMatchCreateController",title:"Hearth Stone Match Create"}).state("saibanGames",{url:"/admin/saiban-games",templateUrl:"/views/admin/saiban/game_list.html",controller:"saibanGamesController",title:"Gyakuten Saiban Games"}).state("saibanGameCreate",{url:"/admin/saiban-games/add",templateUrl:"/views/admin/saiban/game_create.html",controller:"saibanGameCreateController",title:"Gyakuten Saiban Game Create"}).state("saibanGameUpdate",{url:"/admin/saiban-games/:url",templateUrl:"/views/admin/saiban/game_create.html",controller:"saibanGameUpdateController",title:"Gyakuten Saiban Game Update"}),$locationProvider.html5Mode({enabled:!0,requireBase:!1})});
angular.module("myServices",["ngResource"]).factory("Count",function($resource){return $resource("/api/count/:model")}).factory("Game",function($resource){return $resource("/api/games/:url",{url:"@url"},{update:{method:"POST"}})}).factory("GameTrophy",function($resource){return $resource("/api/games/trophy/:id",{id:"@_id"},{update:{method:"POST"}})}).factory("Gourmet",function($resource){return $resource("/api/gourmets/:id",{id:"@_id"},{update:{method:"POST"}})}).factory("HSCard",function($resource){return $resource("/api/hearth-stone/cards")}).factory("HSDeck",function($resource){return $resource("/api/hearth-stone/decks/:id",{id:"@_id"},{update:{method:"POST"}})}).factory("HSSeason",function($resource){return $resource("/api/hearth-stone/seasons/:url",{url:"@url"},{update:{method:"POST"}})}).factory("HSMatch",function($resource){return $resource("/api/hearth-stone/matches/:id",{id:"@_id"},{"delete":{method:"POST"}})}).factory("saibanGame",function($resource){return $resource("/api/saiban/games/:url",{url:"@url"},{update:{method:"POST"}})});
angular.module("myConfig",[]).constant("GAME_PLATFORMS",[{value:0,name:"PlayStation 3"},{value:1,name:"PlayStation Vita"},{value:2,name:"PlayStation 4"}]).constant("GAME_GENRES",[{value:0,name:"Action"},{value:1,name:"Adventure"},{value:2,name:"Fighting"},{value:3,name:"Racing"},{value:4,name:"Role-Playing"},{value:5,name:"Sports"},{value:6,name:"Third-person shooter"},{value:7,name:"Strategy"}]).constant("GAME_TROPHY_RARITY",[{value:0,name:"Bronze"},{value:1,name:"Gold"},{value:2,name:"Silver"},{value:3,name:"Platinum"}]).constant("HS_PLAYER_CLASSES",[{value:0,name:"Druid"},{value:1,name:"Hunter"},{value:2,name:"Mage"},{value:3,name:"Paladin"},{value:4,name:"Priest"},{value:5,name:"Rogue"},{value:6,name:"Shaman"},{value:7,name:"Warlock"},{value:8,name:"Warrior"}]).constant("SAIBAN_PLATFORM",[{value:0,name:"GBA"},{value:1,name:"NDS"},{value:2,name:"3DS"}]).constant("SAIBAN_SERIES",[{value:0,name:"逆转裁判"},{value:1,name:"逆转检事"},{value:2,name:"其他"}]);