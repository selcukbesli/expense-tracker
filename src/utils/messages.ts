import { message } from "antd";

export const showError = (errorMessage: string) => {
  message.error(errorMessage);
};

export const showSuccess = (successMessage: string) => {
  message.success(successMessage);
};
