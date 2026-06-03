export default [

  // =====================================================
  // DASHBOARD
  // =====================================================
  {
    title: 'Dashboard',
    icon: 'HomeIcon',
    route: 'dashboard',
  },

  {
    header: 'BUSINESS OPERATIONS',
  },

  // =====================================================
  // DAILY OPERATIONS
  // =====================================================
  {
    title: 'Product Purchases',
    icon: 'ShoppingCartIcon',
    route: 'admin-pos',
  },


  {
    title: 'Plastic Product Sales',
    icon: 'PackageIcon',
    route: 'admin-plastic-sales',
  },


  {
    header: '────────────────────────',
  },


  {
    title: 'Product Sales',
    icon: 'DollarSignIcon',
    route: 'admin-product-sales',
  },

  {
    title: 'Plastic Purchases',
    icon: 'TruckIcon',
    route: 'admin-plastic-purchases',
  },


  // =====================================================
  // ORDERS MANAGEMENT
  // =====================================================
  {
    header: 'ORDER MANAGEMENT',
  },

  {
    title: 'Purchases',
    icon: 'ShoppingBagIcon',
    children: [
      {
        title: 'Suppliers',
        icon: 'UsersIcon',
        route: 'admin-supplier',
      },
      {
        title: 'Purchase Orders',
        icon: 'ClipboardIcon',
        route: 'admin-pos-order',
      },
      {
        title: 'Plastic PCH Orders',
        icon: 'LayersIcon',
        route: 'admin-plastic-pos-order',
      },
    ],
  },

  {
    title: 'Sales',
    icon: 'TrendingUpIcon',
    children: [
      {
        title: 'Companies',
        icon: 'BriefcaseIcon',
        route: 'admin-companies',
      },
      {
        title: 'Sales Orders',
        icon: 'FileTextIcon',
        route: 'admin-sale-order',
      },
      {
        title: 'Plastic Sales Orders',
        icon: 'CopyIcon',
        route: 'admin-plastic-sale-order',
      },
    ],
  },

  // =====================================================
  // FINANCIAL MANAGEMENT
  // =====================================================
  {
    header: 'FINANCIAL MANAGEMENT',
  },

  {
    title: 'Payments',
    icon: 'CreditCardIcon',
    children: [
      {
        title: 'Cash Payments',
        icon: 'DollarSignIcon',
        route: 'admin-cash',
      },
      {
        title: 'Card Payments',
        icon: 'CreditCardIcon',
        route: 'admin-card',
      },
      {
        title: 'Cheque Payments',
        icon: 'FileIcon',
        route: 'admin-cheque',
      },
      {
        title: 'Credit Payments',
        icon: 'ClipboardIcon',
        route: 'admin-credit',
      },
    ],
  },

  {
    title: 'Loans',
    icon: 'TrendingUpIcon',
    route: 'admin-loan',
  },


  {
    title: 'Expenses',
    icon: 'TrendingDownIcon',
    route: 'admin-expenses',
  },

  {
    title: 'Expense Categories',
    icon: 'FolderIcon',
    route: 'admin-expense-category',
  },

  {
    title: 'Banks',
    icon: 'BriefcaseIcon',
    route: 'admin-bank',
  },

  // =====================================================
  // INVENTORY MANAGEMENT
  // =====================================================
  {
    header: 'INVENTORY MANAGEMENT',
  },

  {
    title: 'Inventory',
    icon: 'ArchiveIcon',
    children: [
      {
        title: 'Product Categories',
        icon: 'GridIcon',
        route: 'admin-shop-category',
      },
      {
        title: 'Product Catalog',
        icon: 'BoxIcon',
        route: 'admin-shop-items',
      },
      {
        title: 'Exchange Products',
        icon: 'RepeatIcon',
        route: 'admin-exchange-items',
      },
      {
        title: 'Plastic Materials',
        icon: 'PackageIcon',
        route: 'admin-plastic-items',
      },
    ],
  },

  // =====================================================
  // HUMAN RESOURCES
  // =====================================================
  {
    header: 'HUMAN RESOURCES',
  },

  {
    title: 'Employees',
    icon: 'UsersIcon',
    children: [
      {
        title: 'Employee Management',
        icon: 'UserIcon',
        route: 'admin-staff',
      },
      {
        title: 'Attendance Tracking',
        icon: 'CalendarIcon',
        route: 'staff-attendence',
      },
      {
        title: 'Payroll Management',
        icon: 'CreditCardIcon',
        route: 'staff-payment',
      },
      {
        title: 'Payslip Management',
        icon: 'CreditCardIcon',
        route: 'staff-paysheet',
      },
    ],
  },

  {
    title: 'Driver Management',
    icon: 'UserCheckIcon',
    children: [
      {
        title: 'Driver Directory',
        icon: 'TruckIcon',
        route: 'driver-list',
      },
    ],
  },

  // =====================================================
  // VEHICLE MANAGEMENT
  // =====================================================
  {
    header: 'VEHICLE MANAGEMENT',
  },

  {
    title: 'Fleet Management',
    icon: 'TruckIcon',
    children: [
      {
        title: 'Company Vehicles',
        icon: 'TruckIcon',
        route: 'lorry',
      },
      {
        title: 'External Vehicles',
        icon: 'GlobeIcon',
        route: 'other-lorry',
      },
      {
        title: 'SMS Notifications',
        icon: 'MessageCircleIcon',
        route: 'sms',
      },
    ],
  },

  // =====================================================
  // DOCUMENTS
  // =====================================================
  {
    header: 'DOCUMENTS',
  },

  {
    title: 'Reports',
    icon: 'FileTextIcon',
    route: 'admin-invoices',
  },

]