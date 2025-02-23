import type { ApiQueryProps } from "~/types/apiQueries";

export const apiQuery = (args: ApiQueryProps) => () => {
  return fetch(
    args.url +
      (args.data && Object.keys(args.data).length > 0
        ? `?${new URLSearchParams(args.data)}`
        : ""),
    {
      headers: {},
      signal: args.signal,
    }
  )
    .then((res) => res.json())
    .then((data) => {
      if (args.onSuccess) {
        args.onSuccess.forEach((callback) => {
          callback(data);
        });
      }
      return data;
    })
    .catch((e) => {
      if (args.onError) {
        args.onError.forEach((callback) => {
          callback(e);
        });
      }
    });
};
