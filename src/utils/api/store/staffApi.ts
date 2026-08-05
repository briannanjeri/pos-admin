import api from "../axiosInstance";
import { StaffMember, StaffListResponse,PublicStaffListResponse} from "@/types/tenant";

export const getStaffList = async (page = 1): Promise<StaffListResponse> => {
  const res = await api.get(`/tenants/store/staff/list/?page=${page}`);
  return res.data;
};
export const staffLogin = async (payload: {
  username: string;
  password: string;
}) => {
  const res = await api.post("/tenants/store/staff-login/", payload);
  return res.data;
};
export const getPublicStaffList = async (
  tenantId: number,
): Promise<PublicStaffListResponse> => {
  const res = await api.get(`tenants/store/staff/public-list/?tenant_id=${tenantId}`);
  console.log('pos-data',res.data)
  return res.data;
};