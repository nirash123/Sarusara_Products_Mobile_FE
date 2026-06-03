import Vue from 'vue';
import { ModalPlugin, ToastPlugin } from 'bootstrap-vue';
import VueCompositionAPI from '@vue/composition-api';

import authController from '@/router/auth_controller';
import { SchedulePlugin } from '@syncfusion/ej2-vue-schedule';
import router from './router';
import store from './store';
import App from './App.vue';
import axios from 'axios';
import VueAxios from 'vue-axios';
Vue.use(VueAxios, axios);

// Axios Mock Adapter

// Global Components
import './global-components';
// calendar
// eslint-disable-next-line import/order
// 3rd party plugins
// import '@axios'
import '@/libs/portal-vue';
import '@/libs/toastification';
import '@/libs/vue-mixins';
import '@/libs/vue-lodash';
import '@/libs/vee-validation';
import '@/libs/vue-select';
import '@/libs/sweet-alerts';

// Vue sheduler
//Common mixins
import MessagesMixin from '@/libs/mixins/MessagesMixin';
import CommonMixin from '@/mixins/CommonMixin';

//cookies
import VueCookies from 'vue-cookies';
Vue.use(VueCookies);

Vue.use(SchedulePlugin);
// BSV Plugin Registration
Vue.use(ToastPlugin);
Vue.use(ModalPlugin);

// Composition API
Vue.use(VueCompositionAPI);

// import core styles
require('@core/scss/core.scss');

// import assets styles
require('@/assets/scss/style.scss');

Vue.config.productionTip = false;

authController.init(router, store);

Vue.mixin({
  mixins: [MessagesMixin, CommonMixin],
});

// custom validation

import { ValidationProvider, ValidationObserver, extend } from 'vee-validate';
import { numeric, required, email, min, max } from 'vee-validate/dist/rules';
import {validatorPassword} from "@core/utils/validations/validators";

extend('numeric', numeric);

extend('emailTest', {
  validate: (value) => value.match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g),
  message: 'Please enter valid email address',
});
// extend('required', {
//     ...required,
//     message: 'This field is required'
// })

extend('otp', {
  validate: (value) => value.length == 4,
  message: 'Please enter valied otp number',
});

extend('tel', {
  validate: (value) => value.match(/^[0-9,+ ]*$/u),
  message: 'Telephone Number must not contain any letter or special character',
});
extend('min_tel', {
  validate: (value) => value.length > 9 ,
  message: 'Please enter valied mobile number',
});
extend('max_tel', {
  validate: (value) => value.length < 11,
  message: 'Please enter valied mobile number',
});
extend('address', {
  validate: (value) => value.length >= 3,
  message: 'The Address must be at least 3 characters.',
});

extend('max_input', {
  validate: (value) => value.length < 12,
  message: 'Only 12 digits are allowed  for Smart Card Number',
});

extend('max', {
  validate: (value) => value <= 5000,
  message: 'The Service charge must not be greater than 5000',
});

extend('max_sort_code', {
  validate: (value) => value.length < 7,
  message: 'Sort code allowed only 6 characters ',
});
extend('min_sort_code', {
  validate: (value) => value.length > 5,
  message: 'Sort Code should contain 6 characters',
});

extend('password', {
  validate: (value) => value.match( /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%&*()]).{8,}/),
  message: 'Your {_field_} must contain at least one uppercase, one lowercase, one special character and one digit',
})

extend('same_password', {
  params: ['target'],
  validate (value, {target}) {
    return value === target
  },
  message: 'Password confirmation should be matched'
})


// extend('postal_code', {
//   validate: (value) =>
//     value.match(
//       /^([A-Z]){1}([0-9][0-9]|[0-9]|[A-Z][0-9][A-Z]|[A-Z][0-9][0-9]|[A-Z][0-9]|[0-9][A-Z]){1}([ ])?([0-9][A-z][A-z]){1}$/i
//     ) ||
//     value.match(
//       /^([A-Z]){1}([0-9][0-9]|[0-9]|[A-Z][0-9][A-Z]|[A-Z][0-9][0-9]|[A-Z][0-9]|[0-9][A-Z]){1}([ ])?([0-9][A-z][A-z]){1}$/i
//     ),
//   message: 'Please enter valid postal code ',
// });

extend('postal_code', {
  validate: (value) => value.match(/^((?:(?:gir)|(?:[a-pr-uwyz])(?:(?:[0-9](?:[a-hjkpstuw]|[0-9])?)|(?:[a-hk-y][0-9](?:[0-9]|[abehmnprv-y])?)))) ?([0-9][abd-hjlnp-uw-z]{2})\b/i),
  message: 'Please enter valid postal code ',
});

extend('name_length', {
  validate: (value) => value.length <= 50,
  message: 'This field can not contain more than 50 Characters',
});

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
