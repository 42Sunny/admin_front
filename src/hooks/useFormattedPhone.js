export const useFormattedPhone = (rawPhone) => {
  if (rawPhone === "00000000000") return "";
  return `${rawPhone.slice(0, 3)}-${rawPhone.slice(3, 7)}-${rawPhone.slice(7)}`;
};
