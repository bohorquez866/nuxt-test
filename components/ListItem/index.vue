<script lang="tsx" setup>
import type { ListItemProps } from "./listItems";
import { useTodoStore } from "../../store/todoStore";

const todoStore = useTodoStore();
const props = defineProps<ListItemProps>();
const { todos } = storeToRefs(todoStore);

const foundTodo = computed(() => {
  const index = todos.value.findIndex((i) => i.id === props.todo.id);
  return todos.value[index];
});

const isCompletedStyles = computed(() => ({
  textDecoration: foundTodo.value?.isCompleted ? "line-through" : "",
}));

const handleCheckboxChange = (event: Event) => {
  const isCompleted = (event.target as HTMLInputElement).checked;
  todoStore.editTodo({
    id: props.todo.id as string,
    isCompleted,
    value: props.todo.value,
  });
};

const handleDelete = () => todoStore.deleteTodo(foundTodo.value.id);

const Item = () => (
  <li class={"item"} id={`todo-${props.todo.id}`}>
    <label class={"label"}>
      <input
        name="todo"
        type="checkbox"
        checked={foundTodo.value.isCompleted}
        onInput={handleCheckboxChange}
      />
      <p style={isCompletedStyles.value}>{props.todo.value}</p>
    </label>

    <div class={"actions"}>
      <button onClick={handleDelete}>delete</button>
    </div>
  </li>
);
</script>

<template>
  <Item />
</template>

<style lang="scss">
.is-completed {
  text-decoration: line-through;
}

.item {
  list-style: none;
  & > label {
    display: flex;
    align-items: center;
  }
}
</style>
../../store
