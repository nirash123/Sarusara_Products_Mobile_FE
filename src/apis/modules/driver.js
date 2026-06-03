import api from '../axios';

export default {

  getDrivers: (
    filterQuery,
    page,
    paginate,
    sort = "",
    desc = true,
    admin_role,
  ) =>
    api.get(
      `admin/drivers?page=${page}&paginate=${paginate}&sort=${desc ? "" : "-"}${sort}&admin_role=${admin_role}&${filterQuery}`
    ),

  getDriverDetails: (id, payload) => api.get(`admin/drivers/${id}`, payload),
  driverCreate: (payload) => api.post('admin/drivers/create', payload),
  driverUpdate: (id, payload) => api.put(`admin/drivers/update/${id}`, payload),
  driverData: () => api.get('/admin/drivers/data'),

  getLorrys: (
    filterQuery,
    page,
    paginate,
    sort = "",
    desc = true,
    lorry_number,
  ) =>
    api.get(
      `admin/lorrys?page=${page}&paginate=${paginate}&sort=${desc ? "" : "-"}${sort}&lorry_number=${lorry_number}&${filterQuery}`
    ),

    getCompanyLorrys: (
    filterQuery,
    page,
    paginate,
    sort = "",
    desc = true,
    lorry_number,
  ) =>
    api.get(
      `admin/lorrys/company?page=${page}&paginate=${paginate}&sort=${desc ? "" : "-"}${sort}&lorry_number=${lorry_number}&${filterQuery}`
    ),

   getExternalLorrys: (
    filterQuery,
    page,
    paginate,
    sort = "",
    desc = true,
  ) =>
    api.get(
      `admin/lorrys/external?page=${page}&paginate=${paginate}&sort=${desc ? "" : "-"}${sort}&${filterQuery}`
    ),



   getSupplierLorrys: (
    id,
    filterQuery,
    page,
    paginate,
    sort = "",
    desc = true,
    lorry_number,
  ) =>
    api.get(
      `admin/lorrys/supplier/${id}?page=${page}&paginate=${paginate}&sort=${desc ? "" : "-"}${sort}&lorry_number=${lorry_number}&${filterQuery}`
    ),

  getLorryDetails: (id, payload) => api.get(`admin/lorrys/${id}`, payload),
  getCompanyLorryDetails: (id, payload) => api.get(`admin/lorrys/company/${id}`, payload),
  lorryCreate: (payload) => api.post('admin/lorrys/create', payload),
  lorryOwnCreate: (payload) => api.post('admin/lorrys/own/create', payload),
  lorryUpdate: (id, payload) => api.put(`admin/lorrys/update/${id}`, payload),
  lorryDelete: (id) => api.delete(`admin/lorrys/delete/${id}`),
  lorryData: () => api.get('/admin/lorrys/data'),
  lorryOnlyData: () => api.get('/admin/lorrys/onlydata'),
  supplierLorryOnlyData: () => api.get('/admin/lorrys/supplierOnlydata'),
  lorrySmsData: () => api.get('/admin/lorrys/smsdata'),

  supplierdata: () => api.get('/admin/lorrys/supplierdata'),

  
  supplierCompanydata: () => api.get('/admin/lorrys/suppliercompanydata'),

  getSmss: (
    filterQuery,
    page,
    paginate,
    sort = "",
    desc = true,
    lorry_number,
  ) =>
    api.get(
      `admin/smss?page=${page}&paginate=${paginate}&sort=${desc ? "" : "-"}${sort}&lorry_number=${lorry_number}&${filterQuery}`
    ),

    
    getDashboardSmss: () => api.get('/admin/smss/dashboard'),

    smsCreate: (payload) => api.post('admin/smss/create', payload),
    smsDelete: (id) => api.delete(`admin/smss/delete/${id}`),

    
  getLorryDrivers: (
    filterQuery,
    page,
    paginate,
    sort = "",
    desc = true,
  ) =>
    api.get(
      `admin/lorry-drivers?page=${page}&paginate=${paginate}&sort=${desc ? "" : "-"}${sort}&${filterQuery}`
    ),
    getLorryDriverDetails: (id, payload) => api.get(`admin/lorry-drivers/${id}`, payload),
    lorryDriverCreate: (payload) => api.post('admin/lorry-drivers/create', payload),
    lorryDriverDelete: (id) => api.delete(`admin/lorry-drivers/delete/${id}`),
}
