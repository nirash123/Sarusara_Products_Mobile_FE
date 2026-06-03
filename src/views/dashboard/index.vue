<template>
        <b-row>
          <b-col lg="4" md="12" sm="12" class="mb-2  mb-md-0">
            <b-card no-body class="earnings-card py-1">
              <div class="pt-2 px-2">
                <h4 class="font-weight-bolder">
                  අද දින මුළු ශේෂය
                </h4>
                <h4 class="mb-0 font-weight-bolder">
                  Rs: {{ (bank_amount).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") }}
                </h4>
                <b-img src="@/assets/images/logo/master.png" class="congratulation-medal mt-2" width="50" />
              </div>
              <div class="py-2 px-2">
                <h4 class="font-weight-bolder">
                  අද දින බැංකු ශේෂය
                </h4>
                <h4 class="mb-0 font-weight-bolder">
                  Rs: {{ (bank_total).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") }}
                </h4>
              </div>
            </b-card>


            <b-card  no-body class="earnings-card">
              <div class="py-4 px-2">
                <h4 class="font-weight-bolder">
                  අද දින ආරම්භක ශේෂය
                </h4>
                <h4 class="font-weight-bolder mb-0 ">
                  Rs: {{ (cashier_start_amount).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") }}
                </h4>
              </div>
            </b-card>


            <b-card no-body class="earnings-card">

              <b-card no-body @click="$router.push('/order_list?tab=3')" class="earnings-card">
                <div class="py-2 px-2">
                  <h4 class="font-weight-bolder">
                    ගෙවීමට ඇති මුදල
                  </h4>
                  <h4 class="mb-0 font-weight-bolder">
                    Rs: {{ (company).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") }}
                  </h4>
                  <b-img src="@/assets/images/logo/give.png" class="congratulation-medal mt-2" width="50" alt="Login" />
                </div>
              </b-card>
            </b-card>
            <b-card no-body class="earnings-card">

              <b-card no-body @click="$router.push('/return-ordres?tab=2')" class="earnings-card">
                <div class="py-2 px-2">
                  <h4 class="font-weight-bolder">
                    ලබාගැනීමට ඇති මුදල
                  </h4>
                  <h4 class="mb-0 font-weight-bolder">
                    Rs: {{ (sale).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") }}
                  </h4>
                  <b-img src="@/assets/images/logo/buy.png" class="congratulation-medal mt-2" width="50" alt="Login" />
                </div>
              </b-card>
            </b-card>


          </b-col>
          <b-col lg="8" md="12" sm="12">
            <b-card>
              <b-card-header>
                <div>
                  <b-card-sub-title>
                    ශේෂය
                  </b-card-sub-title>
                  <b-card-title>Rs {{ (today_income).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") }}</b-card-title>
                </div>
                <!-- datepicker -->
                <div class="py-2">

                  <h5>Select Date Range</h5>
                  <b-form-group>

                    <flat-pickr v-model="rangeDate" class="form-control" :config="{
                      mode: 'range',
                      dateFormat: 'Y-m-d',
                      allowInput: true,
                      minDate: new Date(new Date().setDate(new Date().getDate() - 90)).toISOString().split('T')[0],
                      maxDate: new Date().toISOString().split('T')[0],
                      onClose: function (selectedDates, dateStr, instance) {
                        if (selectedDates.length === 1) {
                          const sameDate = selectedDates[0];
                          instance.setDate([sameDate, sameDate], true);
                        }
                      }
                    }" />
                  </b-form-group>
                </div>
              </b-card-header>
              <sale-chart />
            </b-card>



          </b-col>
          <b-col lg="4" md="12" sm="12">
            <b-row>
              <b-col cols="12">
                <b-card no-body class="earnings-card">

                  <b-card no-body @click="$router.push('/return-ordres?tab=2')" class="earnings-card">
                    <div class="py-2 px-2">
                      <h4 class="font-weight-bolder">
                        ලබාගැනීමට ඇති මුළු ණය මුදල
                      </h4>
                      <h4 class="mb-0 font-weight-bolder">
                        Rs: {{ (loan).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") }}
                      </h4>
                      <b-img src="@/assets/images/logo/buy.png" class="congratulation-medal mt-2" width="50"
                        alt="Login" />
                    </div>
                  </b-card>
                </b-card>
              </b-col>
              <b-col cols="12">
                <b-card no-body class="earnings-card" @click="$router.push('/admin-loan?tab=4')">

                  <b-card no-body class="earnings-card">
                    <div class="py-2 px-2">
                      <h4 class="font-weight-bolder">
                        අද දින ණයට ලබා දුන් මුදල
                      </h4>
                      <h4 class="mb-0 font-weight-bolder">
                        Rs: {{ (loan_get).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") }}
                      </h4>
                      <b-img src="@/assets/images/logo/give.png" class="congratulation-medal mt-2" width="50"
                        alt="Login" />
                    </div>
                  </b-card>
                </b-card>
              </b-col>
              <b-col cols="12">
                <b-card no-body class="earnings-card" @click="$router.push('/admin-loan?tab=4')">

                  <b-card no-body class="earnings-card">
                    <div class="py-2 px-2">
                      <h4 class="font-weight-bolder">
                        අද දින ණය ලබාගත් මුදල
                      </h4>
                      <h4 class="mb-0 font-weight-bolder">
                        Rs: {{ (loan_pay).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") }}
                      </h4>
                      <b-img src="@/assets/images/logo/buy.png" class="congratulation-medal mt-2" width="50"
                        alt="Login" />
                    </div>
                  </b-card>
                </b-card>
              </b-col>
            </b-row>
          </b-col>
          <b-col lg="8" md="12" sm="12">
            
              <b-card @click="$router.push('/sms')" class="mb-1">
                <div class="d-flex justify-content-between align-items-center">
                  <h4 class="mb-0">
                    <feather-icon icon="BellIcon" size="20" />
                    Vehicle Notifications
                  </h4>

                  <b-badge variant="danger">
                  <h4 class="px-1 text-white">  {{ notifications.length }} </h4>
                  </b-badge>
                </div>
              </b-card>
            <div class="notification-container">
              <b-card v-for="(item, index) in notifications" :key="index" class="notification-card mb-1">
                <div class="d-flex align-items-center">

                  <!-- Icon -->
                  <div class="notification-icon">
                    <feather-icon icon="AlertTriangleIcon" size="20" />
                  </div>

                  <!-- Content -->
                  <div class="flex-grow-1 ml-1">
                    <div class="d-flex justify-content-between align-items-center mb-50">
                      <div>
                        <h5 class="mb-0 font-weight-bolder">
                          {{ item.category }}
                        </h5>
                        <div class="details-text mb-50">
                          <feather-icon icon="TruckIcon" size="14" />
                          <span class="ml-50">{{ item.lorry_number }}</span>
                        </div>

                        <div class="details-text mb-50">
                          <feather-icon icon="UserIcon" size="14" />
                          <span class="ml-50">{{ item.user_name }}</span>
                        </div>
                        
                        <div class="expiry-text text-danger font-weight-bold">
                          <feather-icon icon="CalendarIcon" size="14" />
                          <span class="ml-50">Expires: {{ item.expired_date }}</span>
                        </div>
                      </div>
                      <div>

                      </div>
                    </div>
                  </div>

                </div>
              </b-card>
            </div>
          </b-col>





          <b-col lg="4" md="12" sm="12" class="mb-2 mb-md-0">
            <b-card no-body class="earnings-card">
              <div class="py-3 px-2">
                <h4 class="font-weight-bolder">
                  ආරම්භක මුළු ශේෂය
                </h4>
                <h4 class="mb-0 font-weight-bolder">
                  Rs: {{ (today_start_amount).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") }}
                </h4>
                <b-img src="@/assets/images/logo/login.png" class="congratulation-medal mt-2" width="50" alt="Login" />
              </div>
            </b-card>
          </b-col>



          <b-col lg="4" md="12" sm="12" class="mb-2 mb-md-0">
            <b-card no-body class="earnings-card">
              <b-card-body class="">
                <b-row>
                  <b-col lg="6" md="12" sm="12" class=" mb-md-0">

                    <div class="my-1 d-sm-flex">
                      <b-avatar size="35" variant='light-success'>
                        <feather-icon size="20" icon='BoxIcon' />
                      </b-avatar>
                      <div>
                        <b-row>
                          <b-col>
                            <div class="text-container">
                              <h4 class=" font-weight-bolder mb-1 ml-1">
                                <!-- මුළු ලාභය -->
                                ප්ලාස්ටික් අයිතම විකුණුම් ලාභය
                              </h4>
                              <h4 class="font-weight-bolder mb-0 ml-1">
                                Rs {{ (today_profit).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") }}
                              </h4>
                            </div>
                          </b-col>
                        </b-row>
                      </div>
                    </div>
                  </b-col>
                </b-row>
              </b-card-body>
            </b-card>
          </b-col>

          <b-col lg="4" md="12" sm="12" class="mb-2 mb-md-0">
            <b-card no-body class="earnings-card">
              <b-card-body class="">
                <b-row>
                  <b-col lg="6" md="12" sm="12" class="mb-2 mb-md-0">

                    <div class="my-1 d-sm-flex">
                      <b-avatar size="35" variant='light-info'>
                        <feather-icon size="20" icon='DollarSignIcon' />
                      </b-avatar>
                      <div>
                        <b-row>
                          <b-col>
                            <div class="text-container">
                              <h4 class=" font-weight-bolder mb-0 ml-1">
                                මාරු කිරීමට ඇති චෙක්පත්
                              </h4>
                              <h4 class="font-weight-bolder mb-0 ml-1 ">
                                <div class="text-primary mt-50">
                                  <div @click="$router.push('/admin-cheque?tab=2')">
                                    ලබාගැනීමට ඇති : {{ total_income_cheque }}
                                  </div>
                                  <div @click="$router.push('/admin-cheque?tab=4')" class="text-danger mt-50">
                                    ගෙවීමට ඇති : {{ total_expenditure_cheque }}
                                  </div>
                                </div>
                              </h4>
                            </div>
                          </b-col>
                        </b-row>
                      </div>
                    </div>
                  </b-col>
                </b-row>
              </b-card-body>
            </b-card>
          </b-col>

          <b-col lg="4" md="12" sm="12" class="mb-2 mb-md-0">
            <b-card no-body class="earnings-card">
              <b-card-body class="">
                <b-row>
                  <b-col lg="6" md="12" sm="12" class="mb-2 mb-md-0">

                    <div class="d-sm-flex">
                      <b-avatar size="35" variant='light-success'>
                        <feather-icon size="20" icon='DollarSignIcon' />
                      </b-avatar>
                      <div>
                        <b-row>
                          <b-col>
                            <div class="text-container">
                              <h4 class=" font-weight-bolder mb-0 ml-1">
                                මුළු ආදායම
                              </h4>
                              <h4 class="font-weight-bolder mb-0 ml-1">
                                <div class="mt-50">Rs:
                                  {{ (today_income).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") }}
                                </div>
                              </h4>
                            </div>
                          </b-col>
                        </b-row>
                      </div>
                    </div>
                  </b-col>
                </b-row>
              </b-card-body>
            </b-card>
          </b-col>
          <b-col lg="4" md="12" sm="12" class="mb-2 mb-md-0">
            <b-card no-body class="earnings-card">
              <b-card-body class="">
                <b-row>
                  <b-col md="3" sm="12" class="mb-2 mb-md-0">

                    <div class="d-sm-flex">
                      <b-avatar size="35" variant='light-primary'>
                        <feather-icon size="20" icon='DollarSignIcon' />
                      </b-avatar>
                      <div>
                        <b-row>
                          <b-col>
                            <div class="text-container">
                              <h4 class=" font-weight-bolder mb-0 ml-1">
                                මුළු ඉතිරිය
                              </h4>
                              <h4 class="font-weight-bolder mb-0 ml-1">
                                <div class="mt-50">Rs:
                                  {{ ((today_income -
                                    today_expenditure).toFixed(2)).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") }}
                                </div>
                              </h4>
                            </div>
                          </b-col>
                        </b-row>
                      </div>
                    </div>
                  </b-col>
                </b-row>
              </b-card-body>
            </b-card>
          </b-col>

          <b-col lg="4" md="12" sm="12" class="mb-2 mb-md-0">
            <b-card no-body class="earnings-card">
              <b-card-body class="">
                <b-row>
                  <b-col lg="6" md="12" sm="12" class="mb-2 mb-md-0">

                    <div class="d-sm-flex">
                      <b-avatar size="35" variant='light-danger'>
                        <feather-icon size="20" icon='DollarSignIcon' />
                      </b-avatar>
                      <div>
                        <b-row>
                          <b-col>
                            <div class="text-container">
                              <h4 class=" font-weight-bolder mb-0 ml-1">
                                මුළු වියදම
                              </h4>
                              <h4 class="font-weight-bolder mb-0 ml-1 ">
                                <div class="mt-50">Rs:
                                  {{ (today_expenditure).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") }}
                                </div>
                              </h4>
                            </div>
                          </b-col>
                        </b-row>
                      </div>
                    </div>
                  </b-col>
                </b-row>
              </b-card-body>
            </b-card>
          </b-col>


          <b-col lg="4" md="12" sm="12" class="mb-2 mb-md-0">
            <b-card no-body class="earnings-card" @click="$router.push('/admin-cash')">
              <b-card-body class="">
                <b-row>
                  <b-col lg="12" md="12" sm="12" class="mb-2 mb-md-0">

                    <div class="d-sm-flex">
                      <b-avatar size="35" variant='light-warning'>
                        <feather-icon size="20" icon='DollarSignIcon' />
                      </b-avatar>
                      <div>
                        <b-row>
                          <b-col>
                            <div class="text-container">
                              <h4 class=" font-weight-bolder mb-0 ml-1">
                                මුදල් ( {{ (today_payment_cash -
                                  today_payment_cash_expenditure).toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g,
                                    ",") }} )
                              </h4>
                              <h4 class="font-weight-bolder mb-0 ml-1 ">
                                <div class="text-primary mt-50">Rs:
                                  {{ (today_payment_cash).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") }}

                                  <div class="text-danger mt-50">Rs:
                                    {{ (today_payment_cash_expenditure).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                                    }}
                                  </div>
                                </div>
                              </h4>
                            </div>
                          </b-col>
                        </b-row>
                      </div>
                    </div>
                  </b-col>
                </b-row>
              </b-card-body>
            </b-card>
          </b-col>
          <b-col lg="4" md="12" sm="12" class="mb-2 mb-md-0">
            <b-card no-body class="earnings-card" @click="$router.push('/admin-card')">
              <b-card-body class="">
                <b-row>
                  <b-col md="3" sm="12" class="mb-2 mb-md-0">

                    <div class="d-sm-flex">
                      <b-avatar size="35" variant='light-success'>
                        <feather-icon size="20" icon='DollarSignIcon' />
                      </b-avatar>
                      <div>
                        <b-row>
                          <b-col>
                            <div class="text-container">
                              <h4 class=" font-weight-bolder mb-0 ml-1">
                                කාඩ් ( {{ (today_payment_card -
                                  today_payment_card_expenditure).toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g,
                                    ",") }} )
                              </h4>
                              <h4 class="font-weight-bolder mb-0 ml-1 ">
                                <div class="text-primary mt-50">Rs:
                                  {{ (today_payment_card).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") }}

                                  <div class="text-danger mt-50">Rs:
                                    {{ (today_payment_card_expenditure).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                                    }}
                                  </div>
                                </div>
                              </h4>
                            </div>
                          </b-col>
                        </b-row>
                      </div>
                    </div>
                  </b-col>
                </b-row>
              </b-card-body>
            </b-card>
          </b-col>

          <b-col lg="4" md="12" sm="12" class="mb-2 mb-md-0">
            <b-card no-body class="earnings-card" @click="$router.push('/admin-cheque')">
              <b-card-body class="">
                <b-row>
                  <b-col lg="12" md="12" sm="12" class="mb-2 mb-md-0">

                    <div class="d-sm-flex">
                      <b-avatar size="35" variant='light-info'>
                        <feather-icon size="20" icon='DollarSignIcon' />
                      </b-avatar>
                      <div>
                        <b-row>
                          <b-col>
                            <div class="text-container">
                              <h4 class=" font-weight-bolder mb-0 ml-1">
                                චෙක්පත් ( {{ (today_payment_cheque -
                                  today_payment_cheque_expenditure).toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g,
                                    ",") }} )
                              </h4>
                              <h4 class="font-weight-bolder mb-0 ml-1 ">
                                <div class="text-primary mt-50">Rs:
                                  {{ (today_payment_cheque).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") }}

                                  <div class="text-danger mt-50">Rs:
                                    {{ (today_payment_cheque_expenditure).toString().replace(/\B(?=(\d{3})+(?!\d))/g,
                                      ",") }}
                                  </div>
                                </div>
                              </h4>
                            </div>
                          </b-col>
                        </b-row>
                      </div>
                    </div>
                  </b-col>
                </b-row>
              </b-card-body>
            </b-card>
          </b-col>


          <b-col lg="6" md="12" sm="12">
            <b-card no-body class="card-statistics">
              <b-card-body>
                <h4 class="d-flex justify-content-center">අයිතම ගැණුම් / විකුණුම්</h4>
                <b-row>
                  <b-col lg="6" md="12" sm="12" class="my-2 mb-md-0">
                    <b-media no-body @click="$router.push('/sale-order_list')">
                      <b-media-aside class="mr-2">
                        <b-avatar size="35" variant="light-primary">
                          <feather-icon size="20" icon="TrendingUpIcon" />
                        </b-avatar>
                      </b-media-aside>
                      <b-media-body class="my-auto">
                        <h4 class="font-weight-bolder mb-0">
                          අයිතම විකුණුම්
                          <!-- Sales -->
                        </h4>
                        <h4 class="font-weight-bolder mb-0"> Rs: {{
                          (hardware_income).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") }}</h4>
                      </b-media-body>
                    </b-media>
                  </b-col>
                  <b-col lg="6" md="12" sm="12" class="my-2 mb-md-0">
                    <b-media no-body @click="$router.push('/order_list')">
                      <b-media-aside class="mr-2">
                        <b-avatar size="35" variant="light-danger">
                          <feather-icon size="20" icon="TrendingDownIcon" />
                        </b-avatar>
                      </b-media-aside>
                      <b-media-body class="my-auto">
                        <h4 class="font-weight-bolder mb-0">
                          අයිතම ගැණුම්
                          <!-- Purchase -->
                        </h4>
                        <h4 class="font-weight-bolder mb-0">Rs: {{
                          (hardware_expenditure).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") }} </h4>
                      </b-media-body>
                    </b-media>
                  </b-col>
                  <b-col lg="6" md="12" sm="12" class="my-2 mb-md-0">
                    <b-media no-body @click="$router.push('/plastic-sale-order_list')">
                      <b-media-aside class="mr-2">
                        <b-avatar size="35" variant="light-success">
                          <feather-icon size="20" icon="TrendingUpIcon" />
                        </b-avatar>
                      </b-media-aside>
                      <b-media-body class="my-auto">
                        <h4 class="font-weight-bolder mb-0">
                          ප්ලාස්ටික් අයිතම විකුණුම්
                          <!-- Plastic Sales -->
                        </h4>
                        <h4 class="font-weight-bolder mb-0"> Rs: {{
                          (hardware_return_income).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") }} </h4>
                      </b-media-body>
                    </b-media>
                  </b-col>
                  <b-col lg="6" md="12" sm="12" class="my-2 mb-md-0">
                    <b-media no-body @click="$router.push('/plastic-order_list')">
                      <b-media-aside class="mr-2">
                        <b-avatar size="35" variant="light-warning">
                          <feather-icon size="20" icon="TrendingDownIcon" />
                        </b-avatar>
                      </b-media-aside>
                      <b-media-body class="my-auto">
                        <h4 class="font-weight-bolder mb-0">
                          <!-- Plastic විකුණුම් -->
                          ප්ලාස්ටික් අයිතම ගැණුම්
                          <!-- Plastic Purchase -->
                        </h4>
                        <h4 class="font-weight-bolder mb-0"> Rs: {{
                          (return_hardware_expenditure).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") }} </h4>
                      </b-media-body>
                    </b-media>
                  </b-col>
                </b-row>
              </b-card-body>
            </b-card>
          </b-col>
          <b-col lg="6" md="12" sm="12">
            <b-card no-body class="card-statistics">
              <b-card-body @click="$router.push('/admin-expenses')">
                <h4 class="d-flex justify-content-center">වියදම් ( Rs. {{
                  (total_expenditure).toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") }})</h4>
                <b-row>
                  <b-col lg="6" md="12" sm="12" class="my-2 mb-md-0">
                    <b-media no-body>
                      <b-media-aside class="mr-2">
                        <b-avatar size="35" variant="light-info">
                          <feather-icon size="20" icon="ArchiveIcon" />
                        </b-avatar>
                      </b-media-aside>
                      <b-media-body class="my-auto">
                        <h4 class="font-weight-bolder mb-0">
                          ආයතන වියදම
                        </h4>
                        <h4 class="font-weight-bolder mb-0"> Rs: {{
                          (company_expenditure).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") }} </h4>
                      </b-media-body>
                    </b-media>
                  </b-col>
                  <b-col lg="6" md="12" sm="12" class="my-2 mb-md-0">
                    <b-media no-body>
                      <b-media-aside class="mr-2">
                        <b-avatar size="35" variant="light-warning">
                          <feather-icon size="20" icon="UsersIcon" />
                        </b-avatar>
                      </b-media-aside>
                      <b-media-body class="my-auto">
                        <h4 class="font-weight-bolder mb-0">
                          කාරයමණ්ඩල වියදම
                        </h4>
                        <h4 class="font-weight-bolder mb-0"> Rs: {{
                          (staff_expenditure).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") }} </h4>
                      </b-media-body>
                    </b-media>
                  </b-col>
                  <b-col lg="6" md="12" sm="12" class="my-2 mb-md-0">
                    <b-media no-body>
                      <b-media-aside class="mr-2">
                        <b-avatar size="35" variant="light-danger">
                          <feather-icon size="20" icon="TruckIcon" />
                        </b-avatar>
                      </b-media-aside>
                      <b-media-body class="my-auto">
                        <h4 class="font-weight-bolder mb-0">
                          වාහන වියදම
                        </h4>
                        <h4 class="font-weight-bolder mb-0"> Rs: {{
                          (vehicle_expenditure).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") }} </h4>
                      </b-media-body>
                    </b-media>
                  </b-col>
                  <b-col lg="6" md="12" sm="12" class="my-2 mb-md-0">
                    <b-media no-body>
                      <b-media-aside class="mr-2">
                        <b-avatar size="35" variant="light-success">
                          <feather-icon size="20" icon="ShoppingBagIcon" />
                        </b-avatar>
                      </b-media-aside>
                      <b-media-body class="my-auto">
                        <h4 class="font-weight-bolder mb-0">
                          වෙනත් වියදම
                        </h4>
                        <h4 class="font-weight-bolder mb-0"> Rs: {{
                          (other_expenditure).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") }} </h4>
                      </b-media-body>
                    </b-media>
                  </b-col>
                </b-row>
              </b-card-body>
            </b-card>
          </b-col>

          <b-col  cols="12">
            <b-card>
              <apex-line-chart />
            </b-card>
          </b-col>
          <b-col  cols="12">
            <b-card>
              <apex-sell-line-chart />
            </b-card>
          </b-col>
          <b-col  cols="12">
            <b-card>
              <apex-plastic-line-chart />
            </b-card>
          </b-col>
          <b-col  cols="12">
            <b-card>
              <apex-plastic-sell-line-chart />
            </b-card>
          </b-col>
        </b-row>
</template>

<script>
/* eslint-disable global-require */
import { BAlert, BLink, BCardSubTitle, BButton, BImg, BBadge, BFormGroup, BFormInput, BDropdownDivider, BCard, BCardBody, BCol, BRow, BMedia, BMediaBody, BCardText, BMediaAside, BCardTitle, BCardHeader, BAvatar, BFormFile, } from 'bootstrap-vue'
import VuexyLogo from '@core/layouts/components/Logo.vue';
import admin from "@/apis/modules/admin";
import SaleChart from './ChartjsHorizontalBarChart.vue';
import ApexLineChart from './ApexLineChart.vue'
import ApexSellLineChart from './ApexSellLineChart.vue'
import ApexPlasticLineChart from './ApexPlasticLineChart.vue'
import ApexPlasticSellLineChart from './ApexPlasticSellLineChart.vue'
import order from "@/apis/modules/order";
import driver from "@/apis/modules/driver";
import profile from "@/apis/modules/profile";
import flatPickr from 'vue-flatpickr-component';

export default {
  components: {
    flatPickr,
    BFormGroup,
    BCardSubTitle,
    BFormInput,
    SaleChart,
    BFormFile,
    BBadge,
    BAlert,
    VuexyLogo,
    BLink,
    BButton,
    BImg,
    BCard,
    BCardBody,
    BCol,
    BRow,
    BMedia,
    BMediaBody,
    BCardText,
    BMediaAside,
    BCardTitle,
    BCardHeader,
    BAvatar,
    BDropdownDivider,
    ApexLineChart,
    ApexSellLineChart,
    ApexPlasticLineChart,
    ApexPlasticSellLineChart,
  },
  data() {
    let today = new Date();
    let last_date = new Date();
    today.setDate(today.getDate() - 1);
    last_date.setDate(today.getDate() - 6);
    return {

      rangeDate: null,
      start_date: null,
      end_date: null,
      today: new Date().toISOString().slice(0, 10),
      date: new Date(),
      price: '',
      priceState: '',
      formattedDate: '',
      formattedFirstDate: '',
      today_income: 0,
      today_profit: 0,
      today_expenditure: 0,
      today_start_amount: 0,

      today_payment_cash: 0,
      today_payment_card: 0,
      today_payment_cheque: 0,
      today_payment_cash_expenditure: 0,
      today_payment_card_expenditure: 0,
      today_payment_cheque_expenditure: 0,
      total_income_cheque: 0,
      total_expenditure_cheque: 0,


      cashier_hold_profit: 0,
      cashier_hold_loss: 0,
      cashier_cash: 0,
      cashier_card: 0,
      cashier_cheque: 0,
      cashier_cash_expenditure: 0,
      cashier_card_expenditure: 0,
      cashier_cheque_expenditure: 0,
      total_hold_profit: 0,
      total_hold_loss: 0,

      hardware_income: 0,
      hardware_return_income: 0,
      hardware_expenditure: 0,
      return_hardware_expenditure: 0,

      company_expenditure: 0,
      staff_expenditure: 0,
      vehicle_expenditure: 0,
      other_expenditure: 0,

      loan: 0,
      loan_get: 0,
      loan_pay: 0,

      cashier_income: 0,
      cashier_profit: 0,
      cashier_expenditure: 0,
      cashier_start_amount: 0,
      bank_amount: 0,
      bank_total: 0,
      company: 0,
      sale: 0,
      total_shops: 0,
      sum: 0,
      shop_sum: 0,
      store_sum: 0,
      amount_shop: 0,
      amount_store: 0,
      today: new Date().toISOString().slice(0, 10),
      yesterday: today.toISOString().slice(0, 10),
      lastday: last_date.toISOString().slice(0, 10),
      submittedPriceNames: [],
      notifications: [],
    }
  },
  computed: {

  },

  watch: {
    rangeDate(newVal) {
      if (!newVal || newVal.length === 0) return
      this.dateAdd()
    }
  },

  async mounted() {

    window.addEventListener('keydown', this.handleKeydown);
      await this.getAdminDate()
      await this.dashboardSmss()


  },
  beforeDestroy() {
    window.removeEventListener('keydown', this.handleKeydown);
  },
  methods: {

    async dashboardSmss() {
      try {
        const response = await driver.getDashboardSmss();

        console.log(response.data);

        this.notifications = response.data;
      } catch (error) {
        console.error(error);
      }
    },

    async cancelZero() {
      try {
        this.isLoading = true
        await admin.cancelZero()
        await this.getAdminDate()
        this.isLoading = false
      } catch (error) {
        this.isLoading = false
      }
    },

    async dateAdd() {
      try {
        let startDate, endDate;

        if (this.rangeDate.includes(' to ')) {
          [startDate, endDate] = this.rangeDate.split(' to ');
        } else {
          startDate = endDate = this.rangeDate;
        }

        const formattedStartDate = new Date(startDate).toISOString().split('T')[0];
        const formattedEndDate = new Date(endDate).toISOString().split('T')[0];

        this.payload = {
          start_date: formattedStartDate,
          end_date: formattedEndDate,
        }
        const status = (await admin.getAdminAllDashboards(1, this.payload))
        this.today_view = status.data.today_view
        this.bank_amount = status.data.bank_card
        this.bank_total = status.data.bank_total
        this.company = status.data.company_card
        this.sale = status.data.sale_card
        this.total_shops = status.data.total_shops

        this.today_income = status.data.today_payment_income
        this.today_profit = status.data.today_payment_profit
        this.today_expenditure = status.data.today_payment_expenditure
        this.today_start_amount = status.data.today_payment_start_amount

        this.today_payment_cash = status.data.today_payment_cash
        this.today_payment_card = status.data.today_payment_card
        this.today_payment_cheque = status.data.today_payment_cheque
        this.today_payment_cash_expenditure = status.data.today_payment_cash_expenditure
        this.today_payment_card_expenditure = status.data.today_payment_card_expenditure
        this.today_payment_cheque_expenditure = status.data.today_payment_cheque_expenditure

        this.cashier_income = status.data.cashier_payment_income
        this.cashier_profit = status.data.cashier_payment_profit
        this.cashier_expenditure = status.data.cashier_payment_expenditure
        this.cashier_start_amount = status.data.cashier_payment_start_amount

        this.cashier_hold_profit = status.data.cashier_payment_hold_profit
        this.cashier_hold_loss = status.data.cashier_payment_hold_loss
        this.cashier_cash = status.data.cashier_payment_cash
        this.cashier_card = status.data.cashier_payment_card
        this.cashier_cheque = status.data.cashier_payment_cheque
        this.cashier_cash_expenditure = status.data.cashier_payment_cash_expenditure
        this.cashier_card_expenditure = status.data.cashier_payment_card_expenditure
        this.cashier_cheque_expenditure = status.data.cashier_payment_cheque_expenditure

        this.total_income_cheque = status.data.total_income_cheque
        this.total_expenditure_cheque = status.data.total_expenditure_cheque

        this.total_hold_profit = status.data.today_payment_hold_profit
        this.total_hold_loss = status.data.today_payment_hold_loss

        this.hardware_income = status.data.today_payment_hardware_income
        this.hardware_return_income = status.data.today_payment_hardware_return_income
        this.hardware_expenditure = status.data.today_payment_hardware_expenditure
        this.return_hardware_expenditure = status.data.today_payment_hardware_return_expenditure

        this.company_expenditure = status.data.today_payment_company_expenditure
        this.staff_expenditure = status.data.today_payment_staff_expenditure
        this.vehicle_expenditure = status.data.today_payment_vehicle_expenditure
        this.other_expenditure = status.data.today_payment_other_expenditure
        this.total_expenditure = status.data.today_payment_total_expenditure

        this.loan = status.data.loan
        this.loan_get = status.data.today_payment_loan_get
        this.loan_pay = status.data.today_payment_loan_pay

      } catch (error) {
      }
    },


    handleKeydown(event) {
      if (event.altKey && event.key.toLowerCase() === 'e') {
        event.preventDefault();
        this.customAction();
      }
      if (event.altKey && event.key.toLowerCase() === 'q') {
        event.preventDefault();
        this.customOldAction();
      }
      if (event.altKey && event.key.toLowerCase() === 'c') {
        event.preventDefault();
        this.customOnAction();
      }
      if (event.altKey && event.key.toLowerCase() === 'o') {
        event.preventDefault();
        window.location = '/admin-calendar';
      }
    },

    async customAction() {

      try {
        this.isLoading = true
        await admin.intermediaryNewRateUpdate()
        await this.getAdminDate()
        this.isLoading = false
      } catch (error) {
        this.isLoading = false
      }
    },

    async customOldAction() {

      try {
        this.isLoading = true
        await admin.intermediaryOldRateUpdate()
        await this.checkAdmin()
        await this.getAdminDate()
        this.isLoading = false
      } catch (error) {
        this.isLoading = false
      }
    },

    async customOnAction() {

      try {
        this.isLoading = true
        await admin.intermediaryOnRateUpdate()
        this.isLoading = false
      } catch (error) {
        this.isLoading = false
      }
    },




    async TodayData() {
      try {
        this.isLoading = true
        const response = await order.TodayDatas()
        first_date = response.data.first_date.price
        second_date = response.data.second_date.price
        third_date = response.data.third_date.price
        forth_date = response.data.forth_date.price
        fifth_date = response.data.fifth_date.price
        six_date = response.data.six_date.price
        seven_date = response.data.seven_date.price
      } catch (error) {
      }
    },


    async setDate() {
      this.todayDate = new Date();
      const year = this.todayDate.getFullYear(); // Get the current year

      const monthNumber = this.todayDate.getMonth(); // Get the current month (0-11)
      const monthNames = [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'
      ];
      const month = monthNames[monthNumber];

      const formattedMonth = year + '-' + month;
      this.payload = {
        month: formattedMonth
      }

      await admin.setDate(this.payload);
    },

    async setMonth() {
      this.todayDate = new Date();
      const year = this.todayDate.getFullYear(); // Get the current year

      const monthNumber = this.todayDate.getMonth(); // Get the current month (0-11)
      const monthNames = [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'
      ];
      const month = monthNames[monthNumber];

      const formattedMonth = year + '-' + month;
      this.payload = {
        month: formattedMonth
      }
      await admin.setMonth(this.payload);
    },

    async setYear() {
      this.todayDate = new Date();
      const formattedYear = this.todayDate.getFullYear(); // Get the current year

      this.payload = {
        year: formattedYear
      }
      await admin.setYear(this.payload);
    },

    async setOrder() {
      this.todayDate = new Date();
      const formattedYear = this.todayDate.getFullYear(); // Get the current year

      this.payload = {
        year: formattedYear
      }
      await admin.setOrder(this.payload);
    },


    async getAdminDate() {
      const status = (await admin.getAdminDate())
      this.today_date = status.data.date

      if (this.today_date == 1) {
        await this.getAdminYear()
        await this.getAdmin()

      } else {
        await this.setDate()
        await this.setMonth()
        await this.getAdminYear()
        await this.getAdmin()
        await this.setOrder()
      }

    },

    async getAdminYear() {
      const status = (await admin.getAdminYear())
      this.today_year = status.data.year
      if (this.today_year == 1) {
      } else {
        await this.setYear()
      }

    },


    async getAdmin() {

      this.payload = {
        start_date: null,
        end_date: null,
      }
      const status = (await admin.getAdminAllDashboards(1, this.payload))
      this.today_view = status.data.today_view
      this.bank_amount = status.data.bank_card
      this.bank_total = status.data.bank_total
      this.company = status.data.company_card
      this.sale = status.data.sale_card
      this.total_shops = status.data.total_shops

      this.today_income = status.data.today_payment_income
      this.today_profit = status.data.today_payment_profit
      this.today_expenditure = status.data.today_payment_expenditure
      this.today_start_amount = status.data.today_payment_start_amount

      this.today_payment_cash = status.data.today_payment_cash
      this.today_payment_card = status.data.today_payment_card
      this.today_payment_cheque = status.data.today_payment_cheque
      this.today_payment_cash_expenditure = status.data.today_payment_cash_expenditure
      this.today_payment_card_expenditure = status.data.today_payment_card_expenditure
      this.today_payment_cheque_expenditure = status.data.today_payment_cheque_expenditure

      this.cashier_income = status.data.cashier_payment_income
      this.cashier_profit = status.data.cashier_payment_profit
      this.cashier_expenditure = status.data.cashier_payment_expenditure
      this.cashier_start_amount = status.data.cashier_payment_start_amount


      this.cashier_hold_profit = status.data.cashier_payment_hold_profit
      this.cashier_hold_loss = status.data.cashier_payment_hold_loss
      this.cashier_cash = status.data.cashier_payment_cash
      this.cashier_card = status.data.cashier_payment_card
      this.cashier_cheque = status.data.cashier_payment_cheque
      this.cashier_cash_expenditure = status.data.cashier_payment_cash_expenditure
      this.cashier_card_expenditure = status.data.cashier_payment_card_expenditure
      this.cashier_cheque_expenditure = status.data.cashier_payment_cheque_expenditure
      this.total_income_cheque = status.data.total_income_cheque
      this.total_expenditure_cheque = status.data.total_expenditure_cheque
      this.total_hold_profit = status.data.today_payment_hold_profit
      this.total_hold_loss = status.data.today_payment_hold_loss

      this.hardware_income = status.data.today_payment_hardware_income
      this.hardware_return_income = status.data.today_payment_hardware_return_income
      this.hardware_expenditure = status.data.today_payment_hardware_expenditure
      this.return_hardware_expenditure = status.data.today_payment_hardware_return_expenditure

      this.company_expenditure = status.data.today_payment_company_expenditure
      this.staff_expenditure = status.data.today_payment_staff_expenditure
      this.vehicle_expenditure = status.data.today_payment_vehicle_expenditure
      this.other_expenditure = status.data.today_payment_other_expenditure
      this.total_expenditure = status.data.today_payment_total_expenditure


      this.loan = status.data.loan
      this.loan_get = status.data.today_payment_loan_get
      this.loan_pay = status.data.today_payment_loan_pay
    },





    async getUsers() {
      try {
        const Response = await product.getDasStore()

      } catch (error) {
        this.convertAndNotifyError(error);
        this.tableLoading = false;
      }
    },
  }
}
</script>

<style lang="scss">
.text-container {
  width: 100%;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}

.notification-card {
  border: none;
  border-left: 5px solid #ea5455;
  border-radius: 12px;
  box-shadow: 0 2px 12px rgba(34, 41, 47, 0.08);
  transition: all 0.25s ease;
}

.notification-card h5 {
  font-size: 1.3rem;
}

.notification-card .details-text {
  font-size: 1.1rem;
}

.notification-card .expiry-text {
  font-size: 1.15rem;
}

.notification-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(34, 41, 47, 0.15);
}

.notification-icon {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background: rgba(234, 84, 85, 0.12);
  display: flex;
  align-items: center;
  justify-content: center;
  color: #ea5455;
}

.notification-container {
  height: 360px;
  overflow-y: auto;
  padding-right: 5px;
}

.notification-container::-webkit-scrollbar {
  width: 6px;
}

.notification-container::-webkit-scrollbar-thumb {
  background: #c5c5c5;
  border-radius: 10px;
}

.notification-card {
  border: none;
  border-left: 5px solid #ea5455;
  border-radius: 12px;
  box-shadow: 0 2px 10px rgba(34, 41, 47, 0.08);
  transition: all 0.3s ease;
}

.notification-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 20px rgba(34, 41, 47, 0.15);
}

.notification-icon {
  width: 25px;
  height: 25px;
  min-width: 25px;
  border-radius: 50%;
  background: rgba(234, 84, 85, 0.12);
  color: #ea5455;
  display: flex;
  align-items: center;
  justify-content: center;
}

.details-text {
  font-size: 10px;
  margin-top: 4px;
  color: #6e6b7b;
}

.expiry-text {
  font-weight: 600;
  color: #ea5455;
}

.notification-card h5 {
  font-size: 15px;
}

@import '@core/scss/vue/pages/page-misc.scss';
</style>
<style lang="scss">
@import '@core/scss/vue/libs/vue-flatpicker.scss';
</style>