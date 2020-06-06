// 0. If using a module system (e.g. via vue-cli), import Vue and VueRouter
// and then call `Vue.use(VueRouter)`.
import Vue from 'vue'
import VueRouter from 'vue-router'
import PaymentPage from '@/components/payment/PaymentPage'
import LoanPage from '@/components/loan/LoanPage'
import LoanerPage from '@/components/loaner/LoanerPage'

const routes = [
    { path: '/payment', component: PaymentPage, name: 'payment-page' },
    { path: '/loan', component: LoanPage, name: 'loan-page' },
    { path: '/loaner', component: LoanerPage, name: 'loaner-page' },
]

Vue.use(VueRouter)

export default new VueRouter({ routes });