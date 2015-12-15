var todo = angular.module('todo', []);

function mainController($scope, $http) {
  $scope.todo = {};

  // getting all todos when loading page
  $http.get('/api/todos')
    .success(function(data) {
      $scope.todos = data;
      console.log(data);
    })
    .error(function(data) {
      console.log('Error: ' + data);
    });

  // create todo
  $scope.createTodo = function() {
    $http.post('/api/todos', $scope.todo)
      .success(function(data) {
        $scope.todo = {};
        $scope.todos = data;
        console.log(data);
      })
      .error(function(data) {
        console.log('Error: ' + data);
      });
  }

  // deleting a todo after checking it
  $scope.deleteTodo = function(id) {
    $http.delete('/api/todos/' + id)
      .success(function(data) {
        $scope.todos = data;
        console.log(data);
      })
      .error(function(data) {
        console.log('Error: ' + data);
      });
  }
}