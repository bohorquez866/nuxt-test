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

    <button onClick={handleDelete}>
      <Icon name="material-symbols-light:delete-outline" />
    </button>
  </li>
);
</script>

<template>
  <Item />
</template>

<style lang="scss">
@import "../../assets/scss/vars.scss";

.is-completed {
  text-decoration: line-through;
}

.item {
  list-style: none;
  box-shadow: $box-shadow;
  border-radius: 15px;
  display: flex;
  justify-content: space-between;
  padding-right: 10px;
  min-width: $global-min-width;
  margin-bottom: 15px;
  &:hover {
    box-shadow: -5px -1px 13px -3px $green-light;
  }

  & > label {
    padding: 10px 0px 10px 20px;
    display: flex;
    align-items: center;
    flex-basis: 100%;
    cursor: pointer;
    & input {
      margin-right: 10px;
      display: none;
    }
  }
}
</style>
