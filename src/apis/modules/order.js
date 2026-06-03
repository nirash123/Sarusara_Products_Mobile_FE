import api from '../axios';

export default {

  // Order Purchase

  getOrders: (
    filterQuery,
    page,
    paginate,
    sort = "",
    desc = true,
  ) =>
    api.get(
      `admin/purchas-orders?page=${page}&paginate=${paginate}&sort=${desc ? "" : "-"}${sort}&${filterQuery}`
    ),

  getNewOrders: (
    filterQuery,
    page,
    paginate,
    sort = "",
    desc = true,
    lorry_number,
  ) =>
    api.get(
      `admin/purchas-orders/new?page=${page}&paginate=${paginate}&sort=${desc ? "" : "-"}${sort}&lorry_number=${lorry_number}&${filterQuery}`
    ),

  getOrderDetails: (id, payload) => api.get(`admin/purchas-orders/${id}`, payload),
  orderCreate: (payload) => api.post('admin/purchas-orders/create', payload),
  orderUpdate: (id, payload) => api.put(`admin/purchas-orders/update/${id}`, payload),
  orderData: () => api.get('/admin/purchas-orders/data'),


  getTodaySalesOrder: (
    filterQuery,
    page,
    paginate,
    sort = "",
    desc = true,
  ) =>
    api.get(
      `admin/purchas-orders/today-sales?page=${page}&paginate=${paginate}&sort=${desc ? "" : "-"}${sort}&${filterQuery}`
    ),


  saleOrderDetails: (id, payload) => api.get(`admin/purchas-orders/details/${id}`, payload),
  saleOrderList: (id, payload) => api.get(`admin/purchas-orders/list/${id}`, payload),

  getPastSalesOrder: (
    filterQuery,
    page,
    paginate,
    sort = "",
    desc = true,
  ) =>
    api.get(
      `admin/purchas-orders/past-sales?page=${page}&paginate=${paginate}&sort=${desc ? "" : "-"}${sort}&${filterQuery}`
    ),


  pastSaleOrderDetails: (id, payload) => api.get(`admin/purchas-orders/past-details/${id}`, payload),

  getPaymentSalesOrder: (
    filterQuery,
    page,
    paginate,
    sort = "",
    desc = true,
  ) =>
    api.get(
      `admin/purchas-orders/payment-sales?page=${page}&paginate=${paginate}&sort=${desc ? "" : "-"}${sort}&${filterQuery}`
    ),

  getCancelledSalesOrder: (
    filterQuery,
    page,
    paginate,
    sort = "",
    desc = true,
  ) =>
    api.get(
      `admin/purchas-orders/cancel-sales?page=${page}&paginate=${paginate}&sort=${desc ? "" : "-"}${sort}&${filterQuery}`
    ),


  startAmountAdd: (payload) => api.put(`admin/purchas-orders/startAmountAdd`, payload),



  // Plastic Purchas Order

  getNewPlasticPurchaseOrders: (
    filterQuery,
    page,
    paginate,
    sort = "",
    desc = true,
    company_name,
  ) =>
    api.get(
      `admin/plastic-purchas-orders/new?page=${page}&paginate=${paginate}&sort=${desc ? "" : "-"}${sort}&company_name=${company_name}&${filterQuery}`
    ),

  getPlasticPurchaseOrderDetails: (id, payload) => api.get(`admin/plastic-purchas-orders/${id}`, payload),
  orderPlasticPurchaseCreate: (payload) => api.post('admin/plastic-purchas-orders/create', payload),
  orderPlasticPurchaseUpdate: (id, payload) => api.put(`admin/plastic-purchas-orders/update/${id}`, payload),
  orderPlasticPurchaseData: () => api.get('/admin/plastic-purchas-orders/data'),


  


  getTodayPurchasOrder: (
    filterQuery,
    page,
    paginate,
    sort = "",
    desc = true,
  ) =>
    api.get(
      `admin/plastic-purchas-orders/today-sales?page=${page}&paginate=${paginate}&sort=${desc ? "" : "-"}${sort}&${filterQuery}`
    ),


 plasticPurchasOrderDetails: (id, payload) => api.get(`admin/plastic-purchas-orders/details/${id}`, payload),
 plasticPurchasOrderList: (id, payload) => api.get(`admin/plastic-purchas-orders/list/${id}`, payload),


  
  getPastPlasticPurchasOrder: (
    filterQuery,
    page,
    paginate,
    sort = "",
    desc = true,
  ) =>
    api.get(
      `admin/plastic-purchas-orders/past-sales?page=${page}&paginate=${paginate}&sort=${desc ? "" : "-"}${sort}&${filterQuery}`
    ),


   pastPlasticPurchasOrderDetails: (id, payload) => api.get(`admin/plastic-purchas-orders/past-details/${id}`, payload),


  getPaymentPlasticPurchasOrder: (
    filterQuery,
    page,
    paginate,
    sort = "",
    desc = true,
  ) =>
    api.get(
      `admin/plastic-purchas-orders/payment-sales?page=${page}&paginate=${paginate}&sort=${desc ? "" : "-"}${sort}&${filterQuery}`
    ),

  getCancelledPlasticPurchasOrder: (
    filterQuery,
    page,
    paginate,
    sort = "",
    desc = true,
  ) =>
    api.get(
      `admin/plastic-purchas-orders/cancel-sales?page=${page}&paginate=${paginate}&sort=${desc ? "" : "-"}${sort}&${filterQuery}`
    ),

  // Sale Order

  getNewSellOrders: (
    filterQuery,
    page,
    paginate,
    sort = "",
    desc = true,
    company_name,
  ) =>
    api.get(
      `admin/purchas-sell-orders/new?page=${page}&paginate=${paginate}&sort=${desc ? "" : "-"}${sort}&company_name=${company_name}&${filterQuery}`
    ),

  getSellOrderDetails: (id, payload) => api.get(`admin/purchas-sell-orders/${id}`, payload),
  orderSellCreate: (payload) => api.post('admin/purchas-sell-orders/create', payload),
  orderSellUpdate: (id, payload) => api.put(`admin/purchas-sell-orders/update/${id}`, payload),
  orderSellData: () => api.get('/admin/purchas-sell-orders/data'),





  getTodayPurchasSalesOrder: (
    filterQuery,
    page,
    paginate,
    sort = "",
    desc = true,
  ) =>
    api.get(
      `admin/purchas-sell-orders/today-sales?page=${page}&paginate=${paginate}&sort=${desc ? "" : "-"}${sort}&${filterQuery}`
    ),


  salePurchasOrderDetails: (id, payload) => api.get(`admin/purchas-sell-orders/details/${id}`, payload),
  salePurchasOrderList: (id, payload) => api.get(`admin/purchas-sell-orders/list/${id}`, payload),


  
  getPastPurchasOrder: (
    filterQuery,
    page,
    paginate,
    sort = "",
    desc = true,
  ) =>
    api.get(
      `admin/purchas-sell-orders/past-sales?page=${page}&paginate=${paginate}&sort=${desc ? "" : "-"}${sort}&${filterQuery}`
    ),


  pastPurchasOrderDetails: (id, payload) => api.get(`admin/purchas-sell-orders/past-details/${id}`, payload),

  getPaymentPurchasOrder: (
    filterQuery,
    page,
    paginate,
    sort = "",
    desc = true,
  ) =>
    api.get(
      `admin/purchas-sell-orders/payment-sales?page=${page}&paginate=${paginate}&sort=${desc ? "" : "-"}${sort}&${filterQuery}`
    ),

  getCancelledPurchasOrder: (
    filterQuery,
    page,
    paginate,
    sort = "",
    desc = true,
  ) =>
    api.get(
      `admin/purchas-sell-orders/cancel-sales?page=${page}&paginate=${paginate}&sort=${desc ? "" : "-"}${sort}&${filterQuery}`
    ),



  // Plastic Sale Order


  getNewPlasticOrders: (
    filterQuery,
    page,
    paginate,
    sort = "",
    desc = true,
    lorry_number,
  ) =>
    api.get(
      `admin/sale-plastic-orders/new?page=${page}&paginate=${paginate}&sort=${desc ? "" : "-"}${sort}&lorry_number=${lorry_number}&${filterQuery}`
    ),

  getPlasticOrderDetails: (id, payload) => api.get(`admin/sale-plastic-orders/${id}`, payload),
  plasticOrderCreate: (payload) => api.post('admin/sale-plastic-orders/create', payload),
  plasticOrderUpdate: (id, payload) => api.put(`admin/sale-plastic-orders/update/${id}`, payload),
  plasticOrderData: () => api.get('admin/sale-plastic-orders/data'),


  getTodayPlasticSalesOrder: (
    filterQuery,
    page,
    paginate,
    sort = "",
    desc = true,
  ) =>
    api.get(
      `admin/sale-plastic-orders/today-sales?page=${page}&paginate=${paginate}&sort=${desc ? "" : "-"}${sort}&${filterQuery}`
    ),



  getPastPlasticSalesOrder: (
    filterQuery,
    page,
    paginate,
    sort = "",
    desc = true,
  ) =>
    api.get(
      `admin/sale-plastic-orders/past-sales?page=${page}&paginate=${paginate}&sort=${desc ? "" : "-"}${sort}&${filterQuery}`
    ),


  pastPlasticSaleOrderDetails: (id, payload) => api.get(`admin/sale-plastic-orders/past-details/${id}`, payload),


   getPaymentPlasticSalesOrder: (
    filterQuery,
    page,
    paginate,
    sort = "",
    desc = true,
  ) =>
    api.get(
      `admin/sale-plastic-orders/payment-sales?page=${page}&paginate=${paginate}&sort=${desc ? "" : "-"}${sort}&${filterQuery}`
    ),


  getCancelledPlasticSalesOrder: (
    filterQuery,
    page,
    paginate,
    sort = "",
    desc = true,
  ) =>
    api.get(
      `admin/sale-plastic-orders/cancel-sales?page=${page}&paginate=${paginate}&sort=${desc ? "" : "-"}${sort}&${filterQuery}`
    ),


  plasticSaleOrderDetails: (id, payload) => api.get(`admin/sale-plastic-orders/details/${id}`, payload),
  plasticSaleOrderList: (id, payload) => api.get(`admin/sale-plastic-orders/list/${id}`, payload),






  // Plastic




  // incomeAdd: (payload) => api.put(`admin/purchas-orders/newIncomeAdd`, payload),
  // expenditureAdd: (payload) => api.put(`admin/purchas-orders/newExpenditureAdd`, payload),

  // staffIncomeAdd: (payload) => api.put(`admin/purchas-orders/staffIncomeAdd`, payload),
  // staffExpenditureAdd: (payload) => api.put(`admin/purchas-orders/staffExpenditureAdd`, payload),



  // resturantExpenditureAdd: (payload) => api.put(`admin/purchas-orders/resturantExpenditureAdd`, payload),



  //   companyOrderDetails: (id,payload) => api.post(`admin/items/company/details/${id}`, payload),

  //   companyCompletedOrderDetails: (id,payload) => api.post(`admin/items/company/details/complete/${id}`, payload),

  //   companyReturnOrderDetails: (id,payload) => api.post(`admin/items/company/return/details/${id}`, payload),

  //   companyReturnCompletedOrderDetails: (id,payload) => api.post(`admin/items/company/return/details/complete/${id}`, payload),


  //   companyReturnOrderList: (id,payload) => api.get(`admin/purchas-orders/company/return-list/${id}`, payload),

  //   companyPrice: (id,payload) => api.put(`admin/purchas-orders/company/addPrice/${id}`, payload),
  //   companyPaymentDetails: (id,payload) => api.get(`admin/purchas-orders/company/payments/${id}`, payload),

  //   completedCompanyOrder: (id) => api.post(`admin/items/company/complete/${id}`),

  //   getCompanyPendingOrder: (
  //     filterQuery,
  //     page,  
  //     paginate,
  //     sort = "",
  //     desc = true,
  //   ) =>
  //     api.get(
  //       `admin/items/company/pending-orders?page=${page}&paginate=${paginate}&sort=${ desc ? "" : "-"}${sort}&${filterQuery}`
  //     ),

  //   getCompanyCompletedOrder: (
  //     filterQuery,
  //     page,  
  //     paginate,
  //     sort = "",
  //     desc = true,
  //   ) =>
  //     api.get(
  //       `admin/items/company/complete?page=${page}&paginate=${paginate}&sort=${ desc ? "" : "-"}${sort}&${filterQuery}`
  //     ),

  //     hardwareOrderDetails: (id,payload) => api.post(`admin/items/hardware/details/${id}`, payload),

  //     hardwarePrice: (id,payload) => api.put(`admin/items/hardware/addPrice/${id}`, payload),

  //     hardwareReturnOrderDetails: (id,payload) => api.post(`admin/items/hardware/return/details/${id}`, payload),

  //     getHardwareNewOrder: (
  //       filterQuery,
  //       page,  
  //       paginate,
  //       sort = "",
  //       desc = true,
  //     ) =>
  //       api.get(
  //         `admin/items/hardware/new-orders?page=${page}&paginate=${paginate}&sort=${ desc ? "" : "-"}${sort}&${filterQuery}`
  //       ),

  //   getHardwarePendingOrder: (
  //     filterQuery,
  //     page,  
  //     paginate,
  //     sort = "",
  //     desc = true,
  //   ) =>
  //     api.get(
  //       `admin/items/hardware/pending-orders?page=${page}&paginate=${paginate}&sort=${ desc ? "" : "-"}${sort}&${filterQuery}`
  //     ),

  //   getHardwareCompletedOrder: (
  //     filterQuery,
  //     page,  
  //     paginate,
  //     sort = "",
  //     desc = true,
  //   ) =>
  //     api.get(
  //       `admin/items/hardware/completed-orders?page=${page}&paginate=${paginate}&sort=${ desc ? "" : "-"}${sort}&${filterQuery}`
  //     ),

  //   getHardwareCancelledOrder: (
  //     filterQuery,
  //     page,  
  //     paginate,
  //     sort = "",
  //     desc = true,
  //   ) =>
  //     api.get(
  //       `admin/items/hardware/cancelled-orders?page=${page}&paginate=${paginate}&sort=${ desc ? "" : "-"}${sort}&${filterQuery}`
  //     ),


  //     getHardwareReturnNewOrder: (
  //       filterQuery,
  //       page,  
  //       paginate,
  //       sort = "",
  //       desc = true,
  //     ) =>
  //       api.get(
  //         `admin/items/hardware/return/new-orders?page=${page}&paginate=${paginate}&sort=${ desc ? "" : "-"}${sort}&${filterQuery}`
  //       ),

  //   getHardwareReturnPendingOrder: (
  //     filterQuery,
  //     page,  
  //     paginate,
  //     sort = "",
  //     desc = true,
  //   ) =>
  //     api.get(
  //       `admin/items/hardware/return/pending-orders?page=${page}&paginate=${paginate}&sort=${ desc ? "" : "-"}${sort}&${filterQuery}`
  //     ),

  //   getHardwareReturnCompletedOrder: (
  //     filterQuery,
  //     page,  
  //     paginate,
  //     sort = "",
  //     desc = true,
  //   ) =>
  //     api.get(
  //       `admin/items/hardware/return/completed-orders?page=${page}&paginate=${paginate}&sort=${ desc ? "" : "-"}${sort}&${filterQuery}`
  //     ),

  //   getHardwareReturnCancelledOrder: (
  //     filterQuery,
  //     page,  
  //     paginate,
  //     sort = "",
  //     desc = true,
  //   ) =>
  //     api.get(
  //       `admin/items/hardware/return/cancelled-orders?page=${page}&paginate=${paginate}&sort=${ desc ? "" : "-"}${sort}&${filterQuery}`
  //     ),




  //  getStoreSalesOrder: (
  //       filterQuery,
  //       page,  
  //       paginate,
  //       sort = "",
  //       desc = true,
  //     ) =>
  //       api.get(
  //         `admin/purchas-orders/store-sales?page=${page}&paginate=${paginate}&sort=${ desc ? "" : "-"}${sort}&${filterQuery}`
  //       ),

  // saleReturnOrderDetails: (id,payload) => api.get(`admin/purchas-orders/sale/return-details/${id}`, payload),
  // saleReturnOrderList: (id,payload) => api.get(`admin/purchas-orders/sale/return-list/${id}`, payload),



  //   getTodaySalesReturnOrder: (
  //     filterQuery,
  //     page,  
  //     paginate,
  //     sort = "",
  //     desc = true,
  //   ) =>
  //     api.get(
  //       `admin/purchas-orders/return/today-sales?page=${page}&paginate=${paginate}&sort=${ desc ? "" : "-"}${sort}&${filterQuery}`
  //     ),

  // getPastSalesReturnOrder: (
  //     filterQuery,
  //     page,  
  //     paginate,
  //     sort = "",
  //     desc = true,
  //   ) =>
  //     api.get(
  //       `admin/purchas-orders/return/past-sales?page=${page}&paginate=${paginate}&sort=${ desc ? "" : "-"}${sort}&${filterQuery}`
  //     ),

  // getPaymentSalesReturnOrder: (
  //     filterQuery,
  //     page,  
  //     paginate,
  //     sort = "",
  //     desc = true,
  //   ) =>
  //     api.get(
  //       `admin/purchas-orders/return/payment-sales?page=${page}&paginate=${paginate}&sort=${ desc ? "" : "-"}${sort}&${filterQuery}`
  //     ),

  // getCancelledSalesReturnOrder: (
  //       filterQuery,
  //       page,  
  //       paginate,
  //       sort = "",
  //       desc = true,
  //     ) =>
  //       api.get(
  //         `admin/purchas-orders/return/cancel-sales?page=${page}&paginate=${paginate}&sort=${ desc ? "" : "-"}${sort}&${filterQuery}`
  //       ),


} 