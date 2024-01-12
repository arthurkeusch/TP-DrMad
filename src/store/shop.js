import ShopService from '../services/shop.service'
import router from "@/router";
import {v4 as uuidv4} from 'uuid';

export default {
    state: {
        basket: [],
        shopUser: null,
        viruses: [],
        orders: []
    },

    mutations: {
        updateShopUser(state, user) {
            state.shopUser = user;
        },
    },

    actions: {
        async shopLogin({ commit }, data) {
            let response = await ShopService.shopLogin(data)
            if (response.error === 0) {
                commit('updateShopUser', response.data);
                this.state.shopUser = response.data;
                await router.push('/home');
            } else {
                console.log(response.data)
            }
        },

        async shopLogout() {
            this.state.shopUser = null;
            await router.push('/');
        },

        async getAllViruses() {
            let response = await ShopService.getAllViruses();
            if (response.error === 0) {
                this.state.viruses = response.data;
            } else {
                console.log(response.data);
            }
        },

        addToCartAction({ state }, { virus, quantity }) {
            const existingItemIndex = state.basket.findIndex(item => item.virus._id === virus._id);
            if (existingItemIndex !== -1) {
                state.basket[existingItemIndex].quantity += quantity;
            } else {
                state.basket.push({ virus, quantity });
            }
        },

        removeFromCartAction({ state }, index) {
            state.basket.splice(index, 1);
        },

        clearCartAction() {
            this.state.basket = [];
        },

        checkoutAction({ state }, cartItems) {
            const newOrder = {
                items: cartItems.map(item => ({ item, amount: item.quantity })),
                date: new Date(),
                total: cartItems.reduce((total, item) => total + item.virus.price * item.quantity, 0),
                status: 'waiting_payment',
                uuid: uuidv4(),
            };
            state.orders.push(newOrder);
            const currentUser = state.shopUser;
            if (currentUser) {
                currentUser.orders.push(newOrder._id);
            }
            return newOrder.uuid;
        },

        validationPaiement({ state }, idcmd) {
            for (const order of state.orders) {
                if (order.uuid === idcmd) {
                    order.status = "finalized";
                    return idcmd;
                }
            }
            for (const order of state.shopUser.orders) {
                if (order.uuid === idcmd) {
                    order.status = "finalized";
                    return idcmd;
                }
            }
            return -1;
        },

        async getAllOrderFromClient({ state }) {
            if (state.orders.length === 0 && (state.shopUser.orders.length === 0 || (state.shopUser.orders.length >= 1 && state.shopUser.orders[state.shopUser.orders.length - 1] === undefined))) {
                return []
            } else if (state.orders.length === 0 && state.shopUser.orders.length !== 0) {
                return state.shopUser.orders;
            } else if (state.orders.length !== 0 && (state.shopUser.orders.length === 0 || (state.shopUser.orders.length >= 1 && state.shopUser.orders[state.shopUser.orders.length - 1] === undefined))) {
                return state.orders;
            } else {
                const allOrders = [...state.orders, ...state.shopUser.orders];
                return [...new Set(allOrders)];
            }
        },

        annulationOrder({ state }, idcmd) {
            for (const order of state.orders) {
                if (order.uuid === idcmd) {
                    order.status = "cancelled";
                    return idcmd;
                }
            }
            for (const order of state.shopUser.orders) {
                if (order !== undefined && order.uuid === idcmd) {
                    order.status = "cancelled";
                    return idcmd;
                }
            }
            return -1;
        }
    }
}