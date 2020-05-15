// 0. If using a module system (e.g. via vue-cli), import Vue and VueRouter
// and then call `Vue.use(VueRouter)`.
import Vue from 'vue'
import VueRouter from 'vue-router'
import PaymentPage from '@/components/payment/PaymentPage'

const routes = [
    { path: '/payment', component: PaymentPage },
]

Vue.use(VueRouter)
export default new VueRouter({ routes });