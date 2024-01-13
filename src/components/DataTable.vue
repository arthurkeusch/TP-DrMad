<template>
  <div>
    <table class="custom-table">
      <thead>
      <tr>
        <th v-if="itemCheck"></th>
        <th v-for="(header, index) in headers" :key="index">{{ header.label }}</th>
        <th v-if="itemButton">Voir</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="(item, rowIndex) in items" :key="rowIndex">
        <td v-if="itemCheck">
          <input type="checkbox" @change="handleCheckboxChange(rowIndex)" />
        </td>
        <td v-for="(header, colIndex) in headers" :key="colIndex">
          {{ item[header.name] }}
        </td>
        <td v-if="itemButton">
          <button @click="handleButtonClick(rowIndex)">Voir</button>
        </td>
      </tr>
      </tbody>
    </table>
    <button v-if="tableButton" @click="handleTableButtonClick">Table Button</button>
  </div>
</template>

<script>
export default {
  props: {
    headers: {
      type: Array,
      required: true,
    },

    items: {
      type: Array,
      required: true,
    },

    itemCheck: {
      type: Boolean,
      default: false,
    },

    itemButton: {
      type: Boolean,
      default: false,
    },

    tableButton: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    handleCheckboxChange(index) {
      this.$emit('itemCheckChanged', index);
    },

    handleButtonClick(index) {
      this.$emit('itemClicked', index);
    },

    handleTableButtonClick() {
      this.$emit('tableClicked');
    },
  },
};
</script>

<style scoped>
.custom-table {
  width: 100%;
  border-collapse: collapse;
}

.custom-table th,
.custom-table td {
  padding: 10px;
  text-align: center;
  border: 1px solid #ddd; /* Ajout de la bordure entre les cellules */
}

.custom-table th {
  background-color: #f2f2f2;
}
</style>