export default [
  {
    path: '/dashboard',
    name: 'dashboard',
    component: () => import('@/views/dashboard/index.vue'),
    meta: {
      redirectIfLoggedIn: true,
      noAuth: true,
    },
  },


  {
    path: '/purches-bill',
    name: 'admin-pos',
    component: () => import('@/views/admin/pos/purchas/index.vue'),
    meta: {
      redirectIfLoggedIn: true,
      noAuth: true,
    },
  },


  {
    path: '/sales-bill',
    name: 'admin-product-sales',
    component: () => import('@/views/admin/pos/sell/index.vue'),
    meta: {
      redirectIfLoggedIn: true,
      noAuth: true,
    },
  },

  {
    path: '/plastic-sale',
    name: 'admin-plastic-sales',
    component: () => import('@/views/admin/plastic/sell/index.vue'),
    meta: {
      redirectIfLoggedIn: true,
      noAuth: true,
    },
  },

  {
    path: '/plastic-purchase',
    name: 'admin-plastic-purchases',
    component: () => import('@/views/admin/plastic/purchas/index.vue'),
    meta: {
      redirectIfLoggedIn: true,
      noAuth: true,
    },
  },



  {
    path: '/suppliers',
    name: 'admin-supplier',
    component: () => import('@/views/admin/supplier/index.vue'),
    meta: {
      redirectIfLoggedIn: true,
      noAuth: true,
    },
  },


  {
    path: '/companies',
    name: 'admin-companies',
    component: () => import('@/views/admin/company/index.vue'),
    meta: {
      redirectIfLoggedIn: true,
      noAuth: true,
    },
  },

    {
    path: '/admin-loan',
    name: 'admin-loan',
    component: () => import('@/views/admin/loan/index.vue'), 
     meta: {
      redirectIfLoggedIn: true,
      noAuth: true,
    },
  },



  ////   



  {
    path: '/order_list',
    name: 'admin-pos-order',
    component: () => import('@/views/admin/purches-bill/index.vue'),

  },

  {
    path: '/sale-order_list',
    name: 'admin-sale-order',
    component: () => import('@/views/admin/purches-sale-bill/index.vue'),

  },

  {
    path: '/plastic-sale-order_list',
    name: 'admin-plastic-sale-order',
    component: () => import('@/views/admin/plastic-sale-bill/index.vue'),

  },



  {
    path: '/plastic-order_list',
    name: 'admin-plastic-pos-order',
    component: () => import('@/views/admin/plastic-purchase-bill/index.vue'),

  },


  {
    path: '/order_items',
    name: 'admin-item-pos',
    component: () => import('@/views/admin/purches-bill/index.vue'),

  },

  {
    path: '/return_order_list',
    name: 'admin-return-pos-order',
    component: () => import('@/views/admin/return-bill/index.vue'),

  },

  {
    path: '/return_order_items',
    name: 'admin-return-item-pos',
    component: () => import('@/views/admin/return-item/index.vue'),

  },


  {
    path: '/admin-cash',
    name: 'admin-cash',
    component: () => import('@/views/admin/payments/cash/index.vue'),
  },


  {
    path: '/admin-card',
    name: 'admin-card',
    component: () => import('@/views/admin/payments/card/index.vue'),
  },

  {
    path: '/admin-cheque',
    name: 'admin-cheque',
    component: () => import('@/views/admin/payments/cheque/index.vue'),
  },


  {
    path: '/admin-credit',
    name: 'admin-credit',
    component: () => import('@/views/admin/payments/credit/index.vue'),
  },


  {
    path: '/admin-expenses',
    name: 'admin-expenses',
    component: () => import('@/views/admin/expenses/index.vue'),
  },

  {
    path: '/admin-expense-category',
    name: 'admin-expense-category',
    component: () => import('@/views/admin/expenses-category/index.vue'),
  },

  {
    path: '/view-payment-today-sale-order/:id',
    name: 'view-payment-today-sale-order',
    component: () => import('@/views/admin/purches-bill/today/list.vue'),
  },


  {
    path: '/view-today-purchas-order/:id',
    name: 'view-today-purchas-order',
    component: () => import('@/views/admin/plastic-purchase-bill/today/list.vue'),
  },



  {
    path: '/view-payment-today-purchas-sale-order/:id',
    name: 'view-payment-today-purchas-sale-order',
    component: () => import('@/views/admin/purches-sale-bill/today/list.vue'),
  },


  {
    path: '/view-plastic-sale-order/:id',
    name: 'view-plastic-sale-order',
    component: () => import('@/views/admin/plastic-sale-bill/today/list.vue'),
  },

  {
    path: '/view-payment-payment-sale-order/:id',
    name: 'view-payment-payment-sale-order',
    component: () => import('@/views/admin/purches-bill/payment/list.vue'),
  },

  {
    path: '/view-payment-sell-sale-order/:id',
    name: 'view-payment-sell-sale-order',
    component: () => import('@/views/admin/purches-sale-bill/payment/list.vue'),
  },

  {
    path: '/view-payment-sell-plastic-sale-order/:id',
    name: 'view-payment-sell-plastic-sale-order',
    component: () => import('@/views/admin/plastic-sale-bill/payment/list.vue'),
  },

  {
    path: '/view-past-sale-order/:id',
    name: 'view-past-sale-order',
    component: () => import('@/views/admin/purches-bill/other/list.vue'),
  },


  {
    path: '/view-past-plastic-purchase-order/:id',
    name: 'view-past-plastic-purchase-order',
    component: () => import('@/views/admin/plastic-purchase-bill/other/list.vue'),
  },


  {
    path: '/view-payment-plastic-purchase-order/:id',
    name: 'view-payment-plastic-purchase-order',
    component: () => import('@/views/admin/plastic-purchase-bill/payment/list.vue'),
  },

  {
    path: '/view-past-sell-sale-order/:id',
    name: 'view-past-sell-sale-order',
    component: () => import('@/views/admin/purches-sale-bill/other/list.vue'),
  },

  {
    path: '/view-cancel-sell-sale-order/:id',
    name: 'view-cancel-sell-sale-order',
    component: () => import('@/views/admin/purches-sale-bill/cancel/list.vue'),
  },

  {
    path: '/view-past-plastic-sale-order/:id',
    name: 'view-past-plastic-sale-order',
    component: () => import('@/views/admin/plastic-sale-bill/other/list.vue'),
  },



  {
    path: '/view-cancel-sale-order/:id',
    name: 'view-cancel-sale-order',
    component: () => import('@/views/admin/purches-bill/cancel/list.vue'),
  },

  {
    path: '/view-cancel-purchase-order/:id',
    name: 'view-cancel-purchase-order',
    component: () => import('@/views/admin/plastic-purchase-bill/cancel/list.vue'),
  },

  {
    path: '/view-cancel-sell-sale-order/:id',
    name: 'view-cancel-sell-sale-order',
    component: () => import('@/views/admin/purches-sale-bill/cancel/list.vue'),
  },


  {
    path: '/view-plastic-cancel-sale-order/:id',
    name: 'view-plastic-cancel-sale-order',
    component: () => import('@/views/admin/plastic-sale-bill/cancel/list.vue'),
  },


  {
    path: '/view-payment-today-sale-return-order/:id',
    name: 'view-payment-today-sale-return-order',
    component: () => import('@/views/admin/return-bill/today/list.vue'),
  },

  {
    path: '/view-payment-payment-sale-return-order/:id',
    name: 'view-payment-payment-sale-return-order',
    component: () => import('@/views/admin/return-bill/payment/list.vue'),
  },

  {
    path: '/view-past-sale-return-order/:id',
    name: 'view-past-sale-return-order',
    component: () => import('@/views/admin/return-bill/other/list.vue'),
  },

  {
    path: '/view-cancel-sale-return-order/:id',
    name: 'view-cancel-sale-return-order',
    component: () => import('@/views/admin/return-bill/cancel/list.vue'),
  },

  {
    path: '/shop-categories',
    name: 'admin-shop-category',
    component: () => import('@/views/admin/item/category/index.vue'),
    meta: {
      pageTitle: 'Category',
    },
  },

  {
    path: '/shop-category/edit-category-details/:id',
    name: 'edit-shop-category-details',
    component: () => import('@/views/admin/item/category/edit.vue'),
    meta: {
      pageTitle: 'Category',
      breadcrumb: [
        {
          text: 'Edit Category Details',
          active: true,
        },
      ],
    },
  },


  {
    path: '/shop-items',
    name: 'admin-shop-items',
    component: () => import('@/views/admin/item/item/index.vue'),
    meta: {
      pageTitle: 'Items',
    },
  },

  {
    path: '/exchange-items',
    name: 'admin-exchange-items',
    component: () => import('@/views/admin/item/exchange-item/index.vue'),
    meta: {
      pageTitle: 'Exchange Items',
    },
  },

  {
    path: '/shop-items/edit-item-details/:id',
    name: 'edit-shop-item-details',
    component: () => import('@/views/admin/item/item/edit.vue'),
    meta: {
      pageTitle: 'Product',
      breadcrumb: [
        {
          text: 'Edit Product Details',
          active: true,
        },
      ],
    },
  },



  {
    path: '/plastic-items',
    name: 'admin-plastic-items',
    component: () => import('@/views/admin/plastic-item/index.vue'),
    meta: {
      pageTitle: 'Plastic Items',
      redirectIfLoggedIn: true,
      noAuth: true,
    },
  },

  {
    path: '/plastic-items/edit-item-details/:id',
    name: 'edit-plastic-item-details',
    component: () => import('@/views/admin/plastic-item/edit.vue'),
    meta: {
      pageTitle: 'Plastic Item',
      breadcrumb: [
        {
          text: 'Edit Product Details',
          active: true,
        },
      ],
    },
  },




  {
    path: '/view-company-order-list/:id',
    name: 'view-company-order-list',
    component: () => import('@/views/admin/company-order/shop-order/payment-orders/order-list.vue'),
    meta: {
      pageTitle: 'Order Details',
    },
  },

  {
    path: '/view-company-invoice/:id',
    name: 'view-company-invoice',
    component: () => import('@/views/admin/company-order/shop-order/payment-orders/invoice.vue'),
  },

  {
    path: '/view-company-completed-order-list/:id',
    name: 'view-company-completed-order-list',
    component: () => import('@/views/admin/company-order/shop-order/completed-orders/order-list.vue'),
    meta: {
      pageTitle: 'Order Details',
    },
  },

  {
    path: '/view-company-completed-invoice/:id',
    name: 'view-company-completed-invoice',
    component: () => import('@/views/admin/company-order/shop-order/completed-orders/invoice.vue'),
  },

  {
    path: '/view-payment-company-order-list/:id',
    name: 'view-payment-company-order-list',
    component: () => import('@/views/admin/company-order/shop-order/payment-orders/order-list.vue'),
    meta: {
      pageTitle: 'Order Details',
    },
  },


  {
    path: '/view-complete-company-order-list/:id',
    name: 'view-complete-company-order-list',
    component: () => import('@/views/admin/item/shop-order/completed-orders/order-list.vue'),
    meta: {
      pageTitle: 'Order Details',
    },
  },


  {
    path: '/view-hardware-payment-invoice/:id',
    name: 'view-hardware-payment-invoice',
    component: () => import('@/views/admin/item/shop-order/payment-orders/invoice.vue'),
  },

  {
    path: '/view-payment-hardware-order-list/:id',
    name: 'view-payment-hardware-order-list',
    component: () => import('@/views/admin/item/shop-order/payment-orders/order-list.vue'),
    meta: {
      pageTitle: 'Order Details',
    },
  },


  {
    path: '/view-hardware-order-list/:id',
    name: 'view-hardware-order-list',
    component: () => import('@/views/admin/item/shop-order/new-orders/view.vue'),
  },

  {
    path: '/view-hardware-completed-invoice/:id',
    name: 'view-hardware-completed-invoice',
    component: () => import('@/views/admin/item/shop-order/completed-orders/invoice.vue'),
  },


  {
    path: '/view-completed-hardware-order-list/:id',
    name: 'view-completed-hardware-order-list',
    component: () => import('@/views/admin/item/shop-order/completed-orders/order-list.vue'),
    meta: {
      pageTitle: 'Order Details',
    },
  },


  {
    path: '/view-completed-hardware-return-order-list/:id',
    name: 'view-completed-hardware-return-order-list',
    component: () => import('@/views/admin/item/return-order/completed-orders/order-list.vue'),
    meta: {
      pageTitle: 'Return Order Details',
    },
  },

  {
    path: '/view-hardware-return-order-list/:id',
    name: 'view-hardware-return-order-list',
    component: () => import('@/views/admin/item/return-order/new-orders/view.vue'),
  },

  {
    path: '/view-payment-hardware-return-order-list/:id',
    name: 'view-payment-hardware-return-order-list',
    component: () => import('@/views/admin/item/return-order/payment-orders/order-list.vue'),
    meta: {
      pageTitle: 'Order Details',
    },
  },

  {
    path: '/staffs',
    name: 'admin-staff',
    component: () => import('@/views/admin/staff/index.vue'),
    meta: {
      pageTitle: 'Staff',
    },
  },

  {
    path: '/staff-payments',
    name: 'staff-payment',
    component: () => import('@/views/admin/staff/payment/index.vue'),
    meta: {
      pageTitle: 'Staff Payments',
    },
  },


  {
    path: '/staff-paysheet',
    name: 'staff-paysheet',
    component: () => import('@/views/admin/staff/paysheet/index.vue'),
  },


  {
    path: '/staff-attendences',
    name: 'staff-attendence',
    component: () => import('@/views/admin/staff/attendence/index.vue'),
    meta: {
      pageTitle: 'Staff Attendence',
    },
  },


  {
    path: '/lorry',
    name: 'lorry',
    component: () => import('@/views/admin/driver/lorry/index.vue'),
    meta: {
      pageTitle: 'Company Vehicles',
    },
  },

  {
    path: '/other-lorry',
    name: 'other-lorry',
    component: () => import('@/views/admin/driver/other-lorry/index.vue'),
    meta: {
      pageTitle: 'External Vehicles',
    },
  },

  {
    path: '/driver-list',
    name: 'driver-list',
    component: () => import('@/views/admin/driver/list/index.vue'),
    meta: {
      pageTitle: 'Drivers',
    },
  },


  {
    path: '/lorry-driver',
    name: 'lorry-driver',
    component: () => import('@/views/admin/driver/lorry-driver/index.vue'),
    meta: {
      pageTitle: 'Lorry Drivers',
    },
  },

  {
    path: '/sms',
    name: 'sms',
    component: () => import('@/views/admin/driver/sms/index.vue'),
    meta: {
      pageTitle: 'SMS',
    },
  },


  {
    path: '/banks',
    name: 'admin-bank',
    component: () => import('@/views/admin/bank/index.vue'),
    meta: {
      pageTitle: 'Bank',
    },
  },

  {
    path: '/staffs/edit-staff-details/:id',
    name: 'edit-staff-details',
    component: () => import('@/views/admin/staff/edit.vue'),
    meta: {
      pageTitle: 'Staff',
      breadcrumb: [
        {
          text: 'Edit Staff Member Details',
          active: true,
        },
      ],
    },
  },


  {
    path: '/staffs/view-staff-details/:id',
    name: 'view-staff-details',
    component: () => import('@/views/admin/staff/view.vue'),
    meta: {
      pageTitle: 'Staff',
      breadcrumb: [
        {
          text: 'Staff Member Details',
          active: true,
        },
      ],
    },
  },

  {
    path: '/staff-paysheet/view-staff-paysheet-details/:id',
    name: 'view-staff-paysheet-details',
    component: () => import('@/views/admin/staff/paysheet/view.vue'),
  },

  {
    path: '/drivers/view-driver-details/:id',
    name: 'view-driver-details',
    component: () => import('@/views/admin/driver/list/view.vue'),
    meta: {
      pageTitle: 'Driver',
      breadcrumb: [
        {
          text: 'Driver Member Details',
          active: true,
        },
      ],
    },
  },


  {
    path: '/lorrys/edit-lorry-details/:id',
    name: 'edit-lorry-details',
    component: () => import('@/views/admin/driver/lorry/edit.vue'),
    meta: {
      pageTitle: 'Company Vehicle',
      breadcrumb: [
        {
          text: 'Edit Company Vehicle Details',
          active: true,
        },
      ],
    },
  },

  {
    path: '/other-lorrys/edit-lorry-details/:id',
    name: 'edit-other-lorry-details',
    component: () => import('@/views/admin/driver/other-lorry/edit.vue'),
    meta: {
      pageTitle: 'External Vehicle',
      breadcrumb: [
        {
          text: 'Edit External Details',
          active: true,
        },
      ],
    },
  },

  {
    path: '/lorrys/view-lorry-details/:id',
    name: 'view-lorry-details',
    component: () => import('@/views/admin/driver/lorry/view.vue'),
    meta: {
      pageTitle: 'Company Vehicle',
      breadcrumb: [
        {
          text: 'Company Vehicle Details',
          active: true,
        },
      ],
    },
  },

  {
    path: '/other-lorrys/view-lorry-details/:id',
    name: 'view-other-lorry-details',
    component: () => import('@/views/admin/driver/other-lorry/view.vue'),
    meta: {
      pageTitle: 'External Vehicle',
      breadcrumb: [
        {
          text: 'External Vehicle Details',
          active: true,
        },
      ],
    },
  },


  {
    path: '/companies',
    name: 'admin-companies',
    component: () => import('@/views/admin/company/index.vue'),
    meta: {
      pageTitle: 'Companies',
    },
  },



  {
    path: '/low-stock-items',
    name: 'low-stock-items',
    component: () => import('@/views/admin/item/low-stock-item/index.vue'),
  },

  {
    path: '/expired-items',
    name: 'expired-items',
    component: () => import('@/views/admin/item/expired-item/index.vue'),
  },

  {
    path: '/shop-ordres',
    name: 'admin-shop-orders',
    component: () => import('@/views/admin/item/shop-order/index.vue'),
  },

  {
    path: '/return-ordres',
    name: 'admin-return-orders',
    component: () => import('@/views/admin/item/return-order/index.vue'),
  },


  {
    path: '/company-orders',
    name: 'admin-company-orders',
    component: () => import('@/views/admin/company-order/shop-order/index.vue'),
  },



  {
    path: '/account-setting',
    name: 'admin-account-setting',
    component: () => import('@/views/admin/index.vue'),
    meta: {
      pageTitle: 'Account Settings',
      breadcrumb: [
        {
          text: 'Account Settings',
          active: true,
        },
      ],
    },
  },

  {
    path: '/invoice',
    name: 'admin-invoices',
    component: () => import('@/views/admin/invoice/index.vue'),
  },

  {
    path: '/item-details-invoice',
    name: 'item-details-invoice',
    component: () => import('@/views/admin/invoice/invoices/items.vue'),
  },


  {
    path: '/today-sale-details-invoice',
    name: 'today-sale-details-invoice',
    component: () => import('@/views/admin/invoice/invoices/today-sale-items.vue'),
  },

  {
    path: '/sale-details-invoice',
    name: 'sale-details-invoice',
    component: () => import('@/views/admin/invoice/invoices/sale-items.vue'),
  },


  {
    path: '/total-details-invoice',
    name: 'total-details-invoice',
    component: () => import('@/views/admin/invoice/invoices/total-details.vue'),
  },



  {
    path: '/today-purchase-category-details-invoice',
    name: 'today-purchase-category-details-invoice',
    component: () => import('@/views/admin/invoice/invoices/today-purchase-items.vue'),
  },

  {
    path: '/purchase-category-details-invoice',
    name: 'purchase-category-details-invoice',
    component: () => import('@/views/admin/invoice/invoices/purchase-items.vue'),
  },


  // Plastics


  {
    path: '/plastic-item-details-invoice',
    name: 'plastic-item-details-invoice',
    component: () => import('@/views/admin/invoice/invoices/plastic-items.vue'),
  },

  {
    path: '/today-sale-plastic-details-invoice',
    name: 'today-sale-plastic-details-invoice',
    component: () => import('@/views/admin/invoice/invoices/today-sale-plastic-items.vue'),
  },


  {
    path: '/sale-plastic-details-invoice',
    name: 'sale-plastic-details-invoice',
    component: () => import('@/views/admin/invoice/invoices/sale-plastic-items.vue'),
  },

  {
    path: '/today-purchase-plastic-details-invoice',
    name: 'today-purchase-plastic-details-invoice',
    component: () => import('@/views/admin/invoice/invoices/today-purchase-plastic-items.vue'),
  },

  {
    path: '/purchase-plastic-details-invoice',
    name: 'purchase-plastic-details-invoice',
    component: () => import('@/views/admin/invoice/invoices/purchase-plastic-items.vue'),
  },


  {
    path: '/total-staff-details-invoice',
    name: 'total-staff-details-invoice',
    component: () => import('@/views/admin/invoice/invoices/total-staff-details.vue'),
  },



  {
    path: '/staff-details-invoice',
    name: 'staff-details-invoice',
    component: () => import('@/views/admin/invoice/invoices/staff-details.vue'),
  },

  {
    path: '/staff-attendences-invoice',
    name: 'staff-attendences-invoice',
    component: () => import('@/views/admin/invoice/invoices/staff-attendence.vue'),
  },


  {
    path: '/company-expenses-invoice',
    name: 'company-expenses-invoice',
    component: () => import('@/views/admin/invoice/invoices/company-expenses.vue'),
  },

  {
    path: '/today-expenses-invoice',
    name: 'today-expenses-invoice',
    component: () => import('@/views/admin/invoice/invoices/today-expenses.vue'),
  },



  ///


  // {
  //   path: '/item-details-invoice',
  //   name: 'item-details-invoice',
  //   component: () => import('@/views/admin/invoice/invoices/items.vue'),
  // },








  // {
  //   path: '/company-today-sale-details-invoice',
  //   name: 'company-today-sale-details-invoice',
  //   component: () => import('@/views/admin/invoice/invoices/company-today-sale-items.vue'),
  // },

  // {
  //   path: '/company-sale-details-invoice',
  //   name: 'company-sale-details-invoice',
  //   component: () => import('@/views/admin/invoice/invoices/company-sale-items.vue'),
  // },

  // {
  //   path: '/company-today-sale-return-details-invoice',
  //   name: 'company-today-sale-return-details-invoice',
  //   component: () => import('@/views/admin/invoice/invoices/company-today-sale-return-items.vue'),
  // },

  // {
  //   path: '/company-sale-return-details-invoice',
  //   name: 'company-sale-return-details-invoice',
  //   component: () => import('@/views/admin/invoice/invoices/company-sale-return-items.vue'),
  // },



  {
    path: '/banks/edit-bank-details/:id',
    name: 'edit-bank-details',
    component: () => import('@/views/admin/bank/edit.vue'),
  },


  {
    path: '/cheques/edit-today-income-cheque-details/:id',
    name: 'edit-cheque-today-income-details',
    component: () => import('@/views/admin/payments/cheque/income/edit.vue'),
  },

  {
    path: '/cheques/edit-today-cheque-details/:id',
    name: 'edit-cheque-today-details',
    component: () => import('@/views/admin/payments/cheque/expenditure/edit.vue'),
  },


  {
    path: '/cheques/edit-payment-cheque-details/:id',
    name: 'edit-cheque-payment-details',
    component: () => import('@/views/admin/payments/cheque/payment-pending-expenditure/edit.vue'),
  },


]
