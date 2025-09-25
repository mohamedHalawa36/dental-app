import { messages } from "~/API/messages";
import { ApiError } from "~/API/supabase";

export const throwInvalidCredentialsError = () => {
  const { invalidCredentials } = messages.error.auth;

  throw new ApiError(invalidCredentials, 400, "invalid_credentials");
};
