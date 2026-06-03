<template>
  <div>
      <b-card no-body>

   <div class="m-2">

    <!-- Table Top -->
    <b-row>

      <!-- Per Page -->
      <b-col
        cols="12" md="5"
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

        <v-select
            v-model="filters['level']"
            :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
            :options="statusOptions"
            :reduce="(statusOptions) => statusOptions.value"
            class="invoice-filter-select"
            placeholder="Select Level"
          >
                {{ filters['level'] }}
          </v-select>
      </b-col>

      <!-- Search -->
      <b-col
        cols="12"
        md="7"
      >
      <div class="d-flex align-items-center justify-content-end">
            <b-form-input
            v-model="filters['name_or_email']"
              class="d-inline-block mr-1"
              placeholder="Search..."
            /> 
            <b-button
            class="single-line-text" variant="primary"
            id="toggle-btn-price"
            v-ripple.400="'rgba(113, 102, 240, 0.15)'"
            v-b-modal.modal-prevent-closing-price
          >
          <span class="align-middle"> Add Customer</span>
          </b-button>
          <b-modal
            id="modal-prevent-closing-price"
            centered
            ref="my-modal-price"
            title="Add New Customer"
            ok-title="Submit"
            cancel-variant="outline-secondary"
            @show="resetModalPrice"
            @hidden="resetModalPrice"
            @ok="handleOkPrice"
          >
            <form
              ref="form"
              @submit.stop.prevent="handleSubmitPrice"
            >
            <b-col sm="12" md="12" >
                  <b-form-group
                      label="Customer Code"
                      label-for="user_code"
                      invalid-feedback="User Code required"
                  >
                      <b-form-input
                          ref="codeInput"
                          id="user_code"
                          v-model="user_code"
                          :state="user_code_status"
                          placeholder="Enter customer code"
                          required
                      />
                  </b-form-group>
                </b-col>

            <b-col sm="12" md="12" >
                  <b-form-group
                      label="Customer Name"
                      label-for="user_name"
                      invalid-feedback="User name required"
                  >
                      <b-form-input
                          ref="codeInput"
                          id="user_name"
                          v-model="user_name"
                          :state="user_name_status"
                          placeholder="Enter customer name"
                          required
                      />
                  </b-form-group>
                </b-col>


                  <b-col sm="12" md="12" >
                  <b-form-group
                      label="Address"
                      label-for="address"
                      invalid-feedback="Address is required"
                  >
                      <b-form-input
                          id="address"
                          v-model="address"
                          :state="address_status"
                          placeholder="Enter Address"
                      />
                  </b-form-group>
                </b-col>

                <b-col sm="12" md="12" >
                  <b-form-group
                      label="Mobile Number"
                      label-for="phone"
                      invalid-feedback="Mobile Number is required"
                  >
                      <b-form-input
                          id="phone"
                          v-model="phone_no"
                          :state="phone_no_status"
                          placeholder="Enter mobile number"
                      />
                  </b-form-group>
                </b-col>

                
                <!-- <b-col sm="12" md="12" >
                  <b-form-group
                      label="NIC Number"
                      label-for="identity_code"
                      invalid-feedback="NIC Number is required"
                  >
                      <b-form-input
                          id="identity_code"
                          v-model="identity_code"
                          :state="identity_code_status"
                          placeholder="Enter mobile number"
                      />
                  </b-form-group>
                </b-col> -->
            </form>
          </b-modal>
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
        <template #cell(id)="data">
          CU 0{{ data.item.id }} 
          </template>
          <!-- <template  #cell(image)="data">
            <div style="width: 150px;">
            <ul class="list-inline mb-0" >
              <li class="list-inline-item">
                <b-img
                  fluid
                  rounded
                  style="height: 150px; width: 150px"              
                  :src="'https://smakagent.com/hardware/images/'  + data.item.image"
                />
                 
              </li>
            </ul>
            </div>
          </template> -->
          <template #cell(user_name)="data">
            {{ data.item.user_name}}
            <div>
            {{ data.item.address}}
            </div>
          </template>

          <template #cell(level)="data">
                <b-form-rating
                                              class="d-flex justify-content-center mt-50 ml-1"
                                                no-border
                                                v-model="data.item.level"
                                                inline
                                                variant="warning"
                                                readonly
                                              />
          </template>

          <template #cell(active_status)="data">
              <b-badge v-if="data.item.active_status == '1'" class="ml-1" style="padding: 8px" variant="light-success">
                  Active
              </b-badge>
              <b-badge v-if="data.item.active_status == '2'" class="ml-1" style="padding: 8px" variant="light-warning">
                  InActive 
              </b-badge>
          </template>

          

          <!-- Column: Actions -->
          <template  #cell(actions)="data">
  
                <div  class="text-nowrap">
                  <b-button
                                  v-ripple.400="'rgba(255, 255, 255, 0.15)'"
                                  variant="outline-primary"
                                  class="btn-icon mr-50"
                                >
                <feather-icon
                  :id="`invoice-row-${data.item.id}-preview-icon`"
                  icon="EyeIcon"
                  size="16"
                  @click="$router.push({ name: 'view-customer-details', params: { id: data.item.id }})"
                />
                </b-button>
                
                <b-dropdown
                v-if="userData.id == 1"
                  variant="link"
                  toggle-class="p-0"
                  no-caret
                  :right="$store.state.appConfig.isRTL"
                >
                
                  <template #button-content>
                    <b-button
                                  v-ripple.400="'rgba(255, 255, 255, 0.15)'"
                                  variant="outline-primary"
                                  class="btn-icon mr-50"
                                >
                    <feather-icon
                      icon="MoreVerticalIcon"
                      size="16"
                      class="align-middle text-body"
                    />
                    </b-button>
                  </template>
                  <b-dropdown-item :to="{ name: 'edit-customer-details', params: { id: data.item.id } }">
                    <feather-icon icon="EditIcon" />
                    <span class="align-middle ml-50">Edit</span>
                  </b-dropdown-item>
                  <!-- <b-dropdown-item  @click="deleteCustomer(data.item.id)">
                    <feather-icon icon="TrashIcon" />
                    <span class="align-middle ml-50">Delete</span>
                  </b-dropdown-item> -->
                </b-dropdown>
                <b-button v-else
                                  v-ripple.400="'rgba(255, 255, 255, 0.15)'"
                                  variant="outline-primary"
                                  class="btn-icon mr-50"
                                >
                <feather-icon
                  :id="`invoice-row-${data.item.id}-preview-icon`"
                  icon="EditIcon"
                  size="16"
                  @click="$router.push({ name: 'edit-customer-details', params: { id: data.item.id }})"
                />
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
          <img class="img-fluid " src="@/assets/images/pages/user-icon.png" alt="" width="100">
          <p class="txt-grey mt-1">No Customers</p>
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
  BFormRating,
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
import admin from "@/apis/modules/admin";

