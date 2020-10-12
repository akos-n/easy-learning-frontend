import history from "./HistoryService";

class AuthUser {
  constructor(id, username) {
    this.id = id;
    this.username = username;
  }
}

function getCurrentUser() {
  return JSON.parse(localStorage.getItem("EasyLearningCurrentUser"));
}

function setCurrentUser(user) {
  localStorage.setItem("EasyLearningCurrentUser", JSON.stringify(user));
}

function logout() {
  setCurrentUser(null);
  history.push("/");
}

async function login(username, password) {
  if (password === "" || username === "") return;
  let response = await fetch(
    "https://easy-learning-server.herokuapp.com/users/login/",
    {
      method: "POST",
      headers: {
        "Access-Control-Allow-Origin":
          "https://easy-learning-server.herokuapp.com/",
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: username,
        password: password,
      }),
    }
  );
  let res = JSON.parse(await response.json());
  if (res.success) {
    setCurrentUser(new AuthUser(res.id, res.username));
  } else {
    alert(res.err);
  }
  return res;
}

async function sendDatas(email) {
  let response = await fetch(
    "https://easy-learning-server.herokuapp.com/users/forgotten-datas/",
    {
      method: "POST",
      headers: {
        "Access-Control-Allow-Origin":
          "https://easy-learning-server.herokuapp.com/",
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
      }),
    }
  );
  let res = JSON.parse(await response.json());
  if (res.success) {
    return true;
  } else {
    alert(res.err);
    return false;
  }
}

async function register(username, email, password) {
  let response = await fetch(
    "https://easy-learning-server.herokuapp.com/users/register/",
    {
      method: "POST",
      headers: {
        "Access-Control-Allow-Origin":
          "https://easy-learning-server.herokuapp.com/",
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: username,
        email: email,
        password: password,
      }),
    }
  );
  let res = JSON.parse(await response.json());
  if (res.success) {
    return true;
  } else {
    alert(res.err);
    return false;
  }
}
async function updatePassword(oldPassword, newPassword) {
  const currentUser = getCurrentUser();
  let response = await fetch(
    "https://easy-learning-server.herokuapp.com/users/update-password/",
    {
      method: "POST",
      headers: {
        "Access-Control-Allow-Origin":
          "https://easy-learning-server.herokuapp.com/",
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId: currentUser.id,
        username: currentUser.username,
        oldPassword: oldPassword,
        newPassword: newPassword,
      }),
    }
  );
  const res = JSON.parse(await response.json());
  if (res.success) {
    return true;
  } else {
    alert(res.err);
    return false;
  }
}

const AuthService = {
  register: register,
  login: login,
  sendDatas: sendDatas,
  updatePassword: updatePassword,
  logout: logout,
  getCurrentUser: getCurrentUser,
  AuthUser: AuthUser,
};

export { AuthService as default };
