import Vue from 'vue'

import date from './date'
import currency from './currency'
import acronym from './acronym'

Vue.filter('formatDate', date);
Vue.filter('formatCurrency', currency);
Vue.filter('acronym', acronym);