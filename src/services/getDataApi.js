import { URL_API } from "./api";

export async function getDataApi(url) {
  const apiData = await fetch(`${URL_API}${url}`).then((response) =>
    response.json().then((data) => data)
  );

  return apiData;
}

export async function registerForm(page, form) {
  const formJson = JSON.stringify(form);
  const options = {
    method: "post",
    body: formJson,
    headers: { "content-type": "application/json" },
  };

  const response = await fetch(URL_API + page, options).then((response) =>
    response.json().then((data) => data)
  );

  return response;
}

export async function updateScore(id, product = {}) {
  const options = {
    method: "put",
    body: JSON.stringify(product),
    headers: { "content-type": "application/json" },
  };

  const result = await fetch(
    URL_API + "products/" + id,
    options
  ).then((response) => response.json().then((data) => data));

  return result;
}
