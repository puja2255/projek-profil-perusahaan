let authToken = "";

export function getAuthToken() {
  if (authToken) {
    return authToken;
  }

  if (typeof window !== "undefined") {
    authToken = window.localStorage.getItem("pt-golden-ib-auth-token") || "";
  }

  return authToken;
}

export function setAuthToken(token: string) {
  authToken = token;
  if (typeof window !== "undefined") {
    if (token) {
      window.localStorage.setItem("pt-golden-ib-auth-token", token);
    } else {
      window.localStorage.removeItem("pt-golden-ib-auth-token");
    }
  }
}
