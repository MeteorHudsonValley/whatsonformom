Package.describe({
  name: 'cardenuto10:appbody',
  version: '0.0.1',
  // Brief, one-line summary of the package.
  summary: 'CSS Template',
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
		'iron:router',
		'percolate:velocityjs',
		'jquery-waypoints',
		'fastclick'
		//'underscore',
//		'aldeed:simple-schema@1.3.3',
//		'aldeed:collection2@2.3.3',
//		'dburles:collection-helpers@1.0.3'
	];
	api.use(packages);
	api.imply(packages);

 
	api.use("templating", "client");
	api.use('session');
	api.use('deps');
	//api.use('mongo');

	// Add common files
	api.addFiles([
		'lib/client/appbody.html',
		'lib/client/appbody.js',
		'lib/client/overlay.html',
		'lib/client/overlay.js',
		'lib/client/nav.html',
		'lib/client/nav.js',
		'lib/client/jquery.touchwipe.js',
		'lib/client/helpers.js'//,
		//'lib/client/material.min.css',
		//'lib/client/styles.css'
	], ['client']);

	// Add client-side files
	api.addAssets([
		//'public/images/android-logo.png'
	], ['client']);

});
/*
Package.onTest(function(api) {
  api.use('ecmascript');
  api.use('tinytest');
  api.use('cardenuto10:appbody');
  api.addFiles('appbody-tests.js');
});
*/