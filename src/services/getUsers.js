import { URL_API } from "./api";

export async function getUsers() {
  const users = await fetch(`${URL_API}users`).then((response) =>
    response.json().then((data) => data)
  );

  return users;
}

export async function createUser(userForm) {
  const userFormJson = JSON.stringify(userForm);
  const options = {
    method: "post",
    body: userFormJson,
    headers: { "content-type": "application/json" },
  };

  const response = await fetch(URL_API + "users", options).then((response) =>
    response.json().then((data) => data)
  );

  return response;
}
