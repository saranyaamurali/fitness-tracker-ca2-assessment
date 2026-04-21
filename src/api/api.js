import axios from "axios";

const BASE_URL = "https://t4e-testserver.onrender.com/api";

export const getToken = async (studentId, password, set) => {
  const { data } = await axios.post(`${BASE_URL}/public/token`, {
    studentId,
    password,
    set,
  });
  return data;
};

export const getDataset = async (token, dataUrl) => {
  const { data } = await axios.get(`${BASE_URL}${dataUrl}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (Array.isArray(data)) return data;
  if (Array.isArray(data?.data)) return data.data;
  if (Array.isArray(data?.activities)) return data.activities;
  if (Array.isArray(data?.data?.activities)) return data.data.activities;
  return [];
};