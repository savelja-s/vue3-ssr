import { CartItem, Cart } from "@/types";

const cart = JSON.parse(localStorage.getItem("cart") || "{}");
const state = {
  cart: new Cart(cart.items || []),
};
const getters = {
  cartTotalLength: (state: any, getters: any) => () => {
    return state.cart.items.reduce((acc: number, curVal: CartItem) => {
      return (acc += curVal.quantity);
    }, 0);
  },
  cartTotalPrice: (state: any, getters: any) => () => {
    return state.cart.items.reduce((acc: number, curVal: CartItem) => {
      return (acc += (curVal.product.price_usd || 0) * curVal.quantity);
    }, 0);
  },
};
const mutations = {
  addToCart(state: any, item: any) {
    const exists = state.cart.items.filter(
      (i: CartItem) =>
        i.product_type === item.product_type && i.product.id === item.product.id
    );
    if (exists.length)
      exists[0].quantity =
        parseInt(exists[0].quantity) + parseInt(item.quantity);
    else state.cart.items.push(item);
    localStorage.setItem("cart", JSON.stringify(state.cart));
  },
  updateCartItem(state: any, item: any) {
    const exists = state.cart.items.map(
      (i: CartItem) => i.product.id === item.product.id
    );
    if (exists.length) exists[0] = { ...item };
    else state.cart.items.push(item);
    localStorage.setItem("cart", JSON.stringify(state.cart));
  },
  clearCart(state: any) {
    state.cart = { items: [] };
    localStorage.setItem("cart", JSON.stringify(state.cart));
  },
  removeFromCart(state: any, item: any) {
    state.cart.items = state.cart.items.filter(
      (i: CartItem) => i.product.id !== item.product.id
    );
    localStorage.setItem("cart", JSON.stringify(state.cart));
  },
};
const actions = {};
export default {
  namespaced: true,
  state,
  mutations,
  getters,
  actions,
};
