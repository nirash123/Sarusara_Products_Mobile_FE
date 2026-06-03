<template>
  <div class="report-dashboard p-2 p-md-3">

    <!-- ================= HEADER ================= -->
    <div class="dashboard-header mb-3">
      <div>
        <h1 class="main-title">Reports Dashboard</h1>

        <p class="sub-title">
          Business reports, sales, purchases, payroll & expenses analytics
        </p>
      </div>
    </div>

    <!-- ================= ITEM DETAILS ================= -->
    <section class="mb-4">

      <div class="section-title-wrapper">
        <h3 class="section-title">Item Details</h3>
      </div>

      <b-row>

        <b-col
          v-for="(card, index) in itemCards"
          :key="index"
          xl="3"
          lg="4"
          md="6"
          sm="12"
          class="mb-2"
        >

          <b-card
            no-body
            class="dashboard-card"
            :class="card.bg"
            @click="$router.push(card.route)"
          >

            <b-card-body>

              <div class="card-content">

                <div class="icon-wrapper">
                  <feather-icon
                    :icon="card.icon"
                    size="28"
                  />
                </div>

                <div class="card-text">
                  <h4>{{ card.title }}</h4>
                  <p>{{ card.subtitle }}</p>
                </div>

                <div class="arrow-icon">
                  <feather-icon
                    icon="ChevronRightIcon"
                    size="20"
                  />
                </div>

              </div>

            </b-card-body>

          </b-card>

        </b-col>

      </b-row>

    </section>

    <!-- ================= PLASTIC DETAILS ================= -->
    <section class="mb-4">

      <div class="section-title-wrapper">
        <h3 class="section-title">Plastic Item Details</h3>
      </div>

      <b-row>

        <b-col
          v-for="(card, index) in plasticCards"
          :key="index"
          xl="3"
          lg="4"
          md="6"
          sm="12"
          class="mb-2"
        >

          <b-card
            no-body
            class="dashboard-card"
            :class="card.bg"
            @click="$router.push(card.route)"
          >

            <b-card-body>

              <div class="card-content">

                <div class="icon-wrapper">
                  <feather-icon
                    :icon="card.icon"
                    size="28"
                  />
                </div>

                <div class="card-text">
                  <h4>{{ card.title }}</h4>
                  <p>{{ card.subtitle }}</p>
                </div>

                <div class="arrow-icon">
                  <feather-icon
                    icon="ChevronRightIcon"
                    size="20"
                  />
                </div>

              </div>

            </b-card-body>

          </b-card>

        </b-col>

      </b-row>

    </section>

    <!-- ================= STAFF DETAILS ================= -->
    <section class="mb-4">

      <div class="section-title-wrapper">
        <h3 class="section-title">Staff & Payroll Details</h3>
      </div>

      <b-row>

        <b-col
          v-for="(card, index) in staffCards"
          :key="index"
          xl="3"
          lg="4"
          md="6"
          sm="12"
          class="mb-2"
        >

          <b-card
            no-body
            class="dashboard-card"
            :class="card.bg"
            @click="$router.push(card.route)"
          >

            <b-card-body>

              <div class="card-content">

                <div class="icon-wrapper">
                  <feather-icon
                    :icon="card.icon"
                    size="28"
                  />
                </div>

                <div class="card-text">
                  <h4>{{ card.title }}</h4>
                  <p>{{ card.subtitle }}</p>
                </div>

                <div class="arrow-icon">
                  <feather-icon
                    icon="ChevronRightIcon"
                    size="20"
                  />
                </div>

              </div>

            </b-card-body>

          </b-card>

        </b-col>

      </b-row>

    </section>

    <!-- ================= COMPANY EXPENSES ================= -->
    <section class="mb-4">

      <div class="section-title-wrapper">
        <h3 class="section-title">Company Expenses</h3>
      </div>

      <b-row>

        <b-col
          v-for="(card, index) in expenseCards"
          :key="index"
          xl="3"
          lg="4"
          md="6"
          sm="12"
          class="mb-2"
        >

          <b-card
            no-body
            class="dashboard-card"
            :class="card.bg"
            @click="$router.push(card.route)"
          >

            <b-card-body>

              <div class="card-content">

                <div class="icon-wrapper">
                  <feather-icon
                    :icon="card.icon"
                    size="28"
                  />
                </div>

                <div class="card-text">
                  <h4>{{ card.title }}</h4>
                  <p>{{ card.subtitle }}</p>
                </div>

                <div class="arrow-icon">
                  <feather-icon
                    icon="ChevronRightIcon"
                    size="20"
                  />
                </div>

              </div>

            </b-card-body>

          </b-card>

        </b-col>

      </b-row>

    </section>

  </div>
