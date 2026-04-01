import { PREFIX_PROVIDER } from "@/constants/constant";

export const detectProvider = (phone) => {
  if (!phone) return "";
  const cleanedInput = phone.replace(/[\s\-().]/g, "");
  const normalizedInput = cleanedInput.startsWith("+62")
    ? "0" + cleanedInput.slice(3)
    : cleanedInput.startsWith("62")
      ? "0" + cleanedInput.slice(2)
      : cleanedInput;
  const prefix = normalizedInput.slice(0, 4);
  return PREFIX_PROVIDER[prefix] || "Tidak diketahui";
};
