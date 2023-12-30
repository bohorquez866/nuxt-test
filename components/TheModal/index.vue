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

const Modal = () => (
  <section class="modal-overlay">
    <div class="modal">
      <section>
        <input
          class={"input"}
          type="text"
          value={taskText.value}
          onChange={updateText}
          placeholder="type your task"
        />

        <button class={"btn"} onClick={handleSubmit}>
          add
        </button>
      </section>
    </div>
    <div class="close" onClick={modalStore.toggleIsOpen}>
      close
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
$green: #0df98b;

.modal-overlay {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #000000da;
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

  & .input {
    border: 1px solid $green;
    border-radius: 10px;
    padding: 7px 10px;
    color: #5c5858;
    width: 100%;
  }
  & .close {
    margin: 10% 0 0 16px;
    cursor: pointer;
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
}
</style>
