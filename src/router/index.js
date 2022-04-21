import VueRouter from 'vue-router'

import HomePage from '../components/Home/HomePage.vue'
import Login from '../components/User/Login.vue'
import Register from '../components/User/Register'
import Article from '../components/article/Article'
import UserHome from '../components/User/UserHome'

//创建并暴露一个路由器
const router = new VueRouter({
	routes:[
        {
			name:'homePage',
			path:'/',
			component: HomePage,
		},
		{
			name:'login',
			path:'/login',
			component: Login,
		},
        {
            name:'register',
            path:'/register',
            component: Register,
        },
		{
			name:'article',
			path:'/article',
			component: Article,	
		},
		{
			name:'userHomePage',
			path:'/user/home',
			component: UserHome,	
		},
	]
})

export default router;