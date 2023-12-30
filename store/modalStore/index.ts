export const useModalStore = defineStore("modal", () => {
  const isOpen = ref<boolean>(false);
  const toggleIsOpen = () => (isOpen.value = !isOpen.value);

  return { isOpen, toggleIsOpen };
});
