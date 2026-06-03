export default [

  // ================= MAIN =================
  {
    title: 'Dashboard',
    icon: 'GridIcon',
    route: 'dashboard',
  },

  // ================= DAILY OPERATIONS =================
  {
    title: 'Product Purchases',
    icon: 'ShoppingBagIcon',
    route: 'admin-pos',
  },

  {
    title: 'Plastic Product Sales',
    icon: 'PackageIcon',
    route: 'admin-plastic-sales',
  },

  // ================= ORDERS =================
  {
    title: 'Purchases',
    icon: 'ShoppingCartIcon',
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
        title: 'Plastic Purchases',
        icon: 'PackageIcon',
        route: 'admin-plastic-purchases',
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
    icon: 'BarChart2Icon',
    children: [
      {
        title: 'Companies',
        route: 'admin-companies',
      },
      {
        title: 'Product Sales',
        icon: 'ShoppingCartIcon',
        route: 'admin-product-sales',
      },
      {
        title: 'Sales Orders',
        icon: 'ClipboardIcon',
        route: 'admin-sale-order',
      },
      {
        title: 'Plastic Sales Orders',
        icon: 'LayersIcon',
        route: 'admin-plastic-sale-order',
      },
    ],
  },

  // ================= MONEY =================
  {
    title: 'Payments',
    icon: 'DollarSignIcon',
    children: [
      {
        title: 'Cashs',
        icon: 'PocketIcon',
        route: 'admin-cash',
      },
      {
        title: 'Cards',
        icon: 'CreditCardIcon',
        route: 'admin-card',
      },
      {
        title: 'Cheques',
        icon: 'FileTextIcon',
        route: 'admin-cheque',
      },
      {
        title: 'Credits',
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

  // ================= STOCK =================
  {
    title: 'Inventory',
    icon: 'ArchiveIcon',
    children: [
      {
        title: 'Product Categories',
        icon: 'LayersIcon',
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

  // ================= STAFF =================
  {
    title: 'Human Resources',
    icon: 'UsersIcon',
    children: [
      {
        title: 'Employees',
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
        icon: 'UserIcon',
        route: 'driver-list',
      },
    ],
  },

  // ================= VEHICLES =================
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

  // ================= DOCUMENTS =================
  {
    title: 'Invoices',
    icon: 'FileTextIcon',
    route: 'admin-invoices',
  }

]