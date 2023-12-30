<script setup lang="tsx">
import ListItem from "../components/ListItem/index.vue";
import { useTodoStore } from "../store/todoStore";
import { useModalStore } from "../store/modalStore/index";

const todoStore = useTodoStore();
const modalStore = useModalStore();
const { todos } = storeToRefs(todoStore);
const { isOpen } = storeToRefs(modalStore);

const AddButton = () => (
  <button onClick={modalStore.toggleIsOpen}>Add new task</button>
);
const TodoListJSX = () => (
  <ul>
    {todos.value.map((todo) => (
      <ListItem todo={todo} key={todo.id} />
    ))}
  </ul>
);
</script>

<template>
  <TheTitle />

  <AddButton />
  <TodoListJSX />
  <TheModal v-if="isOpen" />
</template>
../store
