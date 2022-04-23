import api from "@/services/api";
import {ComicInterface, PreorderComic} from "@/types";

const state = {
    products: [],
    productsLatest: [],
    product: {},
};
const mutations = {
    setProductList(state: any, data: any) {
        const results: any[] = [];
        if (data.results && data.product_type) {
            if (data.product_type === "preorder-comics") {
                data.results.forEach((value: PreorderComic) => results.push(value));
            } else if (data.product_type === "comics") {
                data.results.forEach((value: ComicInterface) => results.push(value));
            }
        }
        data.results = results;
        state.products = data;
    },
    setProductLatest(state: any, data: any) {
        const comics: PreorderComic[] = [];
        data.forEach(function (value: any) {
            const comic: PreorderComic = value;
            comics.push(comic);
        });
        state.productsLatest = comics;
    },
    setProduct(state: any, comics: PreorderComic) {
        state.product = comics;
    },
};
const getters = {};
const actions = {
    async getById({commit}: { commit: any }, params: any) {
        const product = await api.get(`/${params.product_type}/${params.id}/`);
        commit("setProduct", product);
    },
    async getByParams({commit}: { commit: any }, params: any) {
        if (params.product_type) {
            const url = `/${params.product_type}/${params.publisher_slug}/${params.product_slug}/`;
            const comic: PreorderComic = await api.get(url);
            commit("setProduct", comic);
        }
    },
    async getProductListByParams({commit}: { commit: any }, params: any) {
        const product_type = params.product_type;
        if (product_type) {
            const publisher_slug = params.publisher_slug;
            const url = `/${product_type}/?page=${params.page}&page_size=${params.perPage}` +
                `/${product_type}/${publisher_slug ? "&publisher__slug=" + publisher_slug : ""}`;
            // console.log(url);
            const data: any = await api.get(url);
            if (data) {
                data.product_type = product_type;
                data && commit("setProductList", data);
            }
        }
    },
    async getLatest({commit}: { commit: any }, params: object = {}) {
        const data: any = await api.get("/preorder-comics/latest/");
        data && commit("setProductLatest", data);
    },
};
export default {
    namespaced: true,
    state,
    mutations,
    getters,
    actions,
};
