<template>
  <div>
    <h1>Solde</h1>
    <div :style="balanceStyle">
      {{ formattedBalance }}
    </div>
  </div>
</template>

<script setup>
import {ref, computed, defineProps} from 'vue';

// Utiliser defineProps pour déclarer les props
const {balance} = defineProps(['balance']);

// Utiliser une référence pour le solde
const balanceRef = ref(balance);

// Calculer le style en fonction du solde (rouge si négatif, vert si positif)
const balanceStyle = computed(() => {
  return {
    color: balanceRef.value < 0 ? 'red' : 'green',
  };
});

// Formater le solde avec le symbole €
const formattedBalance = computed(() => {
  return `${balanceRef.value} €`;
});
</script>

<style scoped>
/* Ajouter des styles au besoin */
</style>
