import Vue from 'vue'

import date from './date'
import currency from './currency'

Vue.filter('formatDate', date);
Vue.filter('formatCurrency', currency);