<!-- ShopPay.vue -->
<template>
  <div>
    <h2>Paiement</h2>
    <div>
      <label for="idcmd">Identifiant de la commande : </label>
      <input v-model="idcmd" type="text" id="idcmd"/>
    </div>
    <button @click="paiement">Payer la commande</button>
  </div>
</template>

<script>
import {mapActions} from "vuex";

export default {
  data() {
    return {
      idcmd: null,
      idcmdIsDefined: false
    };
  },

  mounted() {
    this.idcmd = this.$route.params.idcmd;
    this.idcmdIsDefined = this.idcmd !== 0;
  },

  methods: {
    ...mapActions([
      'validationPaiement'
    ]),

    async paiement() {
      const res = await this.validationPaiement(this.idcmd);
      if (res === -1) {
        alert("Le paiement à échoué !");
      } else {
        alert("Le paiement a été effectué !");
      }
    }
  }
};
</script>
