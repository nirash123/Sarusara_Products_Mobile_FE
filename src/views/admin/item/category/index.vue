<template>
  <div>
    <b-card no-body>

      <div class="m-2">

        <!-- Table Top -->
        <b-row>

          <!-- Per Page -->
          <b-col cols="12" md="5" class="d-flex align-items-center justify-content-start mb-1 mb-md-0">
            <label>Entries</label>
            <v-select v-model="pagination.perPage" :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
              :options="pageOptions" :clearable="false" class="per-page-selector d-inline-block ml-50 mr-1" />
          </b-col>

          <!-- Search -->
          <b-col cols="12" md="7">
            <div class="d-flex align-items-center justify-content-end">
              <b-form-input v-model="filters['name_or_email']" class="modern-search mr-1" placeholder="🔍 Search categories..." />

              <b-button class="modern-btn single-line-text" variant="primary" id="toggle-btn-price"
                v-ripple.400="'rgba(113, 102, 240, 0.15)'" v-b-modal.modal-prevent-closing-price>
                <span class="align-middle">Add Category</span>
              </b-button>
              <b-modal id="modal-prevent-closing-price" centered ref="my-modal-price" title="Add New Category"
                ok-title="Submit" cancel-variant="outline-secondary" @show="resetModalPrice" @hidden="resetModalPrice"
                @ok="handleOkPrice">
                <form ref="form" @submit.stop.prevent="handleSubmitPrice">
                  <b-form-group label="Category Name" label-for="price-input"
                    invalid-feedback="Category Name is required">
                    <b-form-input id="price-input" v-model="price" :state="priceState" required />
                  </b-form-group>
                </form>
              </b-modal>
            </div>
          </b-col>
        </b-row>

      </div>

      <b-row class="m-2">
        <b-col cols="12">
          <b-overlay :show="tableLoading" rounded="sm">
            <b-table ref="table" :current-page="currentPage" :fields="fields" :items="getUsers"
              :per-page="pagination.perPage" :sort-by.sync="sortBy" :sort-desc.sync="sortDesc"
              :sort-direction="sortDirection" :filter="filter" :filter-included-fields="filterOn"
              class="mobile_table_css" hover responsive>

              <!-- Column: Actions -->
              <template #cell(actions)="data">


                <div class="text-nowrap">


                  <b-button v-ripple.400="'rgba(255, 255, 255, 0.15)'" variant="outline-primary" class="btn-icon mr-50">
                    <feather-icon :id="`invoice-row-${data.item.id}-preview-icon`" icon="EditIcon" size="16"
                      @click="$router.push({ name: 'edit-shop-category-details', params: { id: data.item.id } })" />
                  </b-button>
                  <b-button v-if="data.item.active_status === 1" v-ripple.400="'rgba(255, 255, 255, 0.15)'"
                    variant="outline-danger" class="btn-icon mr-50">
                    <feather-icon :id="`invoice-row-${data.item.id}-preview-icon`" icon="TrashIcon" size="16"
                      @click="deleteCategory(data.item.id)" />
                  </b-button>
                  <b-button v-if="data.item.active_status === 2" v-ripple.400="'rgba(255, 255, 255, 0.15)'"
                    variant="outline-primary" class="btn-icon mr-50">
                    <feather-icon :id="`invoice-row-${data.item.id}-preview-icon`" icon="RefreshCcwIcon" size="16"
                      @click="reopenCategory(data.item.id)" />
                  </b-button>
                </div>
              </template>

            </b-table>
          </b-overlay>
        </b-col>

        <b-col cols="12">
          <div v-if="pagination.totalRows == 0">
            <div class="d-flex flex-column align-items-center justify-content-center h-100">
              <div class="empty-state py-2">
                <img class="img-fluid " src="@/assets/images/pages/doc-icon.png" alt="" width="100">
                <p class="txt-grey mt-1">No Categories</p>
              </div>
            </div>
          </div>
        </b-col>

        <b-col class="
          d-flex
          align-items-center
          justify-content-center justify-content-sm-start
        " cols="12" sm="6">
          <span v-if="pagination.totalRows !== 0" class="text-muted">Showing {{ pagination.from }} to {{ pagination.to
            }} of
            {{ pagination.totalRows }} entries</span>
          <span v-else class="text-muted">Showing 0 to 0 of 0 entries</span>
        </b-col>

        <b-col class="
          d-flex
          align-items-center
          justify-content-center justify-content-sm-end" cols="12" sm="6">
          <b-pagination v-model="currentPage" :per-page="pagination.perPage" :total-rows="pagination.totalRows"
            first-number last-number next-class="next-item" prev-class="prev-item" class="pagination-primary">
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
import product from "@/apis/modules/product";


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
  },
  mixins: [ErrorMessages, SuccessMessage, MomentMixin, Filter],
  data() {
    return {
      price: '',
      priceState: null,

      submittedPriceNames: [],
      userData: JSON.parse(localStorage.getItem('userData')),
      avatar: require('@/assets/images/avatars/shop.png'),
      managers: [],
      filters: {},
      jobRoleOption: [],
      tableLoading: false,
      noDataTable: "",
      pageOptions: [5, 10, 25, 50],
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
          key: "category_name",
          label: "Name",
          sortable: true,
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
  },
  methods: {
    async getUsers() {
      try {
        this.tableLoading = true;
        if (this.sortBy == "") {
          this.sortDesc = true;
        }
        const Response = await product.getAdminShopCaegory(
          this.filterQuery, this.currentPage, this.pagination.perPage, this.sortBy, this.sortDesc);
        const dataArray = Response.data.data.map((x) => ({
          id: x.id,
          category_name: x.category_name,
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


    refreshTable() {
      this.$refs.table.refresh()
    },

    filterQueryUpdate() {
      this.$refs.table.refresh();
    },





    checkFormValidityPrice() {
      const valid = this.$refs.form.checkValidity()
      this.priceState = valid
      return valid
    },

    resetModalPrice() {
      this.price = ''
      this.priceState = null
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
        this.price)

      this.companyPrice(
        this.price
      )

      // Hide the modal manually
      this.$nextTick(() => {
        this.$refs['my-modal-price'].toggle('#toggle-btn-price')
      })
    },

    async companyPrice(price) {
      try {
        this.payload = {
          category_name: price
        }
        this.isLoading = true
        const response = await product.shopCategoryCreate(this.payload)
        this.showSuccessMessage('Create Category Successfully')
        this.$refs.table.refresh();
        this.isLoading = false
      } catch (error) {
        error.response.data.data.price ? this.showErrorMessage('The category name has been already taken.') : ''

        this.isLoading = false
      }
    },

    async deleteCategory(id) {

      try {
        this.tableLoading = true
        this.$swal({
          title: 'Are you sure you want to delete this Category?',
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
            await product.shopCategoryDelete(id)
            this.showSuccessMessage('Category has been deleted')
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


    async reopenCategory(id) {

      try {
        this.tableLoading = true
        this.$swal({
          title: 'Are you sure you want to reopen this Category and Category Items?',
          text: '',
          icon: 'warning',
          showCancelButton: true,
          confirmButtonText: 'Yes, reopen',
          cancelButtonText: 'No, go back',
          customClass: {
            confirmButton: 'btn btn-primary',
            cancelButton: 'btn btn-outline-danger ml-1'
          },
          buttonsStyling: false
        }).then(async result => {
          if (result.value) {
            await product.shopCategoryDelete(id)
            this.showSuccessMessage('Category has been reopened')
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




  },

  mounted() {

  },
};
</script>
<style lang="scss">
@import "@core/scss/vue/libs/vue-select.scss";
/* SweetAlert popup modern card */
.swal2-popup {
  border-radius: 16px !important;
  padding: 22px !important;
  box-shadow: 0 12px 35px rgba(0,0,0,0.15);
  font-family: inherit;
}

/* Title */
.swal2-title {
  font-size: 18px !important;
  font-weight: 700 !important;
  color: #2c3e50;
}

/* Text */
.swal2-html-container {
  font-size: 14px !important;
  color: #6c757d;
}

/* Confirm (Delete) button */
.swal2-popup .btn-primary {
  background: linear-gradient(135deg, #4e73df, #224abe);
  border-radius: 10px !important;
  font-weight: 600;
  padding: 8px 16px;
  transition: 0.25s ease;
}

.swal2-popup .btn-primary:hover {
  background: #bb2d3b !important;
  transform: translateY(-1px);
  box-shadow: 0 6px 14px rgba(220, 53, 69, 0.25);
}

/* Cancel button */
.swal2-popup .btn-outline-danger {
  border-radius: 10px !important;
  font-weight: 600;
  padding: 8px 16px;
  color: #dc3545 !important;
  border: 1px solid #dc3545 !important;
  background: transparent !important;
  transition: 0.25s ease;
}

.swal2-popup .btn-outline-danger:hover {
  background: #dc3545 !important;
  color: #fff !important;
  transform: translateY(-1px);
}

/* Optional icon animation */
.swal2-icon.swal2-warning {
  border-color: #ffc107 !important;
  color: #ffc107 !important;
}
/* Modal content polish */
.modal-content {
  border-radius: 14px;
  overflow: hidden;
}

.modal-header {
  background: linear-gradient(135deg, #ffffff, #7c8cff);
  color: white;
  font-weight: 600;
}

.modal-footer {
  border-top: 1px solid #f1f1f1;
}
.modern-btn {
  background: linear-gradient(135deg, #4e73df, #224abe);
  border: none;
  border-radius: 12px;
  font-weight: 600;
}
.modern-search {
  border-radius: 12px;
  padding: 8px;
  background: transparent !important;
  box-shadow: none !important;
  height: 36px;
  font-weight: 500;
}

.modern-search:focus {
  outline: none !important;
}

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