</template>

<script>
import {
  BCard,
  BCardBody,
  BCol,
  BRow,
} from 'bootstrap-vue'

export default {
  components: {
    BCard,
    BCardBody,
    BCol,
    BRow,
  },

  data() {
    return {

      // ================= ITEM =================
      itemCards: [
        {
          title: 'Items Details',
          subtitle: 'අයිතම විස්තර',
          icon: 'PackageIcon',
          bg: 'gradient-dark',
          route: '/item-details-invoice',
        },
        {
          title: 'Today Sale Items',
          subtitle: 'අද දින විකුණුම් අයිතම',
          icon: 'TrendingUpIcon',
          bg: 'gradient-danger',
          route: '/today-sale-details-invoice',
        },
        {
          title: 'Sale Items',
          subtitle: 'විකුණුම් අයිතම',
          icon: 'ShoppingCartIcon',
          bg: 'gradient-success',
          route: '/sale-details-invoice',
        },
        {
          title: 'Today Purchase Items',
          subtitle: 'අද දින ගැණුම් අයිතම',
          icon: 'ShoppingBagIcon',
          bg: 'gradient-primary',
          route: '/today-purchase-category-details-invoice',
        },
        {
          title: 'Purchase Items',
          subtitle: 'ගැණුම් අයිතම',
          icon: 'ArchiveIcon',
          bg: 'gradient-warning',
          route: '/purchase-category-details-invoice',
        },
      ],

      // ================= PLASTIC =================
      plasticCards: [
        {
          title: 'Plastic Items Details',
          subtitle: 'ප්ලාස්ටික් අයිතම විස්තර',
          icon: 'BoxIcon',
          bg: 'gradient-secondary',
          route: '/plastic-item-details-invoice',
        },
        {
          title: 'Today Sale Plastic',
          subtitle: 'අද දින විකුණුම්',
          icon: 'BarChart2Icon',
          bg: 'gradient-success',
          route: '/today-sale-plastic-details-invoice',
        },
        {
          title: 'Sale Plastic Items',
          subtitle: 'විකුණුම් අයිතම',
          icon: 'ShoppingCartIcon',
          bg: 'gradient-info',
          route: '/sale-plastic-details-invoice',
        },
        {
          title: 'Today Purchase Plastic',
          subtitle: 'අද දින ගැණුම්',
          icon: 'TruckIcon',
          bg: 'gradient-warning',
          route: '/today-purchase-plastic-details-invoice',
        },
        {
          title: 'Purchase Plastic Items',
          subtitle: 'ගැණුම් අයිතම',
          icon: 'DatabaseIcon',
          bg: 'gradient-orange',
          route: '/purchase-plastic-details-invoice',
        },
      ],

      // ================= STAFF =================
      staffCards: [
        {
          title: 'Total Staff Details',
          subtitle: 'කාර්යමණ්ඩල මුළු විස්තර',
          icon: 'UsersIcon',
          bg: 'gradient-purple',
          route: '/total-staff-details-invoice',
        },
        {
          title: 'Staff Details',
          subtitle: 'කාර්යමණ්ඩල විස්තර',
          icon: 'UserCheckIcon',
          bg: 'gradient-pink',
          route: '/staff-details-invoice',
        },
          {
          title: 'Staff Attendance Details',
          subtitle: 'කාර්යමණ්ඩල පැමිණීමේ විස්තර',
          icon: 'CalendarIcon',
          bg: 'gradient-secondary',
          route: '/staff-attendences-invoice',
        },
        // {
        //   title: 'Staff Payroll',
        //   subtitle: 'වැටුප් විස්තර',
        //   icon: 'DollarSignIcon',
        //   bg: 'gradient-payroll',
        //   route: '/staff-payroll-details-invoice',
        // },
        {
          title: 'Monthly Salary Reports',
          subtitle: 'මාසික වැටුප් විස්තර',
          icon: 'CreditCardIcon',
          bg: 'gradient-salary',
          route: '/monthly-salary-report',
        },
      ],

      // ================= EXPENSES =================
      expenseCards: [
        {
          title: 'Company Expenses',
          subtitle: 'සමාගම් වියදම්',
          icon: 'FileTextIcon',
          bg: 'gradient-expense',
          route: '/company-expenses-invoice',
        },
        {
          title: 'Today Expenses',
          subtitle: 'අද දින වියදම්',
          icon: 'ActivityIcon',
          bg: 'gradient-danger',
          route: '/today-expenses-invoice',
        },
        // {
        //   title: 'Monthly Expenses',
        //   subtitle: 'මාසික වියදම්',
        //   icon: 'PieChartIcon',
        //   bg: 'gradient-warning',
        //   route: '/monthly-company-expenses',
        // },
        // {
        //   title: 'Expense Analytics',
        //   subtitle: 'වියදම් විශ්ලේෂණ',
        //   icon: 'TrendingDownIcon',
        //   bg: 'gradient-info',
        //   route: '/expense-analytics',
        // },
      ],
    }
  },
}
</script>

