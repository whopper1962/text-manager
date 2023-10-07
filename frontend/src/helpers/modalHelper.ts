import { Modal } from "flowbite";

export const useModalHelper = () => {
  const showModal = (modalId: string) => {
    const $targetEl = document.getElementById(modalId);
    const modal = new Modal($targetEl);
    modal.show();
  };

  const hideModal = (modalId: string) => {
    const $targetEl = document.getElementById(modalId);
    const modal = new Modal($targetEl);
    modal.hide();
  };

  return {
    showModal,
    hideModal,
  };
};
