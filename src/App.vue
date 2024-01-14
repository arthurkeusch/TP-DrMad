<template>
  <div id="app">
    <NavBar :links="titles">
      <template v-slot:nav-button="{ label, style }">
        <span :style="style" v-html="label"></span>
      </template>
    </NavBar>
    <h3 class="big_title">Bienvenue sur l'application DrMad</h3>
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
            {label: '<svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" class="bi bi-bank2" viewBox="0 0 16 16">\n' +
                  '  <path d="M8.277.084a.5.5 0 0 0-.554 0l-7.5 5A.5.5 0 0 0 .5 6h1.875v7H1.5a.5.5 0 0 0 0 1h13a.5.5 0 1 0 0-1h-.875V6H15.5a.5.5 0 0 0 .277-.916zM12.375 6v7h-1.25V6zm-2.5 0v7h-1.25V6zm-2.5 0v7h-1.25V6zm-2.5 0v7h-1.25V6zM8 4a1 1 0 1 1 0-2 1 1 0 0 1 0 2M.5 15a.5.5 0 0 0 0 1h15a.5.5 0 1 0 0-1z"/>\n' +
                  '</svg>', to: '/bank'}
          ];
        } else if (this.$route.name === 'shophome' || this.$route.name === 'shopbuy' || this.$route.name === 'shoppay' || this.$route.name === 'shoporders') {
          this.titles = [
            {label: 'Accueil boutique', to: '/shop'},
            {label: 'Acheter', to: '/shop/buy'},
            {label: 'Payer', to: '/shop/pay/0'},
            {label: 'Mes commandes', to: '/shop/orders'},
            {label: 'Déconnexion', to: '/shop/login'}
          ];
        }
      } else {
        this.titles = [{ label: 'Connexion', to: 'white' }];
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