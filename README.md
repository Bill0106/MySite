Mysite
===========
My personal site with MongoDB, ExpressJS, AngularJS and NodeJS.

Dependencies
------------
### Backend
- NodeJS
  - connect-multiparty
  - request
  - cheerio
  - moment
  - async
  - base-auth
- Express framework
  - morgan
  - body-parser
  - method-override
  - cookie-parser
- MongoDB
  - mongoose

### Frontend
- AngularJS 2
  - angular2-infinite-scroll
  - ng2-lazyload-image
- ReactJS
  - react-dom
  - react-router
- Bootstrap

### Gulp
- Gulp
  - gulp-sass
  - gulp-clean
  - gulp-clean-css
  - gulp-notify
  - webpack-stream
- Webpack
  - angular2-template-loader
  - awesome-typescript-loader
  - html-loader
  - typescript 	
- Typings


Installation
------------
1. Run `npm install` to install backend dependencies
2. Run `node server.js`, and visit [http://localhost:8888](http://localhost:8888)
3. For Development, run `npm install nodemon -g` to install nodemon
4. Run `NODE_ENV=dev nodemon server.js` to start server with development enviroment
5. Run `gulp watch` for frontend development

Versions
--------
### v3.5
1. Use ReactJS instead of AngularJS in admin page

### v3.0
1. Frontend upgrade AngularJS 1.x to AngularJS 2.0

### v2.7
1. Use Sass instead of Less
2. Optimize style

### v2.6.2
1. Optimize game trophy controller
2. Optimize game and gourmet API
3. Add HearthStone matches delete

### v2.6.1
1. Update hearthStoneCardsUpdate command
2. HearthStone card database add 'standard' field
3. HearthStone deck admin request only standard cards

### v2.6
1. Use Basic Auth to access admin
2. Optimize admin image upload
3. Optimize admin pages
4. HearthStone match create query only active deck

### v2.5.2
1. Fix HearthStone season time to 'YYYYMM'

### v2.5.1
1. Recode HearthStone API
2. HearthStone matches display like: 'win - lose'
3. HearthStone pages optimize

### v2.5
1. Use nodemon instead of Gulp-nodemon
2. Remove sourcemap
3. Set Up HearthStone matches admin
4. Add HearthStone matches Commands
5. Use HearthStone matches instead of win rates

### v2.4
1. Delete bower.json

### v2.3
1. Game trophy admin can add new trophy
2. Game trophy admin style optimize

### v2.2
1. Update Gulp to 4.0

### v2.1
1. Use Gulp instead of Grunt for development
2. Change the Less file directory
3. Change CSS and compressed JS file directory

### v2.0
1. Optimaze AngularJS code directory structure
2. Recode Frontend code

### v1.0
1. Set up website with AngularJS & NodeJS