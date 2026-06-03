<template>
    <div>
       <b-row>
        <b-col cols="12" md="8">
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
                      <b-row @click="pos()">
                          <b-col cols="12">
                                <b-row>
                                  <b-col sm="12" md="3" lg="3" v-for="project in getData" :key="project.id">
                                    <b-card @click="addtocart(project.id, project.item_code, project.item_name, project.unit)" class="border" rounded="50">
                                      <b-row >
                                        <b-col sm="12" md="12" lg="12">
                                          <div>
                                            <h4 class="d-flex  justify-content-center mt-50">
                                              {{ (project.item_code).slice(0, 18) }} </h4>
                                            <h5 class="d-flex justify-content-center mt-50">
                                              {{ (project.item_name).slice(0, 20) }} </h5>
                                              <h5 class="d-flex justify-content-center ">
                                              {{ project.company_price}} </h5>
                                              <h5 class="d-flex justify-content-center ">
                                                <span v-if="parseInt(project.quentity) < parseInt(project.amount_reduction)" class="ml-2 bg-danger rounded-circle"><span class="p-2 text-white">{{ project.quentity }} {{ project.unit }}</span></span>
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
                              :items="getItems"
                              :filter="filter"
                              :filter-included-fields="filterOn"
                          >
                          </b-table>
                      </b-overlay>
                          </b-col>
                      </b-row>
                     </b-col>
                 </b-row>
                 <b-row>
                    <b-col sm="12" md="12" lg="12">
                      <b-card block  class="bg-primary" rounded="50">
                        <h4 class="d-flex justify-content-center text-white">Old Ordered Items</h4>
                        </b-card>
                      </b-col>
                      </b-row>
                 <b-row >
                          <b-col cols="12">
                                <b-row>
                                  <b-col sm="12" md="3" lg="3" v-for="project in getBeforeData" :key="project.id">
                                    <b-card  class="border" rounded="50">
                                      <b-row >
                                        <b-col sm="12" md="12" lg="12">
                                          <div>
                                            <h5 class="d-flex justify-content-center mt-50">
                                              {{ (project.item_name).slice(0, 20) }} | ({{ project.unit }})</h5>
                                              <h4 class="d-flex  justify-content-center mt-50">
                                                Order {{ project.order_id }} </h4>
                                              <h5 class="d-flex justify-content-center ">
                                              {{ project.order_date}} </h5>
                                              <h5 class="d-flex justify-content-center ">
                                                <span class="ml-2 bg-primary rounded-circle"><span class="p-2 text-white">{{ project.quentity }} </span></span></h5>
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
                                      <span v-if="pagination1.totalRows !== 0" class="text-muted"
                                          >Showing {{ pagination1.from }} to {{ pagination1.to }} of
                                          {{ pagination1.totalRows }} entries</span>
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
                                          v-model="currentPage1"
                                          :per-page="pagination1.perPage"
                                          :total-rows="pagination1.totalRows"
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
                              :current-page="currentPage1"
                              :items="getBeforeItems"
                              :filter="filter"
                              :filter-included-fields="filterOn"
                          >
                          </b-table>
                      </b-overlay>
                          </b-col>
                      </b-row>
        </b-col>
           <b-col
           cols="12" md="4">
           <b-card  no-body class="p-1">
            <div class="mt-1">
                       
                        <b-row >
                              <b-col cols="6">
                                  <dt><h4 class="mt-50">Company Name:</h4></dt>
                              </b-col>
                              <b-col cols="6" class="d-flex justify-content-end">
                              <div style="width: 100% !important">
                                  <figure class="media" >
                                 <figcaption class="media-body">
                                    <v-select
                                      id="shop-id-input"
                                      v-model="shop_id"
                                      :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
                                      label="shop_name"
                                      value="id"
                                      :options="shop_names"
                                      required
                                    />
                                  </figcaption>
                                  </figure>
                               </div>  
                              </b-col>
                          </b-row>
                          </div>
               <div class="card">
                 <span id="cart">
                    <table style="height: 830px;" class="table table-hover shopping-cart-wrap table-responsive">

                      <!-- Company Order Item List -->

                       <thead>
                          <tr>
                             <th scope="col" width="500">Item Name</th>
                             <th scope="col" width="150">Qty</th>
                             <th scope="col" class="text-right" width="150">Delete</th>
                          </tr>
                       </thead>
                       <tbody>
                          <tr v-for="product in carts" :key="product.id" >
                             <td>
                                <figure class="media">
                                   <figcaption class="media-body"> 
                                      <h6 class="title text-truncate">{{ (product.item_name).slice(0, 25) }} | {{ product.unit }} </h6>
                                      <div class="text-primary">
                                       ( {{ (product.item_code).slice(0, 18) }} )
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
                                           v-model="product.quentity"
                                           @change="updateCompanyQuentity(product.id, product.quentity)"
                                       />
                                   </figcaption>
                                </figure>
                             </td>
                             <td class="text-right"> 
                               <b-button
                                       class="btn btn-outline-danger"
                                       variant="gradient-danger"
                                       @click="deleteCompanyCart(product.id)"
                                       >
                                       <feather-icon
                                           icon="TrashIcon"
                                       />
                                       </b-button>
                               </td> 
                          </tr>
                       </tbody>
                       </table>
                   
                   
                 </span>
                 <hr>
                 <div class="text-right">
                  <b-button
                      :class="{ 'btn-loading': isLoading }" :disabled="isLoading"
                        type="submit"
                        variant="primary"
                        block
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
  import shop from "@/apis/modules/shop";
  
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
        image: '',
        bar_category: 0,
        barCategories: [],
        shop_names: [],
      customer_id: null,
      image: '',
      form: {
          user_name: '',
          address: '',
          phone_no: '',
          identity_code: '',
          active_status:'',
        },
        getData: '',
        getBeforeData: '',
        errorPhone:'',
        errorID:'',
        errorUserName:'',
       item_code: '',
       isLoading: false,
       discount: 0, 
       sale_discount: 0,
       sum_company: 0,
       customer_id:'',
       discount: 0,
       sum_total: 0,
     
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
       currentPage1: 1,
       pagination: {
         perPage: "8",
         pageOptions: "",
         totalRows: "",
         from: "",
         to: "",
       },
       pagination1: {
         perPage: "8",
         pageOptions: "",
         totalRows: "",
         from: "",
         to: "",
       },
       sortBy: "",
       sortDesc: false,
       sortDirection: "asc",
       sortBy1: "",
       sortDesc1: false,
       sortDirection1: "asc",
       filter: null,
       filterOn: [],
       infoModal: {
         id: "info-modal",
         title: "",
         content: "",
       },
       todayDate: new Date(),
       calendar_date: new Date().toISOString().split('T')[0],
       userData: JSON.parse(localStorage.getItem('userData')),
       cashier_id: '',
       
       
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
       shop_id: '',
       items: [],
       carts: [],
       return_carts: [],
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

    async shopsData(){
      try {
        const response = await shop.shopsData()
        this.shop_names = response.data.data
        } catch (error) {
          
        }
    },

    async getAdminCompanyCarts(){
         try {
         const response = await item.getAdminCompanyCarts(JSON.parse(localStorage.getItem('userData')).id)
         this.carts = response.data.data
         this.$refs.nameInput.focus();
         } catch (error) {
         }
     },

    handleCardClick(project) {
      this.filters.category = project.id;
    },

    async groupData(){
      try {
        const response = await product.barCategoryData()
        this.groups = response.data.data
      
        } catch (error) {
          
        }
    },
  
     callparentfunction() {
       this.$parent.$parent.$parent.sendInvitation();
     },
     refreshPage(){
    this.$refs.nameInput.focus();
  },

     async addQRCode(item_code){
      try {
         this.payload = {
          cashier_id: JSON.parse(localStorage.getItem('userData')).id,
          item_code: item_code,
         }
         this.isLoading = true
         const response = await item.addQRToCompanyCart(this.payload)
         this.getAdminCompanyCarts()
         this.getItems()
         this.getBeforeItems()
         this.item_code = ''
         this.$refs.nameInput.focus();
         this.isLoading = false
       } catch (error) {
         this.item_code = ''
         this.isLoading = false
       }
   },


  
     async submitData(){
  
      if (this.shop_id) {
       try {

          this.payload = {
           cashier_id: JSON.parse(localStorage.getItem('userData')).id,
           items_count: this.carts.length,
           shop_id: this.shop_id.id,
           cart: this.carts,
           }
           this.isLoading = true
           const response = await item.submitCompanyCart(this.payload)
           this.showSuccessMessage('Submit Product Successfully')
         //  this.$router.push('/dashboard')
          this.getAdminCompanyCarts()
          this.getBeforeItems()
          this.shop_id = null
           this.$refs.nameInput.focus();
           this.isLoading = false
   
         } catch (error) {
           this.isLoading = false
         }
        
        }else{
          this.showErrorMessage('Please Add Company Name.')
            this.$refs.nameInput.focus();
     }
   },

   
  
     async updateCompanyQuentity(id,quentity){
       try {
           this.payload = {
             id: id,
             quentity: quentity,
           }
           this.isLoading = true
           await item.updateCompanyQuentity(id,this.payload)
           this.getAdminCompanyCarts()
           this.$refs.nameInput.focus();
           this.isLoading = false
         } catch (error) {
          this.getAdminCompanyCarts()
          this.$refs.nameInput.focus();
           this.isLoading = false
         }
     },


  
     async deleteCompanyCart(id){
      this.payload1 = {
               cashier_id: JSON.parse(localStorage.getItem('userData')).id,
           }
  
          await item.deleteCompanyCart(id, this.payload1)
           this.getAdminCompanyCarts()
           this.getBeforeItems()
           this.$refs.nameInput.focus();
           this.isLoading = false
     },


     async addtocart(id, item_code,item_name, unit){
        
        try {
           this.payload = {
               cashier_id: JSON.parse(localStorage.getItem('userData')).id,
               item_id: id,
               item_code,
               item_name: item_name,
               unit: unit,

           }
           this.isLoading = true
           const response = await item.addProductToCompanyCart(this.payload)
           this.getAdminCompanyCarts()
           this.getBeforeItems()
           this.$refs.nameInput.focus();
           this.isLoading = false
         } catch (error) {
           this.isLoading = false
         }
     },

  
       async getItems() {
      try {
        this.tableLoading = true;
        if (this.sortBy == "") {
          this.sortDesc = true;
        }
        const Response = await product.getCompanyShopProducts(
           this.filterQuery, this.currentPage, this.pagination.perPage, this.sortBy, this.sortDesc);
        const dataArray = Response.data.data.map((x) => ({
          id: x.id,
          item_code: x.item_code,
          item_name: x.item_name,
          category: x.categories_category_name,
          sale_price: "Rs: " + x.sale_price,
          quentity: x.quentity,
          company_price: "( Rs: " + x.company_price + " )",
          active_status: x.active_status,
          amount_reduction: x.amount_reduction,
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
        this.getData = dataArray
      } catch (error) {
        this.convertAndNotifyError(error);
        this.tableLoading = false;
      }
    },

    async getBeforeItems() {
      try {
        this.tableLoading = true;
        this.cashier_id= JSON.parse(localStorage.getItem('userData')).id;
        if (this.sortBy1 == "") {
          this.sortDesc1 = true;
        }
        const Response1 = await product.getCompanyBeforeProducts(
          this.cashier_id, this.filterQuery1, this.currentPage1, this.pagination1.perPage, this.sortBy1, this.sortDesc1);
        const dataArray = Response1.data.data.map((x) => ({
          id: x.id,
          item_name: x.item_name,
          order_id: x.order_id,
          order_date: x.order_date,
          quentity: x.quentity,
          unit: x.unit,

        }));
        this.noDataTable = Response1.data.data.length;
        const paginationResponse = Response1.data;
        this.currentPage1 = paginationResponse.current_page;
        this.pagination1.totalRows = paginationResponse.total;
        this.pagination1.perPage = paginationResponse.per_page;
        this.pagination1.from = paginationResponse.from;
        this.pagination1.to = paginationResponse.to;
        this.tableLoading = false;
        this.getBeforeData = dataArray
      } catch (error) {
        this.convertAndNotifyError(error);
        this.tableLoading = false;
      }
    },

      async pos(){
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
       this.shopsData()
       this.getAdminCompanyCarts()
       this.getBeforeItems()
       this.groupData()
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