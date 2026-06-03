import api from '../axios';

export default {

    
    getTodayItemPurchasDetails: () => api.post(`admin/invoices/item-today-purchas-details`),
    getTodayItemSaleDetails: () => api.post(`admin/invoices/item-today-sales-details`),

    
    getTodayPlasticItemPurchasDetails: () => api.post(`admin/invoices/plastic-item-today-purchas-details`),
    getTodayPlasticItemSaleDetails: () => api.post(`admin/invoices/plastic-item-today-sales-details`),
    
    getItems: (payload) => api.post(`admin/invoices/items-details`, payload),
    getPlasticItems: (payload) => api.post(`admin/invoices/plastic-items-details`, payload),

    
    getTodayPurchaseItemsDetailInvoices: (payload) => api.post(`admin/invoices/today-purchase-items-details`, payload),
    getTodayPurchaseAllItemsDetailInvoices: (payload) => api.post(`admin/invoices/today-purchase-all-items-details`, payload),
    getTodaySaleItemsDetailInvoices: (payload) => api.post(`admin/invoices/today-sale-items-details`, payload),
    getTodaySaleAllItemsDetailInvoices: (payload) => api.post(`admin/invoices/today-sale-all-items-details`, payload),

    
    getPurchaseItemsDetailInvoices: (payload) => api.post(`admin/invoices/purchase-items-details`, payload),
    getSaleItemsDetailInvoices: (payload) => api.post(`admin/invoices/sale-items-details`, payload),

    // Plastic

    getTodayPurchasePlasticItemsDetailInvoices: (payload) => api.post(`admin/invoices/plastic/today-purchase-items-details`, payload),
    getTodaySalePlasticItemsDetailInvoices: (payload) => api.post(`admin/invoices/plastic/today-sale-items-details`, payload),

    
    getPurchasePlasticItemsDetailInvoices: (payload) => api.post(`admin/invoices/plastic/purchase-items-details`, payload),
    getSalePlasticItemsDetailInvoices: (payload) => api.post(`admin/invoices/plastic/sale-items-details`, payload),

    
    //

     getTotalDetailInvoices: (payload) => api.post(`admin/invoices/total-details`, payload),

    getProfitDetailInvoices: (payload) => api.post(`admin/invoices/profit-details`, payload),
    getOtherDetailInvoices: (payload) => api.post(`admin/invoices/other-details`, payload),
     
    getBarTodaySaleCategoriesDetailInvoices: () => api.post(`admin/invoices/hardware-today-sale-categories-details`),


    getHardwareTodaySaleItemsDetailInvoices: (payload) => api.post(`admin/invoices/company-today-sale-items-details`, payload),
    getHardwareSaleItemsDetailInvoices: (payload) => api.post(`admin/invoices/company-sale-items-details`, payload),

    getHardwareItems: (payload) => api.post(`admin/invoices/hardware-items-details`, payload),
    getTotalStaffDetailInvoices: (payload) => api.post(`admin/invoices/total-staff-details`, payload),
    getStaffDetailInvoices: (payload) => api.post(`admin/invoices/staff-details`, payload),
    getTotalShopDetailInvoices: (payload) => api.post(`admin/invoices/total-shop-details`, payload),

    getTodaySaleReturnItemsDetailInvoices: (payload) => api.post(`admin/invoices/hardware-today-sale-return-items-details`, payload),
    getSaleReturnItemsDetailInvoices: (payload) => api.post(`admin/invoices/hardware-sale-return-items-details`, payload),

    getHardwareTodaySaleReturnItemsDetailInvoices: (payload) => api.post(`admin/invoices/company-today-sale-return-items-details`, payload),
    getHardwareSaleReturnItemsDetailInvoices: (payload) => api.post(`admin/invoices/company-sale-return-items-details`, payload),
}