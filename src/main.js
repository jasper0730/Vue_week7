import { createApp } from "vue";
// vee-validate
import AllRules from '@vee-validate/rules';
import { localize, setLocale } from '@vee-validate/i18n';
import zhTW from '@vee-validate/i18n/dist/locale/zh_TW.json';
import {
    Form, Field, ErrorMessage, defineRule, configure,
} from 'vee-validate';
// vue-loding-overlay
import Loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/vue-loading.css';
// axios
import axios from 'axios';
import VueAxios from 'vue-axios';

// ToastMessages元件
import ToastMessages from '@/components/ToastMessages.vue';

// CKEditor文字編輯器 
import CKEditor from '@ckeditor/ckeditor5-vue';

// 傳遞訊息的函式
import $httpMessageState from '@/methods/pushMessages';

import { currency, date } from '@/methods/filters';


import App from "./App.vue";
import router from "./router";

// 所有規則
Object.keys(AllRules).forEach((rule) => {
    defineRule(rule, AllRules[rule]);
});

configure({
    generateMessage: localize({ zh_TW: zhTW }), // 載入繁體中文語系
    validateOnInput: true, // 當輸入任何內容直接進行驗證
});
// 設定預設語系
setLocale('zh_TW');

const app = createApp(App)
app.config.globalProperties.$filters = {
    date,
    currency,
};
app.config.globalProperties.$httpMessageState = $httpMessageState; // 掛載到global下
app.use(router);
app.use(VueAxios, axios);
app.use(CKEditor);
app.component('ToastMessages', ToastMessages);
app.component('Loading', Loading);
app.component('Form', Form);
app.component('Field', Field);
app.component('ErrorMessage', ErrorMessage);
app.mount("#app");
