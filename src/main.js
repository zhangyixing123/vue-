import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
Vue.config.productionTip = false

import {
  Button,
  Input,
  Row,
  Col,
  Steps,
  Step,
  Form,
  FormItem,
  Checkbox,
  Upload,
  Image,
  Table,
  TableColumn,
  Alert,
  Message,
  Dialog,
  MessageBox,
  Popover,
  Empty
} from "element-ui";

Vue.use(Button);
Vue.use(Input);
Vue.use(Row);
Vue.use(Col);
Vue.use(Steps);
Vue.use(Step);
Vue.use(Form);
Vue.use(FormItem);
Vue.use(Checkbox);
Vue.use(Upload);
Vue.use(Image);
Vue.use(Table);
Vue.use(TableColumn);
Vue.use(Alert);
Vue.use(Dialog);
Vue.use(Popover);
Vue.use(Empty);

Vue.prototype.$message = Message;
Vue.prototype.$confirm = MessageBox.confirm;
Vue.prototype.$store = store;



// 路由白名单
const whiteList = ['/Login', '/CreditApply', '/LoanApply'];
router.beforeEach((to, from, next) => {
  if (whiteList.some(item => item === to.path)) {
    next()
  } else if (to.path && store.getters.token) {
    next()
  } else {
    next('./Login');
  }
})


new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
