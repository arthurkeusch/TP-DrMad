<template>
  <div>
    <h2>Account data</h2>
    <span>account number</span><input v-model="number">
    <button @click="resetAccountNumber" style="margin-left:10px ">Reset</button>
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