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
            v-model="filters['active_status']"
            :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
            :options="statusOptions"
            :reduce="(statusOptions) => statusOptions.value"
            class="invoice-filter-select"
            placeholder="Select Status"
          >
                {{ filters['active_status'] }}
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
        <span class="align-middle"> Add New Bank</span>
        </b-button>
        <b-modal
          id="modal-prevent-closing-price"
          centered
          ref="my-modal-price"
          title="Add New Bank Details"
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
                    label="Bank Name"
                    label-for="bank_name"
                    invalid-feedback="Bank name required"
                >
                    <b-form-input
                        ref="codeInput"
                        id="bank_name"
                        v-model="bank_name"
                        :state="bank_name_status"
                        placeholder="Enter bank name"
                        required
                    />
                </b-form-group>
              </b-col>
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
  icon="EditIcon"
  size="16"
  @click="$router.push({ name: 'edit-bank-details', params: { id: data.item.id }})"
/>
</b-button>

<!-- <b-button
                  v-ripple.400="'rgba(255, 255, 255, 0.15)'"
                  variant="outline-primary"
                  class="btn-icon mr-50"
                >
<feather-icon
  :id="`invoice-row-${data.item.id}-preview-icon`"
  icon="TrashIcon"
  size="16"
  @click="deleteBank(data.item.id)"
/>
</b-button> -->

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
          <p class="txt-grey mt-1 ml-2">No Banks</p>
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
import bank from "@/apis/modules/bank";


export default {
  components: {
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
      { label: 'Active Banks', value: 1 },
      { label: 'InActive Banks', value: 2 },
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
      avatar: require('@/assets/images/avatars/shop.png'),
      managers: [],
      filters: {},
      jobRoleOption: [],
      tableLoading: false,
      noDataTable: "",
      pageOptions: [5, 10, 25],
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

      bank_name: '',
      
      submittedPriceNames: [],

      bank_name_status: null,
      
      
      fields: [
        {
          key: "bank_name",
          label: "bank name",
          sortable: true,
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
        const Response = await bank.getBanks(
            this.filterQuery, this.currentPage, this.pagination.perPage, this.sortBy, this.sortDesc);
        const dataArray = Response.data.data.map((x) => ({
          id: x.id,
          bank_name: x.bank_name,
          active_status: x.active_status,
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
    
    async deleteBank(id) {

        try {
          this.tableLoading = true
          this.$swal({
            title: 'Are you sure you want to delete this bank?',
            text: '',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, delete',
            cancelButtonText: 'No, go back',
            customClass: {
              confirmButton: 'btn btn-primary',
              cancelButton: 'btn btn-outline-danger ml-1'
            },
            buttonsStyling: false
          }).then(async result => {
            if (result.value) {
             await bank.bankDelete(id)
              this.showSuccessMessage('Bank has been deleted')
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

    checkFormValidityPrice() {
        const valid = this.$refs.form.checkValidity()

        this.bank_name_status = valid
        return valid
      },

      resetModalPrice() {
        
        this.bank_name = ''

        this.bank_name_status = null
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
          this.bank_name,
)
        this.companyPrice(
          this.bank_name,
        )
        
        // Hide the modal manually
        this.$nextTick(() => {
          this.$refs['my-modal-price'].toggle('#toggle-btn-price')
        })
      },

      async companyPrice(bank_name) {
        try {
                this.payload = {
                    bank_name: bank_name,
                    active_status: 1,
                }
                this.isLoading = true
                const response = await bank.bankCreate(this.payload)
                this.showSuccessMessage('Create Category Successfully')
                this.$refs.table.refresh();
                this.isLoading = false
              } catch (error) {
                error.response.data.data.bank_name? this.showErrorMessage('The bank name has been already taken.'):''
                this.isLoading = false
              }
      },

  },

  mounted() {
  
     if(JSON.parse(localStorage.getItem('userData')).admin_role !== 'TBSAdmin'){
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
