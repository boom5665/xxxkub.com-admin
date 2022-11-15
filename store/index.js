// import Vuex from 'vuex'
// import axios from 'axios'

export const state = () => ({
    shownav: true,
    title: "",
    subtitle: "",
    username: "",
    token: "",
    package: "",
    configother: "",
    loading: false,
});

export const mutations = {
    navbarclick(state, status) {
        state.shownav = status;
    },
    BreadChange(state, title) {
        state.title = title.title;
        state.subtitle = title.subtitle;
    },
    setToken(state, data) {
        state.username = data.username;
        state.token = data.token;
    },
    setPackage(state, data) {
        state.package = data.package;
    },
    setConfigOther(state, data) {
        state.configother = data.configother;
    },
    setAuthen(state, data) {
        state.authen = data.authen;
    },
    Loading(state) {
        if (state.loading == true) {
            state.loading = false;
        } else {
            state.loading = true;
        }
    },
};

export const actions = {
    nuxtServerInit({ commit }, { req, redirect }) {
        const token = this.$cookies.get("token");
        const username = this.$cookies.get("username");
        const Package = this.$cookies.get("package");
        const configother = this.$cookies.get("configother");
        const authen = this.$cookies.get("authen");

        commit("setToken", {token:token,
          username:username});
        commit("setPackage", {package: Package});
        commit("setConfigOther", {configother:configother});
        commit("setAuthen", {authen:authen});

        if (!token && req.url != "/login") {
            redirect("/login");
        }
    },
};

