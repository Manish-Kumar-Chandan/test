import axios from "axios";

export function getCookie(cname) {
  let name = cname + "=";
  let decodedCookie = decodeURIComponent(document.cookie);
  let ca = decodedCookie.split(";");
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) === " ") {
      c = c.substring(1);
    }
    if (c.indexOf(name) === 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}

export function auth() {
  const token = getCookie("hashToken");
  console.log('token.....', token)
  const req = axios
    .get("/api/auth", { token })
    .then((resp) => {
      return resp.data;
    })
    .catch(console.error());

  return {
    type: "AUTH_CHECK",
    payload: req,
  };
  // return {
  //   type: "AUTH_CHECK",
  //   payload: req
  // };
}

export function fetchUsers() {
  const req = axios
    .get("/api/users", {
      headers: { "x-api-key": "CWxR7vELQJaFD15TV4RR2aGehFUKSBf78vdeiyc4" },
    })
    .then((resp) => resp.data)
    .catch(console.error());
  return {
    type: "LIST_USERS",
    payload: req,
  };
}

export function loginUser(username, password) {
  const req = axios
    .post("/api/login", { username, password })
    .then((resp) => {
      if (resp.data.isAuth) document.cookie = `hashToken=${resp.data.token}`;

      return resp.data;
    })
    .catch(console.error());
  return {
    type: "USER_LOGIN",
    payload: req,
  };
}

export function clearLoginUser() {
  return {
    type: "USER_LOGIN_CLEAN",
    payload: {},
  };
}

export function logout() {
  const req = axios
    .get("/api/logout", {})
    .then((resp) => resp.data)
    .catch(console.error());

  return {
    type: "USER_lOGOUT",
    payload: req,
  };
}

export function changePassword(password) {
  const req = axios
    .post("/surveystage/changePassword", { password })
    .then((resp) => {
      return resp.data;
    })
    .catch(console.error());
  return {
    type: "CHANGE_PASSWORD",
    payload: req,
  };
}

export function deleteUser(username) {
  const req = axios
    .post("/surveystage/deleteuser", { username })
    .then((resp) => {
      return resp.data;
    })
    .catch(console.error());
  return {
    type: "DELETE_USER",
    payload: req,
  };
}
