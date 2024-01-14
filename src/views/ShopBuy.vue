<template>
  <div>
    <div class="shop-container">
      <div class="items-list">
        <ItemsList
            :items="viruses"
            :checked="checkedViruses"
            @item-button-clicked="addToCart"
            @add-all-to-cart="addAllToCart"
            @checked-changed="toggleVirusCheckbox"
        />
      </div>
      <div class="basket-list">
        <BasketList
            :items="cartItems"
            :checked="checkedCartItems"
            @checked-changed="toggleCartItemCheckbox"
            @item-button-clicked="removeFromCart"
            @list-button-clicked="clearCart"
            @acheter="checkout"
        />
      </div>
    </div>
  </div>
</template>

<script>
import ItemsList from '../../src/components/ItemsList.vue';
import BasketList from '../../src/components/BasketList.vue';
import { mapActions } from 'vuex';

export default {
  components: {
    ItemsList,
    BasketList,
  },

  mounted() {
    this.initPage();
  },

  data() {
    return {
      viruses: [],
      cartItems: [],
      checkedViruses: [],
      checkedCartItems: [],
    };
  },

  methods: {
    ...mapActions(['getAllViruses', 'addToCartAction', 'removeFromCartAction', 'clearCartAction', 'checkoutAction',]),

    async initPage() {
      await this.getAllViruses();
      this.viruses = this.$store.state.viruses;
    },

    addToCart({ item, amount}) {
      const selectedVirus = item;
      const existingItemIndex = this.cartItems.findIndex((cartItem) => cartItem.virus._id === selectedVirus._id);
      if (existingItemIndex !== -1) {
        this.cartItems[existingItemIndex].quantity = parseInt(this.cartItems[existingItemIndex].quantity) + parseInt(amount);
      } else {
        this.cartItems.push({ virus: selectedVirus, quantity: parseInt(amount) });
      }
      this.addToCartAction({ virus: selectedVirus, quantity: parseInt(amount) });
    },

    addAllToCart(selectedItems) {
      this.checkedViruses.forEach((virusIndex) => {
        const virusToAdd = this.viruses[virusIndex];
        const amountToAdd = selectedItems[virusIndex];
        this.addToCart({ item: virusToAdd, amount: amountToAdd });
      });
    },

    toggleCartItemCheckbox(index) {
      this.checkedCartItems[index] = !this.checkedCartItems[index];
    },

    removeFromCart(index) {
      this.removeFromCartAction(index.index);
      this.cartItems.splice(index.index, 1);
    },

    clearCart() {
      this.cartItems = [];
      this.clearCartAction();
    },

    async checkout() {
      const idcmd = await this.checkoutAction(this.cartItems);
      this.clearCart();
      alert(`La commande à été effectuer ! Votre id de commande :\n${idcmd}`);
    },

    toggleVirusCheckbox(index) {
      const updatedCheckedViruses = [...this.checkedViruses];
      const indexInArray = updatedCheckedViruses.indexOf(index);
      if (indexInArray === -1) {
        updatedCheckedViruses.push(index);
      } else {
        updatedCheckedViruses.splice(indexInArray, 1);
      }
      this.checkedViruses = updatedCheckedViruses;
    },
  },
};
</script>

<style scoped>
.shop-container {
  display: flex;
}

.items-list {
  flex: 1;
  margin-right: 20px;
}

.basket-list {
  flex: 1;
}
</style>