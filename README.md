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
3. Run `gulp start` in development enviroment
4. For development, run `bower install` to get frontend dependencies

Versions
--------
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