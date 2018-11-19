import axios from "axios";

export default {
	namespaced: true,
	state: {
		cart: [],
		parts: null
	},
	mutations: {
		addToCard(state, robot) {
			state.cart.push(robot);
		},
		updateParts(state, parts) {
			state.parts = parts;
		}
	},
	actions: {
		getParts({commit}) {
			axios.get('/api/parts')
				.then(result => commit('updateParts', result.data))
				.catch(console.error);
		},
		addToCard({commit, state}, robot) {
			const cart = [...state.cart, robot];
			return axios.post('/api/cart', cart)
				.then(() => commit('addToCard', robot));
		}
	},
	getters: {
		cartSaleItems(state) {
			return state.cart.filter(item => item.head.onSale);
		}
	}
}