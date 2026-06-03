import api from '../axios';

export default {

  getShops: (
    filterQuery,
    page,
    paginate,
    sort = "",
    desc = true,
    active_status,
  ) =>
    api.get(
      `admin/shops?page=${page}&paginate=${paginate}&sort=${ desc ? "" : "-"}${sort}&active_status=${active_status}&${filterQuery}`
    ),
    
     shopsData: (payload) => api.get(`admin/shopsdata`, payload),

    getShopDetails: (id,payload) => api.get(`admin/shops/${id}`, payload),
    shopCreate: (payload) => api.post('admin/shops/create', payload),
    shopUpdate: (id,payload) => api.put(`admin/shops/update/${id}`, payload),
    shopDelete: (id) => api.delete(`admin/shops/delete/${id}`),

}