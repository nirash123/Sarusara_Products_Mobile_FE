<template>
    <div>
        <b-card no-body>
  
     <div class="m-2">
  
      <b-row>

        <b-col
          cols="12" md="6"
          class="d-flex align-items-center justify-content-start mb-1 mb-md-0"
        >
          <label>Entries</label>
          <v-select
            v-model="pagination.perPage"
            :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
            :options="pageOptions"
            :clearable="false"
            class="per-page-selector d-inline-block ml-50 mr-1"
          />
          <b-form-group>
            <flat-pickr
                v-model="filters['order_date']"
                class="form-control mt-75"
                />
    </b-form-group>
        </b-col>
  
        <b-col
          cols="12"
          md="6"
        >
          <div class="d-flex align-items-center justify-content-end">
            <b-form-input
              v-model="filters['id_or_cus_id']"
              class="d-inline-block mr-1"
              placeholder="Search..."
            />
          </div>
        </b-col>
      </b-row>
  
    </div>
   
    <b-row class="m-2">
      <b-col cols="12">
        <b-overlay :show="tableLoading" rounded="sm">
          <b-table
            ref="table"
            :current-page="currentPage"
            :fields="fields"
            :items="getUsers"
            :per-page="pagination.perPage"
            :sort-by.sync="sortBy"
            :sort-desc.sync="sortDesc"
            :sort-direction="sortDirection"
            :filter="filter"
            :filter-included-fields="filterOn"
            class="mobile_table_css"
            hover
            responsive
          >
            <template #cell(item)="data">
                <div>
                  <span class="ml-1"> {{ data.item.item }}</span> 
                 </div>
                 <div>
                  <span class="ml-1 text-primary"> {{ data.item.item_code }}</span> 
                 </div>
            </template>
  
            <template #cell(quentity)="data">
                  <span class="ml-1"> 
                    <b-form-checkbox
                    :checked="data.item.active_status"
                     @change="handleChange(data.item.id,data.item.active_status)"
                  >{{ data.item.quentity }} {{ data.item.unit }} </b-form-checkbox>
                  </span> 
            </template>

            
        
            <template #cell(actions)="data">
                    <div class="text-nowrap">
                            <b-button
                                class="single-line-text" variant="primary"
                                id="toggle-btn-price"
                                v-ripple.400="'rgba(113, 102, 240, 0.15)'"
                                @click="addItem(data.item.id)"
                            >
                            <span class="align-middle"> Add</span>
                            </b-button>
                    </div>
            </template>
  
          </b-table>
        </b-overlay>
      </b-col>
  
      <b-col cols="12">
        <div
          v-if="pagination.totalRows == 0">
          <div class="d-flex flex-column align-items-center justify-content-center h-100">
          <div class="empty-state py-2">
            <img class="img-fluid " src="@/assets/images/pages/doc-icon.png" alt="" width="100">
            <p class="txt-grey mt-1">No order Items</p>
          </div>
        </div>
      </div>
      </b-col>
  
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
    </b-card>
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
  import item from "@/apis/modules/item";
  import flatPickr from 'vue-flatpickr-component'
  
  export default {
    components: {
      flatPickr,
      BImg,
      BTable,
      BAvatar,
      BBadge,
      BRow,
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

    
        return {
        }
      },
    mixins: [ErrorMessages, SuccessMessage, MomentMixin, Filter],
    data() {
      return {
        todayDate: new Date(),
        dateDefault: null,
        userData: JSON.parse(localStorage.getItem('userData')),
        filters: {},
        jobRoleOption: [],
        tableLoading: false,
        noDataTable: "",
        pageOptions: [5, 10, 25, 50, 100, 250],
        currentPage: 1,
        pagination: {
          perPage: "",
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
        
        
        fields: [
        {
            key: "bill_number",
            label: "bill number",
          },
          {
            key: "quentity",
            label: "quentity",
            sortable: true,
          },
          {
            key: "item",
            label: "item name",
            sortable: true,
          },
          {
            key: "sale_price",
            label: "sale price",
          },
          {
            key: "order_date",
            label: "date",
            sortable: true,
          },
        ],
        items: [],
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


      callparentfunction() {
        this.$parent.$parent.$parent.sendInvitation();
      },
      async getUsers() {
        try {
          this.tableLoading = true;
          if (this.sortBy == "") {
            this.sortDesc = true;
          }
          const Response = await item.getOrderItems(
              this.filterQuery, this.currentPage, this.pagination.perPage, this.sortBy, this.sortDesc);
          const dataArray = Response.data.data.map((x) => ({
            id: x.sale_order_items_id,
            order_date:x.sale_order_items_order_date,
            item_code: x.sale_order_items_item_code,
            item: x.sale_order_items_item,
            bill_number: x.sale_order_items_bill_number,
            quentity: x.sale_order_items_quentity,
            unit: x.sale_order_items_unit,
            sale_price: 'Rs: ' + (x.sale_order_items_sale_price).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","), 
            active_status: x.sale_order_items_active_status == 1? false: true,
  
          }));
          this.noDataTable = Response.data.data.length;
          const paginationResponse = Response.data;
          this.currentPage = paginationResponse.current_page;
          this.pagination.totalRows = paginationResponse.total;
          this.pagination.perPage = paginationResponse.per_page;
          this.pagination.from = paginationResponse.from;
          this.pagination.to = paginationResponse.to;
          this.tableLoading = false;
          return dataArray
        } catch (error) {
          this.convertAndNotifyError(error);
          this.tableLoading = false;
        }
      },

      async handleChange(id,status){
        try {
          if(status == true){
            this.payload = {
              active_status: 1,
             }
         this.isLoading = true
        await item.updateOrderStatus(id,this.payload)
        }else{
          this.payload = {
          active_status: 0,
         }
         this.isLoading = true
        await item.updateOrderStatus(id,this.payload)
        }
        this.isLoading = false
      }
        catch (error) {
         this.isLoading = false
       }

       
      },
      
      async addItem(id) {
  
          try {
            this.tableLoading = true
            this.$swal({
              title: 'Are you sure you added this Item?',
              text: '',
              icon: 'warning',
              showCancelButton: true,
              confirmButtonText: 'Yes, add',
              cancelButtonText: 'No, go back',
              customClass: {
                confirmButton: 'btn btn-primary',
                cancelButton: 'btn btn-outline-danger ml-1'
              },
              buttonsStyling: false
            }).then(async result => {
              if (result.value) {
               await item.addItem(id)
                this.showSuccessMessage('Item has been added')
                this.refreshTable();
              } else if (result.dismiss == 'cancel') {
                this.formLoading = false
                this.showSuccessMessage('Cancelled')
              }
            })
  
            this.tableLoading = false
  
          } catch (error) {
            this.convertAndNotifyError(error)
            this.tableLoading = false
          }
      },
  
      refreshTable(){
        this.$refs.table.refresh()
      },
  
      filterQueryUpdate() {
        this.$refs.table.refresh();
      },
  

  
    },
  
    mounted() {
      if(JSON.parse(localStorage.getItem('userData')).admin_role == 'TBSAdmin' ){
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
  
  .per-page-selector {
  width: 90px;
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
  </style>

  <style lang="scss">
  @import '@core/scss/vue/libs/vue-flatpicker.scss';
  </style>