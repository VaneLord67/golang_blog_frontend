import VueRouter from 'vue-router'

import HomePage from '../components/Home/HomePage.vue'
import Login from '../components/User/Login.vue'
import Register from '../components/User/Register'
import Article from '../components/article/Article'
import UserHome from '../components/User/UserHome'
import ArticleHome from '../components/article/ArticleHome'
import Create from '../components/article/Create'

//创建并暴露一个路由器
const router = new VueRouter({
	routes: [
		{
			name: 'homePage',
			path: '/',
			component: HomePage,
		},
		{
			name: 'login',
			path: '/login',
			component: Login,
		},
		{
			name: 'register',
			path: '/register',
			component: Register,
		},
		{
			name: 'article',
			path: '/article',
			component: Article,
		},
		{
			name: 'userHomePage',
			path: '/user/home',
			component: UserHome,
		},
		{
			name: 'ArticleHome',
			path: '/article/home',
			component: ArticleHome,
		},
		{
			name: 'CreateArticle',
			path: '/article/create',
			component: Create,
		},
	]
})


// 下面这段防止跳转重复路由时报错
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
	return originalPush.call(this, location).catch(err => err)
}

export default router;