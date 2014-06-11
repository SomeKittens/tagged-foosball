var sampleData = [
    {player1: { "name":  "Alex", "score": 4},  player2: {"name":  "Barrett",  "score": 5 }},
    {player1: { "name":  "Alex", "score": 1},  player2: {"name":  "Barrett",  "score": 5 }},
    {player1: { "name":  "Alex", "score": 2},  player2: {"name":  "Barrett",  "score": 5 }},
    {player1: { "name":  "Alex", "score": 0},  player2: {"name":  "Barrett",  "score": 5 }},
    {player1: { "name":  "Alex", "score": 6},  player2: {"name":  "Barrett",  "score": 5 }},
    {player1: { "name":  "Alex", "score": 5},  player2: {"name":  "Barrett",  "score": 2 }},
    {player1: { "name":  "Alex", "score": 4},  player2: {"name":  "Barrett",  "score": 0 }},
    {player1: { "name":  "Joel", "score": 4},  player2: {"name":  "Barrett",  "score": 5 }},
    {player1: { "name":  "Tim" , "score": 4},  player2: {"name":  "Alex"   ,  "score": 5 }},
    {player1: { "name":  "Tim" , "score": 5},  player2: {"name":  "Alex"   ,  "score": 2 }},
    {player1: { "name":  "Alex", "score": 3},  player2: {"name":  "Tim"    ,  "score": 5 }},
    {player1: { "name":  "Alex", "score": 5},  player2: {"name":  "Tim"    ,  "score": 3 }},
    {player1: { "name":  "Alex", "score": 5},  player2: {"name":  "Joel"   ,  "score": 4 }},
    {player1: { "name":  "Joel", "score": 5},  player2: {"name":  "Tim"    ,  "score": 2 }}
];
$scope.games.$on('loaded', function() {
  console.log($scope.games[0]);
  sampleData.forEach(function(sampleGame) {
    sampleGame.started = +(new Date());
    $scope.games.$add(sampleGame);
  });
});