import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:3000",
});

export const loginUser = async (email) => {
  const res = await API.get(`/users?email=${email}`);
  if (!res) return [];
  return res.data[0];
};

export const getPackages = async () => {
  const res = await API.get("/packages");
  if (!res) return [];
  return res.data;
};

export const updateUser = async (id, data) => {
  const res = await API.patch(`/users/${id}`, data);
  if (!res) return [];
  return res.data;
};

export const createTransaction = async (data) => {
  const res = await API.post("/transactions", data);
  if (!res) return [];
  return res.data;
};

export const getTransactions = async () => {
  const res = await API.get("/transactions");
  if (!res) return [];
  return res.data;
};
