import TokenService from "@/services/token";

const user = TokenService.getUser();
const viewMode = localStorage.getItem("viewMode") !== "false";
const perPage = localStorage.getItem("perPage");
const state = {
  status: {
    isAuthenticated: !!user.access,
    isLoading: false,
    viewMode: viewMode,
    perPage: perPage ? Number.parseInt(perPage) : 8,
    language: localStorage.getItem("language") || "en",
  },
  user,
};
const mutations = {
  login(state: any, payload: any) {
    state.status.isAuthenticated = !!payload;
    state.user = { ...payload };
    TokenService.setUser(state.user);
  },
  setIsLoading(state: any, status: any) {
    state.isLoading = status;
  },
  logout(state: any) {
    state.user = {};
    state.status.isAuthenticated = false;
    TokenService.removeUser();
  },
  changeViewMode(state: any) {
    state.status.viewMode = !state.status.viewMode;
    localStorage.setItem("viewMode", state.status.viewMode);
  },
  changeLanguage(state: any, language: any | string) {
    state.status.language = language;
    localStorage.setItem("language", state.status.language);
  },
  changePerPage(state: any, perPage: any | number) {
    state.status.perPage = perPage;
    localStorage.setItem("perPage", state.status.perPage);
  },
  refreshToken(state: any, accessToken: string) {
    state.status.loggedIn = true;
    state.user = { ...state.user, access: accessToken };
  },
};
const actions = {
  refreshToken({ commit }: { commit: any }, accessToken: string) {
    commit("refreshToken", accessToken);
  },
  logout({ commit }: { commit: any }) {
    commit("logout");
  },
};
const getters = {
  someF: (state: any, getters: any) => () => {
    return 1;
  },
};
export default {
  namespaced: true,
  state,
  actions,
  mutations,
  getters,
};
