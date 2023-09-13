import { isAxiosError, type AxiosError } from "axios";
import { useToastHelper } from "@/helpers/toastHelper";

const { showErrorToast } = useToastHelper();

export const onErrorResponse = (
  error: AxiosError | Error,
): Promise<AxiosError> => {
  if (import.meta.env.MODE === "development") {
    console.error(error);
  }
  if (!isAxiosError(error)) return Promise.reject(error);

  if (error.response?.status === 401) {
    showErrorToast("Your login session has expired. Please log in again.");
  }
  return Promise.reject(error);
};
