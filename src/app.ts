import {createApp, createSSRApp} from 'vue'
import {Router} from 'vue-router'
import {createApplicationRouter} from './routing/router'
import {isSSR} from "@/helpers";
import App from './components/App.vue'
import PageMeta from "./components/Page/PageMeta.vue";
import PageMetaTeleport from "./components/Page/PageMetaTeleport.vue";
import i18n from "@/i18n";
import ElementPlus from "element-plus";
import * as ElIconModules from "@element-plus/icons-vue";
import "element-plus/dist/index.css";
import "@/assets/style/global.scss";
// import store from "./store/front";
// import setupInterceptors from "./services/setupInterceptors";
import {FontAwesomeIcon} from "@fortawesome/vue-fontawesome";
import "@stripe/stripe-js";

export function createApplication() {
    // setupInterceptors(store);
    const app = isSSR() ? createSSRApp(App) : createApp(App);
    const router: Router = createApplicationRouter();
    // app.use(store);
    app.use(router);
    app.use(i18n);
    app.component('PageMeta', PageMeta);
    app.component('PageMetaTeleport', PageMetaTeleport);
    //TODO: maybe delete
    for (const [key, module] of Object.entries(ElIconModules)) {
        app.component(module.name, module);
    }
    // app.provide('__STATE__', (window as any).__STATE__)
    // app.config.globalProperties.__STATE__ = (window as any).__STATE__);
    app.component("font-awesome-icon", FontAwesomeIcon);
    app.use(ElementPlus);

    console.log('INIT APP');
    return {app, router};
}