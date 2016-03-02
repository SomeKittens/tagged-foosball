'use strict';

describe('controllers', function() {
  var foosCtrl, _scope, _timeout, _window, _firebase, _rootScope, games;
  beforeEach(module('foosball'));
  beforeEach(inject(function($rootScope, $timeout, $window, $firebase, $controller) {
    _scope = $rootScope.$new();
    _timeout = $timeout;
    _rootScope = $rootScope;
    
    var genFB = function(location) {
      return $firebase(new MockFirebase('https://tagged-foosball.firebaseio.com/' + location).autoFlush());
    };
    
    foosCtrl = $controller('FoosCtrl', {
      $scope: _scope,
      $timeout: _timeout,
      playerCalc: angular.noop,
      winningScore: 5,
      genFB: genFB
    });
  }));
  
  afterEach(function() {
    if (_scope.game.active) {
      _scope.cancelActiveGame();
    }
  });

  it('should be defined, with defaults', function() {
    expect(foosCtrl).toBeDefined();
    expect(_scope.winningScore).toBe(5);
    expect(_scope.game).toEqual({
      active: false,
      player1: {},
      player2: {}
    });
  });

  it('should create a game', function(done) {
    _scope.game.player1.name = 'Test 1';
    _scope.game.player2.name = 'Test 2';
    var beforeCreation = +(new Date());
    
    _scope.createGame().then(function() {
      console.log('test');
      expect(_scope.game.active).toBe(true);
      expect(_scope.game.created).toBeGreaterThan(beforeCreation);
      expect(_scope.game.created).toBeLessThan(+(new Date()));
      expect(_scope.game.player1).toEqual({
        name: 'Test 1',
        score: 0
      });
      expect(_scope.game.player1).toEqual({
        name: 'Test 1',
        score: 0
      });
      
      done();
    });
    
    _timeout.flush();
  });/*
    
  it('should sync with Firebase', function(done) {
    _scope.game.player1.name = 'Test 1';
    _scope.game.player2.name = 'Test 2';
    
    _scope.createGame().then(function(a) {
      console.log(a);
      _scope.game.player1.score++;
      expect(_scope.game.player1.score).toBe(1);
      done();
    }, done);
  });*/
});
