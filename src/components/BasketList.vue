<!-- BasketList.vue -->
<template>
  <div>
    <h2>Panier</h2>
    <CheckedList
        :data="items"
        :fields="['name', 'amount']"
        :itemCheck="true"
        :checked="checked"
        :itemButton="{ show: true, text: 'Supprimer' }"
        :listButton="{ show: true, text: 'Vider le panier' }"
        :itemButtonAnnuler="{ show: false, text: 'Text' }"
        :itemButtonPayer="{ show: false, text: 'Text' }"
        @checked-changed="toggleItemCheckbox"
        @item-button-clicked="removeFromCart"
        @add-all-to-cart="clearCart"
        :itemAmount="false"
        :checkbox="false"
    />
    <button @click="checkout" style="margin: 10px">Acheter</button>
  </div>
</template>

<script>
import CheckedList from './CheckedList.vue';

export default {
  components: {
    CheckedList,
  },
  props: {
    items: Array,
    checked: Array,
  },
  methods: {
    toggleItemCheckbox(index) {
      this.$emit('checked-changed', index);
    },
    removeFromCart({ index, amount }) {
      this.$emit('item-button-clicked', { item: this.items[index], amount, index });
    },
    clearCart() {
      this.$emit('list-button-clicked');
    },
    checkout() {
      this.$emit('acheter');
    },
  },
};
</script>
