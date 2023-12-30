import type { Todo } from "./todoStore.types";

export const useTodoStore = defineStore("todo", () => {
  const initialData: Todo[] = [
    { id: 1, isCompleted: false, value: "Take a shower" },
    { id: 2, isCompleted: true, value: "prepare dinner" },
    { id: 3, isCompleted: false, value: "Code test" },
  ];

  const todos = ref<Todo[]>(initialData);

  const completedTodos = computed(() =>
    todos.value.filter((todo) => todo.isCompleted)
  );

  const unCompletedTodos = computed(() =>
    todos.value.filter((todo) => !todo.isCompleted)
  );

  const addTodo = (todo: Todo) => todos.value.push(todo);

  const editTodo = (todo: Todo) => {
    todos.value[todos.value.findIndex((t) => t.id === todo.id)] = todo;
  };

  const deleteTodo = (id: Todo["id"]) => {
    todos.value = todos.value.filter((item) => id !== item.id);
  };

  return {
    todos,
    addTodo,
    editTodo,
    deleteTodo,
    completedTodos,
    unCompletedTodos,
  };
});
