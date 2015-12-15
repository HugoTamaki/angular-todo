todoList.controller("todoListController", function($scope, todoFactory) {
  $scope.todo = {};

  // getting all todos when loading page
  todoFactory.getTodoList()
    .success(function(data) {
      $scope.todos = data;
      console.log(data);
    })
    .error(function(data) {
      console.log('Error: ' + data);
    });

  // create todo
  $scope.createTodo = function() {
    todoFactory.saveTodo($scope.todo)
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
    todoFactory.deleteTodo(id)
      .success(function(data) {
        $scope.todos = data;
        console.log(data);
      })
      .error(function(data) {
        console.log('Error: ' + data);
      });
  }
});
