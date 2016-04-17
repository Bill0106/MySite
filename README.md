Mysite
===========
My personal site with NodeJS, MongoDB, ExpressJS and AngularJS.

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
- AngularJS
  - angular-ui-router
  - angular-resource
  - angular-file-upload
  - ngInfiniteScroll
- Bootstrap
- FontAwesome

### Gulp
- Gulp
  - gulp-less
  - gulp-minify-css
  - gulp-uglify
  - gulp-notify
  - gulp-nodemon
  - gulp-jshint
  - gulp-concat
- jshint-stylish


Installation
------------
1. Run `npm install` to install backend dependencies
2. Run `node server.js`, and visit [http://localhost:8888](http://localhost:8888)
3. For Development, run `npm install nodemon -g` to install nodemon
4. Run `NODE_ENV=dev nodemon server.js` to start server with development enviroment
5. Run `gulp watch` for frontend development

Versions
--------
### v2.5
1. Use nodemon instead of Gulp-nodemon
2. Remove sourcemap
3. Set Up HearthStone Matches Admin
4. Add HearthStone Matches Commands
5. Use HearthStone matches instead of win rates
6. Use Basic Auth to access admin

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