export default {
  components: {
    BFormRating,
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
    const statusOptions = [
      { label: 'All', value: 0 },
      { label: 'Level 1 Customers', value: '1' },
      { label: 'Level 2 Customers', value: '2' },
      { label: 'Level 3 Customers', value: '3' },
      { label: 'Level 4 Customers', value: '4' },
      { label: 'Level 5 Customers', value: '5' },
    ]

    return {
      statusOptions,
    }
  },
  mixins: [ErrorMessages, SuccessMessage, MomentMixin, Filter],
  data() {
    return {
      userData: JSON.parse(localStorage.getItem('userData')),
      active_status:'',
      avatar: require('@/assets/images/avatars/avatar.png'),
      managers: [],
      filters: {},
      jobRoleOption: [],
      tableLoading: false,
      noDataTable: "",
      pageOptions: [5, 10, 25],
      currentPage: 1,
      image: '',
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
      user_code: '',
      user_name: '',
      address: '',
      phone_no: '',
      identity_code: '',

      submittedPriceNames: [],

      user_code_status: null,
      user_name_status: null,
      address_status: null,
      phone_no_status: null,
      identity_code_status: null,
      
      
      fields: [
      {
          key: "user_code",
          label: "Customer id",
        },
        // {
        //   key: "image",
        //   label: "photo",
        // },
        {
          key: "user_name",
          label: "user name / address",
        },
        {
          key: "phone_no",
          label: "mobile number",
        },
        // {
        //     key: "identity_code",
        //     label: "NIC Number",
        //   },
        {
          key: "level",
          label: "Customer Level",
        },
        {
          key: "active_status",
          label: "status",
        },
        {
          key: "actions",
          label: "actions",
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
        const Response = await admin.getCustomers(
            this.filterQuery, this.currentPage, this.pagination.perPage, this.sortBy, this.sortDesc);
        const dataArray = Response.data.data.map((x) => ({
          id: x.id,
          user_code: x.user_code,
          user_name: x.user_name,
          address: x.address ? x.address : "N/A",
          phone_no: x.phone_no ? x.phone_no : "N/A",
          identity_code: x.identity_code? x.identity_code: "N/A",
          active_status: x.active_status,
          image: x.image ,
          level: x.level,
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
    
    // async deleteCustomer(id) {

    //     try {
    //       this.tableLoading = true
    //       this.$swal({
    //         title: 'Are you sure you want to delete this customer?',
    //         text: '',
    //         icon: 'warning',
    //         showCancelButton: true,
    //         confirmButtonText: 'Yes, delete',
    //         cancelButtonText: 'No, go back',
    //         customClass: {
    //           confirmButton: 'btn btn-primary',
    //           cancelButton: 'btn btn-outline-danger ml-1'
    //         },
    //         buttonsStyling: false
    //       }).then(async result => {
    //         if (result.value) {
    //          await admin.customerDelete(id)
    //           this.showSuccessMessage('Customer has been deleted')
    //           this.refreshTable();
    //         } else if (result.dismiss == 'cancel') {
    //           this.formLoading = false
    //           this.showSuccessMessage('Cancelled')
    //         }
    //       })

    //       this.tableLoading = false

    //     } catch (error) {
    //       this.convertAndNotifyError(error)
    //       this.tableLoading = false
    //     }
    // },

    refreshTable(){
      this.$refs.table.refresh()
    },

    filterQueryUpdate() {
      this.$refs.table.refresh();
    },

    checkFormValidityPrice() {
          const valid = this.$refs.form.checkValidity()

          this.user_code_status = valid
          this.user_name_status = valid
          this.address_status = valid
          this.phone_no_status = valid
          this.identity_code_status = valid
          return valid
        },

        resetModalPrice() {
          this.user_code = ''
          this.user_name = ''
          this.address = ''
          this.phone_no = ''
          this.identity_code = ''

          this.user_code_status = null
          this.user_name_status = null
          this.address_status = null
          this.phone_no_status = null
          this.identity_code_status = null
        },

        handleOkPrice(bvModalEvt) {
          // Prevent modal from closing
          bvModalEvt.preventDefault()
          // Trigger submit handler
          this.handleSubmitPrice()
        },

          handleSubmitPrice() {
          // Exit when the form isn't valid
          if (!this.checkFormValidityPrice()) {
            return
          }
          this.submittedPriceNames.push(
            this.user_code,
            this.user_name,
            this.address,
            this.phone_no,
            this.identity_code,
)
          this.companyCustomer(
            this.user_code,
            this.user_name,
            this.address,
            this.phone_no,
            this.identity_code,
          )
          
          // Hide the modal manually
          this.$nextTick(() => {
            this.$refs['my-modal-price'].toggle('#toggle-btn-price')
          })
        },

        async companyCustomer(user_code, user_name,address,phone_no, identity_code) {
          try {
                  this.payload = {
                      user_code: user_code,
                      user_name: user_name,
                      address: address,
                      phone_no: phone_no,
                      identity_code: identity_code,
                  }
                  this.isLoading = true
                  const response = await admin.customerCreate(this.payload)
                  this.showSuccessMessage('Create Customer Successfully')
                  this.$refs.table.refresh();
                  this.isLoading = false
                } catch (error) {
                   error.response.data.data.user_code? this.showErrorMessage('The Customer code has been already taken.'):''
                  error.response.data.data.user_name? this.showErrorMessage('The Customer name has been already taken.'):''
                  error.response.data.data.phone_no? this.showErrorMessage('The Mobile number has been already taken.'):''
                  error.response.data.data.identity_code? this.showErrorMessage('The NIC number has been already taken.'):''
                  this.isLoading = false
                }
        },
  
  },

  mounted() {
    if(JSON.parse(localStorage.getItem('userData')).admin_role == 'TBSAdmin' || JSON.parse(localStorage.getItem('userData')).admin_role == 'TBSAccountant') {
    
     }else{
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
