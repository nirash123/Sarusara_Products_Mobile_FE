<template>
    <div>
      <section class="invoice-preview-wrapper">
        <b-row class="invoice-actions" @click="pos()">
            <b-col
           cols="12">
            <div>
               <b-card no-body class="px-2 m-25 py-1 bg-primary">
                <b-row>
            <b-col
           cols="4">
            <h2 class="brand-text text-white mb-0">
                <b-img
                
              width="60px"
              src="@/assets/images/logo/slogo.png"
              alt="logo"
            />
            T B S Sarusara Products | ( Accountant {{  userData.id }} )

           <feather-icon
                            size="40"
                            icon="FileTextIcon"
                            class="mt-0 ml-3 text-white"
                            @click="$router.push('/return_order_list')"
                        />

                         <feather-icon
                            size="40"
                            icon="RefreshCwIcon"
                            class="mt-0 ml-3 text-white"
                            @click="$router.push('/pos')"
                        />
          </h2>
         
           </b-col>
           <b-col
           cols="7">
           <h3 class="text-white ml-5 mt-1 d-flex justify-content-end">Date: {{ currentDate }}  | Time: {{ currentTime }}</h3>
           </b-col>
           <b-col
           cols="1">
           </b-col>
           </b-row>
           </b-card>
           </div>
           </b-col>
        </b-row>
       <b-row class="invoice-actions">
        <b-col cols="12" md="8">
                   <b-row>

                   
                   <!-- Bar Items Colum -->
                  <b-col
                    cols="12" md="10">
                    <div class="card">
                      <span id="cart">
                    <table style="height: 605px;" class="table table-hover shopping-cart-wrap table-responsive bg-success">
                       <thead >
                          <tr>
                             <th scope="col" width="600"><h5>Item Name ( {{ sale_carts.length }} )</h5></th>
                             <th scope="col" width="300"><h5>R.Price</h5></th>
                             <th scope="col" width="200"><h5>Qty</h5></th>
                             <th scope="col" width="300"><h5>Price</h5></th>
                             <th scope="col" class="text-right" width="120"><h5>Delete</h5></th>
                          </tr>
                       </thead>
                       <tbody>
                          <tr v-for="product in sale_carts" :key="product.id" >
                            <td>
                                <figure class="media">
                                   <figcaption class="media-body">
                                      <h4 class="title display-new-name text-truncate"><span class="title display-new-red">( {{((product.items_item_code).slice(0, 25) )}} ) </span>{{ (product.items_item_name).slice(0, 30)  }} | {{ product.unit }}    </h4>
                                   </figcaption>
                               
                                </figure>
                             </td>
                             <td>
                                <figure class="media">
                                   <figcaption class="media-body">
                                      <b-form-input
                                           id="name"
                                           class="display-new-1 mr-3"
                                           v-model="product.sale_price"
                                           @change="updateSaleReturnPrice(product.id, product.sale_price)"
                                       />
                                   </figcaption>
                                </figure>
                             </td>
                             <td>
                                <figure class="media">
                                   <figcaption class="media-body">
                                      <b-form-input
                                           id="name"
                                           class="display-new-1 mr-3"
                                           v-model="product.quentity"
                                           @change="updateSaleReturnQuentity(product.id, product.quentity)"
                                       />
                                   </figcaption>
                                </figure>
                             </td>
                             <td>
                                <figure class="media">
                                   <figcaption class="media-body">
                                      <h5 class="title display-new-1 text-truncate">Rs: {{(product.quentity * product.sale_price).toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}} </h5>
                                   </figcaption>
                                </figure>
                             </td>
                             <td class="text-right"> 
                               <b-button
                                       class="btn btn-outline-danger"
                                       variant="gradient-danger"
                                       @click="deleteSaleReturnCart(product.id)"
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
                      </div>
                    <b-card no-body class="p-1">
                      
                        <div class="d-flex align-items-center justify-content-end">
                            <input type="text" ref="nameInput" v-model="item_code" @change="addQRCode(item_code)" style="color: rgba(255, 255, 255, 0); border: none;  height: 0px; width: 0px;"  /> 
                           
                            <b-img
                                  width="40px"
                                  src="@/assets/images/logo/slogo.png"
                                  alt="logo"
                                />
                                 <b-form-input
                                    v-model="filters['id_or_cus_id']"
                                    class="d-inline-block mr-1"
                                    placeholder="Search..."
                                />
                    </div>
                    </b-card>
                    <b-row >
                        <b-col cols="12">
                              <b-row>
                                <b-col sm="12" md="4" lg="4" v-for="project in getData" :key="project.id">
                                  <b-card @click="addtocart(project.id)" class="border" rounded="50">
                                    <b-row >
                                      <b-col sm="12" md="12" lg="12">
                                        <div>
                                          <h4 class="d-flex display-new-2 justify-content-center mt-50">
                                            {{ (project.item_code).slice(0, 25) }} </h4>
                                          <h5 class="d-flex display-new-1 justify-content-center mt-50">
                                            {{ (project.item_name).slice(0, 30) }}</h5>
                                            <h5 class="d-flex display-new-1 justify-content-center ">
                                            {{ project.sale_price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}} </h5>
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
                            :filter="filters['id_or_cus_id']"
                            :filter-included-fields="filterOn"
                        >
                        </b-table>
                    </b-overlay>
              
                        </b-col>
                    </b-row>
                   
                   </b-col>
                    <!-- Catagary Colum -->
                    <b-col @click="pos()" cols="12" md="2">
                          <b-row >
                            <b-col cols="12">
                                  
                                        <table style="height: 1050px;" class="table table-hover shopping-cart-wrap table-responsive">
                                          <b-card  @click="updateActiveStatus(0)" class="bg-primary border" >
                                            <div>
                                              <h6 class="d-flex text-white justify-content-center mr-2">
                                                All Category </h6>
                                            </div>
                                        </b-card>
                                  <b-row >
                                  <b-col   cols="12" v-for="project in categories" :key="project.id">
                                    <b-card 
                                      class="bg-primary border" 
                                      @click="updateActiveStatus(project.id)"
                                    >
                                      <div>
                                        <h6 class="d-flex text-white justify-content-center mr-2">
                                          {{ project.category_name }}
                                        </h6>
                                      </div>
                                    </b-card>
                                  </b-col>
                                </b-row>
                                        </table>
                            </b-col>
                        </b-row>
                   </b-col>
                   </b-row>


        </b-col>
           <b-col
           cols="12" md="4">
           <b-card no-body class="p-1">
               <div class="card">
                 <span id="cart">
                       <div class="box my-0 px-3">
                        <b-row>
                          <b-col class="mt-2" cols="6">
                              <dt><h3 class="display-new-5 ">භාණ්ඩ ගණන</h3></dt>
                          </b-col>
                          <b-col class="mt-2" cols="6">
                              <dt><h3 class="text-right display-new-5 ">{{ sale_carts.length }}</h3></dt>
                          </b-col>
                          <b-col class="mt-2" cols="6">
                              <dt><h3 class="display-new-5 ">එකතුව</h3></dt>
                          </b-col>
                          <b-col class="mt-2" cols="6">
                            <dd class="text-right display-new-5"><h4  class="display-new-5">Rs: {{((sale_total ).toFixed(2)).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}}</h4></dd> 
                           </b-col>
                            
                          <b-col cols="12">
                            <hr class="custom-border">
                          </b-col>
                          <b-col cols="6">
                              <dt class=" b mt-1"><h3 class="display-new-5">ලබාදුන් වට්ටම :</h3></dt>
                          </b-col>
                          <b-col cols="6">
                            <b-form-input
                                            id="name"
                                            class="text-right display-new-6 mt-1"
                                            v-model="wattam"
                                            @change="updateWattam()"
                                            autocomplete="off"
                                        />
                             </b-col>
                
                             <b-col cols="6">
                              <dt class=" mt-1"><h2 class="display-new-5">මුළු ප්‍රතිලාභ මුදල :</h2> </dt>  
                          </b-col>
                          <b-col cols="6">
                            <dd  class="text-right mt-1 b"> <h3 class="display-new-5"> Rs: {{((sum_total).toFixed(2)).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}} </h3> </dd> 
                             </b-col>
                          
                             
                             <b-col cols="6">
                              <dt class=" b mt-1"><h3 class="display-new-5">මුදල් :</h3></dt>
                          </b-col>
                          <b-col cols="6">
                            <b-form-input
                                            id="name"
                                            class="text-right display-new-6 mt-1"
                                            v-model="cash"
                                            @change="updateCash()"
                                            autocomplete="off"
                                        />
                             </b-col>

                             <b-col cols="6">
                              <dt class=" b mt-1"><h3 class="display-new-5">කාඩ් :</h3></dt>
                          </b-col>
                          <b-col cols="6">
                            <b-form-input
                                            id="name"
                                            class="text-right display-new-6 mt-1"
                                            v-model="card"
                                            @change="updateCash()"
                                            autocomplete="off"
                                        />
                             </b-col>

                             <b-col cols="6">
                              <dt class=" b mt-1"><h3 class="display-new-5"> බැංකු චෙක්පත් :</h3></dt>
                          </b-col>
                          <b-col  cols="6">
                            <b-form-input
                                            id="name"
                                            class="text-right display-new-6 mt-1"
                                            @change="updateCash()"
                                            v-model="cheque"
                                            autocomplete="off"
                                            
                                        />
                             </b-col>

                             <b-col cols="6">
                              <dt class=" b mt-1"><h3 class="display-new-5">ණය මුදල් :</h3></dt>
                              </b-col>
                              <b-col cols="6">
                                <b-form-input
                                                id="name"
                                                class="text-right display-new-6 mt-1"
                                                v-model="credit"
                                                @change="updateCash()"
                                                autocomplete="off"
                                                
                                            />
                             </b-col>
                          </b-row>
                          </div>
                 </span>
                 <div > 
                  <b-button
                       v-if="this.change_amount == this.sum_total"
                      :class="{ 'btn-loading': isLoading }" :disabled="isLoading"
                        type="submit"
                        variant="primary"
                        block
                        @click="submitNewData()"
                      >
                      <span v-if="isLoading">Loading...</span>
                        <span v-else> Submit</span>
                 </b-button>
                  <b-button
                      v-else
                      :class="{ 'btn-loading': isLoading }" :disabled="true"
                        type="submit"
                        variant="primary"
                        block
                       
                      >
                        <span> Submit</span>
                 </b-button>
                 
                 </div>
              </div>
           </b-card>
           </b-col>
       </b-row>
       <div class="d-md-none d-lg-none">
            <!-- <div class=""> -->
       <b-col cols="12">
         <b-card
        no-body
        class="invoice-preview-card"
      >
      <b-row>
             <b-col  cols="6">
      <b-row>
        <b-col  cols="11">
          <b-row class="mr-50">
             <b-col  cols="11">
                <div>
              <div  class="d-flex justify-content-center">
              <b-img
                    src="@/assets/images/logo/slogo.png"
                   width="100px"
                    />
            </div>
            <h5 class="display-new-5  font-weight-bolder d-flex justify-content-center mb-25">
              <!-- රිච්වේ හාඩ්වෙයාර් -->
               T B S Sarusara Products
                            </h5>
                            <h5 class="display-new-7  font-weight-bolder d-flex justify-content-center mb-25">
                              අංක 446, හුලංදාව, මොනරාගල
                            </h5>
                            <h4 class="display-new-6  font-weight-bolder d-flex justify-content-center mb-25">
                             055 22 77 230
                            </h4>
                            <h4 class="display-new-6  font-weight-bolder d-flex justify-content-center mb-25">
                            ( RETURN BILL )
                            </h4>
            </div>
            <b-row class="mt-2">
              <b-col cols="12">
                <h1 class="display-new-1  font-weight-bolder  mb-25">
                  බිල්පත් අංකය : {{  currentNewDate  }}R{{ bill_number }}
                </h1>
              </b-col>
              <b-col cols="6">
                <h1 class="display-new-1  font-weight-bolder  mb-25">
                  දිනය : {{ currentOldDate }}
                </h1>
              </b-col>
              <b-col cols="6">
                <h1 class="display-new-1  font-weight-bolder  mb-25">
                  වේලාව :  {{ currentTime }}
                </h1>
              </b-col>
              <b-col cols="12">
                <h1 class="display-new-1  font-weight-bolder  mb-25">
                  මුදල් අයකැමි : {{  userData.user_name }}
                </h1>
              </b-col>
           
              </b-row>
               <div class="mt-50 custom-border">

                  <b-row>
                    <b-col cols="2">
                      <h1 class="display-new-2 mt-50 ml-5 d-flex justify-content-end  font-weight-bolder  mb-25">
                        ප්‍රමාණය
                      </h1>
                    </b-col>
                    <b-col cols="5">
                      <h1 class="display-new-2 mt-50   d-flex justify-content-end font-weight-bolder  mb-25">
                        එකක මිල
                      </h1>
                    </b-col>
                    <b-col cols="5">
                      <h1 class="display-new-2 mt-50  d-flex justify-content-center  font-weight-bolder  mb-25">
                        එකතුව
                      </h1>
                    </b-col>
                  </b-row>
            </div>
              <div class="mt-1">
                <div v-for="product in sale_carts" :key="product.id" >
                  <b-row class="mt-50">
                    <b-col cols="11">
                    <h1 class="display-new-3  font-weight-bolder ">
                      {{ getProcessedItemName(product.items_item_name) }}
                    </h1>
                  </b-col>
                  </b-row>
                  <b-row>
                    <b-col cols="4">
                      <h1 class="display-new-3  d-flex justify-content-end   mb-0">
                      {{ product.quentity }} {{  product.unit }}
                      </h1>
                    </b-col>
                    <b-col cols="4">
                      <h1 class="display-new-3  d-flex justify-content-end   mb-0">
                        {{ (product.sale_price * 1).toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") }}
                      </h1>
                    </b-col>
                
                    <b-col cols="4">
                      <h1 class="display-new-3  d-flex justify-content-end  font-weight-bolder  mb-0">
                        {{(product.sale_price * product.quentity).toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}}
                      </h1>
                    </b-col>
                  </b-row>
                  <hr class="custom-dashed-border">
                  </div>
                </div>
                <hr class="custom-border">
                <b-row>
                    <b-col cols="6">
                      <h1 class="display-new-3 ">
                        එකතුව
                      </h1>
                    </b-col>
                    <b-col cols="6">
                      <h1 class="display-new-3   ">
                        <dd class="text-right"> {{(sale_total).toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}}</dd> 
                      </h1>
                    </b-col>
                    </b-row>
              <b-row>
                    <b-col cols="6">
                      <h1 class="display-new-3  font-weight-bolder ">
                        ලබාදුන් වට්ටම
                      </h1>
                    </b-col>
                    <b-col cols="6">
                      <h1 class="display-new-3  font-weight-bolder ">
                            <dd class="text-right"> {{((total_discount).toFixed(2)).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}}</dd> 
                      </h1>
                    </b-col>
              </b-row>
              <hr class="custom-dashed-border">
              <b-row class="mt-25">
                    <b-col cols="6">
                      <h1 class="display-new-7 font-weight-bolder ">
                        මුළු ප්‍රතිලාභ මුදල
                      </h1>
                    </b-col>
                    <b-col cols="6">
                      <h1 class="display-new-7 font-weight-bolder ">
                         <dd class="text-right mt-1 b">   {{((sum_total).toFixed(2)).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}}  </dd> 
                      </h1>
                    </b-col>
              </b-row>
              <hr class="custom-dashed-border">
              <b-row class="mt-25">
                    <b-col cols="6">
                      <h1 class="display-new-3  ">
                        මුදල් :
                      </h1>
                    </b-col>
                    <b-col cols="6">
                      <h1 class="display-new-3 ">
                        <dd class="text-right"> {{((bill_cash).toFixed(2)).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}}</dd> 
                      </h1>
                    </b-col>
              </b-row>
              <b-row v-if="bill_card > 0" class="mt-25">
                    <b-col cols="6">
                      <h1 class="display-new-3  ">
                        කාඩ් :
                      </h1>
                    </b-col>
                    <b-col cols="6">
                      <h1 class="display-new-3 ">
                        <dd class="text-right"> {{((bill_card).toFixed(2)).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}}</dd> 
                      </h1>
                    </b-col>
              </b-row>
              <b-row v-if="bill_cheque > 0" class="mt-25">
                    <b-col cols="6">
                      <h1 class="display-new-3  ">
                        බැංකු චෙක්පත් :
                      </h1>
                    </b-col>
                    <b-col cols="6">
                      <h1 class="display-new-3 ">
                        <dd class="text-right"> {{((bill_cheque).toFixed(2)).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}}</dd> 
                      </h1>
                    </b-col>
              </b-row>
              <b-row v-if="bill_credit > 0" class="mt-25">
                    <b-col cols="6">
                      <h1 class="display-new-3  ">
                        ණය මුදල් :
                      </h1>
                    </b-col>
                    <b-col cols="6">
                      <h1 class="display-new-3 ">
                        <dd class="text-right"> {{((bill_credit).toFixed(2)).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}}</dd> 
                      </h1>
                    </b-col>
              </b-row>
              <b-row class="mt-25">
                    <b-col cols="6">
                      <h1 class="display-new-3  ">
                        භාණ්ඩ ගණන
                      </h1>
                    </b-col>
                    <b-col cols="6">
                      <h1 class="display-new-3 ">
                        <dd class="text-right">{{ sale_carts.length }}</dd> 
                      </h1>
                    </b-col>
              </b-row>
              <h1 class="display-new-1  font-weight-bolder d-flex justify-content-center ">
                ස්තුතියි, නැවත එන්න!
              </h1>
                <h1 class="display-new-4 d-flex font-weight-bolder justify-content-center mb-1 ">
                    <i> Software By @ Easyones Soft - 076 283 38 38 </i>
                </h1>
            </b-col>
            </b-row>
            </b-col>
            </b-row>
            </b-col>
            <b-col  cols="6">
            
            </b-col>
            </b-row>
      </b-card>
        </b-col>
      </div>
    </section>
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
     BFormRating,
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
        const printInvoice = () => {
          window.print()
        }
        return {
          printInvoice,
        }
      },
   mixins: [ErrorMessages, SuccessMessage, MomentMixin, Filter],
   data() {
     return {
        card_status: 1,
        cheque_status: 1,
        credit_status: 1,
        wattam: 0,
        total_discount: 0,
        cheque_status: 0,
        bill_cash: 0,
        bill_card:0,
        bill_cheque:0,
        bill_credit:0,
        bill_discount: 0,
        currentTime: '',
        bill_number: '',
        currentDate: '',
        currentNewDate: '',
        currentOldDate: '',
        sale_total: 0,
        special_sale_total:0,
        old_sale_total: 0,
        old_special_sale_total: 0,
        image: '',
        category: 0,
        resturant_category: 0,
        categories: [],
        bank_amount:0,
       return_sum: 0,
       resturant_sum: 0,
       total_sum: 0,
       sub_total: 0,
      customer_id: null,
      customer_name: '',
      image: '',
      form: {
          user_name: '',
          address: '',
          phone_no: '',
          identity_code: '',
          active_status:'',
        },
        getData: '',
        getReturnData: '',
        errorPhone:'',
        errorID:'',
        errorUserName:'',
       item_code: '',
       isLoading: false,
       discount: 0, 
       sale_discount: 0,
       good_discount: 0,
       customer_id:'',
       discount: 0,
       sum_total: 0,
       cash:0,
       card:0,
       cheque:0,
       customer_discount:0,
       all_discount: 0,
       credit:0,
       sum: 0,
       change_amount: 0,
       managers: [],
       filters: {},
       jobRoleOption: [],
       tableLoading: false,
       noDataTable: "",
       pageOptions: [5, 10, 25, 50],
       currentPage: 1,
       currentPage1: 1,
       currentPage2: 1,
       pagination: {
         perPage: "6",
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

       pagination1: {
         perPage: "8",
         pageOptions: "",
         totalRows: "",
         from: "",
         to: "",
       },
       pagination2: {
         perPage: "8",
         pageOptions: "",
         totalRows: "",
         from: "",
         to: "",
       },
       sortBy1: "",
       sortDesc1: false,
       sortDirection1: "asc",
       sortBy2: "",
       sortDesc2: false,
       sortDirection2: "asc",
       infoModal: {
         id: "info-modal",
         title: "",
         content: "",
       },
       todayDate: new Date(),
       calendar_date: new Date().toISOString().split('T')[0],
       userData: JSON.parse(localStorage.getItem('userData')),
       
       
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
       sale_carts: [],
     };
   },
   watch: {
     filterQueryUpdate() {
       this.$refs.table.refresh();
     },
   },
   computed: {
    processedSaleCarts() {
      return this.sale_carts.map(product => {
        // Split the string at the '*' character and take the first part
        return {
          ...product,
          items_item_name: product.items_item_name.split('*')[0].trim()
        };
      });
    },
     ...mapGetters(["currentUser"]),
   },
   created() {
    this.currentDate = this.getCurrentDate();
    this.currentNewDate = this.getNewCurrentDate();
    this.currentOldDate = this.getNewCurrentOldDate();
    setInterval(() => {
      this.currentTime = this.getCurrentTime();
    }, 1000);
  },
   methods: {
    getCurrentTime() {
      const now = new Date();
      // Format the time as per your requirement
      return now.toLocaleTimeString();
    },
    
    getCurrentDate() {
      const now = new Date();
      // Format the date as per your requirement
      return now.toLocaleDateString();
    },

    getNewCurrentDate() {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    return `${year}${month}${day}`;
    },

    getNewCurrentOldDate() {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    return `${year}/${month}/${day}`;
    },

    getProcessedItemName(itemName) {
      return itemName.split('*')[0].trim();
    },
    
    async getReturnBillNumber(){
      try {
        const response = await admin.getReturnBillNumber()
        this.bill_number = response.data.data[0].number
        } catch (error) {
          
        }
    },
    
    async updateActiveStatus(category){
      try {
        this.tableLoading = true;
        if (this.sortBy == "") {
          this.sortDesc = true;
        }
        const Response = await product.getPosReturnShopProducts(
          category , this.filterQuery, this.currentPage, this.pagination.perPage, this.sortBy, this.sortDesc);
        const dataArray = Response.data.data.map((x) => ({
          id: x.id,
          item_code: x.item_code,
          item_name: x.item_name,
          category: x.categories_category_name,
          sale_price: "Rs: " + x.sale_price,
          quentity: x.quentity,
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
        this.getData = dataArray
      } catch (error) {
        this.convertAndNotifyError(error);
        this.tableLoading = false;
      }
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

  async updateWattam(){
    if(this.wattam > 0){
      if(this.wattam == '' || this.wattam == null){
        this.wattam = 0;
        await this.updateCash()
      }else{
        await this.updateCash()
      }
    }
    else{
      this.wattam = 0;
        await this.updateCash()
    }

  },

  async addQRCode(item_code){
      try {
         this.payload = {
          cashier_id: JSON.parse(localStorage.getItem('userData')).id,
          item_code: item_code,
         }
         this.isLoading = true
         const response = await item.addQRToSaleReturnCart(this.payload)
         this.getAdminSaleReturnCarts()
         
         this.getShopCategories()
         this.getItems()
        
         this.item_code = ''
         this.filters['id_or_cus_id'] = ''
         this.$refs.nameInput.focus();
         this.isLoading = false
       } catch (error) {
         this.item_code = ''
         this.isLoading = false
       }
   },

   async getAdmin(){

      const status = (await admin.getAdminDashboards(JSON.parse(localStorage.getItem('userData')).id))
      this.bank_amount = status.data.bank_card
      },

      async submitNewData(){
      this.isLoading = true
      await this.getReturnBillNumber()
      await this.submitData()
     },

     async submitData(){
      this.todayDate = new Date();
      const year = this.todayDate.getFullYear(); // Get the current year
  
      const monthNumber = this.todayDate.getMonth(); // Get the current month (0-11)
      const monthNames = [
      'January', 'February', 'March', 'April', 'May', 'June',
          'July', 'August', 'September', 'October', 'November', 'December'
      ];
      const month = monthNames[monthNumber];

      if(this.card == 0){
        this.card_status = 2
      }else{
        this.card_status = 1
      }

      if(this.cheque == 0){
        this.cheque_status = 2
      }else{
        this.cheque_status = 1
      }

      if(this.credit == 0){
        this.credit_status = 2
      }else{
        this.credit_status = 1
      }

      if(parseFloat(this.cash) <= parseFloat(this.bank_amount)){

      if(this.bill_number != ''){
        const formattedYear = year;
      const formattedMonth = year + '-' + month;
       try {
          this.payload = {
           year: formattedYear,
           month: formattedMonth,
           subtotal: this.sub_total,
           discount : this.total_discount,
           total: this.sum_total,
           return_items_count: this.sale_carts.length,
           cash: this.bill_cash,
           card: this.bill_card,
           cheque: this.bill_cheque,
           credit: this.bill_credit,
           payment: this.bill_cash,
           return_cart: this.sale_carts,
           bill_number: this.currentNewDate + 'R'+this.bill_number,
           cashier_id: this.userData.id,
           order_time: this.currentTime,
           card_status: this.card_status,
           cheque_status: this.cheque_status,
           credit_status: this.credit_status,
           }
           this.isLoading = true
          this.printInvoice()
          await item.submitSaleReturnCart(this.payload)
          this.sale_discount = 0
          this.cash = 0
          this.card = 0
          this.cheque = 0
          this.wattam = 0
          this.credit = 0
          this.getAdminSaleReturnCarts()
         
          
          this.getReturnBillNumber()
          this.getItems()
          this.pos()
         
          this.isLoading = false
        }
          catch (error) {
           this.isLoading = false
         }

      }else{
        this.showSuccessMessage('Please wait')
        await this.getReturnBillNumber()
      }

    }else{
      this.showErrorMessage('Not enough cash for pay')
          this.sale_discount = 0
          this.cash = 0
          this.card = 0
          this.cheque = 0
          this.wattam = 0
          this.credit = 0
    }
  
      
        
   },

   async updateSaleReturnPrice(id,sale_price){
       try {
           this.payload = {
             id: id,
             sale_price: sale_price,
           }
           this.isLoading = true
           await item.updateSaleReturnPrice(id,this.payload)
           await this.getAdminSaleReturnCarts()
           this.$refs.nameInput.focus();
           this.isLoading = false
         } catch (error) {
          await this.getAdminSaleReturnCarts()
          this.$refs.nameInput.focus();
           this.isLoading = false
         }
     },

  
     async updateSaleReturnQuentity(id,quentity){
       try {
           this.payload = {
             id: id,
             quentity: quentity,
           }
           this.isLoading = true
           await item.updateSaleReturnQuentity(id,this.payload)
           await this.getAdminSaleReturnCarts()
           this.$refs.nameInput.focus();
           this.isLoading = false
         } catch (error) {
          await this.getAdminSaleReturnCarts()
          this.$refs.nameInput.focus();
           this.isLoading = false
         }
     },


  
     async deleteSaleReturnCart(id){
  
          await item.deleteSaleReturnCart(id)
           this.getAdminSaleReturnCarts()
           this.$refs.nameInput.focus();
           this.isLoading = false
     },

  
     async addtocart(id){
        
        try {
           this.payload = {
               cashier_id: JSON.parse(localStorage.getItem('userData')).id,
               item_id: id,
           }
           this.isLoading = true
           const response = await item.addProductToSaleReturnCart(this.payload)
           this.getAdminSaleReturnCarts()
           this.filters['id_or_cus_id'] = ''
           this.$refs.nameInput.focus();
           this.isLoading = false
         } catch (error) {
           this.isLoading = false
         }
     },

     
     async getAdminSaleReturnCarts(){
           try {
           const response = await item.getAdminSaleReturnCarts(JSON.parse(localStorage.getItem('userData')).id)
           this.sale_carts = response.data.data
           await this.getTotalPrice()
           this.$refs.nameInput.focus();
           } catch (error) {
               
           }
       },
       

       async getItems() {
      try {
        this.tableLoading = true;
        if (this.sortBy == "") {
          this.sortDesc = true;
        }
        const Response = await product.getPosReturnShopProducts(
           this.category , this.filterQuery, this.currentPage, this.pagination.perPage, this.sortBy, this.sortDesc);
        const dataArray = Response.data.data.map((x) => ({
          id: x.id,
          item_code: x.item_code,
          item_name: x.item_name,
          category: x.bar_categories_category_name,
          sale_price: "Rs: " + x.sale_price,
          quentity: x.quentity,
          active_status: x.active_status,
          unit: x.unit

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


      async getShopCategories() {
          try {
            this.tableLoading = true;
            if (this.sortBy == "") {
              this.sortDesc = true;
            }
            const Response = await product.getAdminShopPosCaegory(
                this.filterQuery, this.currentPage, 500, this.sortBy, this.sortDesc);
            const dataArray = Response.data.data.map((x) => ({
              id: x.id,
              category_name: x.category_name,
              description: x.description,

            }));
            this.noDataTable = Response.data.data.length;
            const paginationResponse = Response.data;
            this.currentPage = paginationResponse.current_page;
            this.pagination.totalRows = paginationResponse.total;
            this.pagination.perPage = paginationResponse.per_page;
            this.pagination.from = paginationResponse.from;
            this.pagination.to = paginationResponse.to;
            this.tableLoading = false;
            this.categories = dataArray
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
      this.discount = 0
         this.isLoading = true
         this.getTotalSalePrice()
         this.$refs.nameInput.focus();
         this.isLoading = false
    }
   },


   async getTotalPrice() {


    this.sub_total = this.sale_carts
     .map(cart => parseFloat(cart.quentity * cart.sale_price)) 
     .reduce((total, quentity) => total + quentity , 0);



     const filteredCarts = this.sale_carts.filter(cart => 
          cart.max_sale_limit === 0 || 
          (cart.max_sale_limit === 1 && cart.max_quentity > (cart.quentity + cart.today_count))
      );

      // Calculate old_sub_total
      this.old_sub_total = filteredCarts
          .map(cart => parseFloat(cart.quentity * cart.sale_price))
          .reduce((total, quantity) => total + quantity, 0);

     this.sale_total = this.sub_total;

     this.old_sale_total = this.old_sub_total;
     
     
     
      

      this.total_discount =  parseFloat(this.wattam);
      
      this.sum_total = (parseFloat(this.sale_total) - parseFloat(this.total_discount));
      this.change_amount = parseFloat(this.cash) + parseFloat(this.card) + parseFloat(this.cheque) + parseFloat(this.credit) ;
      this.bill_discount = this.sale_discount - 0;
      this.bill_cash = this.cash - 0;
      this.bill_card = this.card - 0;
      this.bill_cheque = this.cheque - 0;
      this.bill_credit = this.credit - 0;


      this.$refs.nameInput.focus();
      this.isLoading = false

     },

     async getTotalSalePrice() {

      this.sub_total = this.sale_carts
     .map(cart => parseFloat(cart.quentity * cart.sale_price)) 
     .reduce((total, quentity) => total + quentity , 0);


         const filteredCarts = this.sale_carts.filter(cart => 
          cart.max_sale_limit === 0 || 
          (cart.max_sale_limit === 1 && cart.max_quentity > (cart.quentity + cart.today_count))
      );

      // Calculate old_sub_total
      this.old_sub_total = filteredCarts
          .map(cart => parseFloat(cart.quentity * cart.sale_price))
          .reduce((total, quantity) => total + quantity, 0);



     this.sale_total = this.sub_total;

     this.old_sale_total = this.old_sub_total;
     


     this.total_discount =   parseFloat(this.wattam);
     

      this.sum_total = (parseFloat(this.sale_total) - parseFloat(this.total_discount));
      this.change_amount = parseFloat(this.cash) + parseFloat(this.card) + parseFloat(this.cheque) + parseFloat(this.credit);
      this.bill_discount = this.sale_discount - 0;
      this.bill_cash = this.cash - 0;
      this.bill_card = this.card - 0;
      this.bill_cheque = this.cheque - 0;
      this.bill_credit = this.credit - 0;


      this.isLoading = false
     },


     async updateCash(){
         this.isLoading = true
         this.getTotalSalePrice()
         this.isLoading = false
       //  this.$refs.nameInput.focus();

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
      this.getAdmin()
      this.getReturnBillNumber()
       this.groupData()
       this.getAdminSaleReturnCarts()
      
       
       this.getShopCategories()
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

  .display-4-5 {
        font-size: 2.8rem; /* Adjust the font size as needed */
        font-weight: bold;
        color: #000000; /* Adjust the color as needed */
        margin-bottom: 0.625rem; /* Adjust the margin as needed */
    }

  .display-5-5 {
        font-size: 2.2rem; /* Adjust the font size as needed */
        font-weight: bold;
        color: #000000; /* Adjust the color as needed */
        margin-bottom: 0.625rem; /* Adjust the margin as needed */
    }
    .display-new-red {
        font-size: 1.3rem; /* Adjust the font size as needed */
        font-weight: bold;
        color: #ff0000; /* Adjust the color as needed */
        margin-bottom: 0.625rem; /* Adjust the margin as needed */
    }
    .display-new-name {
        font-size: 1.3 rem; /* Adjust the font size as needed */
        font-weight: bold;
        color: #000000; /* Adjust the color as needed */
        margin-bottom: 0.625rem; /* Adjust the margin as needed */
    }

    .display-new-1 {
        font-size: 1.1rem; /* Adjust the font size as needed */
        font-weight: bold;
        color: #000000; /* Adjust the color as needed */
        margin-bottom: 0.625rem; /* Adjust the margin as needed */
    }
    .display-new-2 {
        font-size: 1.2rem; /* Adjust the font size as needed */
        font-weight: bold;
        color: #000000;  /* Adjust the margin as needed */
    }
    .display-new-3 {
        font-size: 1.1rem; 
        color: #000000; /* Adjust the margin as needed */
    }
    .display-new-9 {
        font-size: 1.3rem; 
        color: #000000; /* Adjust the margin as needed */
    }
    .display-new-4 {
        font-size: 0.84rem; /* Adjust the font size as needed */
        font-weight: bold;
        color: #000000; /* Adjust the color as needed */
        margin-bottom: 0.625rem; /* Adjust the margin as needed */
    }
    .display-new-5 {
        font-size: 2.0rem; /* Adjust the font size as needed */
        font-weight: bold;
        color: #000000; /* Adjust the color as needed */
        margin-bottom: 0.625rem; /* Adjust the margin as needed */
    }
    .display-new-6 {
        font-size: 2.0rem; /* Adjust the font size as needed */
        font-weight: bold;
        color: #000000; /* Adjust the color as needed */
        margin-bottom: 0.625rem; /* Adjust the margin as needed */
    }
    .display-new-7 {
        font-size: 1.5rem; /* Adjust the font size as needed */
        font-weight: bold;
        color: #000000; /* Adjust the color as needed */
        margin-bottom: 0.625rem; /* Adjust the margin as needed */
    }
  .custom-border {
        border: 1px solid; /* Adjust the border size as needed */
    }

    .custom-dashed-border {
        border: none; /* Remove the default border */
        border-top: 1px dashed; /* Create a dashed border at the top */
        color: black; /* Set the color of the dash (you can change this) */
        height: 1px; /* Set the height of the hr */
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
  