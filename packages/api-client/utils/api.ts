export type SendRequestProps = {
  url: string;
  method: string;
  body: string;
  headers?: HeadersInit;
};

const apiCall = (input: RequestInfo | URL, init?: RequestInit) => {
  const options: RequestInit = {
    headers: new Headers({
      'content-type': 'application/json',
      ...init?.headers,
    }),
    credentials: 'same-origin',
    ...init,
  };

  console.log({ input, options });

  return fetch(input, options).then((res) => {
    if (res.ok) {
      return res.json();
    }

    throw new Error(`${res.status} ${res.statusText}`);
  });
};

export { apiCall };
