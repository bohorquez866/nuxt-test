<script lang="tsx" setup>
import { useModalStore } from "~/store/modalStore";
import { generateUUID } from "../../utils/uidGenerator";

const modalStore = useModalStore();
const todoStore = useTodoStore();
const taskText = ref<string>("");

const updateText = useDebounceFn((payload: Event) => {
  taskText.value = (payload.target as HTMLInputElement).value;
}, 500);

const handleSubmit = () => {
  todoStore.addTodo({
    value: taskText.value,
    isCompleted: false,
    id: generateUUID(),
  });

  modalStore.toggleIsOpen();
};

const handleToggleModal = (e: Event) => {
  const className = (e.target as HTMLElement).className;
  const hasClasses = ["modal-overlay", "close"].includes(className);
  e.stopPropagation();

  if (hasClasses) {
    modalStore.toggleIsOpen();
  }
};

const Modal = () => (
  <section class="modal-overlay" onClick={handleToggleModal}>
    <div class="modal">
      <section>
        <input
          class={"input"}
          type="text"
          value={taskText.value}
          onInput={updateText}
          placeholder="type your task"
        />

        <button
          disabled={!taskText.value.length}
          onClick={handleSubmit}
          class={"btn"}
        >
          <span>Add Task</span>
        </button>
      </section>

      <div class="close" onClick={handleToggleModal}>
        <Icon name="material-symbols:close" />
      </div>
    </div>
  </section>
);
</script>

<template>
  <Teleport to="body">
    <Modal />
  </Teleport>
</template>

<style lang="scss">
@import "../../assets/scss/vars.scss";

.modal-overlay {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #00000088;
}

.modal {
  text-align: center;
  background-color: white;
  display: flex;
  align-items: center;
  height: 200px;
  width: 300px;
  margin-top: 10%;
  padding: 60px 20px;
  border-radius: 20px;
  position: relative;

  & .input {
    border: 1px solid $green;
    border-radius: 10px;
    padding: 7px 10px;
    color: #5c5858;
    width: 100%;
  }
  & .close {
    position: absolute;
    right: 10px;
    top: 10px;
    color: black;
    cursor: pointer;
    & svg {
      pointer-events: none;
    }
  }

  & h6 {
    font-weight: 500;
    font-size: 28px;
    margin: 20px 0;
  }

  & p {
    font-size: 16px;
    margin: 20px 0;
  }
}

.btn {
  background-color: $green;
  width: 150px;
  height: 40px;
  color: white;
  font-size: 14px;
  border-radius: 16px;
  margin-top: 50px;
  &:disabled {
    background-color: #5c5858;
  }
}
</style>
