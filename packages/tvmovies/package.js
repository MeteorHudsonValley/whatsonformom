Package.describe({
  name: 'cardenuto10:tvmovies',
  version: '0.0.1',
  // Brief, one-line summary of the package.
  summary: 'TV Movies Data Models (http://developer.tmsapi.com/)',
  // URL to the Git repository containing the source code for this package.
  git: '',
  // By default, Meteor will default to using README.md for documentation.
  // To avoid submitting documentation, set this field to null.
  documentation: 'README.md'
});
Package.onUse(function(api){

  api.versionsFrom('METEOR@1.0');

	// Add 3rd party package dependencies
	var packages = [
		'check',
		'mongo',
		'http',
		'underscore',
		'aldeed:simple-schema@1.3.3',
		'aldeed:collection2@2.3.3',
		'dburles:collection-helpers@1.0.3'
	];
	api.use(packages);
	api.imply(packages);

 
  api.use("templating", "client");
  //api.add_files("aTemplate.html", "client");
  //api.add_files("serverFunction.js", "server");
  //api.export('capitalise', 'server');
 //   console.log("here1");

	// Add common files
	api.addFiles([
		'lib/namespace.js',
		'lib/models/tv_movies.js'
	], ['client','server']);

	// Add client-side files
	api.addFiles([
		'lib/client/aTemplate.html',
		'lib/client/aTemplate.js'
	], ['client']);

	// Add server-side files
	api.addFiles([
		'serverFunction.js',
		'server/stuff.js',
		'lib/server/fixtures.js',
		'lib/server/tvmovies.js'
	], ['server']);
	
	// Add server-side files
	api.addAssets([
	], ['server']);

	// Export Models and Schemas for external access
	api.export([
		'capitalise'
	], ['server']);

	// Export Models and Schemas for external access
	api.export([
		'Schemas',
		'AllowedValues',
		'Methods',
		'Utils',

		'TVMovies',
		'TVStations'
  ]);

});
  
  /*
Package.onUse(function(api) {
  api.versionsFrom('1.2.0.2');
  api.use('ecmascript');
  api.addFiles('tvmovies.js');
});

Package.onTest(function(api) {
  api.use('ecmascript');
  api.use('tinytest');
  api.use('cardenuto10:tvmovies');
  api.addFiles('tvmovies-tests.js');
});
*/