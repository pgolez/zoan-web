import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify';
import '@/filters/filter'
import router from './routes/router'

Vue.config.productionTip = false

const ignoreWarnMessage = 'The .native modifier for v-on is only valid on components but it was used on <div>.';
Vue.config.warnHandler = function(msg, vm, trace) {
    // `trace` is the component hierarchy trace
    if (msg === ignoreWarnMessage) {
        msg = null;
        vm = null;
        trace = null;
        trace
    }
}

new Vue({
    vuetify,
    router,
    render: h => h(App)
}).$mount('#app')