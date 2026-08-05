import api from "../axiosInstance";

export const registerStaff = async (payload) => {
  const res = await api.post("tenants/store/staff/", payload);
  return res.data;
};
export const getStaffRoles = async () => {
  const res = await api.get("tenants/store/staff/roles/");
  return res.data; // { roles: [...], permissions: [...] }
};