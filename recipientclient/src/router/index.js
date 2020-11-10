import Vue from 'vue';
import VueRouter from 'vue-router';
import Recipients from '../views/Recipients.vue';
import ImportRecipients from '../views/RecipientsList.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Recipients',
    component: Recipients,
  },
  {
    path: '/recipientsList',
    name: 'Recipients List',
    component: ImportRecipients,
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
