<template>
    <!-- Error page-->
    <div >
        <div class="mt-2">
                <b-card
                no-body
                class="card px-2"
              >
              <div>
                <h3 class="text-capitalize my-2">
               <b-row>
                  <b-col
                         md="6"
                         sm="6">
                         <div v-if="calendar_date == current_date">
                          Payment Details (Today : {{ current_date }} ) 

                          <b-form-datepicker
                                  v-if="userData.admin_role == 'TBSAdmin'"
                                  class="ml-2"
                                  v-model="value"
                                  show-decade-nav
                                  button-only
                                  right
                                  :max="todayDate"
                                  locale="en-US"
                                  aria-controls="example-input"
                                  @context="onContext"
                                />
                         </div>
                         <div v-else>
                            Payment Details ( Date: {{ calendar_date }} )

                          <b-form-datepicker
                                  class="ml-2"
                                  v-model="value"
                                  show-decade-nav
                                  button-only
                                  right
                                  :max="todayDate"
                                  locale="en-US"
                                  aria-controls="example-input"
                                  @context="onContext"
                                />
                         </div>
                        </b-col>
                        <b-col
                         md="6"
                         sm="6">
                         <div class="d-flex justify-content-end">
                          ( Rs: {{ (totalPrice - totalOutPrice).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") }}.00 )
                         </div>
                        </b-col>
                </b-row>
                </h3>
            </div>
              </b-card>

 
      </div>
        
        <div class="mt-2">
          <b-row>
           <b-col
            md="6"
            sm="6"
           >
                <b-card
                no-body
                class="card px-2"
              >
              <div>
                <h3 class="text-capitalize mt-1 text-primary">
                <b-row>
                  <b-col
                         md="6"
                         sm="6">
                        Income :
                        </b-col>
                        <b-col
                         md="6"
                         sm="6">
                         <div class="d-flex justify-content-end">
                          ( Rs: {{ (totalPrice).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") }}.00 )
                          <b-button
                          v-if="current_date == calendar_date"
                              class="ml-1" variant="primary"
                              id="toggle-btn-income"
                              v-ripple.400="'rgba(113, 102, 240, 0.15)'"
                              v-b-modal.modal-prevent-closing
                            >
                            <span class="align-middle">+</span>
                            </b-button>
                              <b-modal
                                id="modal-prevent-closing"
                                centered
                                ref="my-modal-income"
                                title="Add Note & Price (Income)"
                                ok-title="Submit"
                                cancel-variant="outline-secondary"
                                @show="resetModal"
                                @hidden="resetModal"
                                @ok="handleOk"
                              >
                                <form
                                  ref="form"
                                  @submit.stop.prevent="handleSubmit"
                                >
                                <b-form-group
                                    :state="noteState"
                                    label="Note"
                                    label-for="note-input"
                                    invalid-feedback="Note is required"
                                  >
                                    <b-form-input
                                      id="note-input"
                                      v-model="note"
                                      :state="noteState"
                                      required
                                    />
                                  </b-form-group>
                                  <b-form-group
                                    :state="priceState"
                                    label="Price"
                                    label-for="price-input"
                                    invalid-feedback="Price is required"
                                  >
                                    <b-form-input
                                      id="price-input"
                                      v-model="price"
                                      :state="priceState"
                                      required
                                    />
                                  </b-form-group>

                                  
                                </form>
                              </b-modal>
                         </div>
                        </b-col>
                </b-row>
                </h3>
            </div>
            <div>
            <hr class="newonegreen">
          </div>
          <b-card-text >
                    <div v-for="income in incomes" :key="income.id">
                      <b-row class="px-2 mb-1">
                      <b-col
                         md="2"
                         sm="2">
                         Accountant {{ income.cashier_id}} 
                        </b-col>
                        <b-col
                         md="6"
                         sm="6">
                         {{ income.note}} 
                        </b-col>
                        <b-col
                         md="4"
                         sm="4">
                         <div class="d-flex justify-content-end">
                          {{ (income.price).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") }}
                         </div>
                        </b-col>
                      </b-row>
                   </div>
                </b-card-text>
              </b-card>
            </b-col>
            <b-col
            md="6"
            sm="6"
           >
                <b-card
                no-body
                class="card px-2"
              >
              <div>
                <h3 class="text-capitalize mt-1 text-danger">
                 <b-row>
                  <b-col
                         md="6"
                         sm="6">
                         Expenditure : 
                        </b-col>
                        <b-col
                         md="6"
                         sm="6">
                         <div class="d-flex justify-content-end">
                          ( Rs: {{ (totalOutPrice).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") }}.00 )
                          <b-button
                          v-if="current_date == calendar_date"
                              class="ml-1" variant="danger"
                              id="toggle-btn-expenditure"
                              v-ripple.400="'rgba(113, 102, 240, 0.15)'"
                              v-b-modal.modal-prevent-closing-price
                            >
                            <span class="align-middle">+</span>
                            </b-button>
                              <b-modal
                                id="modal-prevent-closing-price"
                                centered
                                ref="my-modal-expenditure"
                                title="Add Note & Price (Expenditure)"
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
                                <b-form-group
                                    :state="newnoteState"
                                    label="Note"
                                    label-for="note-input"
                                    invalid-feedback="Note is required"
                                  >
                                    <b-form-input
                                      id="note-input"
                                      v-model="newnote"
                                      :state="newnoteState"
                                      required
                                    />
                                  </b-form-group>
                                  <b-form-group
                                    :state="newpriceState"
                                    label="Price"
                                    label-for="price-input"
                                    invalid-feedback="Price is required"
                                  >
                                    <b-form-input
                                      id="price-input"
                                      v-model="newprice"
                                      :state="newpriceState"
                                      required
                                    />
                                  </b-form-group>

                                  
                                </form>
                              </b-modal>
                         </div>
                        </b-col>
                </b-row>
                </h3>
            </div>
            <div>
            <hr class="newone">
          </div>
          <b-card-text >
                    <div v-for="expenditure in expenditures" :key="expenditure.id">
                      <b-row class="px-2 mb-1">
                        <b-col
                         md="2"
                         sm="2">
                         Accountant {{ expenditure.cashier_id}} 
                        </b-col>
                        <b-col
                         md="6"
                         sm="6">
                         {{ expenditure.note}} 
                        </b-col>
                        <b-col
                         md="4"
                         sm="4">
                         <div class="d-flex justify-content-end">
                          {{ (expenditure.price).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") }}
                         </div>
                        </b-col>
                      </b-row>
                   </div>
                </b-card-text>
              </b-card>
            </b-col>
         </b-row>
      </div>
     
    </div>
  
    
  <!-- / Error page-->
  </template>
  
  <script>
  /* eslint-disable global-require */
  import { BLink, BButton, BFormDatepicker, BFormInput, BFormGroup, BImg, BDropdownDivider, BCard, BCardBody, BCol, BRow, BMedia, BMediaBody, BCardText, BMediaAside, BCardTitle, BCardHeader, BAvatar, } from 'bootstrap-vue'
  import VuexyLogo from '@core/layouts/components/Logo.vue'
  import Ripple from "vue-ripple-directive";
  import admin from "@/apis/modules/admin";
  import order from "@/apis/modules/order";
  
  export default {
    components: {
      BFormDatepicker,
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
      BFormInput,
      BFormGroup,
      BDropdownDivider,
    },
    directives: {
    Ripple,
  },
  
    data() {
      return {
        bank_amount: 0,
        totalPrice: 0,
        totalOutPrice: 0,
        value: '',
        context: null,
        price: '',
        note: '',
        newprice:'',
        newnote:'',
        todayDate: new Date(),
        calendar_date: new Date().toISOString().split('T')[0],
        current_date: new Date().toISOString().split('T')[0],
        incomes:{},
        expenditures: {},
        priceState: null,
        noteState: null,
        newpriceState: null,
        newnoteState: null,
        submittedNames: [],
        submittedPriceNames: [],
        currentDate: new Date().toLocaleDateString('en-US', {
          day: 'numeric',
          month: 'short',
          year: 'numeric',
        }),
          userData: JSON.parse(localStorage.getItem('userData')),
      }
    },
    computed: {
    
    },
    mounted() {
      if(JSON.parse(localStorage.getItem('userData')).admin_role !== 'TBSAdmin'){
        this.$router.push('/')
       }else{
        this.bankCardData()
        this.getStaffIncomes(this.current_date)
       
       
       }
      
      
    },
    methods: {

      onContext(ctx) {
      this.selected = ctx.selectedYMD
      
      if(this.selected != ''){
        this.getStaffIncomes(this.selected)
        this.calendar_date = this.selected
      }
    },

    async bankCardData(){
      const status = (await admin.getAdminDashboards(1))
        this.bank_amount = status.data.bank_card
    },

      checkFormValidity() {
      const valid = this.$refs.form.checkValidity()
      this.priceState = valid
      this.noteState = valid
      return valid
    },

    resetModal() {
      this.price = ''
      this.priceState = null
      this.note = ''
      this.noteState = null
    },
    
    handleOk(bvModalEvt) {
      // Prevent modal from closing
      bvModalEvt.preventDefault()
      // Trigger submit handler
      this.handleSubmit()
    },

      handleSubmit() {
      // Exit when the form isn't valid
      if (!this.checkFormValidity()) {
        return
      }
      this.submittedNames.push(this.price,this.note)
      this.incomeAdd(this.price,this.note)
      
      // Hide the modal manually
      this.$nextTick(() => {
        this.$refs['my-modal-income'].toggle('#toggle-btn-income')
      })
    },

    checkFormValidityPrice() {
      const valid = this.$refs.form.checkValidity()
      this.newpriceState = valid
      this.newnoteState = valid
      return valid
    },

    resetModalPrice() {
      this.newprice = ''
      this.newpriceState = null
      this.newnote = ''
      this.newnoteState = null
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
      this.submittedPriceNames.push(this.newprice,this.newnote)
      this.expenditureAdd(this.newprice,this.newnote)
      
      // Hide the modal manually
      this.$nextTick(() => {
        this.$refs['my-modal-expenditure'].toggle('#toggle-btn-expenditure')
      })
    },

    async incomeAdd(price, note) {
      this.todayDate = new Date();
      const year = this.todayDate.getFullYear(); // Get the current year

      const monthNumber = this.todayDate.getMonth(); // Get the current month (0-11)
      const monthNames = [
      'January', 'February', 'March', 'April', 'May', 'June',
          'July', 'August', 'September', 'October', 'November', 'December'
      ];
      const month = monthNames[monthNumber];

      const formattedYear = year;
      const formattedMonth = year + '-' + month;

      try {
        this.payload = {
          year: formattedYear,
          month: formattedMonth,
          user_id: this.$route.params.id,
          cashier_id: this.userData.id,
          price: price,
          note: note,
        }
        this.isLoading = true
        await order.staffIncomeAdd(this.payload)
        await this.getStaffIncomes(this.current_date)
        this.showSuccessMessage('Payment Add Successfully.');
        this.isLoading = false
      } catch (error) {
        await this.getStaffIncomes(this.current_date)
        this.showSuccessMessage('Payment Add Successfully.');
        this.isLoading = false
      }

  },

  async expenditureAdd(newprice, newnote) {
    if(parseInt(this.bank_amount) >= parseInt(newprice)){

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
          year: formattedYear,
          month: formattedMonth,
          user_id: this.$route.params.id,
          cashier_id: this.userData.id,
          price: newprice,
          note: newnote,
        }
        this.isLoading = true
        await order.staffExpenditureAdd(this.payload)
        await this.getStaffIncomes(this.current_date)
        this.showSuccessMessage('Payment Add Successfully.');

        this.isLoading = false
      } catch (error) {
        await this.getStaffIncomes(this.current_date)
        this.showSuccessMessage('Payment Add Successfully.');
        this.isLoading = false
      }
    }else{
      this.showErrorMessage('Not enough money for pay in the bank card')
  }
  },

      async getStaffIncomes(calendar_date){
        this.payload = {
          payment_date: calendar_date,
        }
        const status = (await admin.getStaffIncomes(this.$route.params.id, this.payload))
          this.incomes = status.data.income
          this.expenditures = status.data.expenditure
          this.getTotalPrice()
          this.getTotalOutPrice()
       },

       async getTotalPrice() {
          this.totalPrice = this.incomes
        .map(price => parseFloat(price.price)) 
        .reduce((total, price) => total + price, 0); 
        },

        async getTotalOutPrice() {
          this.totalOutPrice = this.expenditures
        .map(price => parseFloat(price.price)) 
        .reduce((total, price) => total + price, 0); 
        },
    }
  }
  </script>
  
  <style lang="scss">
  
  .newone {
  border: 1px solid #dc1727;
  margin: 20px 0;
}

.newonegreen {
  border: 1px solid #0b6eca;
  margin: 20px 0;
}

  
  .text-container {
    width: 300px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
  
  @import '@core/scss/vue/pages/page-misc.scss';
  </style>
  