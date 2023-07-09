export type SendRequestProps = {
  url: string;
  method: string;
  body: string;
  headers?: HeadersInit;
};

const apiCall = (input: RequestInfo | URL, init?: RequestInit) => {
  const options = {
    headers: new Headers({
      'content-type': 'application/json',
      ...init?.headers,
    }),
    ...init,
  };

  return fetch(input, options).then((res) => {
    if (res.ok) {
      return res.json();
    }

    throw new Error(`${res.status} ${res.statusText}`);
  });
};

export { apiCall };
