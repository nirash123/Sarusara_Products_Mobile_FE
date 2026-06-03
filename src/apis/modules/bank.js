import api from '../axios';

export default {

  getBanks: (
    filterQuery,
    page,
    paginate,
    sort = "",
    desc = true,
    active_status,
  ) =>
    api.get(
      `admin/banks?page=${page}&paginate=${paginate}&sort=${ desc ? "" : "-"}${sort}&active_status=${active_status}&${filterQuery}`
    ),

    getBankDetails: (id,payload) => api.get(`admin/banks/${id}`, payload),
    bankCreate: (payload) => api.post('admin/banks/create', payload),
    bankUpdate: (id,payload) => api.put(`admin/banks/update/${id}`, payload),
    bankDelete: (id) => api.delete(`admin/banks/delete/${id}`),

    bankData: () => api.post(`admin/banks/data`),
}
