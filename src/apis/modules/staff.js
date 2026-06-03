import api from '../axios';

export default {

  getStaffs: (
    filterQuery,
    page,
    paginate,
    sort = "",
    desc = true,
    admin_role,
  ) =>
    api.get(
      `admin/staffs?page=${page}&paginate=${paginate}&sort=${desc ? "" : "-"}${sort}&admin_role=${admin_role}&${filterQuery}`
    ),

  getStaffDetails: (id, payload) => api.get(`admin/staffs/${id}`, payload),
  staffCreate: (payload) => api.post('admin/staffs/create', payload),
  staffUpdate: (id, payload) => api.put(`admin/staffs/update/${id}`, payload),
  staffDelete: (id) => api.delete(`admin/staffs/delete/${id}`),

  getStaffLoans: (
    filterQuery,
    page,
    paginate,
    sort = "",
    desc = true,
    admin_role,
  ) =>
    api.get(
      `admin/staffs/loan?page=${page}&paginate=${paginate}&sort=${desc ? "" : "-"}${sort}&admin_role=${admin_role}&${filterQuery}`
    ),
}
