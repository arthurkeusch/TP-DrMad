import BankAccountService from '../services/bankaccount.service'

export default {
    // state = les données centralisées
    state: () => ({
        accountAmount: 0,
        accountTransactions: [],
        accountNumberError: 0,
        bankUser: null
    }),
    // mutations = fonctions synchrones pour mettre à jour le state (!!! interdit de modifier directement le state)
    mutations: {
        updateAccountAmount(state, amount) {
            state.accountAmount = amount
        },
        updateAccountTransactions(state, transactions) {
            state.accountTransactions = transactions
        },
        updateAccountNumberError(state, error) {
            state.accountNumberError = error
        },
        updateBankUser(state, account) {
            state.bankUser = account;
        }
    },
    // actions = fonctions asynchrone pour mettre à jour le state, en faisant appel aux mutations, via la fonction commit()
    actions: {
        async getAccountAmount({commit}, number) {
            let response = await BankAccountService.getAccountAmount(number)
            if (response.error === 0) {
                commit('updateAccountAmount', response.data)
                commit('updateAccountNumberError', 1)
            } else {
                console.log(response.data)
                commit('updateAccountNumberError', -1)
            }
        },

        async getAccountTransactions({commit}, number) {
            let response = await BankAccountService.getAccountTransactions(number)
            if (response.error === 0) {
                commit('updateAccountTransactions', response.data)
                commit('updateAccountNumberError', 1)
            } else {
                console.log(response.data)
                commit('updateAccountNumberError', -1)
            }
        },

        async getAccount({ commit}, number) {
            try {
                let response = await BankAccountService.getAccount(number);
                if (response.error === 0) {
                    commit('updateBankUser', response.data);
                    commit('updateAccountNumberError', 1);
                    response = await BankAccountService.getAccountAmount(number)
                    if (response.error === 0) {
                        commit('updateAccountAmount', response.data)
                        commit('updateAccountNumberError', 1)
                    } else {
                        console.log(response.data)
                        commit('updateAccountNumberError', -1)
                    }
                } else {
                    console.log(response.data);
                    commit('updateAccountNumberError', -1);
                }
            } catch (err) {
                console.error('Erreur réseau:', err);
                commit('updateAccountNumberError', -1);
            }
        },

        async getTransactions({ commit }, number) {
            try {
                const response = await BankAccountService.getTransactions(number);
                if (response.error === 0) {
                    commit('updateAccountTransactions', response.data);
                    commit('updateAccountNumberError', 1);
                } else {
                    console.log(response.data);
                    commit('updateAccountNumberError', -1);
                }
            } catch (err) {
                console.error('Erreur réseau:', err);
                commit('updateAccountNumberError', -1);
            }
        },

        async createWithdraw({ commit, state }, {amount}) {
            try {
                const response = await BankAccountService.createWithdraw(state.bankUser._id, amount);
                if (response.error === 0) {
                    commit('updateAccountAmount', response.data.data.amount);
                    commit('updateAccountNumberError', 1);
                    return response.data.data;
                } else {
                    commit('updateAccountNumberError', -1);
                    return response.data.data;
                }
            } catch (err) {
                console.error('Erreur réseau:', err);
                commit('updateAccountNumberError', -1);
                return err;
            }
        },

        async createPayment({ commit, state }, {amount, destination}) {
            try {
                const response = await BankAccountService.createPayment(state.bankUser._id, amount, destination);
                if (response.data.error === 0) {
                    commit('updateAccountAmount', response.data.data["amount"]);
                    commit('updateAccountNumberError', 1);
                    commit('updateAccountTransactions', response.data.data["transaction"]);
                    return response.data.data["uuid"];
                } else {
                    commit('updateAccountNumberError', -1);
                    return response.data;
                }
            } catch (err) {
                console.error('Erreur réseau:', err);
                commit('updateAccountNumberError', -1);
                return err;
            }
        },
    }
}