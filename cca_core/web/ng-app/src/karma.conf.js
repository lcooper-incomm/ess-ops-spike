// Karma configuration file, see link for more information
// https://karma-runner.github.io/1.0/config/configuration-file.html

module.exports = function( config ) {
  config.set( {
                basePath: '',
                frameworks: [ 'jasmine', '@angular-devkit/build-angular' ],
                plugins: [
                  require( 'karma-jasmine' ),
                  require( 'karma-spec-reporter' ),
                  require( 'karma-chrome-launcher' ),
                  require( 'karma-jasmine-html-reporter' ),
                  require( 'karma-coverage-istanbul-reporter' ),
                  require( '@angular-devkit/build-angular/plugins/karma' )
                ],
                client: {
                  captureConsole: true,
                  clearContext: false // leave Jasmine Spec Runner output visible in browser
                },
                coverageIstanbulReporter: {
                  dir: require( 'path' ).join( __dirname, '../coverage' ),
                  reports: [ 'html', 'lcovonly' ],
                  fixWebpackSourcePaths: true
                },
                reporters: [ 'progress', 'kjhtml', 'spec' ],
                port: 9876,
                colors: true,
                logLevel: config.LOG_DEBUG,
                autoWatch: true,
                browsers: [ 'ChromeHeadless' ],
                customLaunchers: {
                  ChromeHeadless: {
                    base: 'Chrome',
                    flags: ['--headless', '--disable-gpu', '--no-sandbox', '--disable-extensions', '--remote-debugging-port=9222']
                  }
                },
                singleRun: true
  } );
};
