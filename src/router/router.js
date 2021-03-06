import vue from 'vue';
import Router from 'vue-router';

vue.use(Router);

export default new Router({
    mode:'history',
    base: process.env.BASE_URL,
    routes:[
        {
            path:'/',
            name:'login',
            component:()=> import ('../views/Login.vue')
        }
    ]

})