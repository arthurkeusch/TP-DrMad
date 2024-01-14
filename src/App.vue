<template>
  <div id="app">
    <NavBar :links="titles">
      <template v-slot:nav-button="{ label, style }">
        <span :style="style" v-html="label"></span>
      </template>
    </NavBar>
    <h3 class="big_title">Welcome to DrMad app</h3>
      <hr>
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
    ...mapActions(['shopLogout']),
    
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
        if (this.$route.name !== 'shoplogin') this.$router.push({name: 'shoplogin'});
      }
    },
  },
};
</script>

<style>
#app{
    padding-left: 20px;
    font-family: Bahnschrift, serif;
}

a, button{
    border-radius: 10px;
    border: 2px solid darkred;
    background-color: darkred;
    color: aliceblue;
    padding: 5px;
    font-size: large;
    font-weight: bold;
}

span, p, label{
    color: darkred;
    font-size: x-large;
    padding-right: 20px;
}

.big_title{
    font-size: xxx-large;
    color: darkred;
}

h1{
  font-size: xx-large;
  color: #bd6905;
}

h3{
    margin-top: 20px;
    margin-bottom: 20px;
}
</style>