<style lang="scss">

.report-dashboard {
  background: #f4f7fb;
  min-height: 100vh;
}

/* ================= HEADER ================= */

.dashboard-header {
  background: linear-gradient(135deg, #7367f0, #5e50ee);
  border-radius: 18px;
  padding: 28px;
  color: white;
  box-shadow: 0 10px 30px rgba(115, 103, 240, 0.25);
}

.main-title {
  font-size: 32px;
  font-weight: 700;
  margin-bottom: 6px;
  color: #fff;
}

.sub-title {
  margin: 0;
  opacity: 0.9;
  font-size: 15px;
}

/* ================= SECTION ================= */

.section-title-wrapper {
  margin-bottom: 15px;
  margin-top: 20px;
}

.section-title {
  font-size: 22px;
  font-weight: 700;
  color: #2e3a59;
  position: relative;
  padding-left: 14px;
}

.section-title::before {
  content: '';
  width: 5px;
  height: 100%;
  background: #7367f0;
  position: absolute;
  left: 0;
  top: 0;
  border-radius: 20px;
}

/* ================= CARD ================= */

.dashboard-card {
  border: none !important;
  border-radius: 18px !important;
  overflow: hidden;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 18px rgba(34, 41, 47, 0.08);
}

.dashboard-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 12px 28px rgba(34, 41, 47, 0.18);
}

.card-content {
  display: flex;
  align-items: center;
  justify-content: space-between;
  min-height: 115px;
}

.icon-wrapper {
  width: 62px;
  height: 62px;
  border-radius: 16px;
  background: rgba(255,255,255,0.18);
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  flex-shrink: 0;
}

.card-text {
  flex: 1;
  padding: 0 15px;
}

.card-text h4 {
  color: #fff;
  font-size: 19px;
  font-weight: 700;
  margin-bottom: 8px;
}

.card-text p {
  color: rgba(255,255,255,0.92);
  margin: 0;
  font-size: 14px;
  font-weight: 500;
}

.arrow-icon {
  color: rgba(255,255,255,0.8);
}

/* ================= GRADIENTS ================= */

.gradient-primary {
  background: linear-gradient(135deg, #00c6ff, #0072ff);
}

.gradient-success {
  background: linear-gradient(135deg, #28c76f, #1e9e58);
}

.gradient-danger {
  background: linear-gradient(135deg, #ea5455, #d63031);
}

.gradient-warning {
  background: linear-gradient(135deg, #ff9f43, #ff7b00);
}

.gradient-dark {
  background: linear-gradient(135deg, #4b4b4b, #1f1f1f);
}

.gradient-secondary {
  background: linear-gradient(135deg, #6c757d, #495057);
}

.gradient-info {
  background: linear-gradient(135deg, #00cfe8, #0097a7);
}

.gradient-purple {
  background: linear-gradient(135deg, #7367f0, #5e50ee);
}

.gradient-pink {
  background: linear-gradient(135deg, #e83e8c, #c2185b);
}

.gradient-orange {
  background: linear-gradient(135deg, #ff7849, #ff5722);
}

.gradient-payroll {
  background: linear-gradient(135deg, #20bf55, #01baef);
}

.gradient-salary {
  background: linear-gradient(135deg, #8e2de2, #4a00e0);
}

.gradient-expense {
  background: linear-gradient(135deg, #ff512f, #dd2476);
}

/* ================= MOBILE ================= */

@media(max-width: 768px) {

  .main-title {
    font-size: 24px;
  }

  .card-text h4 {
    font-size: 16px;
  }

  .card-content {
    min-height: 95px;
  }

  .icon-wrapper {
    width: 52px;
    height: 52px;
  }
}
</style>