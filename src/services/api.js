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
