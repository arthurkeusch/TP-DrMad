<template>
  <div id="app">
    <NavBar :links="titles">
      <template v-slot:nav-button="{ label, style }">
        <span :style="style" v-html="label"></span>
      </template>
    </NavBar>
    <h1>Welcome to DrMad app</h1>
    <router-view/>
  </div>
</template>

<script>
import NavBar from "@/components/NavBar";
import {mapActions} from "vuex";

export default {
  name: "App",

  components: {
    NavBar
  },

  data: () => ({
    titles: [],
    currentIndex: -1,
  }),

  mounted() {
    this.updateNavBar();
  },

  watch: {
    $route: "updateNavBar",
  },

  methods: {
    updateNavBar() {
      if (this.$store.state.shopUser !== null && this.$store.state.shopUser !== undefined) {
        if (this.$route.name === 'home') {
          this.titles = [
            {label: '<b>Boutique</b>', to: '/shop'},
            {label: '<img src="./assets/bank.ico" alt="Bank Icon"/>', to: '/bank'}
          ];
        } else if (this.$route.name === 'shophome' || this.$route.name === 'shopbuy' || this.$route.name === 'shoppay' || this.$route.name === 'shoporders') {
          this.titles = [
            {label: 'Home', to: '/shop'},
            {label: 'Acheter', to: '/shop/buy'},
            {label: 'Payer', to: '/shop/pay/0'},
            {label: 'Mes commandes', to: '/shop/orders'},
            {label: 'Logout', to: '/shop/login'}
          ];
        }
      } else {
        this.titles = [{ label: 'Login', to: 'white' }];
        if (this.$route.name !== 'shoplogin') {
          this.$router.push({name: 'shoplogin'});
        }
      }
    },

    ...mapActions(['shopLogout']),
  },
};
</script>
