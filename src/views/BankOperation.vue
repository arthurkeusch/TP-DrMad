<template>
  <div>
    <h2>Opération :</h2>
    <label for="amount">Montant:</label>
    <input v-model="amount" type="number" id="amount" />
      <br><br>
    <div>
      <input type="checkbox" id="recipientCheckbox" v-model="hasRecipient" />
      <label for="recipientCheckbox">Destinataire</label>
      <input v-if="hasRecipient" v-model="recipient" type="text" id="recipient" placeholder="Destinataire" />
    </div>
      <br><br>
    <button @click="validateOperation">Valider</button>
    <div v-if="operationResult">
      {{ operationResult }}
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  name: 'BankOperation',

  data() {
    return {
      hasRecipient: false,
      amount: 0,
      recipient: '',
      operationResult: '',
    };
  },

  methods: {
    ...mapActions(['createWithdraw', 'createPayment']),

    validateOperation() {
      if (this.hasRecipient) {
        this.createPayment({amount: this.amount, destination: this.recipient})
            .then(response => {
              if (response.error === 1) {
                this.operationResult = `Erreur lors de l'opération : ${response.data}`;
              } else {
                this.operationResult = `L'opération est validée avec le n° : ${response}. Vous pouvez la retrouver dans l'historique.`;
              }
            })
            .catch(error => {
              this.operationResult = `Erreur lors de l'opération : ${error.message}`;
            });
      } else {
        this.createWithdraw({amount: this.amount})
            .then(response => {
              this.operationResult = `L'opération est validée avec le n° : ${response.uuid}. Vous pouvez la retrouver dans l'historique.`;
            })
            .catch(error => {
              this.operationResult = `Erreur lors de l'opération : ${error.message}`;
            });
      }
      this.amount = 0;
      this.hasRecipient = false;
      this.recipient = '';
    },
  },
};
</script>