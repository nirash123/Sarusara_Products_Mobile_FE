import api from '../axios';

export default {

  //uses


   addProductToSaleCart: (payload) => api.post('admin/sale/add/products', payload),
   getAdminSaleCarts: (id,payload) => api.get(`admin/sale/cart/${id}`, payload),
   getAdminPOSSaleCarts: (id,payload) => api.get(`admin/sale/cart/pos/${id}`, payload),
   deleteSaleCart: (id) => api.post(`admin/sale/delete/cart/${id}`),
   deleteSaleCartLastItem: (id) => api.post(`admin/sale/delete/lastitem/${id}`),
   updateSaleQuentityCart: (id,payload) => api.put(`admin/sale/update/quentity/${id}`, payload),

   submitSaleCart: (payload) => api.put(`admin/sale/submit`, payload),
   deleteSaleOrder: (id,payload) => api.post(`admin/sale/delete-order/${id}`, payload),
   deletePurchasOrder: (id,payload) => api.post(`admin/sale/delete-purchas-order/${id}`, payload),

   
   submitSaleNewCredit: (id, payload) => api.put(`admin/sale/new-credit-submit/${id}`, payload),

   


   // Sell Items

   addProductToSaleTodayCart: (payload) => api.post('admin/sell-sale/add/products', payload),
   getAdminSellSaleCarts: (id,payload) => api.get(`admin/sell-sale/cart/${id}`, payload),
   getAdminPOSSellSaleCarts: (id,payload) => api.get(`admin/sell-sale/cart/pos/${id}`, payload),
   deleteSellSaleCart: (id) => api.post(`admin/sell-sale/delete/cart/${id}`),
   deleteSellSaleCartLastItem: (id) => api.post(`admin/sell-sale/delete/lastitem/${id}`),
   updateSellSaleQuentityCart: (id,payload) => api.put(`admin/sell-sale/update/quentity/${id}`, payload),
   updateSellSalePriceCart: (id,payload) => api.put(`admin/sell-sale/update/price/${id}`, payload),
   submitSellSaleCart: (payload) => api.put(`admin/sell-sale/submit`, payload),
   deleteSellSaleOrder: (id,payload) => api.post(`admin/sell-sale/delete-sale-order/${id}`, payload),
   deleteSellPurchasOrder: (id,payload) => api.post(`admin/sell-sale/delete-order/${id}`, payload),

   
   submitSellSaleNewCredit: (id, payload) => api.put(`admin/sell-sale/new-credit-submit/${id}`, payload),

   // Plastic Purchase

   
   addProductToPlasticPurchaseCart: (payload) => api.post('admin/plastic-purchase/add/products', payload),
   updatePlasticPurchaseQuentityCart: (id,payload) => api.put(`admin/plastic-purchase/update/quentity/${id}`, payload), 
   updatePlasticPurchasePriceCart: (id,payload) => api.put(`admin/plastic-purchase/update/price/${id}`, payload), 
   getAdminPlasticPosPurchaseCarts: (id,payload) => api.get(`admin/plastic-purchase/pos/cart/${id}`, payload), 
   deletePlasticPurchaseCart: (id) => api.post(`admin/plastic-purchase/delete/cart/${id}`),
   deletePlasticPurchaseCartLastItem: (id) => api.post(`admin/plastic-purchase/delete/lastitem/${id}`),
   
   submitPlasticPurchaseCart: (payload) => api.put(`admin/plastic-purchase/submit`, payload),
   deletePlasticPurchaseOrder: (id,payload) => api.post(`admin/plastic-purchase/delete-sale-order/${id}`, payload),
   deletePlasticAllPurchaseOrder: (id,payload) => api.post(`admin/plastic-purchase/delete-purchas-order/${id}`, payload),
   
   submitPlasticPurchaseNewCredit: (id, payload) => api.put(`admin/plastic-purchase/new-credit-submit/${id}`, payload),



   // Plastic Sell

   addProductToPlasticSaleCart: (payload) => api.post('admin/plastic-sale/add/products', payload),
   getAdminPlasticSaleCarts: (id,payload) => api.get(`admin/plastic-sale/cart/${id}`, payload), 
   getAdminPlasticPosSaleCarts: (id,payload) => api.get(`admin/plastic-sale/pos/cart/${id}`, payload), 
   deletePlasticSaleCart: (id) => api.post(`admin/plastic-sale/delete/cart/${id}`),
   deletePlasticSaleCartLastItem: (id) => api.post(`admin/plastic-sale/delete/lastitem/${id}`),
   updatePlasticSaleQuentityCart: (id,payload) => api.put(`admin/plastic-sale/update/quentity/${id}`, payload), 

   submitPlasticSaleCart: (payload) => api.put(`admin/plastic-sale/submit`, payload),
   deletePlasticSaleOrder: (id,payload) => api.post(`admin/plastic-sale/delete-sale-order/${id}`, payload),
   deletePlasticAllOrder: (id,payload) => api.post(`admin/plastic-sale/delete-purchas-order/${id}`, payload),

   
   submitPlasticSellNewCredit: (id, payload) => api.put(`admin/plastic-sale/new-credit-submit/${id}`, payload),

  // not uses

    getAdminCompanyCarts: (id,payload) => api.get(`admin/items/cart/${id}`, payload),
    addProductToCompanyCart: (payload) => api.post('admin/items/add/products', payload),
    addQRToCompanyCart: (payload) => api.post('admin/items/add/qrproducts', payload),
    deleteCompanyCart: (id,payload) => api.post(`admin/items/delete/cart/${id}`, payload),
    updateCompanyQuentity: (id,payload) => api.put(`admin/items/update/quentity/${id}`, payload),
    submitCompanyCart: (payload) => api.put(`admin/items/submit`, payload),

    getAdminHardwareCarts: (id, payload) => api.get(`admin/items/hardware/cart/${id}`, payload),
    addProductToHardwareCart: (payload) => api.post('admin/items/hardware/add/products', payload),
    addQRToHardwareCart: (payload) => api.post('admin/items/hardware/add/qrproducts', payload),
    deleteHardwareCart: (id) => api.delete(`admin/items/hardware/delete/cart/${id}`),
    updateHardwareCompanyPrice: (id,payload) => api.put(`admin/items/hardware/update/company_price/${id}`, payload),
    updateHardwareSalePrice: (id,payload) => api.put(`admin/items/hardware/update/sale_price/${id}`, payload),
    updateHardwareQuentity: (id,payload) => api.put(`admin/items/hardware/update/quentity/${id}`, payload),
    updateExpiredDate: (id,payload) => api.put(`admin/items/hardware/update/expired_date/${id}`, payload),
    submitHardwareCart: (payload) => api.put(`admin/items/hardware/submit`, payload),

    getAdminHardwareOrderDetails: (id) => api.get(`admin/items/hardware/details/${id}`),
    getAdminHardwareReturnOrderDetails: (id) => api.get(`admin/items/hardware/return/details/${id}`),

    submitHardwareNewCart: (payload) => api.put(`admin/items/hardware/new-submit`, payload),
    submitHardwareNewCredit: (id, payload) => api.put(`admin/items/hardware/new-credit-submit/${id}`, payload),
    deleteHardwareNewCart: (id,payload) => api.post(`admin/items/hardware/delete-order/${id}`, payload),


    submitHardwareReturnNewCart: (payload) => api.put(`admin/items/hardware/return/new-submit`, payload),
    submitHardwareReturnNewCredit: (id, payload) => api.put(`admin/items/hardware/return/new-credit-submit/${id}`, payload),
    deleteHardwareReturnNewCart: (id,payload) => api.post(`admin/items/hardware/return/delete-order/${id}`, payload),

    getAdminHardwareReturnCarts: (id, payload) => api.get(`admin/items/hardware/return/cart/${id}`, payload),
    addProductToHardwareReturnCart: (payload) => api.post('admin/items/hardware/return/add/products', payload),
    addQRToHardwareReturnCart: (payload) => api.post('admin/items/hardware/return/add/qrproducts', payload),
    deleteHardwareReturnCart: (id) => api.delete(`admin/items/hardware/return/delete/cart/${id}`),
    updateHardwareReturnPrice: (id,payload) => api.put(`admin/items/hardware/return/update/company_price/${id}`, payload),
    updateHardwareReturnQuentity: (id,payload) => api.put(`admin/items/hardware/return/update/quentity/${id}`, payload),
    submitHardwareReturnCart: (payload) => api.put(`admin/items/hardware/return/submit`, payload),

  

    getAdminSaleReturnCarts: (id, payload) => api.get(`admin/items/sale/return/cart/${id}`, payload),
    addProductToSaleReturnCart: (payload) => api.post('admin/items/sale/return/add/products', payload),
    addQRToSaleReturnCart: (payload) => api.post('admin/items/sale/return/add/qrproducts', payload),
    deleteSaleReturnCart: (id) => api.delete(`admin/items/sale/return/delete/cart/${id}`),
    updateSaleReturnPrice: (id,payload) => api.put(`admin/items/sale/return/update/return_price/${id}`, payload),
    updateSaleReturnQuentity: (id,payload) => api.put(`admin/items/sale/return/update/quentity/${id}`, payload),
    submitSaleReturnCart: (payload) => api.put(`admin/items/sale/return/submit`, payload),
    submitSaleReturnNewCredit: (id, payload) => api.put(`admin/items/sale/return/new-credit-submit/${id}`, payload),

    deleteSaleReturnOrder: (id,payload) => api.post(`admin/items/sale/return/delete-order/${id}`, payload),

    getSaleReturnOrderItems:(
      filterQuery,
      page,
      paginate,
      sort = "",
      desc = true,
    ) =>
      api.get(
        `admin/items/sale/return/items?page=${page}&paginate=${paginate}&sort=${ desc ? "" : "-"}${sort}&${filterQuery}`
      ),

    addItem: (id,payload) => api.post(`admin/items/sale/return/add-item/${id}`, payload),

    getLowStockProducts: (
        filterQuery,
        page,
        paginate,
        sort = "",
        desc = true,
      ) =>
        api.get(
          `admin/items/hardware/low-store?page=${page}&paginate=${paginate}&sort=${ desc ? "" : "-"}${sort}&${filterQuery}`
        ),

    getAdminExpiredItems: (
        filterQuery,
        page,
        paginate,
        sort = "",
        desc = true,
        expired_date,
    ) =>
        api.get(
        `admin/items/hardware/expired?page=${page}&paginate=${paginate}&sort=${ desc ? "" : "-"}${sort}&expired_date=${expired_date}&${filterQuery}`
        ),

  getOrderItems: (
        filterQuery,
        page,
        paginate,
        sort = "",
        desc = true,
        order_date,
    ) =>
        api.get(
          `admin/items/sale/items?page=${page}&paginate=${paginate}&sort=${ desc ? "" : "-"}${sort}&order_date=${order_date}&${filterQuery}`
        ),

   getAdminSaleBillItemCarts: (id,payload) => api.get(`admin/items/sale/item/bill-cart/${id}`, payload),
   updateSalePriceCart: (id,payload) => api.put(`admin/items/sale/update/sale_price/${id}`, payload),


   getAdminCustomerCarts: (id,payload) => api.get(`admin/items/sale/cart/customer/${id}`, payload),
   addToCustomerCart: (payload) => api.post('admin/items/sale/add/customers', payload),
   deleteCustomerSaleCart: (id) => api.delete(`admin/items/sale/customers/delete/cart/${id}`),

   changeCompanyPrice: (id, payload) => api.put(`admin/items/change/company-price/${id}`, payload),
   changeSalePrice: (id, payload) => api.put(`admin/items/change/sale-price/${id}`, payload),

   changeQuentity: (id, payload) => api.put(`admin/items/change/quentity/${id}`, payload),


   addStore: (id,payload) => api.post(`admin/items/sale/add-store/${id}`, payload),
   cancelStore: (id,payload) => api.post(`admin/items/sale/cancel-store/${id}`, payload),

   submitExchangeItem: (payload) => api.post(`admin/items/exchange-change`, payload),
   deleteExchangeItem: (id) => api.delete(`admin/items/exchange-change/${id}`),

   getExchangeItems: (
    filterQuery,
    page,
    paginate,
    sort = "",
    desc = true,
  ) =>
    api.get(
      `admin/items/exchange-change/items?page=${page}&paginate=${paginate}&sort=${ desc ? "" : "-"}${sort}&${filterQuery}`
    ),

    addExchangeItem: (id,payload) => api.post(`admin/items/exchange-change/add/${id}`, payload),
    deleteExchangeNewItem: (id,payload) => api.post(`admin/items/exchange-change/delete/${id}`, payload),
    getExchangeItemDetails: (id,payload) => api.get(`admin/items/exchange-change/item-details/${id}`, payload),

    updateOrderStatus: (id,payload) => api.put(`admin/items/sale/update/status/${id}`, payload),

    

}