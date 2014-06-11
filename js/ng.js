'use strict';

angular.module('foosball', [
  'ui.bootstrap',
  'firebase'
  ]).value('winningScore', 5 /* is right out */)
  .service('playerCalc', function(winningScore) {
    return function(games) {
      var players = {}
        , addPlayer = function(player, diff) {
          if (!players[player.name]) {
            players[player.name] = {
              games: 0,
              totalScore: 0,
              gamesWon: 0,
              differential: 0
            };
          }
          players[player.name].games++;
          players[player.name].totalScore += player.score;
          if (player.score === winningScore) {
            players[player.name].gamesWon++;
            players[player.name].differential += diff;
          } else {
            players[player.name].differential -= diff;
          }
        };
      
      // Extra step required for working with Firebase data
      // http://stackoverflow.com/a/22152828/1216976
      var gameIndexes = games.$getIndex();
      gameIndexes.forEach(function(gameIndex) {
        var game = games[gameIndex]
          , diff = Math.abs(game.player1.score - game.player2.score);
        addPlayer(game.player1, diff);
        addPlayer(game.player2, diff);
      });
      
      var playerArr = [];
      
      Object.keys(players).forEach(function(playerName) {
        var player = players[playerName];
        player.name = playerName;
        player.ppg = player.totalScore / player.games;
        playerArr.push(player);
      });

      return playerArr;
    };
  })
  .filter('sortPlayers', function() {
    return function(players) {
      return players.sort(function(a,b) {
        if (a.gamesWon !== b.gamesWon) {
          return b.gamesWon - a.gamesWon;
        } else {
          return b.differential - a.differential;
        }
      });
    };
  })
  .service('genFB', function($window, $firebase) {
    return function(location) {
      return $firebase(new $window.Firebase('https://tagged-foosball.firebaseio.com/' + location));
    };
  })
  .controller('FoosCtrl', function($scope, $timeout, playerCalc, winningScore, genFB) {
    $scope.games = genFB('games');
    // Don't hate the
    $scope.players = {};
    // hate the
    $scope.game = {
      active: false,
      player1: {},
      player2: {}
    };
    $scope.winningScore = winningScore;
    
    $scope.$watch('games', function(n) {
      $scope.players = playerCalc(n);
    }, true);
    
    var activeGameRef;
    
    $scope.$watch('game', function(n) {
      if (!n.active) { return; }
      activeGameRef.player1 = n.player1;
      activeGameRef.player2 = n.player2;
      activeGameRef.$save();
    }, true);
    
    $scope.createGame = function() {
      $scope.game.player1.score = 0;
      $scope.game.player2.score = 0;
      $scope.game.started = +(new Date());
      console.log('a');
      console.log($scope.games.$add);
      $scope.games.$add({}).then(function(ref) {
        console.log('b');
        $scope.game.active = true;
        activeGameRef = $scope.games.$child(ref.name());
        activeGameRef.started = $scope.game.started;
        activeGameRef.player1 = $scope.game.player1;
        activeGameRef.player2 = $scope.game.player2;
        return activeGameRef.$save();
      });
    };
    
    $scope.increment = function(num) {
      var player = $scope.game['player' + num];
      if (player.score === winningScore) { return; }
      player.score++;
      if (player.score === winningScore) {
        // Said player has won
        $scope.game.winner = player.name;
        $timeout(function() {
          $scope.game.active = false;
          $scope.game.winner = '';
        }, 5000);
      }
    };
    
    $scope.decrement = function(num) {
      if (!$scope.game['player' + num].score) { return; }
      $scope.game['player' + num].score--;
    };
    
    $scope.cancelActiveGame = function() {
      activeGameRef.$remove();
      $scope.game.active = false;
    };
  });