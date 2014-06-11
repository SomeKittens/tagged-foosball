module.exports = function(config){
  config.set({

    basePath : '../',

    files : [
      'test/lib/angular.js',
      'test/lib/angular-mocks.js',
      'test/lib/firebase.js',
      'test/lib/angularfire.js',
      'test/lib/sinon.js',
      'test/lib/lodash.js',
      'test/lib/mockfirebase.js',
      'js/*.js',
      'test/unit/*.js'
    ],
    
    exclude: [
      'js/loadSampleData.js'
    ],

    autoWatch : true,

    frameworks: ['jasmine'],

    browsers : ['Chrome'],

    plugins : [
            'karma-chrome-launcher',
            'karma-jasmine',
            'karma-junit-reporter'
            ],

    junitReporter : {
      outputFile: 'test_out/unit.xml',
      suite: 'unit'
    }

  });
};
