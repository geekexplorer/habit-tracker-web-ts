var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { FETCH_TIMEOUT_SEC } from "../config/constants.js";
const timeout = function (s) {
    return new Promise(function (_, reject) {
        setTimeout(function () {
            reject(new Error(`The request timed out after ${s} seconds`));
        }, s * 1000);
    });
};
var Verbs;
(function (Verbs) {
    Verbs["GET"] = "GET";
    Verbs["POST"] = "POST";
    Verbs["PUT"] = "PUT";
    Verbs["DELETE"] = "DELETE";
})(Verbs || (Verbs = {}));
const HEADERS = {
    "Content-Type": "application/json",
};
export const REST = {
    Get: function (url) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const fetchPromise = fetch(url, { cache: "no-cache" });
                const response = (yield Promise.race([fetchPromise, timeout(FETCH_TIMEOUT_SEC)]));
                const data = (yield response.json());
                if (!response.ok) {
                    throw Error(`${response.message} (${response.statusCode})`);
                }
                return data;
            }
            catch (err) {
                throw err;
            }
        });
    },
    Post: function (url, uploadData) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const fetchPromise = fetch(url, {
                    method: Verbs.POST,
                    headers: HEADERS,
                    body: JSON.stringify(uploadData),
                    cache: "no-cache",
                });
                const response = (yield Promise.race([fetchPromise, timeout(FETCH_TIMEOUT_SEC)]));
                const data = (yield response.json());
                if (!response.ok) {
                    throw new Error(`${response.message} (${response.status})`);
                }
                return data;
            }
            catch (err) {
                throw err;
            }
        });
    },
    Put: function (url, uploadData) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!uploadData)
                return;
            try {
                const fetchPromise = fetch(url, {
                    method: Verbs.PUT,
                    headers: HEADERS,
                    body: JSON.stringify(uploadData),
                });
                const response = (yield Promise.race([fetchPromise, timeout(FETCH_TIMEOUT_SEC)]));
                if (!response.ok) {
                    throw new Error(`(${response.status}) ${response.statusText}`);
                }
            }
            catch (err) {
                throw err;
            }
        });
    },
    Delete: function (url) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const fetchPromise = fetch(url, {
                    method: Verbs.DELETE,
                    headers: HEADERS,
                });
                const response = (yield Promise.race([fetchPromise, timeout(FETCH_TIMEOUT_SEC)]));
                if (!response.ok) {
                    throw new Error(`(${response.status}) ${response.statusText}`);
                }
            }
            catch (err) {
                throw err;
            }
        });
    },
};
//# sourceMappingURL=FetchHelpers.js.map