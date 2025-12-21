import axios from "axios";
import type { ValidationErrorResponse } from "@/types/postType";

export const getErrorMessage = (error: unknown): string => {
  if (axios.isAxiosError<ValidationErrorResponse>(error)) {
    const data = error.response?.data;

    const validationMessage =
      data?.message?.properties &&
      Object.values(data.message.properties)[0]?.errors?.[0];

    return (
      validationMessage ||
      data?.message?.error ||
      error.response?.statusText ||
      "Something went wrong"
    );
  }

  if (error instanceof Error) {
    return error.message;
  }

  return "Something went wrong";
};
