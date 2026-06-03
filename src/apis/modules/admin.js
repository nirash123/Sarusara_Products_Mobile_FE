import api from '../axios';

export default {


  cancelZero: (payload) => api.put(`admin/set-zero`, payload),

  userData: (payload) => api.post(`admin/userdata`, payload),

  loginUserData: (payload) => api.post(`admin/loginuserdata`, payload),

  TodayDatas: (payload) => api.get(`admin/todaydata`, payload),

  TodayItems: (year, payload) => api.get(`admin/todayitem/${year}`, payload),

  getBillNumber: (payload) => api.post(`admin/bill_number`, payload),

  getOldBillNumber: (payload) => api.post(`admin/old_bill_number`, payload),

  getReturnBillNumber: (payload) => api.post(`admin/return/bill_number`, payload),

  deleteItems: (payload) => api.put(`admin/delete-items`, payload),

  deleteDates: (payload) => api.put(`admin/delete-dates`, payload),

  deleteLogins: (payload) => api.put(`admin/delete-logins`, payload),

  uploadImage: (payload) => api.post(`admin/upload-image`, payload),

  getAdminAllDashboards: (id, payload) => api.post(`admin/dashboard/all/${id}`, payload),

  uploadSupplierImage: (payload) => api.post(`admin/upload-supplier-image`, payload),

  changeStatus: (id) => api.put(`admin/change-status/${id}`),

  getCompanyOrderList: (id) => api.get(`admin/company/invoice/${id}`),
  getcompanyOrderPrintList: (id) => api.get(`admin/company/printList/${id}`),

  changeHardwareStatus: (id) => api.put(`admin/hardware/change-status/${id}`),
  getHardwareOrderList: (id) => api.get(`admin/hardware/invoice/${id}`),
  getHardwareOrderPrintList: (id) => api.get(`admin/hardware/printList/${id}`),

  getAdminDashboards: (id) => api.get(`admin/dashboard/${id}`),

  getAdminDate: (payload) => api.get(`admin/date`, payload),

  getAdminYear: (payload) => api.get(`admin/year`, payload),

  getStaffIncomes: (id, payload) => api.put(`admin/staff-income/${id}`, payload),
  getProfitIncomes: (payload) => api.put(`admin/profit-income`, payload),



  setDate: (payload) => api.put(`admin/set-date`, payload),

  setMonth: (payload) => api.put(`admin/set-month`, payload),

  setYear: (payload) => api.put(`admin/set-year`, payload),

  setOrder: (payload) => api.put(`admin/set-order`, payload),

  getToday: () => api.get(`admin/today`),

  monthData: (payload) => api.get(`admin/monthsdata`, payload),

  dateData: (payload) => api.get(`admin/datesdata`, payload),

  yearData: (payload) => api.get(`admin/yearsdata`, payload),


  getAdminDateAnalyzes: (
    filterQuery,
    page,
    paginate,
    sort = "",
    desc = true,
    date,
  ) =>
    api.get(
      `admin/date-analyze?page=${page}&paginate=${paginate}&sort=${desc ? "" : "-"}${sort}&date=${date}&${filterQuery}`
    ),


  getSuppliers: (
    filterQuery,
    page,
    paginate,
    sort = "",
    desc = true,
  ) =>
    api.get(
      `admin/suppliers?page=${page}&paginate=${paginate}&sort=${desc ? "" : "-"}${sort}&${filterQuery}`
    ),

  getAdminOrdersCount: (payload) => api.get(`admin/company/orders`, payload),

  getSupplierDetails: (id, payload) => api.get(`admin/suppliers/${id}`, payload),
  supplierCreate: (payload) => api.post('admin/suppliers/create', payload),
  supplierUpdate: (id, payload) => api.put(`admin/suppliers/update/${id}`, payload),
  supplierDelete: (id) => api.delete(`admin/suppliers/delete/${id}`),
  allSupplierdata: () => api.get('/admin/suppliers/allsupplierdata'),

  getCompanies: (
    filterQuery,
    page,
    paginate,
    sort = "",
    desc = true,
  ) =>
    api.get(
      `admin/companies?page=${page}&paginate=${paginate}&sort=${desc ? "" : "-"}${sort}&${filterQuery}`
    ),

  getAdminOrdersCount: (payload) => api.get(`admin/company/orders`, payload),

  getCompanyDetails: (id, payload) => api.get(`admin/companies/${id}`, payload),
  companyCreate: (payload) => api.post('admin/companies/create', payload),
  companyUpdate: (id, payload) => api.put(`admin/companies/update/${id}`, payload),
  companyDelete: (id) => api.delete(`admin/companies/delete/${id}`),
  companyData: () => api.get('/admin/companies/companydata'),
  companyLorryData: () => api.get('/admin/companies/lorrydata'),
  allCompanyData: () => api.get('/admin/companies/allcompanydata'),

  companyLorryCreate: (payload) => api.post('admin/lorrys/companycreate', payload),

  staffData: () => api.get('/admin/staffs/staffdata'),
  companyVehicleData: () => api.get('/admin/companies/companyVehicledata'),

  // Expenses


  expensesCategoryCreate: (payload) => api.post('admin/expenses-categories/create', payload),
  getExpensesCategories: (payload) => api.get('admin/expenses-categories', { params: payload, }),
  expensesCategoryUpdate: (id, payload) => api.put(`admin/expenses-categories/update/${id}`, payload),
  getExpensesTypesDetails: (id) => api.get(`admin/expenses-categories/${id}`),

  
  getTodayExpenses: (payload) => api.get('admin/expenses/today', { params: payload, }),
  getCompanyExpenses: (payload) => api.get('admin/expenses/company', { params: payload, }),
  getStaffExpenses: (payload) => api.get('admin/expenses/staff', { params: payload, }),
  getVehicleExpenses: (payload) => api.get('admin/expenses/vehicle', { params: payload, }),
  getOtherExpenses: (payload) => api.get('admin/expenses/other', { params: payload, }),
  expensesCreate: (payload) => api.post('admin/expenses/create', payload),
  expensesDelete: (id) => api.delete(`admin/expenses/delete/${id}`),

  
  getUserxpenses: (payload) => api.get('admin/expenses/user', { params: payload, }),

  // Loan

  loanCreate: (payload) => api.post('admin/loans/create', payload),

  getTodayLoans: (payload) => api.get('admin/loans/today', { params: payload, }),


  getSupplierLoans: (
    filterQuery,
    page,
    paginate,
    sort = "",
    desc = true,
  ) =>
    api.get(
      `admin/suppliers/loan?page=${page}&paginate=${paginate}&sort=${desc ? "" : "-"}${sort}&${filterQuery}`
    ),


  getCompanyLoans: (
    filterQuery,
    page,
    paginate,
    sort = "",
    desc = true,
  ) =>
    api.get(
      `admin/companies/loan?page=${page}&paginate=${paginate}&sort=${desc ? "" : "-"}${sort}&${filterQuery}`
    ),

  getStaffLoans: (
    filterQuery,
    page,
    paginate,
    sort = "",
    desc = true,
  ) =>
    api.get(
      `admin/staffs/loan?page=${page}&paginate=${paginate}&sort=${desc ? "" : "-"}${sort}&${filterQuery}`
    ),


  
  getExchangeOrders: (payload) => api.get('admin/exchange_items', { params: payload, }),
  submitExchangeItem: (payload) => api.post('admin/exchange_items/create', payload),
  exchangeItemDelete: (id) => api.delete(`admin/exchange_items/delete/${id}`),

}