import Vue from 'vue';
import { ToastPlugin, ModalPlugin } from 'bootstrap-vue';
import VueCompositionAPI from '@vue/composition-api';
import api from '@/services/api';
import { setLocalVar } from '@/util/localstorage-helper';

import i18n from '@/libs/i18n';
import router from './router';
import store from './store';
import App from './App.vue';

// Global Components
import './global-components';

// 3rd party plugins
import '@axios';
import '@/libs/acl';
import '@/libs/portal-vue';
import '@/libs/clipboard';
import '@/libs/toastification';
import '@/libs/sweet-alerts';
import '@/libs/vue-select';
import '@/libs/tour';
import VueFileAgent from 'vue-file-agent';
import 'vue-file-agent/dist/vue-file-agent.css';

import {
  ValidationObserver,
  ValidationProvider,
  extend,
  localize,
} from 'vee-validate';

import * as rules from 'vee-validate/dist/rules';
import ru from './warns/ru.json';
import uz from './warns/uz.json';

localize({
  ru,
});

const localeLang = 'ru';

localize(localeLang);

Object.keys(rules).forEach((rule) => {
  extend(rule, rules[rule]);
});

Vue.component('ValidationObserver', ValidationObserver);
Vue.component('ValidationProvider', ValidationProvider);

// BSV Plugin Registration
Vue.use(ToastPlugin);
Vue.use(ModalPlugin);
Vue.use(VueFileAgent);

// Composition API
Vue.use(VueCompositionAPI);

// Feather font icon - For form-wizard
// * Shall remove it if not using font-icons of feather-icons - For form-wizard
require('@core/assets/fonts/feather/iconfont.css'); // For form-wizard

// import core styles
require('@core/scss/core.scss');

// import assets styles
require('@/assets/scss/style.scss');

Vue.config.productionTip = false;

// api.auth
//     .fetchUserDetails()
//     .then((response) => {
//         setLocalVar("userData", JSON.stringify(response.data));
//     })
//     .catch((err) => console.log(err))
//     .finally(() => {

//     });
new Vue({
  router,
  store,
  i18n,
  render: (h) => h(App),
}).$mount('#app');
