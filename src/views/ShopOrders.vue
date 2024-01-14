<template>
  <div>
    <h2>Historique des commandes</h2>
    <CheckedList
        :data="orders"
        :fields="['uuid', 'total', 'date', 'status']"
        :itemButton="{ show: false, text: 'SomeText' }"
        :itemButtonPayer="{ show: true, text: 'Payer' }"
        :itemButtonAnnuler="{ show: true, text: 'Annuler' }"
        :listButton="{ show: false, text: 'SomeText' }"
        :itemAmount="false"
        :checkbox="false"
        @payer="payOrder"
        @annuler="annulerOrder"
    />
  </div>
</template>

<script>
import CheckedList from '../components/CheckedList.vue';
import {mapActions} from "vuex";

export default {
  components: {
    CheckedList,
  },

  data() {
    return {
      orders: [],
    };
  },

  async mounted() {
    this.orders = await this.getAllOrderFromClient();
  },

  methods: {
    ...mapActions(['getAllOrderFromClient', 'annulationOrder']),

    payOrder(orderId) {
      this.$router.push(`/shop/pay/${orderId.uuid}`);
    },

    async annulerOrder(orderId) {
      const res = await this.annulationOrder(orderId.uuid);
      if (res === -1) {
        alert("Une erreur est survenue. La commande n'a pas pu être annulé.")
      }
    }
  },
};
</script>