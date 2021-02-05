import api from "./api";

export async function getDataApi(url) {
  const response = await api.get(url);
  return response.data;
}

export async function registerForm(url, form = {}) {
  const response = await api.post(url, form);
  return response.data;
}

export async function updateProduct(id, product = {}) {
  const response = await api.put(`products/${id}`, product);
  return response.data;
}
