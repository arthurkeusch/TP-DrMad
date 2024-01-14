import Vue from 'vue';
import VueRouter from 'vue-router';
import ShopView from "@/views/ShopView.vue";
import ShopHomeView from "@/views/ShopHomeView.vue";
import ShopBuyView from "@/views/ShopBuy.vue";
import ShopPayView from "@/views/ShopPay.vue";
import ShopLoginView from "@/views/ShopLoginView.vue";
import ShopOrdersView from "@/views/ShopOrders.vue";
import BankHome from "@/views/BankHome.vue";
import HomeView from "@/views/HomeView.vue";
import BankView from "@/views/BankView.vue";
import BankAccountView from '@/views/BankAccountView.vue';
import BankAmount from "@/views/BankAmount.vue";
import BankOperation from "@/views/BankOperation.vue";
import BankHistory from "@/views/BankHistory.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: '/shop',
    component: ShopView,
    children: [
      {
        path: '',
        name: 'shophome',
        component: ShopHomeView,
        alias: '/shop'
      },
      {
        path: 'buy',
        name: 'shopbuy',
        component: ShopBuyView
      },
      {
        path: 'pay/:idcmd',
        name: 'shoppay',
        component: ShopPayView,
        props: true
      },
      {
        path: 'login',
        name: 'shoplogin',
        component: ShopLoginView
      },
      {
        path: 'orders',
        name: 'shoporders',
        component: ShopOrdersView
      },
    ]
  },
  {
    path: '/bank',
    component: BankView,
    children: [
      {
        path: '',
        name: 'bankhome',
        component: BankHome,
        alias: '/bank'
      },
      {
        path: 'account',
        name: 'bankaccount',
        components: {
          bankmain: BankAccountView
        }
      },
      {
        path: 'amount',
        name: 'bankamount',
        components: {
          bankmain: BankAmount
        }
      },
      {
        path: 'operation',
        name: 'bankoperation',
        components: {
          bankmain: BankOperation
        }
      },
      {
        path: 'history',
        name: 'bankhistory',
        components: {
          bankmain: BankHistory
        }
      }
    ]
  },
  {
    path: '/home',
    name: 'home',
    component: HomeView
  }
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
});

export default router;