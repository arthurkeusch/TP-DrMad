<template>
  <div>
    <h2>Solde :</h2>
    <div :style="balanceStyle">
      {{ formattedBalance }}
    </div>
  </div>
</template>

<script>
export default {
  props: {
    balance: {
      type: Number,
      required: true,
    },
  },

  computed: {
    balanceStyle() {
      return {
        color: this.balance < 0 ? 'red' : 'green',
      };
    },

    formattedBalance() {
      return `${this.balance} €`;
    },
  },
};
</script>