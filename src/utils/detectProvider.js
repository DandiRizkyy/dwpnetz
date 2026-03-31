export const detectProvider = (phone) => {
  if (!phone) return "";

  const prefix = phone.slice(0, 4);

  const mapping = {
    "0851": "Telkomsel",
    "0878": "XL",
  };

  return mapping[prefix] || "Tidak diketahui";
};
