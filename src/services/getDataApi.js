import api from "./api";

export async function getDataApi() {
  const response = await api.get("products");
  return response.data;
}

export async function registerForm(form = {}) {
  const response = await api.post("contact", form);
  console.log(response.data)
  return response.data;
}

export async function updateScore(id, product = {}) {
  const response = await api.put(`products/${id}`, product);
  return response.data;
}
