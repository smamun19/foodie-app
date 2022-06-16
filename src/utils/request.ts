type MethodType = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';

export const requestHandler = (
  url: RequestInfo,
  method?: MethodType,
  body?: Record<string, any>,
  token?: string,
  headers?: HeadersInit_,
) =>
  fetch(url, {
    method,
    body: body ? JSON.stringify(body) : undefined,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
      ...headers,
    },
  });
