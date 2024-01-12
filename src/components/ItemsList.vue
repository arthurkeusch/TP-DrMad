<!-- ItemsList.vue -->
<template>
  <div>
    <h2>Liste des articles</h2>
    <CheckedList
        :data="items"
        :checked="checked"
        :fields="['name', 'price', 'promotions']"
        :itemButton="{ show: true, text: 'Ajouter au panier' }"
        :listButton="{ show: true, text: 'Ajouter tous au panier' }"
        :itemButtonAnnuler="{ show: false, text: 'Text' }"
        :itemButtonPayer="{ show: false, text: 'Text' }"
        :itemAmount="true"
        :checkbox="true"
        @item-button-clicked="addToCart"
        @add-all-to-cart="addAllToCart"
        @amount-updated="updateAmount"
        @checked-changed="toggleCheckbox"
    />
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
    addToCart({ index, amount }) {
      this.$emit('item-button-clicked', { item: this.items[index], amount, index });
    },

    addAllToCart(selectedItems) {
      this.$emit('add-all-to-cart', selectedItems);
    },

    updateAmount({ index, amount }) {
      console.log(`Mise à jour de la quantité de ${this.items[index].name} : ${amount}`);
    },

    toggleCheckbox(index) {
      this.$emit('checked-changed', index);
    },
  },
};
</script>
