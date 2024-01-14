<template>
  <div>
    <h2>Données de compte</h2>
    <span>numéro de compte</span><input v-model="number">
    <button @click="resetAccountNumber" style="margin-left:10px ">Réinitialiser</button>
    <br/>
    <button @click="getAccount1(number)">Valider</button>
  </div>
</template>

<script>
import {mapActions, mapMutations} from 'vuex'
export default {
  name: 'BankAccountView',

  data: () => ({
    number: '',
  }),

  methods: {
    ...mapActions(['getAccount', 'getAccountAmount']),

    ...mapMutations(['updateAccountNumberError']),

    resetAccountNumber() {
      this.number = ''
      this.updateAccountNumberError(0)
    },

    async getAccount1(number) {
      await this.getAccount(number)
      await this.getAccountAmount(number);
    },
  }
}
</script>