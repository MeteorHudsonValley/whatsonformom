Package.describe({
  name: 'cardenuto10:notfound',
  version: '0.0.1',
  // Brief, one-line summary of the package.
  summary: '',
  // URL to the Git repository containing the source code for this package.
  git: '',
  // By default, Meteor will default to using README.md for documentation.
  // To avoid submitting documentation, set this field to null.
  documentation: 'README.md'
});

Package.onUse(function(api) {
  api.versionsFrom('METEOR@1.0');

	// Add 3rd party package dependencies
	var packages = [
		'check',
		'mongo'
	];
	api.use(packages);
	api.imply(packages);
 
	api.use("templating", "client");
	api.use('session');

	// Add client-side files
	api.addFiles([
		'lib/client/notfound.html',
		'lib/client/notfound.js'
	], ['client']);

});
/*
Package.onTest(function(api) {
  api.use('ecmascript');
  api.use('tinytest');
  api.use('cardenuto10:notfound');
  api.addFiles('notfound-tests.js');
});
*/