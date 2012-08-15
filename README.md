## Running the "App" with Lineman (and Grunt)

The prototype was built and configured using [Lineman](https://github.com/testdouble/lineman).

AJAX endpoint mocks exist as a simple express.js app running in node.js

* Install [NodeJS](http://nodejs.org/)
* Install dependencies: npm install
* Run the app: grunt run

## Running Specs

* Install [Testacular](http://vojtajina.github.com/testacular/) : npm install -g testacular
* Install [PhantomJS](http://phantomjs.org/)
* Run the app: grunt run
* Run the specs in a new terminal tab: testacular config/test.js

## Bundling Resources for Production

Using [Lineman](https://github.com/testdouble/lineman) we have setup a simple build script that will lint, concat and minify code. Generated code appears in /dist

* Run the grunt from the CLI: grunt
* Tasks will run to generate the /dist directory
* /dist contains minified js, css and the production .html files that you can deploy on your server