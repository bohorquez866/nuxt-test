<script setup lang="tsx">
import ListItem from "../components/ListItem/index.vue";
import { useTodoStore } from "../store/todoStore";
import { useModalStore } from "../store/modalStore/index";

const todoStore = useTodoStore();
const modalStore = useModalStore();
const { todos } = storeToRefs(todoStore);
const { isOpen } = storeToRefs(modalStore);

const AddButton = () => (
  <button onClick={modalStore.toggleIsOpen} class={"btn-add"}>
    <Icon name="system-uicons:write" />
  </button>
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
  <main class="main">
    <TheTitle />
    <AddButton />
    <TodoListJSX />
    <TheModal v-if="isOpen" />
  </main>
</template>

<style lang="scss">
@import ".././assets/scss/vars.scss";
.btn-add {
  padding: 5px;
  border-radius: 100px;
  background-color: $green-dark;
  margin-bottom: 20px;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: auto;
  box-shadow: -1px 0px 10px 2px $green-dark;

  &:hover {
    background-color: darken($green-dark, 0.5);
  }

  & > * {
    width: 20px;
    height: 20px;
  }
}

*,
*::after,
*::before {
  transition: all 0.2s ease-in-out;
}
.main {
  display: flex;
  align-items: center;
  flex-direction: column;
  width: fit-content;
  margin: 5% auto;
  min-width: $global-min-width;
}
</style>
