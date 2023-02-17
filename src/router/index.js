import Vue from 'vue';
import Router from 'vue-router';
import App from '../App';

Vue.use(Router);

const router = new Router({
    mode: 'history',
    routes: [
        {
            path: '',
            component: App,
            redirect: '/Login',
            children: [
                {
                    path: 'Login',
                    name: 'Login',
                    component: () => import('@/pages/Login'),
                },
                {
                    path: 'CreditApply',
                    name: 'CreditApply',
                    component: () => import('@/pages/CreditApply'),
                },
                {
                    path: 'LoanApply',
                    name: 'LoanApply',
                    component: () => import('@/pages/LoanApply'),
                }
            ]
        }, {
            path: '*',
            name: 'NotFound',
            component: () => import('@/pages/NotFound'),
        }],
});

export default router;