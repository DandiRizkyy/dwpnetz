import { PREFIX_PROVIDER } from "@/constants/constant";

export const detectProvider = (phone) => {
  if (!phone) return "";

  const prefix = phone.slice(0, 4);

  return PREFIX_PROVIDER[prefix] || "Tidak diketahui";
};
