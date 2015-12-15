todoList.factory("todoFactory", function($http) {
  var _getTodoList = function() {
    return $http.get("/api/todos");
  };

  var _saveTodo = function(todo) {
    return $http.post("api/todos", todo);
  };

  var _deleteTodo = function(id) {
    return $http.delete("api/todos/" + id);
  }

  return {
    getTodoList: _getTodoList,
    saveTodo: _saveTodo,
    deleteTodo: _deleteTodo
  };
});