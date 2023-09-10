import { useToast, POSITION, TYPE } from "vue-toastification";

const TIMEOUT = 3000;
const PAUSE_ON_HOVER = false;
const CLOSE_BUTTON = false;
const toast = useToast();

export const useToastHelper = () => {
  const showErrorToast = (
    toastMessage: string = "Somehting went wrong.",
  ): void => {
    toast(toastMessage, {
      type: TYPE.ERROR,
      position: POSITION.TOP_RIGHT,
      timeout: TIMEOUT,
      pauseOnHover: PAUSE_ON_HOVER,
      closeButton: CLOSE_BUTTON,
    });
  };
  const showSuccessToast = (toastMessage: string = "Success"): void => {
    toast(toastMessage, {
      type: TYPE.SUCCESS,
      position: POSITION.TOP_RIGHT,
      timeout: TIMEOUT,
      pauseOnHover: PAUSE_ON_HOVER,
      closeButton: CLOSE_BUTTON,
    });
  };
  return {
    showErrorToast,
    showSuccessToast,
  };
};
