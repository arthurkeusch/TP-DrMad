<template>
  <div>
    <h2>Paiement</h2>
    <div>
      <label for="idcmd">Identifiant de la commande : </label>
      <input v-model="idcmd" type="text" id="idcmd"/><br>
      <label for="uuidPayement">Identifiant de la transaction : </label>
      <input v-model="uuidPayement" type="text" id="uuidPayement"/>
    </div>
      <br>
    <button @click="paiement">Payer la commande</button>
  </div>
</template>

<script>
import {mapActions} from "vuex";

export default {
  data() {
    return {
      idcmd: null,
      idcmdIsDefined: false,
      uuidPayement: null
    };
  },

  mounted() {
    if (this.$route.params.idcmd !== "0") this.idcmd = this.$route.params.idcmd;
    this.idcmdIsDefined = this.idcmd !== 0;
  },

  methods: {
    ...mapActions(['validationPaiement']),

    async paiement() {
      const res = await this.validationPaiement({idcmd: this.idcmd, uuidPayement: this.uuidPayement});
      if (res < 0) {
        if (res === -1) alert("Le numéros de la commande ET le numéros de la transaction doivent être fournit !");
        if (res === -2) alert("La commande n'existe pas !");
        if (res === -3) alert("Le montant de la transaction est incorrect !");
        if (res === -4) alert("La commande n'existe pas !");
        if (res === -5) alert("Le numéro de la transaction est incorrect !");
      } else {
        alert("Le paiement a été effectué !");
      }
    }
  }
};
</script>