<template>
    <div>
      <b-card @click="pos()" no-body
            class="card card-congratulations-profile">
  <!-- profile picture -->
  <div class="position-relative">
    <div class="profile-img-container d-flex align-items-center">
      <div class="profile-img">
        <b-button
        @click="$router.push('/return-ordres')"
    v-ripple.400="'rgba(40, 199, 111, 0.15)'"
    variant='light-dark'
    class="btn-icon mb-5 mx-2"
  >
  <feather-icon
              size="80"
              icon='ChevronsLeftIcon'
            />
  </b-button>



      </div>
      <!-- profile title -->
      <div class="profile-title ml-3">
        <h1 class="font-large-2 text-white">
          HR_ORD {{ orders.id }} 
        </h1>
 
      
      </div>
      
      
      <!--/ profile title -->
    </div>
  </div>
  </b-card>
       <b-row>
        <b-col cols="12" md="4">
            <b-row>
                      <b-col
                      cols="12" md="12">
                      <b-card no-body class="p-1">
                          <div class="d-flex align-items-center justify-content-end">
                              <input type="text" ref="nameInput" v-model="item_code" @change="addQRCode(item_code)" style="color: rgba(255, 255, 255, 0); border: none;  height: 0px; width: 0px;"  /> 
                              <b-img
                                  @click="pos()"
                                  width="40px"
                                  src="@/assets/images/logo/slogo.png"
                                  alt="logo"
                                />
                                <b-form-input
                                  v-model="filters['id_or_cus_id']"
                                      class="d-inline-block ml-1 mr-1"
                                      placeholder="Search..."
                                  />
                      </div>
                      </b-card>
                      <b-row v-if="carts.length < 20" @click="pos()">
                          <b-col cols="12">
                                <b-row>
                                  <b-col sm="12" md="6" lg="6" v-for="project in getReturnData" :key="project.id">
                                    <b-card @click="addtoReturncart(project.id)" class="border" rounded="50">
                                      <b-row >
                                        <b-col sm="12" md="12" lg="12">
                                          <div>
                                            <h4 class="d-flex  justify-content-center mt-50">
                                              {{ (project.item_code).slice(0, 18)  }} </h4>
                                            <h5 class="d-flex justify-content-center mt-50">
                                              <span class="text-primary">{{ (project.item_name).slice(0, 30) }} </span></h5>
                                              <h5 class="d-flex justify-content-center ">
                                              {{ project.company_price}} </h5>
                                              <h5 class="d-flex justify-content-center ">
                                                <span v-if="parseInt(project.quentity) < parseInt(project.amount_reduction) " class="ml-2 bg-danger rounded-circle"><span class="p-2 text-white">{{ project.quentity }} {{ project.unit }}</span></span>
                                                <span v-else class="ml-2 bg-success rounded-circle"><span class="p-2 text-white">{{ project.quentity }} {{ project.unit }}</span></span>
                                              </h5>  
                                          </div>
                                        </b-col>
                                      </b-row>
                                      </b-card>
                                </b-col>
                              </b-row>
                              <b-row>
                                <b-col
                                      class="
                                          d-flex
                                          align-items-center
                                          justify-content-center justify-content-sm-start
                                      "
                                      cols="12"
                                      sm="6"
                                      >
                                      <span v-if="pagination.totalRows !== 0" class="text-muted"
                                          >Showing {{ pagination.from }} to {{ pagination.to }} of
                                          {{ pagination.totalRows }} entries</span>
                                          <span v-else class="text-muted"
                                          >Showing 0 to 0 of 0 entries</span>
                                      </b-col>
                                  
                                      <b-col
                                      class="
                                          d-flex
                                          align-items-center
                                          justify-content-center justify-content-sm-end"
                                      cols="12"
                                      sm="6"
                                      >
                                      <b-pagination
                                          v-model="currentPage"
                                          :per-page="pagination.perPage"
                                          :total-rows="pagination.totalRows"
                                          first-number
                                          last-number
                                          next-class="next-item"
                                          prev-class="prev-item"
                                          class="pagination-primary"
                                      >
                                          <template #prev-text>
                                          <feather-icon icon="ChevronLeftIcon" size="18" class="pagination-primary" />
                                          </template>
                                  
                                          <template #next-text>
                                          <feather-icon icon="ChevronRightIcon" size="18" />
                                          </template>
                                      </b-pagination>
                                      </b-col>
                                </b-row>

                        <b-overlay :show="tableLoading" rounded="sm">
                          <b-table
                              ref="table"
                              :current-page="currentPage"
                              :items="getReturnItems"
                              :filter="filter"
                              :filter-included-fields="filterOn"
                          >
                          </b-table>
                      </b-overlay>
                          </b-col>
                      </b-row>
                     </b-col>
                 </b-row>

        </b-col>
           <b-col
           cols="12" md="8">
           <b-card  no-body class="px-1">
               <div  class="card">
                 <span id="cart">
                    <table style="height: 750px;" class="table table-hover shopping-cart-wrap table-responsive">
                       <thead>
                          <tr>
                             <th scope="col" width="500">Item Name ( {{ carts.length }} )</th>
                             <th scope="col" width="300">Return Price</th>
                             <th scope="col" width="150">Qty</th>
                             <th scope="col" width="200">Price</th>
                             <th scope="col" class="text-right" width="100">Delete</th>
                          </tr>
                       </thead>
                       <tbody>
                          <tr v-for="product in carts" :key="product.id" >
                             <td>
                                <figure class="media">
                                   <figcaption class="media-body"> 
                                      <h6 class="title text-truncate">{{ (product.item_name).slice(0, 30) }} | {{ product.unit }} </h6>
                                      <div>
                                       ( {{ (product.item_code).slice(0, 18)  }} )
                                      </div>
                                   </figcaption>
                                </figure>
                             </td>
                             <td>
                                <figure class="media">
                                   <figcaption class="media-body">
                                      <b-form-input
                                           id="name"
                                           class="mr-3"
                                           v-model="product.company_price"
                                           @change="updateHardwareReturnPrice(product.id, product.company_price)"
                                       />
                                   </figcaption>
                                </figure>
                             </td>
                             <td>
                                <figure class="media">
                                   <figcaption class="media-body">
                                      <b-form-input
                                           id="name"
                                           class="mr-3"
                                           v-model="product.quentity"
                                           @change="updateHardwareReturnQuentity(product.id, product.quentity)"
                                       />
                                   </figcaption>
                                </figure>
                             </td>
                             <td>
                                <figure class="media">
                                   <figcaption class="media-body">
                                      <h6 class="title text-truncate">Rs: {{((product.quentity * product.company_price).toFixed(2)).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") }} </h6>
                                   </figcaption>
                                </figure>
                             </td>
                             <td class="text-right"> 
                               <b-button
                                       class="btn btn-outline-danger"
                                       variant="gradient-danger"
                                       @click="deleteHardwareReturnCart(product.id)"
                                       >
                                       <feather-icon
                                           icon="TrashIcon"
                                       />
                                       </b-button>
                               </td> 
                          </tr>
                       </tbody>
                      </table>
                       <div class="box mt-1 px-3">
                        <hr>
                        <b-row >
                              <b-col cols="6">
                                <dt><h4>Sub Total:</h4></dt>
                              </b-col>
                              <b-col cols="6">
                                <dd  class="text-right"><h4>Rs: {{((cart_sum ).toFixed(2)).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}}</h4></dd>
                              </b-col>
                              <b-col  cols="6">
                                <dt><h4>Save:</h4></dt>
                              </b-col>
                              <b-col cols="6">
                                <dd  class="text-right"><h4>Rs: {{((cart_sum - orders.total ).toFixed(2)).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}}</h4></dd>
                              </b-col>
                              <b-col cols="6">
                                <dt class="b my-25"><h2>Total: </h2></dt>
                              </b-col>
                              <b-col cols="6">
                                <dd  class="text-right h4 b my-25"><h2> Rs: {{(orders.total).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}}</h2></dd> 
                               </b-col>
                          </b-row>
                          </div>
                   
                 </span>
                 <div class="text-right">
                  <b-button
                   v-if="(cart_sum - orders.total) == 0"
                      :class="{ 'btn-loading': isLoading }" :disabled="isLoading"
                        type="submit"
                        variant="primary"
                        block
                        @click="submitData()"
                      >
                      <span v-if="isLoading">Loading...</span>
                        <span v-else> Submit</span>
                 </b-button>
                 <b-button
                      v-else
                      :class="{ 'btn-loading': isLoading }" :disabled="isLoading"
                        type="submit"
                        variant="primary"
                        block
                        disabled
                        @click="submitData()"
                      >
                      <span v-if="isLoading">Loading...</span>
                        <span v-else> Submit</span>
                 </b-button>
                 
                 </div>
              </div>
           </b-card>
           </b-col>
       </b-row>
     
  
   </div>
  </template>
  
  <script>
  import {
   BImg,
   BAlert,
   BAvatar,
   BBadge,
   BButton,
   BCol,
   BContainer,
   BDropdown,
   BDropdownItem,
   BForm,
   BCard,
   BFormCheckbox,
   BFormDatepicker,
   BFormGroup,
   BFormInput,
   BFormInvalidFeedback,
   BFormSelect,
   BTableLite,
   BInputGroup,
   BInputGroupAppend,
   BInputGroupPrepend,
   BListGroup,
   BListGroupItem,
   BModal,
   BOverlay,
   BPagination,
   BRow,
   BSidebar,
   BTable,
   VBModal,
   BTabs,
   BTab,
  } from "bootstrap-vue";
  import Ripple from "vue-ripple-directive";
  import ErrorMessages from "@/mixins/ErrorMessages";
  import SuccessMessage from "@/mixins/SuccessMessage";
  import MomentMixin from "@/mixins/MomentMixin";
  import vSelect from "vue-select";
  import VuePerfectScrollbar from "vue-perfect-scrollbar";
  import draggable from "vuedraggable";
  import { ValidationObserver, ValidationProvider } from "vee-validate";
  import Filter from "@/mixins/FilterMixin";
  import { mapGetters } from "vuex";
  import product from "@/apis/modules/product";
  import item from "@/apis/modules/item";
  import admin from "@/apis/modules/admin";
  
  export default {
   components: {
     BImg,
     BTable,
     BAvatar,
     BBadge,
     BRow,
     BTabs,
     BTab,
     BCol,
     BFormGroup,
     BFormSelect,
     BPagination,
     BInputGroup,
     BFormInput,
     BInputGroupAppend,
     BButton,
     BDropdown,
     BDropdownItem,
     BOverlay,
     BInputGroupPrepend,
     BListGroup,
     BListGroupItem,
     vSelect,
     BCard,
     BModal,
     BTableLite,
     VBModal,
     BContainer,
     BAlert,
     BSidebar,
     BForm,
     BFormInvalidFeedback,
     BFormDatepicker,
     BFormCheckbox,
     VuePerfectScrollbar,
     draggable,
     ValidationProvider,
     ValidationObserver,
   },
   directives: {
     Ripple,
   },
   setup() {
    const statusOptions = [
        { label: 'All', value: 0 },
        { label: 'Active Employees', value: 1 },
        { label: 'InActive Employees', value: 2 },
      ]
  
      return {
        statusOptions,
      }
    },
   mixins: [ErrorMessages, SuccessMessage, MomentMixin, Filter],
   data() {
     return {
        getReturnData: [],
        orders: [],
        value: '',
        image: '',
        bar_category: 0,
        barCategories: [],
        shop_names: [],
      customer_id: null,
      image: '',
        getData: '',
        getdataLength: 0,
       item_code: '',
       isLoading: false,
       discount: 0, 
       sale_discount: 0,
       sum_company: 0,
       customer_id:'',
       discount: 0,
       sum_total: 0,
       profit: 0,
       credit:0,
       store_sum: 0,
       cart_sum: 0,
       sum: 0,
       bank_amount:0,
       card_status:0,
       cheque_status:0,
       total_return: 0,
       change_amount: 0,
       order_date: '',
       avatar: require('@/assets/images/avatars/shop.png'),
       managers: [],
       filters: {},
       jobRoleOption: [],
       tableLoading: false,
       noDataTable: "",
       pageOptions: [5, 10, 25, 50],
       currentPage: 1,
       pagination: {
         perPage: "8",
         pageOptions: "",
         totalRows: "",
         from: "",
         to: "",
       },
       sortBy: "",
       sortDesc: false,
       sortDirection: "asc",
       filter: null,
       filterOn: [],
       infoModal: {
         id: "info-modal",
         title: "",
         content: "",
       },
      
       sortDirection1: "asc",
       filter1: null,
       filterOn1: [],

       todayDate: new Date(),
       calendar_date: new Date().toISOString().split('T')[0],
       userData: JSON.parse(localStorage.getItem('userData')),
       shop_id: '',
       
       fields: [
         {
           key: "item_name",
           label: "item name",
         },
         {
           key: "category",
           label: "category",
           sortable: true,
         },
         {
           key: "quentity",
           label: "quantity",
           sortable: true,
         },
         {
           key: "sale_price",
           label: "sale price",
           sortable: true,
         },
         {
           key: "action",
           label: "action",
         },
         
  
       ],
       items: [],
       carts: [],
     };
   },
   watch: {
     filterQueryUpdate() {
       this.$refs.table.refresh();
     },
   },
   computed: {
     ...mapGetters(["currentUser"]),
   },
   methods: {

    async getAdminHardwareReturnCarts(){
         try {
         const response = await item.getAdminHardwareReturnCarts(this.userData.id)
         this.carts = response.data.data
         this.getTotalPrice()
         this.$refs.nameInput.focus();
         } catch (error) {
         }
     },

     async getAdminHardwareReturnOrderDetails(){
         try {
         const response = await item.getAdminHardwareReturnOrderDetails(this.$route.params.id)
         this.orders = response.data
         } catch (error) {
         }
     },



    handleCardClick(project) {
      this.filters.category = project.id;
    },
  
     callparentfunction() {
       this.$parent.$parent.$parent.sendInvitation();
     },
     refreshPage(){
    this.$refs.nameInput.focus();
  },

     async addQRCode(item_code){
      if(this.carts.length < 20){
      try {
         this.payload = {
          cashier_id: this.orders.id,
          item_code: item_code,
         }
         this.isLoading = true
         const response = await item.addQRToHardwareReturnCart(this.payload)
         this.getAdminHardwareReturnCarts()
         this.getReturnItems()
         this.item_code = ''
         this.$refs.nameInput.focus();
         this.isLoading = false
       } catch (error) {
         this.item_code = ''
         this.isLoading = false
       }
      }
   },

   
   async getAdmin(){

    const status = (await admin.getAdminDashboards(JSON.parse(localStorage.getItem('userData')).id))
    this.bank_amount = status.data.bank_card
    },

  
     async submitData(){
      this.todayDate = new Date();
      const year = this.todayDate.getFullYear();   
  
      const monthNumber = this.todayDate.getMonth(); 
      const monthNames = [
      'January', 'February', 'March', 'April', 'May', 'June',
          'July', 'August', 'September', 'October', 'November', 'December'
      ];
      const month = monthNames[monthNumber];
  
      const formattedYear = year;
      const formattedMonth = year + '-' + month;
  

       try {

          this.payload = {
           order_id: this.orders.id,
           year: formattedYear,
           month: formattedMonth,
           items_count: this.carts.length,
           subtotal: this.cart_sum,
           cart: this.carts,
           cashier_id: JSON.parse(localStorage.getItem('userData')).id,
          
           }
           this.isLoading = true
           const response = await item.submitHardwareReturnCart(this.payload)
           this.showSuccessMessage('Submit Product Successfully')
          this.getAdminHardwareReturnCarts()
          this.getReturnItems()
          this.$router.push('/return-ordres?tab=2')
          this.shop_id = null
          this.sale_discount = 0
          this.cash = 0
          this.total_return = 0
          this.card = 0
          this.cheque = 0
           this.$refs.nameInput.focus();
           this.isLoading = false
   
         } catch (error) {
           this.isLoading = false
         }

   },

   async updateHardwareReturnPrice(id,company_price){
       try {
           this.payload = {
             id: id,
             company_price: company_price,
           }
           this.isLoading = true
           await item.updateHardwareReturnPrice(id,this.payload)
           this.getAdminHardwareReturnCarts()
           this.$refs.nameInput.focus();
           this.isLoading = false
         } catch (error) {
          this.getAdminHardwareReturnCarts()
          this.$refs.nameInput.focus();
           this.isLoading = false
         }
     },

  
     async updateHardwareReturnQuentity(id,quentity){
       try {
           this.payload = {
             id: id,
             quentity: quentity,
           }
           this.isLoading = true
           await item.updateHardwareReturnQuentity(id,this.payload)
           this.getAdminHardwareReturnCarts()
           this.$refs.nameInput.focus();
           this.isLoading = false
         } catch (error) {
          this.getAdminHardwareReturnCarts()
          this.$refs.nameInput.focus();
           this.isLoading = false
         }
     },




  
     async deleteHardwareReturnCart(id){
  
          await item.deleteHardwareReturnCart(id)
           this.getAdminHardwareReturnCarts()
           this.$refs.nameInput.focus();
           this.isLoading = false
     },




      
     async addtoReturncart(id){
        
        try {
           this.payload = {
               cashier_id: JSON.parse(localStorage.getItem('userData')).id,
               item_id: id,
           }
           this.isLoading = true
           const response = await item.addProductToHardwareReturnCart(this.payload)
           this.getAdminHardwareReturnCarts()
           this.$refs.nameInput.focus();
           this.isLoading = false
         } catch (error) {
           this.isLoading = false
         }
     },

    async getReturnItems() {
      try {
        this.tableLoading = true;
        if (this.sortBy == "") {
          this.sortDesc = true;
        }
        const Response = await product.getCompanyReturnProducts(
           this.filterQuery, this.currentPage, this.pagination.perPage, this.sortBy, this.sortDesc);
        const dataArray = Response.data.data.map((x) => ({
          id: x.id,
          item_code: x.item_code,
          item_name: x.item_name,
          category: x.categories_category_name,
          quentity: x.quentity,
          company_price: "( Rs: " + x.company_price + " )",
          active_status: x.active_status,
          unit: x.unit,

        }));
        this.noDataTable = Response.data.data.length;
        const paginationResponse = Response.data;
        this.currentPage = paginationResponse.current_page;
        this.pagination.totalRows = paginationResponse.total;
        this.pagination.perPage = paginationResponse.per_page;
        this.pagination.from = paginationResponse.from;
        this.pagination.to = paginationResponse.to;
        this.tableLoading = false;
        this.getdataReturnLength = dataArray.length
        this.getReturnData = dataArray
      } catch (error) {
        this.convertAndNotifyError(error);
        this.tableLoading = false;
      }
    },


      async pos(){
            this.$refs.nameInput.focus();
      },


  
     async updateShopSaleDiscount(sale_discount){
    if(sale_discount < this.sum_total){
         this.isLoading = true
         this.getTotalSalePrice()
         this.$refs.nameInput.focus();
         this.isLoading = false
    }
    else{
      this.showErrorMessage('Sale Discount grater than Sub Total')
         this.sale_discount = 0
         this.isLoading = true
         this.getTotalSalePrice()
         this.$refs.nameInput.focus();
         this.isLoading = false
    }
   },

   async updateCash(){
    if(parseFloat(this.cash) <= parseFloat(this.bank_amount)){
         this.isLoading = true
         this.getTotalSalePrice()
         this.isLoading = false
         this.$refs.nameInput.focus();
    }else{
      this.showErrorMessage('Not enough cash for pay')
      this.cash = 0;
    }
        

   },


   async getTotalPrice() {
    this.store_sum = this.carts
     .map(cart => parseFloat(cart.quentity * cart.company_price)) 
     .reduce((total, quentity) => total + quentity , 0);

     
      this.cart_sum = this.store_sum;
      this.sum_total = this.cart_sum - this.sale_discount ;
      this.$refs.nameInput.focus();

     },

     async getTotalSalePrice() {
      this.store_sum = this.carts
     .map(cart => parseFloat(cart.quentity * cart.company_price)) 
     .reduce((total, quentity) => total + quentity , 0);

     
     this.cart_sum = this.store_sum;
     this.sum_total = this.cart_sum - this.sale_discount ;
     this.total_return = parseFloat(this.cash) + parseFloat(this.card) + parseFloat(this.cheque); 
      this.$refs.nameInput.focus();
     },


     refreshTable(){
       this.$refs.table.refresh()
       this.$refs.nameInput.focus();
     },
  
     filterQueryUpdate() {
       this.$refs.table.refresh();
      // this.$refs.nameInput.focus();
     },
  
   },
  
   mounted() {
    if(JSON.parse(localStorage.getItem('userData')).admin_role == 'TBSAdmin' || JSON.parse(localStorage.getItem('userData')).admin_role == 'TBSAccountant') {
       this.getAdminHardwareReturnOrderDetails()
       this.getReturnItems()
       this.getAdminHardwareReturnCarts()
       this.getAdmin()
       this.pos() 
     }
      else{
       this.$router.push('/')
      } 
   },
  };
  </script>
  <style lang="scss">
  @import "@core/scss/vue/libs/vue-select.scss";
  
  div#dropdown-1 .btn-outline-danger {
   border: none !important;
  }
  
  .custom-v-select {
    max-height: 50px;
  }
  
  .per-page-selector {
  width: 90px;
  }
  
  .table-container {
   min-height: 500px; /* Adjust the value to your desired minimum height */
  }
  
  .single-line-text {
   width: 180px;
  }
  
  .invoice-filter-select {
  min-width: 190px;
  }
  
  ::v-deep .vs__selected-options {
   flex-wrap: nowrap;
  }
  
  ::v-deep .vs__selected {
   width: 100px;
  }
  
  button {
   height: 38px;
  }

  .item-sections {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
}

.item-section {
    width: 30%; /* Adjust as needed */
    margin-bottom: 20px;
    border: 1px solid #ccc;
    padding: 10px;
}

.item-image img {
    width: 100%;
    height: auto;
}

.item-name {
    font-weight: bold;
    margin-bottom: 5px;
}

.item-id {
    font-size: 12px;
    color: #888;
}

.item-price {
    margin-top: 10px;
}

.regular-price {
    color: #888;
}

.sale-price {
    color: red;
}

.add-to-cart-btn {
    background-color: #007bff;
    color: #fff;
    border: none;
    padding: 5px 10px;
    cursor: pointer;
    border-radius: 5px;
    font-size: 14px;
}

.add-to-cart-btn:hover {
    background-color: #0056b3;
}
  </style>
  
  <style lang="scss">
  @media print {
    
  
    // Global Styles
    body {
      background-color: transparent !important;
    }
    nav.header-navbar {
      display: none;
    }
    .main-menu {
      display: none;
    }
    .header-navbar-shadow {
      display: none !important;
    }
    .content.app-content {
      margin-left: 0;
      padding-top: 2rem !important;
    }
    footer.footer {
      display: none;
    }
    .card {
      background-color: transparent;
      box-shadow: none;
    }
    .customizer-toggle {
      display: none !important;
    }
  
    // Invoice Specific Styles
    .invoice-preview-wrapper {
      .row.invoice-preview {
        .col-md-8 {
          max-width: 100%;
          flex-grow: 1;
        }
  
        .invoice-preview-card {
          .card-body:nth-of-type(2) {
            .row {
                > .col-12 {
                max-width: 50% !important;
              }
  
              .col-12:nth-child(2) {
                display: flex;
                align-items: flex-start;
                justify-content: flex-end;
                margin-top: 0 !important;
              }
            }
          }
        }
      }
  
      // Action Right Col
      .invoice-actions {
        display: none;
      }
    }
  }
  </style>