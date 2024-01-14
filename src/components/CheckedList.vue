<template>
  <div >
    <div v-for="(item, index) in data" :key="index" class="liste">
      <input
          v-if="checkbox"
          type="checkbox"
          :checked="checkedViruses[index]"
          @change="toggleCheckbox(index)"
          class="item"
      />
      <p class="item">{{ displayItem(item, index) }}</p>
      <input
          v-if="itemAmount"
          type="number"
          v-model="amountInput[index]"
          min="1"
          class="item"
      />
      <button v-if="itemButton.show" @click="itemButtonClick(index)" class="item">
        {{ itemButton.text }}
      </button>
      <button v-if="itemButtonPayer.show && commandeStatus[index]" @click="payer(item.uuid)" class="item">
        {{ itemButtonPayer.text }}
      </button>
      <button v-if="itemButtonAnnuler.show && commandeStatus[index]" @click="itemButtonAnnulerClick(item.uuid)" class="item">
        {{ itemButtonAnnuler.text }}
      </button>
    </div>
    <button v-if="listButton.show" @click="addAllToCart" style="margin: 10px">
      {{ listButton.text }}
    </button>
  </div>
</template>

<script>
export default {
  name: 'CheckedList',

  props: {
    data: Array,
    fields: Array,
    checked: Array,
    itemButton: Object,
    itemButtonPayer: Object,
    itemButtonAnnuler: Object,
    listButton: Object,
    itemAmount: Boolean,
    checkbox: Boolean
  },

  data() {
    return {
      checkedViruses: [],
      commandeStatus: []
    };
  },

  computed: {
    amountInput() {
      return Array(this.data.length).fill('1');
    },
  },

  methods: {
    toggleCheckbox(index) {
      this.$emit('checked-changed', index);
    },

    itemButtonClick(index) {
      this.$emit('item-button-clicked', {
        index,
        amount: this.itemAmount ? this.amountInput[index] : undefined,
      });
    },

    payer(uuid) {
      this.$emit('payer', {uuid});
    },

    itemButtonAnnulerClick(uuid) {
      this.$emit('annuler', {uuid});
    },

    addAllToCart() {
      this.$emit('add-all-to-cart', this.amountInput);
    },

    displayItem(item, index) {
      if (this.fields.length === 3) {
        return "Nom : " + item.name + " - Prix : " + item.price + " - Stock : " + item.stock;
      } else if (this.fields.length === 2) {
        return "Nom : " + item.virus.name + " - Prix : " + item.virus.price + " - Quantité : " + item.quantity;
      } else if (this.fields.length === 4) {
        this.commandeStatus[index] = item.status === "waiting_payment";
        return " Uuid : " + item.uuid + " - Total : " + item.total + " - Date : " + item.date + " - Status : " + item.status;
      }
    },
  },
};
</script>

<style>
.liste{
    display: flex;
    justify-content: space-around;
    border-right: 2px solid darkred;
}

.item{
    margin: 10px;
}
</style>