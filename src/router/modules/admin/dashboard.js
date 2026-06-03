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


  {
    path: '/admin-expenses',
    name: 'admin-expenses',
    component: () => import('@/views/admin/expenses/index.vue'),
    meta: {
      redirectIfLoggedIn: true,
      noAuth: true,
    },
  },


  {
    path: '/shop-items',
    name: 'admin-shop-items',
    component: () => import('@/views/admin/item/item/index.vue'),
    meta: {
      pageTitle: 'Items',
      redirectIfLoggedIn: true,
      noAuth: true,
    },
  },




  {
    path: '/exchange-items',
    name: 'admin-exchange-items',
    component: () => import('@/views/admin/item/exchange-item/index.vue'),
    meta: {
      pageTitle: 'Exchange Items',
      redirectIfLoggedIn: true,
      noAuth: true,
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
    path: '/staffs',
    name: 'admin-staff',
    component: () => import('@/views/admin/staff/index.vue'),
    meta: {
      pageTitle: 'Staff',
      redirectIfLoggedIn: true,
      noAuth: true,
    },
  },



  {
    path: '/staff-attendences',
    name: 'staff-attendence',
    component: () => import('@/views/admin/staff/attendence/index.vue'),
    meta: {
      pageTitle: 'Staff Attendence',
      redirectIfLoggedIn: true,
      noAuth: true,
    },
  },



  {
    path: '/lorry',
    name: 'lorry',
    component: () => import('@/views/admin/driver/lorry/index.vue'),
    meta: {
      pageTitle: 'Company Vehicles',
      redirectIfLoggedIn: true,
      noAuth: true,
    },
  },

  {
    path: '/other-lorry',
    name: 'other-lorry',
    component: () => import('@/views/admin/driver/other-lorry/index.vue'),
    meta: {
      pageTitle: 'External Vehicles',
      redirectIfLoggedIn: true,
      noAuth: true,
    },
  },

  ////   



  {
    path: '/admin-expense-category',
    name: 'admin-expense-category',
    component: () => import('@/views/admin/expenses-category/index.vue'),
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
