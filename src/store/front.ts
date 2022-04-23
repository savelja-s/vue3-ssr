import { createStore } from "vuex";
import product from "./modules/product";
import auth from "./modules/auth";
import cart from "./modules/cart";
import publisher from "./modules/publisher";

export default createStore({
  modules: { product, auth, cart, publisher },
});