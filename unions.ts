export interface Success<T> {
  _type: "ok";
  value: Readonly<T>;
}

export interface AuthError {
  _type: "unauthorized";
}

export interface ApiError {
  _type: "apiError";
  error: ErrorContract;
}

export interface OtherError {
  _type: "other";
}

export interface ErrorContract {
  code: string;
  message: string;
}

export type HttpError = AuthError | ApiError | OtherError;

export type HttpResponse<T> = Success<T> | HttpError;

// ---------------

async function makeRequest<T>(
  method: "get" | "post" | "put",
  path: string
): Promise<HttpResponse<T>> {
  try {
    const response = await fetch(path, {
      method: method,
    });

    return parseResponse(response);
  } catch {
    return { _type: "other" };
  }
}

async function parseResponse<T>(response: Response): Promise<HttpResponse<T>> {
  if (response.ok) {
    return { _type: "ok", value: (await response.json()) as T };
  } else if (response.status === 403) {
    return { _type: "unauthorized" };
  } else if (response.status === 422) {
    return {
      _type: "apiError",
      error: (await response.json()) as ErrorContract,
    };
  } else {
    return { _type: "other" };
  }
}

// Problem: working with the discriminated union
const result = await makeRequest("get", "https://betterask.erni");

// Solution: type narrowing
export async function handleHttpResponse<T>(
  apiCall: Promise<HttpResponse<T>>,
  success: (val: T) => void,
  error: (err: HttpError) => void
) {
  const res = await apiCall;
  if (res._type === "ok") {
    success(res.value);
  } else {
    error(res);
  }
}

// API designed in a way that forces us to handle all cases
handleHttpResponse(
  makeRequest<string>("get", "https://betterask.erni"),
  (value) => console.info(value),
  (e) => console.error(e)
);
