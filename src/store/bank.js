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
            console.log('get account amount');
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
            console.log('get account transactions');
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

        async createWithdraw({ commit, state }, withdrawalData) {
            try {
                const response = await BankAccountService.createWithdraw(state.bankUser._id, withdrawalData);
                if (response.error === 0) {
                    commit('updateAccountAmount', response.data.amount);
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

        async createPayment({ commit, state }, paymentData) {
            try {
                const response = await BankAccountService.createPayment(state.bankUser._id, paymentData);
                if (response.error === 0) {
                    commit('updateAccountAmount', response.data.amount);
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
    }
}