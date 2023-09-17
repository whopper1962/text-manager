import { isAxiosError, type AxiosError } from "axios";
import { router } from "@/router";
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
    router.push({
      name: "UsersLogin",
    });
  }
  return Promise.reject(error);
};
