import { URL_API } from "./api";

export async function getDataApi(url) {
  const apiData = await fetch(`${URL_API}${url}`).then((response) =>
    response.json().then((data) => data)
  );

  return apiData;
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

export async function getScore(id, product) {
  //const proxyurl = "https://cors-anywhere.herokuapp.com/";
  const options = {
    method: "put",
    body: JSON.stringify({
     // id: id,

      score: product.score,
    }),
    headers: { "content-type": "application/json" },
  };

  const response = await fetch(
    URL_API + "products/" + id,
    options
  ).then((response) => response.json().then((data) => data));

  return response;
}
