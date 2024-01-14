<template>
  <div>
    <div>
      <NavBar :links="titles">
        <template v-slot:nav-button="{ label, style }">
          <span :style="style" v-html="label"></span>
        </template>
      </NavBar>
    </div>
    <div id="page">
      <VerticalMenu :items="menuItems">
        <template v-slot:menu-title="{ label }">
          <h2><b><u>{{ label }}</u></b></h2>
        </template>
        <template v-slot:menu-link="{ label }">
          <button>{{ label }}</button>
        </template>
      </VerticalMenu>
      <div id="centre">
        <h1>Bienvenue à la banque</h1>
        <router-view name="bankmain" :balance="currentBalance"></router-view>
      </div>
    </div>
  </div>
</template>

<script>
import NavBar from "@/components/NavBar.vue";
import VerticalMenu from "@/components/VerticalMenu";
import {mapActions} from "vuex";

export default {
  components: {
    NavBar,
    VerticalMenu
  },

  mounted() {
    this.updateNavBar();
  },

  watch: {
    $route: "updateNavBar",
  },

  data() {
    return {
      menuItems: [
        {type: "title", label: "Opérations"},
        {type: "link", label: "Solde", to: "/bank/amount"},
        {type: "link", label: "Débit/Virement", to: "/bank/operation"},
        {type: "title", label: "États"} ,
        {type: "link", label: "Historique", to: "/bank/history"}
      ],
      titles: [],
      currentBalance: 0
    };
  },

  methods: {
    ...mapActions(['getAccountAmount']),

    async updateNavBar() {
      if (this.$store.state.shopUser !== null && this.$store.state.shopUser !== undefined) {
        if (this.$store.state.bank.bankUser !== null && this.$store.state.bank.bankUser !== undefined) {
          this.currentBalance = this.$store.state.bank.accountAmount;
        } else {
          if (this.$route.name !== 'bankaccount') await this.$router.push({name: 'bankaccount'});
        }
        if (this.$route.name === 'bankhome' || this.$route.name === 'bankaccount') {
          this.titles = [{label: 'Mon Compte', to: '/bank/account'}];
        }
      } else {
        this.titles = [{label: 'Login', to: 'white'}];
        if (this.$route.name !== 'shoplogin') await this.$router.push({name: 'shoplogin'});
      }
    },
  }
};
</script>

<style scoped>
#page{
  display: flex;
}
</style>