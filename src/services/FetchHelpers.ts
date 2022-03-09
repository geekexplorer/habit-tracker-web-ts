import { FETCH_TIMEOUT_SEC } from "../config/constants.js";

const timeout = function (s: number) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`The request timed out after ${s} seconds`));
    }, s * 1000);
  });
};

enum Verbs {
  GET = "GET",
  POST = "POST",
  PUT = "PUT",
  DELETE = "DELETE",
}

const HEADERS = {
  "Content-Type": "application/json",
};

export const REST = {
  Get: async function <T>(url: string): Promise<T> {
    try {
      const fetchPromise = fetch(url, { cache: "no-cache" });
      const response = (await Promise.race([fetchPromise, timeout(FETCH_TIMEOUT_SEC)])) as any;

      const data = (await response.json()) as T;

      if (!response.ok) {
        throw Error(`${response.message} (${response.statusCode})`);
      }

      return data;
    } catch (err) {
      throw err;
    }
  },

  Post: async function <T>(url: string, uploadData: any): Promise<T> {
    try {
      const fetchPromise = fetch(url, {
        method: Verbs.POST,
        headers: HEADERS,
        body: JSON.stringify(uploadData),
        cache: "no-cache",
      });

      const response = (await Promise.race([fetchPromise, timeout(FETCH_TIMEOUT_SEC)])) as any;
      const data = (await response.json()) as T;

      if (!response.ok) {
        throw new Error(`${response.message} (${response.status})`);
      }

      return data;
    } catch (err) {
      throw err;
    }
  },

  Put: async function (url: string, uploadData: any) {
    if (!uploadData) return;
    try {
      const fetchPromise = fetch(url, {
        method: Verbs.PUT,
        headers: HEADERS,
        body: JSON.stringify(uploadData),
      });

      const response = (await Promise.race([fetchPromise, timeout(FETCH_TIMEOUT_SEC)])) as any;

      if (!response.ok) {
        throw new Error(`(${response.status}) ${response.statusText}`);
      }
    } catch (err) {
      throw err;
    }
  },

  Delete: async function (url: string) {
    try {
      const fetchPromise = fetch(url, {
        method: Verbs.DELETE,
        headers: HEADERS,
      });

      const response = (await Promise.race([fetchPromise, timeout(FETCH_TIMEOUT_SEC)])) as any;

      if (!response.ok) {
        throw new Error(`(${response.status}) ${response.statusText}`);
      }
    } catch (err) {
      throw err;
    }
  },
};
