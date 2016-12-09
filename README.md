Mysite
===========
My personal site with NodeJS, Koa, MongoDB, AngularJS and React.

Dependencies
------------
### Backend
- NodeJS
  - cheerio
  - moment
  - mongoose
  - qiniu
- Koa@next
  - koa-basic-auth
  - koa-bodyparser
  - koa-multer
  - koa-router
  - koa-static

### Frontend
- AngularJS 2
  - angular2-infinite-scroll
  - ng2-lazyload-image
- ReactJS
  - react-dom
  - react-router
- Bootstrap
- Axios

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
2. Run `npm install ts-node -g` to install ts-node
3. Run `ts-node server.js`, and visit [http://localhost:8888](http://localhost:8888)
4. For Development, run `npm install pm2 -g` to install pm2
5. Run `pm2 install typescript` for Typescript
6. Run `NODE_ENV=dev pm2 start server.ts --watch --ignore-watch='upload'` to start server with development enviroment
7. Run `gulp watch` for frontend development

Versions
--------
### v4.1.0
1. Optimize hearthstone file name
2. Add blog database
3. Set up blog admin

### v4.0.0
1. Use Koa@next instead of Express

### v3.6.0
1. Git ignore API Keys

### v3.5.0
1. Use ReactJS instead of AngularJS in admin page

### v3.0.0
1. Frontend upgrade AngularJS 1.x to AngularJS 2.0

### v2.7.0
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

### v2.6.0
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

### v2.5.0
1. Use nodemon instead of Gulp-nodemon
2. Remove sourcemap
3. Set Up HearthStone matches admin
4. Add HearthStone matches Commands
5. Use HearthStone matches instead of win rates

### v2.4.0
1. Delete bower.json

### v2.3.0
1. Game trophy admin can add new trophy
2. Game trophy admin style optimize

### v2.2.0
1. Update Gulp to 4.0

### v2.1.0
1. Use Gulp instead of Grunt for development
2. Change the Less file directory
3. Change CSS and compressed JS file directory

### v2.0.0
1. Optimize AngularJS code directory structure
2. Recode Frontend code

### v1.0.0
1. Set up website with AngularJS & NodeJS