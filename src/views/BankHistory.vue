<template>
  <div>
    <h2><slot>Opérations passées :</slot></h2>
    <div>
      <label for="filterCheckbox">Filtrer par période</label>

      <input
          type="checkbox"
          id="filterCheckbox"
          v-model="filterActive"
          @change="handleFilterCheckboxChange"
      />
        <br><br>
      <div v-if="filterActive">
        <label for="startDate">Du</label>
        <input
            type="text"
            id="startDate"
            v-model="startDate"
            placeholder="AAAA-MM-JJ"
            @input="handleStartDateInput"
        />
        <label for="endDate"> Au</label>
        <input
            type="text"
            id="endDate"
            v-model="endDate"
            placeholder="AAAA-MM-JJ"
            @input="handleEndDateInput"
        />
          <br><br>
        <div v-if="!startDateValid" style="color: red">Date de début invalide</div>
        <div v-if="!endDateValid" style="color: red">Date de fin invalide</div>
      </div>
    </div>
    <DataTable
        :headers="tableHeaders"
        :items="filteredTransactions"
        itemCheck
        itemButton
        @itemClicked="handleItemButtonClick"
        @itemCheckChanged="handleCheckboxChange"
    />
      <br><br>
    <button @click="handleTableButtonClick">Voir</button>
  </div>
</template>

<script>
import DataTable from "@/components/DataTable.vue";
import {mapActions} from "vuex";

export default {
  components: {
    DataTable
  },

  data() {
    return {
      filterActive: false,
      startDate: "",
      endDate: "",
      startDateValid: true,
      endDateValid: true,
      transactions: [],
      selectedTransactions: [],
    };
  },

  computed: {
    filteredTransactions() {
      return this.filterTransactions();
    },

    tableHeaders() {
      return [
        {label: "Montant", name: "amount"},
        {label: "Date", name: "date"},
        {label: "Source/Destination", name: "sourceDestination"}
      ];
    },
  },

  async mounted() {
    await this.loadData();
  },

  methods: {
    ...mapActions(['getAccountTransactions']),

    async loadData() {
      this.transactions = [];
      await this.getAccountTransactions(this.$store.state.bank.bankUser["number"]);
      const transactionTemp = this.$store.state.bank.accountTransactions;
      for (let i = 0; i < transactionTemp.length; i++) {
        if (transactionTemp[i]["account"] === this.$store.state.bank.bankUser["_id"]) {
          this.transactions.push({
                "_id": transactionTemp[i]["_id"],
                "amount": transactionTemp[i]["amount"],
                "account": transactionTemp[i]["account"],
                "date": this.formatReadableDate(transactionTemp[i]["date"]),
                "sourceDestination": "S",
                "uuid": transactionTemp[i]["uuid"]
              }
          );
        } else {
          this.transactions.push({
                "_id": transactionTemp[i]["_id"],
                "amount": transactionTemp[i]["amount"],
                "account": transactionTemp[i]["account"],
                "date": this.formatReadableDate(transactionTemp[i]["date"]),
                "sourceDestination": "D",
                "uuid": transactionTemp[i]["uuid"]
              }
          );
        }
      }
    },

    handleFilterCheckboxChange() {
      this.filteredTransactions = this.filterTransactions();
    },

    handleStartDateInput() {
      this.startDateValid = this.isDateValid(this.startDate);
      if (this.startDateValid) this.filteredTransactions = this.filterTransactions();
    },

    handleEndDateInput() {
      this.endDateValid = this.isDateValid(this.endDate);
      if (this.endDateValid) this.filteredTransactions = this.filterTransactions();
    },

    handleItemButtonClick(index) {
      this.openDialog(this.filteredTransactions[index].uuid);
    },

    handleTableButtonClick() {
      this.openDialog(this.selectedTransactions.map((transaction) => transaction.uuid));
    },

    handleCheckboxChange(index) {
      const existingIndex = this.selectedTransactions.findIndex(
          (transaction) => transaction.uuid === this.transactions[index].uuid
      );
      if (existingIndex !== -1) {
        this.selectedTransactions.splice(existingIndex, 1);
      } else {
        this.selectedTransactions.push(this.transactions[index]);
      }
    },

    openDialog(data) {
      if (Array.isArray(data) && data.length >= 1) {
        const concatenatedData = data.join('\n');
        if (concatenatedData.trim() !== '') alert(concatenatedData);
      } else {
        if (data !== '' && !Array.isArray(data)) alert(data);
      }
    },

    filterTransactions() {
      let filteredTransactions = this.transactions;
      if (this.filterActive) {
        if (this.startDate && this.isDateValid(this.startDate)) {
          filteredTransactions = filteredTransactions.filter(
              (transaction) => new Date(transaction.date.$date) >= new Date(this.startDate)
          );
        }
        if (this.endDate && this.isDateValid(this.endDate)) {
          filteredTransactions = filteredTransactions.filter(
              (transaction) => new Date(transaction.date.$date) <= new Date(this.endDate)
          );
        }
      }
      return filteredTransactions;
    },

    isDateValid(dateString) {
      if (dateString === '') return true;
      const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
      return dateString.trim() !== "" && dateRegex.test(dateString);
    },

    formatReadableDate(dateString) {
      const dateObject = new Date(dateString["$date"]);
      const options = {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric'
      };
      return dateObject.toLocaleDateString('fr-FR', options);
    },
  },
};
</script>