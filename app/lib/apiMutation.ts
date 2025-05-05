import { REQUEST_METHODS, type ApiMutationArgs } from "~/types/apiQueries";

export default function apiMutation(args: ApiMutationArgs) {
  const { onSuccess, onError } = args;

  const mutationFn = async () => {
    const res = await apiMutationFn(args);
    try {
      if (!res.ok) throw new Error(res.statusText);

      const data = await res.json();

      if (onSuccess) {
        onSuccess.forEach((callback) => {
          callback(data);
        });
      }
      return data;
    } catch (e) {
      const errorResponse = await res.json();

      if (onError) {
        onError.forEach((callback) => {
          callback(e, errorResponse, res.status);
        });
      }
      return e;
    }
  };

  return mutationFn;
}

export const apiMutationFn = (args: ApiMutationArgs) =>
  fetch(
    args.url +
      (args.data && Object.keys(args.data).length > 0
        ? `?${new URLSearchParams(args.data)}`
        : ""),
    {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      method: args.method || REQUEST_METHODS.POST,
      body: JSON.stringify(args.body),
    },
  );
